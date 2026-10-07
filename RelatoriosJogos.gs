/**
 * Etapa 5 (parte B): relatórios dos jogos — turma por caso, evolução do aluno, resumo para a coordenação (por trimestre)
 * e exportação para uma planilha nova no Drive.
 * Só contam as 1ªs jogadas (as que valem); os treinos (jogar de novo) aparecem à parte. Jogadas de teste do professor não entram.
 */

const CHAVE_TRIMESTRES = 'trimestres_jogos';
const TENDENCIA_MIN = 10;
const ITENS_TENDENCIA = 4;

// ============================================================
// Leitura comum
// ============================================================

function contextoRelJogos_() {
  const casos = lerCasos_();
  const porId = {};
  casos.forEach(function (c) { porId[c.id] = c; });
  const alunos = lerTabela_('Alunos').map(function (a) { return { email: String(a.email).toLowerCase(), nome: String(a.nome), turma: String(a.turma) }; })
    .sort(function (a, b) { return a.turma.localeCompare(b.turma) || a.nome.localeCompare(b.nome, 'pt-BR'); });
  const alunoDe = {};
  alunos.forEach(function (a) { alunoDe[a.email] = a; });
  const turmas = listarTurmas_();
  const serieDe = {};
  turmas.forEach(function (t) { serieDe[t.turma] = t.serie; });
  return {
    casos: casos, porId: porId, alunos: alunos, alunoDe: alunoDe, turmas: turmas, serieDe: serieDe,
    jogadas: lerJogadas_().filter(function (j) { return j.turma !== 'PROF' && porId[j.caso_id]; }),
    niveis: calcularNiveis_(lerConfig_()),
  };
}

function tipoDoCaso_(c) {
  if (ehReforco_(c)) return 'reforco';
  if (ehAvulso_(c)) return 'avulso';
  if (ehTrilha_(c)) return 'trilha';
  return 'ano';
}

/** Resumo de uma jogada: pontos (parciais se em andamento), erros, dicas e cadeados revelados. */
function resumoJogada_(j) {
  const ts = j.estado ? j.estado.travas : [];
  return {
    situacao: j.status, pontos: j.status === 'concluido' ? j.pontos : (j.estado ? somaPontos_(j.estado) : 0),
    erros: ts.reduce(function (s, t) { return s + t.erros; }, 0),
    dicas: ts.reduce(function (s, t) { return s + t.dicas; }, 0),
    revelados: ts.filter(function (t) { return t.revelada; }).length,
  };
}

function habilidadeDaTrava_(serie, trava) {
  const e = (trava.etiquetas || [])[0];
  const h = e ? habilidadeDe_(serie, e.foco, e.codigo) : null;
  return h ? h.nome : (e ? e.foco : '');
}

function media1_(lista) {
  return lista.length ? Math.round((lista.reduce(function (s, v) { return s + v; }, 0) / lista.length) * 10) / 10 : null;
}

/** Todos os casos de um ciclo: os comuns e os de reforço de qualquer aluno. */
function missoesDoCiclo_(c) {
  const lista = c.missoes.slice();
  Object.keys(c.reforcos).forEach(function (e) { c.reforcos[e].forEach(function (k) { if (lista.indexOf(k) === -1) lista.push(k); }); });
  return lista;
}

/** "yyyy-MM-dd" → "yyyyMMdd" (para comparar com chaveData_). */
function chaveDia_(iso) { return String(iso || '').replace(/-/g, ''); }

/**
 * Degrau do aluno ao longo do tempo (mesma regra de degrauDoAluno_): [{ mes, degrau, jogos }] e o degrau final.
 * ate = "yyyyMMdd" opcional: só considera jogos concluídos até esse dia.
 */
