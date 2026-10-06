/**
 * Jogos – Etapa 2: ciclos mensais por turma, com prazo, e a nota mensal de jogos.
 * Um ciclo reúne de 1 a 3 casos do ano (cada caso tem versões ★/★★/★★★ e vale 100 pontos em qualquer degrau).
 * Nota do ciclo = média dos casos do ciclo; casos não concluídos no prazo valem 0.
 * Quem não concluiu nenhum caso no prazo fica sem nota naquele mês (não entra na média).
 * A nota vai para a aba Respostas (questionario_id = id do ciclo, origem "jogos") e entra no nível com o mesmo peso de um questionário,
 * mas só quando o aluno conclui TODOS os casos no prazo ou quando o professor fecha o ciclo (antes disso, o aluno vê a média parcial).
 */

const STATUS_CICLO = ['aberto', 'fechado'];
const MAX_CASOS_CICLO = 3;

function hojeIso_() { return Utilities.formatDate(new Date(), FUSO, 'yyyy-MM-dd'); }

/** Aceita "2026-11-30", Date ou "30/11/2026 00:00" e devolve "2026-11-30". */
function dataIso_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, FUSO, 'yyyy-MM-dd');
  const s = String(v || '').trim();
  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[1] + '-' + m[2] + '-' + m[3];
  m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? m[3] + '-' + m[2] + '-' + m[1] : '';
}

function lerCiclos_() {
  garantirAba_('Ciclos');
  return lerTabela_('Ciclos').map(function (c) {
    let missoes = [], ext = {};
    try { missoes = JSON.parse(c.missoes_json || '[]'); } catch (e) { /* ignora */ }
    try { ext = JSON.parse(c.extensoes_json || '{}'); } catch (e) { /* ignora */ }
    return {
      _linha: c._linha, id: String(c.id), turma: String(c.turma), serie: String(c.serie), mes: dataIso_(c.mes + '-01').slice(0, 7) || String(c.mes),
      titulo: String(c.titulo), missoes: missoes, prazo: dataIso_(c.prazo), status: String(c.status || 'aberto'),
      extensoes: ext, criado_em: String(c.criado_em), fechado_em: String(c.fechado_em || ''),
    };
  });
}

function buscarCiclo_(id) {
  const c = lerCiclos_().filter(function (x) { return x.id === String(id); })[0];
  if (!c) throw new Error('Ciclo não encontrado. Recarregue a página.');
  return c;
}

function gravarCiclo_(c) {
  const linha = linhaDe_('Ciclos', {
    id: c.id, turma: c.turma, serie: c.serie, mes: "'" + c.mes, titulo: c.titulo, missoes_json: JSON.stringify(c.missoes),
    prazo: "'" + c.prazo, status: c.status, extensoes_json: JSON.stringify(c.extensoes || {}), criado_em: c.criado_em || new Date(), fechado_em: c.fechado_em || '',
  });
  const aba = garantirAba_('Ciclos');
  if (c._linha) aba.getRange(c._linha, 1, 1, linha.length).setValues([linha]);
  else aba.appendRow(linha);
}

function prazoDoAluno_(ciclo, email) { return ciclo.extensoes[email] || ciclo.prazo; }

/** concluido_em ("dd/MM/yyyy HH:mm" ou Date) até o fim do dia do prazo ("yyyy-MM-dd"). */
function dentroDoPrazo_(concluido, prazo) {
  if (!concluido || !prazo) return false;
  const texto = concluido instanceof Date ? Utilities.formatDate(concluido, FUSO, 'dd/MM/yyyy HH:mm') : String(concluido);
  return chaveData_(texto).slice(0, 8) <= prazo.replace(/-/g, '');
}

/** itens: [{ pontos, noPrazo }] de todos os casos do ciclo. Nenhum no prazo → null (sem nota). */
function notaDoCiclo_(itens) {
  if (!itens.length || !itens.some(function (i) { return i.noPrazo; })) return null;
  const soma = itens.reduce(function (s, i) { return s + (i.noPrazo ? i.pontos : 0); }, 0);
  return Math.round((soma / itens.length) * 10) / 10;
}

