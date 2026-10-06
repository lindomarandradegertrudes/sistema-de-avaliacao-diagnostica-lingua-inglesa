/**
 * Casos do ano em degraus (Etapa 2). Os casos de outubro em CasosPadrao.gs são a versão ★★★;
 * aqui estão as versões ★ e ★★ de outubro e os casos de novembro nos 3 degraus.
 * Usa as funções auxiliares de CasosBase.gs. Fica dentro de uma função (chamada na hora de carregar),
 * porque a ordem em que o Apps Script lê os arquivos não é garantida.
 */

const CHEFES_SAGA = {
  '6º': { personagem: 'kai', nome: 'CHIEF KAI' },
  '7º': { personagem: 'clock', nome: 'CAPTAIN CLOCK' },
  '8º': { personagem: 'lu', nome: 'DR. LU' },
  '9º': { personagem: 'nadia', nome: 'EDITOR NADIA' },
};

/** Um caso do ano. codigos: sigla do Mapa de cada cadeado (substitui a etiqueta "BASE" das funções auxiliares). */
function aCaso_(serie, missao, mes, numero, titulo, degrau, abertura, evidencias, travas, codigos, final) {
  travas.forEach(function (t, i) { t.etiquetas.forEach(function (e) { e.codigo = codigos[i] || codigos[codigos.length - 1]; }); });
  const chefe = CHEFES_SAGA[serie];
  return {
    id: 'c' + serie.charAt(0) + '-' + mes + '-' + missao.split('-').pop() + '-d' + degrau,
    serie: serie, missao: 'a' + serie.charAt(0) + '-' + mes, degrau: degrau, ordem: 10, mes: mes, numero: numero, titulo: titulo,
    abertura: { personagem: chefe.personagem, nome: chefe.nome, texto: abertura },
    evidencias: evidencias, travas: travas,
    final: { titulo: 'Your turn!', personagem: chefe.personagem, inicio: final[0], tarefa: final[1], foco: final[3] || titulo,
      passos: [['✍️', 'Write a sentence.', 'Escreva uma frase em inglês. Não vale pontos, só recebe comentário.'], ['💡', 'Start: ' + final[0].trim() + '…', 'Exemplo: ' + final[2]]] },
  };
}

function bTela_(id, aba, meta, textos) {
  return { id: id, aba: aba, moldura: 'tela', blocos: [{ tipo: 'meta', texto: meta }].concat(textos.map(function (t) { return { tipo: 'texto', texto: t }; })) };
}
function bCaderno_(id, aba, meta, textos) {
  return { id: id, aba: aba, moldura: 'caderno', blocos: [{ tipo: 'meta', texto: meta }].concat(textos.map(function (t) { return { tipo: 'texto', texto: t }; })) };
}