function historicoDegrau_(email, nivel, casos, jogadas, ate) {
  const comDegrau = {};
  casos.forEach(function (c) { if (Number(c.dados.degrau)) comDegrau[c.id] = true; });
  let d = degrauInicial_(nivel), seguidas = 0;
  const meses = {};
  const ordem = [];
  jogadas.filter(function (j) { return j.email === email && j.numero === 1 && j.status === 'concluido' && comDegrau[j.caso_id]; })
    .sort(function (a, b) { return chaveData_(a.concluido_em).localeCompare(chaveData_(b.concluido_em)) || a._linha - b._linha; })
    .forEach(function (j) {
      const k = chaveData_(j.concluido_em);
      if (ate && k.slice(0, 8) > ate) return;
      if (j.pontos >= DEGRAU_SOBE) {
        seguidas++;
        if (seguidas >= SEGUIDAS_PARA_SUBIR && d < 3) { d++; seguidas = 0; }
      } else {
        seguidas = 0;
        if (j.pontos < DEGRAU_DESCE && d > 1) d--;
      }
      const mes = k.slice(0, 4) + '-' + k.slice(4, 6);
      if (!meses[mes]) { meses[mes] = { mes: mes, jogos: 0, soma: 0 }; ordem.push(mes); }
      meses[mes].degrau = d;
      meses[mes].jogos++;
      meses[mes].soma += j.pontos;
    });
  return {
    inicial: degrauInicial_(nivel), final: d,
    meses: ordem.map(function (m) { const x = meses[m]; return { mes: m, degrau: x.degrau, jogos: x.jogos, media: Math.round((x.soma / x.jogos) * 10) / 10 }; }),
  };
}

// ============================================================
// Trimestres (configuráveis no painel)
// ============================================================

function trimestresPadrao_() {
  const a = Utilities.formatDate(new Date(), FUSO, 'yyyy');
  return [
    { nome: '1º trimestre', inicio: a + '-02-01', fim: a + '-05-15' },
    { nome: '2º trimestre', inicio: a + '-05-16', fim: a + '-08-31' },
    { nome: '3º trimestre', inicio: a + '-09-01', fim: a + '-12-20' },
  ];
}

function lerTrimestres_() {
  const v = lerConfig_()[CHAVE_TRIMESTRES];
  try {
    const t = JSON.parse(String(v || ''));
    if (Array.isArray(t) && t.length === 3) return t;
  } catch (e) { /* usa o padrão */ }
  return trimestresPadrao_();
}

function profSalvarTrimestres(lista) {
  exigirProfessor_();
  if (!Array.isArray(lista) || lista.length !== 3) throw new Error('Informe os 3 trimestres.');
  const limpos = lista.map(function (t, i) {
    const inicio = String(t.inicio || ''), fim = String(t.fim || '');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(inicio) || !/^\d{4}-\d{2}-\d{2}$/.test(fim)) throw new Error('Preencha início e fim do ' + (i + 1) + 'º trimestre.');
    if (fim < inicio) throw new Error('No ' + (i + 1) + 'º trimestre, o fim deve ser depois do início.');
    return { nome: (i + 1) + 'º trimestre', inicio: inicio, fim: fim };
  });
  if (limpos[1].inicio <= limpos[0].fim || limpos[2].inicio <= limpos[1].fim) throw new Error('Os trimestres não podem se sobrepor: cada um deve começar depois do fim do anterior.');
  comTrava_(function () {
    const linha = lerTabela_('Config').filter(function (l) { return l.chave === CHAVE_TRIMESTRES; })[0];
    const valor = JSON.stringify(limpos);
    if (linha) aba_('Config').getRange(linha._linha, 2).setValue(valor);
    else aba_('Config').appendRow([CHAVE_TRIMESTRES, valor, 'Datas dos trimestres usadas no resumo dos jogos para a coordenação (edite pelo painel).']);
  });
  return limpos;
}

// ============================================================
// Opções da aba
// ============================================================

function profRelJogosOpcoes() {
  exigirProfessor_();
  return {
    turmas: listarTurmas_(),
    alunos: lerTabela_('Alunos').map(function (a) { return { email: String(a.email).toLowerCase(), nome: String(a.nome), turma: String(a.turma) }; })
      .sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); }),
    trimestres: lerTrimestres_(),
  };
}