/** Situação de um aluno num ciclo: a 1ª jogada de qualquer versão de cada caso do ciclo. */
function resultadoNoCiclo_(ciclo, email, grupos, jogadas) {
  const prazo = prazoDoAluno_(ciclo, email);
  const itens = ciclo.missoes.filter(function (k) { return grupos[k]; }).map(function (k) {
    const ids = {};
    grupos[k].versoes.forEach(function (c) { ids[c.id] = c; });
    const j = jogadas.filter(function (x) { return x.email === email && x.numero === 1 && ids[x.caso_id]; })[0];
    const feita = !!(j && j.status === 'concluido');
    return {
      missao: k, titulo: grupos[k].titulo, degrau: j ? Number(ids[j.caso_id].dados.degrau) || 0 : null,
      situacao: !j ? 'nao' : j.status, pontos: feita ? j.pontos : (j ? somaPontos_(j.estado) : null),
      noPrazo: feita && dentroDoPrazo_(j.concluido_em, prazo), concluido_em: feita ? j.concluido_em : '',
    };
  });
  return { prazo: prazo, itens: itens, nota: notaDoCiclo_(itens.map(function (i) { return { pontos: i.pontos || 0, noPrazo: i.noPrazo }; })) };
}

/**
 * Grava (ou apaga) a nota de jogos dos alunos informados num ciclo aberto.
 * fechando = true: é o fechamento do ciclo; grava também quem fez só parte (os casos que faltam valem 0).
 * Sem fechar, só grava quem concluiu todos os casos no prazo.
 */
function gravarNotasCiclo_(ciclo, emails, fechando) {
  if (ciclo.status !== 'aberto') return;
  const casos = lerCasos_().filter(function (c) { return !ehTrilha_(c); });
  const grupos = agruparMissoes_(casos);
  const jogadas = lerJogadas_();
  const q = { id: ciclo.id };
  comTrava_(function () {
    const respostas = lerRespostas_().filter(function (r) { return r.questionario_id === ciclo.id; });
    const apagar = [];
    emails.forEach(function (email) {
      const r = resultadoNoCiclo_(ciclo, email, grupos, jogadas);
      const existente = respostas.filter(function (x) { return x.email === email; })[0];
      const completo = r.itens.length > 0 && r.itens.every(function (i) { return i.noPrazo; });
      if (r.nota === null || (!fechando && !completo)) { if (existente) apagar.push(existente._linha); return; }
      const total = 100 * r.itens.length;
      gravarResposta_(q, email, ciclo.turma, {
        pontuacao: Math.round(r.nota * r.itens.length), total: total, percentual: r.nota,
        detalhe: { casos: r.itens.map(function (i) { return { missao: i.missao, degrau: i.degrau, pontos: i.noPrazo ? i.pontos : 0 }; }) },
      }, 'jogos');
    });
    apagar.sort(function (a, b) { return b - a; }).forEach(function (l) { aba_('Respostas').deleteRow(l); });
  });
}

/** Chamada quando um aluno conclui a 1ª jogada de um caso do ano: atualiza as notas dos ciclos abertos da turma dele. */
function atualizarNotasDoAluno_(email, turma, casoId) {
  const caso = buscarCaso_(casoId);
  if (ehTrilha_(caso)) return;
  const k = missaoDe_(caso);
  lerCiclos_().filter(function (c) { return c.turma === turma && c.status === 'aberto' && c.missoes.indexOf(k) !== -1; })
    .forEach(function (c) { gravarNotasCiclo_(c, [email]); });
}

function emailsDaTurma_(turma) {
  return lerTabela_('Alunos').filter(function (a) { return String(a.turma) === turma; }).map(function (a) { return String(a.email).toLowerCase(); });
}

/** Ciclos como "avaliações" para os relatórios (evolução, exportação). */
function questionariosComCiclos_() {
  return lerQuestionarios_().concat(lerCiclos_().map(function (c) {
    return { id: c.id, tipo: 'jogos', serie: c.serie, mes: c.mes, titulo: c.titulo, questoes: [], tda: null, status: c.status };
  }));
}

