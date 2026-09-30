/**
 * Entregas diárias: o professor registra as aulas e marca, para cada aluno, se entregou a tarefa do dia.
 * O percentual de entregas no período vira um bônus (vermelho 0 · laranja 0,2 · amarelo 0,5 · verde 1,0).
 * O bônus não altera o nível nem os grupos.
 *
 * Status de cada marcação: 'E' entregou · 'N' não entregou · 'D' dispensado (não conta) · '' pendente (não conta).
 */

const STATUS_DIARIA = ['E', 'N', 'D', ''];
const FAIXAS_BONUS = [
  { cor: 'verde', rotulo: 'Verde', bonus: 1.0, chave: 'diaria_verde', padrao: 100 },
  { cor: 'amarelo', rotulo: 'Amarelo', bonus: 0.5, chave: 'diaria_amarelo', padrao: 80 },
  { cor: 'laranja', rotulo: 'Laranja', bonus: 0.2, chave: 'diaria_laranja', padrao: 50 },
  { cor: 'vermelho', rotulo: 'Vermelho', bonus: 0, chave: null, padrao: 0 },
];

function hoje_() {
  return Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd');
}

/** Datas ficam na planilha como texto 'yyyy-MM-dd'; se o Sheets converter para data, normaliza. */
function textoData_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, FUSO, 'yyyy-MM-dd');
  const s = String(v || '');
  const br = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return br ? br[3] + '-' + br[2] + '-' + br[1] : s.slice(0, 10);
}

function validarData_(s, rotulo) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(s || ''))) throw new Error('Informe ' + rotulo + ' válida.');
  return String(s);
}

function lerPeriodos_() {
  return lerTabela_('Periodos').map(function (p) {
    return {
      _linha: p._linha, id: String(p.id), nome: String(p.nome), inicio: textoData_(p.inicio), fim: textoData_(p.fim),
      status: String(p.status || 'aberto'), fechado_em: String(p.fechado_em || ''), planilha_url: String(p.planilha_url || ''),
    };
  }).sort(function (a, b) { return a.inicio.localeCompare(b.inicio); });
}

function lerAulas_() {
  return lerTabela_('Aulas').map(function (a) {
    return { _linha: a._linha, id: String(a.id), turma: String(a.turma), data: textoData_(a.data), descricao: String(a.descricao || '') };
  });
}

function lerMarcacoes_() {
  return lerTabela_('EntregasDiarias').map(function (m) {
    return { _linha: m._linha, aula_id: String(m.aula_id), email: String(m.email).toLowerCase(), status: String(m.status || '') };
  });
}

function periodoDaData_(data, periodos) {
  return periodos.filter(function (p) { return p.inicio <= data && data <= p.fim; })[0] || null;
}

function faixasDiarias_(cfg) {
  return FAIXAS_BONUS.map(function (f) {
    return { cor: f.cor, rotulo: f.rotulo, bonus: f.bonus, minimo: f.chave ? (Number(cfg[f.chave]) || f.padrao) : 0 };
  });
}

function faixaDe_(percentual, faixas) {
  for (let i = 0; i < faixas.length; i++) if (percentual >= faixas[i].minimo) return faixas[i];
  return faixas[faixas.length - 1];
}

/**
 * Resumo de um aluno num conjunto de aulas.
 * marcacaoDe: função (aulaId) -> status.
 */
function resumoDiarias_(aulas, marcacaoDe, faixas) {
  const c = { entregues: 0, naoEntregues: 0, dispensadas: 0, pendentes: 0 };
  aulas.forEach(function (a) {
    const s = marcacaoDe(a.id);
    if (s === 'E') c.entregues++;
    else if (s === 'N') c.naoEntregues++;
    else if (s === 'D') c.dispensadas++;
    else c.pendentes++;
  });
  const validas = c.entregues + c.naoEntregues;
  c.total = validas;
  c.percentual = validas ? Math.round((c.entregues / validas) * 1000) / 10 : null;
  const f = validas ? faixaDe_(c.percentual, faixas) : null;
  c.cor = f ? f.cor : null;
  c.bonus = f ? f.bonus : null;

  // Próxima faixa alcançável: quantas entregas seguidas faltam (verde fica impossível depois de um ❌).
  c.proxima = null;
  if (f) {
    const idx = faixas.indexOf(f);
    for (let i = idx - 1; i >= 0; i--) {
      const alvo = faixas[i];
      if (alvo.minimo >= 100 && c.naoEntregues > 0) continue;
      const p = alvo.minimo / 100;
      const faltam = p >= 1 ? 0 : Math.max(0, Math.ceil((p * validas - c.entregues) / (1 - p)));
      c.proxima = { cor: alvo.cor, rotulo: alvo.rotulo, bonus: alvo.bonus, faltam: faltam };
      break;
    }
  }
  return c;
}