/** Casos que a turma jogou ou que estão num ciclo dela (os dos ciclos primeiro, do mais recente). */
function profRelJogosMissoes(turma) {
  exigirProfessor_();
  const ctx = contextoRelJogos_();
  const grupos = agruparMissoes_(ctx.casos);
  const missaoDoCaso = {};
  Object.keys(grupos).forEach(function (k) { grupos[k].versoes.forEach(function (c) { missaoDoCaso[c.id] = k; }); });
  const daTurma = {};
  ctx.alunos.forEach(function (a) { if (a.turma === turma) daTurma[a.email] = true; });
  const jogaram = {};
  ctx.jogadas.forEach(function (j) {
    const k = missaoDoCaso[j.caso_id];
    if (k && daTurma[j.email] && j.numero === 1) (jogaram[k] = jogaram[k] || {})[j.email] = true;
  });
  const ciclos = {};
  lerCiclos_().filter(function (c) { return c.turma === turma; }).forEach(function (c) {
    missoesDoCiclo_(c).forEach(function (k) {
      ciclos[k] = ciclos[k] || [];
      if (ciclos[k].indexOf(c.titulo) === -1) ciclos[k].push(c.titulo);
    });
  });
  return Object.keys(grupos).filter(function (k) { return jogaram[k] || ciclos[k]; }).map(function (k) {
    const g = grupos[k];
    const trilha = ehTrilha_(g.versoes[0]);
    return {
      missao: k, titulo: g.titulo, tipo: trilha ? 'trilha' : 'ano', mes: g.mes, ordem: g.ordem, tema: g.tema,
      numero: g.versoes[0].dados.numero || '', ciclos: ciclos[k] || [], jogaram: Object.keys(jogaram[k] || {}).length,
    };
  }).sort(function (a, b) {
    if (a.tipo !== b.tipo) return a.tipo === 'ano' ? -1 : 1;
    if (a.tipo === 'trilha') return a.ordem - b.ordem;
    return (b.ciclos.length ? 1 : 0) - (a.ciclos.length ? 1 : 0) || b.mes.localeCompare(a.mes) || a.titulo.localeCompare(b.titulo);
  });
}

// ============================================================
// 1. Turma por caso
// ============================================================

function profRelTurmaCaso(turma, missao) {
  exigirProfessor_();
  const ctx = contextoRelJogos_();
  const grupos = agruparMissoes_(ctx.casos);
  const g = grupos[missao];
  if (!g) throw new Error('Caso não encontrado.');
  const serie = ctx.serieDe[turma] || '';
  const versoes = {};
  g.versoes.forEach(function (c) { versoes[c.id] = c; });
  const alunos = ctx.alunos.filter(function (a) { return a.turma === turma; });
  const ciclo = lerCiclos_().filter(function (c) { return c.turma === turma && missoesDoCiclo_(c).indexOf(missao) !== -1; })
    .sort(function (a, b) { return b.mes.localeCompare(a.mes); })[0] || null;

  const porVersao = {};
  const linhas = alunos.map(function (a) {
    const js = ctx.jogadas.filter(function (j) { return j.email === a.email && versoes[j.caso_id]; });
    const v = js.filter(function (j) { return j.numero === 1; })[0];
    const linha = {
      nome: a.nome, email: a.email, situacao: 'nao', degrau: null, pontos: null, erros: 0, dicas: 0, revelados: 0,
      concluido_em: '', noPrazo: null, treinos: js.filter(function (j) { return j.numero > 1; }).length,
      degrauAtual: degrauDoAluno_(a.email, (ctx.niveis[a.email] || {}).nivel || '', ctx.casos, ctx.jogadas),
    };
    if (!v) return linha;
    const r = resumoJogada_(v);
    const caso = versoes[v.caso_id];
    linha.situacao = r.situacao;
    linha.degrau = Number(caso.dados.degrau) || 0;
    linha.pontos = r.pontos; linha.erros = r.erros; linha.dicas = r.dicas; linha.revelados = r.revelados;
    linha.concluido_em = v.status === 'concluido' ? v.concluido_em : '';
    if (ciclo && v.status === 'concluido') linha.noPrazo = dentroDoPrazo_(v.concluido_em, prazoDoAluno_(ciclo, a.email));
    (porVersao[caso.id] = porVersao[caso.id] || []).push(v);
    return linha;
  });

  // Cadeados de cada versão jogada: quantos chegaram, acerto médio, erros, dicas e respostas reveladas.
  const cadeados = Object.keys(porVersao).map(function (id) {
    const caso = versoes[id];
    const js = porVersao[id];
    const travas = (caso.dados.travas || []).map(function (t, i) {
      const est = js.map(function (j) { return j.estado && j.estado.travas[i]; }).filter(function (x) { return x && (x.aberta || x.erros || x.dicas); });
      const abertas = est.filter(function (x) { return x.aberta; });
      return {
        n: i + 1, titulo: t.titulo, habilidade: habilidadeDaTrava_(serie, t), chegaram: est.length, abertas: abertas.length,
        acerto: media1_(abertas.map(function (x) { return x.valor ? (x.pontos / x.valor) * 100 : 0; })),
        erros: est.reduce(function (s, x) { return s + x.erros; }, 0), dicas: est.reduce(function (s, x) { return s + x.dicas; }, 0),
        revelados: est.filter(function (x) { return x.revelada; }).length,
      };
    });
    // Para retomar em aula: os 2 cadeados com menor acerto (abaixo de 70%).
    travas.filter(function (t) { return t.acerto !== null && t.acerto < 70; })
      .sort(function (a, b) { return a.acerto - b.acerto || b.revelados - a.revelados; }).slice(0, 2)
      .forEach(function (t) { t.retomar = true; });
    return { id: id, degrau: Number(caso.dados.degrau) || 0, numero: caso.dados.numero || '', jogadas: js.length, travas: travas };
  }).sort(function (a, b) { return a.degrau - b.degrau; });

  const concl = linhas.filter(function (l) { return l.situacao === 'concluido'; });
  const porDegrau = { 1: 0, 2: 0, 3: 0 };
  linhas.forEach(function (l) { if (l.degrau) porDegrau[l.degrau] = (porDegrau[l.degrau] || 0) + 1; });
  return {
    caso: { missao: missao, titulo: g.titulo, tipo: ehTrilha_(g.versoes[0]) ? 'trilha' : 'ano', mes: g.mes, numero: g.versoes[0].dados.numero || '' },
    turma: turma, ciclo: ciclo ? { titulo: ciclo.titulo, prazo: ciclo.prazo, status: ciclo.status } : null,
    resumo: {
      alunos: linhas.length, jogaram: linhas.filter(function (l) { return l.situacao !== 'nao'; }).length, concluiram: concl.length,
      media: media1_(concl.map(function (l) { return l.pontos; })), porDegrau: porDegrau,
      dicas: media1_(concl.map(function (l) { return l.dicas; })), erros: media1_(concl.map(function (l) { return l.erros; })),
      noPrazo: ciclo ? linhas.filter(function (l) { return l.noPrazo; }).length : null,
    },
    linhas: linhas, cadeados: cadeados,
  };
}

