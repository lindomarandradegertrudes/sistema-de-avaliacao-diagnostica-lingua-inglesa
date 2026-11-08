/**
 * Recuperação das TDAs por ciclo.
 * Oferecida a quem tirou menos de 10 na TDA; o professor escolhe quem faz e libera em sala
 * (por aluno, por 1 hora ou até clicar em "Encerrar"). O conteúdo vem das habilidades marcadas na TDA.
 * Etapa 1: indicação, liberação e encerramento. Os treinos e as atividades entram nas próximas etapas.
 */

const DURACAO_LIBERACAO_REC_MS = 60 * 60 * 1000;
const MAX_HABILIDADES_TDA = 3;

/** Habilidades da série que podem ser marcadas numa TDA (as da série; a Trilha Base fica de fora). */
function profHabilidadesTda() {
  exigirProfessor_();
  const res = {};
  SERIES.forEach(function (s) {
    res[s] = (HABILIDADES[s] || []).map(function (h) { return { id: h.id, nome: h.nome, codigo: h.codigo }; });
  });
  return res;
}

/** Confere as habilidades marcadas na TDA: só da série, sem repetir, no máximo 3. */
function validarHabilidadesTda_(lista, serie) {
  const validas = (HABILIDADES[serie] || []).map(function (h) { return h.id; });
  const ids = [];
  (Array.isArray(lista) ? lista : []).forEach(function (id) {
    id = String(id || '').trim();
    if (id && validas.indexOf(id) !== -1 && ids.indexOf(id) === -1) ids.push(id);
  });
  if (ids.length > MAX_HABILIDADES_TDA) throw new Error('Marque no máximo ' + MAX_HABILIDADES_TDA + ' habilidades na TDA.');
  return ids;
}

function lerRecuperacoes_() {
  garantirAba_('Recuperacoes');
  return lerTabela_('Recuperacoes').map(function (r) {
    let dados = {};
    try { dados = r.dados_json ? JSON.parse(r.dados_json) : {}; } catch (e) { /* ignora */ }
    return {
      _linha: r._linha, questionario_id: String(r.questionario_id), email: String(r.email).toLowerCase(), turma: String(r.turma),
      indicado_em: String(r.indicado_em), liberado_ate: Number(r.liberado_ate) || 0, dados: dados,
    };
  });
}

function gravarRecuperacao_(r) {
  const linha = linhaDe_('Recuperacoes', {
    questionario_id: r.questionario_id, email: r.email, turma: r.turma, indicado_em: r.indicado_em,
    liberado_ate: r.liberado_ate || '', dados_json: JSON.stringify(r.dados || {}), atualizado_em: new Date(),
  });
  const aba = garantirAba_('Recuperacoes');
  if (r._linha) aba.getRange(r._linha, 1, 1, linha.length).setValues([linha]);
  else aba.appendRow(linha);
}

/** Visão pública: indicado, liberado agora (e até que horas), se já começou e como estão os treinos. */
function situacaoRecuperacao_(r, agora, habs, jogadas) {
  if (!r) return null;
  const liberada = r.liberado_ate > agora;
  return {
    indicado_em: r.indicado_em, liberada: liberada,
    ate: liberada ? Utilities.formatDate(new Date(r.liberado_ate), FUSO, 'HH:mm') : '',
    iniciada: !!(r.dados && r.dados.iniciada_em),
    treinos: resumoTreinosRec_(r, habs || [], jogadas || {}),
    avaliacao: avaliacaoPublica_(r),
    nota: r.dados && r.dados.concluida_em && r.dados.nota != null ? Number(r.dados.nota) : null,
  };
}

/** Andamento das 10 atividades (sem as respostas): para o painel e o cartão do aluno. */
function avaliacaoPublica_(r) {
  const a = r.dados && r.dados.avaliacao;
  if (!a) return null;
  return { iniciada_em: a.iniciada_em, respondidas: a.respostas.length, total: a.questoes.length,
    acertos: a.concluida_em ? a.acertos : null, concluida: !!a.concluida_em, motivo: a.motivo || '', saidas: a.saidas || null };
}

/** { email: situação } da recuperação de uma TDA (para o painel do professor). */
function recuperacoesDaTda_(id) {
  const agora = Date.now();
  const habs = buscarTda_(id).tda.habilidades || [];
  const jogadas = jogadasRec_(null);
  const res = {};
  recuperacoesAtualizadas_(id, null).forEach(function (r) { res[r.email] = situacaoRecuperacao_(r, agora, habs, jogadas); });
  return res;
}

/** Recuperação de um aluno numa TDA (ou null). */
function recuperacaoDoAluno_(id, email) {
  const r = recuperacoesAtualizadas_(id, email)[0];
  if (!r) return null;
  return situacaoRecuperacao_(r, Date.now(), buscarTda_(id).tda.habilidades || [], jogadasRec_(email));
}

