/**
 * Etapa 5 (parte A): criar casos e exercícios com IA, sem custo.
 * O app monta um "pedido" (texto) com as regras e o formato; o professor cola no claude.ai, copia a resposta e importa aqui.
 * A resposta vem num formato simplificado (mais fácil para a IA acertar), que é convertido para o formato dos jogos
 * com as mesmas funções dos casos do banco (CasosBase.gs / CasosAno.gs) e validado.
 * Casos completos entram como Rascunho (3 degraus). Exercícios curtos entram como pacote oculto e só vão para o
 * "Meu reforço" depois de "Liberar para o reforço" (situação "aberto").
 */

const PERSONAGENS_GERADOR = {
  ana: 'menina', bia: 'menina', mia: 'menina', lucy: 'menina', nina: 'mulher', rosa: 'mulher', lu: 'cientista (mulher)', nadia: 'editora (mulher)',
  leo: 'menino', ben: 'menino', sam: 'menino', pedro: 'menino', tom: 'homem de bigode', paulo: 'homem careca de bigode', marcos: 'homem',
  ravi: 'cientista (homem)', kai: 'chefe com boné', clock: 'capitão de bigode', max: 'treinador com boné',
};

const SAGAS_GERADOR = {
  '6º': 'Joinville Lost & Found Agency (Chief Kai): a agência encontra objetos perdidos e donos na cidade.',
  '7º': 'Time Detectives (Captain Clock): a máquina do tempo quebrou; os detetives investigam diários, linhas do tempo e biografias.',
  '8º': 'Future Lab 2050 (Dr. Lu e Dr. Ravi): mensagens e objetos chegam do futuro e precisam ser investigados.',
  '9º': 'Fact Checkers HQ (Editor Nadia): a redação checa posts virais e desmente fake news.',
};

/** Períodos do Mapa 2026 por série: mês do caso, nome, foco e habilidades (ids de Habilidades.gs). */
const PERIODOS_MAPA = {
  '6º': [
    ['03', 'Março', 'verb to be, subject pronouns e possessive adjectives (apresentações)', ['6-tobe', '6-pronomes', '6-possessivos']],
    ['04', 'Abril–Maio', 'countries and nationalities; verb to be em todas as formas', ['6-paises', '6-tobe']],
    ['05', 'Maio–Junho', "family e genitive 's", ['6-familia', '6-genitivo']],
    ['08', 'Julho–Setembro', 'present continuous', ['6-presentcont']],
    ['10', 'Setembro–Outubro', 'daily routine, dias e horas (simple present com I/you/we/they)', ['6-rotina']],
    ['11', 'Novembro–Dezembro', 'simple present na 3ª pessoa (he/she/it + -s)', ['6-present3']],
  ],
  '7º': [
    ['03', 'Março', 'inglês no mundo (língua franca, cognatos) e simple present', ['7-global', '7-present']],
    ['04', 'Abril–Maio', 'food, countable/uncountable, much/many e imperatives', ['7-comida']],
    ['06', 'Maio–Julho', 'past of verb to be (was/were), in/on/at e subject/object pronouns', ['7-pasttobe', '7-preposicoes', '7-pronomes']],
    ['08', 'Agosto–Setembro', 'simple past (verbos regulares)', ['7-past']],
    ['10', 'Setembro–Outubro', 'simple past regular e irregular; connectors (and, but, so, because, then)', ['7-past', '7-conectores']],
    ['11', 'Novembro–Dezembro', 'can / could (habilidades no presente e no passado)', ['7-can']],
  ],
  '8º': [
    ['03', 'Março', 'leitura inferencial e textos literários (narrativas, poemas, rimas)', ['8-inferencia']],
    ['04', 'Abril–Maio', 'comparatives and superlatives', ['8-comparativos']],
    ['06', 'Junho–Julho', "future with will / won't (previsões e promessas) e expressões de futuro", ['8-will', '8-futuro']],
    ['08', 'Agosto–Setembro', 'future with going to (planos) e will × going to', ['8-goingto', '8-futuro']],
    ['10', 'Setembro–Outubro', 'prefixes and suffixes (un-, re-, im-, -er, -ful, -less)', ['8-prefixos']],
    ['11', 'Novembro–Dezembro', 'relative pronouns (who, which, whose)', ['8-relativos']],
  ],
  '9º': [
    ['03', 'Março', 'expansão do inglês no mundo e linguagem digital (acrônimos, abreviações)', ['9-expansao', '9-digital']],
    ['04', 'Abril–Maio', 'fake news e modals (should, must, have to)', ['9-fato', '9-modais']],
    ['06', 'Maio–Julho', 'fato × opinião, argumentos, connectors e first conditional', ['9-fato', '9-argumentos', '9-conectores', '9-condicionais']],
    ['08', 'Agosto–Setembro', 'conditionals (first e second)', ['9-condicionais']],
    ['10', 'Outubro–Dezembro', 'present perfect com since/for, ever/never, already/yet', ['9-presentperfect', '9-advtempo']],
  ],
};
const HABILIDADES_SEMPRE = { '6º': ['6-oral', '6-leitura', '6-inferencia'], '7º': ['7-oral', '7-leitura'], '8º': ['8-oral', '8-leitura', '8-inferencia'], '9º': ['9-oral', '9-leitura'] };
const MESES_EN = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const TIPOS_CADEADO = ['figuras', 'ouvir', 'completar', 'perguntas', 'classificar', 'separar', 'associar', 'ordenar', 'quem', 'ouvir_pista', 'vf'];
const TIPOS_PISTA = ['texto', 'lista', 'post', 'chat', 'mensagem', 'audio', 'fichas'];

function habilidadePorId_(serie, id) {
  return (HABILIDADES[serie] || []).filter(function (h) { return h.id === id; })[0] || null;
}

function habilidadesDoPeriodo_(serie, indice) {
  const p = (PERIODOS_MAPA[serie] || [])[indice];
  if (!p) throw new Error('Escolha a série e o período do Mapa.');
  const ids = p[3].concat((HABILIDADES_SEMPRE[serie] || []).filter(function (k) { return p[3].indexOf(k) === -1; }));
  return { periodo: p, habilidades: ids.map(function (k) { return habilidadePorId_(serie, k); }).filter(Boolean) };
}

// ============================================================
// Opções e pedido
// ============================================================

function profGeradorOpcoes() {
  exigirProfessor_();
  const res = {};
  Object.keys(PERIODOS_MAPA).forEach(function (s) {
    res[s] = PERIODOS_MAPA[s].map(function (p, i) { return { indice: i, nome: p[1], foco: p[2] }; });
  });
  return { periodos: res };
}

/** Monta o texto do pedido. dados: { tipo: 'caso' | 'exercicios', serie, periodo, tema, observacoes, quantidade } */
function profMontarPedido(dados) {
  exigirProfessor_();
  return pedidoGerador_(dados);
}

