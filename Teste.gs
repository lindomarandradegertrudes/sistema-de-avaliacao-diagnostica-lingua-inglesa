/**
 * Modo Aluno teste: qualquer conta da escola (professores de outras áreas, direção) abre o link ?modo=teste,
 * escolhe a série e experimenta tudo o que o aluno vê — casos do ano em qualquer degrau, Trilha Base, Meu reforço,
 * questionários e TDAs — sem cadastro.
 * As jogadas ficam na aba Jogadas com a turma TESTE e nunca entram em notas, níveis, relatórios ou listas de alunos.
 * Questionários e TDAs são corrigidos/conferidos na hora, mas nada é gravado.
 * Alunos cadastrados não usam o modo teste (no teste o 3º erro revela a resposta).
 */

const TURMA_TESTE = 'TESTE';
const CHAVE_TESTE = 'aluno_teste';

function testeLigado_(cfg) {
  const v = String((cfg || lerConfig_())[CHAVE_TESTE] || 'SIM').toUpperCase();
  return v !== 'NÃO' && v !== 'NAO';
}

/** Quem está usando o modo teste. Recusa alunos cadastrados e contas de fora da escola. */
function visitante_() {
  const email = usuarioAtual_();
  const cfg = lerConfig_();
  const professor = ehProfessor_(email, cfg);
  if (!professor) validarAluno_(email, cfg);
  if (!testeLigado_(cfg)) throw new Error('O modo Aluno teste está desligado no momento. Fale com o professor de inglês.');
  const aluno = lerTabela_('Alunos').some(function (a) { return String(a.email).toLowerCase() === email; });
  if (aluno && !professor) throw new Error('Você está cadastrado como aluno. Use o link normal do English Learning App.');
  return { email: email, professor: professor };
}

function serieTeste_(serie) { return SERIES.indexOf(serie) !== -1 ? serie : SERIES[0]; }

/** Situação de cada versão (degrau) para o visitante: a jogada mais recente dele. */
function versoesTeste_(m, jogadas) {
  return m.versoes.slice().sort(function (a, b) { return (Number(a.dados.degrau) || 0) - (Number(b.dados.degrau) || 0); }).map(function (c) {
    const j = jogadas.filter(function (x) { return x.caso_id === c.id; }).sort(function (a, b) { return b.numero - a.numero; })[0];
    return {
      id: c.id, degrau: Number(c.dados.degrau) || 0, travas: (c.dados.travas || []).length,
      situacao: !j ? 'nova' : (j.status === 'concluido' ? 'concluida' : 'andamento'),
      pontos: j && j.status === 'concluido' ? j.pontos : null,
    };
  });
}

/** Tela do Aluno teste para a série escolhida. */
function testeObterEstado(serie) {
  const eu = visitante_();
  serie = serieTeste_(serie);
  const casos = lerCasos_();
  const minhas = lerJogadas_(true).filter(function (j) { return j.email === eu.email; });
  const ano = agruparMissoes_(casos.filter(function (c) { return c.serie === serie && !ehTrilha_(c); }));
  const base = agruparMissoes_(casos.filter(function (c) { return ehTrilha_(c); }));
  const lista = function (g) { return Object.keys(g).map(function (k) { return g[k]; }); };
  const casosMap = {};
  casos.forEach(function (c) { casosMap[c.id] = c; });
  const treinos = casos.filter(function (c) { return c.dados.reforco && c.dados.reforco.teste && c.dados.reforco.email === eu.email; });
  const questionarios = lerQuestionarios_().filter(function (q) { return q.serie === serie && q.status === 'aberto'; });
  return {
    teste: true, serie: serie, series: SERIES, email: eu.email,
    appUrl: ScriptApp.getService().getUrl(),
    casos: lista(ano).sort(function (a, b) { return a.mes.localeCompare(b.mes) || a.titulo.localeCompare(b.titulo); }).map(function (m) {
      return { missao: m.missao, titulo: m.titulo, mes: m.mes, numero: m.versoes[0].dados.numero || '', gerado: !!m.versoes[0].dados.gerado, versoes: versoesTeste_(m, minhas) };
    }),
    trilha: lista(base).sort(function (a, b) { return a.ordem - b.ordem; }).map(function (m) {
      return { missao: m.missao, titulo: m.titulo, ordem: m.ordem, tema: m.tema, versoes: versoesTeste_(m, minhas) };
    }),
    reforco: { disponivel: cadeadosParaTreino_(serie, casosMap).length >= 2, feitos: treinos.length },
    questionarios: questionarios.filter(function (q) { return q.tipo !== 'tda'; }).map(function (q) { return { id: q.id, titulo: q.titulo, tipo: q.tipo, total: q.questoes.length }; }),
    tdas: questionarios.filter(function (q) { return q.tipo === 'tda'; }).map(function (q) { return { id: q.id, titulo: q.titulo, modo: q.tda.modo }; }),
  };
}

