/**
 * Etapa 2: questionários (diagnóstico e mensais), correção online,
 * lançamento de provas impressas, cálculo de níveis e geração de questões com IA.
 */

const NIVEIS = ['Iniciante', 'Básico', 'Intermediário', 'Avançado'];
const LETRAS_ALT = ['A', 'B', 'C', 'D', 'E'];
const DIFICULDADES = ['facil', 'media', 'dificil'];
const STATUS_Q = ['rascunho', 'aberto', 'encerrado'];

// ============================================================
// Leitura e validação
// ============================================================

function serieDaTurma_(turma) {
  const t = listarTurmas_().filter(function (x) { return x.turma === turma; })[0];
  return t ? t.serie : '';
}

function lerQuestionarios_() {
  return lerTabela_('Questionarios').map(function (q) {
    let dados = [];
    try { dados = JSON.parse(q.questoes_json || '[]'); } catch (e) { /* célula corrompida: trata como vazio */ }
    // Questionários guardam a lista de questões; TDAs guardam um objeto (situação, produto, tarefas, rubrica…).
    const ehTda = String(q.tipo) === 'tda';
    return {
      _linha: q._linha,
      id: String(q.id), tipo: String(q.tipo), serie: String(q.serie), mes: String(q.mes),
      titulo: String(q.titulo), conteudo: String(q.conteudo || ''), status: String(q.status || 'rascunho'),
      criado_em: String(q.criado_em),
      questoes: ehTda || !Array.isArray(dados) ? [] : dados,
      tda: ehTda && !Array.isArray(dados) ? dados : null,
    };
  });
}

function buscarQuestionario_(id) {
  const q = lerQuestionarios_().filter(function (x) { return x.id === id; })[0];
  if (!q) throw new Error('Questionário não encontrado. Recarregue a página.');
  return q;
}

function lerRespostas_() {
  return lerTabela_('Respostas').map(function (r) {
    let det = null;
    try { det = r.acertos_json ? JSON.parse(r.acertos_json) : null; } catch (e) { /* ignora */ }
    return {
      _linha: r._linha, questionario_id: String(r.questionario_id), email: String(r.email).toLowerCase(),
      turma: String(r.turma), pontuacao: Number(r.pontuacao), total: Number(r.total),
      percentual: Number(r.percentual), detalhe: det, origem: String(r.origem), respondido_em: String(r.respondido_em),
    };
  });
}

function validarQuestoes_(questoes) {
  if (!Array.isArray(questoes) || !questoes.length) throw new Error('O questionário precisa ter pelo menos uma questão.');
  if (questoes.length > 40) throw new Error('Máximo de 40 questões por questionário.');
  return questoes.map(function (q, i) {
    const n = 'Questão ' + (i + 1) + ': ';
    const alternativas = (q.alternativas || []).map(function (a) { return String(a || '').trim(); });
    if (!String(q.enunciado || '').trim()) throw new Error(n + 'enunciado vazio.');
    if (alternativas.length < 2 || alternativas.length > 5) throw new Error(n + 'use de 2 a 5 alternativas.');
    if (alternativas.some(function (a) { return !a; })) throw new Error(n + 'há alternativa vazia.');
    const correta = Number(q.correta);
    if (!(correta >= 0 && correta < alternativas.length && correta % 1 === 0)) throw new Error(n + 'marque a alternativa correta.');
    return {
      texto_apoio: String(q.texto_apoio || '').trim(),
      enunciado: String(q.enunciado).trim(),
      alternativas: alternativas,
      correta: correta,
      topico: String(q.topico || '').trim() || 'Geral',
      dificuldade: DIFICULDADES.indexOf(q.dificuldade) !== -1 ? q.dificuldade : 'media',
    };
  });
}

function mesAtual_() {
  return Utilities.formatDate(new Date(), FUSO, 'yyyy-MM');
}

// ============================================================
// Níveis
// ============================================================

function nivelDe_(media, cfg) {
  if (media === null || media === undefined) return '';
  if (media >= Number(cfg.faixa_avancado)) return NIVEIS[3];
  if (media >= Number(cfg.faixa_intermediario)) return NIVEIS[2];
  if (media >= Number(cfg.faixa_basico)) return NIVEIS[1];
  return NIVEIS[0];
}