function pedidoGerador_(dados) {
  const serie = String(dados.serie || '');
  if (!PERIODOS_MAPA[serie]) throw new Error('Escolha a série.');
  const info = habilidadesDoPeriodo_(serie, Number(dados.periodo));
  const tema = String(dados.tema || '').trim();
  const obs = String(dados.observacoes || '').trim();
  const mesPeriodo = Utilities.formatDate(new Date(), FUSO, 'yyyy') + '-' + info.periodo[0];
  const hab = info.habilidades.map(function (h) { return '- "' + h.id + '" = ' + h.nome + ' (' + h.codigo + ')'; }).join('\n');
  const L = [];
  L.push('Você vai criar material para um aplicativo de jogos de inglês de uma escola pública de Joinville (SC), em estilo história em quadrinhos investigativa.');
  L.push('Os alunos do ' + serie + ' ano têm POUCO conhecimento de inglês: use frases curtas, vocabulário simples e muito apoio visual (emojis).');
  L.push('');
  L.push('SÉRIE: ' + serie + ' ano');
  L.push('PERÍODO DO MAPA DE PROGRESSÃO: ' + info.periodo[1] + ' · foco: ' + info.periodo[2]);
  if (tema) L.push('TEMA ESCOLHIDO PELO PROFESSOR: ' + tema);
  if (obs) L.push('OBSERVAÇÕES DO PROFESSOR: ' + obs);
  L.push('');
  L.push('HABILIDADES (use o id no campo "habilidade" de cada cadeado ou exercício; priorize as primeiras, que são o foco do período):');
  L.push(hab);
  L.push('');
  L.push('REGRAS GERAIS');
  L.push('- Todo o conteúdo do jogo é em INGLÊS, exceto os campos "ajuda", "dicas" e "tarefa", que podem ter português.');
  L.push('- Comandos curtíssimos em inglês (até 6 palavras, começando pelo verbo): "Click the right word.", "Complete the sentence.".');
  L.push('- Cada resposta certa precisa ser única e sem ambiguidade. Os distratores devem ser plausíveis, mas claramente errados.');
  L.push('- Varie a posição da resposta certa (não deixe sempre a primeira).');
  L.push('- Nada de violência, marcas reais, pessoas reais ou temas sensíveis. Personagens e lugares fictícios (pode citar Joinville).');
  L.push('- Em "dicas" e "abertura", ==palavra== destaca uma palavra e [[word|tradução]] cria um glossário clicável.');
  L.push('- Responda SOMENTE com o JSON, dentro de um bloco ```json, sem comentários dentro do JSON.');
  L.push('');
  if (dados.tipo === 'exercicios') {
    const n = Math.min(Math.max(Number(dados.quantidade) || 10, 4), 18);
    L.push('TAREFA: crie ' + n + ' EXERCÍCIOS CURTOS de reforço (metade "leitura", metade "completar"), cobrindo as habilidades acima.');
    L.push('- "leitura": um texto de 1 a 3 frases + 1 pergunta com 3 opções; "certa" é o índice (0, 1 ou 2) da opção correta.');
    L.push('- "completar": uma frase com UMA lacuna ___ e 2 ou 3 opções; "certa" é o TEXTO exato da opção correta; "dica" em português, curta.');
    L.push('');
    L.push('FORMATO (siga exatamente; o conteúdo abaixo é só exemplo):');
    L.push('```json');
    L.push(JSON.stringify(exemploExercicios_(serie, info.habilidades), null, 1));
    L.push('```');
    return L.join('\n');
  }
  L.push('TAREFA: crie UM CASO investigativo completo, em 3 DEGRAUS de dificuldade sobre a mesma história (todos valem 100 pontos). Use "mes": "' + mesPeriodo + '".');
  L.push('Saga da série: ' + SAGAS_GERADOR[serie]);
  L.push('Personagens disponíveis (use só estes ids em "personagem"): ' + Object.keys(PERSONAGENS_GERADOR).map(function (k) { return k + ' (' + PERSONAGENS_GERADOR[k] + ')'; }).join(', ') + '.');
  L.push('');
  L.push('DEGRAU 1 (★, o mais simples): SEM pistas ("pistas": []). 3 cadeados, nesta ordem: "figuras" (emoji + 2 palavras), "ouvir" (frase falada + 2 opções), "completar" (2 frases, 2 opções cada).');
  L.push('DEGRAU 2 (★★): 3 pistas curtas (A: "texto", "lista", "post" ou "chat"; B: "mensagem"; C: "audio"). 3 cadeados: "perguntas" (2 perguntas sobre as pistas), um de "classificar"/"separar"/"associar"/"ordenar", e "completar" (2 ou 3 frases).');
  L.push('DEGRAU 3 (★★★): 3 pistas que precisam ser CRUZADAS (A: texto/lista/post; B: "fichas" ou "lista"; C: "audio"). 4 cadeados, nesta ordem: "quem" (descobrir quem/qual cruzando as pistas; só 1 opção combina com TODAS as pistas), "ouvir_pista" (2 perguntas sobre o áudio C), "completar" (3 frases), "vf" (4 frases verdadeiro/falso conferidas nas pistas).');
  L.push('- Cada cadeado tem: "tipo", "habilidade" (id da lista), "foco" (curto, em português ou inglês) e "dicas" (exatamente 2 dicas; a 2ª quase entrega a resposta).');
  L.push('- "abertura": 1 frase do chefe da saga apresentando o mistério. "final": frase para o aluno completar (sem nota): "inicio" (começo da frase em inglês), "tarefa" (em português), "exemplo" (frase completa) e "foco".');
  L.push('- Na pista "audio", a "fala" tem no máximo 2 frases curtas. Textos das pistas: no máximo 3 frases curtas.');
  L.push('');
  L.push('TIPOS DE CADEADO (campos):');
  L.push('- figuras: "itens": [{ "figura": "🐱", "opcoes": ["cat", "dog"], "certa": 0 }] (2 a 4 itens)');
  L.push('- ouvir: "itens": [{ "fala": "The cat is black.", "opcoes": ["🐈‍⬛", "🐶"], "certa": 0 }] (2 itens; opções podem ser emojis ou palavras)');
  L.push('- completar: "titulo", "ajuda" (português), "itens": [{ "figura": "🐱" (opcional), "frase": "The cat ___ black.", "opcoes": ["is", "are"], "certa": "is", "erros": { "are": "The cat = it → IS." } }]');
  L.push('- perguntas: "itens": [{ "pergunta": "Where is the cat?", "opcoes": ["in the park", "at school", "at home"], "certa": 0 }]');
  L.push('- classificar: "titulo", "comando", "ajuda", "categorias": ["TRUE", "FALSE"] (2 categorias), "itens": [{ "texto": "...", "categoria": 0 }] (4 itens)');
  L.push('- separar: "titulo", "comando", "ajuda", "categorias": [2 caixas], "itens": [{ "texto": "...", "categoria": 1 }] (6 itens)');
  L.push('- associar: "titulo", "comando", "ajuda", "pares": [{ "palavra": "unhappy", "significado": "not happy" }] (3 pares)');
  L.push('- ordenar: "titulo", "comando", "ajuda", "itens": ["1º passo", "2º passo", "3º passo", "4º passo"] (na ORDEM CERTA; o app embaralha)');
  L.push('- quem: "titulo", "comando", "ajuda", "opcoes": [{ "personagem": "sam", "texto": "SAM" }] ou [{ "emoji": "🤖", "texto": "R-2" }] ou ["texto"] (3 opções), "certa": índice, "porque_nao": { "1": "explicação curta" }, "solucao": "It was **Sam**!"');
  L.push('- ouvir_pista: "titulo", "itens": [{ "pergunta": "...", "opcoes": [3 opções], "certa": índice }] (2 perguntas sobre o áudio)');
  L.push('- vf: "itens": [{ "frase": "...", "verdadeiro": true }] (4 itens, 2 verdadeiros e 2 falsos)');
  L.push('');
  L.push('TIPOS DE PISTA (campos):');
  L.push('- texto: "aba", "titulo", "linhas": ["frase", "frase"]');
  L.push('- lista: "aba", "itens": [{ "emoji": "🤖", "texto": "R-1: 20 km/h" }]');
  L.push('- post: "aba", "perfil": "@NomeDoPerfil", "texto": "...", "selo": "5K SHARES" (opcional)');
  L.push('- chat: "aba", "mensagens": [{ "nome": "Mia", "texto": "..." }]');
  L.push('- mensagem: "personagem", "nome", "texto"');
  L.push('- audio: "personagem", "nome", "fala"');
  L.push('- fichas: "fichas": [{ "personagem": "sam", "nome": "SAM", "linhas": ["likes soccer", "was at home"] }] (3 fichas)');
  L.push('');
  L.push('FORMATO (siga exatamente a estrutura; o conteúdo abaixo é só um exemplo de outro tema):');
  L.push('```json');
  L.push(JSON.stringify(exemploCaso_(serie, info.habilidades, mesPeriodo), null, 1));
  L.push('```');
  return L.join('\n');
}