// ============================================================
// Área do aluno
// ============================================================

/** Período em andamento (ou o mais recente já iniciado) com as aulas da turma e o bônus atual. */
function alunoDiarias_(email, turma, cfg) {
  const periodos = lerPeriodos_();
  const hoje = hoje_();
  const periodo = periodoDaData_(hoje, periodos) ||
    periodos.filter(function (p) { return p.inicio <= hoje; }).pop() || null;
  if (!periodo) return null;
  const aulas = lerAulas_()
    .filter(function (a) { return a.turma === turma && a.data >= periodo.inicio && a.data <= periodo.fim; })
    .sort(function (a, b) { return a.data.localeCompare(b.data); });
  const minhas = {};
  lerMarcacoes_().forEach(function (m) { if (m.email === email) minhas[m.aula_id] = m.status; });
  const faixas = faixasDiarias_(cfg);
  const resumo = resumoDiarias_(aulas, function (id) { return minhas[id] || ''; }, faixas);
  return {
    periodo: { nome: periodo.nome, inicio: periodo.inicio, fim: periodo.fim, fechado: periodo.status === 'fechado' },
    faixas: faixas, resumo: resumo,
    aulas: aulas.map(function (a) { return { data: a.data, descricao: a.descricao, status: minhas[a.id] || '' }; }),
  };
}

// ============================================================
// Painel do professor
// ============================================================

function profDiariasDados(turma, periodoId) {
  exigirProfessor_();
  validarTurma_(turma);
  const cfg = lerConfig_();
  const periodos = lerPeriodos_();
  let periodo = periodos.filter(function (p) { return p.id === periodoId; })[0];
  if (!periodo) periodo = periodoDaData_(hoje_(), periodos) || periodos.filter(function (p) { return p.inicio <= hoje_(); }).pop() || periodos[0] || null;

  const alunos = lerTabela_('Alunos')
    .filter(function (a) { return String(a.turma) === turma; })
    .map(function (a) { return { email: String(a.email).toLowerCase(), nome: String(a.nome) }; })
    .sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
  const aulas = periodo ? lerAulas_()
    .filter(function (a) { return a.turma === turma && a.data >= periodo.inicio && a.data <= periodo.fim; })
    .sort(function (a, b) { return a.data.localeCompare(b.data); }) : [];
  const idsAulas = {};
  aulas.forEach(function (a) { idsAulas[a.id] = true; });
  const marcacoes = {};
  lerMarcacoes_().forEach(function (m) { if (idsAulas[m.aula_id]) marcacoes[m.aula_id + '|' + m.email] = m.status; });

  periodos.forEach(function (p) { delete p._linha; });
  aulas.forEach(function (a) { delete a._linha; });
  return {
    turma: turma, periodos: periodos, periodo: periodo, hoje: hoje_(),
    faixas: faixasDiarias_(cfg), alunos: alunos, aulas: aulas, marcacoes: marcacoes,
  };
}

// ---------- Períodos ----------

function profSalvarPeriodo(dados) {
  exigirProfessor_();
  const nome = String(dados.nome || '').trim();
  if (!nome) throw new Error('Dê um nome ao período (ex.: 4º bimestre, Outubro, 3º trimestre).');
  const inicio = validarData_(dados.inicio, 'a data de início');
  const fim = validarData_(dados.fim, 'a data de fim');
  if (fim < inicio) throw new Error('A data de fim deve ser depois da data de início.');
  let id = String(dados.id || '');
  comTrava_(function () {
    const periodos = lerPeriodos_();
    const conflito = periodos.filter(function (p) { return p.id !== id && !(fim < p.inicio || inicio > p.fim); })[0];
    if (conflito) throw new Error('As datas se sobrepõem ao período "' + conflito.nome + '" (' + conflito.inicio + ' a ' + conflito.fim + ').');
    const aba = aba_('Periodos');
    if (!id) {
      id = 'P' + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
      aba.appendRow(linhaDe_('Periodos', { id: id, nome: nome, inicio: "'" + inicio, fim: "'" + fim, status: 'aberto' }));
      return;
    }
    const atual = periodos.filter(function (p) { return p.id === id; })[0];
    if (!atual) throw new Error('Período não encontrado. Recarregue a página.');
    if (atual.status === 'fechado') throw new Error('Reabra o período antes de alterar as datas.');
    aba.getRange(atual._linha, 1, 1, CABECALHOS.Periodos.length).setValues([linhaDe_('Periodos', {
      id: id, nome: nome, inicio: "'" + inicio, fim: "'" + fim, status: atual.status, fechado_em: atual.fechado_em, planilha_url: atual.planilha_url,
    })]);
  });
  return lerPeriodos_().map(function (p) { delete p._linha; return p; });
}