/** Média simples de todos os questionários respondidos (diagnóstico + mensais). */
function calcularNiveis_(cfg) {
  const soma = {};
  lerRespostas_().forEach(function (r) {
    if (isNaN(r.percentual)) return;
    soma[r.email] = soma[r.email] || { total: 0, n: 0 };
    soma[r.email].total += r.percentual;
    soma[r.email].n += 1;
  });
  const res = {};
  Object.keys(soma).forEach(function (email) {
    const media = Math.round((soma[email].total / soma[email].n) * 10) / 10;
    res[email] = { media: media, nivel: nivelDe_(media, cfg), avaliacoes: soma[email].n };
  });
  return res;
}

// ============================================================
// Correção
// ============================================================

/** marcadas: lista de índices (ou null para "em branco"). */
function corrigir_(questoes, marcadas) {
  const acertos = questoes.map(function (q, i) { return marcadas[i] === q.correta; });
  const pontuacao = acertos.filter(Boolean).length;
  return {
    pontuacao: pontuacao,
    total: questoes.length,
    percentual: Math.round((pontuacao / questoes.length) * 1000) / 10,
    detalhe: { marcadas: marcadas, acertos: acertos },
  };
}

/** Grava (ou substitui) a resposta de um aluno a um questionário. Chamar dentro de comTrava_. */
function gravarResposta_(q, email, turma, resultado, origem) {
  const aba = aba_('Respostas');
  const existente = lerRespostas_().filter(function (r) { return r.questionario_id === q.id && r.email === email; })[0];
  const linha = linhaDe_('Respostas', {
    questionario_id: q.id, email: email, turma: turma,
    pontuacao: resultado.pontuacao, total: resultado.total, percentual: resultado.percentual,
    acertos_json: resultado.detalhe ? JSON.stringify(resultado.detalhe) : '',
    origem: origem, respondido_em: new Date(),
  });
  if (existente) aba.getRange(existente._linha, 1, 1, linha.length).setValues([linha]);
  else aba.appendRow(linha);
}

// ============================================================
// Área do aluno
// ============================================================

function pendentesDoAluno_(email, turma) {
  const serie = serieDaTurma_(turma);
  const respondidos = lerRespostas_()
    .filter(function (r) { return r.email === email; })
    .map(function (r) { return r.questionario_id; });
  return lerQuestionarios_()
    .filter(function (q) { return q.tipo !== 'tda' && q.status === 'aberto' && q.serie === serie && respondidos.indexOf(q.id) === -1; })
    .map(function (q) { return { id: q.id, titulo: q.titulo, tipo: q.tipo, total: q.questoes.length }; });
}

function alunoAtual_() {
  const email = usuarioAtual_();
  validarAluno_(email, lerConfig_());
  const aluno = lerTabela_('Alunos').filter(function (a) { return String(a.email).toLowerCase() === email; })[0];
  if (!aluno) throw new Error('Cadastro não encontrado. Recarregue a página.');
  return { email: email, turma: String(aluno.turma) };
}

/** Entrega as questões SEM o gabarito. */
function alunoAbrirQuestionario(id) {
  const aluno = alunoAtual_();
  const pendente = pendentesDoAluno_(aluno.email, aluno.turma).some(function (p) { return p.id === id; });
  if (!pendente) throw new Error('Este questionário não está disponível para você.');
  const q = buscarQuestionario_(id);
  return {
    id: q.id, titulo: q.titulo,
    questoes: q.questoes.map(function (x) {
      return { texto_apoio: x.texto_apoio, enunciado: x.enunciado, alternativas: x.alternativas };
    }),
  };
}

