/**
 * TDAs (Tarefas de Desempenho Autêntico): entrega pelo aluno (texto, link, anexos),
 * correção pelo professor com rubrica de 4 níveis e retorno da correção ao aluno.
 * A nota vai para a aba Respostas e entra na média do nível com o mesmo peso de um questionário.
 */

const MODOS_TDA = ['individual', 'grupo'];
const MAX_ANEXOS = 3;
const MAX_BYTES_ANEXO = 10 * 1024 * 1024;

function validarTda_(t) {
  t = t || {};
  const texto = function (v) { return String(v || '').trim(); };
  const lista = function (v) {
    return (Array.isArray(v) ? v : String(v || '').split('\n')).map(texto).filter(String);
  };
  const tda = {
    modo: MODOS_TDA.indexOf(t.modo) !== -1 ? t.modo : 'individual',
    situacao: texto(t.situacao),
    produto: texto(t.produto),
    tarefas: lista(t.tarefas),
    criterios: lista(t.criterios),
    rubrica: (Array.isArray(t.rubrica) ? t.rubrica : []).map(function (r) {
      return { criterio: texto(r.criterio), n4: texto(r.n4), n3: texto(r.n3), n2: texto(r.n2), n1: texto(r.n1) };
    }).filter(function (r) { return r.criterio; }),
  };
  if (!tda.situacao) throw new Error('Preencha a situação-problema da TDA.');
  if (!tda.produto) throw new Error('Preencha o produto final da TDA.');
  if (!tda.rubrica.length) throw new Error('A TDA precisa de pelo menos um critério na rubrica.');
  tda.rubrica.forEach(function (r, i) {
    if (!r.n4 || !r.n3 || !r.n2 || !r.n1) throw new Error('Rubrica, critério ' + (i + 1) + ' ("' + r.criterio + '"): descreva os 4 níveis.');
  });
  return tda;
}

function buscarTda_(id) {
  const q = buscarQuestionario_(id);
  if (q.tipo !== 'tda' || !q.tda) throw new Error('Esta atividade não é uma TDA.');
  return q;
}

function lerEntregas_() {
  return lerTabela_('Entregas').map(function (e) {
    let anexos = [];
    let saidas = {};
    try { anexos = e.anexos_json ? JSON.parse(e.anexos_json) : []; } catch (err) { /* ignora */ }
    try { saidas = e.saidas_json ? JSON.parse(e.saidas_json) : {}; } catch (err) { /* ignora */ }
    return {
      _linha: e._linha, questionario_id: String(e.questionario_id), turma: String(e.turma),
      grupo: e.grupo === '' ? null : Number(e.grupo),
      membros: String(e.membros || '').split(',').map(function (m) { return m.trim().toLowerCase(); }).filter(String),
      email: String(e.email).toLowerCase(), texto: String(e.texto || ''), link: String(e.link || ''),
      anexos: anexos, enviado_em: String(e.enviado_em), atualizado_em: String(e.atualizado_em),
      saidas: saidas,
    };
  });
}

/** Grupo mais recente do aluno na turma: { numero, membros:[emails] } ou null. */
function grupoAtualDoAluno_(email, turma) {
  const linhas = lerGrupos_().filter(function (g) { return g.turma === turma; });
  if (!linhas.length) return null;
  const mes = linhas.map(function (g) { return g.mes; }).sort().pop();
  const doMes = linhas.filter(function (g) { return g.mes === mes; });
  const meu = doMes.filter(function (g) { return g.email === email; })[0];
  if (!meu) return null;
  return { numero: meu.grupo, membros: doMes.filter(function (g) { return g.grupo === meu.grupo; }).map(function (g) { return g.email; }) };
}

/** Grupos mais recentes de cada turma: { turma: [{numero, membros}] } */
function gruposAtuaisPorTurma_() {
  const res = {};
  const ultimo = {};
  const linhas = lerGrupos_();
  linhas.forEach(function (g) { if (!ultimo[g.turma] || g.mes > ultimo[g.turma]) ultimo[g.turma] = g.mes; });
  linhas.filter(function (g) { return g.mes === ultimo[g.turma]; }).forEach(function (g) {
    res[g.turma] = res[g.turma] || {};
    (res[g.turma][g.grupo] = res[g.turma][g.grupo] || []).push(g.email);
  });
  Object.keys(res).forEach(function (t) {
    res[t] = Object.keys(res[t]).map(Number).sort(function (a, b) { return a - b; })
      .map(function (n) { return { numero: n, membros: res[t][n] }; });
  });
  return res;
}

