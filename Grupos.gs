/**
 * Etapa 3: formação mensal dos grupos.
 * A sugestão (serpentina + equilíbrio de médias) é calculada no painel; aqui ficam leitura e gravação.
 */

function lerGrupos_() {
  return lerTabela_('Grupos').map(function (g) {
    return {
      mes: String(g.mes), turma: String(g.turma), grupo: Number(g.grupo), email: String(g.email).toLowerCase(),
      nome: String(g.nome), nivel: String(g.nivel), media: g.media === '' ? null : Number(g.media), aplicado_em: String(g.aplicado_em),
    };
  });
}

/** Agrupa as linhas de um mês/turma no formato [{numero, membros:[email]}]. */
function montarGrupos_(linhas) {
  const porNumero = {};
  linhas.forEach(function (l) { (porNumero[l.grupo] = porNumero[l.grupo] || []).push(l.email); });
  return Object.keys(porNumero).map(Number).sort(function (a, b) { return a - b; })
    .map(function (n) { return { numero: n, membros: porNumero[n] }; });
}

/** Situação dos grupos das 12 turmas em um mês. */
function profGruposResumo(mes) {
  exigirProfessor_();
  const niveis = calcularNiveis_(lerConfig_());
  const alunos = lerTabela_('Alunos');
  const grupos = lerGrupos_();
  return listarTurmas_().map(function (t) {
    const daTurma = alunos.filter(function (a) { return String(a.turma) === t.turma; });
    const linhas = grupos.filter(function (g) { return g.turma === t.turma; });
    const meses = linhas.map(function (g) { return g.mes; }).filter(function (m, i, arr) { return arr.indexOf(m) === i; }).sort();
    const doMes = linhas.filter(function (g) { return g.mes === mes; });
    return {
      turma: t.turma, serie: t.serie, alunos: daTurma.length,
      avaliados: daTurma.filter(function (a) { return niveis[String(a.email).toLowerCase()]; }).length,
      definido: doMes.length > 0,
      aplicado_em: doMes.length ? doMes[0].aplicado_em : '',
      ultimoMes: meses.filter(function (m) { return m <= mes; }).pop() || '',
    };
  });
}

/** Alunos da turma com média/nível atuais e os grupos em vigor (do mês ou, se não houver, do último mês anterior). */
function profGruposTurma(turma, mes) {
  exigirProfessor_();
  validarTurma_(turma);
  const cfg = lerConfig_();
  const niveis = calcularNiveis_(cfg);
  const alunos = lerTabela_('Alunos')
    .filter(function (a) { return String(a.turma) === turma; })
    .map(function (a) {
      const email = String(a.email).toLowerCase();
      const n = niveis[email];
      return { email: email, nome: String(a.nome), media: n ? n.media : null, nivel: n ? n.nivel : '' };
    });
  const emails = alunos.map(function (a) { return a.email; });
  const linhas = lerGrupos_().filter(function (g) { return g.turma === turma && g.mes <= mes; });
  const mesVigente = linhas.map(function (g) { return g.mes; }).sort().pop() || '';
  const vigentes = linhas.filter(function (g) { return g.mes === mesVigente && emails.indexOf(g.email) !== -1; });
  return {
    turma: turma,
    mes: mes,
    maxGrupo: Number(cfg.tamanho_max_grupo) || 5,
    alunos: alunos,
    mesVigente: mesVigente,
    definidoNoMes: mesVigente === mes,
    grupos: montarGrupos_(vigentes),
  };
}

/**
 * Grava os grupos de uma turma para o mês (substitui os que já existirem nesse mês).
 * grupos: lista de listas de e-mails. Usado tanto para "aplicar novos" quanto para "manter os atuais".
 */
function profSalvarGrupos(turma, mes, grupos) {
  exigirProfessor_();
  validarTurma_(turma);
  if (!/^\d{4}-\d{2}$/.test(mes)) throw new Error('Mês inválido.');
  const cfg = lerConfig_();
  const max = Number(cfg.tamanho_max_grupo) || 5;
  const niveis = calcularNiveis_(cfg);
  const alunos = {};
  lerTabela_('Alunos').forEach(function (a) {
    if (String(a.turma) === turma) alunos[String(a.email).toLowerCase()] = String(a.nome);
  });

  const vistos = {};
  const limpos = grupos.map(function (g) { return g.map(function (e) { return String(e).toLowerCase(); }); })
    .filter(function (g) { return g.length; });
  limpos.forEach(function (g, i) {
    if (g.length > max) throw new Error('O grupo ' + (i + 1) + ' tem ' + g.length + ' alunos (máximo ' + max + ').');
    g.forEach(function (e) {
      if (!alunos[e]) throw new Error('Há um aluno que não pertence à turma ' + turma + '. Recarregue a página.');
      if (vistos[e]) throw new Error(alunos[e] + ' está em mais de um grupo.');
      vistos[e] = true;
    });
  });
  if (!limpos.length) throw new Error('Nenhum grupo para salvar.');

  const agora = new Date();
  const novas = [];
  limpos.forEach(function (g, i) {
    g.forEach(function (e) {
      const n = niveis[e];
      novas.push(linhaDe_('Grupos', {
        mes: "'" + mes, turma: turma, grupo: i + 1, email: e, nome: alunos[e],
        nivel: n ? n.nivel : '', media: n ? n.media : '', aplicado_em: agora,
      }));
    });
  });

  comTrava_(function () {
    const aba = aba_('Grupos');
    const largura = CABECALHOS.Grupos.length;
    const total = aba.getLastRow() - 1;
    const antigas = total > 0 ? aba.getRange(2, 1, total, largura).getValues() : [];
    const mantidas = antigas.filter(function (l) {
      const m = l[0] instanceof Date ? Utilities.formatDate(l[0], FUSO, 'yyyy-MM') : String(l[0]);
      return !(m === mes && String(l[1]) === turma);
    }).map(function (l) {
      const m = l[0] instanceof Date ? Utilities.formatDate(l[0], FUSO, 'yyyy-MM') : String(l[0]);
      l[0] = "'" + m;
      return l;
    });
    if (total > 0) aba.getRange(2, 1, total, largura).clearContent();
    const linhas = mantidas.concat(novas);
    aba.getRange(2, 1, linhas.length, largura).setValues(linhas);
  });
  return profGruposTurma(turma, mes);
}