function alunoResponder(id, marcadas) {
  const aluno = alunoAtual_();
  const q = buscarQuestionario_(id);
  if (!Array.isArray(marcadas) || marcadas.length !== q.questoes.length) throw new Error('Responda todas as questões.');
  const normalizadas = marcadas.map(function (m, i) {
    const n = Number(m);
    return m !== null && m !== '' && n >= 0 && n < q.questoes[i].alternativas.length ? n : null;
  });
  if (normalizadas.some(function (m) { return m === null; })) throw new Error('Responda todas as questões.');

  comTrava_(function () {
    const pendente = pendentesDoAluno_(aluno.email, aluno.turma).some(function (p) { return p.id === id; });
    if (!pendente) throw new Error('Este questionário já foi respondido ou foi encerrado.');
    gravarResposta_(q, aluno.email, aluno.turma, corrigir_(q.questoes, normalizadas), 'online');
  });
  return alunoObterEstado();
}

// ============================================================
// Painel do professor – questionários
// ============================================================

function profListarQuestionarios() {
  exigirProfessor_();
  const respostas = lerRespostas_();
  return lerQuestionarios_().map(function (q) {
    delete q._linha;
    q.respostas = respostas.filter(function (r) { return r.questionario_id === q.id; }).length;
    return q;
  }).sort(function (a, b) { return b.mes.localeCompare(a.mes) || a.serie.localeCompare(b.serie); });
}

function profSalvarQuestionario(dados) {
  exigirProfessor_();
  if (['diagnostico', 'mensal', 'tda'].indexOf(dados.tipo) === -1) throw new Error('Tipo inválido.');
  if (SERIES.indexOf(dados.serie) === -1) throw new Error('Série inválida.');
  const titulo = String(dados.titulo || '').trim();
  if (!titulo) throw new Error('Informe um título.');
  const mes = /^\d{4}-\d{2}$/.test(dados.mes) ? dados.mes : mesAtual_();
  const ehTda = dados.tipo === 'tda';
  const conteudoValidado = ehTda ? validarTda_(dados.tda) : validarQuestoes_(dados.questoes);
  const json = JSON.stringify(conteudoValidado);
  if (json.length > 49000) throw new Error('Conteúdo grande demais para a planilha. Reduza os textos ou divida em dois.');

  let id = String(dados.id || '');
  comTrava_(function () {
    const aba = aba_('Questionarios');
    if (!id) {
      id = 'Q' + Utilities.getUuid().replace(/-/g, '').slice(0, 8);
      aba.appendRow(linhaDe_('Questionarios', {
        id: id, tipo: dados.tipo, serie: dados.serie, mes: "'" + mes, titulo: titulo,
        conteudo: String(dados.conteudo || ''), questoes_json: json, status: 'rascunho', form_id: '', criado_em: new Date(),
      }));
      return;
    }
    const atual = buscarQuestionario_(id);
    const temRespostas = lerRespostas_().some(function (r) { return r.questionario_id === id; });
    if (temRespostas && atual.tipo !== dados.tipo) throw new Error('Já há respostas: o tipo não pode mudar.');
    if (temRespostas && !ehTda && JSON.stringify(atual.questoes) !== json) {
      throw new Error('Este questionário já tem respostas: as questões não podem mais ser alteradas.');
    }
    if (temRespostas && ehTda && JSON.stringify(atual.tda.rubrica) !== JSON.stringify(conteudoValidado.rubrica)) {
      throw new Error('Esta TDA já tem correções: a rubrica não pode mais ser alterada (os demais campos, sim).');
    }
    if (temRespostas && atual.serie !== dados.serie) throw new Error('Este questionário já tem respostas: a série não pode mudar.');
    const linha = linhaDe_('Questionarios', {
      id: id, tipo: dados.tipo, serie: dados.serie, mes: "'" + mes, titulo: titulo,
      conteudo: String(dados.conteudo || ''), questoes_json: json, status: atual.status, form_id: '', criado_em: aba.getRange(atual._linha, 10).getValue(),
    });
    aba.getRange(atual._linha, 1, 1, linha.length).setValues([linha]);
  });
  return id;
}

