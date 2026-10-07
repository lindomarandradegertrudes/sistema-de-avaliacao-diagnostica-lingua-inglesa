/**
 * Etapa 3: dificuldades por habilidade e reforço individual.
 * Fontes: questões do diagnóstico e dos mensais (com detalhe por questão), rubricas das TDAs,
 * cadeados dos casos (ciclos e treino), da Trilha Base e do "Meu reforço".
 * Cada observação vale de 0 a 1 (questão certa/errada, nível da rubrica ÷ 4, pontos do cadeado ÷ valor)
 * e pesa mais quando é recente. Dificuldade = acerto abaixo de 60% com pelo menos 3 itens.
 */

const LIMIAR_DIFICULDADE = 60;
const MIN_ITENS_DIFICULDADE = 3;
const CADEADOS_POR_TREINO = 4;

/** Peso pelo tempo: 1 hoje, 0,5 há 60 dias, 0,33 há 120 dias… */
function pesoTempo_(texto) {
  const k = chaveData_(texto);
  if (!k) return 0.5;
  const d = new Date(Number(k.slice(0, 4)), Number(k.slice(4, 6)) - 1, Number(k.slice(6, 8)));
  const dias = Math.max(0, (Date.now() - d.getTime()) / 86400000);
  return 1 / (1 + dias / 60);
}

/** Lê uma vez tudo o que o cálculo precisa. */
function contextoDificuldades_() {
  const questionarios = {};
  lerQuestionarios_().forEach(function (q) { questionarios[q.id] = q; });
  const casos = {};
  lerCasos_().forEach(function (c) { casos[c.id] = c; });
  return { questionarios: questionarios, respostas: lerRespostas_(), jogadas: lerJogadas_(), casos: casos };
}

function fonteDoCaso_(c) {
  if (c.dados.reforco) return 'reforco';
  if (ehTrilha_(c)) return 'trilha';
  return 'jogos';
}

/** Observações de um aluno: [{ hab, valor, peso, fonte, titulo, quando (yyyyMMddHHmm) }]. */
function observacoes_(email, serie, ctx) {
  const obs = [];
  ctx.respostas.forEach(function (r) {
    if (r.email !== email || !r.detalhe) return;
    const q = ctx.questionarios[r.questionario_id];
    if (!q) return;
    const peso = pesoTempo_(r.respondido_em);
    if (q.tipo === 'tda' && q.tda && Array.isArray(r.detalhe.rubrica)) {
      r.detalhe.rubrica.forEach(function (nivel, i) {
        const crit = q.tda.rubrica[i];
        const h = crit ? habilidadeDe_(serie, crit.criterio, '') : null;
        if (h && nivel) obs.push({ hab: h.id, valor: Number(nivel) / 4, peso: peso, fonte: 'tda', titulo: q.titulo, quando: chaveData_(r.respondido_em) });
      });
      return;
    }
    if (!Array.isArray(r.detalhe.acertos)) return;
    r.detalhe.acertos.forEach(function (certo, i) {
      const questao = q.questoes[i];
      const h = questao ? habilidadeDe_(serie, questao.topico || '', '') : null;
      if (h) obs.push({ hab: h.id, valor: certo ? 1 : 0, peso: peso, fonte: 'questionario', titulo: q.titulo, quando: chaveData_(r.respondido_em) });
    });
  });
  ctx.jogadas.forEach(function (j) {
    if (j.email !== email || j.numero !== 1 || !j.estado) return;
    const c = ctx.casos[j.caso_id];
    if (!c) return;
    const peso = pesoTempo_(j.atualizado_em || j.iniciado_em);
    const fonte = fonteDoCaso_(c);
    j.estado.travas.forEach(function (t, i) {
      const trava = c.dados.travas[i];
      if (!t.aberta || !trava) return;
      const vistos = {};
      (trava.etiquetas || []).forEach(function (e) {
        const h = habilidadeDe_(serie, e.foco, e.codigo);
        if (!h || vistos[h.id]) return;
        vistos[h.id] = true;
        obs.push({ hab: h.id, valor: t.valor ? t.pontos / t.valor : 0, peso: peso, fonte: fonte, titulo: c.titulo, quando: chaveData_(j.concluido_em || j.atualizado_em || j.iniciado_em) });
      });
    });
  });
  return obs;
}