// ---------- Questionários (corrigidos na hora, nada é gravado) ----------

function questionarioTeste_(id, tipoTda) {
  visitante_();
  const q = tipoTda ? buscarTda_(id) : buscarQuestionario_(id);
  if (q.status !== 'aberto' || (q.tipo === 'tda') !== !!tipoTda) throw new Error('Este item não está aberto no momento.');
  return q;
}

function testeAbrirQuestionario(id) {
  const q = questionarioTeste_(id, false);
  return {
    id: q.id, titulo: q.titulo, monitorar: false,
    questoes: q.questoes.map(function (x) { return { texto_apoio: x.texto_apoio, enunciado: x.enunciado, alternativas: x.alternativas }; }),
  };
}

/** Corrige e devolve só o resultado (acertou/errou cada questão). Não grava resposta. */
function testeResponder(id, marcadas) {
  const q = questionarioTeste_(id, false);
  if (!Array.isArray(marcadas) || marcadas.length !== q.questoes.length) throw new Error('Responda todas as questões.');
  const normalizadas = marcadas.map(function (m, i) {
    const n = Number(m);
    return m !== null && m !== '' && n >= 0 && n < q.questoes[i].alternativas.length ? n : null;
  });
  if (normalizadas.some(function (m) { return m === null; })) throw new Error('Responda todas as questões.');
  const r = corrigir_(q.questoes, normalizadas);
  return { teste: true, titulo: q.titulo, pontuacao: r.pontuacao, total: r.total, percentual: r.percentual, acertos: r.detalhe.acertos };
}

// ---------- TDAs (a entrega é conferida, mas não é gravada nem enviada ao Drive) ----------

function testeAbrirTda(id) {
  const q = questionarioTeste_(id, true);
  return {
    id: q.id, titulo: q.titulo, aberta: true, modo: q.tda.modo, monitorar: false, teste: true, canva: canvaLiberado_(q),
    situacao: q.tda.situacao, produto: q.tda.produto, tarefas: q.tda.tarefas, criterios: q.tda.criterios,
    rubrica: q.tda.rubrica, correcao: null, entrega: null, grupo: null,
  };
}

function testeEnviarTda(id, dados) {
  const q = questionarioTeste_(id, true);
  const liberado = canvaLiberado_(q);
  const texto = dados && dados.formato === 'html' ? textoPuroTda_(limparHtmlTda_(dados.texto)) : String((dados && dados.texto) || '').trim();
  const link = liberado ? String((dados && dados.link) || '').trim() : '';
  const arquivos = liberado && Array.isArray(dados && dados.arquivos) ? dados.arquivos : [];
  if (link && !/^https?:\/\/\S+$/i.test(link)) throw new Error('O link precisa começar com http:// ou https://');
  if (arquivos.length > MAX_ANEXOS) throw new Error('Envie no máximo ' + MAX_ANEXOS + ' anexos.');
  if (!texto && !link && !arquivos.length) throw new Error('Escreva sua resposta, cole um link ou anexe um arquivo.');
  const t = testeAbrirTda(id);
  t.simulado = true;
  return t;
}

// ---------- Meu reforço (treino de exemplo da série escolhida) ----------

