/**
 * Correção de TDA com apoio da IA (opcional; só TDAs individuais).
 * O professor marca os alunos, copia um pedido (rubrica + textos, com o primeiro nome) e cola no claude.ai;
 * a resposta volta como RASCUNHO. Nada chega ao aluno antes de o professor revisar e publicar.
 * Etapa 1: pedido em lotes, importação e rascunhos. A revisão/publicação e a tela do aluno vêm nas próximas etapas.
 */

const LOTE_CORRECAO_IA = 10;
const MIN_PALAVRAS_IA = 5;
const MAX_CARACTERES_TEXTO_IA = 4000;

/** Código estável do aluno no pedido (não expõe o e-mail): "S" + 6 caracteres. */
function codigoAlunoIa_(email) {
  const d = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, 'tda-ia:' + String(email).toLowerCase());
  return 'S' + d.slice(0, 3).map(function (b) { return ((b + 256) % 256).toString(16).padStart(2, '0'); }).join('').toUpperCase();
}

function lerRascunhosIa_(qid) {
  garantirAba_('RascunhosTda');
  const res = {};
  lerTabela_('RascunhosTda').forEach(function (l) {
    if (String(l.questionario_id) !== qid) return;
    try { res[String(l.email).toLowerCase()] = { _linha: l._linha, rascunho: JSON.parse(l.rascunho_json), criado_em: String(l.criado_em) }; } catch (e) { /* ignora linha corrompida */ }
  });
  return res;
}

