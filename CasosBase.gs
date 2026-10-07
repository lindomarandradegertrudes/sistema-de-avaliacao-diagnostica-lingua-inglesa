/**
 * Trilha Base (reposição de aprendizagem), comum ao 6º–9º ano. Não vale nota.
 * Cada missão existe em 3 degraus (★ Iniciante, ★★ Básico/Intermediário, ★★★ Avançado).
 * Comandos em inglês, bem curtos; a ajuda em português fica no 3º item de cada passo.
 */

const CASOS_BASE = [
  // ---------------------------------------------------------------- Missão 0: tutorial guiado
  {
    id: 'b0-tutorial', serie: 'todas', saga: 'base', trilha: 'base', missao: 'tutorial', ordem: 0, tema: 'How to play', mes: '2026-10', numero: '#00', titulo: 'How to Play', semNota: true,
    abertura: { personagem: 'max', nome: 'COACH MAX', texto: 'Welcome, [[trainee|aprendiz]]! Let\'s learn the game.' },
    evidencias: [
      { id: 'A', aba: 'A · Clue', blocos: [
        { tipo: 'itens', itens: [['🐶', 'This is Rex. Rex is a [[dog|cachorro]].']] },
      ] },
    ],
    travas: [
      { titulo: 'Find Rex', tipo: 'Click', onomatopeia: 'YES!',
        passos: [['👆', 'Click the dog.', 'Clique no cachorro.']],
        dicas: ['Rex is a dog: 🐶'],
        partes: [{ tipo: 'escolha', estilo: 'figuras', opcoes: [{ emoji: '🐱', texto: 'cat' }, { emoji: '🐶', texto: 'dog' }], resposta: 1, feedback: { 0: 'This is a cat. Rex is a dog!' } }],
        solucao: 'Rex is a **dog**! 🐶',
        etiquetas: [{ codigo: 'BASE', foco: 'tutorial' }] },
      { titulo: 'Build the sentence', tipo: 'Blocks', onomatopeia: 'CLICK!',
        passos: [['🧩', 'Complete the sentence.', 'Toque no bloco certo para completar a frase.']],
        dicas: ['One dog → ==is==.'],
        partes: [{ tipo: 'montar', figura: '🐶', frase: 'Rex ___ a dog.', blocos: ['are', 'is'], resposta: [['is']], feedback: { are: 'One dog → IS.' } }],
        solucao: 'Rex **is** a dog.',
        etiquetas: [{ codigo: 'BASE', foco: 'tutorial' }] },
    ],
    tutorial: [
      { alvo: '#abertura', texto: 'Oi! Este é o **Coach Max**. Ele conta a missão no balão. Vamos aprender a jogar?', botao: 'Vamos!' },
      { alvo: '#tabs', texto: 'Aqui ficam as **PISTAS** (evidence). Clique na pista **A** para ler.', esperar: '[data-tab]' },
      { alvo: '#evidence .g', texto: 'Palavras sublinhadas têm tradução. Toque em **dog**.', esperar: '.g' },
      { alvo: '#passos', texto: 'Este é o **COMANDO**, em inglês. Se não entender, toque em **? Ajuda em português**.', esperar: '[data-ajuda]' },
      { alvo: '#partes', texto: 'Agora faça o que o comando pede: **clique no cachorro**.', esperar: '.choice' },
      { alvo: '#conferir', texto: 'Clique em **CHECK!** para tentar abrir o cadeado.', esperar: '#conferir' },
      { alvo: '#proximo', texto: 'Cadeado aberto! 🎉 Clique em **NEXT LOCK**.', esperar: '#proximo',
        alt: { alvo: '#partes', texto: 'Ops! Escolha outra figura e clique em **CHECK!** de novo.' } },
      { alvo: '#partes', texto: 'Toque no **bloco** certo para colocar na frase. Para tirar, toque no espaço.', esperar: '.tile' },
      { alvo: '#dica', texto: 'Ficou em dúvida? **HINT** dá uma dica. Nas missões, cada dica custa 5 pontos.', botao: 'Entendi' },
      { alvo: '#conferir', texto: 'Agora clique em **CHECK!**', esperar: '#conferir' },
      { alvo: '#proximo', texto: 'Muito bem! Clique para **fechar o caso**.', esperar: '#proximo',
        alt: { alvo: '#partes', texto: 'Quase! Toque no espaço para tirar o bloco, escolha o outro e clique em **CHECK!**' } },
      { alvo: '#desk', texto: 'Pronto, agente! Você já sabe jogar. 🕵️ Agora é com você!', botao: 'Fechar' },
    ],
    final: null,
  },

  // ---------------------------------------------------------------- Família 1 · degrau 1 (Iniciante)
  {
    id: 'b1-familia-d1', serie: 'todas', saga: 'base', trilha: 'base', missao: 'familia-1', ordem: 1, tema: 'Family & people', degrau: 1, mes: '2026-10', numero: '#01', titulo: 'The Family Photo', semNota: true,
    abertura: { personagem: 'max', nome: 'COACH MAX', texto: 'Hi, agent! Ben has a [[family photo|foto da família]]. Help him!' },
    evidencias: [],
    travas: [
      { titulo: 'Who is who?', tipo: 'Pictures', onomatopeia: 'YES!',
        passos: [['👆', 'Click the right word.', 'Para cada figura, clique na palavra certa.']],
        dicas: ['👩 = mãe = ==mother== · 👨 = pai = ==father==', '👧 = irmã = ==sister== · 👦 = irmão = ==brother=='],
        partes: [
          { tipo: 'escolha', figura: '👩', estilo: 'pilulas', opcoes: ['mother', 'father'], resposta: 0 },
          { tipo: 'escolha', figura: '👨', estilo: 'pilulas', opcoes: ['sister', 'father'], resposta: 1 },
          { tipo: 'escolha', figura: '👧', estilo: 'pilulas', opcoes: ['sister', 'brother'], resposta: 0 },
          { tipo: 'escolha', figura: '👦', estilo: 'pilulas', opcoes: ['mother', 'brother'], resposta: 1 },
        ],
        solucao: '👩 mother · 👨 father · 👧 sister · 👦 brother',
        etiquetas: [{ codigo: 'BASE-F', foco: 'vocabulário: família' }] },
      { titulo: 'Listen and click', tipo: 'Listening', onomatopeia: 'BOOM!',
        passos: [['🎧', 'Listen.', 'Ouça o áudio. Pode repetir quantas vezes quiser.'], ['👆', 'Click the picture.', 'Clique na figura que você ouviu.']],
        dicas: ['==sister== = 👧 · ==father== = 👨', 'Toque em 📄 TEXT para ler o que ele disse.'],
        partes: [
          { tipo: 'audio', fala: 'This is my sister.', velocidade: 0.8 },
          { tipo: 'escolha', estilo: 'figuras', opcoes: [{ emoji: '👦' }, { emoji: '👧' }], resposta: 1 },
          { tipo: 'audio', fala: 'This is my father.', velocidade: 0.8 },
          { tipo: 'escolha', estilo: 'figuras', opcoes: [{ emoji: '👨' }, { emoji: '👩' }], resposta: 0 },
        ],
        solucao: '"This is my **sister**." 👧 · "This is my **father**." 👨',
        etiquetas: [{ codigo: 'BASE-F', foco: 'compreensão oral: família' }] },
      { titulo: 'Is or are?', tipo: 'Blocks', onomatopeia: 'POW!',
        passos: [['🧩', 'Complete with IS or ARE.', 'Complete com IS (uma pessoa) ou ARE (duas ou mais pessoas).']],
        dicas: ['==is== = 1 pessoa (she, he) · ==are== = 2 ou mais (they)', 'She → **is** · They → **are**'],
        partes: [
          { tipo: 'montar', figura: '👩', frase: 'She ___ my mother.', blocos: ['is', 'are'], resposta: [['is']], feedback: { are: 'She = 1 person → IS.' } },
          { tipo: 'montar', figura: '👦👦', frase: 'They ___ my brothers.', blocos: ['is', 'are'], resposta: [['are']], feedback: { is: 'They = 2 people → ARE.' } },
        ],
        solucao: 'She **is** my mother. They **are** my brothers.',
        etiquetas: [{ codigo: 'BASE-F', foco: 'verbo to be (is/are)' }] },
    ],
    final: { titulo: 'Your family', personagem: 'max', inicio: 'This is my ',
      tarefa: 'apresentar uma pessoa da família em inglês (This is my…).', foco: 'família + to be',
      passos: [['✍️', 'Write about your family.', 'Escreva quem é uma pessoa da sua família. Não vale pontos, só recebe comentário.'], ['💡', 'Start: This is my…', 'Comece com "This is my…" (Esta é minha…). Ex.: This is my mother, Ana.']] },
  },

  // ---------------------------------------------------------------- Família 1 · degrau 2 (Básico/Intermediário)
  {
    id: 'b1-familia-d2', serie: 'todas', saga: 'base', trilha: 'base', missao: 'familia-1', ordem: 1, tema: 'Family & people', degrau: 2, mes: '2026-10', numero: '#01', titulo: 'The Family Photo', semNota: true,
    abertura: { personagem: 'max', nome: 'COACH MAX', texto: 'Hi, agent! Ben has a [[family photo|foto da família]]. Read the clues. Help him!' },
    evidencias: [
      { id: 'A', aba: 'A · Photo', blocos: [
        { tipo: 'meta', texto: "Ben's family photo" },
        { tipo: 'fichas', fichas: [
          { personagem: 'tom', nome: 'TOM', linhas: [] }, { personagem: 'rosa', nome: 'ROSA', linhas: [] },
          { personagem: 'lucy', nome: 'LUCY', linhas: [] }, { personagem: 'ben', nome: 'BEN', linhas: [] }] },
      ] },
      { id: 'B', aba: "B · Ben's message", moldura: 'celular', blocos: [
        { tipo: 'perfil', personagem: 'ben', nome: 'Ben', meta: 'message' },
        { tipo: 'post', texto: "Hi! I'm Ben. I'm 12. This is my family. My [[father|pai]] is Tom. My [[mother|mãe]] is Rosa. Lucy is my [[sister|irmã]]." },
      ] },
      { id: 'C', aba: 'C · Audio', moldura: 'celular', blocos: [
        { tipo: 'audio', personagem: 'lucy', nome: 'Lucy', meta: 'voice message · 0:05', velocidade: 0.8,
          fala: "Hi! I'm Lucy. I'm nine. My [[brother|irmão]] is Ben." },
      ] },
    ],
    travas: [
      { titulo: 'Read and listen', tipo: 'Evidence', onomatopeia: 'YES!',
        passos: [['👀', 'Read message B.', 'Leia a mensagem do Ben (pista B).'], ['🎧', 'Listen to audio C.', 'Ouça o áudio da Lucy (pista C).'], ['👆', 'Choose the answers.', 'Escolha as respostas.']],
        dicas: ['Ben says: "My ==mother== is Rosa."', 'Lucy says: "I\'m ==nine==." nine = 9'],
        partes: [
          { tipo: 'escolha', pergunta: 'Who is Rosa?', opcoes: ["Ben's mother", "Ben's sister", "Ben's friend"], resposta: 0 },
          { tipo: 'escolha', pergunta: 'How old is Lucy?', opcoes: ['9', '12', '40'], resposta: 0, feedback: { 1: 'Ben is 12. Listen to Lucy!' } },
        ],
        solucao: "Rosa is **Ben's mother**. Lucy is **9**.",
        etiquetas: [{ codigo: 'BASE-F', foco: 'localizar informação' }, { codigo: 'BASE-F', foco: 'compreensão oral: idade' }] },
      { titulo: 'Am, is or are?', tipo: 'Blocks', onomatopeia: 'BOOM!',
        passos: [['🧩', 'Complete the sentences.', 'Complete com AM (I), IS (he/she/um nome) ou ARE (they/dois nomes).']],
        dicas: ['I → ==am== · he/she → ==is== · they → ==are==', 'Tom and Rosa = they → **are**'],
        partes: [
          { tipo: 'montar', frase: 'I ___ Ben.', blocos: ['am', 'is', 'are'], resposta: [['am']], feedback: { is: 'With I → AM.', are: 'With I → AM.' } },
          { tipo: 'montar', frase: 'Lucy ___ nine.', blocos: ['am', 'is', 'are'], resposta: [['is']], feedback: { am: 'Lucy = she → IS.', are: 'Lucy = she → IS.' } },
          { tipo: 'montar', frase: 'Tom and Rosa ___ my parents.', blocos: ['am', 'is', 'are'], resposta: [['are']], feedback: { am: 'Tom and Rosa = they → ARE.', is: 'Tom and Rosa = they → ARE.' } },
        ],
        solucao: 'I **am** Ben. Lucy **is** nine. Tom and Rosa **are** my parents.',
        etiquetas: [{ codigo: 'BASE-F', foco: 'verbo to be (am/is/are)' }] },
      { titulo: 'His or her?', tipo: 'Blocks', onomatopeia: 'POW!',
        passos: [['🧩', 'Choose HIS or HER.', 'Escolha HIS (dele, de um menino) ou HER (dela, de uma menina).']],
        dicas: ['==his== = dele (boy) · ==her== = dela (girl)', 'Lucy is a girl → **her** brother.'],
        partes: [
          { tipo: 'montar', figura: '👧', frase: 'This is Lucy. ___ brother is Ben.', blocos: ['Her', 'His', 'My'], resposta: [['Her']], feedback: { his: 'Lucy is a girl → HER.', my: 'We are talking about Lucy → HER.' } },
          { tipo: 'montar', figura: '👦', frase: 'This is Ben. ___ sister is Lucy.', blocos: ['Her', 'His', 'Your'], resposta: [['His']], feedback: { her: 'Ben is a boy → HIS.', your: 'We are talking about Ben → HIS.' } },
        ],
        solucao: '**Her** brother is Ben. **His** sister is Lucy.',
        etiquetas: [{ codigo: 'BASE-F', foco: 'possessivos (his/her)' }] },
    ],
    final: { titulo: 'Your family', personagem: 'max', inicio: 'My ',
      tarefa: 'escrever uma frase sobre alguém da família com nome e idade.', foco: 'família + to be',
      passos: [['✍️', 'Write about your family.', 'Escreva uma frase sobre alguém da sua família. Não vale pontos, só recebe comentário.'], ['💡', 'Start: My sister is…', 'Ex.: My sister is Ana. She is 10.']] },
  },

  // ---------------------------------------------------------------- Família 1 · degrau 3 (Avançado)
  {
    id: 'b1-familia-d3', serie: 'todas', saga: 'base', trilha: 'base', missao: 'familia-1', ordem: 1, tema: 'Family & people', degrau: 3, mes: '2026-10', numero: '#01', titulo: 'The Family Photo', semNota: true,
    abertura: { personagem: 'max', nome: 'COACH MAX', texto: 'Hi, agent! We [[found|encontramos]] a family photo. Whose photo is it? Check the clues!' },
    evidencias: [
      { id: 'A', aba: 'A · Photo', blocos: [
        { tipo: 'meta', texto: 'Found in the school library' },
        { tipo: 'itens', itens: [['👨', 'a man with [[glasses|óculos]]'], ['👩', 'a woman'], ['👧🐶', 'a girl with a dog'], ['👦', 'a boy']] },
      ] },
      { id: 'B', aba: 'B · Students', blocos: [
        { tipo: 'fichas', fichas: [
          { personagem: 'ben', nome: 'BEN', linhas: ['I have one sister.', 'We have a dog, Max.'] },
          { personagem: 'sam', nome: 'SAM', linhas: ['I have two brothers.', "I don't have a [[pet|animal de estimação]]."] },
          { personagem: 'mia', nome: 'MIA', linhas: ['I have a brother.', "My father doesn't have glasses."] }] },
      ] },
      { id: 'C', aba: 'C · Audio', moldura: 'celular', blocos: [
        { tipo: 'audio', personagem: 'rosa', nome: "Rosa · Ben's mother", meta: 'voice message · 0:09', velocidade: 0.85,
          fala: "Hello! I'm Rosa, Ben's mother. I think the photo is ours! My [[husband|marido]], Tom, has glasses. My [[daughter|filha]], Lucy, loves our dog." },
      ] },
    ],
    travas: [
      { titulo: 'Whose photo?', tipo: 'Evidence', onomatopeia: 'GOTCHA!',
        passos: [['🔎', 'Compare A and B.', 'Compare a foto (A) com as fichas dos alunos (B).'], ['👆', 'Click the owner.', 'Clique no dono da foto.']],
        dicas: ['The photo has ==one girl==, ==one boy== and ==a dog==.', 'Sam has no pet. Mia\'s father has no glasses.'],
        partes: [{ tipo: 'escolha', estilo: 'pessoas', opcoes: [{ personagem: 'ben', texto: 'BEN' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'mia', texto: 'MIA' }], resposta: 0,
          feedback: { 1: 'Sam has two brothers and no pet. Look at the photo again.', 2: "Mia's father doesn't have glasses. The man in the photo has glasses." } }],
        solucao: "It's **Ben's** photo: one sister and a dog!",
        etiquetas: [{ codigo: 'BASE-F', foco: 'cruzar informações' }] },
      { titulo: "Rosa's message", tipo: 'Listening', onomatopeia: 'YES!',
        passos: [['🎧', 'Listen to audio C.', 'Ouça o áudio da Rosa (pista C).'], ['👆', 'Answer the questions.', 'Responda às duas perguntas.']],
        dicas: ['Listen for ==glasses== and ==dog==.', 'Rosa says: "Tom has glasses. Lucy loves our dog."'],
        partes: [
          { tipo: 'audio', evidencia: 'C' },
          { tipo: 'escolha', pergunta: 'Who has glasses?', opcoes: ['Tom', 'Lucy', 'Ben'], resposta: 0 },
          { tipo: 'escolha', pergunta: 'Who loves the dog?', opcoes: ['Rosa', 'Lucy', 'Tom'], resposta: 1 },
        ],
        solucao: '**Tom** has glasses. **Lucy** loves the dog.',
        etiquetas: [{ codigo: 'BASE-F', foco: 'compreensão oral: família' }] },
      { titulo: 'His, her or their?', tipo: 'Blocks', onomatopeia: 'POW!',
        passos: [['🧩', 'Complete the sentences.', 'Complete com HIS (dele), HER (dela) ou THEIR (deles).']],
        dicas: ['==his== = dele · ==her== = dela · ==their== = deles', 'Tom and Rosa = they → **their** children.'],
        partes: [
          { tipo: 'montar', frase: 'Ben loves ___ sister.', blocos: ['his', 'her', 'their'], resposta: [['his']], feedback: { her: 'Ben is a boy → HIS.', their: 'Ben is one boy → HIS.' } },
          { tipo: 'montar', frase: 'Lucy loves ___ dog.', blocos: ['his', 'her', 'their'], resposta: [['her']], feedback: { his: 'Lucy is a girl → HER.', their: 'Lucy is one girl → HER.' } },
          { tipo: 'montar', frase: 'Tom and Rosa love ___ children.', blocos: ['his', 'her', 'their'], resposta: [['their']], feedback: { his: 'Tom and Rosa = they → THEIR.', her: 'Tom and Rosa = they → THEIR.' } },
        ],
        solucao: 'Ben loves **his** sister. Lucy loves **her** dog. Tom and Rosa love **their** children.',
        etiquetas: [{ codigo: 'BASE-F', foco: 'possessivos (his/her/their)' }] },
      { titulo: 'True or false?', tipo: 'Escape lock', onomatopeia: 'BOOM!',
        passos: [['👀', 'Read the sentences.', 'Leia as frases sobre a família do Ben.'], ['👆', 'Click TRUE or FALSE.', 'Clique em TRUE (verdadeiro) ou FALSE (falso).']],
        dicas: ['Check all the clues: A, B and C.', "Max is a ==dog==. Lucy is Ben's ==sister==."],
        partes: [{ tipo: 'classificar', categorias: ['TRUE', 'FALSE'], itens: [
          { texto: "Rosa is Ben's mother.", resposta: 0 },
          { texto: "Lucy is Ben's brother.", resposta: 1 },
          { texto: "Tom and Rosa are Lucy's parents.", resposta: 0 },
          { texto: 'Max is a cat.', resposta: 1 }] }],
        solucao: "Lucy is Ben's **sister**, and Max is a **dog**. The other sentences are true.",
        etiquetas: [{ codigo: 'BASE-F', foco: 'verbo to be + família' }] },
    ],
    final: { titulo: "Ben's family", personagem: 'max', inicio: "Ben's family ",
      tarefa: 'escrever uma frase sobre a família do Ben usando his/her/their.', foco: 'possessivos + to be',
      passos: [['✍️', "Write about Ben's family.", 'Escreva uma frase sobre a família do Ben. Não vale pontos, só recebe comentário.'], ['💡', 'Use his, her or their.', 'Ex.: Lucy loves her dog.']] },
  },
].concat(missoesBase2_());