function testeNovoReforco(serie) {
  const eu = visitante_();
  serie = serieTeste_(serie);
  const casos = lerCasos_();
  const casosMap = {};
  casos.forEach(function (c) { casosMap[c.id] = c; });
  const meus = casos.filter(function (c) { return c.dados.reforco && c.dados.reforco.teste && c.dados.reforco.email === eu.email && c.serie === serie; });
  const ultimo = meus[meus.length - 1];
  if (ultimo) {
    const j = lerJogadas_(true).filter(function (x) { return x.email === eu.email && x.caso_id === ultimo.id && x.numero === 1; })[0];
    if (!j || j.status !== 'concluido') return { id: ultimo.id };
  }
  // 4 cadeados curtos de habilidades diferentes, sorteados.
  const pool = embaralhar_(cadeadosParaTreino_(serie, casosMap));
  const escolhidos = [], habs = {};
  pool.forEach(function (x) { if (escolhidos.length < CADEADOS_POR_TREINO && !habs[x.hab]) { habs[x.hab] = true; escolhidos.push(x); } });
  pool.forEach(function (x) { if (escolhidos.length < CADEADOS_POR_TREINO && escolhidos.indexOf(x) === -1) escolhidos.push(x); });
  if (escolhidos.length < 2) throw new Error('Ainda não há exercícios curtos para o ' + serie + ' ano.');
  const nomes = {};
  catalogoDaSerie_(serie).forEach(function (h) { nomes[h.id] = h.nome.replace(/^Base: /, ''); });
  const numero = meus.length + 1;
  const caso = {
    id: 'reforco-' + Utilities.getUuid().slice(0, 12), serie: serie, mes: hojeIso_().slice(0, 7), titulo: 'My Training #' + numero + ' (test)',
    dados: {
      saga: 'base', numero: '#T' + numero, reforco: { email: eu.email, numero: numero, teste: true, origens: escolhidos.map(function (x) { return x.origem; }) },
      abertura: { personagem: 'max', nome: 'COACH MAX', texto: "Let's [[practice|praticar]]! Today: " + Object.keys(habs).slice(0, 3).map(function (k) { return nomes[k] || k; }).join(' + ') + '.' },
      evidencias: [], travas: escolhidos.map(function (x) { return JSON.parse(JSON.stringify(x.trava)); }), final: null,
    },
  };
  comTrava_(function () {
    garantirAba_('Casos').appendRow(linhaDe_('Casos', {
      id: caso.id, serie: caso.serie, mes: "'" + caso.mes, titulo: caso.titulo, status: 'aberto', dados_json: JSON.stringify(caso.dados), criado_em: new Date(),
    }));
  });
  return { id: caso.id };
}

// ---------- Recomeçar e limpar ----------

/** Apaga as jogadas e os treinos de teste de um visitante (ou de todos, se email for vazio). incluirProf: também os testes do professor (turma PROF). */
function apagarTeste_(email, incluirProf) {
  comTrava_(function () {
    const linhasJ = lerJogadas_(true).filter(function (j) { return (j.turma === TURMA_TESTE || (incluirProf && j.turma === 'PROF')) && (!email || j.email === email); }).map(function (j) { return j._linha; });
    const abaJ = garantirAba_('Jogadas');
    linhasJ.sort(function (a, b) { return b - a; }).forEach(function (l) { abaJ.deleteRow(l); });
    const linhasC = lerCasos_().filter(function (c) { return c.dados.reforco && c.dados.reforco.teste && (!email || c.dados.reforco.email === email); }).map(function (c) { return c._linha; });
    const abaC = garantirAba_('Casos');
    linhasC.sort(function (a, b) { return b - a; }).forEach(function (l) { abaC.deleteRow(l); });
  });
}

function testeRecomecar(serie) {
  const eu = visitante_();
  apagarTeste_(eu.email, eu.professor);
  return testeObterEstado(serie);
}

// ============================================================
// Painel do professor: aba "Aluno teste"
// ============================================================

function profAlunoTeste() {
  exigirProfessor_();
  const vis = {};
  lerJogadas_(true).filter(function (j) { return j.turma === TURMA_TESTE; }).forEach(function (j) {
    const v = vis[j.email] = vis[j.email] || { email: j.email, jogadas: 0, concluidas: 0, ultimo: '' };
    v.jogadas++;
    if (j.status === 'concluido') v.concluidas++;
    const k = chaveData_(j.atualizado_em || j.iniciado_em);
    if (k > chaveData_(v.ultimo)) v.ultimo = j.atualizado_em || j.iniciado_em;
  });
  return {
    ligado: testeLigado_(),
    link: ScriptApp.getService().getUrl() + '?modo=teste',
    visitantes: Object.keys(vis).map(function (k) { return vis[k]; }).sort(function (a, b) { return chaveData_(b.ultimo).localeCompare(chaveData_(a.ultimo)); }),
  };
}

function profSalvarAlunoTeste(ligado) {
  exigirProfessor_();
  comTrava_(function () {
    const linha = lerTabela_('Config').filter(function (l) { return l.chave === CHAVE_TESTE; })[0];
    const valor = ligado ? 'SIM' : 'NÃO';
    if (linha) aba_('Config').getRange(linha._linha, 2).setValue(valor);
    else aba_('Config').appendRow([CHAVE_TESTE, valor, 'SIM = qualquer conta da escola pode usar o link ?modo=teste (Aluno teste); NÃO = desligado.']);
  });
  return profAlunoTeste();
}

function profLimparTeste() {
  exigirProfessor_();
  apagarTeste_('');
  return profAlunoTeste();
}