function nomesPorEmail_() {
  const m = {};
  lerTabela_('Alunos').forEach(function (a) { m[String(a.email).toLowerCase()] = String(a.nome); });
  return m;
}

function correcaoDe_(r) {
  if (!r) return null;
  const d = r.detalhe || {};
  return {
    pontuacao: r.pontuacao, total: r.total, percentual: r.percentual, respondido_em: r.respondido_em,
    niveis: d.rubrica || [], comentario: d.comentario || '',
  };
}

/** incluirSaidas: só o professor vê as saídas da tela de cada integrante. */
function entregaPublica_(e, nomes, incluirSaidas) {
  if (!e) return null;
  const pub = {
    turma: e.turma, grupo: e.grupo, membros: e.membros.map(function (m) { return { email: m, nome: nomes[m] || m }; }),
    enviadoPor: nomes[e.email] || e.email, texto: e.texto, link: e.link,
    anexos: e.anexos.map(function (a) { return { id: a.id, nome: a.nome, url: a.url }; }),
    enviado_em: e.enviado_em, atualizado_em: e.atualizado_em,
  };
  if (incluirSaidas) pub.saidas = e.saidas;
  return pub;
}

// ============================================================
// Anexos no Drive do professor
// ============================================================

function pastaAnexos_(q) {
  const props = PropertiesService.getScriptProperties();
  let raiz = null;
  const idRaiz = props.getProperty('PASTA_ANEXOS_ID');
  if (idRaiz) { try { raiz = DriveApp.getFolderById(idRaiz); } catch (e) { raiz = null; } }
  if (!raiz) {
    raiz = DriveApp.createFolder('English Learning App – Anexos das TDAs');
    props.setProperty('PASTA_ANEXOS_ID', raiz.getId());
  }
  const nome = q.serie + ' ano – ' + q.titulo;
  const existentes = raiz.getFoldersByName(nome);
  return existentes.hasNext() ? existentes.next() : raiz.createFolder(nome);
}

function salvarAnexos_(q, arquivos, prefixo) {
  if (!arquivos.length) return [];
  const pasta = pastaAnexos_(q);
  return arquivos.map(function (a) {
    const bytes = Utilities.base64Decode(String(a.base64 || ''));
    if (!bytes.length) throw new Error('O arquivo "' + a.nome + '" está vazio.');
    if (bytes.length > MAX_BYTES_ANEXO) throw new Error('O arquivo "' + a.nome + '" passa de 10 MB.');
    const nome = prefixo + ' – ' + String(a.nome || 'anexo').slice(0, 120);
    const arquivo = pasta.createFile(Utilities.newBlob(bytes, a.tipo || 'application/octet-stream', nome));
    return { id: arquivo.getId(), nome: String(a.nome || 'anexo'), url: arquivo.getUrl() };
  });
}

// ============================================================
// Área do aluno
// ============================================================

/** TDAs da série do aluno: abertas, ou já entregues/corrigidas (mesmo que encerradas). */
function alunoTdas_(email, turma) {
  const serie = serieDaTurma_(turma);
  const entregas = lerEntregas_();
  const respostas = lerRespostas_().filter(function (r) { return r.email === email; });
  return lerQuestionarios_()
    .filter(function (q) { return q.tipo === 'tda' && q.serie === serie && q.status !== 'rascunho'; })
    .map(function (q) {
      const corr = respostas.filter(function (r) { return r.questionario_id === q.id; })[0];
      const ent = entregas.filter(function (e) { return e.questionario_id === q.id && e.membros.indexOf(email) !== -1; })[0];
      return {
        id: q.id, titulo: q.titulo, mes: q.mes, modo: q.tda.modo, aberta: q.status === 'aberto',
        situacao: corr ? 'corrigida' : ent ? 'enviada' : 'pendente',
        nota: corr ? corr.percentual : null,
      };
    })
    .filter(function (t) { return t.aberta || t.situacao !== 'pendente'; })
    .sort(function (a, b) { return b.mes.localeCompare(a.mes); });
}