function profExcluirPeriodo(id) {
  exigirProfessor_();
  comTrava_(function () {
    const p = lerPeriodos_().filter(function (x) { return x.id === id; })[0];
    if (!p) throw new Error('Período não encontrado.');
    if (p.status === 'fechado') throw new Error('Reabra o período antes de excluí-lo.');
    aba_('Periodos').deleteRow(p._linha);
  });
  return lerPeriodos_().map(function (p) { delete p._linha; return p; });
}

function periodoAbertoDaData_(data) {
  const p = periodoDaData_(data, lerPeriodos_());
  if (!p) throw new Error('A data ' + data + ' não está em nenhum período. Crie o período em "Períodos" primeiro.');
  if (p.status === 'fechado') throw new Error('O período "' + p.nome + '" está fechado. Reabra-o para alterar.');
  return p;
}

// ---------- Aulas ----------

function profSalvarAula(dados) {
  exigirProfessor_();
  validarTurma_(dados.turma);
  const data = validarData_(dados.data, 'a data da aula');
  periodoAbertoDaData_(data);
  const descricao = String(dados.descricao || '').trim().slice(0, 300);
  let id = String(dados.id || '');
  comTrava_(function () {
    const aba = aba_('Aulas');
    if (!id) {
      id = 'A' + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
      aba.appendRow(linhaDe_('Aulas', { id: id, turma: dados.turma, data: "'" + data, descricao: descricao, criado_em: new Date() }));
      return;
    }
    const atual = lerAulas_().filter(function (a) { return a.id === id; })[0];
    if (!atual) throw new Error('Aula não encontrada. Recarregue a página.');
    periodoAbertoDaData_(atual.data);
    aba.getRange(atual._linha, 2, 1, 3).setValues([[dados.turma, "'" + data, descricao]]);
  });
  return profDiariasDados(dados.turma, String(dados.periodoId || ''));
}

function profExcluirAula(id, periodoId) {
  exigirProfessor_();
  let turma = '';
  comTrava_(function () {
    const aula = lerAulas_().filter(function (a) { return a.id === id; })[0];
    if (!aula) throw new Error('Aula não encontrada.');
    periodoAbertoDaData_(aula.data);
    turma = aula.turma;
    const abaM = aba_('EntregasDiarias');
    lerMarcacoes_().filter(function (m) { return m.aula_id === id; })
      .map(function (m) { return m._linha; }).sort(function (a, b) { return b - a; })
      .forEach(function (l) { abaM.deleteRow(l); });
    aba_('Aulas').deleteRow(aula._linha);
  });
  return profDiariasDados(turma, periodoId);
}

// ---------- Marcações ----------