// ============================================================
// 2. Evolução do aluno
// ============================================================

/** Habilidades: acerto no começo × agora (1ª metade × 2ª metade das observações de cada uma, em ordem de data; precisa de 4 itens). */
function tendenciasHabilidades_(email, serie) {
  const cat = {};
  catalogoDaSerie_(serie).forEach(function (h) { cat[h.id] = h; });
  const por = {};
  observacoes_(email, serie, contextoDificuldades_()).forEach(function (o) {
    if (cat[o.hab]) (por[o.hab] = por[o.hab] || []).push(o);
  });
  return Object.keys(por).map(function (k) {
    const obs = por[k].sort(function (a, b) { return String(a.quando).localeCompare(String(b.quando)); });
    const metade = Math.floor(obs.length / 2);
    const pct = function (l) { return l.length ? Math.round((l.reduce(function (s, o) { return s + o.valor; }, 0) / l.length) * 1000) / 10 : null; };
    const inicio = obs.length >= ITENS_TENDENCIA ? pct(obs.slice(0, metade)) : null;
    const agora = obs.length >= ITENS_TENDENCIA ? pct(obs.slice(metade)) : pct(obs);
    const delta = inicio === null ? null : Math.round((agora - inicio) * 10) / 10;
    return {
      nome: cat[k].nome, codigo: cat[k].codigo, n: obs.length, inicio: inicio, agora: agora, delta: delta,
      tendencia: delta === null ? 'poucos' : (delta >= TENDENCIA_MIN ? 'melhorou' : (delta <= -TENDENCIA_MIN ? 'piorou' : 'estavel')),
    };
  }).sort(function (a, b) { return (b.delta === null ? -999 : Math.abs(b.delta)) - (a.delta === null ? -999 : Math.abs(a.delta)) || b.n - a.n; });
}