// ============================================================
// Missões 2 a 8 da Trilha Base. Montadas com funções auxiliares para manter
// o mesmo formato nos 3 degraus: ★ figuras + 2 opções (sem abas), ★★ pistas simples + 3 opções, ★★★ pistas cruzadas.
// ============================================================

/** Permutação fixa de 0..n-1 a partir de um texto (a mesma ordem toda vez que o caso é carregado). */
function misturar_(n, semente) {
  let h = 2166136261;
  String(semente).split('').forEach(function (ch) { h = Math.imul(h ^ ch.charCodeAt(0), 16777619) >>> 0; });
  const p = [];
  for (let i = 0; i < n; i++) p.push(i);
  for (let i = n - 1; i > 0; i--) {
    h = (Math.imul(h, 1103515245) + 12345) >>> 0;
    const j = h % (i + 1);
    const t = p[i]; p[i] = p[j]; p[j] = t;
  }
  return p;
}

/** Embaralha as opções de uma parte "escolha" (a certa não fica sempre em primeiro), ajustando resposta e feedback. */
function escolhaMisturada_(p) {
  const perm = misturar_(p.opcoes.length, (p.pergunta || '') + JSON.stringify(p.opcoes));
  const novo = Object.assign({}, p, { opcoes: perm.map(function (j) { return p.opcoes[j]; }), resposta: perm.indexOf(p.resposta) });
  if (p.feedback) {
    novo.feedback = {};
    Object.keys(p.feedback).forEach(function (k) { novo.feedback[perm.indexOf(Number(k))] = p.feedback[k]; });
  }
  return novo;
}