/** Entregas individuais com o texto puro: { email: { titulo, texto, palavras } }. */
function textosParaIa_(qid) {
  const res = {};
  lerEntregas_().filter(function (e) { return e.questionario_id === qid && e.grupo == null; }).forEach(function (e) {
    const texto = e.formato === 'html' ? textoPuroTda_(e.texto) : String(e.texto || '').trim();
    const palavras = (texto.match(/[A-Za-zÀ-ÿ']+/g) || []).length;
    res[e.email] = { titulo: e.titulo, texto: texto, palavras: palavras };
  });
  return res;
}

/** Para o painel: TDA individual? quem tem texto suficiente e quem já tem rascunho. */
function situacaoCorrecaoIa_(q) {
  if (q.tda.modo === 'grupo') return null;
  const textos = textosParaIa_(q.id);
  const rasc = lerRascunhosIa_(q.id);
  const comTexto = {}, rascunhos = {};
  Object.keys(textos).forEach(function (e) { comTexto[e] = textos[e].palavras >= MIN_PALAVRAS_IA; });
  Object.keys(rasc).forEach(function (e) { rascunhos[e] = Object.assign({ criado_em: rasc[e].criado_em }, rasc[e].rascunho); });
  // Habilidades que podem ir no "o que estudar" (da série e da Trilha Base).
  const habilidades = (HABILIDADES[q.serie] || []).concat(HABILIDADES.base || []).map(function (h) { return { id: h.id, nome: h.nome.replace(/^Base: /, '') }; });
  return { comTexto: comTexto, rascunhos: rascunhos, lote: LOTE_CORRECAO_IA, habilidades: habilidades, mostrarCorrigida: q.tda.mostrarCorrigida === true };
}

function habilidadesParaIa_(q) {
  const daTda = q.tda.habilidades || [];
  const linha = function (h) { return '- "' + h.id + '" = ' + h.nome.replace(/^Base: /, '') + (h.codigo && !/^BASE/.test(h.codigo) ? ' (' + h.codigo + ')' : ''); };
  const serie = (HABILIDADES[q.serie] || []);
  return {
    tda: serie.filter(function (h) { return daTda.indexOf(h.id) !== -1; }).map(linha),
    outras: serie.filter(function (h) { return daTda.indexOf(h.id) === -1; }).concat(HABILIDADES.base || []).map(linha),
  };
}

/** Texto do pedido de um lote (até 10 alunos). */
function profPedidoCorrecaoIa(id, emails) {
  exigirProfessor_();
  const q = buscarTda_(id);
  if (q.tda.modo === 'grupo') throw new Error('A correção com IA é só para TDAs individuais.');
  const alvos = (emails || []).map(function (e) { return String(e).toLowerCase(); }).filter(String);
  if (!alvos.length) throw new Error('Marque pelo menos um aluno.');
  if (alvos.length > LOTE_CORRECAO_IA) throw new Error('Cada lote tem no máximo ' + LOTE_CORRECAO_IA + ' alunos.');
  const textos = textosParaIa_(id);
  const nomes = nomesPorEmail_();
  const corrigidos = {};
  lerRespostas_().forEach(function (r) { if (r.questionario_id === id) corrigidos[r.email] = true; });
  alvos.forEach(function (e) {
    const nome = nomes[e] || e;
    if (corrigidos[e]) throw new Error(nome + ' já foi corrigido. Recarregue a página.');
    if (!textos[e] || textos[e].palavras < MIN_PALAVRAS_IA) throw new Error(nome + ' não tem texto no editor: corrija à mão.');
  });

  const t = q.tda;
  const habs = habilidadesParaIa_(q);
  const L = [];
  L.push('Você vai me ajudar a corrigir uma TDA (Tarefa de Desempenho Autêntico) de inglês de alunos do ' + q.serie + ' ano de uma escola pública de Joinville (SC).');
  L.push('Os alunos têm pouco conhecimento de inglês. Sou o professor: vou revisar a sua correção antes de publicar.');
  L.push('');
  L.push('TDA: "' + q.titulo + '"');
  L.push('Situação-problema: ' + t.situacao);
  L.push('Produto final: ' + t.produto);
  if ((t.tarefas || []).length) L.push('Tarefas de apoio: ' + t.tarefas.join(' | '));
  if ((t.criterios || []).length) L.push('Critérios de avaliação: ' + t.criterios.join(' | '));
  L.push('');
  const daIa = t.rubrica.filter(function (r) { return !r.soProfessor; });
  const doProf = t.rubrica.filter(function (r) { return r.soProfessor; });
  if (!daIa.length) throw new Error('Todos os critérios da rubrica estão marcados como "só o professor avalia": não há o que pedir à IA.');
  L.push('RUBRICA (dê exatamente um nível de 1 a 4 para cada critério abaixo, na ordem: são ' + daIa.length + ' critérios):');
  daIa.forEach(function (r, i) {
    L.push((i + 1) + '. ' + r.criterio);
    L.push('   4 (Excelente): ' + r.n4);
    L.push('   3 (Satisfatório): ' + r.n3);
    L.push('   2 (Em desenvolvimento): ' + r.n2);
    L.push('   1 (Insuficiente): ' + r.n1);
  });
  if (doProf.length) L.push('Outros critérios (' + doProf.map(function (r) { return '"' + r.criterio + '"'; }).join(', ') + ') são avaliados pelo professor em sala: NÃO os avalie e não os mencione.');
  L.push('');
  if (t.obsIa) { L.push('ORIENTAÇÕES DO PROFESSOR (siga com prioridade): ' + t.obsIa); L.push(''); }
  L.push('HABILIDADES PARA "estudar" (use só estes ids; prefira as da TDA):');
  if (habs.tda.length) { L.push('Da TDA:'); habs.tda.forEach(function (x) { L.push(x); }); }
  L.push('Outras do ano:');
  habs.outras.forEach(function (x) { L.push(x); });
  L.push('');
  L.push('REGRAS');
  L.push('- Avalie SÓ o que está no texto. Não invente o que o aluno não escreveu. Partes feitas no Canva ou em anexo não aparecem aqui: avalie o texto.');
  L.push('- Siga os descritores da rubrica com rigor e justiça. Texto em português, copiado da tarefa ou sem relação com ela fica nos níveis baixos (diga isso no "porque").');
  L.push('- "porque": 1 ou 2 frases em PORTUGUÊS simples, citando entre aspas um trecho do próprio texto do aluno (em inglês) como exemplo.');
  L.push('- "pontos_fortes": de 1 a 3 frases curtas em português.');
  L.push('- "melhorar": de 1 a 4 erros reais do texto: "trecho" (como o aluno escreveu), "correcao" (forma certa em inglês) e "explicacao" (em português, curta).');
  L.push('- "estudar": de 1 a 3 habilidades (ids da lista) ligadas aos erros, com "motivo" curto em português.');
  L.push('- "versao_corrigida": o MESMO texto do aluno com os erros corrigidos, mantendo as ideias, a ordem e o nível simples. Não acrescente conteúdo nem reescreva do zero.');
  L.push('- Fale com o aluno pelo primeiro nome, em tom encorajador e direto (ex.: "Ana, você…").');
  L.push('- Use exatamente o "codigo" de cada aluno. Responda SOMENTE com o JSON, dentro de um bloco ```json, sem comentários.');
  L.push('');
  L.push('FORMATO (o conteúdo é só exemplo):');
  L.push('```json');
  L.push(JSON.stringify({ tipo: 'correcao', alunos: [{
    codigo: codigoAlunoIa_(alvos[0]),
    criterios: daIa.map(function (r) { return { nivel: 3, porque: 'Exemplo: você usou bem o passado em "I visited my grandma", mas trocou o verbo em "I go to the beach".' }; }),
    pontos_fortes: ['Exemplo: seu texto responde à situação e tem começo, meio e fim.'],
    melhorar: [{ trecho: 'I go to the beach yesterday', correcao: 'I went to the beach yesterday', explicacao: 'Com "yesterday", use o passado: go → went.' }],
    estudar: [{ habilidade: (t.habilidades || [])[0] || ((HABILIDADES[q.serie] || [])[0] || {}).id || '', motivo: 'Verbos irregulares no passado.' }],
    versao_corrigida: 'Last weekend I went to the beach with my family...',
  }] }, null, 1));
  L.push('```');
  L.push('');
  L.push('TEXTOS DOS ALUNOS (' + alvos.length + '):');
  alvos.forEach(function (e) {
    const x = textos[e];
    L.push('');
    L.push('=== codigo: ' + codigoAlunoIa_(e) + ' · primeiro nome: ' + String(nomes[e] || '').split(' ')[0] + ' ===');
    if (x.titulo) L.push('Título: ' + x.titulo);
    L.push('<<<');
    L.push(x.texto.length > MAX_CARACTERES_TEXTO_IA ? x.texto.slice(0, MAX_CARACTERES_TEXTO_IA) + ' […]' : x.texto);
    L.push('>>>');
  });
  return L.join('\n');
}

/** Confere a resposta do claude.ai e guarda os rascunhos. Devolve { dados, importados, avisos }. */
function profImportarCorrecaoIa(id, texto) {
  exigirProfessor_();
  const q = buscarTda_(id);
  if (q.tda.modo === 'grupo') throw new Error('A correção com IA é só para TDAs individuais.');
  const d = extrairJson_(texto);
  const lista = Array.isArray(d.alunos) ? d.alunos : [];
  if (!lista.length) throw new Error('A resposta não tem a lista "alunos". Peça ao Claude para enviar o JSON completo no formato do pedido.');
  // A IA avalia só os critérios que não são "só o professor"; esses voltam sem nível, para o professor marcar.
  const indicesIa = [];
  q.tda.rubrica.forEach(function (r, i) { if (!r.soProfessor) indicesIa.push(i); });
  const n = indicesIa.length;
  const turmas = listarTurmas_().filter(function (t) { return t.serie === q.serie; }).map(function (t) { return t.turma; });
  const nomes = nomesPorEmail_();
  const porCodigo = {};
  lerTabela_('Alunos').forEach(function (a) {
    if (turmas.indexOf(String(a.turma)) !== -1) porCodigo[codigoAlunoIa_(a.email)] = String(a.email).toLowerCase();
  });
  const textos = textosParaIa_(id);
  const corrigidos = {};
  lerRespostas_().forEach(function (r) { if (r.questionario_id === id) corrigidos[r.email] = true; });
  const validas = {};
  ['base', q.serie].forEach(function (s) { (HABILIDADES[s] || []).forEach(function (h) { validas[h.id] = true; }); });
  const txt = function (v, max) { return String(v == null ? '' : v).trim().slice(0, max || 600); };
  const avisos = [], novos = {};

  lista.forEach(function (a, k) {
    a = a || {};
    const cod = txt(a.codigo, 20).toUpperCase();
    const email = porCodigo[cod];
    const onde = 'Aluno ' + (k + 1) + (cod ? ' (' + cod + ')' : '');
    if (!email) { avisos.push(onde + ': código desconhecido, ignorado.'); return; }
    const nome = nomes[email] || email;
    if (corrigidos[email]) { avisos.push(nome + ': já tem correção publicada, ignorado.'); return; }
    if (!textos[email]) { avisos.push(nome + ': não tem entrega nesta TDA, ignorado.'); return; }
    const crit = Array.isArray(a.criterios) ? a.criterios : [];
    if (crit.length !== n) { avisos.push(nome + ': veio com ' + crit.length + ' critérios (a rubrica tem ' + n + '), ignorado.'); return; }
    const niveis = crit.map(function (c) { return Number(c && c.nivel); });
    if (niveis.some(function (v) { return [1, 2, 3, 4].indexOf(v) === -1; })) { avisos.push(nome + ': há nível fora de 1 a 4, ignorado.'); return; }
    const estudar = (Array.isArray(a.estudar) ? a.estudar : []).map(function (x) { return { habilidade: txt(x && x.habilidade, 40), motivo: txt(x && x.motivo, 300) }; });
    const fora = estudar.filter(function (x) { return !validas[x.habilidade]; });
    if (fora.length) avisos.push(nome + ': habilidade desconhecida em "estudar" (' + fora.map(function (x) { return x.habilidade; }).join(', ') + ') foi retirada.');
    novos[email] = {
      criterios: q.tda.rubrica.map(function (r, i) {
        const k = indicesIa.indexOf(i);
        return k === -1 ? { nivel: null, porque: '', soProfessor: true } : { nivel: niveis[k], porque: txt(crit[k].porque, 600) };
      }),
      pontos_fortes: (Array.isArray(a.pontos_fortes) ? a.pontos_fortes : []).map(function (x) { return txt(x, 400); }).filter(String).slice(0, 3),
      melhorar: (Array.isArray(a.melhorar) ? a.melhorar : []).map(function (x) {
        return { trecho: txt(x && x.trecho, 300), correcao: txt(x && x.correcao, 300), explicacao: txt(x && x.explicacao, 400) };
      }).filter(function (x) { return x.trecho || x.correcao; }).slice(0, 4),
      estudar: estudar.filter(function (x) { return validas[x.habilidade]; }).slice(0, 3),
      versao_corrigida: txt(a.versao_corrigida, MAX_CARACTERES_TEXTO_IA + 1000),
    };
  });
  const emails = Object.keys(novos);
  if (!emails.length) throw new Error('Nenhum rascunho importado. ' + avisos.join(' '));
  // Dentro da trava, só a aba pequena dos rascunhos.
  comTrava_(function () {
    const atuais = lerRascunhosIa_(id);
    const aba = garantirAba_('RascunhosTda');
    emails.forEach(function (e) {
      const linha = linhaDe_('RascunhosTda', { questionario_id: id, email: e, rascunho_json: JSON.stringify(novos[e]), criado_em: new Date() });
      if (atuais[e]) aba.getRange(atuais[e]._linha, 1, 1, linha.length).setValues([linha]);
      else aba.appendRow(linha);
    });
  });
  return { dados: profTdaResultados(id), importados: emails.length, avisos: avisos };
}

/** Rascunho de um aluno (com os nomes das habilidades), para o professor conferir. */
function profVerRascunhoIa(id, email) {
  exigirProfessor_();
  const r = lerRascunhosIa_(id)[String(email).toLowerCase()];
  if (!r) throw new Error('Este aluno não tem rascunho da IA.');
  const x = r.rascunho;
  x.estudar = (x.estudar || []).map(function (s) { return Object.assign({}, s, { nome: nomeHabilidade_(s.habilidade).replace(/^Base: /, '') }); });
  x.criado_em = r.criado_em;
  return x;
}

// ============================================================
// Etapa 2: revisão e publicação (na tela de correção)
// ============================================================

/** Confere o feedback revisado pelo professor. Devolve null se estiver tudo vazio. */
function validarFeedbackIa_(f, q) {
  if (!f || typeof f !== 'object') return null;
  const txt = function (v, max) { return String(v == null ? '' : v).trim().slice(0, max || 600); };
  const validas = {};
  ['base', q.serie].forEach(function (s) { (HABILIDADES[s] || []).forEach(function (h) { validas[h.id] = true; }); });
  const fb = {
    porques: q.tda.rubrica.map(function (_, i) { return txt((f.porques || [])[i], 600); }),
    pontos_fortes: (Array.isArray(f.pontos_fortes) ? f.pontos_fortes : []).map(function (x) { return txt(x, 400); }).filter(String).slice(0, 3),
    melhorar: (Array.isArray(f.melhorar) ? f.melhorar : []).map(function (x) {
      return { trecho: txt(x && x.trecho, 300), correcao: txt(x && x.correcao, 300), explicacao: txt(x && x.explicacao, 400) };
    }).filter(function (x) { return x.trecho || x.correcao; }).slice(0, 6),
    estudar: (Array.isArray(f.estudar) ? f.estudar : []).map(function (x) { return { habilidade: txt(x && x.habilidade, 40), motivo: txt(x && x.motivo, 300) }; })
      .filter(function (x) { return validas[x.habilidade]; }).slice(0, 3),
    versao_corrigida: txt(f.versao_corrigida, MAX_CARACTERES_TEXTO_IA + 1000),
  };
  const vazio = !fb.porques.some(String) && !fb.pontos_fortes.length && !fb.melhorar.length && !fb.estudar.length && !fb.versao_corrigida;
  return vazio ? null : fb;
}

/** Apaga rascunhos (depois de publicar ou ao descartar). Chamar dentro de comTrava_. */
function apagarRascunhosIa_(id, emails) {
  const r = lerRascunhosIa_(id);
  const aba = garantirAba_('RascunhosTda');
  emails.map(function (e) { return r[e] && r[e]._linha; }).filter(Boolean).sort(function (a, b) { return b - a; })
    .forEach(function (l) { aba.deleteRow(l); });
}

function profDescartarRascunhoIa(id, email) {
  exigirProfessor_();
  buscarTda_(id);
  comTrava_(function () { apagarRascunhosIa_(id, [String(email).toLowerCase()]); });
  return profTdaResultados(id);
}