function profRelEvolucaoJogos(email) {
  exigirProfessor_();
  email = String(email || '').toLowerCase();
  const ctx = contextoRelJogos_();
  const a = ctx.alunoDe[email];
  if (!a) throw new Error('Aluno não encontrado.');
  const serie = ctx.serieDe[a.turma] || '';
  const nivel = (ctx.niveis[email] || {}).nivel || '';
  const grupos = agruparMissoes_(ctx.casos.filter(function (c) { return !ehTrilha_(c); }));
  const notas = {};
  lerRespostas_().filter(function (r) { return r.email === email && r.origem === 'jogos'; }).forEach(function (r) { notas[r.questionario_id] = r.percentual; });

  const ciclos = lerCiclos_().filter(function (c) { return c.turma === a.turma; }).sort(function (x, y) { return x.mes.localeCompare(y.mes) || x.prazo.localeCompare(y.prazo); })
    .map(function (c) {
      const r = resultadoNoCiclo_(c, email, grupos, ctx.jogadas);
      return {
        titulo: c.titulo, mes: c.mes, prazo: r.prazo, status: c.status, nota: notas[c.id] != null ? notas[c.id] : null, parcial: r.nota,
        casos: r.itens.length, noPrazo: r.itens.filter(function (i) { return i.noPrazo; }).length,
      };
    });

  const minhas = ctx.jogadas.filter(function (j) { return j.email === email; });
  const trilha = trilhaDoAluno_(email, ctx.casos, ctx.jogadas, degrauDoAluno_(email, nivel, ctx.casos, ctx.jogadas));
  const reforcos = minhas.filter(function (j) { return ehReforco_(ctx.porId[j.caso_id]); });
  const ano = minhas.filter(function (j) { return j.numero === 1 && tipoDoCaso_(ctx.porId[j.caso_id]) === 'ano' && j.status === 'concluido'; });
  return {
    nome: a.nome, turma: a.turma, serie: serie, nivel: nivel,
    degrau: historicoDegrau_(email, nivel, ctx.casos, ctx.jogadas),
    ciclos: ciclos,
    casosAno: { concluidos: ano.length, media: media1_(ano.map(function (j) { return j.pontos; })) },
    trilha: trilha ? { feitas: trilha.feitas, total: trilha.total } : null,
    reforco: { sessoes: reforcos.length, concluidas: reforcos.filter(function (j) { return j.status === 'concluido'; }).length },
    habilidades: tendenciasHabilidades_(email, serie),
  };
}

// ============================================================
// 3. Resumo para a coordenação (por trimestre)
// ============================================================