/** Perfil do aluno: uma linha por habilidade observada, da mais fraca para a mais forte. */
function perfilDoAluno_(email, serie, ctx) {
  const cat = {};
  catalogoDaSerie_(serie).forEach(function (h) { cat[h.id] = h; });
  const por = {};
  observacoes_(email, serie, ctx).forEach(function (o) {
    if (!cat[o.hab]) return;
    const p = por[o.hab] = por[o.hab] || { id: o.hab, nome: cat[o.hab].nome, codigo: cat[o.hab].codigo, soma: 0, peso: 0, n: 0, fontes: {} };
    p.soma += o.valor * o.peso;
    p.peso += o.peso;
    p.n += 1;
    p.fontes[o.fonte] = (p.fontes[o.fonte] || 0) + 1;
  });
  return Object.keys(por).map(function (k) {
    const p = por[k];
    p.pct = Math.round((p.soma / p.peso) * 1000) / 10;
    p.dificuldade = p.pct < LIMIAR_DIFICULDADE && p.n >= MIN_ITENS_DIFICULDADE;
    delete p.soma; delete p.peso;
    return p;
  }).sort(function (a, b) { return a.pct - b.pct || b.n - a.n; });
}

// ============================================================
// Painel do professor
// ============================================================

/** Mapa da turma: aluno × habilidade, médias e grupos de reforço sugeridos. */
function profMapaTurma(turma) {
  exigirProfessor_();
  const serie = serieDaTurma_(turma);
  const ctx = contextoDificuldades_();
  const alunos = lerTabela_('Alunos').filter(function (a) { return String(a.turma) === turma; })
    .sort(function (a, b) { return String(a.nome).localeCompare(String(b.nome)); });
  const usadas = {};
  const linhas = alunos.map(function (a) {
    const email = String(a.email).toLowerCase();
    const perfil = perfilDoAluno_(email, serie, ctx);
    const celulas = {};
    perfil.forEach(function (p) { celulas[p.id] = { pct: p.pct, n: p.n, dificuldade: p.dificuldade }; usadas[p.id] = true; });
    return { email: email, nome: String(a.nome), celulas: celulas, fracas: perfil.filter(function (p) { return p.dificuldade; }).slice(0, 3).map(function (p) { return p.id; }) };
  });
  const habilidades = catalogoDaSerie_(serie).filter(function (h) { return usadas[h.id]; }).map(function (h) {
    const vals = linhas.map(function (l) { return l.celulas[h.id]; }).filter(Boolean);
    return {
      id: h.id, nome: h.nome, codigo: h.codigo, base: h.codigo === 'BASE',
      media: vals.length ? Math.round((vals.reduce(function (s, v) { return s + v.pct; }, 0) / vals.length) * 10) / 10 : null,
      alunos: vals.length,
    };
  });
  // Grupos de reforço: alunos com dificuldade na mesma habilidade, em grupos de até 5 (do mais fraco ao menos fraco).
  const tam = Number(lerConfig_().tamanho_max_grupo) || 5;
  const grupos = habilidades.map(function (h) {
    const com = linhas.filter(function (l) { return l.celulas[h.id] && l.celulas[h.id].dificuldade; })
      .sort(function (a, b) { return a.celulas[h.id].pct - b.celulas[h.id].pct; })
      .map(function (l) { return { nome: l.nome, pct: l.celulas[h.id].pct }; });
    const partes = [];
    for (let i = 0; i < com.length; i += tam) partes.push(com.slice(i, i + tam));
    return { habilidade: h.nome, codigo: h.codigo, total: com.length, grupos: partes };
  }).filter(function (g) { return g.total >= 2; }).sort(function (a, b) { return b.total - a.total; });
  return { turma: turma, serie: serie, limiar: LIMIAR_DIFICULDADE, minimo: MIN_ITENS_DIFICULDADE, habilidades: habilidades, linhas: linhas, grupos: grupos };
}