/** Aceita um questionário ou uma lista deles em JSON; cada um vira um rascunho. */
function profImportarQuestionarios(texto) {
  exigirProfessor_();
  let dados;
  try { dados = JSON.parse(texto); } catch (e) { throw new Error('O texto colado não é um JSON válido.'); }
  // Formatos aceitos: um item, uma lista de itens, ou { serie, mes, tdas: [...] } (TDAs da skill de planejamento).
  let lista = Array.isArray(dados) ? dados : [dados];
  if (!Array.isArray(dados) && Array.isArray(dados.tdas)) {
    lista = dados.tdas.map(function (t) {
      return Object.assign({ serie: dados.serie, mes: dados.mes, modo: dados.modo }, t, { tipo: 'tda' });
    });
  }
  // Só a TDA da entrega final (a da última aula) de cada série/mês vai para o sistema;
  // as anteriores são etapas feitas em sala.
  const ehItemTda = function (q) { return q && (q.tipo === 'tda' || Array.isArray(q.rubrica)); };
  const ultimaPorSerieMes = {};
  lista.filter(ehItemTda).forEach(function (q) { ultimaPorSerieMes[q.serie + '|' + (q.mes || '')] = q; });
  lista = lista.filter(function (q) { return !ehItemTda(q) || ultimaPorSerieMes[q.serie + '|' + (q.mes || '')] === q; });
  const ids = lista.map(function (q, i) {
    const n = 'Item ' + (i + 1) + ': ';
    if (!q) throw new Error(n + 'vazio.');
    const ehTda = q.tipo === 'tda' || Array.isArray(q.rubrica);
    if (ehTda) {
      if (SERIES.indexOf(q.serie) === -1) throw new Error(n + 'informe a "serie" da TDA (ex.: "7º").');
      return profSalvarQuestionario({
        tipo: 'tda', serie: q.serie, mes: q.mes, titulo: q.titulo || 'TDA importada', conteudo: q.conteudo || '',
        tda: { modo: q.modo, situacao: q.situacao, produto: q.produto, tarefas: q.tarefas, criterios: q.criterios, rubrica: q.rubrica },
      });
    }
    if (!Array.isArray(q.questoes)) throw new Error(n + 'não encontrei a lista "questoes".');
    return profSalvarQuestionario({
      tipo: q.tipo === 'mensal' ? 'mensal' : 'diagnostico',
      serie: q.serie, mes: q.mes, titulo: q.titulo || 'Questionário importado',
      conteudo: q.conteudo || '', questoes: q.questoes,
    });
  });
  return ids.length;
}

function profAlterarStatus(id, status) {
  exigirProfessor_();
  if (STATUS_Q.indexOf(status) === -1) throw new Error('Status inválido.');
  comTrava_(function () {
    const q = buscarQuestionario_(id);
    aba_('Questionarios').getRange(q._linha, CABECALHOS.Questionarios.indexOf('status') + 1).setValue(status);
  });
  return profListarQuestionarios();
}

function profExcluirQuestionario(id) {
  exigirProfessor_();
  comTrava_(function () {
    const q = buscarQuestionario_(id);
    const aba = aba_('Respostas');
    lerRespostas_()
      .filter(function (r) { return r.questionario_id === id; })
      .map(function (r) { return r._linha; })
      .sort(function (a, b) { return b - a; })
      .forEach(function (l) { aba.deleteRow(l); });
    aba_('Questionarios').deleteRow(q._linha);
  });
  return profListarQuestionarios();
}

/** Alunos das turmas da série, com a resposta de cada um, e taxa de acerto por questão. */
function profResultados(id) {
  exigirProfessor_();
  const q = buscarQuestionario_(id);
  delete q._linha;
  const turmas = listarTurmas_().filter(function (t) { return t.serie === q.serie; }).map(function (t) { return t.turma; });
  const respostas = lerRespostas_().filter(function (r) { return r.questionario_id === id; });
  const alunos = lerTabela_('Alunos')
    .filter(function (a) { return turmas.indexOf(String(a.turma)) !== -1; })
    .map(function (a) {
      const email = String(a.email).toLowerCase();
      const r = respostas.filter(function (x) { return x.email === email; })[0];
      return {
        email: email, nome: String(a.nome), turma: String(a.turma),
        resposta: r ? {
          pontuacao: r.pontuacao, total: r.total, percentual: r.percentual, origem: r.origem,
          respondido_em: r.respondido_em,
          marcadas: r.detalhe && r.detalhe.marcadas ? r.detalhe.marcadas.map(function (m) { return m === null ? '-' : LETRAS_ALT[m]; }).join('') : '',
        } : null,
      };
    });
  const porQuestao = q.questoes.map(function (questao, i) {
    const comDetalhe = respostas.filter(function (r) { return r.detalhe && r.detalhe.acertos; });
    const acertos = comDetalhe.filter(function (r) { return r.detalhe.acertos[i]; }).length;
    return { numero: i + 1, topico: questao.topico, respostas: comDetalhe.length, acertos: acertos };
  });
  return { questionario: q, turmas: turmas, alunos: alunos, porQuestao: porQuestao };
}