/** Confere os alunos escolhidos: da série da TDA e com nota abaixo de 10. Devolve { email: turma }. */
function alvosRecuperacao_(q, emails) {
  const alvos = (emails || []).map(function (e) { return String(e).toLowerCase(); }).filter(String);
  if (!alvos.length) throw new Error('Marque pelo menos um aluno.');
  const turmas = listarTurmas_().filter(function (t) { return t.serie === q.serie; }).map(function (t) { return t.turma; });
  const turmaDe = {};
  const nomeDe = {};
  lerTabela_('Alunos').forEach(function (a) {
    const e = String(a.email).toLowerCase();
    turmaDe[e] = String(a.turma);
    nomeDe[e] = String(a.nome);
  });
  const notas = {};
  lerRespostas_().filter(function (r) { return r.questionario_id === q.id; }).forEach(function (r) { notas[r.email] = r.percentual_tda; });
  const res = {};
  alvos.forEach(function (e) {
    if (turmas.indexOf(turmaDe[e]) === -1) throw new Error('Há um aluno que não é do ' + q.serie + ' ano. Recarregue a página.');
    if (notas[e] == null) throw new Error((nomeDe[e] || e) + ' ainda não tem correção nesta TDA.');
    if (notas[e] >= 100) throw new Error((nomeDe[e] || e) + ' tirou 10 nesta TDA e não precisa de recuperação.');
    res[e] = turmaDe[e];
  });
  return res;
}