function exemploExercicios_(serie, habs) {
  const h1 = habs[0].id, hl = (habs.filter(function (h) { return /leitura/.test(h.id); })[0] || habs[0]).id;
  return { tipo: 'exercicios', serie: serie, tema: 'School trip', itens: [
    { tipo: 'leitura', texto: 'Ben is at the zoo with his class. He likes the monkeys.', pergunta: 'Where is Ben?', opcoes: ['at the zoo', 'at home', 'at the beach'], certa: 0, habilidade: hl, foco: 'localizar informação' },
    { tipo: 'completar', figura: '🚌', frase: 'The bus ___ at 8 o\'clock.', opcoes: ['leaves', 'leave'], certa: 'leaves', habilidade: h1, foco: 'exemplo', dica: 'the bus = it → verbo com -s' },
  ] };
}

function exemploCaso_(serie, habs, mes) {
  const h1 = habs[0].id;
  const oral = (habs.filter(function (h) { return /oral/.test(h.id); })[0] || habs[0]).id;
  const leit = (habs.filter(function (h) { return /leitura/.test(h.id); })[0] || habs[0]).id;
  return {
    tipo: 'caso', serie: serie, mes: mes || '2026-03', titulo: 'The Lost Dog', tema: 'pets',
    degraus: [
      { degrau: 1, abertura: 'Hi, detective! A [[dog|cachorro]] is lost. Let\'s help!', pistas: [], cadeados: [
        { tipo: 'figuras', habilidade: h1, foco: 'vocabulário', dicas: ['Look at the picture.', '🐶 = ==dog=='], itens: [{ figura: '🐶', opcoes: ['cat', 'dog'], certa: 1 }, { figura: '🦴', opcoes: ['bone', 'ball'], certa: 0 }] },
        { tipo: 'ouvir', habilidade: oral, foco: 'compreensão oral', dicas: ['Listen again.', '==park== = parque 🌳'], itens: [{ fala: 'The dog is in the park.', opcoes: ['🌳', '🏠'], certa: 0 }, { fala: 'The dog is brown.', opcoes: ['⚪', '🟤'], certa: 1 }] },
        { tipo: 'completar', titulo: 'Is or are?', habilidade: h1, foco: 'exemplo', ajuda: 'Escolha a palavra certa.', dicas: ['One dog → is.', 'Two dogs → are.'], itens: [
          { figura: '🐶', frase: 'The dog ___ happy.', opcoes: ['is', 'are'], certa: 'is', erros: { are: 'One dog → IS.' } },
          { frase: 'The dogs ___ in the park.', opcoes: ['are', 'is'], certa: 'are' }] },
      ], final: { inicio: 'My pet is ', tarefa: 'descrever um animal de estimação.', exemplo: 'My pet is a small brown dog.', foco: 'descrever' } },
      { degrau: 2, abertura: 'Hi, detective! Read the clues about the lost dog.', pistas: [
        { tipo: 'post', aba: 'Lost dog', perfil: '@JoinvillePets', texto: 'LOST: a brown dog. His name is Rex.', selo: '200 SHARES' },
        { tipo: 'mensagem', personagem: 'mia', nome: 'Mia', texto: 'I saw a brown dog near the school!' },
        { tipo: 'audio', personagem: 'ben', nome: 'Ben', fala: 'Rex likes the park. He plays there every day.' },
      ], cadeados: [
        { tipo: 'perguntas', habilidade: leit, foco: 'localizar informação', dicas: ['Read the post.', 'The post says: ==Rex=='], itens: [{ pergunta: "What is the dog's name?", opcoes: ['Max', 'Rex', 'Bob'], certa: 1 }, { pergunta: 'Where did Mia see the dog?', opcoes: ['near the school', 'at home', 'at the beach'], certa: 0 }] },
        { tipo: 'classificar', titulo: 'True or false?', comando: 'Click TRUE or FALSE.', ajuda: 'Confira nas pistas.', habilidade: leit, foco: 'cruzar informações', dicas: ['Read all the clues.', 'Rex is ==brown==.'], categorias: ['TRUE', 'FALSE'], itens: [
          { texto: 'Rex is brown.', categoria: 0 }, { texto: 'Rex is a cat.', categoria: 1 }, { texto: 'Rex likes the park.', categoria: 0 }, { texto: 'Mia lost her dog.', categoria: 1 }] },
        { tipo: 'completar', titulo: 'Complete', habilidade: h1, foco: 'exemplo', ajuda: 'Escolha a palavra certa.', dicas: ['Rex = he.', 'He → is.'], itens: [
          { frase: 'Rex ___ a brown dog.', opcoes: ['is', 'are', 'am'], certa: 'is' }, { frase: 'Mia and Ben ___ friends.', opcoes: ['are', 'is', 'am'], certa: 'are' }] },
      ], final: { inicio: 'The dog is ', tarefa: 'descrever onde o cachorro está.', exemplo: 'The dog is in the park.', foco: 'descrever' } },
      { degrau: 3, abertura: 'Hi, detective! Three dogs are at the shelter. Which one is Rex?', pistas: [
        { tipo: 'texto', aba: 'Poster', titulo: 'LOST DOG', linhas: ['Rex is brown and small.', 'He has a red collar.'] },
        { tipo: 'lista', aba: 'Shelter', itens: [{ emoji: '🐕', texto: 'Dog 1: brown, big, blue collar' }, { emoji: '🐕', texto: 'Dog 2: brown, small, red collar' }, { emoji: '🐩', texto: 'Dog 3: white, small, red collar' }] },
        { tipo: 'audio', personagem: 'ben', nome: 'Ben', fala: 'Rex is not big. His collar is red.' },
      ], cadeados: [
        { tipo: 'quem', titulo: 'Which dog is Rex?', comando: 'Click the dog.', ajuda: 'Clique no cachorro que combina com todas as pistas.', habilidade: leit, foco: 'cruzar informações', dicas: ['Brown + small + red collar.', 'Check clue B.'],
          opcoes: [{ emoji: '🐕', texto: 'DOG 1' }, { emoji: '🐕', texto: 'DOG 2' }, { emoji: '🐩', texto: 'DOG 3' }], certa: 1, porque_nao: { 0: 'Dog 1 is big.', 2: 'Dog 3 is white.' }, solucao: 'Rex is **Dog 2**!' },
        { tipo: 'ouvir_pista', titulo: "Ben's message", habilidade: oral, foco: 'compreensão oral', dicas: ['Listen to audio C.', 'Ben: "His collar is ==red=="'], itens: [{ pergunta: 'Is Rex big?', opcoes: ["No, he isn't.", 'Yes, he is.', 'Yes, very big.'], certa: 0 }, { pergunta: 'What color is the collar?', opcoes: ['red', 'blue', 'green'], certa: 0 }] },
        { tipo: 'completar', titulo: 'Describe Rex', habilidade: h1, foco: 'exemplo', ajuda: 'Escolha a palavra certa.', dicas: ['Rex = he.', 'Dogs = they.'], itens: [
          { frase: 'Rex ___ small.', opcoes: ['is', 'are', 'am'], certa: 'is' }, { frase: 'The dogs ___ at the shelter.', opcoes: ['are', 'is', 'am'], certa: 'are' }, { frase: "Rex ___ big.", opcoes: ["isn't", "aren't", "don't"], certa: "isn't" }] },
        { tipo: 'vf', habilidade: leit, foco: 'cruzar informações', dicas: ['Check all the clues.', 'Dog 3 is ==white==.'], itens: [{ frase: 'Rex has a red collar.', verdadeiro: true }, { frase: 'Rex is big.', verdadeiro: false }, { frase: 'Dog 3 is white.', verdadeiro: true }, { frase: 'Dog 1 is Rex.', verdadeiro: false }] },
      ], final: { inicio: 'My favourite animal is ', tarefa: 'descrever seu animal favorito.', exemplo: 'My favourite animal is a small white cat.', foco: 'descrever' } },
    ],
  };
}

