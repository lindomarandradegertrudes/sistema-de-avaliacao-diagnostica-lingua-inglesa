/**
 * Etapa 4: relatórios — comparativo das turmas, tópicos com mais erros, evolução por aluno e exportação.
 */

/** "dd/MM/yyyy HH:mm" -> "yyyyMMddHHmm" para ordenar. */
function chaveData_(texto) {
  const m = String(texto).match(/(\d{2})\/(\d{2})\/(\d{4})\s*(\d{2})?:?(\d{2})?/);
  return m ? m[3] + m[2] + m[1] + (m[4] || '00') + (m[5] || '00') : '';
}

function contarNiveis_() {
  const c = {};
  NIVEIS.forEach(function (n) { c[n] = 0; });
  return c;
}

/** Acertos por tópico. Considera só respostas com detalhe por questão (online ou lançadas com letras). */
function acertosPorTopico_(questionarios, respostas) {
  const porId = {};
  questionarios.forEach(function (q) { porId[q.id] = q; });
  const res = {};
  function somar(q, topico, valor) {
    const chave = q.serie + '|' + topico.toLowerCase();
    res[chave] = res[chave] || { serie: q.serie, topico: topico, respostas: 0, acertos: 0, questionarios: {} };
    res[chave].respostas += 1;
    res[chave].acertos += valor;
    res[chave].questionarios[q.id] = true;
  }
  respostas.forEach(function (r) {
    const q = porId[r.questionario_id];
    if (!q || !r.detalhe) return;
    if (q.tipo === 'tda' && q.tda && Array.isArray(r.detalhe.rubrica)) {
      // Cada critério da rubrica vira um tópico; nível 4 = 100%, 3 = 75%, 2 = 50%, 1 = 25%.
      r.detalhe.rubrica.forEach(function (nivel, i) {
        if (q.tda.rubrica[i]) somar(q, 'TDA – ' + q.tda.rubrica[i].criterio, nivel / 4);
      });
      return;
    }
    if (!r.detalhe.acertos) return;
    r.detalhe.acertos.forEach(function (ok, i) {
      if (q.questoes[i]) somar(q, q.questoes[i].topico || 'Geral', ok ? 1 : 0);
    });
  });
  return Object.keys(res).map(function (k) {
    const t = res[k];
    return {
      serie: t.serie, topico: t.topico, respostas: t.respostas, acertos: Math.round(t.acertos * 10) / 10,
      percentual: Math.round((t.acertos / t.respostas) * 1000) / 10,
      questionarios: Object.keys(t.questionarios),
    };
  });
}

/** Dados do painel de relatórios. */
function profRelatorioGeral() {
  exigirProfessor_();
  const cfg = lerConfig_();
  const niveis = calcularNiveis_(cfg);
  const alunos = lerTabela_('Alunos');
  const questionarios = questionariosComCiclos_();
  const respostas = lerRespostas_();
  const mesDe = {};
  questionarios.forEach(function (q) { mesDe[q.id] = q.mes; });

  const turmas = listarTurmas_().map(function (t) {
    const daTurma = alunos.filter(function (a) { return String(a.turma) === t.turma; })
      .map(function (a) { return niveis[String(a.email).toLowerCase()]; });
    const avaliados = daTurma.filter(Boolean);
    const dist = contarNiveis_();
    avaliados.forEach(function (n) { dist[n.nivel] += 1; });

    // Média da turma em cada mês (respostas dos questionários daquele mês).
    const porMes = {};
    respostas.filter(function (r) { return r.turma === t.turma && mesDe[r.questionario_id]; }).forEach(function (r) {
      const mes = mesDe[r.questionario_id];
      porMes[mes] = porMes[mes] || { soma: 0, n: 0 };
      porMes[mes].soma += r.percentual;
      porMes[mes].n += 1;
    });
    const evolucao = Object.keys(porMes).sort().map(function (m) {
      return { mes: m, media: Math.round((porMes[m].soma / porMes[m].n) * 10) / 10 };
    });

    return {
      turma: t.turma, serie: t.serie, alunos: daTurma.length, avaliados: avaliados.length,
      media: avaliados.length ? Math.round((avaliados.reduce(function (s, n) { return s + n.media; }, 0) / avaliados.length) * 10) / 10 : null,
      niveis: dist, evolucao: evolucao,
    };
  });

  return {
    turmas: turmas,
    niveis: NIVEIS,
    faixas: { basico: Number(cfg.faixa_basico), intermediario: Number(cfg.faixa_intermediario), avancado: Number(cfg.faixa_avancado) },
    topicos: acertosPorTopico_(questionarios, respostas),
    questionarios: questionarios.map(function (q) { return { id: q.id, titulo: q.titulo, serie: q.serie, mes: q.mes }; }),
  };
}