// ============================================================
// Painel do professor
// ============================================================

function profListarCiclos() {
  exigirProfessor_();
  const respostas = lerRespostas_();
  const grupos = agruparMissoes_(lerCasos_().filter(function (c) { return !ehTrilha_(c); }));
  const alunosPorTurma = {};
  lerTabela_('Alunos').forEach(function (a) { alunosPorTurma[String(a.turma)] = (alunosPorTurma[String(a.turma)] || 0) + 1; });
  return lerCiclos_().map(function (c) {
    const notas = respostas.filter(function (r) { return r.questionario_id === c.id; });
    return {
      id: c.id, turma: c.turma, serie: c.serie, mes: c.mes, titulo: c.titulo, prazo: c.prazo, status: c.status,
      missoes: c.missoes.map(function (k) { return { missao: k, titulo: grupos[k] ? grupos[k].titulo : '(caso excluído)' }; }),
      alunos: alunosPorTurma[c.turma] || 0, comNota: notas.length,
      media: notas.length ? Math.round((notas.reduce(function (s, r) { return s + r.percentual; }, 0) / notas.length) * 10) / 10 : null,
      extensoes: Object.keys(c.extensoes).length,
    };
  }).sort(function (a, b) { return b.mes.localeCompare(a.mes) || a.turma.localeCompare(b.turma); });
}

/**
 * Cria um ciclo para cada turma marcada (todas da mesma série) ou edita um ciclo (dados.id).
 * dados: { id?, turmas:[...], titulo, mes:'AAAA-MM', missoes:[chaves], prazo:'AAAA-MM-DD' }
 */
function profSalvarCiclo(dados) {
  exigirProfessor_();
  const titulo = String(dados.titulo || '').trim();
  const prazo = dataIso_(dados.prazo);
  const mes = String(dados.mes || '').trim();
  const missoes = (dados.missoes || []).map(String);
  if (!titulo) throw new Error('Dê um título ao ciclo (ex.: "Jogos de novembro").');
  if (!/^\d{4}-\d{2}$/.test(mes)) throw new Error('Escolha o mês do ciclo.');
  if (!prazo) throw new Error('Escolha a data do prazo.');
  if (!missoes.length || missoes.length > MAX_CASOS_CICLO) throw new Error('Escolha de 1 a ' + MAX_CASOS_CICLO + ' casos.');
  const grupos = agruparMissoes_(lerCasos_().filter(function (c) { return !ehTrilha_(c); }));
  missoes.forEach(function (k) { if (!grupos[k]) throw new Error('Caso não encontrado. Recarregue a página.'); });
  const series = {};
  missoes.forEach(function (k) { series[grupos[k].serie] = true; });
  if (Object.keys(series).length !== 1) throw new Error('Os casos do ciclo precisam ser da mesma série.');
  const serie = Object.keys(series)[0];

  if (dados.id) {
    comTrava_(function () {
      const c = buscarCiclo_(dados.id);
      if (c.serie !== serie) throw new Error('Os casos precisam ser do ' + c.serie + ' ano, a série da turma ' + c.turma + '.');
      c.titulo = titulo; c.mes = mes; c.prazo = prazo; c.missoes = missoes;
      gravarCiclo_(c);
    });
    gravarNotasCiclo_(buscarCiclo_(dados.id), emailsDaTurma_(buscarCiclo_(dados.id).turma));
    return profListarCiclos();
  }

  const turmas = (dados.turmas || []).map(String);
  if (!turmas.length) throw new Error('Marque pelo menos uma turma.');
  const todas = listarTurmas_();
  turmas.forEach(function (t) {
    const x = todas.filter(function (y) { return y.turma === t; })[0];
    if (!x) throw new Error('Turma inválida: ' + t);
    if (x.serie !== serie) throw new Error('A turma ' + t + ' não é do ' + serie + ' ano.');
  });
  const novos = [];
  comTrava_(function () {
    turmas.forEach(function (t) {
      const c = { id: 'ciclo-' + Utilities.getUuid().slice(0, 8), turma: t, serie: serie, mes: mes, titulo: titulo, missoes: missoes, prazo: prazo, status: 'aberto', extensoes: {} };
      gravarCiclo_(c);
      novos.push(c.id);
    });
  });
  // Quem já concluiu algum desses casos antes (no prazo) já recebe a nota.
  novos.forEach(function (id) { const c = buscarCiclo_(id); gravarNotasCiclo_(c, emailsDaTurma_(c.turma)); });
  return profListarCiclos();
}