// ============================================================
// Conversão do formato simplificado → formato dos jogos
// ============================================================

/** Pega o JSON da resposta do claude.ai (aceita o bloco ```json e texto em volta). */
function extrairJson_(texto) {
  const s = String(texto || '');
  const candidatos = (s.match(/```[a-zA-Z]*\s*[\s\S]*?```/g) || []).map(function (b) { return b.replace(/^```[a-zA-Z]*\s*/, '').replace(/```$/, ''); });
  candidatos.push(s);
  const limpar = function (x) { return x.replace(/,(\s*[}\]])/g, '$1'); };
  let temChave = false;
  for (let c = 0; c < candidatos.length; c++) {
    const t = candidatos[c];
    const i = t.indexOf('{');
    if (i === -1) continue;
    temChave = true;
    // Do último "}" para trás: ignora comentários com chaves depois do JSON.
    let f = t.lastIndexOf('}'), tentativas = 0;
    while (f > i && tentativas < 60) {
      try {
        const obj = JSON.parse(limpar(t.slice(i, f + 1)));
        if (obj && typeof obj === 'object' && (obj.degraus || obj.itens || obj.tipo)) return obj;
        break;
      } catch (e) { /* tenta o "}" anterior */ }
      f = t.lastIndexOf('}', f - 1);
      tentativas++;
    }
  }
  if (!temChave) throw new Error('Não encontrei um JSON na resposta. Copie a resposta inteira do Claude (o bloco que começa com { ).');
  throw new Error('O JSON da resposta está incompleto (cortado) ou com erro de digitação. Peça ao Claude: "envie o JSON completo de novo, dentro de um bloco ```json".');
}

function carimbo_() { return Date.now().toString(36).slice(-5); }

function slug_(s) {
  return semAcento_(s).replace(/[^a-z0-9]+/g, '').slice(0, 10) || 'caso';
}

function texto_(v) { return String(v == null ? '' : v).trim(); }

/** "6", "6º ano", "6o" → "6º". */
function serieDe_(v) {
  const m = texto_(v).match(/[6-9]/);
  return m ? m[0] + 'º' : texto_(v);
}

/** "Ouvir pista", "ouvir-pista", "Completar" → "ouvir_pista", "completar"; aceita alguns apelidos. */
function tipoDe_(v) {
  const t = semAcento_(v).trim().replace(/[\s-]+/g, '_');
  const apelidos = { verdadeiro_falso: 'vf', true_false: 'vf', v_f: 'vf', ouvirpista: 'ouvir_pista', ouvir_audio: 'ouvir_pista', pergunta: 'perguntas', figura: 'figuras', lacuna: 'completar' };
  return apelidos[t] || t;
}

/** true/false também como texto ("true", "verdadeiro", "falso"…). null se não der para saber. */
function boolDe_(v) {
  if (typeof v === 'boolean') return v;
  const t = semAcento_(v).trim();
  if (['true', 'verdadeiro', 'v', 't', 'sim', 'yes'].indexOf(t) !== -1) return true;
  if (['false', 'falso', 'f', 'nao', 'no'].indexOf(t) !== -1) return false;
  return null;
}