function negritoNaLacuna_(frase, palavras) {
  let i = 0;
  return frase.replace(/___/g, function () { return '**' + palavras[i++] + '**'; });
}

/** ★ Cadeado 1: figura grande + 2 palavras. itens: [figura, [opção1, opção2], índice certo] */
function bFiguras_(itens, dicas, foco) {
  return {
    titulo: 'Picture words', tipo: 'Pictures', onomatopeia: 'YES!',
    passos: [['👆', 'Click the right word.', 'Para cada figura, clique na palavra certa.']],
    dicas: dicas,
    partes: itens.map(function (it) { return { tipo: 'escolha', figura: it[0], estilo: 'pilulas', opcoes: it[1], resposta: it[2] }; }),
    solucao: itens.map(function (it) { return it[0] + ' ' + it[1][it[2]]; }).join(' · '),
    etiquetas: [{ codigo: 'BASE', foco: foco }],
  };
}

/** ★ Cadeado 2: ouvir e clicar. itens: [fala, [opções], índice certo, estilo ('figuras' para emoji, 'pilulas' para texto)] */
function bOuvir_(itens, dicas, foco) {
  const partes = [];
  itens.forEach(function (it) {
    partes.push({ tipo: 'audio', fala: it[0], velocidade: 0.8 });
    partes.push({ tipo: 'escolha', estilo: it[3] || 'figuras', opcoes: it[1].map(function (o) { return it[3] === 'pilulas' ? o : { emoji: o }; }), resposta: it[2] });
  });
  return {
    titulo: 'Listen and click', tipo: 'Listening', onomatopeia: 'BOOM!',
    passos: [['🎧', 'Listen.', 'Ouça o áudio. Pode repetir quantas vezes quiser.'], ['👆', 'Click the answer.', 'Clique na resposta que combina com o que você ouviu.']],
    dicas: dicas,
    partes: partes,
    solucao: itens.map(function (it) { return '"' + it[0] + '" ' + it[1][it[2]]; }).join(' · '),
    etiquetas: [{ codigo: 'BASE', foco: foco }],
  };
}

/** Cadeado de blocos (gramática). itens: [figura ou '', frase com ___, blocos, [palavras certas], feedback] */
function bBlocos_(titulo, comando, ajuda, itens, dicas, foco, onomatopeia) {
  return {
    titulo: titulo, tipo: 'Blocks', onomatopeia: onomatopeia || 'POW!',
    passos: [['🧩', comando, ajuda]],
    dicas: dicas,
    partes: itens.map(function (it) {
      const ordem = misturar_(it[2].length, it[1] + it[2].join('|'));
      const p = { tipo: 'montar', frase: it[1], blocos: ordem.map(function (j) { return it[2][j]; }), resposta: [it[3]] };
      if (it[0]) p.figura = it[0];
      if (it[4]) p.feedback = it[4];
      return p;
    }),
    solucao: itens.map(function (it) { return negritoNaLacuna_(it[1], it[3]); }).join(' '),
    etiquetas: [{ codigo: 'BASE', foco: foco }],
  };
}

/** ★★ Cadeado 1: ler a mensagem e ouvir o áudio. perguntas: [pergunta, [opções], índice certo, feedback] */
function bLerOuvir_(perguntas, dicas, foco) {
  return {
    titulo: 'Read and listen', tipo: 'Evidence', onomatopeia: 'YES!',
    passos: [['👀', 'Read message B.', 'Leia a mensagem (pista B).'], ['🎧', 'Listen to audio C.', 'Ouça o áudio (pista C).'], ['👆', 'Choose the answers.', 'Escolha as respostas.']],
    dicas: dicas,
    partes: perguntas.map(function (q) { const p = { tipo: 'escolha', pergunta: q[0], opcoes: q[1], resposta: q[2] }; if (q[3]) p.feedback = q[3]; return escolhaMisturada_(p); }),
    solucao: perguntas.map(function (q) { return q[0] + ' **' + q[1][q[2]] + '**'; }).join(' · '),
    etiquetas: [{ codigo: 'BASE', foco: foco }],
  };
}

/** ★★★ Cadeado 1: cruzar as pistas e escolher a pessoa (ou o lugar). */
function bQuem_(titulo, comando, ajuda, opcoes, resposta, feedback, dicas, solucao, estilo) {
  return {
    titulo: titulo, tipo: 'Evidence', onomatopeia: 'GOTCHA!',
    passos: [['🔎', 'Compare the clues.', 'Compare as pistas A e B.'], ['👆', comando, ajuda]],
    dicas: dicas,
    partes: [escolhaMisturada_({ tipo: 'escolha', estilo: estilo || 'pessoas', pergunta: '', opcoes: opcoes, resposta: resposta, feedback: feedback })],
    solucao: solucao,
    etiquetas: [{ codigo: 'BASE', foco: 'cruzar informações' }],
  };
}

/** ★★★ Cadeado 2: ouvir a pista C e responder. */
function bOuvirPista_(titulo, perguntas, dicas, foco) {
  return {
    titulo: titulo, tipo: 'Listening', onomatopeia: 'YES!',
    passos: [['🎧', 'Listen to audio C.', 'Ouça o áudio (pista C). Pode repetir ou abrir o texto.'], ['👆', 'Answer the questions.', 'Responda às perguntas.']],
    dicas: dicas,
    partes: [{ tipo: 'audio', evidencia: 'C' }].concat(perguntas.map(function (q) { return escolhaMisturada_({ tipo: 'escolha', pergunta: q[0], opcoes: q[1], resposta: q[2] }); })),
    solucao: perguntas.map(function (q) { return q[0] + ' **' + q[1][q[2]] + '**'; }).join(' · '),
    etiquetas: [{ codigo: 'BASE', foco: foco }],
  };
}

/** ★★★ Último cadeado: verdadeiro ou falso. itens: [frase, true/false] */
function bVF_(itens, dicas, foco) {
  return {
    titulo: 'True or false?', tipo: 'Escape lock', onomatopeia: 'BOOM!',
    passos: [['👀', 'Read the sentences.', 'Leia as frases.'], ['👆', 'Click TRUE or FALSE.', 'Clique em TRUE (verdadeiro) ou FALSE (falso). Confira nas pistas.']],
    dicas: dicas,
    partes: [{ tipo: 'classificar', categorias: ['TRUE', 'FALSE'], itens: itens.map(function (it) { return { texto: it[0], resposta: it[1] ? 0 : 1 }; }) }],
    solucao: 'FALSE: ' + itens.filter(function (it) { return !it[1]; }).map(function (it) { return '"' + it[0] + '"'; }).join(' · '),
    etiquetas: [{ codigo: 'BASE', foco: foco }],
  };
}

/** Monta um caso da trilha. */
function bCaso_(m, degrau, abertura, evidencias, travas, finalInicio, finalTarefa, finalExemplo) {
  return {
    id: 'b' + m.ordem + '-' + m.missao + '-d' + degrau, serie: 'todas', saga: 'base', trilha: 'base', missao: m.missao, ordem: m.ordem, tema: m.tema,
    degrau: degrau, mes: '2026-10', numero: '#0' + m.ordem, titulo: m.titulo, semNota: true,
    abertura: { personagem: 'max', nome: 'COACH MAX', texto: abertura },
    evidencias: evidencias,
    travas: travas,
    final: { titulo: 'Your turn!', personagem: 'max', inicio: finalInicio, tarefa: finalTarefa, foco: m.tema,
      passos: [['✍️', 'Write a sentence.', 'Escreva uma frase em inglês sobre você. Não vale pontos, só recebe comentário.'], ['💡', 'Start: ' + finalInicio.trim() + '…', 'Exemplo: ' + finalExemplo]] },
  };
}