function casosAno_() {
  const L = [];
  const NAO = "isn't", NAOS = "aren't";

  // ======================================================== OUTUBRO ★ e ★★ (a ★★★ está em CasosPadrao.gs)

  // ---------- 6º · The Lost Backpack (rotina, horas, dias, I play)
  L.push(aCaso_('6º', 'a6', '2026-10', '#01', 'The Lost Backpack', 1, 'Hi, agent! We found a [[backpack|mochila]]. Let\'s learn the clues!', [], [
    bFiguras_([['⚽', ['play soccer', 'swim'], 0], ['🏊', ['read', 'swim'], 1], ['⏰', ['get up', 'go to bed'], 0], ['🏫', ['go to school', 'play'], 0]],
      ['==play soccer== = jogar futebol · ==swim== = nadar', '==get up== = levantar · ==go to school== = ir à escola'], 'vocabulário: rotina'),
    bOuvir_([['I play soccer on Monday.', ['MON', 'FRI'], 0, 'pilulas'], ['I get up at six thirty.', ['🕡', '🕖'], 0]],
      ['==Monday== = MON', '==six thirty== = 6:30 = 🕡'], 'compreensão oral: dias e horas'),
    bBlocos_('Complete the sentence', 'Complete the sentence.', 'Com I (eu), o verbo fica sem -s: I play.', [
      ['⚽', 'I ___ soccer.', ['play', 'plays'], ['play'], { plays: 'With I → PLAY (no -s).' }],
      ['⏰', 'I ___ up at 6:30.', ['get', 'gets'], ['get'], { gets: 'With I → GET (no -s).' }],
    ], ['I + verbo sem -s', 'I ==play== · I ==get== up'], 'rotina (I + verbo)'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI19'], ['I get up at ', 'dizer a que horas se levanta.', 'I get up at seven o\'clock.', 'rotina e horas']));

  L.push(aCaso_('6º', 'a6', '2026-10', '#01', 'The Lost Backpack', 2, 'Hi, agent! We found a [[backpack|mochila]]. Whose is it? Read the clues!', [
    { id: 'A', aba: 'A · The backpack', blocos: [{ tipo: 'semana', titulo: 'MY WEEK', dias: [['MON', '⚽'], ['TUE', ''], ['WED', '📘'], ['THU', ''], ['FRI', '🏊']] }, { tipo: 'itens', itens: [['⏰', '[[alarm clock|despertador]]: 6:30']] }] },
    bMsg_('leo', 'Leo', 'I [[get up|levanto]] at 6:30. I play soccer on Mondays. I swim on Fridays.'),
    bAudio_('paulo', 'Mr. Paulo', "Hello! I'm Paulo, the school janitor. I found a backpack on Monday, near the soccer field."),
  ], [
    bLerOuvir_([['Leo plays soccer on…', ['Mondays', 'Tuesdays', 'Fridays'], 0], ['Paulo found the backpack…', ['near the soccer field', 'in the library', 'in the cafeteria'], 0]],
      ['Leo says: "I play soccer on ==Mondays==."', 'Paulo says: "==near the soccer field=="'], 'localizar informação'),
    bBlocos_('Routine verbs', 'Complete the sentences.', 'Com I/we, o verbo fica sem -s.', [
      ['⏰', 'I ___ up at 6:30.', ['get', 'gets', 'getting'], ['get'], { gets: 'With I → GET.' }],
      ['🏊', 'I ___ on Fridays.', ['swim', 'swims', 'swimming'], ['swim'], { swims: 'With I → SWIM.' }],
      ['⚽', 'We ___ soccer on Mondays.', ['play', 'plays', 'playing'], ['play'], { plays: 'With WE → PLAY.' }],
    ], ['I / we → verbo sem -s', 'We ==play== soccer.'], 'rotina (I/we + verbo)'),
    { titulo: 'What time is it?', tipo: 'Clocks', onomatopeia: 'TICK!',
      passos: [['👀', 'Look at the clocks.', 'Olhe os relógios.'], ['🧩', 'Put the right time.', 'Toque num bloco para colocar o horário embaixo do relógio.']],
      dicas: ['The **short** hand shows the hour. The **long** hand shows the minutes.', "Long hand on 6 = ==thirty==. Long hand on 12 = ==o'clock==."],
      partes: [{ tipo: 'associar', alvos: [{ relogio: [6, 30], rotulo: 'Leo gets up', resposta: 1 }, { relogio: [5, 0], rotulo: 'Paulo found the bag', resposta: 0 }], blocos: ["five o'clock", 'six thirty', "seven o'clock"] }],
      solucao: "Leo: **six thirty** · Paulo: **five o'clock**",
      etiquetas: [{ codigo: 'EF06LI17', foco: 'horas' }] },
  ], ['EF06LI09', 'EF06LI19', 'EF06LI17'], ['I get up at ', 'contar a que horas se levanta e um esporte que pratica.', 'I get up at seven. I play soccer on Tuesdays.', 'rotina e horas']));

  // ---------- 7º · The Mixed-Up Diary (simple past, in/on/at)
  L.push(aCaso_('7º', 'a7', '2026-10', '#01', 'The Mixed-Up Diary', 1, 'Hi, detective! Our [[time machine|máquina do tempo]] has an [[error|erro]]. Let\'s learn the past!', [], [
    bFiguras_([['✈️', ['flew', 'swam'], 0], ['🚶', ['walked', 'ate'], 0], ['📚', ['studied', 'flew'], 0], ['👀', ['walked', 'saw'], 1]],
      ['==flew== = voou · ==walked== = caminhou', '==studied== = estudou · ==saw== = viu'], 'vocabulário: verbos no passado'),
    bOuvir_([['Nina flew a plane.', ['✈️', '🚲'], 0], ['Nina studied at school.', ['🏊', '📚'], 1]],
      ['==flew== = ✈️ · ==studied== = 📚', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: passado'),
    bBlocos_('Past or present?', 'Complete in the past.', 'No passado: walk → walked, fly → flew.', [
      ['🚶', 'Yesterday I ___ to school.', ['walked', 'walk'], ['walked'], { walk: 'Yesterday = past → WALKED.' }],
      ['✈️', 'In 1950, Nina ___ a plane.', ['flew', 'fly'], ['flew'], { fly: 'In 1950 = past → FLEW.' }],
    ], ['passado: ==walked==, ==flew==', 'yesterday / in 1950 → passado'], 'simple past'),
  ], ['EF07LI15', 'EF07LI04', 'EF07LI15'], ['Yesterday I ', 'contar algo que fez ontem.', 'Yesterday I played soccer.', 'simple past']));

  L.push(aCaso_('7º', 'a7', '2026-10', '#01', 'The Mixed-Up Diary', 2, 'Hi, detective! Our [[time machine|máquina do tempo]] has an [[error|erro]]. Read the clues!', [
    { id: 'A', aba: 'A · Timeline', blocos: [{ tipo: 'linha', itens: [['1930', 'Nina was [[born|nasceu]] in Joinville.'], ['1948', 'She studied at a [[flight school|escola de aviação]].'], ['1950', 'She flew alone for the first time.']] }] },
    bCaderno_('B', "B · Nina's diary", 'May 5th, 1950', ['Today I flew alone! I walked to the [[airfield|campo de pouso]] at 5 a.m. I was so happy!']),
    bAudio_('pedro', 'Pedro', "Hi! I'm Pedro, Nina's grandson. In 1948, my grandmother studied at a flight school. She flew alone in 1950."),
  ], [
    bLerOuvir_([['When did Nina fly alone?', ['in 1950', 'in 1948', 'in 1930'], 0], ['What did Nina do in 1948?', ['She studied.', 'She flew alone.', 'She was born.'], 0]],
      ['The diary says: ==1950==.', 'Pedro says: "In 1948, she ==studied==."'], 'localizar informação'),
    bBlocos_('Past verbs', 'Complete in the past.', 'Regulares: +ED (walked, studied). Irregulares mudam (fly → flew).', [
      ['🚶', 'Nina ___ to the airfield.', ['walked', 'walk', 'walks'], ['walked'], { walk: 'Past → WALKED.' }],
      ['✈️', 'She ___ over Joinville.', ['flew', 'fly', 'flies'], ['flew'], { fly: 'Past → FLEW (irregular).' }],
      ['📚', 'She ___ at a flight school.', ['studied', 'study', 'studies'], ['studied'], { study: 'Past → STUDIED.' }],
    ], ['regular: +==ed== · irregular: muda (fly → ==flew==)', 'study → ==studied=='], 'simple past regular × irregular'),
    bBlocos_('In, on or at?', 'Choose IN, ON or AT.', 'in + ano · on + data · at + hora.', [
      ['', 'Nina flew alone ___ 1950.', ['in', 'on', 'at'], ['in'], { on: 'Years → IN.', at: 'Years → IN.' }],
      ['', 'She flew ___ May 5th.', ['on', 'in', 'at'], ['on'], { in: 'Dates → ON.', at: 'Dates → ON.' }],
      ['', 'She walked to the airfield ___ 5 a.m.', ['at', 'on', 'in'], ['at'], { on: 'Times → AT.', in: 'Times → AT.' }],
    ], ['==in== 1950 · ==on== May 5th · ==at== 5 a.m.', 'Hora → ==at=='], 'preposições in/on/at'),
  ], ['EF07LI09', 'EF07LI15', 'EF07LI15'], ['In 2020, I ', 'contar algo que fez num ano do passado.', 'In 2020, I visited my grandmother.', 'simple past + in/on/at']));

  // ---------- 8º · Message from 2050 (prefixos e sufixos)
  L.push(aCaso_('8º', 'a8', '2026-10', '#01', 'Message from 2050', 1, 'Hi, scientist! A [[message|mensagem]] from 2050 arrived. Let\'s learn new words!', [], [
    bFiguras_([['😀', ['happy', 'unhappy'], 0], ['😞', ['happy', 'unhappy'], 1], ['♻️', ['recycle', 'careless'], 0], ['🚗🙅', ['driverless', 'helpful'], 0]],
      ['==unhappy== = un + happy = não feliz', '==recycle== = reciclar · ==driverless== = sem motorista'], 'prefixos e sufixos'),
    bOuvir_([['Cars are driverless.', ['driverless', 'careful'], 0, 'pilulas'], ['Please recycle.', ['unhappy', 'recycle'], 1, 'pilulas']],
      ['Ouça a palavra e procure as letras iguais.', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: palavras novas'),
    bBlocos_('Build the word', 'Choose the right word.', 'un- = não · re- = de novo.', [
      ['😞', 'not happy = ___', ['unhappy', 'rehappy'], ['unhappy'], { rehappy: 'NOT happy → UN-happy.' }],
      ['🔁', 'use again = ___', ['reuse', 'unuse'], ['reuse'], { unuse: 'AGAIN → RE-use.' }],
    ], ['==un-== = não · ==re-== = de novo', 'use again → ==reuse=='], 'prefixos un-/re-'),
  ], ['EF08LI13', 'EF08LI03', 'EF08LI13'], ['In 2050, people will ', 'fazer uma previsão para 2050.', 'In 2050, people will recycle everything.', 'will + prefixos/sufixos']));

  L.push(aCaso_('8º', 'a8', '2026-10', '#01', 'Message from 2050', 2, 'Hi, scientist! A [[message|mensagem]] from 2050 arrived, but it is [[broken|quebrada]]. Read the clues!', [
    bTela_('A', 'A · Message', 'INCOMING · YEAR 2050 · SIGNAL 34%', ['Hello from 2050! Life is wonder####. Cars are driver####. Please ##cycle!']),
    { id: 'B', aba: 'B · Notebook', moldura: 'caderno', blocos: [{ tipo: 'itens', itens: [['🧡', 'care → care==ful== (full of care)'], ['💔', 'care → care==less== (without care)'], ['😞', 'happy → ==un==happy (not happy)'], ['🔁', 'use → ==re==use (use again)']] }] },
    bAudio_('ravi', 'Dr. Ravi', "Hello from 2050! Life is wonderful. Cars are driverless. But the oceans are still in danger. Please recycle!"),
  ], [
    bLerOuvir_([['What are cars like in 2050?', ['driverless', 'careless', 'helpful'], 0], ['What is still in danger?', ['the oceans', 'the cars', 'the plastic'], 0]],
      ['Ravi says: "Cars are ==driverless=="', '"the ==oceans== are still in danger"'], 'localizar informação'),
    bBlocos_('Fix the message', 'Complete the sentences.', 'Use o caderno (pista B): -ful = cheio de · -less = sem · re- = de novo.', [
      ['', 'Life is ___.', ['wonderful', 'wonderless', 'unwonder'], ['wonderful'], { wonderless: 'Life is good → FULL of wonder → -FUL.' }],
      ['', 'Please ___ plastic.', ['recycle', 'uncycle', 'cycleful'], ['recycle'], { uncycle: 'We want to use it AGAIN → RE-.' }],
      ['', "Don't be ___ with the planet!", ['careless', 'careful', 'uncare'], ['careless'], { careful: "Don't be WITHOUT care → don't be CARELESS." }],
    ], ['-ful = cheio de · -less = sem · re- = de novo', 'wonder + ==ful== = wonderful'], 'prefixos e sufixos'),
    { titulo: 'Word builder', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['👀', 'Read notebook B.', 'Leia o caderno (pista B).'], ['🧩', 'Match the parts.', 'Coloque o significado embaixo de cada parte.']],
      dicas: ['Read the words in parentheses in notebook B.', 'careless = ==without== care'],
      partes: [{ tipo: 'associar', alvos: [{ texto: 'un-', resposta: 1 }, { texto: 're-', resposta: 2 }, { texto: '-less', resposta: 0 }], blocos: ['without', 'not', 'again'] }],
      solucao: '**un-** = not · **re-** = again · **-less** = without',
      etiquetas: [{ codigo: 'EF08LI13', foco: 'prefixos e sufixos' }] },
  ], ['EF08LI05', 'EF08LI13', 'EF08LI13'], ['In 2050, people will ', 'fazer uma previsão para 2050 com uma palavra com prefixo ou sufixo.', 'In 2050, people will be careful with the oceans.', 'will + prefixos/sufixos']));

  // ---------- 9º · The Cancelled Concert (fato × opinião, present perfect, since/for)
  L.push(aCaso_('9º', 'a9', '2026-10', '#01', 'The Cancelled Concert', 1, 'Hi, checker! A post about a [[concert|show]] is [[viral|muito compartilhado]]. Is it true?', [], [
    { titulo: 'Fact or opinion?', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👆', 'Click FACT or OPINION.', 'FACT = dá para conferir. OPINION = sentimento ou julgamento.']],
      dicas: ['Opinion words: ==best==, ==boring==, ==amazing==.', 'A day or a job can be checked → FACT.'],
      partes: [{ tipo: 'classificar', categorias: ['FACT', 'OPINION'], itens: [
        { texto: 'Lia is a singer.', resposta: 0 }, { texto: 'Lia is the best!', resposta: 1 },
        { texto: 'The show is on Saturday.', resposta: 0 }, { texto: 'The show is boring.', resposta: 1 }] }],
      solucao: '"the best" e "boring" são opiniões. Os outros são fatos.',
      etiquetas: [{ codigo: 'EF09LI06', foco: 'fato × opinião' }] },
    bOuvir_([['The show is on Saturday.', ['SAT', 'MON'], 0, 'pilulas'], ['Lia has arrived in Brazil.', ['🛬', '🛫'], 0]],
      ['==Saturday== = SAT', '==arrived== = chegou 🛬'], 'compreensão oral'),
    bBlocos_('Has or have?', 'Complete the sentences.', 'Present perfect: he/she HAS + particípio (visited, seen).', [
      ['🇧🇷', 'She ___ visited Brazil.', ['has', 'have'], ['has'], { have: 'She → HAS.' }],
      ['📱', 'I have ___ the post.', ['seen', 'see'], ['seen'], { see: 'have + particípio → SEEN.' }],
    ], ['she ==has== · I ==have==', 'have + ==seen== (particípio)'], 'present perfect'),
  ], ['EF09LI06', 'EF09LI07', 'EF09LI21-JO'], ['Lia Storm has ', 'escrever uma frase sobre a Lia no present perfect.', 'Lia Storm has arrived in Brazil.', 'present perfect']));

  L.push(aCaso_('9º', 'a9', '2026-10', '#01', 'The Cancelled Concert', 2, 'Hi, checker! A post about Lia Storm is [[viral|muito compartilhado]]. Check the clues!', [
    { id: 'A', aba: 'A · Viral post', moldura: 'celular', blocos: [{ tipo: 'perfil', avatar: { letra: 'B', cor: 'pop' }, nome: '@BreakingNowSC', meta: '2 hours ago' },
      { tipo: 'post', texto: 'BREAKING! Lia Storm has [[cancelled|cancelou]] her show! She has [[never|nunca]] visited Brazil!', selo: '12K SHARES' }] },
    { id: 'B', aba: "B · Lia's profile", moldura: 'celular', blocos: [{ tipo: 'perfil', avatar: { letra: 'L', cor: 'sun' }, nome: '@liastorm ✔', meta: 'official account' },
      { tipo: 'post', meta: 'Throwback', foto: 'Rio de Janeiro, 2023', texto: 'My first show in Brazil!' }] },
    bAudio_('marcos', 'Marcos · Arena', "Hi, I'm Marcos from the arena. We haven't cancelled the show. Lia has already arrived, and fans have waited since 2024."),
  ], [
    bLerOuvir_([['Has Lia visited Brazil before?', ['Yes, she has.', "No, she hasn't.", 'Yes, she is.'], 0], ['Has the arena cancelled the show?', ["No, it hasn't.", 'Yes, it has.', "No, it isn't."], 0]],
      ['Photo B: ==Rio de Janeiro, 2023==.', 'Marcos says: "We ==haven\'t cancelled== the show."'], 'evidências'),
    bBlocos_('Present perfect', 'Complete the sentences.', 'has/have + particípio (arrived, waited, visited).', [
      ['', 'Lia ___ arrived.', ['has', 'have', 'is'], ['has'], { have: 'Lia = she → HAS.' }],
      ['', 'Fans ___ waited since 2024.', ['have', 'has', 'are'], ['have'], { has: 'Fans = they → HAVE.' }],
      ['', 'She has ___ Brazil before.', ['visited', 'visit', 'visits'], ['visited'], { visit: 'has + particípio → VISITED.' }],
    ], ['he/she ==has== · they ==have== + particípio', 'has ==visited=='], 'present perfect'),
    bBlocos_('Since or for?', 'Choose SINCE or FOR.', 'SINCE = desde (quando começou) · FOR = por (quanto tempo).', [
      ['', 'Fans have waited ___ 2024.', ['since', 'for'], ['since'], { for: '2024 is WHEN it started → SINCE.' }],
      ['', 'The arena has been ready ___ two days.', ['for', 'since'], ['for'], { since: 'two days is HOW LONG → FOR.' }],
    ], ['==since== + quando começou · ==for== + quanto tempo', 'two days → ==for=='], 'since × for'),
  ], ['EF09LI07', 'EF09LI21-JO', 'EF09LI020-JO'], ['Lia Storm has ', 'escrever a manchete da checagem no present perfect.', "Lia Storm hasn't cancelled her show!", 'present perfect']));

  // ======================================================== NOVEMBRO (★, ★★, ★★★)

  // ---------- 6º · The Missing Cat (simple present 3ª pessoa: he/she/it + s, does/doesn't)
  L.push(aCaso_('6º', 'a6', '2026-11', '#02', 'The Missing Cat', 1, 'Hi, agent! A [[cat|gato]] is [[missing|desaparecido]]. Let\'s learn about people\'s routines!', [], [
    bFiguras_([['🍳', ['cooks', 'sleeps'], 0], ['😴', ['runs', 'sleeps'], 1], ['📺', ['watches TV', 'reads'], 0], ['🚌', ['takes the bus', 'swims'], 0]],
      ['==cooks== = cozinha · ==sleeps== = dorme', '==watches TV== = assiste TV · ==takes the bus== = pega o ônibus'], 'vocabulário: rotina (3ª pessoa)'),
    bOuvir_([['She walks the dog every day.', ['🐕', '🐈'], 0], ['He takes the bus at seven.', ['🚲', '🚌'], 1]],
      ['==dog== = 🐕 · ==bus== = 🚌', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: rotina'),
    bBlocos_('Add -s', 'Complete with the verb.', 'Com he/she (ele/ela), o verbo ganha -S: she watches.', [
      ['👧📺', 'Ana ___ TV.', ['watches', 'watch'], ['watches'], { watch: 'Ana = she → WATCHES.' }],
      ['👦🚌', 'Leo ___ the bus.', ['takes', 'take'], ['takes'], { take: 'Leo = he → TAKES.' }],
    ], ['he/she → verbo + ==s==', 'Ana ==watches== · Leo ==takes=='], 'simple present (he/she + -s)'),
  ], ['EF06LI19', 'EF06LI04', 'EF06LI19'], ['My mother ', 'contar uma coisa que alguém da família faz todo dia.', 'My mother cooks dinner every day.', 'simple present (3ª pessoa)']));

  const gato2 = [
    { id: 'A', aba: 'A · Poster', blocos: [{ tipo: 'manchete', texto: 'LOST CAT!' }, { tipo: 'itens', itens: [['🐈', 'Mimi'], ['🐟', 'She eats fish at 6 p.m.'], ['🛋️', 'She sleeps on the [[sofa|sofá]].']] }] },
    bMsg_('bia', 'Bia', 'My [[neighbour|vizinha]] Ana has a cat. Ana [[feeds|alimenta]] her cat at 6 p.m. every day.'),
    bAudio_('paulo', 'Mr. Paulo', "I see a grey cat every morning. It sleeps in the school garden at eight o'clock."),
  ];
  L.push(aCaso_('6º', 'a6', '2026-11', '#02', 'The Missing Cat', 2, 'Hi, agent! A [[cat|gato]] is [[missing|desaparecido]]. Read the clues!', gato2, [
    bLerOuvir_([['Who has a cat?', ['Ana', 'Bia', 'Paulo'], 0], ['In the morning, the cat sleeps…', ['in the school garden', 'on the bus', 'in the library'], 0]],
      ['Bia says: "==Ana== has a cat."', 'Paulo says: "It sleeps in the ==school garden=="'], 'localizar informação'),
    bBlocos_('Add -s', 'Complete the sentences.', 'Com he/she/it, o verbo ganha -S.', [
      ['🐟', 'Ana ___ her cat at 6 p.m.', ['feeds', 'feed', 'feeding'], ['feeds'], { feed: 'Ana = she → FEEDS.' }],
      ['😴', 'The cat ___ in the garden.', ['sleeps', 'sleep', 'sleeping'], ['sleeps'], { sleep: 'The cat = it → SLEEPS.' }],
      ['👀', 'Paulo ___ the cat every morning.', ['sees', 'see', 'seeing'], ['sees'], { see: 'Paulo = he → SEES.' }],
    ], ['he/she/it → verbo + ==s==', 'The cat ==sleeps=='], 'simple present (3ª pessoa)'),
    bBlocos_("Does or doesn't?", 'Complete the sentences.', "DOES = pergunta com he/she/it · DOESN'T = não (he/she/it).", [
      ['🍕', 'The cat ___ eat pizza.', ["doesn't", "don't", NAO], ["doesn't"], { "don't": "The cat = it → DOESN'T." }],
      ['🐈', '___ Ana have a cat? Yes, she does.', ['Does', 'Do', 'Is'], ['Does'], { do: 'Ana = she → DOES.' }],
    ], ["he/she/it → ==does== / ==doesn't==", "The cat ==doesn't== eat pizza."], "does / doesn't"),
  ], ['EF06LI09', 'EF06LI19', 'EF06LI19'], ['My friend ', 'contar o que um amigo faz todo dia.', 'My friend walks to school every day.', 'simple present (3ª pessoa)']));

  L.push(aCaso_('6º', 'a6', '2026-11', '#02', 'The Missing Cat', 3, "Hi, agent! A lost cat is at the agency. Who is the [[owner|dono]]?", [
    bCaderno_('A', 'A · Poster', 'LOST CAT: MIMI', ['She eats fish. She sleeps a lot. Her owner walks to school every day.']),
    bFichas_([['ana', 'ANA', ['has a cat', 'takes the bus to school']], ['bia', 'BIA', ['has a cat', 'walks to school']], ['leo', 'LEO', ['has a dog', 'walks to school']]]),
    bAudio_('paulo', 'Mr. Paulo', "Mimi eats fish every evening. Her owner always walks to school with her friend Leo."),
  ], [
    bQuem_('Who is the owner?', 'Click the owner.', 'Clique na dona da gata.',
      [{ personagem: 'ana', texto: 'ANA' }, { personagem: 'bia', texto: 'BIA' }, { personagem: 'leo', texto: 'LEO' }], 1,
      { 0: 'Ana takes the bus. The owner walks.', 2: 'Leo has a dog, not a cat.' },
      ['The owner ==walks== to school and has a ==cat==.', 'Ana takes the bus. Leo has a dog.'], "It's **Bia**: she has a cat and walks to school!"),
    bOuvirPista_("Paulo's message", [['What does Mimi eat?', ['fish', 'pizza', 'apples'], 0], ['How does the owner go to school?', ['She walks.', 'She takes the bus.', 'She rides a bike.'], 0]],
      ['Listen for ==eats== and ==walks==.', 'Paulo says: "Her owner always ==walks== to school."'], 'compreensão oral: rotina'),
    bBlocos_('Add -s or not?', 'Complete the sentences.', "he/she → verbo + S · doesn't + verbo sem S.", [
      ['', 'Bia ___ to school.', ['walks', 'walk', 'walking'], ['walks'], { walk: 'Bia = she → WALKS.' }],
      ['', 'Ana ___ the bus.', ['takes', 'take', 'taking'], ['takes'], { take: 'Ana = she → TAKES.' }],
      ['', 'Leo ___ have a cat.', ["doesn't", "don't", NAO], ["doesn't"], { "don't": "Leo = he → DOESN'T." }],
    ], ['he/she → +==s== · he/she ==doesn\'t== + verbo', "Leo ==doesn't== have a cat."], 'simple present (3ª pessoa)'),
    bVF_([['Bia walks to school.', true], ['Leo has a cat.', false], ['Mimi eats fish.', true], ['Ana walks to school.', false]],
      ['Check clues B and C.', 'Leo has a ==dog==. Ana takes the ==bus==.'], 'simple present (3ª pessoa)'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI19', 'EF06LI19'], ['My best friend ', 'descrever a rotina de um amigo.', "My best friend plays soccer. He doesn't like math.", 'simple present (3ª pessoa)']));

  // ---------- 7º · The Old Champion (can/could)
  L.push(aCaso_('7º', 'a7', '2026-11', '#02', 'The Old Champion', 1, 'Hi, detective! Let\'s travel to 1980 and learn about [[abilities|habilidades]]!', [], [
    bFiguras_([['🏊', ['swim', 'fly'], 0], ['🚲', ['sing', 'ride a bike'], 1], ['🎸', ['play the guitar', 'cook'], 0], ['🧗', ['read', 'climb'], 1]],
      ['==swim== = nadar · ==ride a bike== = andar de bicicleta', '==play the guitar== = tocar violão · ==climb== = escalar'], 'vocabulário: habilidades'),
    bOuvir_([['When I was young, I could swim fast.', ['🏊', '🚲'], 0], ['Now I can play the guitar.', ['🧗', '🎸'], 1]],
      ['==swim== = 🏊 · ==guitar== = 🎸', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: can/could'),
    bBlocos_('Can or could?', 'Choose CAN or COULD.', 'CAN = agora (consegue) · COULD = no passado (conseguia).', [
      ['🏊', 'Now I ___ swim.', ['can', 'could'], ['can'], { could: 'NOW → CAN.' }],
      ['🏃', 'In 1980, I ___ run fast.', ['could', 'can'], ['could'], { can: 'In 1980 = past → COULD.' }],
    ], ['agora ==can== · passado ==could==', 'In 1980 → ==could=='], 'can / could'),
  ], ['EF07LI20', 'EF07LI04', 'EF07LI20'], ['When I was a kid, I could ', 'contar algo que conseguia fazer quando era criança.', 'When I was a kid, I could climb trees.', 'can/could']));

  L.push(aCaso_('7º', 'a7', '2026-11', '#02', 'The Old Champion', 2, 'Hi, detective! An old [[newspaper|jornal]] talks about a [[champion|campeão]]. Read the clues!', [
    { id: 'A', aba: 'A · Newspaper', blocos: [{ tipo: 'meta', texto: 'Joinville Daily (fictional) · 1980' }, { tipo: 'manchete', texto: 'LOCAL BOY WINS SWIM RACE!' }, { tipo: 'texto', texto: 'Tom Weber, 12, could swim 100 meters in one minute.' }] },
    bMsg_('tom', 'Tom (today)', "I'm 58 now. I can't swim fast now, but I can play the guitar!"),
    bAudio_('pedro', 'Pedro', "My uncle Tom could run fast, but he couldn't ride a bike when he was a kid."),
  ], [
    bLerOuvir_([['In 1980, Tom could…', ['swim fast', 'play the guitar', 'ride a bike'], 0], ['Could Tom ride a bike as a kid?', ["No, he couldn't.", 'Yes, he could.', 'Yes, he can.'], 0]],
      ['Newspaper: Tom ==could swim== fast.', 'Pedro says: "he ==couldn\'t== ride a bike"'], 'localizar informação'),
    bBlocos_('Can or could?', 'Complete the sentences.', "CAN/CAN'T = agora · COULD/COULDN'T = no passado.", [
      ['', 'In 1980, Tom ___ swim fast.', ['could', 'can', 'cans'], ['could'], { can: 'In 1980 = past → COULD.' }],
      ['', 'Now he ___ swim fast.', ["can't", "couldn't", 'can'], ["can't"], { "couldn't": "NOW → CAN'T." }],
      ['', 'Now he ___ play the guitar.', ['can', 'could', "can't"], ['can'], { could: 'NOW → CAN.' }],
    ], ['agora ==can / can\'t== · passado ==could / couldn\'t==', 'Now → ==can=='], 'can / could'),
    { titulo: 'Now or past?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: expressões de AGORA (can) ou do PASSADO (could). Arraste ou toque.']],
      dicas: ['==Now==, ==today==, ==this year== → can', '==In 1980==, ==ten years ago== → could'],
      partes: [{ tipo: 'separar', caixas: ['NOW → can', 'PAST → could'], itens: [
        { texto: 'Today', resposta: 0 }, { texto: 'In 1980', resposta: 1 }, { texto: 'Now', resposta: 0 },
        { texto: 'When I was a kid', resposta: 1 }, { texto: 'This year', resposta: 0 }, { texto: 'Ten years ago', resposta: 1 }] }],
      solucao: '**NOW**: today, now, this year · **PAST**: in 1980, when I was a kid, ten years ago',
      etiquetas: [{ codigo: 'EF07LI20', foco: 'can × could (tempo)' }] },
  ], ['EF07LI09', 'EF07LI20', 'EF07LI20'], ['When I was a kid, I could ', 'comparar o que podia fazer antes e o que pode fazer agora.', "When I was a kid, I couldn't swim. Now I can!", 'can/could']));

  L.push(aCaso_('7º', 'a7', '2026-11', '#02', 'The Old Champion', 3, 'Hi, detective! Who was the [[champion|campeão]] of 1980? Check the clues!', [
    bCaderno_('A', 'A · Note', 'Photo from 1980, back side', ["The champion could swim fast and could ride a bike. He couldn't play the guitar."]),
    bFichas_([['tom', 'TOM', ['could: swim', "couldn't: ride a bike", 'now can: play the guitar']], ['paulo', 'PAULO', ['could: swim, ride a bike', "couldn't: play the guitar"]], ['clock', 'CAPTAIN CLOCK', ['could: ride a bike, play the guitar', "couldn't: swim"]]]),
    bAudio_('nina', 'Nina', "In 1980, my neighbour Paulo could swim very fast. He couldn't play the guitar, but now he can!"),
  ], [
    bQuem_('Who is the champion?', 'Click the person.', 'Clique no campeão de 1980.',
      [{ personagem: 'tom', texto: 'TOM' }, { personagem: 'paulo', texto: 'PAULO' }, { personagem: 'clock', texto: 'CLOCK' }], 1,
      { 0: "Tom couldn't ride a bike.", 2: "Captain Clock couldn't swim." },
      ['The champion could ==swim== AND ==ride a bike==.', "Tom couldn't ride a bike. Clock couldn't swim."], "It's **Paulo**: he could swim and ride a bike!"),
    bOuvirPista_("Nina's message", [['What could Paulo do in 1980?', ['swim very fast', 'play the guitar', 'fly a plane'], 0], ['Can Paulo play the guitar now?', ['Yes, he can.', "No, he can't.", "No, he couldn't."], 0]],
      ['Listen for ==could== and ==now==.', 'Nina says: "He couldn\'t play the guitar, but ==now he can=="'], 'compreensão oral: can/could'),
    bBlocos_("Can, could or couldn't?", 'Complete the sentences.', 'Confira as fichas (pista B).', [
      ['', 'In 1980, Paulo ___ ride a bike.', ['could', 'can', "couldn't"], ['could'], { "couldn't": 'Clue B: Paulo COULD ride a bike.' }],
      ['', 'Tom ___ ride a bike in 1980.', ["couldn't", 'could', 'can'], ["couldn't"], { could: "Clue B: Tom COULDN'T ride a bike." }],
      ['', 'Now Paulo ___ play the guitar.', ['can', 'could', "can't"], ['can'], { could: 'NOW → CAN.' }],
    ], ["passado ==could / couldn't== · agora ==can==", "Tom ==couldn't== ride a bike."], 'can / could'),
    bVF_([['Paulo could swim fast.', true], ['Tom could ride a bike.', false], ['Paulo can play the guitar now.', true], ['Captain Clock could swim.', false]],
      ['Check clues B and C.', "Tom ==couldn't== ride a bike. Clock ==couldn't== swim."], 'can / could'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI20', 'EF07LI20'], ['When I was a kid, I ', 'contar algo que conseguia ou não conseguia fazer quando era criança.', "When I was a kid, I couldn't ride a bike.", 'can/could']));

  // ---------- 8º · Robots at the Lab (pronomes relativos who/which/that/whose)
  L.push(aCaso_('8º', 'a8', '2026-11', '#02', 'Robots at the Lab', 1, 'Hi, scientist! Our lab has new [[robots|robôs]]. Let\'s meet them!', [], [
    bFiguras_([['👩‍🔬', ['who', 'which'], 0], ['🤖', ['who', 'which'], 1], ['🧑‍🚀', ['who', 'which'], 0], ['🚗', ['who', 'which'], 1]],
      ['==who== = para pessoas 👩‍🔬', '==which== = para coisas e animais 🤖'], 'pronomes relativos who/which'),
    bOuvir_([['She is the scientist who works in the lab.', ['👩‍🔬', '🤖'], 0], ['This is the robot which cleans the lab.', ['🧑', '🤖'], 1]],
      ['==scientist== = 👩‍🔬 · ==robot== = 🤖', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Who or which?', 'Choose WHO or WHICH.', 'WHO = pessoa · WHICH = coisa.', [
      ['👩‍🔬', 'Dr. Lu is the scientist ___ works here.', ['who', 'which'], ['who'], { which: 'A scientist is a person → WHO.' }],
      ['🤖', 'This is the robot ___ cooks.', ['which', 'who'], ['which'], { who: 'A robot is a thing → WHICH.' }],
    ], ['pessoa → ==who== · coisa → ==which==', 'robot → ==which=='], 'who / which'),
  ], ['EF08LI17', 'EF08LI03', 'EF08LI17'], ['I have a friend who ', 'descrever um amigo usando who.', 'I have a friend who plays the guitar.', 'pronomes relativos']));

  L.push(aCaso_('8º', 'a8', '2026-11', '#02', 'Robots at the Lab', 2, 'Hi, scientist! Who does what in the lab? Read the clues!', [
    { id: 'A', aba: 'A · Lab list', blocos: [{ tipo: 'itens', itens: [['👩‍🔬', 'Dr. Lu — scientist, works in the lab'], ['🤖', 'R-2 — robot, cleans the floor'], ['🤖', 'Z-9 — robot, cooks lunch'], ['🧑‍🚀', 'Ravi — astronaut, lives in 2050']] }] },
    bMsg_('lu', 'Dr. Lu', 'The robot which cooks lunch is Z-9. The person who lives in 2050 is Ravi.'),
    bAudio_('ravi', 'Dr. Ravi', "Hello! I'm the astronaut who sends messages from the future. My friend whose robot is R-2 is Dr. Lu."),
  ], [
    bLerOuvir_([['Which robot cooks lunch?', ['Z-9', 'R-2', 'Ravi'], 0], ['Whose robot is R-2?', ["Dr. Lu's", "Ravi's", "Z-9's"], 0]],
      ['Dr. Lu says: "The robot which cooks lunch is ==Z-9=="', 'Ravi says: "My friend ==whose== robot is R-2 is Dr. Lu."'], 'localizar informação'),
    bBlocos_('Who, which or whose?', 'Complete the sentences.', 'WHO = pessoa · WHICH = coisa · WHOSE = de quem (posse).', [
      ['', 'Ravi is the astronaut ___ lives in 2050.', ['who', 'which', 'whose'], ['who'], { which: 'An astronaut is a person → WHO.' }],
      ['', 'Z-9 is the robot ___ cooks lunch.', ['which', 'who', 'whose'], ['which'], { who: 'A robot is a thing → WHICH.' }],
      ['', 'Dr. Lu is the scientist ___ robot is R-2.', ['whose', 'who', 'which'], ['whose'], { who: 'The robot belongs to Dr. Lu → WHOSE.' }],
    ], ['==who== pessoa · ==which== coisa · ==whose== de quem', '"Dr. Lu, ==whose== robot is R-2"'], 'who / which / whose'),
    { titulo: 'People or things?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: pessoas (WHO) ou coisas (WHICH). Arraste ou toque.']],
      dicas: ['People → ==who==', 'Things and robots → ==which=='],
      partes: [{ tipo: 'separar', caixas: ['WHO (people)', 'WHICH (things)'], itens: [
        { texto: 'scientist', resposta: 0 }, { texto: 'robot', resposta: 1 }, { texto: 'teacher', resposta: 0 },
        { texto: 'car', resposta: 1 }, { texto: 'astronaut', resposta: 0 }, { texto: 'computer', resposta: 1 }] }],
      solucao: '**WHO**: scientist, teacher, astronaut · **WHICH**: robot, car, computer',
      etiquetas: [{ codigo: 'EF08LI17', foco: 'who × which' }] },
  ], ['EF08LI03', 'EF08LI17', 'EF08LI17'], ['I have a friend who ', 'descrever uma pessoa e um objeto usando who e which.', 'I have a phone which takes great photos.', 'pronomes relativos']));

  L.push(aCaso_('8º', 'a8', '2026-11', '#02', 'Robots at the Lab', 3, "Hi, scientist! Someone took Dr. Lu's [[notebook|caderno]]. Which robot was it?", [
    bTela_('A', 'A · Security note', 'LAB SECURITY · NIGHT REPORT', ['The robot which took the notebook has blue arms. It is not the robot that cooks.']),
    { id: 'B', aba: 'B · Robots', blocos: [{ tipo: 'itens', itens: [['🤖', 'R-2: blue arms, cleans the floor'], ['🤖', 'Z-9: blue arms, cooks lunch'], ['🤖', 'M-5: red arms, cleans the windows']] }] },
    bAudio_('lu', 'Dr. Lu', "The robot which cleans the floor came to my office at night. I think the thief is the robot whose name starts with R."),
  ], [
    bQuem_('Which robot took it?', 'Click the robot.', 'Clique no robô que pegou o caderno.',
      [{ emoji: '🤖', texto: 'R-2' }, { emoji: '🤖', texto: 'Z-9' }, { emoji: '🤖', texto: 'M-5' }], 0,
      { 1: 'Z-9 is the robot that cooks.', 2: "M-5's arms are red." },
      ['The thief has ==blue arms== and does ==not cook==.', 'Z-9 cooks. M-5 has red arms.'], "It's **R-2**: blue arms, and it doesn't cook!", 'figuras'),
    bOuvirPista_("Dr. Lu's message", [['When did the robot come to the office?', ['at night', 'in the morning', 'at lunch'], 0], ["The thief's name starts with…", ['R', 'Z', 'M'], 0]],
      ['Listen for ==night== and ==starts with==.', 'Dr. Lu says: "whose name starts with ==R=="'], 'compreensão oral'),
    bBlocos_('Who, which or whose?', 'Complete the sentences.', 'WHO = pessoa · WHICH = coisa · WHOSE = de quem.', [
      ['', 'R-2 is the robot ___ cleans the floor.', ['which', 'who', 'whose'], ['which'], { who: 'A robot is a thing → WHICH.' }],
      ['', 'Dr. Lu is the scientist ___ notebook was taken.', ['whose', 'which', 'who'], ['whose'], { who: 'The notebook belongs to her → WHOSE.' }],
      ['', 'Ravi is the man ___ sends messages.', ['who', 'which', 'whose'], ['who'], { which: 'A man is a person → WHO.' }],
    ], ['==who== pessoa · ==which== coisa · ==whose== de quem', 'the scientist ==whose== notebook…'], 'who / which / whose'),
    bVF_([['R-2 has blue arms.', true], ['M-5 cooks lunch.', false], ['Z-9 has blue arms.', true], ['The thief is the robot whose arms are red.', false]],
      ['Check clue B.', 'Z-9 ==cooks== lunch. The thief has ==blue== arms.'], 'pronomes relativos'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI17', 'EF08LI17'], ['The robot which ', 'descrever um robô ou objeto usando which/that.', 'The robot which cleans my room is very fast.', 'pronomes relativos']));

  // ---------- 9º · The Record Breaker (present perfect: ever/never/already/yet, since/for)
  L.push(aCaso_('9º', 'a9', '2026-11', '#02', 'The Record Breaker', 1, "Hi, checker! A post says a student broke a [[world record|recorde mundial]]. Let's check!", [], [
    bFiguras_([['👀', ['seen', 'see'], 0], ['🍽️', ['eat', 'eaten'], 1], ['✍️', ['written', 'write'], 0], ['🎤', ['sing', 'sung'], 1]],
      ['particípio: see → ==seen== · eat → ==eaten==', 'write → ==written== · sing → ==sung=='], 'present perfect (particípios)'),
    bOuvir_([['I have never seen snow.', ['❄️', '☀️'], 0], ['She has already eaten lunch.', ['🛌', '🍽️'], 1]],
      ['==snow== = neve ❄️', '==eaten lunch== = almoçou 🍽️'], 'compreensão oral'),
    bBlocos_('Never or yet?', 'Complete the sentences.', 'NEVER = nunca · YET = ainda (no fim da pergunta).', [
      ['🏖️', 'I have ___ been to Rio.', ['never', 'yet'], ['never'], { yet: 'In the middle → NEVER (nunca).' }],
      ['📝', 'Have you finished your homework ___?', ['yet', 'already'], ['yet'], { already: 'At the end of a question → YET.' }],
    ], ['==never== = nunca · ==yet== = ainda (no fim)', 'Have you finished ==yet==?'], 'never / yet'),
  ], ['EF09LI21-JO', 'EF09LI07', 'EF09LI020-JO'], ['I have never ', 'contar algo que você nunca fez.', 'I have never seen snow.', 'present perfect']));

  const rec2 = [
    { id: 'A', aba: 'A · Viral post', moldura: 'celular', blocos: [{ tipo: 'perfil', avatar: { letra: 'S', cor: 'pop' }, nome: '@SuperNews2', meta: '1 hour ago' },
      { tipo: 'post', texto: 'WOW! A Joinville girl has broken a world record! She has read 500 books this year!', selo: '8K SHARES' }] },
    bCaderno_('B', 'B · Library page', 'Joinville School Library', ['Mia has read 50 books since January. She has visited the library every week for two years.']),
    bAudio_('rosa', 'Rosa · librarian', "Mia hasn't read 500 books. She has read fifty. That is still amazing!"),
  ];
  L.push(aCaso_('9º', 'a9', '2026-11', '#02', 'The Record Breaker', 2, 'Hi, checker! A post says a student broke a [[world record|recorde mundial]]. Is it true?', rec2, [
    bLerOuvir_([['How many books has Mia read?', ['50', '500', '5'], 0], ['Is the post true?', ["No, it isn't.", 'Yes, it is.', 'Yes, she has.'], 0]],
      ['The library says: "Mia has read ==50== books."', 'Rosa says: "Mia ==hasn\'t== read 500 books."'], 'fato × opinião / evidências'),
    bBlocos_('Present perfect', 'Complete the sentences.', 'has/hasn\'t + particípio (read, visited).', [
      ['', 'Mia ___ read 50 books.', ['has', 'have', 'is'], ['has'], { have: 'Mia = she → HAS.' }],
      ['', 'She has ___ the library every week.', ['visited', 'visit', 'visits'], ['visited'], { visit: 'has + particípio → VISITED.' }],
      ['', 'Mia ___ read 500 books.', ["hasn't", "haven't", NAO], ["hasn't"], { "haven't": "Mia = she → HASN'T." }],
    ], ['she ==has / hasn\'t== + particípio', 'has ==visited=='], 'present perfect'),
    bBlocos_('Since or for?', 'Choose SINCE or FOR.', 'SINCE = desde · FOR = por (quanto tempo).', [
      ['', 'She has read 50 books ___ January.', ['since', 'for', 'yet'], ['since'], { for: 'January is WHEN it started → SINCE.' }],
      ['', 'She has visited the library ___ two years.', ['for', 'since', 'already'], ['for'], { since: 'two years is HOW LONG → FOR.' }],
    ], ['==since== + quando começou · ==for== + quanto tempo', 'two years → ==for=='], 'since × for'),
  ], ['EF09LI06', 'EF09LI21-JO', 'EF09LI020-JO'], ['I have read ', 'contar quantos livros (ou filmes) você já leu/viu este ano.', 'I have read three books this year.', 'present perfect']));

  L.push(aCaso_('9º', 'a9', '2026-11', '#02', 'The Record Breaker', 3, 'Hi, checker! Someone started a [[rumour|boato]] about Mia. Who was it?', [
    rec2[0],
    bFichas_([['sam', 'SAM', ['I have never posted about Mia.']], ['ben', 'BEN', ['I have already shared the post.']], ['lucy', 'LUCY', ['I have posted on @SuperNews2 since May.']]]),
    bAudio_('rosa', 'Rosa · librarian', "The account SuperNews2 has posted fake news for months. Its owner has written about Mia before."),
  ], [
    bQuem_('Who started the rumour?', 'Click the person.', 'Clique em quem começou o boato (a dona da conta).',
      [{ personagem: 'sam', texto: 'SAM' }, { personagem: 'ben', texto: 'BEN' }, { personagem: 'lucy', texto: 'LUCY' }], 2,
      { 0: 'Sam has never posted about Mia.', 1: 'Ben only shared the post. Who owns the account?' },
      ['The post is from ==@SuperNews2==.', 'Who has posted on @SuperNews2 since May?'], "It's **Lucy**: she has posted on @SuperNews2 since May!"),
    bOuvirPista_("Rosa's message", [['How long has the account posted fake news?', ['for months', 'since 2010', 'for one day'], 0], ['Has the owner written about Mia before?', ['Yes, she has.', "No, she hasn't.", 'Yes, she is.'], 0]],
      ['Listen for ==for== and ==before==.', 'Rosa says: "fake news ==for months=="'], 'compreensão oral'),
    bBlocos_('Present perfect', 'Complete the sentences.', 'has + particípio · already = já · never = nunca.', [
      ['', 'Lucy ___ posted on that account since May.', ['has', 'have', 'is'], ['has'], { have: 'Lucy = she → HAS.' }],
      ['', 'Ben has ___ shared the post.', ['already', 'yet', 'since'], ['already'], { yet: 'In the middle of a sentence → ALREADY (já).' }],
      ['', 'Sam has ___ posted about Mia.', ['never', 'ever', 'yet'], ['never'], { ever: 'Sam did NOT post → NEVER.' }],
    ], ['==already== = já · ==never== = nunca', 'Sam has ==never== posted.'], 'present perfect + already/never'),
    bVF_([['Mia has read 50 books.', true], ['Mia has read 500 books.', false], ['Ben has shared the post.', true], ['Sam has posted about Mia.', false]],
      ['Check all the clues.', 'Mia has read ==50==. Sam has ==never== posted.'], 'fato × opinião'),
  ], ['EF09LI06', 'EF09LI07', 'EF09LI21-JO', 'EF09LI06'], ['The post ', 'escrever a manchete da checagem no present perfect.', "The post is false: Mia hasn't read 500 books!", 'present perfect']));

  return L;
}
