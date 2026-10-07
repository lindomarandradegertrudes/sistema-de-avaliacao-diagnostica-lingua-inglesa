/**
 * Etapa 3: catálogo de habilidades por série (Mapa de Progressão 2026) e etiquetagem automática.
 * Toda questão (pelo "tópico") e todo cadeado (pela etiqueta sigla · foco) é ligado a um item do catálogo
 * por palavras-chave. Nada é gravado: a etiqueta é calculada na hora, então questões novas já entram etiquetadas.
 * Ordem importa: o primeiro item cujas palavras aparecem no texto vence (itens específicos vêm antes dos gerais).
 */

const HABILIDADES = {
  '6º': [
    { id: '6-genitivo', nome: "Genitive 's", codigo: 'EF06LI22', chaves: ["genitive", "'s", 'genitivo', 'caso possessivo'] },
    { id: '6-possessivos', nome: 'Possessive adjectives', codigo: 'EF06LI23', chaves: ['possessive', 'possessivo', 'his/her', 'his or her'] },
    { id: '6-pronomes', nome: 'Subject pronouns', codigo: 'EF06LI19', chaves: ['subject pronoun', 'pronomes pessoais', 'pronouns'] },
    { id: '6-presentcont', nome: 'Present continuous', codigo: 'EF06LI20', chaves: ['present continuous', 'continuous', '-ing'] },
    { id: '6-present3', nome: 'Simple present (he/she/it)', codigo: 'EF06LI19', chaves: ['3a pessoa', 'he/she', '+ -s', "doesn't", 'does'] },
    { id: '6-tobe', nome: 'Verb to be', codigo: 'EF06LI19', chaves: ['verb to be', 'to be', 'am/is/are', 'is/are'] },
    { id: '6-paises', nome: 'Countries and nationalities', codigo: 'EF06LI17', chaves: ['countr', 'nationalit', 'paises'] },
    { id: '6-familia', nome: 'Family', codigo: 'EF06LI17', chaves: ['family', 'familia'] },
    { id: '6-rotina', nome: 'Routine, days and time', codigo: 'EF06LI17', chaves: ['rotina', 'routine', 'horas', 'dias da semana', 'lugares da escola', 'i play', 'i + verbo', 'i/we'] },
    { id: '6-oral', nome: 'Listening', codigo: 'EF06LI04', chaves: ['compreensao oral', 'oral', 'listening'] },
    { id: '6-inferencia', nome: 'Reading: inference and purpose', codigo: 'EF06LI07', chaves: ['implicita', 'inferencia', 'finalidade', 'assunto', 'genero'] },
    { id: '6-leitura', nome: 'Reading: specific information', codigo: 'EF06LI09', chaves: ['explicita', 'localizar', 'leitura', 'cruzar', 'informacao'] },
  ],
  '7º': [
    { id: '7-pasttobe', nome: 'Past of verb to be', codigo: 'EF07LI15', chaves: ['past of verb to be', 'was/were', 'was or were'] },
    { id: '7-past', nome: 'Simple past', codigo: 'EF07LI15', chaves: ['simple past', 'past', 'passado', 'regular', 'irregular'] },
    { id: '7-preposicoes', nome: 'Prepositions in / on / at', codigo: 'EF07LI15', chaves: ['prepositions of time', 'in/on/at', 'preposic'] },
    { id: '7-conectores', nome: 'Connectors', codigo: 'EF07LI15', chaves: ['connector', 'conector'] },
    { id: '7-can', nome: 'Can / could', codigo: 'EF07LI20', chaves: ['can/could', 'can', 'could', 'habilidades'] },
    { id: '7-pronomes', nome: 'Subject and object pronouns', codigo: 'EF07LI19', chaves: ['object pronoun', 'subject and object', 'pronomes'] },
    { id: '7-comida', nome: 'Food, countable and uncountable', codigo: 'EF07LI25-JO', chaves: ['food', 'countable', 'uncountable', 'quantifier', 'much', 'many', 'imperative', 'recipe', 'comida'] },
    { id: '7-present', nome: 'Simple present', codigo: 'EF07LI06', chaves: ['simple present'] },
    { id: '7-oral', nome: 'Listening', codigo: 'EF07LI04', chaves: ['compreensao oral', 'oral', 'listening'] },
    { id: '7-global', nome: 'Reading: global meaning', codigo: 'EF07LI06', chaves: ['genero', 'lingua franca', 'inferencia', 'global', 'cruzar'] },
    { id: '7-leitura', nome: 'Reading: specific information', codigo: 'EF07LI09', chaves: ['explicita', 'selecionar', 'localizar', 'leitura', 'informacao'] },
  ],
  '8º': [
    { id: '8-goingto', nome: 'Future: going to', codigo: 'EF08LI14', chaves: ['going to'] },
    { id: '8-will', nome: 'Future: will', codigo: 'EF08LI14', chaves: ['will'] },
    { id: '8-futuro', nome: 'Future time expressions', codigo: 'EF08LI12', chaves: ['future time', 'future', 'futuro'] },
    { id: '8-comparativos', nome: 'Comparatives and superlatives', codigo: 'EF08LI15', chaves: ['comparativ', 'superlativ'] },
    { id: '8-prefixos', nome: 'Prefixes and suffixes', codigo: 'EF08LI13', chaves: ['prefix', 'suffix', 'prefixo', 'sufixo', 'palavras novas'] },
    { id: '8-relativos', nome: 'Relative pronouns', codigo: 'EF08LI17', chaves: ['relative', 'relativo', 'who', 'which', 'whose'] },
    { id: '8-oral', nome: 'Listening', codigo: 'EF08LI03', chaves: ['compreensao oral', 'oral', 'listening'] },
    { id: '8-inferencia', nome: 'Reading: inference', codigo: 'EF08LI05', chaves: ['inferencia', 'inference', 'narrativa', 'implicita', 'cruzar'] },
    { id: '8-leitura', nome: 'Reading: specific information', codigo: 'EF08LI05', chaves: ['explicita', 'localizar', 'leitura', 'informacao'] },
  ],
  '9º': [
    { id: '9-presentperfect', nome: 'Present perfect', codigo: 'EF09LI21-JO', chaves: ['present perfect', 'has/have', 'particip'] },
    { id: '9-advtempo', nome: 'Since / for / already / yet / never', codigo: 'EF09LI020-JO', chaves: ['since', 'already', 'yet', 'never', 'ever'] },
    { id: '9-condicionais', nome: 'Conditionals (if)', codigo: 'EF09LI15', chaves: ['conditional', 'condicional', 'if-clause'] },
    { id: '9-modais', nome: 'Modals: should / must / have to', codigo: 'EF09LI16', chaves: ['modal', 'should', 'must', 'have to'] },
    { id: '9-conectores', nome: 'Connectors', codigo: 'EF09LI14', chaves: ['connector', 'conector'] },
    { id: '9-digital', nome: 'Digital language', codigo: 'EF09LI13', chaves: ['digital', 'abreviac', 'acronim'] },
    { id: '9-expansao', nome: 'English in the world', codigo: 'EF09LI17', chaves: ['expansao', 'colonizac'] },
    { id: '9-fato', nome: 'Fact × opinion', codigo: 'EF09LI06', chaves: ['fato', 'opiniao', 'fact', 'opinion', 'fake news'] },
    { id: '9-argumentos', nome: 'Arguments and evidence', codigo: 'EF09LI07', chaves: ['argumento', 'evidencia'] },
    { id: '9-oral', nome: 'Listening', codigo: 'EF09LI07', chaves: ['compreensao oral', 'oral', 'listening'] },
    { id: '9-leitura', nome: 'Reading: specific information', codigo: 'EF09LI07', chaves: ['explicita', 'localizar', 'leitura', 'cruzar', 'informacao'] },
  ],
  // Habilidades da Trilha Base (iguais para todas as séries; etiquetas com código "BASE").
  base: [
    { id: 'b-possessivos', nome: 'Base: possessives', codigo: 'BASE', chaves: ['possessiv', 'his/her'] },
    { id: 'b-havehas', nome: 'Base: have / has', codigo: 'BASE', chaves: ['have/has'] },
    { id: 'b-presentcont', nome: 'Base: present continuous', codigo: 'BASE', chaves: ['present continuous', '-ing'] },
    { id: 'b-can', nome: "Base: can / can't", codigo: 'BASE', chaves: ['can', 'verbos de acao'] },
    { id: 'b-like', nome: "Base: like / don't like and food", codigo: 'BASE', chaves: ['like', 'comida', 'bebida'] },
    { id: 'b-lugares', nome: 'Base: places and there is / are', codigo: 'BASE', chaves: ['there is', 'lugares', 'preposicoes de lugar'] },
    { id: 'b-present3', nome: 'Base: he / she + -s', codigo: 'BASE', chaves: ['he/she', 'frequencia', 'dias da semana'] },
    { id: 'b-rotina', nome: 'Base: routine and time', codigo: 'BASE', chaves: ['rotina', 'horas', 'sequencia', 'i/we'] },
    { id: 'b-tobe', nome: 'Base: verb to be', codigo: 'BASE', chaves: ['to be', 'am/is/are', 'is/are'] },
    { id: 'b-familia', nome: 'Base: family and people', codigo: 'BASE', chaves: ['familia', 'descrever pessoas', 'idade'] },
    { id: 'b-oral', nome: 'Base: listening', codigo: 'BASE', chaves: ['compreensao oral', 'oral'] },
    { id: 'b-leitura', nome: 'Base: reading', codigo: 'BASE', chaves: ['localizar', 'cruzar', 'informacao'] },
  ],
};