function bMsg_(personagem, nome, texto) {
  return { id: 'B', aba: 'B · Message', moldura: 'celular', blocos: [{ tipo: 'perfil', personagem: personagem, nome: nome, meta: 'message' }, { tipo: 'post', texto: texto }] };
}
function bAudio_(personagem, nome, fala) {
  return { id: 'C', aba: 'C · Audio', moldura: 'celular', blocos: [{ tipo: 'audio', personagem: personagem, nome: nome, meta: 'voice message', velocidade: 0.85, fala: fala }] };
}
function bFichas_(fichas) {
  return { id: 'B', aba: 'B · People', blocos: [{ tipo: 'fichas', fichas: fichas.map(function (f) { return { personagem: f[0], nome: f[1], linhas: f[2] }; }) }] };
}

function missoesBase2_() {
  const casos = [];
  const NAO = "isn't", NAOS = "aren't";

  // ------------------------------------------------ 2 · Meet the Neighbours (descrever pessoas, to be negativo, has/have)
  let m = { missao: 'vizinhos', ordem: 2, tema: 'Family & people', titulo: 'Meet the Neighbours' };
  casos.push(bCaso_(m, 1, 'Hi, agent! Ben has new [[neighbours|vizinhos]]. Let\'s meet them!', [], [
    bFiguras_([['🧓', ['old', 'young'], 0], ['👶', ['old', 'young'], 1], ['😀', ['happy', 'sad'], 0], ['😢', ['happy', 'sad'], 1]],
      ['==old== = velho · ==young== = jovem', '==happy== = feliz · ==sad== = triste'], 'vocabulário: descrever pessoas'),
    bOuvir_([['She is happy.', ['😢', '😀'], 1], ['He is old.', ['🧓', '👶'], 0]],
      ['==happy== = 😀 · ==old== = 🧓', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: descrever pessoas'),
    bBlocos_('Is or isn\'t?', 'Complete with IS or ISN\'T.', 'Complete com IS (é/está) ou ISN\'T (não é/não está).', [
      ['😀', 'Ben ___ sad. He is happy.', ['is', NAO], [NAO], { is: 'Ben is happy, so he ISN\'T sad.' }],
      ['🧓', 'Grandpa ___ old.', ['is', NAO], ['is'], { "isn't": 'Look at the picture: Grandpa IS old.' }],
    ], ['==isn\'t== = is not = não é', 'Ben is happy → he ==isn\'t== sad.'], 'verbo to be (is/isn\'t)'),
  ], 'My friend is ', 'descrever um amigo (My friend is…).', 'My friend is happy.'));

  const vizEv = [
    { id: 'A', aba: 'A · Neighbours', blocos: [{ tipo: 'fichas', fichas: [
      { personagem: 'sam', nome: 'SAM', linhas: ['13 years old', '[[tall|alto]]'] },
      { personagem: 'mia', nome: 'MIA', linhas: ['11 years old', '[[short|baixa]]', '[[long hair|cabelo comprido]]'] },
      { personagem: 'paulo', nome: 'MR. PAULO', linhas: ['70 years old'] }] }] },
    bMsg_('ben', 'Ben', 'My new [[neighbours|vizinhos]] are great! Sam is tall. He isn\'t short. Mia has long hair. Mr. Paulo is old, but he is very happy.'),
    bAudio_('mia', 'Mia', "Hi! I'm Mia. I'm eleven. I have a cat. Its name is Luna."),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! Ben has new [[neighbours|vizinhos]]. Read the clues and meet them!', vizEv, [
    bLerOuvir_([['Who is tall?', ['Sam', 'Mia', 'Mr. Paulo'], 0], ["What is Mia's cat's name?", ['Luna', 'Max', 'Rex'], 0]],
      ['Ben says: "Sam is ==tall==."', 'Mia says: "Its name is ==Luna==."'], 'localizar informação'),
    bBlocos_('Is, isn\'t or aren\'t?', 'Complete the sentences.', 'Complete com is, isn\'t ou aren\'t.', [
      ['', 'Sam ___ tall.', ['is', NAO, 'are'], ['is']],
      ['', 'Sam ___ short.', ['is', NAO, NAOS], [NAO], { is: 'Sam is tall, so he ISN\'T short.' }],
      ['', 'Mia and Sam ___ old.', [NAO, NAOS, 'is'], [NAOS], { "isn't": 'Mia and Sam = they → AREN\'T.' }],
    ], ['he/she → ==isn\'t== · they → ==aren\'t==', 'Mia and Sam are young → they ==aren\'t== old.'], 'verbo to be (negativo)'),
    bBlocos_('Has or have?', 'Choose HAS or HAVE.', 'Escolha HAS (he/she) ou HAVE (I/you/we/they).', [
      ['👧', 'Mia ___ long hair.', ['has', 'have', 'is'], ['has'], { have: 'Mia = she → HAS.' }],
      ['🐶', 'I ___ a dog.', ['have', 'has', 'am'], ['have'], { has: 'With I → HAVE.' }],
    ], ['I/you/we/they → ==have== · he/she → ==has==', 'Mia = she → ==has=='], 'have/has'),
  ], 'My neighbour ', 'descrever um vizinho ou amigo.', 'My neighbour is old. He has a dog.'));

  const vizEv3 = [
    { id: 'A', aba: 'A · Note', moldura: 'caderno', blocos: [{ tipo: 'meta', texto: 'A note on Ben\'s door' },
      { tipo: 'texto', texto: "Hi! I'm your new neighbour. I'm short and I have long hair. I have a cat." }] },
    bFichas_([['lucy', 'LUCY', ['short', 'long hair', 'has a dog']], ['mia', 'MIA', ['short', 'long hair', 'has a cat']], ['sam', 'SAM', ['tall', 'short hair', 'has a cat']]]),
    bAudio_('paulo', 'Mr. Paulo', "Hello! I'm Mr. Paulo. I saw the girl with the note. She has a cat, and she isn't tall."),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! Someone left a [[note|bilhete]] for Ben. Who wrote it?', vizEv3, [
    bQuem_('Who wrote the note?', 'Click the person.', 'Clique em quem escreveu o bilhete.',
      [{ personagem: 'lucy', texto: 'LUCY' }, { personagem: 'mia', texto: 'MIA' }, { personagem: 'sam', texto: 'SAM' }], 1,
      { 0: 'Lucy has a dog, not a cat.', 2: 'Sam is tall and has short hair.' },
      ['The note says: ==short==, ==long hair==, ==a cat==.', 'Lucy has a dog. Sam is tall.'], 'It\'s **Mia**: short, long hair and a cat!'),
    bOuvirPista_("Mr. Paulo's message", [['What does the girl have?', ['a cat', 'a dog', 'a bike'], 0], ['Is the girl tall?', ["No, she isn't.", 'Yes, she is.', "No, he isn't."], 0]],
      ['Listen for ==cat== and ==tall==.', 'Paulo says: "She has a cat, and she ==isn\'t== tall."'], 'compreensão oral: descrever pessoas'),
    bBlocos_('Is, isn\'t or have?', 'Complete the sentences.', 'Complete as frases com a palavra certa.', [
      ['', 'Mia ___ short.', ['is', NAO, 'are'], ['is']],
      ['', 'Sam ___ short. He is tall.', [NAO, 'is', NAOS], [NAO], { is: 'Sam is tall → he ISN\'T short.' }],
      ['', 'Lucy and Mia ___ long hair.', ['have', 'has', 'is'], ['have'], { has: 'Lucy and Mia = they → HAVE.' }],
    ], ['he/she → ==is / isn\'t / has== · they → ==are / aren\'t / have==', 'Lucy and Mia = they → ==have=='], 'to be + have/has'),
    bVF_([['Mia has a cat.', true], ['Sam is short.', false], ['Lucy has a dog.', true], ['Mia and Lucy are tall.', false]],
      ['Check clue B.', 'Sam is ==tall==. Mia and Lucy are ==short==.'], 'to be + have/has'),
  ], 'My neighbour ', 'descrever um vizinho ou amigo usando is/isn\'t e has.', "My neighbour is tall. She has a cat."));

  // ------------------------------------------------ 3 · Ben's Day (rotina, horas)
  m = { missao: 'dia-do-ben', ordem: 3, tema: 'Routine & time', titulo: "Ben's Day" };
  casos.push(bCaso_(m, 1, 'Hi, agent! Let\'s see Ben\'s [[day|dia]]!', [], [
    bFiguras_([['⏰', ['wake up', 'sleep'], 0], ['🍳', ['eat breakfast', 'go to school'], 0], ['🏫', ['go to school', 'sleep'], 0], ['😴', ['wake up', 'sleep'], 1]],
      ['==wake up== = acordar · ==sleep== = dormir', '==eat breakfast== = tomar café · ==go to school== = ir à escola'], 'vocabulário: rotina'),
    bOuvir_([["I wake up at seven o'clock.", ['🕖', '🕒'], 0], ["I go to bed at nine o'clock.", ['🕓', '🕘'], 1]],
      ["==seven== = 7 · ==nine== = 9", 'O ponteiro pequeno mostra a hora: 🕖 = 7:00, 🕘 = 9:00.'], 'compreensão oral: horas'),
    bBlocos_('Complete the sentence', 'Complete the sentence.', 'Toque no verbo certo para completar a frase.', [
      ['⏰', 'I ___ up at 7.', ['wake', 'sleep'], ['wake'], { sleep: 'Look at the alarm clock ⏰: I WAKE up.' }],
      ['🏫', 'I ___ to school.', ['go', 'eat'], ['go'], { eat: 'We EAT food. To school we GO.' }],
    ], ['==wake up== = acordar · ==go== = ir', 'I wake up. I go to school.'], 'rotina (I + verbo)'),
  ], 'I wake up at ', 'dizer a que horas acorda.', "I wake up at six o'clock."));

  const diaEv = [
    { id: 'A', aba: "A · Ben's day", blocos: [{ tipo: 'linha', itens: [['7:00', 'wake up'], ['7:30', '[[eat breakfast|tomar café da manhã]]'], ['8:00', 'go to school'], ['9:30 p.m.', '[[go to bed|ir para a cama]]']] }] },
    bMsg_('ben', 'Ben', "I [[wake up|acordo]] at seven o'clock. I eat breakfast with my sister. We go to school [[by bus|de ônibus]]."),
    bAudio_('lucy', 'Lucy', "I wake up at seven thirty. I go to school at eight o'clock with Ben."),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! Let\'s see Ben\'s [[day|dia]]. Read the clues!', diaEv, [
    bLerOuvir_([['Ben wakes up at…', ['7:00', '7:30', '8:00'], 0], ['Lucy wakes up at…', ['7:00', '7:30', '9:30'], 1, { 0: 'Ben wakes up at 7:00. Listen to Lucy!' }]],
      ['Ben says: "I wake up at ==seven o\'clock==."', 'Lucy says: "I wake up at ==seven thirty==." = 7:30'], 'localizar informação: horas'),
    bBlocos_('Routine verbs', 'Complete the sentences.', 'Complete com o verbo certo.', [
      ['⏰', 'I ___ up at seven.', ['wake', 'wakes', 'waking'], ['wake'], { wakes: 'With I → WAKE (no -s).' }],
      ['🚌', 'We ___ to school by bus.', ['go', 'goes', 'going'], ['go'], { goes: 'With WE → GO (no -s).' }],
      ['🍳', 'I ___ breakfast at 7:30.', ['eat', 'eats', 'eating'], ['eat'], { eats: 'With I → EAT (no -s).' }],
    ], ['I / we / you / they → verbo sem -s', 'I ==wake== · we ==go== · I ==eat=='], 'simple present (I/we)'),
    { titulo: 'Put the day in order', tipo: 'Order', onomatopeia: 'POW!',
      passos: [['✋', 'Put the day in order.', 'Coloque o dia do Ben em ordem: arraste ou use as setas.']],
      dicas: ['Look at clue A: ==7:00==, ==7:30==, ==8:00==, ==9:30 p.m.==', 'First wake up, then breakfast, then school, then bed.'],
      partes: [{ tipo: 'ordenar', itens: ['I wake up.', 'I eat breakfast.', 'I go to school.', 'I go to bed.'], embaralhar: [2, 0, 3, 1] }],
      solucao: 'wake up → eat breakfast → go to school → go to bed',
      etiquetas: [{ codigo: 'BASE', foco: 'sequência da rotina' }] },
  ], 'I wake up at ', 'dizer a que horas acorda e vai para a escola.', "I wake up at six o'clock. I go to school at seven."));

  const diaEv3 = [
    { id: 'A', aba: 'A · Note', moldura: 'caderno', blocos: [{ tipo: 'meta', texto: 'A note in the classroom' },
      { tipo: 'texto', texto: 'I wake up at six thirty. I go to school [[by bike|de bicicleta]]. I go to bed at nine.' }] },
    bFichas_([['ben', 'BEN', ['wake up: 7:00', 'school: by bus', 'bed: 9:30']], ['sam', 'SAM', ['wake up: 6:00', 'school: [[on foot|a pé]]', 'bed: 10:00']], ['mia', 'MIA', ['wake up: 6:30', 'school: by bike', 'bed: 9:00']]]),
    bAudio_('sam', 'Sam', "Hi! I'm Sam. I wake up at six o'clock. I walk to school with my brothers. I go to bed at ten."),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! We found a [[note|bilhete]] in the classroom. Who wrote it?', diaEv3, [
    bQuem_('Who wrote the note?', 'Click the person.', 'Clique em quem escreveu o bilhete.',
      [{ personagem: 'ben', texto: 'BEN' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'mia', texto: 'MIA' }], 2,
      { 0: 'Ben wakes up at 7:00 and goes by bus.', 1: 'Sam wakes up at 6:00 and goes on foot.' },
      ['The note says: ==6:30==, ==by bike==, ==bed at 9==.', 'Compare the times in clue B.'], 'It\'s **Mia**: 6:30, by bike, bed at 9!'),
    bOuvirPista_("Sam's message", [['Sam wakes up at…', ["six o'clock", "seven o'clock", 'six thirty'], 0], ['Sam goes to school…', ['on foot', 'by bus', 'by bike'], 0]],
      ['Listen for ==six== and ==walk==.', '"I ==walk== to school" = on foot (a pé).'], 'compreensão oral: rotina'),
    bBlocos_('Routine verbs', 'Complete the sentences.', 'Complete com o verbo certo.', [
      ['', 'I ___ to school by bike.', ['go', 'goes', 'going'], ['go']],
      ['', 'We ___ breakfast at seven.', ['have', 'has', 'having'], ['have'], { has: 'With WE → HAVE.' }],
      ['', 'They ___ to bed at nine.', ['go', 'goes', 'are'], ['go'], { goes: 'With THEY → GO (no -s).' }],
    ], ['I / we / they → verbo sem -s', 'We ==have== breakfast. They ==go== to bed.'], 'simple present (I/we/they)'),
    bVF_([['Ben goes to school by bus.', true], ['Sam wakes up at seven.', false], ['Mia goes to bed at nine.', true], ['Sam goes to school by bike.', false]],
      ['Check clues B and C.', 'Sam wakes up at ==six== and goes ==on foot==.'], 'rotina'),
  ], 'I wake up at ', 'contar a sua rotina com horários.', "I wake up at six thirty. I go to school by bus."));

  // ------------------------------------------------ 4 · The Busy Week (dias da semana, frequência, he/she + -s)
  m = { missao: 'semana', ordem: 4, tema: 'Routine & time', titulo: 'The Busy Week' };
  casos.push(bCaso_(m, 1, 'Hi, agent! Lucy has a [[busy week|semana cheia]]. Let\'s see!', [], [
    bFiguras_([['MON', ['Monday', 'Friday'], 0], ['FRI', ['Tuesday', 'Friday'], 1], ['SAT', ['Sunday', 'Saturday'], 1], ['WED', ['Wednesday', 'Thursday'], 0]],
      ['MON = ==Monday== = segunda · FRI = ==Friday== = sexta', 'SAT = ==Saturday== = sábado · WED = ==Wednesday== = quarta'], 'vocabulário: dias da semana'),
    bOuvir_([['Lucy plays soccer on Monday.', ['MON', 'FRI'], 0, 'pilulas'], ['Ben swims on Friday.', ['WED', 'FRI'], 1, 'pilulas']],
      ['==Monday== = MON · ==Friday== = FRI', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: dias da semana'),
    bBlocos_('Add -s', 'Complete with the verb.', 'Com he/she (ele/ela), o verbo ganha -S: she plays.', [
      ['👧⚽', 'Lucy ___ soccer.', ['play', 'plays'], ['plays'], { play: 'Lucy = she → PLAYS (with -s).' }],
      ['👦🏊', 'Ben ___ on Fridays.', ['swim', 'swims'], ['swims'], { swim: 'Ben = he → SWIMS (with -s).' }],
    ], ['he/she → verbo + ==s==', 'Lucy ==plays== · Ben ==swims=='], 'simple present (he/she + -s)'),
  ], 'On Monday, I ', 'dizer o que faz num dia da semana.', 'On Monday, I play soccer.'));

  const semEv = [
    { id: 'A', aba: "A · Lucy's week", blocos: [{ tipo: 'semana', titulo: "LUCY'S WEEK", dias: [['MON', '⚽'], ['TUE', '🎹'], ['WED', '⚽'], ['THU', ''], ['FRI', '🏊']] }] },
    bMsg_('lucy', 'Lucy', 'I play soccer on Mondays and Wednesdays. I play the [[piano|piano]] on Tuesdays. I [[never|nunca]] play on Thursdays!'),
    bAudio_('ben', 'Ben', 'My sister Lucy always plays soccer on Mondays. On Fridays, she swims with me.'),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! Lucy has a [[busy week|semana cheia]]. Read the clues!', semEv, [
    bLerOuvir_([['Lucy plays the piano on…', ['Tuesdays', 'Mondays', 'Fridays'], 0], ['On Fridays, Lucy…', ['swims', 'plays soccer', 'plays the piano'], 0]],
      ['Lucy says: "I play the piano on ==Tuesdays==."', 'Ben says: "On Fridays, she ==swims==."'], 'localizar informação: dias'),
    bBlocos_('Add -s?', 'Complete the sentences.', 'Com he/she o verbo ganha -S. Com I/you/we/they, não.', [
      ['', 'Lucy ___ soccer on Mondays.', ['play', 'plays', 'playing'], ['plays'], { play: 'Lucy = she → PLAYS.' }],
      ['', 'Ben ___ on Fridays.', ['swim', 'swims', 'swimming'], ['swims'], { swim: 'Ben = he → SWIMS.' }],
      ['', 'I ___ the piano.', ['play', 'plays', 'playing'], ['play'], { plays: 'With I → PLAY (no -s).' }],
    ], ['he/she → verbo + ==s== · I → sem -s', 'Lucy ==plays== · I ==play=='], 'simple present (he/she + -s)'),
    bBlocos_('Always or never?', 'Choose ALWAYS or NEVER.', 'ALWAYS = sempre · NEVER = nunca. Veja a semana da Lucy (pista A).', [
      ['📅', 'Lucy ___ plays on Thursdays.', ['never', 'always', 'sometimes'], ['never'], { always: 'Look at THU in clue A: nothing! → NEVER.' }],
      ['⚽', 'Lucy ___ plays soccer on Mondays.', ['always', 'never', 'sometimes'], ['always'], { never: 'Ben says she ALWAYS plays on Mondays.' }],
    ], ['==always== = sempre · ==never== = nunca', 'THU is empty → ==never=='], 'advérbios de frequência'),
  ], 'On Saturdays, I ', 'dizer o que faz em um dia da semana.', 'On Saturdays, I always play video games.'));

  const semEv3 = [
    { id: 'A', aba: 'A · Note', moldura: 'caderno', blocos: [{ tipo: 'meta', texto: 'From the music teacher' },
      { tipo: 'texto', texto: 'I need a student who plays the piano on Tuesdays and swims on Fridays.' }] },
    bFichas_([['lucy', 'LUCY', ['soccer: Mon, Wed', 'piano: Tue', 'swimming: Fri']], ['mia', 'MIA', ['piano: Tue', '[[dance|dança]]: Fri']], ['sam', 'SAM', ['soccer: Tue', 'swimming: Fri']]]),
    bAudio_('mia', 'Mia', "Hi! I'm Mia. I play the piano on Tuesdays. I never swim. I dance on Fridays."),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! The music teacher needs a student. Who is it?', semEv3, [
    bQuem_('Who is the student?', 'Click the person.', 'Clique no aluno que o professor procura.',
      [{ personagem: 'mia', texto: 'MIA' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'lucy', texto: 'LUCY' }], 2,
      { 0: 'Mia dances on Fridays. She never swims.', 1: 'Sam plays soccer on Tuesdays, not the piano.' },
      ['The note says: ==piano on Tuesdays== and ==swims on Fridays==.', 'Check every student in clue B.'], 'It\'s **Lucy**: piano on Tuesdays and swimming on Fridays!'),
    bOuvirPista_("Mia's message", [['On Fridays, Mia…', ['dances', 'swims', 'plays soccer'], 0], ['Does Mia swim?', ['Mia never swims.', 'Mia always swims.', 'Mia swims on Fridays.'], 0]],
      ['Listen for ==never== and ==Fridays==.', 'Mia says: "I ==never== swim. I ==dance== on Fridays."'], 'compreensão oral: rotina'),
    bBlocos_('Add -s?', 'Complete the sentences.', 'Com he/she o verbo ganha -S. Com they (dois nomes), não.', [
      ['', 'Lucy ___ the piano on Tuesdays.', ['plays', 'play', 'playing'], ['plays'], { play: 'Lucy = she → PLAYS.' }],
      ['', 'Mia ___ on Fridays.', ['dances', 'dance', 'dancing'], ['dances'], { dance: 'Mia = she → DANCES.' }],
      ['', 'Sam and Lucy ___ soccer.', ['play', 'plays', 'playing'], ['play'], { plays: 'Sam and Lucy = they → PLAY (no -s).' }],
    ], ['he/she → +==s== · they → sem -s', 'Sam and Lucy = they → ==play=='], 'simple present (he/she × they)'),
    bVF_([['Lucy swims on Fridays.', true], ['Mia always swims.', false], ['Sam plays soccer on Tuesdays.', true], ['Lucy plays the piano on Mondays.', false]],
      ['Check clues B and C.', 'Mia ==never== swims. Lucy plays the piano on ==Tuesdays==.'], 'rotina + frequência'),
  ], 'On Fridays, I ', 'dizer o que faz em um dia da semana usando always/never.', 'On Fridays, I never study. I always play.'));

  // ------------------------------------------------ 5 · The School Picnic (comida, like/don't like)
  m = { missao: 'piquenique', ordem: 5, tema: 'Food & places', titulo: 'The School Picnic' };
  casos.push(bCaso_(m, 1, 'Hi, agent! The school has a [[picnic|piquenique]]. What food is there?', [], [
    bFiguras_([['🍎', ['apple', 'banana'], 0], ['🍌', ['bread', 'banana'], 1], ['🥛', ['milk', 'water'], 0], ['🍕', ['pizza', 'cake'], 0]],
      ['==apple== = maçã · ==banana== = banana', '==milk== = leite · ==pizza== = pizza'], 'vocabulário: comida'),
    bOuvir_([['I like pizza.', ['🍕', '🍎'], 0], ['I like cake.', ['🍌', '🍰'], 1]],
      ['==pizza== = 🍕 · ==cake== = 🍰 (bolo)', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: comida'),
    bBlocos_('Like or don\'t like?', 'Complete the sentence.', '👍 = LIKE (gosto) · 👎 = DON\'T LIKE (não gosto).', [
      ['👍🍕', 'I ___ pizza.', ['like', "don't like"], ['like'], { "don't like": 'Look: 👍 = I LIKE.' }],
      ['👎🥦', 'I ___ broccoli.', ['like', "don't like"], ["don't like"], { like: "Look: 👎 = I DON'T LIKE." }],
    ], ['👍 ==like== = gosto · 👎 ==don\'t like== = não gosto', 'I ==don\'t like== broccoli. 👎'], "like / don't like"),
  ], 'I like ', 'dizer uma comida de que gosta.', 'I like pizza.'));

  const picEv = [
    { id: 'A', aba: 'A · Picnic list', blocos: [{ tipo: 'itens', itens: [['🍕', 'pizza'], ['🍎', '[[apples|maçãs]]'], ['🥛', '[[milk|leite]]'], ['🍰', '[[cake|bolo]]']] }] },
    bMsg_('sam', 'Sam', "I like pizza and apples. I [[don't like|não gosto de]] milk."),
    bAudio_('mia', 'Mia', "Hi! I'm Mia. I like cake and milk. I don't like pizza."),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! The school has a [[picnic|piquenique]]. Who likes what?', picEv, [
    bLerOuvir_([['Sam likes…', ['pizza and apples', 'milk', 'cake'], 0], ["Mia doesn't like…", ['pizza', 'cake', 'milk'], 0]],
      ['Sam says: "I like ==pizza and apples==."', 'Mia says: "I ==don\'t like pizza==."'], 'localizar informação: gostos'),
    bBlocos_('Like, likes or don\'t like?', 'Complete the sentences.', 'I like / I don\'t like · com he/she: likes.', [
      ['👍🍎', 'I ___ apples.', ['like', "don't like", 'likes'], ['like']],
      ['👎🥛', 'I ___ milk.', ['like', "don't like", 'likes'], ["don't like"], { like: "Look: 👎 = I DON'T LIKE." }],
      ['🍕', 'Sam ___ pizza.', ['likes', 'like', "don't like"], ['likes'], { like: 'Sam = he → LIKES (with -s).' }],
    ], ['I ==like== · I ==don\'t like== · he/she ==likes==', 'Sam = he → ==likes=='], "like / don't like / likes"),
    { titulo: 'Food or drink?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: comida (FOOD) ou bebida (DRINK). Arraste ou toque na palavra.']],
      dicas: ['==drink== = bebida: milk, water, juice', '==food== = comida: pizza, apple, cake'],
      partes: [{ tipo: 'separar', caixas: ['FOOD 🍽️', 'DRINK 🥤'], itens: [
        { texto: 'pizza', resposta: 0 }, { texto: 'water', resposta: 1 }, { texto: 'apple', resposta: 0 },
        { texto: 'juice', resposta: 1 }, { texto: 'cake', resposta: 0 }, { texto: 'milk', resposta: 1 }] }],
      solucao: '**FOOD**: pizza, apple, cake · **DRINK**: water, juice, milk',
      etiquetas: [{ codigo: 'BASE', foco: 'vocabulário: comida e bebida' }] },
  ], 'I like ', "dizer do que gosta e do que não gosta.", "I like apples. I don't like milk."));

  const picEv3 = [
    { id: 'A', aba: 'A · Note', moldura: 'caderno', blocos: [{ tipo: 'meta', texto: 'On the picnic table' },
      { tipo: 'texto', texto: "I [[brought|trouxe]] the cake! I like [[sweet|doce]] food. I don't like milk." }] },
    bFichas_([['mia', 'MIA', ['likes: cake, milk']], ['sam', 'SAM', ['likes: pizza, cake', "doesn't like: milk"]], ['lucy', 'LUCY', ['likes: apples', "doesn't like: cake"]]]),
    bAudio_('rosa', 'Rosa', "Hello! The picnic is on Saturday. Please bring water, not soda. And remember: Lucy doesn't like cake!"),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! Someone [[brought|trouxe]] a cake to the picnic. Who?', picEv3, [
    bQuem_('Who brought the cake?', 'Click the person.', 'Clique em quem trouxe o bolo.',
      [{ personagem: 'mia', texto: 'MIA' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'lucy', texto: 'LUCY' }], 1,
      { 0: 'Mia likes milk. The note says: "I don\'t like milk."', 2: "Lucy doesn't like cake." },
      ['The note says: likes ==cake==, doesn\'t like ==milk==.', 'Mia likes milk. Lucy doesn\'t like cake.'], 'It\'s **Sam**: he likes cake and doesn\'t like milk!'),
    bOuvirPista_("Rosa's message", [['The picnic is…', ['on Saturday', 'on Sunday', 'on Friday'], 0], ['Please bring…', ['water', 'soda', 'milk'], 0]],
      ['Listen for a day and a drink.', 'Rosa says: "on ==Saturday==" and "bring ==water=="'], 'compreensão oral: comida e dias'),
    bBlocos_('Likes or doesn\'t?', 'Complete the sentences.', 'he/she: likes / doesn\'t like · I/we/they: like / don\'t like.', [
      ['', 'Sam ___ cake.', ['likes', 'like', "don't like"], ['likes'], { like: 'Sam = he → LIKES.' }],
      ['', 'Lucy ___ like cake.', ["doesn't", "don't", "isn't"], ["doesn't"], { "don't": "Lucy = she → DOESN'T." }],
      ['', 'We ___ pizza.', ['like', 'likes', "doesn't"], ['like'], { likes: 'With WE → LIKE (no -s).' }],
    ], ['he/she → ==likes / doesn\'t like==', 'we → ==like=='], "like/likes/doesn't like"),
    bVF_([['Sam brought the cake.', true], ['Lucy likes cake.', false], ['The picnic is on Saturday.', true], ["Mia doesn't like milk.", false]],
      ['Check all the clues.', 'Lucy ==doesn\'t like== cake. Mia ==likes== milk.'], 'gostos + comida'),
  ], 'For the picnic, I ', 'dizer o que levaria ao piquenique e por quê.', 'For the picnic, I bring apples. I like apples.'));

  // ------------------------------------------------ 6 · Lost in Town (lugares, there is/are, near/next to)
  m = { missao: 'cidade', ordem: 6, tema: 'Food & places', titulo: 'Lost in Town' };
  casos.push(bCaso_(m, 1, 'Hi, agent! Let\'s learn the [[places|lugares]] in town!', [], [
    bFiguras_([['🏫', ['school', 'park'], 0], ['🏥', ['hospital', 'library'], 0], ['🌳', ['supermarket', 'park'], 1], ['📚', ['library', 'hospital'], 0]],
      ['==school== = escola · ==hospital== = hospital', '==park== = parque · ==library== = biblioteca'], 'vocabulário: lugares'),
    bOuvir_([['Go to the park.', ['🌳', '🏥'], 0], ['The library is open.', ['🏫', '📚'], 1]],
      ['==park== = 🌳 · ==library== = 📚', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: lugares'),
    bBlocos_('Is or are?', 'Complete with IS or ARE.', 'There is = há (um) · There are = há (dois ou mais).', [
      ['🌳', 'There ___ a park.', ['is', 'are'], ['is'], { are: 'A park = 1 → THERE IS.' }],
      ['🏪🏪', 'There ___ two shops.', ['is', 'are'], ['are'], { is: 'Two shops = 2 → THERE ARE.' }],
    ], ['1 → there ==is== · 2 ou mais → there ==are==', 'two shops → there ==are=='], 'there is / there are'),
  ], 'In my city, there is ', 'dizer um lugar que existe na sua cidade.', 'In my city, there is a big park.'));

  const cidEv = [
    { id: 'A', aba: 'A · Map', blocos: [{ tipo: 'itens', itens: [['🏫', 'school'], ['🌳', 'park — [[next to|ao lado de]] the school'], ['🏥', 'hospital'], ['📚', 'library — [[near|perto de]] the park']] }] },
    bMsg_('ben', 'Ben', "I'm [[lost|perdido]]! I'm next to the school. There is a big park here. Where is the library?"),
    bAudio_('paulo', 'Mr. Paulo', 'Hello, Ben! The library is near the park. There are two shops next to the library.'),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! Ben is [[lost|perdido]] in town. Help him!', cidEv, [
    bLerOuvir_([['Where is Ben?', ['next to the school', 'at the hospital', 'in the library'], 0], ['Where is the library?', ['near the park', 'next to the hospital', 'in the school'], 0]],
      ['Ben says: "I\'m ==next to the school==."', 'Paulo says: "The library is ==near the park==."'], 'localizar informação: lugares'),
    bBlocos_('There is or there are?', 'Complete the sentences.', 'There is = há (um) · There are = há (dois ou mais).', [
      ['🌳', 'There ___ a big park.', ['is', 'are', 'am'], ['is'], { are: 'A big park = 1 → IS.' }],
      ['🏪🏪', 'There ___ two shops.', ['are', 'is', 'am'], ['are'], { is: 'Two shops = 2 → ARE.' }],
      ['🏥', 'There ___ a hospital in my city.', ['is', 'are', 'be'], ['is'], { are: 'A hospital = 1 → IS.' }],
    ], ['1 → there ==is== · 2+ → there ==are==', 'two shops → ==are=='], 'there is / there are'),
    bBlocos_('Where is it?', 'Look at map A.', 'Olhe o mapa (pista A) e complete: next to (ao lado de) ou near (perto de).', [
      ['', 'The park is ___ the school.', ['next to', 'in', 'on'], ['next to'], { in: 'Look at map A: the park is NEXT TO the school.' }],
      ['', 'The library is ___ the park.', ['near', 'under', 'in'], ['near'], { under: 'Look at map A: the library is NEAR the park.' }],
    ], ['==next to== = ao lado de · ==near== = perto de', 'Map A: park — ==next to== the school'], 'preposições de lugar'),
  ], 'In my city, there is ', 'dizer o que existe na sua cidade e onde fica.', 'In my city, there is a park near my school.'));

  const cidEv3 = [
    { id: 'A', aba: 'A · Map', blocos: [{ tipo: 'itens', itens: [['🏫', 'school'], ['🌳', 'park — next to the school'], ['📚', 'library — near the park'], ['🏪', 'supermarket — next to the hospital'], ['🏥', 'hospital']] }] },
    bFichas_([['sam', 'SAM', ['I saw a dog next to the school.']], ['mia', 'MIA', ['The dog is not in the park.']], ['lucy', 'LUCY', ['There is a dog near the park, in a building with books.']]]),
    bAudio_('rosa', 'Rosa', 'Max is our dog. He loves books! He is not at the supermarket.'),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! Max the dog is [[lost|perdido]]. Where is he?', cidEv3, [
    bQuem_('Where is Max?', 'Click the place.', 'Clique no lugar onde o Max está.',
      [{ emoji: '🌳', texto: 'park' }, { emoji: '📚', texto: 'library' }, { emoji: '🏪', texto: 'supermarket' }], 1,
      { 0: 'Mia says the dog is not in the park.', 2: 'Rosa says Max is not at the supermarket.' },
      ['Lucy says: "a building with ==books==".', 'A building with books = 📚'], 'Max is in the **library**: near the park, with books!', 'figuras'),
    bOuvirPista_("Rosa's message", [['Max loves…', ['books', 'food', 'the park'], 0], ['Max is not…', ['at the supermarket', 'near the park', 'in town'], 0]],
      ['Listen for ==loves== and ==not==.', 'Rosa says: "He loves ==books==. He is not at the ==supermarket==."'], 'compreensão oral: lugares'),
    bBlocos_('Places in town', 'Complete the sentences.', 'Complete com is/are e com a preposição certa.', [
      ['', 'There ___ a library near the park.', ['is', 'are', 'am'], ['is'], { are: 'A library = 1 → IS.' }],
      ['', 'There ___ two dogs in the park.', ['are', 'is', 'am'], ['are'], { is: 'Two dogs = 2 → ARE.' }],
      ['', 'The park is ___ the school.', ['next to', 'under', 'on'], ['next to'], { under: 'Look at map A: NEXT TO the school.' }],
    ], ['1 → ==is== · 2+ → ==are==', 'Map A: park — ==next to== the school'], 'there is/are + preposições'),
    bVF_([['The library is near the park.', true], ['The supermarket is next to the school.', false], ['There is a hospital in town.', true], ['Max is at the supermarket.', false]],
      ['Check map A and clue C.', 'The supermarket is next to the ==hospital==.'], 'lugares + there is'),
  ], 'In my city, there is ', 'dizer o que existe na sua cidade e onde fica.', 'In my city, there is a library next to the school.'));

  // ------------------------------------------------ 7 · The Talent Show (verbos de ação, can/can't)
  m = { missao: 'talentos', ordem: 7, tema: 'Actions & abilities', titulo: 'The Talent Show' };
  casos.push(bCaso_(m, 1, 'Hi, agent! The school has a [[talent show|show de talentos]]. What can they do?', [], [
    bFiguras_([['🏊', ['swim', 'sing'], 0], ['🎤', ['dance', 'sing'], 1], ['💃', ['dance', 'run'], 0], ['🏃', ['swim', 'run'], 1]],
      ['==swim== = nadar · ==sing== = cantar', '==dance== = dançar · ==run== = correr'], 'vocabulário: verbos de ação'),
    bOuvir_([['I can sing.', ['🎤', '🏊'], 0], ['I can dance.', ['🏃', '💃'], 1]],
      ['==sing== = 🎤 · ==dance== = 💃', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: verbos de ação'),
    bBlocos_("Can or can't?", "Complete with CAN or CAN'T.", "CAN = consegue/sabe · CAN'T = não consegue/não sabe.", [
      ['🐟', 'A fish ___ swim.', ['can', "can't"], ['can'], { "can't": 'Fish swim! → CAN.' }],
      ['🐶🎸', 'A dog ___ play the guitar.', ['can', "can't"], ["can't"], { can: "Dogs don't play the guitar! → CAN'T." }],
    ], ["==can== = consegue · ==can't== = não consegue", "A dog ==can't== play the guitar. 🐶"], "can / can't"),
  ], 'I can ', 'dizer algo que você sabe fazer.', 'I can swim.'));

  const talEv = [
    { id: 'A', aba: 'A · Poster', blocos: [{ tipo: 'manchete', texto: 'TALENT SHOW!' }, { tipo: 'itens', itens: [['🎤', 'Mia — sing'], ['💃', 'Lucy — dance'], ['🎸', 'Sam — play the [[guitar|violão]]']] }] },
    bMsg_('ben', 'Ben', "I can't sing and I can't dance. But I can swim [[fast|rápido]]!"),
    bAudio_('mia', 'Mia', "Hi! I can sing, but I can't play the guitar. Sam can play the guitar very well."),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! The school has a [[talent show|show de talentos]]. Read the clues!', talEv, [
    bLerOuvir_([['What can Ben do?', ['swim', 'sing', 'dance'], 0], ['Who can play the guitar?', ['Sam', 'Mia', 'Ben'], 0]],
      ['Ben says: "I can ==swim== fast!"', 'Mia says: "==Sam== can play the guitar."'], 'localizar informação'),
    bBlocos_("Can or can't?", 'Complete the sentences.', "CAN = consegue · CAN'T = não consegue. CAN nunca ganha -s.", [
      ['🎤', 'Mia ___ sing.', ['can', "can't", 'cans'], ['can'], { cans: 'CAN never takes -s: Mia CAN.' }],
      ['💃', 'Ben ___ dance.', ["can't", 'can', 'cans'], ["can't"], { can: "Ben says: I CAN'T dance." }],
      ['🎸', 'Mia ___ play the guitar.', ["can't", 'can', 'does'], ["can't"], { can: "Mia says: I CAN'T play the guitar." }],
    ], ["==can== / ==can't== (nunca \"cans\")", "Ben ==can't== dance."], "can / can't"),
    { titulo: 'Yes or no?', tipo: 'Questions', onomatopeia: 'POW!',
      passos: [['👆', 'Choose the answers.', 'Escolha a resposta curta certa: Yes, he can / No, he can\'t.']],
      dicas: ['Short answer: ==Yes, he can.== / ==No, he can\'t.==', "Ben can't sing → ==No, he can't.=="],
      partes: [
        { tipo: 'escolha', pergunta: 'Can Sam play the guitar?', opcoes: ['Yes, he can.', "No, he can't.", 'Yes, he is.'], resposta: 0 },
        { tipo: 'escolha', pergunta: 'Can Ben sing?', opcoes: ['Yes, he can.', "No, he can't.", "No, he isn't."], resposta: 1 },
      ],
      solucao: "Sam? **Yes, he can.** · Ben? **No, he can't.**",
      etiquetas: [{ codigo: 'BASE', foco: "can (respostas curtas)" }] },
  ], 'I can ', "dizer o que você sabe e o que não sabe fazer.", "I can run fast. I can't sing."));

  const talEv3 = [
    { id: 'A', aba: 'A · Note', moldura: 'caderno', blocos: [{ tipo: 'meta', texto: 'MYSTERY ACT' },
      { tipo: 'texto', texto: "I can sing and I can play the guitar. I can't dance." }] },
    bFichas_([['mia', 'MIA', ['can: sing', "can't: play the guitar"]], ['sam', 'SAM', ['can: play the guitar, sing', "can't: dance"]], ['lucy', 'LUCY', ['can: dance, sing', "can't: play the guitar"]]]),
    bAudio_('max', 'Coach Max', "The show is on Friday at seven o'clock. Lucy can dance very well, but she can't come on Friday."),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! There is a [[mystery act|atração secreta]] in the show. Who is it?', talEv3, [
    bQuem_('Who is the mystery act?', 'Click the person.', 'Clique em quem é a atração secreta.',
      [{ personagem: 'mia', texto: 'MIA' }, { personagem: 'lucy', texto: 'LUCY' }, { personagem: 'sam', texto: 'SAM' }], 2,
      { 0: "Mia can't play the guitar.", 1: "Lucy can't play the guitar, and she CAN dance." },
      ['The note says: can ==sing==, can ==play the guitar==, can\'t ==dance==.', 'Check every student in clue B.'], "It's **Sam**: he can sing and play the guitar, but he can't dance!"),
    bOuvirPista_("Coach Max's message", [['The show is…', ["on Friday at seven", 'on Monday at seven', 'on Friday at nine'], 0], ["Who can't come on Friday?", ['Lucy', 'Sam', 'Mia'], 0]],
      ['Listen for a day and a time.', 'Max says: "Lucy ==can\'t come== on Friday."'], 'compreensão oral: can/can\'t'),
    bBlocos_("Can or can't?", 'Complete the sentences.', "CAN = consegue · CAN'T = não consegue. Confira as fichas (pista B).", [
      ['', 'Sam ___ play the guitar.', ['can', "can't", 'cans'], ['can'], { cans: 'CAN never takes -s.' }],
      ['', 'Sam ___ dance.', ["can't", 'can', "don't"], ["can't"], { can: "Clue B: Sam CAN'T dance." }],
      ['', 'Lucy and Mia ___ sing.', ['can', 'cans', "can't"], ['can'], { "can't": 'Clue B: Lucy and Mia CAN sing.' }],
    ], ["==can== / ==can't==, nunca \"cans\"", "Clue B: Sam ==can't== dance."], "can / can't"),
    bVF_([['Sam can sing.', true], ['Mia can play the guitar.', false], ['Lucy can dance.', true], ['Sam can dance.', false]],
      ['Check clue B.', "Mia ==can't== play the guitar. Sam ==can't== dance."], "can / can't"),
  ], 'I can ', "dizer o que você sabe e não sabe fazer.", "I can play soccer. I can't play the piano."));

  // ------------------------------------------------ 8 · What Are They Doing? (present continuous)
  m = { missao: 'agora', ordem: 8, tema: 'Actions & abilities', titulo: 'What Are They Doing?' };
  casos.push(bCaso_(m, 1, 'Hi, agent! Look at the park. What are they [[doing|fazendo]] now?', [], [
    bFiguras_([['📖', ['reading', 'swimming'], 0], ['🍽️', ['eating', 'running'], 0], ['🎨', ['sleeping', 'painting'], 1], ['🎮', ['playing', 'cooking'], 0]],
      ['==reading== = lendo · ==eating== = comendo', '==painting== = pintando · ==playing== = jogando/brincando'], 'vocabulário: verbos + -ing'),
    bOuvir_([['She is reading.', ['📖', '🎨'], 0], ['He is eating.', ['🎮', '🍽️'], 1]],
      ['==reading== = 📖 · ==eating== = 🍽️', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: ações'),
    bBlocos_('What is she doing?', 'Complete the sentence.', 'Agora (now): is + verbo com -ING. Ex.: she is reading.', [
      ['👧📖', 'She is ___.', ['reading', 'read'], ['reading'], { read: 'Now → -ING: she is READING.' }],
      ['👦🏃', 'He ___ running.', ['is', 'are'], ['is'], { are: 'He = 1 person → IS.' }],
    ], ['agora = ==is== + verbo + ==ing==', 'She is ==reading==. He ==is== running.'], 'present continuous'),
  ], 'Now I am ', 'dizer o que você está fazendo agora.', 'Now I am playing a game.'));

  const agoEv = [
    { id: 'A', aba: 'A · Photo', blocos: [{ tipo: 'meta', texto: 'In the park, now' }, { tipo: 'itens', itens: [['👧🎨', 'Lucy'], ['👦⚽', 'Ben'], ['👨📖', 'Tom'], ['👩🍦', 'Rosa']] }] },
    bMsg_('lucy', 'Lucy', "I'm in the park! I'm [[painting|pintando]] a [[tree|árvore]]. Ben is playing soccer."),
    bAudio_('rosa', 'Rosa', "Hi! I'm eating ice cream. Tom is reading a book."),
  ];
  casos.push(bCaso_(m, 2, 'Hi, agent! The family is in the park. What are they [[doing|fazendo]]?', agoEv, [
    bLerOuvir_([['What is Lucy doing?', ['painting', 'reading', 'eating'], 0], ['What is Tom doing?', ['reading a book', 'playing soccer', 'eating ice cream'], 0]],
      ['Lucy says: "I\'m ==painting== a tree."', 'Rosa says: "Tom is ==reading== a book."'], 'localizar informação: ações'),
    bBlocos_('Am, is or are?', 'Complete the sentences.', 'I am · he/she is · they are + verbo com -ING.', [
      ['⚽', 'Ben ___ playing soccer.', ['is', 'are', 'am'], ['is'], { are: 'Ben = he → IS.' }],
      ['🎨', 'I ___ painting.', ['am', 'is', 'are'], ['am'], { is: 'With I → AM.' }],
      ['🌳', 'Tom and Rosa ___ in the park.', ['are', 'is', 'am'], ['are'], { is: 'Tom and Rosa = they → ARE.' }],
    ], ['I ==am== · he/she ==is== · they ==are==', 'Tom and Rosa = they → ==are=='], 'present continuous (am/is/are)'),
    bBlocos_('Add -ing', 'Complete with -ING.', 'Depois de is/am/are, o verbo ganha -ING.', [
      ['🍦', 'Rosa is ___ ice cream.', ['eating', 'eat', 'eats'], ['eating'], { eat: 'After IS → EATING.' }],
      ['🎨', 'Lucy is ___ a tree.', ['painting', 'paint', 'paints'], ['painting'], { paint: 'After IS → PAINTING.' }],
    ], ['is + verbo + ==ing==', 'Rosa is ==eating==.'], 'present continuous (-ing)'),
  ], 'Now I am ', 'dizer o que você está fazendo agora.', 'Now I am studying English.'));

  const agoEv3 = [
    { id: 'A', aba: 'A · Photo', blocos: [{ tipo: 'meta', texto: 'Who took this photo? The person with the camera is NOT in the photo.' },
      { tipo: 'itens', itens: [['👦⚽', 'a boy playing soccer'], ['👧🎨', 'a girl painting'], ['👨📖', 'a man reading']] }] },
    bFichas_([['ben', 'BEN', ['I am playing soccer.']], ['rosa', 'ROSA', ['I am [[taking photos|tirando fotos]].']], ['tom', 'TOM', ['I am reading.']]]),
    bAudio_('lucy', 'Lucy', "Hi! I'm painting a tree. My mom is taking photos of us. My dad isn't playing. He is reading."),
  ];
  casos.push(bCaso_(m, 3, 'Hi, agent! Someone took a [[photo|foto]] in the park. Who?', agoEv3, [
    bQuem_('Who took the photo?', 'Click the person.', 'Clique em quem tirou a foto.',
      [{ personagem: 'ben', texto: 'BEN' }, { personagem: 'rosa', texto: 'ROSA' }, { personagem: 'tom', texto: 'TOM' }], 1,
      { 0: 'Ben is in the photo: he is playing soccer.', 2: 'Tom is in the photo: he is reading.' },
      ['The person with the camera is ==not in the photo==.', 'Rosa is ==taking photos==.'], "It's **Rosa**: she is taking photos!"),
    bOuvirPista_("Lucy's message", [['What is Lucy painting?', ['a tree', 'a dog', 'a house'], 0], ['Is Tom playing?', ["No, he isn't. He is reading.", 'Yes, he is.', 'No, he is eating.'], 0]],
      ['Listen for ==painting== and ==reading==.', 'Lucy says: "My dad ==isn\'t playing==. He is reading."'], 'compreensão oral: ações'),
    bBlocos_('What are they doing?', 'Complete the sentences.', 'am/is/are + verbo com -ING.', [
      ['', 'Rosa ___ taking photos.', ['is', 'are', 'am'], ['is'], { are: 'Rosa = she → IS.' }],
      ['', 'Ben and Lucy ___ playing in the park.', ['are', 'is', 'am'], ['are'], { is: 'Ben and Lucy = they → ARE.' }],
      ['', 'Tom is ___ a book.', ['reading', 'read', 'reads'], ['reading'], { read: 'After IS → READING.' }],
    ], ['he/she ==is== · they ==are== · verbo + ==ing==', 'Ben and Lucy = they → ==are=='], 'present continuous'),
    bVF_([['Rosa is taking photos.', true], ['Ben is painting.', false], ['Tom is reading.', true], ['Lucy is playing soccer.', false]],
      ['Check all the clues.', 'Ben is playing ==soccer==. Lucy is ==painting==.'], 'present continuous'),
  ], 'Now I am ', 'dizer o que você e outra pessoa estão fazendo agora.', 'Now I am reading. My friend is playing.'));

  return casos;
}