/** Salva várias marcações de uma vez: [{ aula_id, email, status }]. Agrupa escritas em blocos contínuos. */
function profSalvarMarcacoes(lista) {
  exigirProfessor_();
  if (!Array.isArray(lista) || !lista.length) return { salvas: 0 };
  const aulas = {};
  lerAulas_().forEach(function (a) { aulas[a.id] = a; });
  const periodos = lerPeriodos_();
  const turmaDe = {};
  lerTabela_('Alunos').forEach(function (a) { turmaDe[String(a.email).toLowerCase()] = String(a.turma); });

  const limpas = lista.map(function (m) {
    const aula = aulas[String(m.aula_id)];
    const email = String(m.email || '').toLowerCase();
    const status = String(m.status || '');
    if (!aula) throw new Error('Aula não encontrada. Recarregue a página.');
    if (STATUS_DIARIA.indexOf(status) === -1) throw new Error('Marcação inválida.');
    if (turmaDe[email] !== aula.turma) throw new Error('Aluno fora da turma ' + aula.turma + '. Recarregue a página.');
    const p = periodoDaData_(aula.data, periodos);
    if (!p || p.status === 'fechado') throw new Error('Esta aula está num período fechado.');
    return { aula_id: aula.id, email: email, status: status };
  });

  comTrava_(function () {
    const aba = aba_('EntregasDiarias');
    const linhaDe = {};
    lerMarcacoes_().forEach(function (m) { linhaDe[m.aula_id + '|' + m.email] = m._linha; });
    const agora = new Date();
    const atualizacoes = [];
    const novas = [];
    const vistas = {};
    limpas.forEach(function (m) {
      const chave = m.aula_id + '|' + m.email;
      vistas[chave] = m; // a última marcação da lista vale
    });
    Object.keys(vistas).forEach(function (chave) {
      const m = vistas[chave];
      if (linhaDe[chave]) atualizacoes.push({ linha: linhaDe[chave], status: m.status });
      else if (m.status) novas.push(linhaDe_('EntregasDiarias', { aula_id: m.aula_id, email: m.email, status: m.status, atualizado_em: agora }));
    });
    // Atualiza em blocos de linhas consecutivas (colunas status e atualizado_em).
    atualizacoes.sort(function (a, b) { return a.linha - b.linha; });
    let i = 0;
    while (i < atualizacoes.length) {
      let j = i;
      while (j + 1 < atualizacoes.length && atualizacoes[j + 1].linha === atualizacoes[j].linha + 1) j++;
      const bloco = atualizacoes.slice(i, j + 1).map(function (u) { return [u.status, agora]; });
      aba.getRange(atualizacoes[i].linha, 3, bloco.length, 2).setValues(bloco);
      i = j + 1;
    }
    if (novas.length) aba.getRange(aba.getLastRow() + 1, 1, novas.length, CABECALHOS.EntregasDiarias.length).setValues(novas);
  });
  return { salvas: limpas.length };
}

// ---------- Fechamento ----------

/** Fecha o período (marcações ficam bloqueadas) e gera uma planilha com o bônus de todos os alunos. */
function profFecharPeriodo(id) {
  exigirProfessor_();
  const cfg = lerConfig_();
  const faixas = faixasDiarias_(cfg);
  const p = lerPeriodos_().filter(function (x) { return x.id === id; })[0];
  if (!p) throw new Error('Período não encontrado.');

  const aulas = lerAulas_().filter(function (a) { return a.data >= p.inicio && a.data <= p.fim; });
  const marc = {};
  lerMarcacoes_().forEach(function (m) { marc[m.aula_id + '|' + m.email] = m.status; });
  const alunos = lerTabela_('Alunos').sort(function (a, b) {
    return String(a.turma).localeCompare(String(b.turma)) || String(a.nome).localeCompare(String(b.nome), 'pt-BR');
  });
  const linhas = alunos.map(function (a) {
    const email = String(a.email).toLowerCase();
    const turma = String(a.turma);
    const r = resumoDiarias_(aulas.filter(function (x) { return x.turma === turma; }),
      function (aulaId) { return marc[aulaId + '|' + email] || ''; }, faixas);
    return [turma, String(a.nome), r.entregues, r.total, r.dispensadas, r.pendentes,
      r.percentual === null ? '' : r.percentual, r.cor ? r.cor : 'sem aulas', r.bonus === null ? 0 : r.bonus];
  });

  const ss = SpreadsheetApp.create('Bônus de entregas diárias – ' + p.nome);
  const aba = ss.getSheets()[0].setName('Bônus');
  const cab = ['Turma', 'Aluno', 'Entregues', 'Aulas válidas', 'Dispensadas', 'Pendentes', 'Entregas (%)', 'Cor', 'Bônus'];
  const dados = [cab].concat(linhas.length ? linhas : [['', 'Nenhum aluno cadastrado', '', '', '', '', '', '', '']]);
  aba.getRange(1, 1, dados.length, cab.length).setValues(dados);
  aba.getRange(1, 1, 1, cab.length).setFontWeight('bold').setBackground('#dbe4ff');
  aba.setFrozenRows(1);
  aba.autoResizeColumns(1, cab.length);

  comTrava_(function () {
    const atual = lerPeriodos_().filter(function (x) { return x.id === id; })[0];
    aba_('Periodos').getRange(atual._linha, 5, 1, 3).setValues([['fechado', new Date(), ss.getUrl()]]);
  });
  return ss.getUrl();
}

function profReabrirPeriodo(id) {
  exigirProfessor_();
  comTrava_(function () {
    const p = lerPeriodos_().filter(function (x) { return x.id === id; })[0];
    if (!p) throw new Error('Período não encontrado.');
    aba_('Periodos').getRange(p._linha, 5).setValue('aberto');
  });
  return lerPeriodos_().map(function (p) { delete p._linha; return p; });
}