function semAcento_(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/’/g, "'").replace(/[ºª]/g, 'a');
}

/** A palavra-chave aparece no texto? Chaves curtas (até 4 letras) precisam ser palavra inteira. */
function temChave_(texto, chave) {
  const c = semAcento_(chave);
  if (c.length > 4 || /[^a-z]/.test(c)) return texto.indexOf(c) !== -1;
  return new RegExp('(^|[^a-z])' + c + '([^a-z]|$)').test(texto);
}

/** Catálogo usado para uma série: os itens da série + os da Trilha Base. */
function catalogoDaSerie_(serie) {
  return (HABILIDADES[serie] || []).concat(HABILIDADES.base);
}

/**
 * Item do catálogo para um texto (tópico da questão ou foco do cadeado) e uma sigla opcional.
 * Etiqueta "BASE" procura só na Trilha Base; as outras procuram na série. Sem palavra-chave, usa a sigla.
 */
function habilidadeDe_(serie, texto, codigo) {
  const t = semAcento_(texto);
  if (t === 'tutorial') return null;
  const base = /^BASE/.test(String(codigo || ''));
  const lista = base ? HABILIDADES.base : (HABILIDADES[serie] || []);
  const porChave = lista.filter(function (h) { return h.chaves.some(function (k) { return temChave_(t, k); }); });
  if (porChave.length) {
    const mesmoCodigo = codigo ? porChave.filter(function (h) { return h.codigo === codigo; })[0] : null;
    return mesmoCodigo || porChave[0];
  }
  if (codigo && !base) return lista.filter(function (h) { return h.codigo === codigo; })[0] || null;
  return null;
}