/** Indica (ou tira a indicação de) alunos para a recuperação. Quem já começou não pode ser retirado. */
function profIndicarRecuperacao(id, emails, indicar) {
  exigirProfessor_();
  const q = buscarTda_(id);
  if (indicar && !(q.tda.habilidades || []).length) {
    throw new Error('Antes, marque no editor da TDA as habilidades que ela cobra: a recuperação é montada com elas.');
  }
  comTrava_(function () {
    const alvos = indicar ? alvosRecuperacao_(q, emails) : null;
    const lista = (emails || []).map(function (e) { return String(e).toLowerCase(); });
    const atuais = lerRecuperacoes_().filter(function (r) { return r.questionario_id === id; });
    if (indicar) {
      Object.keys(alvos).forEach(function (e) {
        if (atuais.some(function (r) { return r.email === e; })) return;
        gravarRecuperacao_({ questionario_id: id, email: e, turma: alvos[e], indicado_em: Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm'), liberado_ate: 0, dados: {} });
      });
    } else {
      const remover = atuais.filter(function (r) { return lista.indexOf(r.email) !== -1; });
      if (remover.some(function (r) { return r.dados.iniciada_em; })) throw new Error('Há aluno que já começou a recuperação: a indicação não pode mais ser retirada.');
      const aba = aba_('Recuperacoes');
      remover.map(function (r) { return r._linha; }).sort(function (a, b) { return b - a; })
        .forEach(function (l) { aba.deleteRow(l); });
    }
  });
  return profTdaResultados(id);
}

/** Libera agora, por 1 hora, para os alunos marcados (indica quem ainda não estava indicado). */
function profLiberarRecuperacao(id, emails) {
  exigirProfessor_();
  const q = buscarTda_(id);
  if (!(q.tda.habilidades || []).length) {
    throw new Error('Antes, marque no editor da TDA as habilidades que ela cobra: a recuperação é montada com elas.');
  }
  comTrava_(function () {
    const alvos = alvosRecuperacao_(q, emails);
    const ate = Date.now() + DURACAO_LIBERACAO_REC_MS;
    const atuais = lerRecuperacoes_().filter(function (r) { return r.questionario_id === id; });
    Object.keys(alvos).forEach(function (e) {
      const r = atuais.filter(function (x) { return x.email === e; })[0]
        || { questionario_id: id, email: e, turma: alvos[e], indicado_em: Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm'), dados: {} };
      // Atividades interrompidas numa liberação anterior ficam fechadas (o que faltou vale zero).
      if (fecharAvaliacaoVencida_(r, Date.now())) { gravarRecuperacao_(r); return; }
      if (r.dados.concluida_em) return;
      r.liberado_ate = ate;
      gravarRecuperacao_(r);
    });
  });
  return profTdaResultados(id);
}

/** Encerra a liberação agora (para os alunos marcados). */
function profEncerrarRecuperacao(id, emails) {
  exigirProfessor_();
  buscarTda_(id);
  const lista = (emails || []).map(function (e) { return String(e).toLowerCase(); });
  if (!lista.length) throw new Error('Marque pelo menos um aluno.');
  comTrava_(function () {
    lerRecuperacoes_().filter(function (r) { return r.questionario_id === id && lista.indexOf(r.email) !== -1 && r.liberado_ate > Date.now(); })
      .forEach(function (r) { r.liberado_ate = 0; fecharAvaliacaoVencida_(r, Date.now()); gravarRecuperacao_(r); });
  });
  return profTdaResultados(id);
}

/** Correção apagada: tira a indicação de quem ainda não começou a recuperação. */
function removerRecuperacoesNaoIniciadas_(id, emails) {
  const aba = aba_('Recuperacoes');
  lerRecuperacoes_().filter(function (r) { return r.questionario_id === id && emails.indexOf(r.email) !== -1 && !r.dados.iniciada_em; })
    .map(function (r) { return r._linha; }).sort(function (a, b) { return b - a; })
    .forEach(function (l) { aba.deleteRow(l); });
}

// ============================================================
// Etapa 2: ficha + treino de cada habilidade (sem nota; mínimo de 70 pontos, até 2 tentativas)
// ============================================================

const MINIMO_TREINO_REC = 70;
const TENTATIVAS_TREINO_REC = 2;

function ehRecuperacao_(c) { return !!(c && c.dados && c.dados.recuperacao); }

/** A recuperação do aluno nessa TDA precisa estar liberada agora (só se faz em sala). */
function exigirRecLiberada_(qid, email) {
  const r = lerRecuperacoes_().filter(function (x) { return x.questionario_id === qid && x.email === email; })[0];
  if (!r) throw new Error('Você não foi indicado para esta recuperação.');
  if (!(r.liberado_ate > Date.now())) throw new Error('A recuperação não está liberada agora. Ela é feita na aula, quando o professor libera.');
  return r;
}

/** Situação dos treinos: uma linha por habilidade da TDA. jogadas = { caso_id: jogada nº 1 do aluno }. */
function resumoTreinosRec_(r, habs, jogadas) {
  const treinos = (r.dados && r.dados.treinos) || {};
  const lista = habs.map(function (h) {
    const casos = treinos[h] || [];
    const feitas = casos.map(function (id) { return jogadas[id]; }).filter(function (j) { return j && j.status === 'concluido'; });
    const melhor = feitas.length ? Math.max.apply(null, feitas.map(function (j) { return j.pontos; })) : null;
    const atingiu = melhor != null && melhor >= MINIMO_TREINO_REC;
    return {
      hab: h, nome: nomeHabilidade_(h).replace(/^Base: /, ''), tentativas: casos.length, feitas: feitas.length, melhor: melhor,
      atingiu: atingiu, encerrado: atingiu || feitas.length >= TENTATIVAS_TREINO_REC,
    };
  });
  return { habilidades: lista, concluidos: lista.length > 0 && lista.every(function (x) { return x.encerrado; }) };
}

function jogadasRec_(email) {
  const res = {};
  jogadasLeves_(false).forEach(function (j) { if (j.numero === 1 && (!email || j.email === email) && /^rec-/.test(j.caso_id)) res[j.caso_id] = j; });
  return res;
}

/** Monta (sem gravar) um treino de 4 cadeados da habilidade, evitando os cadeados já usados nesta recuperação. */
function montarTreinoRec_(q, r, hab, tentativa) {
  const casosMap = {};
  lerCasos_().forEach(function (c) { casosMap[c.id] = c; });
  const pool = cadeadosParaTreino_(q.serie, casosMap).filter(function (x) { return x.hab === hab; });
  if (pool.length < 2) throw new Error('Ainda não há exercícios suficientes de "' + nomeHabilidade_(hab) + '" para a recuperação. Avise o professor.');
  const usados = {};
  Object.keys(casosMap).forEach(function (k) {
    const rc = casosMap[k].dados.recuperacao;
    if (rc && rc.questionario_id === q.id && rc.email === r.email) (rc.origens || []).forEach(function (o) { usados[o] = true; });
  });
  const novos = embaralhar_(pool.filter(function (x) { return !usados[x.origem]; }));
  const velhos = embaralhar_(pool.filter(function (x) { return usados[x.origem]; }));
  const escolhidos = novos.concat(velhos).slice(0, CADEADOS_POR_TREINO);
  const nome = nomeHabilidade_(hab).replace(/^Base: /, '');
  const caso = {
    id: 'rec-' + Utilities.getUuid().slice(0, 12), serie: q.serie, mes: hojeIso_().slice(0, 7), titulo: 'Recovery · ' + nome + (tentativa > 1 ? ' (2nd try)' : ''),
    dados: {
      saga: 'base', numero: '#R' + tentativa,
      recuperacao: { questionario_id: q.id, email: r.email, hab: hab, tentativa: tentativa, origens: escolhidos.map(function (x) { return x.origem; }) },
      abertura: { personagem: 'max', nome: 'COACH MAX', texto: 'Recovery training: ' + nome + '. Score ' + MINIMO_TREINO_REC + ' points or more to pass! [[Hints|dicas]] are OK.' },
      evidencias: [], travas: escolhidos.map(function (x) { return JSON.parse(JSON.stringify(x.trava)); }), final: null,
    },
  };
  return caso;
}

/**
 * Próximo passo da recuperação do aluno: continua o treino em andamento, monta a 2ª tentativa
 * (se ficou abaixo de 70) ou o treino da próxima habilidade. Devolve { url } ou { fim: true }.
 */
function alunoRecuperacaoProximo(qid) {
  const eu = jogador_();
  if (eu.professor || eu.teste) throw new Error('A recuperação é feita pelo aluno indicado.');
  const q = buscarTda_(qid);
  const habs = q.tda.habilidades || [];
  if (!habs.length) throw new Error('O professor ainda não marcou as habilidades desta TDA.');
  // As leituras pesadas (jogadas, banco de cadeados) ficam FORA da trava única: com a turma toda
  // começando junta, a trava presa por segundos formava fila e dava "Tempo limite do bloqueio".
  const r0 = exigirRecLiberada_(qid, eu.email);
  const treinos0 = (r0.dados && r0.dados.treinos) || {};
  const jogadas = jogadasRec_(eu.email);
  let proximo = null, novo = null;
  for (let i = 0; i < habs.length && !proximo && !novo; i++) {
    const h = habs[i];
    const casos = treinos0[h] || [];
    const ultimo = casos[casos.length - 1];
    if (ultimo && !(jogadas[ultimo] && jogadas[ultimo].status === 'concluido')) { proximo = ultimo; break; }
    if (resumoTreinosRec_(r0, [h], jogadas).habilidades[0].encerrado) continue;
    novo = { hab: h, tentativa: casos.length + 1, caso: montarTreinoRec_(q, r0, h, casos.length + 1) };
  }
  const urlDe = function (id) { return { url: ScriptApp.getService().getUrl() + '?caso=' + encodeURIComponent(id) }; };
  if (proximo && r0.dados && r0.dados.iniciada_em) return urlDe(proximo);
  // Dentro da trava: só reler a linha do aluno e gravar.
  comTrava_(function () {
    const r = lerRecuperacoes_().filter(function (x) { return x.questionario_id === qid && x.email === eu.email; })[0];
    if (!r) throw new Error('Você não foi indicado para esta recuperação.');
    r.dados = r.dados || {};
    r.dados.treinos = r.dados.treinos || {};
    if (!r.dados.iniciada_em) r.dados.iniciada_em = Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');
    if (novo) {
      const lista = r.dados.treinos[novo.hab] || [];
      if (lista.length >= novo.tentativa) proximo = lista[lista.length - 1]; // clique duplo: o treino já foi montado
      else {
        const c = novo.caso;
        garantirAba_('Casos').appendRow(linhaDe_('Casos', {
          id: c.id, serie: c.serie, mes: "'" + c.mes, titulo: c.titulo, status: 'aberto', dados_json: JSON.stringify(c.dados), criado_em: new Date(),
        }));
        r.dados.treinos[novo.hab] = lista.concat([c.id]);
        proximo = c.id;
      }
    } else if (!proximo && !r.dados.treinos_concluidos_em) r.dados.treinos_concluidos_em = Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');
    gravarRecuperacao_(r);
  });
  if (proximo) return urlDe(proximo);
  // Treinos concluídos: link direto para as 10 atividades (abre a TDA já nas regras), se o pacote existir.
  const atividades = lerPacoteRec_(qid) && !(r0.dados && r0.dados.concluida_em)
    ? ScriptApp.getService().getUrl() + '?rec=' + encodeURIComponent(qid) : null;
  return { fim: true, atividades: atividades };
}

// ============================================================
// Etapa 3: pacote de recuperação (Gerador) e as 10 atividades avaliativas
// ============================================================

const QUESTOES_PACOTE_REC = 15;
const ATIVIDADES_REC = 10;
const TIPOS_QUESTAO_REC = ['leitura', 'completar', 'erro'];

function lerPacoteRec_(qid) {
  garantirAba_('PacotesRec');
  const l = lerTabela_('PacotesRec').filter(function (x) { return String(x.questionario_id) === qid; })[0];
  if (!l) return null;
  let itens = [];
  try { itens = JSON.parse(l.itens_json); } catch (e) { return null; }
  return { _linha: l._linha, itens: itens, criado_em: String(l.criado_em) };
}

/** Texto do pedido para o claude.ai: questões difíceis e contextualizadas das habilidades da TDA. */
function pedidoRecuperacao_(q) {
  const habs = q.tda.habilidades || [];
  if (!habs.length) throw new Error('Marque no editor da TDA as habilidades que ela cobra.');
  const editadas = fichasEditadas_(), padrao = fichasPadrao_();
  const L = [];
  L.push('Você vai criar uma AVALIAÇÃO DE RECUPERAÇÃO de inglês para alunos do ' + q.serie + ' ano de uma escola pública de Joinville (SC).');
  L.push('Ela substitui a nota de uma tarefa (TDA) em que o aluno não tirou 10. Os alunos já estudaram e treinaram as habilidades abaixo.');
  L.push('A recuperação NÃO pode ser mais fácil que a TDA: se for, os alunos deixam de se esforçar na TDA.');
  L.push('');
  L.push('TDA: "' + q.titulo + '"');
  if (q.tda.situacao) L.push('Situação da TDA: ' + q.tda.situacao);
  if (q.tda.produto) L.push('Produto da TDA: ' + q.tda.produto);
  const crit = (q.tda.rubrica || []).map(function (r) { return r.criterio; }).filter(String);
  if (crit.length) L.push('Critérios da rubrica: ' + crit.join('; '));
  L.push('');
  L.push('HABILIDADES (use o id no campo "habilidade"; distribua as questões de forma equilibrada entre elas):');
  habs.forEach(function (id) {
    const h = habilidadePorId_(q.serie, id) || { nome: nomeHabilidade_(id), codigo: '' };
    const f = fichaDe_(id, editadas, padrao);
    L.push('- "' + id + '" = ' + h.nome + (h.codigo ? ' (' + h.codigo + ')' : '') + (f && f.regra ? '. O que foi ensinado: ' + String(f.regra).replace(/\*/g, '') : ''));
  });
  L.push('');
  L.push('TAREFA: crie EXATAMENTE ' + QUESTOES_PACOTE_REC + ' questões de múltipla escolha. O app sorteia ' + ATIVIDADES_REC + ' para cada aluno e embaralha as opções.');
  L.push('REGRAS');
  L.push('- Dificuldade: no nível da TDA ou acima. Nada de questões óbvias, que se resolvem só olhando a forma das palavras.');
  L.push('- TODAS contextualizadas: cada questão parte de uma situação curta (mensagem, post, diálogo, cartaz, e-mail, notícia de 1 a 4 frases).');
  L.push('- Sempre 4 opções, com UMA única resposta certa e sem ambiguidade. Proibido verdadeiro/falso, sim/não ou questões de 2 opções.');
  L.push('- Distratores fortes: baseados em erros comuns de alunos brasileiros (tradução literal, falta do -s, did + passado, he/she trocados, falsos cognatos, preposição do português etc.). Todas as opções devem ter tamanho e forma parecidos.');
  L.push('- Tipos (misture): "leitura" (cerca de 6) = situação + pergunta de compreensão ou inferência; "completar" (cerca de 6) = situação + frase com UMA lacuna ___; "erro" (cerca de 3) = situação + "Which sentence is correct?" ou "Which sentence has a mistake?", com 4 frases como opções.');
  L.push('- Conteúdo em INGLÊS; só o campo "por_que" em português (explicação curta da resposta, para o professor).');
  L.push('- Nada de violência, marcas reais, pessoas reais ou temas sensíveis. Pode citar Joinville.');
  L.push('- Responda SOMENTE com o JSON, dentro de um bloco ```json, sem comentários.');
  L.push('');
  L.push('FORMATO (siga exatamente; o conteúdo abaixo é só exemplo):');
  L.push('```json');
  L.push(JSON.stringify({ tipo: 'recuperacao', itens: [
    { tipo: 'leitura', habilidade: habs[0], texto: 'Hi Leo! I couldn\'t go to the party yesterday because my grandma was sick. Did you have fun? – Mia', pergunta: 'Why didn\'t Mia go to the party?', opcoes: ['Her grandmother was ill.', 'She was sick.', 'She didn\'t want to go.', 'Leo didn\'t invite her.'], certa: 0, por_que: 'A avó estava doente; "she was sick" troca a pessoa.' },
    { tipo: 'completar', habilidade: habs[0], texto: 'Text message from Ben:', frase: 'Sorry, I ___ your message last night. My phone was off.', opcoes: ['didn\'t see', 'didn\'t saw', 'don\'t saw', 'not saw'], certa: 0, por_que: 'Depois de didn\'t o verbo fica na forma base.' },
    { tipo: 'erro', habilidade: habs[habs.length - 1], texto: 'Ana is writing about her weekend.', pergunta: 'Which sentence is correct?', opcoes: ['We went to the beach on Saturday.', 'We go to the beach on Saturday last.', 'We goed to the beach on Saturday.', 'We did went to the beach on Saturday.'], certa: 0, por_que: 'Passado irregular: go → went.' },
  ] }, null, 1));
  L.push('```');
  return L.join('\n');
}

function profPedidoRecuperacao(id) {
  exigirProfessor_();
  return pedidoRecuperacao_(buscarTda_(id));
}

/** Confere o pacote vindo do claude.ai. Devolve as questões normalizadas. */
function validarPacoteRec_(d, q) {
  const habs = q.tda.habilidades || [];
  const itens = Array.isArray(d && d.itens) ? d.itens : [];
  exigir_(itens.length >= ATIVIDADES_REC + 2 && itens.length <= 20, 'Pacote', 'precisa ter ' + QUESTOES_PACOTE_REC + ' questões (veio ' + itens.length + ').');
  const res = itens.map(function (it, k) {
    it = it || {};
    const onde = 'Questão ' + (k + 1);
    const tipo = tipoDe_(it.tipo);
    exigir_(TIPOS_QUESTAO_REC.indexOf(tipo) !== -1, onde, '"tipo" deve ser "leitura", "completar" ou "erro".');
    const v = semAcento_(texto_(it.habilidade));
    const hab = habs.filter(function (id) { return semAcento_(id) === v || semAcento_(nomeHabilidade_(id)) === v; })[0] || '';
    exigir_(hab, onde, '"habilidade" deve ser uma das habilidades da TDA (' + habs.join(', ') + ').');
    const o = (it.opcoes || []).map(texto_);
    opcoesValidas_(o, 4, 4, onde);
    const contexto = texto_(it.texto).slice(0, 700);
    let enunciado;
    if (tipo === 'completar') {
      enunciado = texto_(it.frase || it.pergunta).replace(/_{3,}/g, '___');
      exigir_((enunciado.match(/___/g) || []).length === 1, onde, 'a frase precisa ter exatamente UMA lacuna ___.');
    } else {
      enunciado = texto_(it.pergunta);
      exigir_(enunciado, onde, 'precisa de "pergunta".');
      if (tipo === 'leitura') exigir_(contexto, onde, 'a leitura precisa de "texto".');
    }
    return { tipo: tipo, hab: hab, contexto: contexto, enunciado: enunciado.slice(0, 400), opcoes: o.map(function (x) { return x.slice(0, 300); }),
      certa: indiceValido_(it.certa, o.length, onde, o), porque: texto_(it.por_que || it.porque).slice(0, 400) };
  });
  habs.forEach(function (h) {
    exigir_(res.filter(function (x) { return x.hab === h; }).length >= 2, 'Pacote', 'cada habilidade precisa de pelo menos 2 questões (faltou "' + nomeHabilidade_(h) + '").');
  });
  return res;
}

function profImportarPacoteRec(id, texto) {
  exigirProfessor_();
  const q = buscarTda_(id);
  const itens = validarPacoteRec_(extrairJson_(texto), q);
  comTrava_(function () {
    const atual = lerPacoteRec_(id);
    const linha = linhaDe_('PacotesRec', { questionario_id: id, itens_json: JSON.stringify(itens), criado_em: new Date() });
    const aba = garantirAba_('PacotesRec');
    if (atual) aba.getRange(atual._linha, 1, 1, linha.length).setValues([linha]);
    else aba.appendRow(linha);
  });
  return profTdaResultados(id);
}

/** As questões do pacote com as respostas (só para o professor conferir). */
function profVerPacoteRec(id) {
  exigirProfessor_();
  const p = lerPacoteRec_(id);
  if (!p) throw new Error('Esta TDA ainda não tem pacote de recuperação.');
  return p.itens.map(function (x) { return Object.assign({}, x, { nome: nomeHabilidade_(x.hab) }); });
}

function profApagarPacoteRec(id) {
  exigirProfessor_();
  comTrava_(function () {
    const p = lerPacoteRec_(id);
    if (p) garantirAba_('PacotesRec').deleteRow(p._linha);
  });
  return profTdaResultados(id);
}

/** Sorteia 10 questões equilibrando as habilidades; embaralha as opções (a certa muda de lugar para cada aluno). */
function sortearAvaliacaoRec_(itens) {
  const porHab = {};
  itens.forEach(function (x) { (porHab[x.hab] = porHab[x.hab] || []).push(x); });
  const filas = Object.keys(porHab).map(function (h) { return embaralhar_(porHab[h]); });
  const escolhidas = [];
  for (let i = 0; escolhidas.length < ATIVIDADES_REC && filas.some(function (f) { return f.length; }); i++) {
    const f = filas[i % filas.length];
    if (f.length) escolhidas.push(f.shift());
  }
  return embaralhar_(escolhidas).map(function (x) {
    const ordem = embaralhar_(x.opcoes.map(function (_, k) { return k; }));
    return { tipo: x.tipo, hab: x.hab, contexto: x.contexto, enunciado: x.enunciado,
      opcoes: ordem.map(function (k) { return x.opcoes[k]; }), certa: ordem.indexOf(x.certa) };
  });
}

/** Fecha a avaliação: o que não foi respondido vale zero. Nota de 0 a 10 (1 ponto por questão). */
function concluirAvaliacaoRec_(r, motivo) {
  const a = r.dados.avaliacao;
  a.acertos = a.respostas.filter(function (x) { return x.ok; }).length;
  a.concluida_em = Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');
  a.motivo = motivo;
  r.dados.nota = a.acertos;
  r.dados.concluida_em = a.concluida_em;
}

/** Liberação acabou (1 hora ou "Encerrar") com a avaliação no meio: fecha valendo o que foi respondido. */
function fecharAvaliacaoVencida_(r, agora) {
  const a = r.dados && r.dados.avaliacao;
  if (!a || a.concluida_em || r.liberado_ate > agora) return false;
  concluirAvaliacaoRec_(r, 'tempo');
  return true;
}

/** Fecha as avaliações vencidas desta TDA (ou de um aluno) e devolve as linhas atualizadas. travado: já está dentro de comTrava_. */
function recuperacoesAtualizadas_(id, email, travado) {
  const filtro = function (r) { return r.questionario_id === id && (!email || r.email === email); };
  const fechar = function () {
    const lista = lerRecuperacoes_().filter(filtro);
    lista.forEach(function (r) { if (fecharAvaliacaoVencida_(r, Date.now())) gravarRecuperacao_(r); });
    return lista;
  };
  const agora = Date.now();
  const lista = lerRecuperacoes_().filter(filtro);
  if (!lista.some(function (r) { return r.dados.avaliacao && !r.dados.avaliacao.concluida_em && !(r.liberado_ate > agora); })) return lista;
  return travado ? fechar() : comTrava_(fechar);
}

/** O que o aluno vê da avaliação: a questão atual (sem a resposta) ou o resultado. */
function visaoAvaliacaoRec_(r) {
  const a = r.dados.avaliacao;
  const base = { total: a.questoes.length, respondidas: a.respostas.length, ate: Utilities.formatDate(new Date(r.liberado_ate), FUSO, 'HH:mm') };
  if (a.concluida_em) return Object.assign(base, { fim: true, acertos: a.acertos, nota: r.dados.nota, motivo: a.motivo });
  const x = a.questoes[a.respostas.length];
  return Object.assign(base, { questao: { numero: a.respostas.length + 1, tipo: x.tipo, contexto: x.contexto, enunciado: x.enunciado, opcoes: x.opcoes } });
}

function exigirAvaliacaoAberta_(qid, email, travado) {
  const r = recuperacoesAtualizadas_(qid, email, travado)[0];
  if (!r) throw new Error('Você não foi indicado para esta recuperação.');
  if (r.dados.avaliacao && r.dados.avaliacao.concluida_em) return r;
  if (!(r.liberado_ate > Date.now())) throw new Error('A recuperação não está liberada agora. Ela é feita na aula, quando o professor libera.');
  return r;
}

/** Começa (ou continua, se recarregou a página) as 10 atividades. */
function alunoRecAvaliacao(qid) {
  const eu = jogador_();
  if (eu.professor || eu.teste) throw new Error('A recuperação é feita pelo aluno indicado.');
  const q = buscarTda_(qid);
  // Conferências e sorteio fora da trava; dentro dela, só gravar.
  const r0 = exigirAvaliacaoAberta_(qid, eu.email, false);
  if (r0.dados.avaliacao) return visaoAvaliacaoRec_(r0);
  if (!resumoTreinosRec_(r0, q.tda.habilidades || [], jogadasRec_(eu.email)).concluidos) throw new Error('Termine os treinos primeiro.');
  const p = lerPacoteRec_(qid);
  if (!p) throw new Error('O professor ainda está preparando as atividades. Aguarde.');
  const questoes = sortearAvaliacaoRec_(p.itens);
  return comTrava_(function () {
    const r = exigirAvaliacaoAberta_(qid, eu.email, true);
    if (!r.dados.avaliacao) {
      r.dados.avaliacao = { iniciada_em: Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm'), questoes: questoes, respostas: [], saidas: { vezes: 0, segundos: 0 } };
      gravarRecuperacao_(r);
    }
    return visaoAvaliacaoRec_(r);
  });
}

/** Uma resposta por questão, sem voltar e sem dicas: acertou vale 1, errou vale 0. */
function alunoRecResponder(qid, numero, opcao, saidas) {
  const eu = jogador_();
  if (eu.professor || eu.teste) throw new Error('A recuperação é feita pelo aluno indicado.');
  return comTrava_(function () {
    const r = exigirAvaliacaoAberta_(qid, eu.email, true);
    const a = r.dados.avaliacao;
    if (!a) throw new Error('Comece as atividades primeiro.');
    if (a.concluida_em) return visaoAvaliacaoRec_(r);
    if (Number(numero) !== a.respostas.length + 1) return visaoAvaliacaoRec_(r);
    const x = a.questoes[a.respostas.length];
    const o = Number(opcao);
    if (!(o >= 0 && o < x.opcoes.length && o % 1 === 0)) throw new Error('Escolha uma das opções.');
    a.respostas.push({ o: o, ok: o === x.certa });
    const s = normalizarSaidas_(saidas);
    a.saidas = { vezes: Math.max(a.saidas.vezes, s.vezes), segundos: Math.max(a.saidas.segundos, s.segundos) };
    if (a.respostas.length === a.questoes.length) concluirAvaliacaoRec_(r, 'completa');
    gravarRecuperacao_(r);
    return visaoAvaliacaoRec_(r);
  });
}

/** Notas da recuperação já concluídas: { "tda|email": percentual (0–100) }. */
function notasRecuperacao_() {
  const res = {};
  lerRecuperacoes_().forEach(function (r) {
    if (r.dados && r.dados.concluida_em && r.dados.nota != null) res[r.questionario_id + '|' + r.email] = Number(r.dados.nota) * 10;
  });
  return res;
}

// ============================================================
// Etapa 5: relatórios (quadro geral, planilha exportada e evolução do aluno)
// ============================================================

/** Uma linha por aluno indicado, em todas as TDAs: notas, treinos, atividades e saídas da tela. */
function linhasRecuperacao_() {
  const nomes = nomesPorEmail_();
  const respostas = {};
  lerRespostas_().forEach(function (r) { respostas[r.questionario_id + '|' + r.email] = r; });
  const jogadas = jogadasRec_(null);
  const tdas = {};
  lerQuestionarios_().forEach(function (q) { if (q.tipo === 'tda' && q.tda) tdas[q.id] = q; });
  const ids = {};
  lerRecuperacoes_().forEach(function (r) { if (tdas[r.questionario_id] && !ehTurmaTeste_(r.turma)) ids[r.questionario_id] = true; });
  const agora = Date.now();
  const linhas = [];
  Object.keys(ids).forEach(function (id) {
    const q = tdas[id];
    recuperacoesAtualizadas_(id, null).forEach(function (r) {
      if (ehTurmaTeste_(r.turma)) return; // relatório sem o Aluno Teste
      const s = situacaoRecuperacao_(r, agora, q.tda.habilidades || [], jogadas);
      const resp = respostas[id + '|' + r.email];
      const tda = resp ? resp.percentual_tda : null;
      linhas.push({
        turma: r.turma, nome: nomes[r.email] || r.email, email: r.email, tda_id: id, tda: q.titulo, mes: q.mes, serie: q.serie,
        nota_tda: tda, nota_rec: s.nota, final: tda == null ? null : s.nota != null ? Math.max(tda, s.nota * 10) : tda,
        situacao: s.nota != null ? 'concluida' : s.liberada ? 'liberada' : s.iniciada ? 'iniciada' : 'indicado',
        treinos: s.treinos.habilidades.map(function (h) { return { nome: h.nome, melhor: h.melhor, atingiu: h.atingiu, encerrado: h.encerrado }; }),
        avaliacao: s.avaliacao,
      });
    });
  });
  return linhas.sort(function (a, b) {
    return a.turma.localeCompare(b.turma) || b.mes.localeCompare(a.mes) || a.tda.localeCompare(b.tda) || a.nome.localeCompare(b.nome, 'pt-BR');
  });
}

function profRelatorioRecuperacoes() {
  exigirProfessor_();
  return { linhas: linhasRecuperacao_() };
}

const SITUACAO_REC = { indicado: 'Indicado', liberada: 'Liberada agora', iniciada: 'Começou', concluida: 'Concluída' };

/** Texto curto dos treinos para a planilha: "Simple past ✅ 85 · Connectors ⚠️ 60". */
function textoTreinosRec_(treinos) {
  return treinos.map(function (h) {
    return h.nome + ' ' + (h.atingiu ? '✅ ' + h.melhor : h.encerrado ? '⚠️ ' + h.melhor + ' (não atingiu 70%)' : h.melhor != null ? h.melhor + ' (1ª tentativa)' : '—');
  }).join(' · ');
}

// ============================================================
// Testes do professor: zerar a recuperação de um aluno de teste
// ============================================================

/** Apaga a recuperação, os treinos e as jogadas dos treinos de um aluno com "Teste" no nome (para testar de novo). */
function profZerarRecuperacao(id, email) {
  exigirProfessor_();
  buscarTda_(id);
  email = String(email || '').toLowerCase();
  const nome = nomesPorEmail_()[email] || '';
  if (!/teste/i.test(nome)) throw new Error('Só alunos com "Teste" no nome podem ter a recuperação zerada.');
  // Fora da trava: quais casos são os treinos deste aluno nesta TDA (a aba Casos é grande).
  const casos = {};
  lerCasos_().forEach(function (c) {
    const rc = c.dados && c.dados.recuperacao;
    if (rc && rc.questionario_id === id && rc.email === email) casos[c.id] = true;
  });
  // Dentro da trava: só colunas pequenas para achar as linhas e apagar (de baixo para cima).
  comTrava_(function () {
    const apagar = function (aba, linhas) { linhas.sort(function (a, b) { return b - a; }).forEach(function (l) { aba.deleteRow(l); }); };
    apagar(garantirAba_('Recuperacoes'), lerRecuperacoes_().filter(function (r) { return r.questionario_id === id && r.email === email; }).map(function (r) { return r._linha; }));
    apagar(garantirAba_('Jogadas'), jogadasLeves_(false).filter(function (j) { return j.email === email && casos[j.caso_id]; }).map(function (j) { return j._linha; }));
    const abaC = garantirAba_('Casos');
    const n = abaC.getLastRow() - 1;
    const ids = n > 0 ? abaC.getRange(2, 1, n, 1).getValues() : [];
    apagar(abaC, ids.map(function (v, i) { return casos[String(v[0])] ? i + 2 : 0; }).filter(Boolean));
  });
  return profTdaResultados(id);
}