/** Ficha do aluno: todas as habilidades, com a origem das observações. */
function profFichaHabilidades(email) {
  exigirProfessor_();
  email = String(email || '').toLowerCase();
  const a = lerTabela_('Alunos').filter(function (x) { return String(x.email).toLowerCase() === email; })[0];
  if (!a) throw new Error('Aluno não encontrado.');
  const serie = serieDaTurma_(String(a.turma));
  return { nome: String(a.nome), turma: String(a.turma), perfil: perfilDoAluno_(email, serie, contextoDificuldades_()) };
}

// ============================================================
// "Meu reforço": sessões de treino montadas com cadeados curtos das habilidades mais fracas (sem nota)
// ============================================================

/**
 * Habilidades-alvo do treino: as 2 mais fracas que já têm exercícios curtos no banco
 * (primeiro as dificuldades; depois as de menor acerto). pool = cadeadosParaTreino_().
 */
function alvosReforco_(perfil, pool) {
  const comExercicio = {};
  pool.forEach(function (x) { comExercicio[x.hab] = true; });
  const possiveis = perfil.filter(function (p) { return p.pct < 100 && comExercicio[p.id]; });
  const dif = possiveis.filter(function (p) { return p.dificuldade; });
  return dif.concat(possiveis.filter(function (p) { return !p.dificuldade; })).slice(0, 2);
}

/** Cadeados que podem ir para o treino: só de casos ★ (sem abas de pistas), exceto o tutorial e os próprios treinos. */
function cadeadosParaTreino_(serie, casos) {
  const lista = [];
  Object.keys(casos).map(function (k) { return casos[k]; }).forEach(function (c) {
    if (c.dados.reforco || c.dados.missao === 'tutorial') return;
    // Exercícios gerados com IA só entram depois de "Liberar para o reforço".
    if (c.dados.gerado && ehAvulso_(c) && c.status !== 'aberto') return;
    if (c.serie !== serie && c.serie !== SERIE_TODAS) return;
    if ((c.dados.evidencias || []).length) return;
    (c.dados.travas || []).forEach(function (t, i) {
      const e = (t.etiquetas || [])[0];
      const h = e ? habilidadeDe_(serie, e.foco, e.codigo) : null;
      if (h) lista.push({ hab: h.id, origem: c.id + '#' + i, trava: t });
    });
  });
  return lista;
}

function treinosDoAluno_(email, casos) {
  return Object.keys(casos).map(function (k) { return casos[k]; })
    .filter(function (c) { return c.dados.reforco && c.dados.reforco.email === email && !c.dados.reforco.teste; })
    .sort(function (a, b) { return (a.dados.reforco.numero || 0) - (b.dados.reforco.numero || 0); });
}

/** Situação do "Meu reforço" para o painel do aluno. */
function meuReforco_(email, serie, ctx) {
  const perfil = perfilDoAluno_(email, serie, ctx);
  const alvos = alvosReforco_(perfil, cadeadosParaTreino_(serie, ctx.casos));
  const treinos = treinosDoAluno_(email, ctx.casos);
  const ultimo = treinos[treinos.length - 1];
  const jog = ultimo ? ctx.jogadas.filter(function (j) { return j.email === email && j.caso_id === ultimo.id && j.numero === 1; })[0] : null;
  return {
    alvos: alvos.map(function (p) { return { nome: p.nome, pct: p.pct, dificuldade: p.dificuldade }; }),
    feitos: treinos.filter(function (c) {
      return ctx.jogadas.some(function (j) { return j.email === email && j.caso_id === c.id && j.status === 'concluido'; });
    }).length,
    atual: ultimo && (!jog || jog.status !== 'concluido') ? ultimo.id : null,
    disponivel: alvos.length > 0,
  };
}