/** Resposta em "completar": o texto da opção (ou o índice, se a IA mandar número). */
function certaTexto_(certa, opcoes) {
  const t = texto_(certa);
  const igual = opcoes.filter(function (x) { return normalizar_(x) === normalizar_(t); })[0];
  if (igual) return igual;
  if (/^\d+$/.test(t) && Number(t) < opcoes.length) return opcoes[Number(t)];
  return null;
}

/** Etiqueta da habilidade: código do Mapa + foco que o catálogo reconhece como aquela habilidade. */
function etiquetaGerada_(serie, habId, foco, onde) {
  const v = texto_(habId);
  const lista = HABILIDADES[serie] || [];
  const h = habilidadePorId_(serie, v) ||
    lista.filter(function (x) { return x.codigo.toLowerCase() === v.toLowerCase(); })[0] ||
    lista.filter(function (x) { return semAcento_(x.nome) === semAcento_(v); })[0];
  if (!h) throw new Error(onde + ': "habilidade" deve ser um dos ids do pedido (ex.: ' + lista.slice(0, 2).map(function (x) { return x.id; }).join(', ') + '). Veio "' + v + '".');
  let f = texto_(foco) || h.nome;
  const achada = habilidadeDe_(serie, f, h.codigo);
  if (!achada || achada.id !== h.id) f = f + ' · ' + h.chaves[0];
  return { codigo: h.codigo, foco: f };
}

function exigir_(cond, onde, msg) { if (!cond) throw new Error(onde + ': ' + msg); }

function opcoesValidas_(o, min, max, onde) {
  exigir_(Array.isArray(o) && o.length >= min && o.length <= max && o.every(function (x) { return texto_(typeof x === 'object' ? x.texto : x); }),
    onde, '"opcoes" precisa ter de ' + min + ' a ' + max + ' itens.');
  const vistos = {};
  o.forEach(function (x) { const k = normalizar_(typeof x === 'object' ? x.texto + (x.emoji || '') : x); exigir_(!vistos[k], onde, 'há opções repetidas ("' + (typeof x === 'object' ? x.texto : x) + '").'); vistos[k] = true; });
}

function indiceValido_(v, n, onde, opcoes, campo) {
  if (opcoes && texto_(v) !== '' && isNaN(Number(v))) {
    const k = opcoes.map(function (x) { return normalizar_(typeof x === 'object' ? x.texto : x); }).indexOf(normalizar_(v));
    if (k !== -1) return k;
  }
  exigir_(texto_(v) !== '' && Number.isInteger(Number(v)) && Number(v) >= 0 && Number(v) < n, onde,
    '"' + (campo || 'certa') + '" deve ser o número da opção correta (0 a ' + (n - 1) + ').');
  return Number(v);
}

function dicasGeradas_(d) {
  const lista = (Array.isArray(d) ? d : (texto_(d) ? [d] : [])).map(texto_).filter(String).slice(0, 3);
  while (lista.length < 2) lista.push(lista.length ? 'Read the clue again, slowly.' : 'Read the sentence again.');
  return lista;
}

/** Embaralha as opções de forma fixa (a resposta certa não fica sempre na mesma posição). */
function misturarOpcoes_(opcoes, certa, semente) {
  const perm = misturar_(opcoes.length, semente);
  return { opcoes: perm.map(function (j) { return opcoes[j]; }), certa: perm.indexOf(certa) };
}

function pistaGerada_(e, id, onde) {
  const tipo = tipoDe_(e && e.tipo);
  exigir_(TIPOS_PISTA.indexOf(tipo) !== -1, onde, 'tipo de pista desconhecido "' + tipo + '" (use ' + TIPOS_PISTA.join(', ') + ').');
  const aba = function (padrao) { return id + ' · ' + (texto_(e.aba) || padrao); };
  const pers = function (p) { const k = texto_(p).toLowerCase(); return PERSONAGENS_GERADOR[k] ? k : 'max'; };
  if (tipo === 'texto') {
    exigir_(Array.isArray(e.linhas) && e.linhas.length, onde, '(texto) precisa de "linhas".');
    return bCaderno_(id, aba('Note'), texto_(e.titulo) || 'Note', e.linhas.map(texto_));
  }
  if (tipo === 'lista') {
    exigir_(Array.isArray(e.itens) && e.itens.length >= 2, onde, '(lista) precisa de pelo menos 2 "itens".');
    return { id: id, aba: aba('List'), blocos: [{ tipo: 'itens', itens: e.itens.map(function (it) { return [texto_(it.emoji) || '•', texto_(it.texto)]; }) }] };
  }
  if (tipo === 'post') {
    exigir_(texto_(e.texto), onde, '(post) precisa de "texto".');
    const perfil = texto_(e.perfil) || '@post';
    const bloco = { tipo: 'post', texto: texto_(e.texto) };
    if (texto_(e.selo)) bloco.selo = texto_(e.selo);
    return { id: id, aba: aba('Post'), moldura: 'celular', blocos: [{ tipo: 'perfil', avatar: { letra: perfil.replace(/[^A-Za-z]/g, '').charAt(0).toUpperCase() || 'P', cor: 'pop' }, nome: perfil, meta: 'post' }, bloco] };
  }
  if (tipo === 'chat') {
    exigir_(Array.isArray(e.mensagens) && e.mensagens.length, onde, '(chat) precisa de "mensagens".');
    return { id: id, aba: aba('Chat'), moldura: 'celular', blocos: e.mensagens.map(function (m) { return { tipo: 'post', meta: texto_(m.nome), texto: texto_(m.texto) }; }) };
  }
  if (tipo === 'mensagem') {
    exigir_(texto_(e.texto), onde, '(mensagem) precisa de "texto".');
    return { id: id, aba: aba('Message'), moldura: 'celular', blocos: [{ tipo: 'perfil', personagem: pers(e.personagem), nome: texto_(e.nome) || 'Message', meta: 'message' }, { tipo: 'post', texto: texto_(e.texto) }] };
  }
  if (tipo === 'audio') {
    exigir_(texto_(e.fala), onde, '(audio) precisa de "fala".');
    return { id: id, aba: aba('Audio'), moldura: 'celular', blocos: [{ tipo: 'audio', personagem: pers(e.personagem), nome: texto_(e.nome) || 'Audio', meta: 'voice message', velocidade: 0.85, fala: texto_(e.fala) }] };
  }
  exigir_(Array.isArray(e.fichas) && e.fichas.length >= 2, onde, '(fichas) precisa de pelo menos 2 "fichas".');
  return { id: id, aba: aba('People'), blocos: [{ tipo: 'fichas', fichas: e.fichas.map(function (f) { return { personagem: pers(f.personagem), nome: texto_(f.nome), linhas: (f.linhas || []).map(texto_) }; }) }] };
}