function alunoAbrirTda(id) {
  const aluno = alunoAtual_();
  const q = buscarTda_(id);
  if (q.serie !== serieDaTurma_(aluno.turma) || q.status === 'rascunho') throw new Error('Esta TDA não está disponível para você.');
  const nomes = nomesPorEmail_();
  const entrega = lerEntregas_().filter(function (e) { return e.questionario_id === id && e.membros.indexOf(aluno.email) !== -1; })[0];
  const correcao = correcaoDe_(lerRespostas_().filter(function (r) { return r.questionario_id === id && r.email === aluno.email; })[0]);
  const grupo = q.tda.modo === 'grupo' ? grupoAtualDoAluno_(aluno.email, aluno.turma) : null;
  return {
    id: q.id, titulo: q.titulo, aberta: q.status === 'aberto', modo: q.tda.modo,
    situacao: q.tda.situacao, produto: q.tda.produto, tarefas: q.tda.tarefas, criterios: q.tda.criterios,
    // A rubrica só é mostrada ao aluno depois da correção, junto com os níveis que ele recebeu.
    rubrica: correcao ? q.tda.rubrica : null,
    correcao: correcao,
    entrega: entregaPublica_(entrega, nomes),
    grupo: grupo ? { numero: grupo.numero, nomes: grupo.membros.map(function (m) { return nomes[m] || m; }) } : null,
  };
}

/**
 * Envia (ou reenvia) a TDA. dados: { texto, link, manterAnexos:[ids], arquivos:[{nome, tipo, base64}] }.
 * No modo grupo, a entrega vale para todo o grupo e qualquer integrante pode atualizá-la.
 */
function alunoEnviarTda(id, dados) {
  const aluno = alunoAtual_();
  const q = buscarTda_(id);
  if (q.serie !== serieDaTurma_(aluno.turma)) throw new Error('Esta TDA não é da sua série.');
  if (q.status !== 'aberto') throw new Error('Esta TDA não está mais recebendo entregas.');

  const texto = String(dados.texto || '').trim().slice(0, 20000);
  const link = String(dados.link || '').trim();
  if (link && !/^https?:\/\/\S+$/i.test(link)) throw new Error('O link precisa começar com http:// ou https://');
  const novos = Array.isArray(dados.arquivos) ? dados.arquivos : [];
  const manter = Array.isArray(dados.manterAnexos) ? dados.manterAnexos.map(String) : [];

  const nomes = nomesPorEmail_();
  comTrava_(function () {
    const jaCorrigida = lerRespostas_().some(function (r) { return r.questionario_id === id && r.email === aluno.email; });
    if (jaCorrigida) throw new Error('Esta TDA já foi corrigida pelo professor e não pode mais ser alterada.');

    const entregas = lerEntregas_();
    const atual = entregas.filter(function (e) { return e.questionario_id === id && e.membros.indexOf(aluno.email) !== -1; })[0];
    let grupo = null;
    let membros = [aluno.email];
    if (atual) {
      grupo = atual.grupo;
      membros = atual.membros;
    } else if (q.tda.modo === 'grupo') {
      const g = grupoAtualDoAluno_(aluno.email, aluno.turma);
      if (g) { grupo = g.numero; membros = g.membros; }
    }

    const anexosMantidos = atual ? atual.anexos.filter(function (a) { return manter.indexOf(a.id) !== -1; }) : [];
    if (anexosMantidos.length + novos.length > MAX_ANEXOS) throw new Error('Envie no máximo ' + MAX_ANEXOS + ' anexos.');
    if (!texto && !link && !anexosMantidos.length && !novos.length) throw new Error('Escreva sua resposta, cole um link ou anexe um arquivo.');

    const prefixo = aluno.turma + (grupo ? ' – Grupo ' + grupo : ' – ' + (nomes[aluno.email] || aluno.email));
    const anexos = anexosMantidos.concat(salvarAnexos_(q, novos, prefixo));
    // Saídas da tela: soma o que este aluno informou agora ao que já estava registrado para ele.
    const saidas = atual ? atual.saidas : {};
    const novasSaidas = normalizarSaidas_(dados.saidas);
    const anteriores = saidas[aluno.email] || { vezes: 0, segundos: 0 };
    saidas[aluno.email] = { vezes: anteriores.vezes + novasSaidas.vezes, segundos: anteriores.segundos + novasSaidas.segundos };
    const agora = new Date();
    const linha = linhaDe_('Entregas', {
      questionario_id: id, turma: aluno.turma, grupo: grupo === null ? '' : grupo, membros: membros.join(','),
      email: aluno.email, texto: texto, link: link, anexos_json: JSON.stringify(anexos),
      enviado_em: atual ? aba_('Entregas').getRange(atual._linha, 9).getValue() : agora, atualizado_em: agora,
      saidas_json: JSON.stringify(saidas),
    });
    const aba = aba_('Entregas');
    if (atual) aba.getRange(atual._linha, 1, 1, linha.length).setValues([linha]);
    else aba.appendRow(linha);
  });
  return alunoAbrirTda(id);
}