/**
 * Lançamento de provas impressas. valor = letras marcadas (ex.: "ABCDA...", use "-" para em branco)
 * ou apenas o número de acertos. Valor vazio não altera nada.
 */
function profLancarRespostas(id, lancamentos) {
  exigirProfessor_();
  const q = buscarQuestionario_(id);
  if (q.tipo === 'tda') throw new Error('TDAs são corrigidas pela rubrica, na tela da TDA.');
  const total = q.questoes.length;
  const turmaDe = {};
  lerTabela_('Alunos').forEach(function (a) { turmaDe[String(a.email).toLowerCase()] = String(a.turma); });

  const resultados = lancamentos.filter(function (l) { return String(l.valor || '').trim(); }).map(function (l) {
    const email = String(l.email).toLowerCase();
    const bruto = String(l.valor).trim().toUpperCase().replace(/[\s,;.]/g, '');
    const nome = l.nome || email;
    let resultado;
    if (/^\d+$/.test(bruto)) {
      const pontos = Number(bruto);
      if (pontos > total) throw new Error(nome + ': acertos maiores que o total de questões (' + total + ').');
      resultado = { pontuacao: pontos, total: total, percentual: Math.round((pontos / total) * 1000) / 10, detalhe: null };
    } else {
      if (bruto.length !== total) throw new Error(nome + ': informe ' + total + ' letras (use "-" para questão em branco). Recebi ' + bruto.length + '.');
      const marcadas = bruto.split('').map(function (c, i) {
        const idx = LETRAS_ALT.indexOf(c);
        if (c === '-' || c === 'X') return null;
        if (idx === -1 || idx >= q.questoes[i].alternativas.length) throw new Error(nome + ': letra inválida "' + c + '" na questão ' + (i + 1) + '.');
        return idx;
      });
      resultado = corrigir_(q.questoes, marcadas);
    }
    return { email: email, resultado: resultado };
  });

  comTrava_(function () {
    resultados.forEach(function (r) { gravarResposta_(q, r.email, turmaDe[r.email] || '', r.resultado, 'impresso'); });
  });
  return profResultados(id);
}

function profExcluirResposta(id, email) {
  exigirProfessor_();
  comTrava_(function () {
    const r = lerRespostas_().filter(function (x) { return x.questionario_id === id && x.email === String(email).toLowerCase(); })[0];
    if (r) aba_('Respostas').deleteRow(r._linha);
  });
  return profResultados(id);
}

// ============================================================
// Geração de questões com a API do Claude
// ============================================================

function profSalvarChaveApi(chave) {
  exigirProfessor_();
  const props = PropertiesService.getScriptProperties();
  chave = String(chave || '').trim();
  if (chave) props.setProperty('ANTHROPIC_API_KEY', chave);
  else props.deleteProperty('ANTHROPIC_API_KEY');
  return !!chave;
}

const ESQUEMA_QUESTOES = {
  type: 'object',
  properties: {
    questoes: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          texto_apoio: { type: 'string' },
          enunciado: { type: 'string' },
          alternativas: { type: 'array', items: { type: 'string' } },
          correta: { type: 'integer' },
          topico: { type: 'string' },
          dificuldade: { type: 'string', enum: DIFICULDADES },
        },
        required: ['texto_apoio', 'enunciado', 'alternativas', 'correta', 'topico', 'dificuldade'],
        additionalProperties: false,
      },
    },
  },
  required: ['questoes'],
  additionalProperties: false,
};