/** Converte um cadeado do formato simplificado. audioId = id da pista de áudio (para "ouvir_pista"). */
function cadeadoGerado_(serie, t, onde, audioId, temAudio) {
  const tipo = tipoDe_(t && t.tipo);
  exigir_(TIPOS_CADEADO.indexOf(tipo) !== -1, onde, 'tipo de cadeado desconhecido "' + tipo + '" (use ' + TIPOS_CADEADO.join(', ') + ').');
  const etiqueta = etiquetaGerada_(serie, t.habilidade, t.foco, onde);
  const dicas = dicasGeradas_(t.dicas);
  const foco = etiqueta.foco;
  const itens = Array.isArray(t.itens) ? t.itens : [];
  const semente = JSON.stringify(t).slice(0, 200);
  let trava;

  if (tipo === 'figuras' || tipo === 'ouvir') {
    exigir_(itens.length >= 2 && itens.length <= 4, onde, '"itens" precisa ter de 2 a 4 itens.');
    const lista = itens.map(function (it, k) {
      const o = (it.opcoes || []).map(texto_);
      opcoesValidas_(o, 2, 3, onde + ', item ' + (k + 1));
      const m = misturarOpcoes_(o, indiceValido_(it.certa, o.length, onde + ', item ' + (k + 1), o), semente + k);
      if (tipo === 'figuras') { exigir_(texto_(it.figura), onde, 'cada item precisa de "figura" (emoji).'); return [texto_(it.figura), m.opcoes, m.certa]; }
      exigir_(texto_(it.fala), onde, 'cada item precisa de "fala".');
      const soEmoji = m.opcoes.every(function (x) { return !/[A-Za-z0-9]/.test(x); });
      return [texto_(it.fala), m.opcoes, m.certa, soEmoji ? 'figuras' : 'pilulas'];
    });
    trava = tipo === 'figuras' ? bFiguras_(lista, dicas, foco) : bOuvir_(lista, dicas, foco);
  } else if (tipo === 'completar') {
    exigir_(itens.length >= 1 && itens.length <= 4, onde, '"itens" precisa ter de 1 a 4 frases.');
    const lista = itens.map(function (it, k) {
      const ok = onde + ', frase ' + (k + 1);
      const frase = texto_(it.frase).replace(/_{3,}/g, '___');
      exigir_((frase.match(/___/g) || []).length === 1, ok, 'a frase precisa ter exatamente UMA lacuna ___.');
      const o = (it.opcoes || []).map(texto_);
      opcoesValidas_(o, 2, 3, ok);
      const certa = certaTexto_(it.certa, o);
      exigir_(certa, ok, '"certa" ("' + texto_(it.certa) + '") precisa ser igual a uma das opções.');
      const fb = {};
      Object.keys(it.erros || {}).forEach(function (k2) { if (o.indexOf(k2) !== -1 && k2 !== certa) fb[k2] = texto_(it.erros[k2]); });
      return [texto_(it.figura), frase, o, [o.filter(function (x) { return normalizar_(x) === normalizar_(certa); })[0]], Object.keys(fb).length ? fb : null];
    });
    trava = bBlocos_(texto_(t.titulo) || 'Complete', texto_(t.comando) || (lista.length > 1 ? 'Complete the sentences.' : 'Complete the sentence.'),
      texto_(t.ajuda) || 'Toque no bloco certo para completar a frase.', lista, dicas, foco);
  } else if (tipo === 'perguntas' || tipo === 'ouvir_pista') {
    exigir_(itens.length >= 1 && itens.length <= 3, onde, '"itens" precisa ter de 1 a 3 perguntas.');
    if (tipo === 'ouvir_pista') exigir_(audioId, onde, '"ouvir_pista" precisa de uma pista do tipo "audio" no mesmo degrau.');
    const partes = itens.map(function (q, k) {
      const o = (q.opcoes || []).map(texto_);
      opcoesValidas_(o, 2, 4, onde + ', pergunta ' + (k + 1));
      exigir_(texto_(q.pergunta), onde, 'cada item precisa de "pergunta".');
      return escolhaMisturada_({ tipo: 'escolha', pergunta: texto_(q.pergunta), opcoes: o, resposta: indiceValido_(q.certa, o.length, onde + ', pergunta ' + (k + 1), o) });
    });
    const solucao = partes.map(function (q) { return q.pergunta + ' **' + q.opcoes[q.resposta] + '**'; }).join(' · ');
    trava = tipo === 'perguntas'
      ? { titulo: texto_(t.titulo) || 'Read and listen', tipo: 'Evidence', onomatopeia: 'YES!',
          passos: [['👀', 'Read the clues.', 'Leia as pistas.']].concat(temAudio ? [['🎧', 'Listen to the audio.', 'Ouça o áudio.']] : []).concat([['👆', 'Choose the answers.', 'Escolha as respostas.']]),
          dicas: dicas, partes: partes, solucao: solucao }
      : { titulo: texto_(t.titulo) || 'Listen to the audio', tipo: 'Listening', onomatopeia: 'YES!',
          passos: [['🎧', 'Listen to audio ' + audioId + '.', 'Ouça o áudio (pista ' + audioId + '). Pode repetir ou abrir o texto.'], ['👆', 'Answer the questions.', 'Responda às perguntas.']],
          dicas: dicas, partes: [{ tipo: 'audio', evidencia: audioId }].concat(partes), solucao: solucao };
  } else if (tipo === 'classificar' || tipo === 'separar') {
    const cats = (t.categorias || []).map(texto_);
    exigir_(cats.length === 2 && cats[0] && cats[1], onde, '"categorias" precisa ter 2 nomes.');
    exigir_(itens.length >= 4 && itens.length <= 8, onde, '"itens" precisa ter de 4 a 8 itens.');
    const its = itens.map(function (it, k) { exigir_(texto_(it.texto), onde, 'cada item precisa de "texto".'); return { texto: texto_(it.texto), resposta: indiceValido_(it.categoria, 2, onde + ', item ' + (k + 1), cats, 'categoria') }; });
    exigir_(its.some(function (x) { return x.resposta === 0; }) && its.some(function (x) { return x.resposta === 1; }), onde, 'use as duas categorias.');
    const parte = tipo === 'classificar' ? { tipo: 'classificar', categorias: cats, itens: its } : { tipo: 'separar', caixas: cats, itens: its };
    trava = { titulo: texto_(t.titulo) || (tipo === 'classificar' ? 'Sort the clues' : 'Sort'), tipo: tipo === 'classificar' ? 'Evidence' : 'Sort', onomatopeia: tipo === 'classificar' ? 'CLICK!' : 'POW!',
      passos: [[tipo === 'classificar' ? '👆' : '✋', texto_(t.comando) || (tipo === 'classificar' ? 'Click the right box.' : 'Drag the words to the boxes.'), texto_(t.ajuda) || 'Coloque cada item na categoria certa.']],
      dicas: dicas, partes: [parte],
      solucao: cats.map(function (c, i) { return '**' + c + '**: ' + its.filter(function (x) { return x.resposta === i; }).map(function (x) { return x.texto; }).join(', '); }).join(' · ') };
  } else if (tipo === 'associar') {
    const pares = Array.isArray(t.pares) ? t.pares : [];
    exigir_(pares.length >= 2 && pares.length <= 4 && pares.every(function (p) { return texto_(p.palavra) && texto_(p.significado); }), onde, '"pares" precisa de 2 a 4 itens com "palavra" e "significado".');
    const perm = misturar_(pares.length, semente);
    const blocos = perm.map(function (j) { return texto_(pares[j].significado); });
    trava = { titulo: texto_(t.titulo) || 'Match', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['🧩', texto_(t.comando) || 'Match the words.', texto_(t.ajuda) || 'Coloque cada significado embaixo da palavra certa.']],
      dicas: dicas, partes: [{ tipo: 'associar', alvos: pares.map(function (p, i) { return { texto: texto_(p.palavra), resposta: perm.indexOf(i) }; }), blocos: blocos }],
      solucao: pares.map(function (p) { return '**' + texto_(p.palavra) + '** = ' + texto_(p.significado); }).join(' · ') };
  } else if (tipo === 'ordenar') {
    exigir_(itens.length >= 3 && itens.length <= 6, onde, '"itens" precisa ter de 3 a 6 frases, na ordem certa.');
    let perm = misturar_(itens.length, semente);
    if (perm.every(function (v, i) { return v === i; })) perm = perm.slice(1).concat(perm[0]);
    trava = { titulo: texto_(t.titulo) || 'Put in order', tipo: 'Order', onomatopeia: 'POW!',
      passos: [['✋', texto_(t.comando) || 'Put the sentences in order.', texto_(t.ajuda) || 'Coloque as frases em ordem.']],
      dicas: dicas, partes: [{ tipo: 'ordenar', itens: itens.map(texto_), embaralhar: perm }], solucao: itens.map(texto_).join(' → ') };
  } else if (tipo === 'quem') {
    const o = Array.isArray(t.opcoes) ? t.opcoes : [];
    exigir_(o.length >= 2 && o.length <= 4, onde, '"opcoes" precisa ter de 2 a 4 opções.');
    let estilo = 'lista';
    const opcoes = o.map(function (x) {
      if (typeof x !== 'object') return texto_(x);
      const k = texto_(x.personagem).toLowerCase();
      if (k && PERSONAGENS_GERADOR[k]) { estilo = 'pessoas'; return { personagem: k, texto: texto_(x.texto) || k.toUpperCase() }; }
      if (texto_(x.emoji)) { estilo = 'figuras'; return { emoji: texto_(x.emoji), texto: texto_(x.texto) }; }
      return texto_(x.texto);
    });
    if (estilo !== 'lista') opcoes.forEach(function (x, i) { if (typeof x !== 'object') opcoes[i] = { emoji: '❓', texto: x }; });
    opcoesValidas_(opcoes, 2, 4, onde);
    const certa = indiceValido_(t.certa, opcoes.length, onde, opcoes);
    const fb = {};
    Object.keys(t.porque_nao || {}).forEach(function (k) { if (Number(k) !== certa && Number(k) < opcoes.length) fb[k] = texto_(t.porque_nao[k]); });
    const nome = typeof opcoes[certa] === 'object' ? opcoes[certa].texto : opcoes[certa];
    trava = bQuem_(texto_(t.titulo) || 'Who is it?', texto_(t.comando) || 'Click the answer.', texto_(t.ajuda) || 'Clique na opção que combina com todas as pistas.',
      opcoes, certa, fb, dicas, texto_(t.solucao) || '**' + nome + '**', estilo);
  } else {
    exigir_(itens.length >= 3 && itens.length <= 6, onde, '"itens" precisa ter de 3 a 6 frases.');
    const vf = itens.map(function (it) { const b = boolDe_(it.verdadeiro); exigir_(texto_(it.frase) && b !== null, onde, 'cada item precisa de "frase" e "verdadeiro" (true ou false).'); return [texto_(it.frase), b]; });
    exigir_(vf.some(function (x) { return x[1]; }) && vf.some(function (x) { return !x[1]; }), onde, 'use frases verdadeiras e falsas.');
    trava = bVF_(vf, dicas, foco);
  }
  trava.etiquetas = [etiqueta];
  return trava;
}