// ============================================================
// Painel do professor
// ============================================================

function profTdaResultados(id) {
  exigirProfessor_();
  const q = buscarTda_(id);
  delete q._linha;
  const nomes = nomesPorEmail_();
  const turmas = listarTurmas_().filter(function (t) { return t.serie === q.serie; }).map(function (t) { return t.turma; });
  const respostas = lerRespostas_().filter(function (r) { return r.questionario_id === id; });
  const alunos = lerTabela_('Alunos')
    .filter(function (a) { return turmas.indexOf(String(a.turma)) !== -1; })
    .map(function (a) {
      const email = String(a.email).toLowerCase();
      return { email: email, nome: String(a.nome), turma: String(a.turma),
        correcao: correcaoDe_(respostas.filter(function (r) { return r.email === email; })[0]) };
    });
  const grupos = gruposAtuaisPorTurma_();
  const gruposSerie = {};
  turmas.forEach(function (t) { gruposSerie[t] = grupos[t] || []; });
  return {
    questionario: q, turmas: turmas, alunos: alunos, grupos: gruposSerie,
    entregas: lerEntregas_().filter(function (e) { return e.questionario_id === id; })
      .map(function (e) { return entregaPublica_(e, nomes, true); }),
  };
}

/** Grava a correção (níveis 1–4 por critério + comentário) para um ou mais alunos. */
function profCorrigirTda(id, emails, niveis, comentario) {
  exigirProfessor_();
  const q = buscarTda_(id);
  const n = q.tda.rubrica.length;
  if (!Array.isArray(niveis) || niveis.length !== n) throw new Error('Marque um nível em todos os ' + n + ' critérios.');
  const lv = niveis.map(function (v) { return Number(v); });
  if (lv.some(function (v) { return [1, 2, 3, 4].indexOf(v) === -1; })) throw new Error('Marque um nível em todos os critérios.');
  const turmas = listarTurmas_().filter(function (t) { return t.serie === q.serie; }).map(function (t) { return t.turma; });
  const turmaDe = {};
  lerTabela_('Alunos').forEach(function (a) { turmaDe[String(a.email).toLowerCase()] = String(a.turma); });
  const alvos = (emails || []).map(function (e) { return String(e).toLowerCase(); });
  if (!alvos.length) throw new Error('Nenhum aluno selecionado.');
  alvos.forEach(function (e) {
    if (turmas.indexOf(turmaDe[e]) === -1) throw new Error('Há um aluno que não é do ' + q.serie + ' ano. Recarregue a página.');
  });

  const soma = lv.reduce(function (s, v) { return s + v; }, 0);
  const resultado = {
    pontuacao: soma, total: 4 * n, percentual: Math.round((soma / (4 * n)) * 1000) / 10,
    detalhe: { rubrica: lv, comentario: String(comentario || '').trim().slice(0, 5000) },
  };
  comTrava_(function () {
    alvos.forEach(function (e) { gravarResposta_(q, e, turmaDe[e], resultado, 'tda'); });
  });
  return profTdaResultados(id);
}

function profApagarCorrecaoTda(id, emails) {
  exigirProfessor_();
  const alvos = (emails || []).map(function (e) { return String(e).toLowerCase(); });
  comTrava_(function () {
    const aba = aba_('Respostas');
    lerRespostas_()
      .filter(function (r) { return r.questionario_id === id && alvos.indexOf(r.email) !== -1; })
      .map(function (r) { return r._linha; })
      .sort(function (a, b) { return b - a; })
      .forEach(function (l) { aba.deleteRow(l); });
  });
  return profTdaResultados(id);
}