/** Fechar congela as notas (depois de recalcular); reabrir volta a aceitar conclusões dentro do prazo. */
function profStatusCiclo(id, status) {
  exigirProfessor_();
  if (STATUS_CICLO.indexOf(status) === -1) throw new Error('Situação inválida.');
  const c = buscarCiclo_(id);
  if (status === 'fechado') gravarNotasCiclo_(c, emailsDaTurma_(c.turma), true);
  comTrava_(function () {
    const atual = buscarCiclo_(id);
    atual.status = status;
    atual.fechado_em = status === 'fechado' ? new Date() : '';
    gravarCiclo_(atual);
  });
  if (status === 'aberto') gravarNotasCiclo_(buscarCiclo_(id), emailsDaTurma_(c.turma));
  return profListarCiclos();
}

/** Exclui o ciclo e as notas de jogos dele (as jogadas dos alunos continuam guardadas). */
function profExcluirCiclo(id) {
  exigirProfessor_();
  comTrava_(function () {
    const c = buscarCiclo_(id);
    lerRespostas_().filter(function (r) { return r.questionario_id === c.id; })
      .sort(function (a, b) { return b._linha - a._linha; })
      .forEach(function (r) { aba_('Respostas').deleteRow(r._linha); });
    garantirAba_('Ciclos').deleteRow(c._linha);
  });
  return profListarCiclos();
}

/** Prazo especial para um aluno (data vazia = volta ao prazo da turma). */
function profProrrogarCiclo(id, email, data) {
  exigirProfessor_();
  email = String(email || '').toLowerCase();
  const nova = data ? dataIso_(data) : '';
  if (data && !nova) throw new Error('Data inválida.');
  comTrava_(function () {
    const c = buscarCiclo_(id);
    if (nova) c.extensoes[email] = nova; else delete c.extensoes[email];
    gravarCiclo_(c);
  });
  gravarNotasCiclo_(buscarCiclo_(id), [email]);
  return profResultadosCiclo(id);
}

function profResultadosCiclo(id) {
  exigirProfessor_();
  const c = buscarCiclo_(id);
  const casos = lerCasos_();
  const grupos = agruparMissoes_(casos.filter(function (x) { return !ehTrilha_(x); }));
  const jogadas = lerJogadas_();
  const notas = {};
  lerRespostas_().filter(function (r) { return r.questionario_id === c.id; }).forEach(function (r) { notas[r.email] = r.percentual; });
  const niveis = calcularNiveis_(lerConfig_());
  const alunos = lerTabela_('Alunos').filter(function (a) { return String(a.turma) === c.turma; })
    .sort(function (a, b) { return String(a.nome).localeCompare(String(b.nome)); });
  return {
    ciclo: { id: c.id, titulo: c.titulo, turma: c.turma, prazo: c.prazo, status: c.status, mes: c.mes },
    missoes: c.missoes.map(function (k) { return { missao: k, titulo: grupos[k] ? grupos[k].titulo : '(caso excluído)' }; }),
    linhas: alunos.map(function (a) {
      const email = String(a.email).toLowerCase();
      const r = resultadoNoCiclo_(c, email, grupos, jogadas);
      return {
        email: email, nome: String(a.nome), prazo: r.prazo, prorrogado: !!c.extensoes[email],
        degrauAtual: degrauDoAluno_(email, (niveis[email] || {}).nivel || '', casos, jogadas),
        itens: r.itens, nota: notas[email] != null ? notas[email] : null,
      };
    }),
  };
}