function promptQuestoes_(dados) {
  const tipo = dados.tipo === 'diagnostico' ? 'um teste diagnóstico' : 'um questionário mensal de verificação';
  return [
    'Você é professor de Língua Inglesa da Rede Municipal de Joinville (SC). Elabore ' + tipo +
      ' para alunos do ' + dados.serie + ' ano do Ensino Fundamental II, com ' + dados.quantidade + ' questões de múltipla escolha.',
    '',
    'Conteúdo a avaliar:',
    dados.conteudo,
    '',
    'Regras:',
    '- 4 alternativas por questão, apenas uma correta; distratores plausíveis, baseados em erros comuns de alunos brasileiros.',
    '- Varie a posição da alternativa correta (campo "correta" é o índice 0–3).',
    '- O objetivo é separar os alunos em 4 níveis (Iniciante, Básico, Intermediário, Avançado): cerca de 30% fáceis, 40% médias e 30% difíceis.',
    '- Inclua questões de leitura com um texto curto em inglês no campo "texto_apoio" (localizar informação explícita, inferir informação implícita, identificar assunto); nas demais deixe "texto_apoio" vazio.',
    '- Nada de áudio, imagem ou vídeo: tudo deve funcionar em texto, online e impresso.',
    '- Comandos (enunciados) em português, claros e curtos; frases, textos e alternativas em inglês quando avaliarem a língua.',
    '- Vocabulário e extensão adequados à série. Textos de apoio com no máximo 80 palavras.',
    '- "topico": rótulo curto do que a questão avalia (ex.: "Verb to be", "Leitura – informação implícita").',
  ].join('\n');
}

function chamarClaude_(corpo, chave) {
  const resp = UrlFetchApp.fetch('https://api.anthropic.com/v1/messages', {
    method: 'post',
    contentType: 'application/json',
    headers: corpo.fallbacks
      ? { 'x-api-key': chave, 'anthropic-version': '2023-06-01', 'anthropic-beta': 'server-side-fallback-2026-07-01' }
      : { 'x-api-key': chave, 'anthropic-version': '2023-06-01' },
    payload: JSON.stringify(corpo),
    muteHttpExceptions: true,
  });
  let json = {};
  try { json = JSON.parse(resp.getContentText()); } catch (e) { /* resposta não-JSON */ }
  return { codigo: resp.getResponseCode(), json: json };
}

function profGerarQuestoesIA(dados) {
  exigirProfessor_();
  const chave = PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY');
  if (!chave) throw new Error('Cadastre a chave da API do Claude em Configurações.');
  if (!String(dados.conteudo || '').trim()) throw new Error('Descreva o conteúdo a ser avaliado.');
  const quantidade = Math.min(Math.max(Number(dados.quantidade) || 10, 3), 25);

  const corpo = {
    model: 'claude-opus-5-5',
    max_tokens: 16000,
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: ESQUEMA_QUESTOES } },
    fallbacks: 'default',
    messages: [{ role: 'user', content: promptQuestoes_({ tipo: dados.tipo, serie: dados.serie, conteudo: dados.conteudo, quantidade: quantidade }) }],
  };
  let r = chamarClaude_(corpo, chave);
  if (r.codigo === 400 && JSON.stringify(r.json).indexOf('fallback') !== -1) {
    delete corpo.fallbacks;
    r = chamarClaude_(corpo, chave);
  }
  if (r.codigo === 401) throw new Error('Chave da API inválida. Confira em Configurações.');
  if (r.codigo !== 200) {
    const msg = r.json && r.json.error ? r.json.error.message : 'código ' + r.codigo;
    throw new Error('A API do Claude recusou o pedido: ' + msg);
  }
  if (r.json.stop_reason === 'refusal') throw new Error('A IA não gerou as questões para este conteúdo. Tente reformular o conteúdo.');
  if (r.json.stop_reason === 'max_tokens') throw new Error('A resposta ficou longa demais. Peça menos questões.');
  const texto = (r.json.content || []).filter(function (b) { return b.type === 'text'; }).map(function (b) { return b.text; }).join('');
  let questoes;
  try { questoes = JSON.parse(texto).questoes; } catch (e) { throw new Error('A resposta da IA veio em formato inesperado. Tente de novo.'); }
  return validarQuestoes_(questoes);
}
