/**
 * Casos padrão (Etapa 1): um caso por série, conteúdos de outubro do Mapa de Progressão 2026.
 * Marcações nos textos: [[palavra|tradução]] = glossário · ==texto== = destaque · **texto** = negrito · ~~texto~~ = riscado.
 * Personagens disponíveis: nadia, marcos, kai, paulo, ana, leo, bia, clock, nina, pedro, lu, ravi.
 */

const CASOS_PADRAO = [
  // ---------------------------------------------------------------- 6º ano
  {
    id: 'c6-2026-10-mochila', missao: 'a6-2026-10', degrau: 3, ordem: 10, serie: '6º', mes: '2026-10', numero: 'OCT·1', titulo: 'The Lost Backpack',
    abertura: { personagem: 'kai', nome: 'CHIEF KAI', texto: 'Hi, agent! We have a [[backpack|mochila]]. Who is the [[owner|dono]]? Open 3 locks!' },
    evidencias: [
      { id: 'A', aba: 'A · The backpack', blocos: [
        { tipo: 'semana', titulo: 'MY WEEK', dias: [['MON', '⚽'], ['TUE', ''], ['WED', '📘'], ['THU', ''], ['FRI', '🏊']] },
        { tipo: 'itens', itens: [['⏰', '[[alarm clock|despertador]]: 6:30'], ['🥪', '[[snack|lanche]]'], ['🩳', '[[swimsuit|roupa de natação]]']] },
      ] },
      { id: 'B', aba: 'B · Students', blocos: [
        { tipo: 'fichas', fichas: [
          { personagem: 'ana', nome: 'ANA', linhas: ['I [[get up|levanto]] at 7:00.', 'I play [[volleyball|vôlei]] on Mondays.', 'I [[swim|nado]] on Fridays.'] },
          { personagem: 'leo', nome: 'LEO', linhas: ['I get up at 6:30.', 'I play soccer on Mondays.', 'I swim on Fridays.'] },
          { personagem: 'bia', nome: 'BIA', linhas: ['I get up at 6:30.', 'I play soccer on [[Tuesdays|terças-feiras]].', 'I swim on Fridays.'] },
        ] },
      ] },
      { id: 'C', aba: 'C · Voice message', moldura: 'celular', blocos: [
        { tipo: 'audio', personagem: 'paulo', nome: 'Mr. Paulo · school janitor', meta: 'voice message · 0:08', velocidade: 0.85,
          fala: "Hello! I'm Paulo, the school [[janitor|zelador]]. I [[found|encontrei]] the backpack on [[Monday|segunda-feira]]. It was at five o'clock, [[near|perto de]] the [[soccer field|campo de futebol]]." },
      ] },
    ],
    travas: [
      { titulo: 'What time is it?', tipo: 'Clocks', onomatopeia: 'TICK!',
        passos: [['👀', 'Look at the clocks.', 'Olhe os três relógios das pistas.'], ['🧩', 'Put the right time.', 'Toque num bloco para colocar o horário embaixo do relógio. Toque no espaço para tirar.']],
        dicas: ['The **short** hand shows the hour. The **long** hand shows the minutes.', "Long hand on 6 = ==thirty==. Long hand on 12 = ==o'clock==."],
        partes: [{ tipo: 'associar', alvos: [
          { relogio: [6, 30], rotulo: 'A · alarm clock', resposta: 1 },
          { relogio: [7, 0], rotulo: "B · Ana's time", resposta: 2 },
          { relogio: [5, 0], rotulo: "C · Paulo's message", resposta: 0 },
        ], blocos: ["five o'clock", 'six thirty', "seven o'clock", 'eight thirty'] }],
        solucao: "⏰ six thirty · Ana: seven o'clock · Paulo: five o'clock.",
        etiquetas: [{ codigo: 'EF06LI17', foco: 'horas' }] },
      { titulo: 'When and where?', tipo: 'Listening', onomatopeia: 'BOOM!',
        passos: [['🎧', 'Listen to message C.', 'Ouça a mensagem do Sr. Paulo. Pode repetir, ouvir mais devagar ou abrir o texto.'], ['👆', 'Click the day and the place.', 'Clique no dia e no lugar onde ele encontrou a mochila.']],
        dicas: ['Listen for a day of the week: Monday, Tuesday…', 'Paulo says: "on ==Monday== … near the ==soccer field==".'],
        partes: [
          { tipo: 'audio', evidencia: 'C' },
          { tipo: 'escolha', pergunta: 'What day?', estilo: 'pilulas', opcoes: ['MON', 'TUE', 'WED', 'THU', 'FRI'], resposta: 0, feedback: { 4: 'Friday is for swimming. Listen again!' } },
          { tipo: 'escolha', pergunta: 'Where?', estilo: 'figuras', opcoes: [{ emoji: '⚽', texto: 'soccer field' }, { emoji: '📚', texto: 'library' }, { emoji: '🍎', texto: 'cafeteria' }], resposta: 0 },
        ],
        solucao: 'Paulo found the backpack on **Monday**, near the **soccer field**.',
        etiquetas: [{ codigo: 'EF06LI04', foco: 'compreensão oral' }, { codigo: 'EF06LI17', foco: 'dias da semana e lugares da escola' }] },
      { titulo: 'Who is the owner?', tipo: 'Find the owner', onomatopeia: 'GOTCHA!',
        passos: [['🔎', 'Compare A and B.', 'Compare a mochila (pista A) com as fichas dos alunos (pista B).'], ['👆', 'Click the owner.', 'Clique no dono da mochila.'], ['🧩', 'Build the sentence.', 'Monte a frase que o dono diria.']],
        dicas: ['Check the alarm clock: who gets up at 6:30?', 'The backpack shows ⚽ on ==Monday==. Who plays soccer on Mondays?'],
        partes: [
          { tipo: 'escolha', pergunta: 'Who is the owner?', estilo: 'pessoas', opcoes: [{ personagem: 'ana', texto: 'ANA' }, { personagem: 'leo', texto: 'LEO' }, { personagem: 'bia', texto: 'BIA' }], resposta: 1,
            feedback: { 0: 'Ana gets up at 7:00. The alarm clock says 6:30.', 2: 'Bia plays soccer on Tuesdays. Look at the backpack again.' } },
          { tipo: 'montar', pergunta: 'The owner says:', frase: '"I ___ soccer on ___."', blocos: ['play', 'plays', 'Mondays', 'Fridays'], resposta: [['play', 'Mondays']],
            feedback: { 'plays mondays': 'Almost! With "I" we say: I play.', 'play fridays': 'Check the day: the backpack shows ⚽ on Monday.', 'plays fridays': 'Check the verb (I play) and the day (⚽ on Monday).' } },
        ],
        solucao: 'It\'s **Leo**! He gets up at 6:30 and says: "I **play** soccer on **Mondays**."',
        etiquetas: [{ codigo: 'EF06LI09', foco: 'localizar informação' }, { codigo: 'EF06LI19', foco: 'rotina (I play…)' }] },
    ],
    final: { titulo: 'A message for Leo', personagem: 'kai', inicio: 'Hi Leo! Your backpack is ',
      tarefa: 'escrever um bilhete curto para o Leo dizendo onde está a mochila dele.', foco: 'verbo to be e rotina (I/you)',
      passos: [['✍️', 'Write a message to Leo.', 'Escreva um bilhete para o Leo avisando que a mochila está na agência. Não vale pontos, só recebe comentário.'], ['💡', 'Start: Hi Leo! Your backpack is…', 'Comece com "Hi Leo! Your backpack is…" (Oi Leo! Sua mochila está…).']] },
  },

  // ---------------------------------------------------------------- 7º ano
  {
    id: 'c7-2026-10-diario', missao: 'a7-2026-10', degrau: 3, ordem: 10, serie: '7º', mes: '2026-10', numero: 'OCT·1', titulo: 'The Mixed-Up Diary',
    abertura: { personagem: 'clock', nome: 'CAPTAIN CLOCK', texto: 'Hi, detective! Our [[time machine|máquina do tempo]] has an [[error|erro]]. Find it and open 4 locks!' },
    evidencias: [
      { id: 'A', aba: 'A · Time machine', moldura: 'tela', blocos: [
        { tipo: 'meta', texto: 'TIME MACHINE · LOG 0042' },
        { tipo: 'manchete', texto: '⚠ ERROR?' },
        { tipo: 'texto', texto: 'Nina Weber [[flew|voou]] alone for the first time in ==1948==.' },
      ] },
      { id: 'B', aba: "B · Nina's diary", moldura: 'caderno', blocos: [
        { tipo: 'meta', texto: 'May 5th, 1950' },
        { tipo: 'texto', texto: 'Today I flew alone for the first time! I [[woke up|acordei]] at 5 a.m. I walked to the [[airfield|campo de pouso]] with my dad. At 7 a.m., I flew over Joinville. I was so happy!' },
      ] },
      { id: 'C', aba: 'C · Timeline', blocos: [
        { tipo: 'linha', itens: [['1930', 'Nina was [[born|nasceu]] in Joinville.'], ['1945', 'She saw a plane for the first time.'], ['1948', 'She studied at a [[flight school|escola de aviação]].'], ['1950', 'She flew alone for the first time.']] },
      ] },
      { id: 'D', aba: 'D · Voice message', moldura: 'celular', blocos: [
        { tipo: 'audio', personagem: 'pedro', nome: "Pedro · Nina's grandson", meta: 'voice message · 0:10',
          fala: "Hi! I'm Pedro, Nina's [[grandson|neto]]. The time machine is wrong. In 1948, my grandmother studied at a flight school. She flew alone for the first time in 1950. She was very [[brave|corajosa]]!" },
      ] },
    ],
    travas: [
      { titulo: 'Regular or irregular?', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
        passos: [['👀', 'Read the examples.', 'Leia os exemplos de verbos no passado.'], ['👆', 'Choose the rule.', 'Escolha a regra.'], ['✋', 'Drag the verbs to the boxes.', 'Arraste cada verbo para a caixa certa (ou toque nele para trocar de caixa).']],
        dicas: ['Look at the end of the verbs: some end in ==-ed==.', '==walk → walked== is regular. ==fly → flew== is irregular: the word changes.'],
        partes: [
          { tipo: 'exemplos', itens: ['walk → ==walked==', 'fly → ==flew==', 'study → ==studied==', 'see → ==saw=='] },
          { tipo: 'escolha', pergunta: 'What is the rule?', opcoes: ['Regular verbs end in -ed. Irregular verbs change.', 'All verbs in the past end in -ed.', 'Irregular verbs end in -ed.'], resposta: 0 },
          { tipo: 'separar', pergunta: 'Drag the verbs.', caixas: ['REGULAR (-ed)', 'IRREGULAR'], itens: [
            { texto: 'went', resposta: 1 }, { texto: 'played', resposta: 0 }, { texto: 'ate', resposta: 1 },
            { texto: 'wanted', resposta: 0 }, { texto: 'bought', resposta: 1 }, { texto: 'visited', resposta: 0 }] },
        ],
        solucao: '**Regular**: played, wanted, visited (-ed). **Irregular**: went, ate, bought (the word changes).',
        etiquetas: [{ codigo: 'EF07LI15', foco: 'simple past regular × irregular' }] },
      { titulo: 'Find the error', tipo: 'Evidence', onomatopeia: 'BOOM!',
        passos: [['🔎', 'Compare A, B and C.', 'Compare a máquina do tempo (A) com o diário (B) e a linha do tempo (C).'], ['👆', 'Find the error.', 'Descubra o erro da máquina.'], ['🧩', 'Build the true sentence.', 'Monte a frase verdadeira com os blocos.']],
        dicas: ['Look at the dates in the diary and in the timeline.', 'Years use ==in==: in 1950. And fly → ==flew==.'],
        partes: [
          { tipo: 'escolha', pergunta: 'What is wrong in the time machine?', opcoes: ['The year: Nina flew alone in 1950.', 'The name: she is not Nina.', 'The city: she flew over Rio.'], resposta: 0,
            feedback: { 1: 'The name is right. Check the year!', 2: 'The machine does not talk about a city. Check the year!' } },
          { tipo: 'montar', pergunta: 'Build the true sentence.', frase: 'Nina ___ alone for the first time ___ 1950.', blocos: ['flew', 'fly', 'in', 'on', 'at'], resposta: [['flew', 'in']],
            feedback: { 'fly in': 'Use the past: fly → flew.', 'flew on': 'For years we use IN: in 1950.', 'flew at': 'For years we use IN: in 1950.' } },
        ],
        solucao: 'The machine said 1948, but the diary and the timeline say: "Nina **flew** alone for the first time **in** 1950."',
        etiquetas: [{ codigo: 'EF07LI09', foco: 'selecionar informação' }, { codigo: 'EF07LI15', foco: 'preposições in/on/at' }] },
      { titulo: "The grandson's message", tipo: 'Listening', onomatopeia: 'YES!',
        passos: [['🎧', 'Listen to message D.', 'Ouça a mensagem do Pedro, neto da Nina. Pode repetir, ouvir mais devagar ou abrir o texto.'], ['👆', 'Answer the questions.', 'Responda às duas perguntas.']],
        dicas: ['Listen for the years: ==1948== and ==1950==.', 'Pedro says: "In 1948, my grandmother ==studied== at a flight school."'],
        partes: [
          { tipo: 'audio', evidencia: 'D' },
          { tipo: 'escolha', pergunta: 'What did Nina do in 1948?', opcoes: ['She flew alone.', 'She studied at a flight school.', 'She was born.'], resposta: 1 },
          { tipo: 'escolha', pergunta: 'When did she fly alone for the first time?', opcoes: ['in 1945', 'in 1948', 'in 1950'], resposta: 2 },
        ],
        solucao: 'In 1948 she **studied** at a flight school. She **flew** alone in **1950**.',
        etiquetas: [{ codigo: 'EF07LI04', foco: 'compreensão oral' }, { codigo: 'EF07LI15', foco: 'simple past' }] },
      { titulo: 'Repair the timeline', tipo: 'Escape lock', onomatopeia: 'POW!',
        passos: [['✋', 'Put the sentences in order.', 'Coloque a história da Nina em ordem. Arraste ou use as setas.'], ['🧩', 'Put in, on or at.', 'Complete cada data com in, on ou at.']],
        dicas: ['Use the connectors: ==First==, ==Then==, ==After that==, ==Finally==.', '==in== + year · ==on== + day/date · ==at== + time.'],
        partes: [
          { tipo: 'ordenar', pergunta: "Nina's story", itens: ['First, Nina saw a plane at the airfield.', 'Then, she studied at a flight school.', 'After that, she flew alone over Joinville.', 'Finally, she became a pilot.'], embaralhar: [2, 0, 3, 1] },
          { tipo: 'associar', pergunta: 'In, on or at?', alvos: [{ texto: '___ May 5th', resposta: 1 }, { texto: '___ 7 a.m.', resposta: 2 }, { texto: '___ 1950', resposta: 0 }], blocos: ['in', 'on', 'at'] },
        ],
        solucao: 'First → Then → After that → Finally. **on** May 5th · **at** 7 a.m. · **in** 1950.',
        etiquetas: [{ codigo: 'EF07LI15', foco: 'conectores' }, { codigo: 'EF07LI15', foco: 'preposições in/on/at' }] },
    ],
    final: { titulo: 'Write about Nina', personagem: 'clock', inicio: 'In 1950, Nina ',
      tarefa: 'escrever uma frase sobre a Nina no passado.', foco: 'simple past (regular e irregular)',
      passos: [['✍️', 'Write a sentence about Nina.', 'Escreva uma frase sobre a Nina no passado. Não vale pontos, só recebe comentário.'], ['💡', 'Start: In 1950, Nina…', 'Comece com "In 1950, Nina…" e use um verbo no passado.']] },
  },

  // ---------------------------------------------------------------- 8º ano
  {
    id: 'c8-2026-10-mensagem', missao: 'a8-2026-10', degrau: 3, ordem: 10, serie: '8º', mes: '2026-10', numero: 'OCT·1', titulo: 'Message from 2050',
    abertura: { personagem: 'lu', nome: 'DR. LU', texto: 'Hi, scientist! A [[message|mensagem]] from 2050 arrived, but it is [[broken|quebrada]]. Fix it and open 4 locks!' },
    evidencias: [
      { id: 'A', aba: 'A · Message', moldura: 'tela', blocos: [
        { tipo: 'meta', texto: 'INCOMING · YEAR 2050 · SIGNAL 34%' },
        { tipo: 'texto', texto: 'Hello from 2050! Life is wonder####. Cars are driver####, and nobody uses plastic. But the [[oceans|oceanos]] are still in [[danger|perigo]]. Please ##cycle and ##use!' },
      ] },
      { id: 'B', aba: 'B · Lab notebook', moldura: 'caderno', blocos: [
        { tipo: 'manchete', texto: 'WORD BUILDER' },
        { tipo: 'itens', itens: [['🧡', 'care → care==ful== (full of care)'], ['💔', 'care → care==less== (without care)'], ['😐', 'happy → ==un==happy (not happy)'], ['🔁', 'use → ==re==use (use again)'], ['👩‍🏫', 'teach → teach==er== (a person who teaches)']] },
      ] },
      { id: 'C', aba: 'C · Voice message', moldura: 'celular', blocos: [
        { tipo: 'audio', personagem: 'ravi', nome: 'Dr. Ravi · year 2050', meta: 'voice message · 0:12',
          fala: "Hello from 2050! I'm Doctor Ravi. Life is [[wonderful|maravilhosa]] here. Cars are [[driverless|sem motorista]], and nobody uses plastic. But the oceans are still in danger. You are going to help. Please [[recycle|recicle]] and [[reuse|reutilize]]!" },
      ] },
    ],
    travas: [
      { titulo: 'Word builder', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
        passos: [['👀', 'Read notebook B.', 'Leia o caderno do laboratório (pista B).'], ['🧩', 'Match the parts and meanings.', 'Coloque o significado certo embaixo de cada prefixo ou sufixo.']],
        dicas: ['Read the words in parentheses in notebook B.', 'careless = ==without== care · unhappy = ==not== happy.'],
        partes: [{ tipo: 'associar', alvos: [{ texto: 'un-', resposta: 2 }, { texto: 're-', resposta: 1 }, { texto: '-ful', resposta: 3 }, { texto: '-less', resposta: 0 }], blocos: ['without', 'again', 'not', 'full of'] }],
        solucao: '**un-** = not · **re-** = again · **-ful** = full of · **-less** = without.',
        etiquetas: [{ codigo: 'EF08LI13', foco: 'prefixos e sufixos' }] },
      { titulo: 'Fix the message', tipo: 'Evidence', onomatopeia: 'BOOM!',
        passos: [['👀', 'Read message A.', 'Leia a mensagem quebrada (pista A).'], ['🧩', 'Build the words.', 'Complete as frases com as palavras certas.']],
        dicas: ['Life in 2050 is good. Cars have no driver.', 'Wonder + ==ful== = full of wonder. Driver + ==less== = without a driver.'],
        partes: [
          { tipo: 'montar', pergunta: 'Life and cars in 2050:', frase: 'Life is ___. Cars are ___.', blocos: ['wonderful', 'wonderless', 'driverless', 'driverful'], resposta: [['wonderful', 'driverless']],
            feedback: { 'wonderless driverless': 'Check the first word: life is good, FULL of wonder.', 'wonderful driverful': 'Check the cars: they have no driver, so WITHOUT a driver.', 'wonderless driverful': 'Both words are wrong. Read notebook B again.' } },
          { tipo: 'montar', pergunta: 'The last sentence:', frase: 'Please ___ and ___!', blocos: ['recycle', 'reuse', 'unuse', 'uncycle'], resposta: [['recycle', 'reuse'], ['reuse', 'recycle']],
            feedback: { 'recycle unuse': '"un-" means NOT. We want to use things AGAIN: re-.', 'uncycle reuse': '"un-" means NOT. We want to cycle AGAIN: re-.' } },
        ],
        solucao: 'Life is **wonderful**. Cars are **driverless**. Please **recycle** and **reuse**!',
        etiquetas: [{ codigo: 'EF08LI13', foco: 'prefixos e sufixos' }, { codigo: 'EF08LI05', foco: 'inferência' }] },
      { titulo: "Dr. Ravi's message", tipo: 'Listening', onomatopeia: 'YES!',
        passos: [['🎧', 'Listen to message C.', 'Ouça a mensagem do Dr. Ravi. Pode repetir, ouvir mais devagar ou abrir o texto.'], ['👆', 'Answer the questions.', 'Responda às duas perguntas.']],
        dicas: ['Listen for the words ==cars== and ==danger==.', 'Ravi says: "Cars are ==driverless==" and "the ==oceans== are still in danger".'],
        partes: [
          { tipo: 'audio', evidencia: 'C' },
          { tipo: 'escolha', pergunta: 'What are cars like in 2050?', opcoes: ['driverless', 'careless', 'unhappy'], resposta: 0 },
          { tipo: 'escolha', pergunta: 'What is still in danger?', opcoes: ['the cars', 'the oceans', 'the plastic'], resposta: 1 },
        ],
        solucao: 'Cars are **driverless**, but the **oceans** are still in danger.',
        etiquetas: [{ codigo: 'EF08LI03', foco: 'compreensão oral' }] },
      { titulo: 'Answer the future', tipo: 'Escape lock', onomatopeia: 'POW!',
        passos: [['✋', 'Drag the words to the boxes.', 'Separe as palavras: com prefixo (no começo) ou com sufixo (no fim). Toque ou arraste.'], ['🧩', 'Finish the reply.', 'Complete a resposta para o Dr. Ravi.']],
        dicas: ['A ==prefix== comes before the word (un-, re-). A ==suffix== comes after (-ful, -less, -er).', 'Careless = without care. We want to be ==full of care==.'],
        partes: [
          { tipo: 'separar', pergunta: 'Prefix or suffix?', caixas: ['PREFIX (un-, re-)', 'SUFFIX (-ful, -less, -er)'], itens: [
            { texto: 'unhappy', resposta: 0 }, { texto: 'helpful', resposta: 1 }, { texto: 'rebuild', resposta: 0 },
            { texto: 'homeless', resposta: 1 }, { texto: 'teacher', resposta: 1 }, { texto: 'unfair', resposta: 0 }] },
          { tipo: 'montar', pergunta: 'Your reply to Dr. Ravi:', frase: 'Thank you! We are going to be ___ with the planet.', blocos: ['careful', 'careless', 'uncareful'], resposta: [['careful']],
            feedback: { careless: 'Careless = without care. Is that good for the planet?', uncareful: '"Uncareful" is not a word. Look at notebook B.' } },
        ],
        solucao: '**Prefix**: unhappy, rebuild, unfair. **Suffix**: helpful, homeless, teacher. We are going to be **careful**!',
        etiquetas: [{ codigo: 'EF08LI13', foco: 'prefixos e sufixos' }, { codigo: 'EF08LI14', foco: 'going to (revisão)' }] },
    ],
    final: { titulo: 'A prediction for 2050', personagem: 'lu', inicio: 'In 2050, people will ',
      tarefa: 'escrever uma previsão para 2050 usando will.', foco: 'will e palavras com prefixos/sufixos',
      passos: [['✍️', 'Write a prediction for 2050.', 'Escreva uma previsão para 2050. Tente usar uma palavra com prefixo ou sufixo. Não vale pontos, só recebe comentário.'], ['💡', 'Start: In 2050, people will…', 'Comece com "In 2050, people will…" (Em 2050, as pessoas vão…).']] },
  },

  // ---------------------------------------------------------------- 9º ano
  {
    id: 'c9-2026-10-show', missao: 'a9-2026-10', degrau: 3, ordem: 10, serie: '9º', mes: '2026-10', numero: 'OCT·1', titulo: 'The Cancelled Concert',
    abertura: { personagem: 'nadia', nome: 'EDITOR NADIA', texto: 'Hi, checker! This post is [[viral|viral (muito compartilhado)]]. Is it true? Check the [[evidence|evidências, provas]]. Open 5 locks!' },
    evidencias: [
      { id: 'A', aba: 'A · Viral post', moldura: 'celular', blocos: [
        { tipo: 'perfil', avatar: { letra: 'B', cor: 'pop' }, nome: '@BreakingNowSC', meta: '2 hours ago' },
        { tipo: 'post', texto: 'BREAKING! Lia Storm has [[cancelled|cancelou]] her show in Joinville! This is the [[worst|pior]] news ever. She has [[never|nunca]] [[visited|visitou]] Brazil. Her fans are so [[silly|bobos]]. SHARE NOW!!!', selo: '12K SHARES' },
      ] },
      { id: 'B', aba: "B · Lia's profile", moldura: 'celular', blocos: [
        { tipo: 'perfil', avatar: { letra: 'L', cor: 'sun' }, nome: '@liastorm ✔', meta: 'official account' },
        { tipo: 'post', meta: 'Today · 9:14', texto: 'I have [[just|acabei de]] [[arrived|chegar]] in Santa Catarina! See you on Saturday, Joinville!' },
        { tipo: 'post', meta: '[[Throwback|lembrança do passado]]', foto: 'Rio de Janeiro, 2023', texto: 'My first show in Brazil!' },
      ] },
      { id: 'C', aba: 'C · News', blocos: [
        { tipo: 'meta', texto: 'Joinville Daily (fictional) · yesterday' },
        { tipo: 'manchete', texto: 'TICKETS HAVE [[SOLD OUT|ESGOTARAM]]!' },
        { tipo: 'texto', texto: 'The arena has been [[ready|pronta]] for two days.' },
        { tipo: 'texto', texto: 'Lia has [[toured|feito turnê]] South America for three years.' },
      ] },
      { id: 'D', aba: 'D · Voice message', moldura: 'celular', blocos: [
        { tipo: 'audio', personagem: 'marcos', nome: 'Marcos · Arena manager', meta: 'voice message · 0:12', velocidade: 0.9,
          fala: "Hi, I'm Marcos from the arena. The post is not true. We haven't [[cancelled|cancelamos]] the show. Lia has [[already|já]] [[arrived|chegou]], and fans have [[waited|esperado]] [[since|desde]] 2024. See you on Saturday!" },
      ] },
    ],
    travas: [
      { titulo: 'Fact or opinion?', tipo: 'Evidence', onomatopeia: 'CLICK!',
        passos: [['👀', 'Read post A.', 'Leia o post A (aba A).'], ['👆', 'Click FACT or OPINION.', 'Para cada frase, clique em FACT (dá para conferir com provas, mesmo que seja falsa) ou OPINION (sentimento ou julgamento).']],
        dicas: ['Opinion words show feelings: ==worst==, ==silly==.', 'A fact can be FALSE! "She has never visited Brazil" is a fact we can check with photos.'],
        partes: [{ tipo: 'classificar', categorias: ['FACT', 'OPINION'], itens: [
          { texto: 'Lia Storm has cancelled her show in Joinville.', resposta: 0 },
          { texto: 'This is the worst news ever.', resposta: 1 },
          { texto: 'She has never visited Brazil.', resposta: 0 },
          { texto: 'Her fans are so silly.', resposta: 1 }] }],
        solucao: '"Worst news" and "so silly" are opinions. The other two are facts we can check. Let\'s check them!',
        etiquetas: [{ codigo: 'EF09LI06', foco: 'fato × opinião' }] },
      { titulo: 'Fix the lie', tipo: 'Evidence', onomatopeia: 'BOOM!',
        passos: [['🔎', 'Find the true evidence.', 'O post diz que a Lia nunca visitou o Brasil. Clique na evidência que mostra que isso é mentira.'], ['🧩', 'Build the true sentence.', 'Monte a frase verdadeira com os blocos.']],
        dicas: ["Look at Lia's profile (B). Look at the photo.", 'Present perfect = ==has== + ==visited==. With "she" we use HAS.'],
        partes: [
          { tipo: 'escolha', pergunta: 'Which evidence shows the truth?', opcoes: ['A · the viral post', "B · Lia's photo from Rio, 2023", 'C · the news', 'D · the voice message'], resposta: 1,
            feedback: { 0: 'The viral post is the lie! Look at the other evidence.', 2: 'The news is about tickets. Look for a photo of Lia in Brazil.', 3: 'Marcos talks about this show. Look for a photo of Lia in Brazil before.' } },
          { tipo: 'montar', pergunta: 'Build the true sentence.', frase: 'She ___ ___ Brazil before.', blocos: ['has', 'have', 'visited', 'visit'], resposta: [['has', 'visited']],
            feedback: { 'have visited': 'Almost! With "she" we use HAS.', 'has visit': 'Almost! Use the past participle: visit → visited.', 'have visit': 'Check both words: she HAS + visitED.' } },
        ],
        solucao: 'Photo B shows Lia in Rio in 2023, so: "She **has visited** Brazil before."',
        etiquetas: [{ codigo: 'EF09LI07', foco: 'evidências' }, { codigo: 'EF09LI21-JO', foco: 'present perfect afirmativo' }] },
      { titulo: 'The voice message', tipo: 'Listening', onomatopeia: 'YES!',
        passos: [['🎧', 'Listen to message D.', 'Ouça a mensagem de voz do Marcos. Pode repetir, ouvir mais devagar ou abrir o texto.'], ['👆', 'Answer the questions.', 'Responda às duas perguntas.']],
        dicas: ['Listen for the words ==already== and ==since==.', 'Marcos says: "Lia has already arrived" and "fans have waited since ..."'],
        partes: [
          { tipo: 'audio', evidencia: 'D' },
          { tipo: 'escolha', pergunta: 'What has happened?', opcoes: ['The arena has cancelled the show.', 'Lia has already arrived.', "Lia hasn't left Canada yet."], resposta: 1 },
          { tipo: 'escolha', pergunta: 'How long have fans waited?', opcoes: ['for 2024', 'since 2024', 'since two years'], resposta: 1,
            feedback: { 0: '2024 is a starting point. Do we use FOR or SINCE?', 2: '"two years" is a length of time. Listen again: since…?' } },
        ],
        solucao: 'Marcos says: "Lia has **already** arrived" and "fans have waited **since** 2024".',
        etiquetas: [{ codigo: 'EF09LI07', foco: 'compreensão oral' }, { codigo: 'EF09LI020-JO', foco: 'already / since' }] },
      { titulo: 'Since or for?', tipo: 'Discover the rule', onomatopeia: 'POW!',
        passos: [['👀', 'Read the examples.', 'Leia os exemplos com SINCE e FOR.'], ['👆', 'Choose the rule.', 'Escolha a regra que explica quando usar cada um.'], ['✋', 'Drag the words to the boxes.', 'Arraste cada expressão para a caixa certa (ou toque nela para trocar de caixa).']],
        dicas: ['Ask: is it **WHEN it started**, or **HOW LONG**?', '==since 2024== = when it started. ==for three years== = how long.'],
        partes: [
          { tipo: 'exemplos', itens: ['Fans have waited ==since 2024==.', 'The arena has been ready ==for two days==.', 'Lia has toured South America ==for three years==.', 'I have loved Brazil ==since 2023==.'] },
          { tipo: 'escolha', pergunta: 'What is the rule?', opcoes: ['SINCE = when it started · FOR = how long', 'SINCE = how long · FOR = when it started', 'SINCE = past · FOR = future'], resposta: 0 },
          { tipo: 'separar', pergunta: 'Drag the words.', caixas: ['SINCE…', 'FOR…'], itens: [
            { texto: '2020', resposta: 0 }, { texto: 'five hours', resposta: 1 }, { texto: '8 a.m.', resposta: 0 },
            { texto: 'a week', resposta: 1 }, { texto: 'Monday', resposta: 0 }, { texto: 'two months', resposta: 1 }] },
        ],
        solucao: '**Since** + when it started (Monday, 2020, 8 a.m.). **For** + how long (five hours, a week, two months).',
        etiquetas: [{ codigo: 'EF09LI020-JO', foco: 'since × for' }] },
      { titulo: 'File the report', tipo: 'Escape lock', onomatopeia: 'GOTCHA!',
        passos: [['✋', 'Put the sentences in order.', 'Coloque o relatório em ordem: o que o post diz → as provas → a conclusão. Arraste ou use as setas.'], ['👆', 'Choose the stamp.', 'Escolha o carimbo: verdadeiro (TRUE) ou falso (FALSE).']],
        dicas: ['Order: what the post says → the evidence → the conclusion.', '==However== = porém. ==Therefore== = portanto (conclusão).'],
        partes: [
          { tipo: 'ordenar', pergunta: 'The report', itens: ['The post says Lia has cancelled her show.', 'However, the arena says the show is on.', 'Also, Lia has already arrived in Santa Catarina.', 'Therefore, the post is FALSE.'], embaralhar: [2, 0, 3, 1],
            feedback_erro: 'The report is not in order yet.' },
          { tipo: 'escolha', pergunta: 'Verdict:', estilo: 'carimbo', opcoes: ['TRUE', 'FALSE'], resposta: 1, feedback: { 0: 'Check the stamp: is the post true?' } },
        ],
        solucao: 'Post → *However* → *Also* → *Therefore*. The post is FALSE!',
        etiquetas: [{ codigo: 'EF09LI14', foco: 'conectores' }, { codigo: 'EF09LI06', foco: 'fato × opinião' }] },
    ],
    final: { titulo: 'Write the headline!', personagem: 'nadia', inicio: 'Lia Storm ',
      tarefa: 'escrever a manchete da checagem usando o present perfect (has/hasn\'t + particípio).', foco: 'present perfect',
      passos: [['✍️', 'Write a headline.', 'Escreva a manchete da checagem em inglês. Não vale pontos, só recebe comentário.'], ['💡', "Start: Lia Storm hasn't…", 'Comece com "Lia Storm hasn\'t…" (Lia Storm não…).']] },
  },
];