/** Devolve o treino em andamento ou monta um novo (4 cadeados das habilidades mais fracas). */
function alunoNovoReforco() {
  const eu = jogador_();
  if (eu.professor || eu.teste) throw new Error('O "Meu reforço" é montado para cada aluno.');
  const serie = serieDaTurma_(eu.turma);
  const ctx = contextoDificuldades_();
  const treinos = treinosDoAluno_(eu.email, ctx.casos);
  const ultimo = treinos[treinos.length - 1];
  if (ultimo) {
    const j = ctx.jogadas.filter(function (x) { return x.email === eu.email && x.caso_id === ultimo.id && x.numero === 1; })[0];
    if (!j || j.status !== 'concluido') return { id: ultimo.id };
  }
  const perfil = perfilDoAluno_(eu.email, serie, ctx);
  const pool = cadeadosParaTreino_(serie, ctx.casos);
  const alvos = alvosReforco_(perfil, pool);
  if (!alvos.length) throw new Error('Ainda não há dados suficientes. Jogue algumas missões primeiro!');
  const usados = {};
  if (ultimo) (ultimo.dados.reforco.origens || []).forEach(function (o) { usados[o] = true; });
  const escolhidos = [];
  // Alterna entre as habilidades-alvo; evita repetir os cadeados do treino anterior.
  const filas = alvos.map(function (a) {
    const daHab = pool.filter(function (x) { return x.hab === a.id; });
    const novos = daHab.filter(function (x) { return !usados[x.origem]; });
    return embaralhar_(novos.length ? novos : daHab);
  });
  for (let i = 0; escolhidos.length < CADEADOS_POR_TREINO && i < CADEADOS_POR_TREINO * 4; i++) {
    const fila = filas[i % filas.length];
    if (fila && fila.length) escolhidos.push(fila.shift());
    if (filas.every(function (f) { return !f.length; })) break;
  }
  // Completa até 4 com outras habilidades: primeiro as de menor acerto do aluno, depois as que ele ainda não praticou.
  if (escolhidos.length < CADEADOS_POR_TREINO) {
    const ordem = {};
    perfil.forEach(function (p, i) { ordem[p.id] = p.pct >= 100 ? 1000 + i : i; });
    const ja = {};
    escolhidos.forEach(function (x) { ja[x.origem] = true; });
    const resto = embaralhar_(pool.filter(function (x) { return !ja[x.origem] && !usados[x.origem]; }))
      .sort(function (a, b) { return (ordem[a.hab] != null ? ordem[a.hab] : 500) - (ordem[b.hab] != null ? ordem[b.hab] : 500); });
    while (escolhidos.length < CADEADOS_POR_TREINO && resto.length) escolhidos.push(resto.shift());
  }
  if (escolhidos.length < 2) throw new Error('Ainda não há exercícios curtos para as suas habilidades. Fale com o professor.');

  const numero = treinos.length + 1;
  const caso = {
    id: 'reforco-' + Utilities.getUuid().slice(0, 12), serie: serie, mes: hojeIso_().slice(0, 7), titulo: 'My Training #' + numero,
    dados: {
      saga: 'base', numero: '#T' + numero, reforco: { email: eu.email, numero: numero, origens: escolhidos.map(function (x) { return x.origem; }) },
      abertura: { personagem: 'max', nome: 'COACH MAX', texto: "Let's [[practice|praticar]]! Today: " + alvos.map(function (a) { return a.nome.replace(/^Base: /, ''); }).join(' + ') + '.' },
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

function embaralhar_(lista) {
  const a = lista.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