/** Histórico de um aluno: cada avaliação, média acumulada e desempenho por tópico. */
function profEvolucaoAluno(email) {
  exigirProfessor_();
  email = String(email || '').toLowerCase();
  const cfg = lerConfig_();
  const aluno = lerTabela_('Alunos').filter(function (a) { return String(a.email).toLowerCase() === email; })[0];
  if (!aluno) throw new Error('Aluno não encontrado.');
  const questionarios = questionariosComCiclos_();
  const porId = {};
  questionarios.forEach(function (q) { porId[q.id] = q; });
  const respostas = lerRespostas_().filter(function (r) { return r.email === email && porId[r.questionario_id]; });

  respostas.sort(function (a, b) {
    const qa = porId[a.questionario_id], qb = porId[b.questionario_id];
    return qa.mes.localeCompare(qb.mes) || chaveData_(a.respondido_em).localeCompare(chaveData_(b.respondido_em));
  });

  let soma = 0;
  const avaliacoes = respostas.map(function (r, i) {
    const q = porId[r.questionario_id];
    soma += r.percentual;
    const acumulada = Math.round((soma / (i + 1)) * 10) / 10;
    return {
      titulo: q.titulo, tipo: q.tipo, mes: q.mes, data: r.respondido_em, origem: r.origem,
      pontuacao: r.pontuacao, total: r.total, percentual: r.percentual,
      mediaAcumulada: acumulada, nivel: nivelDe_(acumulada, cfg),
    };
  });

  const topicos = acertosPorTopico_(questionarios, respostas)
    .map(function (t) { return { topico: t.topico, respostas: t.respostas, acertos: t.acertos, percentual: t.percentual }; })
    .sort(function (a, b) { return a.percentual - b.percentual; });

  const ultima = avaliacoes[avaliacoes.length - 1];
  return {
    nome: String(aluno.nome), turma: String(aluno.turma), email: email,
    media: ultima ? ultima.mediaAcumulada : null, nivel: ultima ? ultima.nivel : '',
    avaliacoes: avaliacoes, topicos: topicos,
  };
}

/** Cria uma planilha nova no Drive do professor com o retrato atual. Devolve o link. */
function profExportarPlanilha() {
  exigirProfessor_();
  const cfg = lerConfig_();
  const geral = profRelatorioGeral();
  const niveis = calcularNiveis_(cfg);
  const questionarios = questionariosComCiclos_().sort(function (a, b) { return a.mes.localeCompare(b.mes) || a.serie.localeCompare(b.serie); });
  const respostas = lerRespostas_();
  const agora = Utilities.formatDate(new Date(), FUSO, 'dd/MM/yyyy HH:mm');

  const ss = SpreadsheetApp.create('Relatório – English Learning App – ' + agora);

  function preencher(aba, cabecalho, linhas) {
    const dados = [cabecalho].concat(linhas);
    aba.getRange(1, 1, dados.length, cabecalho.length).setValues(dados);
    aba.getRange(1, 1, 1, cabecalho.length).setFontWeight('bold').setBackground('#dbe4ff');
    aba.setFrozenRows(1);
    aba.autoResizeColumns(1, cabecalho.length);
  }

  const abaTurmas = ss.getSheets()[0].setName('Turmas');
  preencher(abaTurmas, ['Turma', 'Alunos', 'Avaliados', 'Média (%)'].concat(NIVEIS),
    geral.turmas.map(function (t) {
      return [t.turma, t.alunos, t.avaliados, t.media === null ? '' : t.media]
        .concat(NIVEIS.map(function (n) { return t.niveis[n]; }));
    }));

  // Alunos: uma coluna por questionário da série.
  const abaAlunos = ss.insertSheet('Alunos');
  const alunos = lerTabela_('Alunos').sort(function (a, b) {
    return String(a.turma).localeCompare(String(b.turma)) || String(a.nome).localeCompare(String(b.nome), 'pt-BR');
  });
  const titulos = questionarios.map(function (q) { return q.titulo; });
  preencher(abaAlunos, ['Turma', 'Nome', 'E-mail', 'Nível', 'Média (%)', 'Avaliações'].concat(titulos),
    alunos.map(function (a) {
      const email = String(a.email).toLowerCase();
      const n = niveis[email];
      return [String(a.turma), String(a.nome), email, n ? n.nivel : '', n ? n.media : '', n ? n.avaliacoes : 0]
        .concat(questionarios.map(function (q) {
          const r = respostas.filter(function (x) { return x.questionario_id === q.id && x.email === email; })[0];
          return r ? r.percentual : '';
        }));
    }));

  const abaTopicos = ss.insertSheet('Tópicos');
  preencher(abaTopicos, ['Série', 'Tópico', 'Respostas', 'Acertos', 'Acerto (%)'],
    geral.topicos.sort(function (a, b) { return a.serie.localeCompare(b.serie) || a.percentual - b.percentual; })
      .map(function (t) { return [t.serie, t.topico, t.respostas, t.acertos, t.percentual]; }));

  const abaGrupos = ss.insertSheet('Grupos');
  const grupos = lerGrupos_();
  const ultimo = {};
  grupos.forEach(function (g) { if (!ultimo[g.turma] || g.mes > ultimo[g.turma]) ultimo[g.turma] = g.mes; });
  const vigentes = grupos.filter(function (g) { return g.mes === ultimo[g.turma]; })
    .sort(function (a, b) { return a.turma.localeCompare(b.turma) || a.grupo - b.grupo || a.nome.localeCompare(b.nome, 'pt-BR'); });
  preencher(abaGrupos, ['Turma', 'Mês', 'Grupo', 'Nome', 'Nível na formação', 'Média na formação (%)'],
    vigentes.length
      ? vigentes.map(function (g) { return [g.turma, "'" + g.mes, g.grupo, g.nome, g.nivel, g.media === null ? '' : g.media]; })
      : [['', '', '', 'Nenhum grupo formado ainda', '', '']]);

  return ss.getUrl();
}