/** Converte um caso completo (3 degraus). Devolve a lista de casos no formato dos jogos. */
function casoGerado_(d, carimbo) {
  const serie = serieDe_(d.serie);
  exigir_(PERIODOS_MAPA[serie], 'Caso', '"serie" deve ser 6º, 7º, 8º ou 9º.');
  const titulo = texto_(d.titulo);
  exigir_(titulo, 'Caso', 'falta o "titulo".');
  const mes = texto_(d.mes) || Utilities.formatDate(new Date(), FUSO, 'yyyy-MM');
  exigir_(/^\d{4}-\d{2}$/.test(mes), 'Caso', '"mes" deve estar no formato AAAA-MM.');
  const degraus = Array.isArray(d.degraus) ? d.degraus : [];
  exigir_(degraus.length === 3 && [1, 2, 3].every(function (n) { return degraus.filter(function (g) { return Number(g.degrau) === n; }).length === 1; }),
    'Caso', 'precisa ter os 3 degraus (1, 2 e 3), um de cada.');
  const sufixo = 'ia' + slug_(titulo) + carimbo;
  const numero = 'IA·' + MESES_EN[Number(mes.slice(5, 7)) - 1];
  return [1, 2, 3].map(function (n) {
    const g = degraus.filter(function (x) { return Number(x.degrau) === n; })[0];
    const onde = 'Degrau ' + '★'.repeat(n);
    exigir_(texto_(g.abertura), onde, 'falta a "abertura".');
    const pistas = Array.isArray(g.pistas) ? g.pistas : [];
    if (n === 1) exigir_(!pistas.length, onde, 'o degrau ★ não tem pistas ("pistas": []).');
    else exigir_(pistas.length >= 2 && pistas.length <= 4, onde, 'precisa de 2 a 4 pistas.');
    const ids = 'ABCD';
    const ev = pistas.map(function (e, i) { return pistaGerada_(e, ids[i], onde + ', pista ' + ids[i]); });
    const iAudio = pistas.map(function (e) { return tipoDe_(e && e.tipo); }).indexOf('audio');
    const cads = Array.isArray(g.cadeados) ? g.cadeados : [];
    exigir_(cads.length >= 2 && cads.length <= 6, onde, 'precisa de 2 a 6 cadeados.');
    const travas = cads.map(function (t, i) { return cadeadoGerado_(serie, t, onde + ', cadeado ' + (i + 1) + ' (' + texto_(t && t.tipo) + ')', iAudio === -1 ? '' : ids[iAudio], iAudio !== -1); });
    const f = g.final || {};
    exigir_(texto_(f.inicio) && texto_(f.tarefa) && texto_(f.exemplo), onde, '"final" precisa de "inicio", "tarefa" e "exemplo".');
    const caso = aCaso_(serie, sufixo, mes, numero, titulo, n, texto_(g.abertura), ev, travas,
      travas.map(function (t) { return t.etiquetas[0].codigo; }), [texto_(f.inicio).replace(/\s*$/, ' '), texto_(f.tarefa), texto_(f.exemplo), texto_(f.foco) || titulo]);
    caso.gerado = true;
    caso.tema = texto_(d.tema);
    return validarCaso_(caso, n);
  });
}