function profRelCoordenacao(indice) {
  exigirProfessor_();
  const tri = lerTrimestres_()[Number(indice) || 0];
  if (!tri) throw new Error('Trimestre inválido.');
  const de = chaveDia_(tri.inicio), ate = chaveDia_(tri.fim);
  const noPeriodo = function (texto) { const k = chaveData_(texto).slice(0, 8); return k && k >= de && k <= ate; };
  const ctx = contextoRelJogos_();
  const dctx = contextoDificuldades_();
  // Ciclo do trimestre: o mês do ciclo ou o prazo caem dentro do período.
  const dentro = function (k) { return k && k >= de && k <= ate; };
  const ciclos = lerCiclos_().filter(function (c) { return dentro(chaveDia_(c.prazo)) || dentro(chaveDia_(c.mes + '-01')); });
  const notas = lerRespostas_().filter(function (r) { return r.origem === 'jogos'; });
  const FONTES_JOGO = { jogos: true, trilha: true, reforco: true };

  const turmas = ctx.turmas.filter(function (t) { return ctx.alunos.some(function (a) { return a.turma === t.turma; }); }).map(function (t) {
    const alunos = ctx.alunos.filter(function (a) { return a.turma === t.turma; });
    const emails = {};
    alunos.forEach(function (a) { emails[a.email] = true; });
    const js = ctx.jogadas.filter(function (j) { return emails[j.email] && j.numero === 1 && j.status === 'concluido' && noPeriodo(j.concluido_em); });
    const doTipo = function (tipo) { return js.filter(function (j) { return tipoDoCaso_(ctx.porId[j.caso_id]) === tipo; }); };
    const ano = doTipo('ano'), trilha = doTipo('trilha');
    const reforco = ctx.jogadas.filter(function (j) { return emails[j.email] && j.status === 'concluido' && noPeriodo(j.concluido_em) && ehReforco_(ctx.porId[j.caso_id]); });
    const participantes = {};
    ano.concat(trilha).forEach(function (j) { participantes[j.email] = true; });
    const cics = ciclos.filter(function (c) { return c.turma === t.turma; });
    const idsCic = {};
    cics.forEach(function (c) { idsCic[c.id] = true; });
    const notasT = notas.filter(function (r) { return idsCic[r.questionario_id] && emails[r.email]; });
    const degraus = { 1: 0, 2: 0, 3: 0 };
    alunos.forEach(function (a) { degraus[historicoDegrau_(a.email, (ctx.niveis[a.email] || {}).nivel || '', ctx.casos, ctx.jogadas, ate).final]++; });
    // Habilidades da turma nos jogos do trimestre (só observações de jogos, trilha e reforço).
    const hab = {};
    alunos.forEach(function (a) {
      observacoes_(a.email, t.serie, dctx).forEach(function (o) {
        if (!FONTES_JOGO[o.fonte] || !o.quando || o.quando.slice(0, 8) < de || o.quando.slice(0, 8) > ate) return;
        const h = hab[o.hab] = hab[o.hab] || { soma: 0, n: 0 };
        h.soma += o.valor; h.n++;
      });
    });
    const nomes = {};
    catalogoDaSerie_(t.serie).forEach(function (h) { nomes[h.id] = h.nome; });
    const fracas = Object.keys(hab).filter(function (k) { return hab[k].n >= 5 && nomes[k]; })
      .map(function (k) { return { nome: nomes[k], pct: Math.round((hab[k].soma / hab[k].n) * 1000) / 10, n: hab[k].n }; })
      .filter(function (h) { return h.pct < 70; }).sort(function (a, b) { return a.pct - b.pct; }).slice(0, 3);
    return {
      turma: t.turma, serie: t.serie, alunos: alunos.length, participantes: Object.keys(participantes).length,
      participacao: alunos.length ? Math.round((Object.keys(participantes).length / alunos.length) * 1000) / 10 : null,
      ciclos: cics.length, comNota: notasT.length, mediaCiclos: media1_(notasT.map(function (r) { return r.percentual; })),
      casosAno: ano.length, mediaCasos: media1_(ano.map(function (j) { return j.pontos; })), trilha: trilha.length, reforco: reforco.length,
      degraus: degraus, fracas: fracas,
    };
  });

  const series = SERIES.map(function (s) {
    const ts = turmas.filter(function (t) { return t.serie === s; });
    if (!ts.length) return null;
    const soma = function (campo) { return ts.reduce(function (acc, t) { return acc + t[campo]; }, 0); };
    const comNota = ts.filter(function (t) { return t.mediaCiclos !== null; });
    const alunos = soma('alunos');
    return {
      serie: s, turmas: ts.length, alunos: alunos, participantes: soma('participantes'),
      participacao: alunos ? Math.round((soma('participantes') / alunos) * 1000) / 10 : null,
      mediaCiclos: comNota.length ? Math.round((comNota.reduce(function (acc, t) { return acc + t.mediaCiclos * t.comNota; }, 0) / comNota.reduce(function (acc, t) { return acc + t.comNota; }, 0)) * 10) / 10 : null,
      casosAno: soma('casosAno'), reforco: soma('reforco'),
    };
  }).filter(Boolean);

  return { trimestre: tri, indice: Number(indice) || 0, gerado: Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm'), turmas: turmas, series: series };
}

// ============================================================
// 4. Exportação
// ============================================================

/** Cria uma planilha nova no Drive do professor com todos os dados dos jogos. Devolve o link. */
function profRelExportarJogos() {
  exigirProfessor_();
  const ctx = contextoRelJogos_();
  const dctx = contextoDificuldades_();
  const agora = Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');
  const ss = SpreadsheetApp.create('Jogos – English Learning App – ' + agora);
  const TIPOS = { ano: 'Caso do ano', trilha: 'Trilha Base', reforco: 'Meu reforço', avulso: 'Avulso' };
  const SITUACAO = { concluido: 'Concluído', andamento: 'Em andamento' };

  function preencher(aba, cabecalho, linhas) {
    const dados = [cabecalho].concat(linhas.length ? linhas : [cabecalho.map(function (_, i) { return i === 0 ? 'Sem dados' : ''; })]);
    aba.getRange(1, 1, dados.length, cabecalho.length).setValues(dados);
    aba.getRange(1, 1, 1, cabecalho.length).setFontWeight('bold').setBackground('#dbe4ff');
    aba.setFrozenRows(1);
    aba.autoResizeColumns(1, cabecalho.length);
  }

  const alunosJ = ctx.jogadas.filter(function (j) { return ctx.alunoDe[j.email]; }).sort(function (x, y) {
    const a = ctx.alunoDe[x.email], b = ctx.alunoDe[y.email];
    return a.turma.localeCompare(b.turma) || a.nome.localeCompare(b.nome, 'pt-BR') || chaveData_(x.iniciado_em).localeCompare(chaveData_(y.iniciado_em));
  });

  preencher(ss.getSheets()[0].setName('Jogadas'),
    ['Turma', 'Aluno', 'E-mail', 'Tipo', 'Caso', 'Nº', 'Mês', 'Degrau', 'Tentativa', 'Situação', 'Pontos', 'Erros', 'Dicas', 'Revelados', 'Iniciado em', 'Concluído em'],
    alunosJ.map(function (j) {
      const a = ctx.alunoDe[j.email], c = ctx.porId[j.caso_id], r = resumoJogada_(j);
      return [a.turma, a.nome, a.email, TIPOS[tipoDoCaso_(c)], c.titulo, c.dados.numero || '', "'" + (c.mes || ''), Number(c.dados.degrau) || '',
        j.numero === 1 ? '1ª (vale)' : j.numero + 'ª (treino)', SITUACAO[j.status] || j.status, r.pontos, r.erros, r.dicas, r.revelados, j.iniciado_em, j.concluido_em];
    }));

  const cad = [];
  alunosJ.filter(function (j) { return j.numero === 1 && j.estado; }).forEach(function (j) {
    const a = ctx.alunoDe[j.email], c = ctx.porId[j.caso_id], serie = ctx.serieDe[a.turma] || '';
    j.estado.travas.forEach(function (t, i) {
      const tr = (c.dados.travas || [])[i];
      if (!tr || !(t.aberta || t.erros || t.dicas)) return;
      const e = (tr.etiquetas || [])[0] || {};
      cad.push([a.turma, a.nome, c.titulo, Number(c.dados.degrau) || '', i + 1, tr.titulo, habilidadeDaTrava_(serie, tr), e.codigo || '',
        t.valor, t.aberta ? t.pontos : '', t.erros, t.dicas, t.aberta ? 'sim' : 'não', t.revelada ? 'sim' : 'não']);
    });
  });
  preencher(ss.insertSheet('Cadeados'),
    ['Turma', 'Aluno', 'Caso', 'Degrau', 'Cadeado', 'Título', 'Habilidade', 'Código', 'Valor', 'Pontos', 'Erros', 'Dicas', 'Aberto', 'Revelado'], cad);

  const grupos = agruparMissoes_(ctx.casos.filter(function (c) { return !ehTrilha_(c); }));
  const notas = {};
  lerRespostas_().filter(function (r) { return r.origem === 'jogos'; }).forEach(function (r) { notas[r.questionario_id + '|' + r.email] = r.percentual; });
  const linhasCic = [];
  lerCiclos_().sort(function (a, b) { return a.turma.localeCompare(b.turma) || a.mes.localeCompare(b.mes); }).forEach(function (c) {
    ctx.alunos.filter(function (a) { return a.turma === c.turma; }).forEach(function (a) {
      const r = resultadoNoCiclo_(c, a.email, grupos, ctx.jogadas);
      const n = notas[c.id + '|' + a.email];
      linhasCic.push([c.turma, c.titulo, "'" + c.mes, r.prazo, c.status === 'fechado' ? 'Fechado' : 'Aberto', a.nome,
        n != null ? n : '', r.nota != null ? r.nota : '', r.itens.filter(function (i) { return i.noPrazo; }).length + ' de ' + r.itens.length]);
    });
  });
  preencher(ss.insertSheet('Ciclos'), ['Turma', 'Ciclo', 'Mês', 'Prazo', 'Situação', 'Aluno', 'Nota (no nível)', 'Média parcial', 'Casos no prazo'], linhasCic);

  const linhasHab = [];
  ctx.alunos.forEach(function (a) {
    perfilDoAluno_(a.email, ctx.serieDe[a.turma] || '', dctx).forEach(function (p) {
      linhasHab.push([a.turma, a.nome, p.nome, p.codigo, p.pct, p.n, p.dificuldade ? 'sim' : '']);
    });
  });
  preencher(ss.insertSheet('Habilidades'), ['Turma', 'Aluno', 'Habilidade', 'Código', 'Acerto (%)', 'Itens', 'Dificuldade'], linhasHab);

  return ss.getUrl();
}