/** Converte um pacote de exercícios curtos (ocultos; vão para o "Meu reforço" depois de liberados). */
function exerciciosGerados_(d, carimbo) {
  const serie = serieDe_(d.serie);
  exigir_(PERIODOS_MAPA[serie], 'Exercícios', '"serie" deve ser 6º, 7º, 8º ou 9º.');
  const itens = Array.isArray(d.itens) ? d.itens : [];
  exigir_(itens.length >= 2 && itens.length <= 24, 'Exercícios', '"itens" precisa ter de 2 a 24 exercícios.');
  const leitura = [], blocos = [];
  itens.forEach(function (it, k) {
    const onde = 'Exercício ' + (k + 1) + ' (' + texto_(it && it.tipo) + ')';
    const et = etiquetaGerada_(serie, it.habilidade, it.foco, onde);
    const o = (it.opcoes || []).map(texto_);
    const tipoEx = tipoDe_(it && it.tipo);
    if (tipoEx === 'leitura') {
      exigir_(texto_(it.texto) && texto_(it.pergunta), onde, 'precisa de "texto" e "pergunta".');
      opcoesValidas_(o, 2, 4, onde);
      leitura.push({ texto: texto_(it.texto), pergunta: texto_(it.pergunta), opcoes: o, resposta: indiceValido_(it.certa, o.length, onde, o), codigo: et.codigo, foco: et.foco });
    } else if (tipoEx === 'completar') {
      const frase = texto_(it.frase).replace(/_{3,}/g, '___');
      exigir_((frase.match(/___/g) || []).length === 1, onde, 'a frase precisa ter exatamente UMA lacuna ___.');
      opcoesValidas_(o, 2, 3, onde);
      const certa = certaTexto_(it.certa, o);
      exigir_(certa, onde, '"certa" ("' + texto_(it.certa) + '") precisa ser igual a uma das opções.');
      blocos.push({ figura: texto_(it.figura), frase: frase, blocos: o, resposta: certa, codigo: et.codigo, foco: et.foco, dica: texto_(it.dica) || 'Leia a frase inteira.' });
    } else {
      throw new Error(onde + ': "tipo" deve ser "leitura" ou "completar".');
    }
  });
  const tema = texto_(d.tema) || 'practice';
  const mes = Utilities.formatDate(new Date(), FUSO, 'yyyy-MM');
  const casos = (leitura.length ? avulsosLeitura_(serie, leitura) : []).concat(blocos.length ? avulsosBlocos_(serie, blocos) : []);
  return casos.map(function (c, i) {
    c.id = 'g' + serie.charAt(0) + '-ex-' + carimbo + '-' + (i + 1);
    c.titulo = 'AI practice · ' + tema + ' (' + (i + 1) + ')';
    c.numero = 'IA' + (i + 1);
    c.mes = mes;
    c.gerado = true;
    c.pacote = carimbo;
    c.tema = tema;
    return validarCaso_(c, i + 1);
  });
}

// ============================================================
// Importação e pacotes
// ============================================================

/** Importa a resposta do claude.ai (caso completo ou exercícios). */
function profImportarGerado(texto) {
  exigirProfessor_();
  const d = extrairJson_(texto);
  const carimbo = carimbo_();
  const tipo = texto_(d.tipo) || (Array.isArray(d.degraus) ? 'caso' : (Array.isArray(d.itens) ? 'exercicios' : ''));
  if (tipo !== 'caso' && tipo !== 'exercicios') throw new Error('O JSON precisa ter "tipo": "caso" ou "exercicios".');
  const casos = tipo === 'caso' ? casoGerado_(d, carimbo) : exerciciosGerados_(d, carimbo);
  salvarCasos_(casos);
  return {
    tipo: tipo, titulo: tipo === 'caso' ? casos[0].titulo : casos[0].tema, serie: casos[0].serie, pacote: tipo === 'exercicios' ? carimbo : '',
    versoes: casos.map(function (c) { return { id: c.id, degrau: Number(c.degrau) || 0, titulo: c.titulo, travas: c.travas.length }; }),
    cadeados: casos.reduce(function (s, c) { return s + c.travas.length; }, 0),
  };
}

/** Pacotes de exercícios gerados (ocultos), com a situação: liberado ou não. */
function profListarGerados() {
  exigirProfessor_();
  const pac = {};
  lerCasos_().filter(function (c) { return c.dados.gerado && ehAvulso_(c); }).forEach(function (c) {
    const k = c.dados.pacote || c.id;
    const p = pac[k] = pac[k] || { pacote: k, serie: c.serie, tema: c.dados.tema || '', criado_em: c.criado_em, liberado: true, casos: [], cadeados: 0 };
    p.casos.push({ id: c.id, titulo: c.titulo, travas: (c.dados.travas || []).length });
    p.cadeados += (c.dados.travas || []).length;
    if (c.status !== 'aberto') p.liberado = false;
  });
  return Object.keys(pac).map(function (k) { return pac[k]; }).sort(function (a, b) { return chaveData_(b.criado_em).localeCompare(chaveData_(a.criado_em)); });
}

function casosDoPacote_(pacote) {
  const lista = lerCasos_().filter(function (c) { return c.dados.gerado && ehAvulso_(c) && (c.dados.pacote || c.id) === String(pacote); });
  if (!lista.length) throw new Error('Pacote não encontrado. Recarregue a página.');
  return lista;
}

/** Libera (ou recolhe) um pacote de exercícios para o "Meu reforço". */
function profLiberarPacote(pacote, liberar) {
  exigirProfessor_();
  comTrava_(function () {
    const col = CABECALHOS.Casos.indexOf('status') + 1;
    casosDoPacote_(pacote).forEach(function (c) { garantirAba_('Casos').getRange(c._linha, col).setValue(liberar ? 'aberto' : 'rascunho'); });
  });
  return profListarGerados();
}

function profExcluirPacote(pacote) {
  exigirProfessor_();
  comTrava_(function () {
    casosDoPacote_(pacote).map(function (c) { return c._linha; }).sort(function (a, b) { return b - a; })
      .forEach(function (l) { garantirAba_('Casos').deleteRow(l); });
  });
  return profListarGerados();
}
