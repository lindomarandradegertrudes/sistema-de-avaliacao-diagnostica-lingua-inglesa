/**
 * Banco do 9º ano (Etapa 4): 2 casos por período do Mapa 2026, cada um em 3 degraus,
 * e exercícios avulsos de leitura e gramática para o "Meu reforço". Saga: Fact Checkers HQ.
 */

function casosAno9_() {
  const L = [];
  const HASNT = "hasn't", HAVENT = "haven't", DONT = "don't", DOESNT = "doesn't", MUSTNT = "mustn't", WONT = "won't";
  function m9(sufixo, mes, numero, titulo) {
    return function (degrau, abertura, ev, travas, codigos, final) {
      L.push(aCaso_('9º', sufixo, mes, numero, titulo, degrau, abertura, ev, travas, codigos, final));
    };
  }
  function post_(id, aba, letra, cor, nome, meta, texto, selo) {
    return { id: id, aba: aba, moldura: 'celular', blocos: [{ tipo: 'perfil', avatar: { letra: letra, cor: cor }, nome: nome, meta: meta },
      { tipo: 'post', texto: texto, selo: selo }] };
  }

  // ======================================================== MARÇO · linguagem digital e expansão do inglês
  let c = m9('a9', '2026-03', 'MAR·1', 'The Secret Message');
  c(1, 'Hi, checker! We got a [[secret message|mensagem secreta]] full of short words. Decode it!', [], [
    bFiguras_([['😂', ['LOL', 'BRB'], 0], ['🏃', ['LOL', 'BRB'], 1], ['🤷', ['IDK', 'ASAP'], 0], ['⏱️', ['IDK', 'ASAP'], 1]],
      ['==LOL== = laughing out loud 😂 · ==BRB== = be right back', '==IDK== = I don\'t know 🤷 · ==ASAP== = as soon as possible'], 'linguagem digital (acrônimos)'),
    bOuvir_([['Be right back!', ['BRB', 'LOL'], 0, 'pilulas'], ["I don't know.", ['ASAP', 'IDK'], 1, 'pilulas']],
      ['==Be Right Back== = BRB', "==I Don't Know== = IDK"], 'compreensão oral'),
    bBlocos_('Decode', 'Complete the sentence.', 'Troque o acrônimo pela frase completa.', [
      ['⏱️', 'Call me ASAP = as soon as ___', ['possible', 'please'], ['possible'], { please: 'ASAP = As Soon As POSSIBLE.' }],
      ['💬', 'BTW = by the ___', ['way', 'week'], ['way'], { week: 'BTW = By The WAY (a propósito).' }],
    ], ['==ASAP== = as soon as possible', '==BTW== = by the way'], 'linguagem digital (acrônimos)'),
  ], ['EF09LI13', 'EF09LI07', 'EF09LI13'], ['My favourite emoji is ', 'contar qual emoji ou abreviação você mais usa.', 'My favourite emoji is 😂 because I LOL a lot.', 'linguagem digital']);
  c(2, 'Hi, checker! A [[secret message|mensagem secreta]] arrived at the newsroom. What does it say?', [
    { id: 'A', aba: 'A · Chat', moldura: 'celular', blocos: [{ tipo: 'post', meta: 'Unknown', texto: 'BTW, the meeting is at 5. Come ASAP. IDK the room. BRB.' }] },
    bMsg_('marcos', 'Marcos', 'I think the message is from Ben. He always writes BTW!'),
    bAudio_('nadia', 'Editor Nadia', 'Acronyms are short words made from the first letters. People use them online to write fast.'),
  ], [
    bLerOuvir_([['What time is the meeting?', ['at 5', 'at 3', 'at 10'], 0], ['Why do people use acronyms?', ['to write fast', 'to write long texts', 'to speak English'], 0]],
      ['Chat: "the meeting is ==at 5=="', 'Nadia: "to write ==fast=="'], 'linguagem digital'),
    { titulo: 'Match the acronyms', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['👀', 'Read the chat.', 'Leia a mensagem (pista A).'], ['🧩', 'Match each acronym.', 'Coloque o significado embaixo de cada acrônimo.']],
      dicas: ['Acronym = first letters: ==B==y ==T==he ==W==ay.', '==A==s ==S==oon ==A==s ==P==ossible.'],
      partes: [{ tipo: 'associar', alvos: [{ texto: 'BTW', resposta: 1 }, { texto: 'ASAP', resposta: 2 }, { texto: 'IDK', resposta: 0 }], blocos: ["I don't know", 'by the way', 'as soon as possible'] }],
      solucao: "**BTW** = by the way · **ASAP** = as soon as possible · **IDK** = I don't know",
      etiquetas: [{ codigo: 'EF09LI13', foco: 'linguagem digital (acrônimos)' }] },
    bBlocos_('Write it in full', 'Complete the sentences.', 'Escreva a mensagem sem abreviações.', [
      ['', 'BRB = I will be right ___.', ['back', 'big', 'bye'], ['back'], { bye: 'BRB = Be Right BACK.' }],
      ['', 'IDK = I ___ know.', [DONT, DOESNT, 'not'], [DONT], { "doesn't": "I → DON'T." }],
      ['', 'LOL = laughing out ___', ['loud', 'love', 'lot'], ['loud'], { love: 'LOL = Laughing Out LOUD.' }],
    ], ['==BRB== = be right back', "==IDK== = I don't know"], 'linguagem digital (acrônimos)'),
  ], ['EF09LI13', 'EF09LI13', 'EF09LI13'], ['BTW, ', 'escrever uma mensagem curta com um acrônimo.', 'BTW, the test is tomorrow. Study ASAP!', 'linguagem digital']);
  c(3, 'Hi, checker! Who sent the [[secret message|mensagem secreta]]? Check the clues!', [
    { id: 'A', aba: 'A · Chat', moldura: 'celular', blocos: [{ tipo: 'post', meta: 'Unknown · 4:50 pm', texto: 'BTW, the meeting is at 5. Come ASAP. IDK the room. BRB.' }] },
    bFichas_([['ben', 'BEN', ['writes BTW a lot', 'at school at 4:50']], ['mia', 'MIA', ['never uses acronyms', 'at home at 4:50']], ['lucy', 'LUCY', ['writes BTW a lot', 'at the newsroom at 4:50']]]),
    bAudio_('marcos', 'Marcos', 'The person who sent it was not at the newsroom. That is why they did not know the room.'),
  ], [
    bQuem_('Who sent the message?', 'Click the person.', 'Clique em quem mandou a mensagem.',
      [{ personagem: 'ben', texto: 'BEN' }, { personagem: 'mia', texto: 'MIA' }, { personagem: 'lucy', texto: 'LUCY' }], 0,
      { 1: 'Mia never uses acronyms.', 2: 'Lucy was at the newsroom.' }, ['The person ==uses acronyms== and was ==not at the newsroom==.', 'Check clue B.'], 'It was **Ben**!'),
    bOuvirPista_("Marcos's message", [['Was the person at the newsroom?', ['No, they were not.', 'Yes, they were.', 'Yes, at 5.'], 0], ['What did the person not know?', ['the room', 'the time', 'the date'], 0]],
      ['Listen for ==newsroom== and ==room==.', 'Marcos: "they did not know the ==room=="'], 'compreensão oral'),
    bBlocos_('Digital language', 'Choose the acronym.', 'Qual acrônimo combina com a frase?', [
      ['', "I don't know the room = ___ the room.", ['IDK', 'BRB', 'LOL'], ['IDK'], { BRB: "I Don't Know → IDK." }],
      ['', 'Come as soon as possible = Come ___.', ['ASAP', 'BTW', 'IDK'], ['ASAP'], { BTW: 'As Soon As Possible → ASAP.' }],
      ['', 'That is so funny! ___', ['LOL', 'ASAP', 'BRB'], ['LOL'], { ASAP: 'Funny → LOL.' }],
    ], ['==IDK== · ==ASAP== · ==LOL==', 'funny → ==LOL=='], 'linguagem digital (acrônimos)'),
    bVF_([['The meeting is at 5.', true], ['Mia uses BTW a lot.', false], ['Lucy was at the newsroom.', true], ['The sender knew the room.', false]],
      ['Check clues A and B.', 'The message says ==IDK the room==.'], 'cruzar informações'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI13', 'EF09LI07'], ['IMO, ', 'dar sua opinião usando IMO (in my opinion).', 'IMO, acronyms are fun but not for school texts.', 'linguagem digital']);

  c = m9('world', '2026-03', 'MAR·2', 'English Around the World');
  c(1, 'Hi, checker! A post says English is spoken in only two countries. Is it [[true|verdade]]?', [], [
    bFiguras_([['🇺🇸', ['the USA', 'Brazil'], 0], ['🇬🇧', ['Japan', 'the UK'], 1], ['🇦🇺', ['Australia', 'Mexico'], 0], ['🇮🇳', ['Spain', 'India'], 1]],
      ['==the UK== = Reino Unido 🇬🇧', '==India== = Índia 🇮🇳 (o inglês é língua oficial lá também!)'], 'English in the world'),
    bOuvir_([['People speak English in Canada.', ['🇨🇦', '🇧🇷'], 0], ['South Africa has eleven official languages.', ['🇯🇵', '🇿🇦'], 1]],
      ['==Canada== = 🇨🇦', '==South Africa== = África do Sul 🇿🇦'], 'compreensão oral'),
    bBlocos_('English in the world', 'Complete the sentence.', 'O inglês é falado em muitos países.', [
      ['🌍', 'English is spoken in ___ countries.', ['many', 'two'], ['many'], { two: 'English is official in more than 50 countries → MANY.' }],
      ['🇳🇿', 'People in New Zealand ___ English.', ['speak', 'speaks'], ['speak'], { speaks: 'People = they → SPEAK.' }],
    ], ['inglês: língua oficial em ==mais de 50== países', 'People ==speak== English.'], 'English in the world'),
  ], ['EF09LI17', 'EF09LI07', 'EF09LI17'], ['People speak English in ', 'citar países onde se fala inglês.', 'People speak English in Canada, India and Australia.', 'English in the world']);
  c(2, 'Hi, checker! A [[viral|muito compartilhado]] post is about English. Check the facts!', [
    post_('A', 'A · Viral post', 'W', 'blue', '@WorldFactz', '2 hours ago', 'English is spoken ONLY in the USA and the UK! 🇺🇸🇬🇧', '5K SHARES'),
    bCaderno_('B', 'B · Encyclopedia', 'English around the world', ['English is an official language in more than 50 countries, like India, Nigeria and Australia. About 1.5 billion people speak English.']),
    bAudio_('nadia', 'Editor Nadia', 'English spread because of colonization, trade and, today, the internet.'),
  ], [
    bLerOuvir_([['In how many countries is English official?', ['more than 50', 'only 2', '10'], 0], ['Why did English spread?', ['colonization, trade and the internet', 'only films', 'only music'], 0]],
      ['Encyclopedia: "more than ==50== countries"', 'Nadia: "==colonization, trade== and the ==internet=="'], 'English in the world'),
    { titulo: 'Official or not?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['👀', 'Read clue B.', 'Leia a enciclopédia (pista B).'], ['✋', 'Drag the countries.', 'Separe: o inglês é língua oficial ou não?']],
      dicas: ['Clue B: ==India, Nigeria, Australia==.', 'In Brazil we speak ==Portuguese==.'],
      partes: [{ tipo: 'separar', caixas: ['English is official', 'English is not official'], itens: [
        { texto: 'India', resposta: 0 }, { texto: 'Brazil', resposta: 1 }, { texto: 'Nigeria', resposta: 0 },
        { texto: 'Japan', resposta: 1 }, { texto: 'Australia', resposta: 0 }, { texto: 'Argentina', resposta: 1 }] }],
      solucao: '**Official**: India, Nigeria, Australia · **Not official**: Brazil, Japan, Argentina',
      etiquetas: [{ codigo: 'EF09LI17', foco: 'English in the world' }] },
    bBlocos_('Fact check', 'Complete the sentences.', 'Corrija o post com os fatos.', [
      ['', 'The post is ___.', ['false', 'true', 'funny'], ['false'], { true: 'English is official in more than 50 countries → FALSE.' }],
      ['', 'English ___ spoken in India.', ['is', 'are', 'am'], ['is'], { are: 'English = it → IS.' }],
      ['', 'About 1.5 ___ people speak English.', ['billion', 'thousand', 'hundred'], ['billion'], { thousand: 'Clue B: 1.5 BILLION.' }],
    ], ['O post é ==false==.', 'English ==is== spoken…'], 'fake news'),
  ], ['EF09LI17', 'EF09LI17', 'EF09LI06'], ['English is important because ', 'dizer por que o inglês é importante para você.', 'English is important because I can talk to people from many countries.', 'English in the world']);
  c(3, 'Hi, checker! Three students made videos about English. Who told the [[truth|verdade]]?', [
    bCaderno_('B', 'B · Encyclopedia', 'English around the world', ['English is official in more than 50 countries. It spread because of colonization, trade and the internet. Many words in Portuguese come from English: shopping, mouse, game.']),
    bFichas_([['sam', 'SAM', ['English is official only in Europe.']], ['ana', 'ANA', ['Portuguese has many English words.']], ['leo', 'LEO', ['English spread only because of films.']]]),
    bAudio_('nadia', 'Editor Nadia', 'Only one video is correct. Check the encyclopedia!'),
  ], [
    bQuem_('Who told the truth?', 'Click the person.', 'Clique em quem disse a verdade.',
      [{ personagem: 'sam', texto: 'SAM' }, { personagem: 'ana', texto: 'ANA' }, { personagem: 'leo', texto: 'LEO' }], 1,
      { 0: 'India and Australia are not in Europe.', 2: 'Clue B: colonization, trade AND the internet.' }, ['Compare each video with ==clue B==.', 'shopping, mouse, game = English words'], '**Ana** told the truth!'),
    bOuvirPista_("Nadia's message", [['How many videos are correct?', ['only one', 'two', 'all of them'], 0], ['What should you check?', ['the encyclopedia', 'the comments', 'the likes'], 0]],
      ['Listen for ==only one== and ==check==.', 'Nadia: "Check the ==encyclopedia=="'], 'compreensão oral'),
    { titulo: 'English words in Portuguese', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👆', 'Click EN or PT.', 'A palavra veio do inglês (EN) ou é do português (PT)?']],
      dicas: ['Clue B: ==shopping, mouse, game==.', '==mesa== and ==janela== are Portuguese.'],
      partes: [{ tipo: 'classificar', categorias: ['EN', 'PT'], itens: [
        { texto: 'shopping', resposta: 0 }, { texto: 'mesa', resposta: 1 }, { texto: 'mouse', resposta: 0 }, { texto: 'janela', resposta: 1 }] }],
      solucao: '**EN**: shopping, mouse · **PT**: mesa, janela',
      etiquetas: [{ codigo: 'EF09LI17', foco: 'English in the world (empréstimos)' }] },
    bVF_([['English is official in more than 50 countries.', true], ['English is official only in Europe.', false], ['The internet helped English spread.', true], ['Leo told the truth.', false]],
      ['Check clue B.', 'India is ==not in Europe==.'], 'fato × opinião'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI17', 'EF09LI06'], ['In Brazil, we use English words like ', 'citar palavras do inglês que usamos no português.', 'In Brazil, we use English words like shopping, game and selfie.', 'English in the world']);

  // ======================================================== ABRIL · fake news e should / must / have to
  c = m9('a9', '2026-04', 'APR·1', 'The Fake Health Tip');
  c(1, 'Hi, checker! A post gives a strange health [[tip|dica]]. Is it true?', [], [
    bFiguras_([['💧', ['drink water', 'eat candy'], 0], ['😴', ['run', 'sleep well'], 1], ['🥦', ['eat vegetables', 'watch TV'], 0], ['🧼', ['eat chips', 'wash your hands'], 1]],
      ['==drink water== = beber água · ==sleep well== = dormir bem', '==wash your hands== = lavar as mãos'], 'modals: should (vocabulário)'),
    bOuvir_([['You should drink water.', ['💧', '🥤'], 0], ["You shouldn't eat a lot of candy.", ['🥦', '🍬'], 1]],
      ['==should== = deveria · ==shouldn\'t== = não deveria', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Should', 'Complete the sentence.', "Conselho: SHOULD (deveria) · SHOULDN'T (não deveria).", [
      ['🧼', 'You ___ wash your hands.', ['should', "shouldn't"], ['should'], { "shouldn't": 'Washing hands is good → SHOULD.' }],
      ['🍬', 'You ___ eat candy every day.', ["shouldn't", 'should'], ["shouldn't"], { should: 'Candy every day is bad → SHOULDN\'T.' }],
    ], ['bom → ==should== · ruim → ==shouldn\'t==', 'should + verbo (sem to)'], 'modals: should'),
  ], ['EF09LI16', 'EF09LI07', 'EF09LI16'], ['To be healthy, you should ', 'dar um conselho de saúde com should.', 'To be healthy, you should sleep eight hours.', 'modals: should']);
  c(2, 'Hi, checker! A post says [[soda|refrigerante]] is better than water. Check it!', [
    post_('A', 'A · Viral post', 'H', 'orange', '@HealthyHacks', '3 hours ago', 'Doctors say: you should drink soda, not water! It gives energy! 🥤', '12K SHARES'),
    bCaderno_('B', 'B · Health website', 'Official health website', ['You should drink water every day. You should not drink a lot of soda: it has a lot of sugar.']),
    bAudio_('nina', 'Dr. Nina', "I'm a doctor. That post is fake. Doctors never say that. Water is the best drink."),
  ], [
    bLerOuvir_([['What should you drink every day?', ['water', 'soda', 'coffee'], 0], ['Is the post true?', ["No, it's fake.", "Yes, it's true.", 'Doctors say yes.'], 0]],
      ['Website: "You should drink ==water=="', 'Nina: "That post is ==fake=="'], 'fake news'),
    bBlocos_("Should or shouldn't?", 'Complete the sentences.', "should = deveria · shouldn't = não deveria.", [
      ['', 'You ___ drink water every day.', ['should', "shouldn't", 'must not'], ['should'], { "shouldn't": 'Water is good → SHOULD.' }],
      ['', 'You ___ drink a lot of soda.', ["shouldn't", 'should', 'have to'], ["shouldn't"], { should: 'A lot of sugar → SHOULDN\'T.' }],
      ['', 'You should ___ the source.', ['check', 'to check', 'checks'], ['check'], { 'to check': 'should + verb (no TO) → CHECK.' }],
    ], ['==should== + verbo puro', "You ==shouldn't== drink a lot of soda."], 'modals: should'),
    { titulo: 'How to check news', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the tips.', 'Separe: o que você DEVE e o que NÃO DEVE fazer com uma notícia.']],
      dicas: ['==Check the source== = verifique a fonte.', "==Share without reading== = compartilhar sem ler (don't!)"],
      partes: [{ tipo: 'separar', caixas: ['You should', "You shouldn't"], itens: [
        { texto: 'check the source', resposta: 0 }, { texto: 'share without reading', resposta: 1 }, { texto: 'read the full text', resposta: 0 },
        { texto: 'believe every post', resposta: 1 }, { texto: 'check the date', resposta: 0 }, { texto: 'trust only the likes', resposta: 1 }] }],
      solucao: '**Should**: check the source, read the full text, check the date · **Shouldn\'t**: share without reading, believe every post, trust only the likes',
      etiquetas: [{ codigo: 'EF09LI06', foco: 'fake news (como checar)' }] },
  ], ['EF09LI06', 'EF09LI16', 'EF09LI06'], ['Before you share a post, you should ', 'dar um conselho para checar notícias.', 'Before you share a post, you should check the source.', 'modals: should']);
  c(3, 'Hi, checker! Who created the fake [[health tip|dica de saúde]]?', [
    post_('A', 'A · Viral post', 'H', 'orange', '@HealthyHacks', '3 hours ago', 'Doctors say: you should drink soda, not water! It gives energy! 🥤', '12K SHARES'),
    bFichas_([['paulo', 'PAULO', ['owns a soda shop', 'account: @HealthyHacks']], ['nina', 'DR. NINA', ['doctor', 'account: @DrNina']], ['pedro', 'PEDRO', ['student', 'shared the post']]]),
    bAudio_('nadia', 'Editor Nadia', 'Fake news often helps someone. Who wants to sell more soda?'),
  ], [
    bQuem_('Who created the post?', 'Click the person.', 'Clique em quem criou o post falso.',
      [{ personagem: 'paulo', texto: 'PAULO' }, { personagem: 'nina', texto: 'DR. NINA' }, { personagem: 'pedro', texto: 'PEDRO' }], 0,
      { 1: 'Dr. Nina said the post is fake.', 2: 'Pedro only shared it. Who owns @HealthyHacks?' }, ['The post is from ==@HealthyHacks==.', 'Who wants to sell ==soda==?'], "It's **Paulo**: he owns a soda shop!"),
    bOuvirPista_("Nadia's message", [['Who does fake news often help?', ['someone', 'nobody', 'doctors'], 0], ['What does someone want to sell?', ['soda', 'water', 'books'], 0]],
      ['Listen for ==helps== and ==sell==.', 'Nadia: "Who wants to sell more ==soda==?"'], 'compreensão oral'),
    bBlocos_('Must, have to, should', 'Complete the sentences.', 'must/have to = obrigação · should = conselho.', [
      ['', 'Journalists ___ tell the truth. It is a rule.', ['must', 'should', "don't have to"], ['must'], { should: 'A rule = obligation → MUST.' }],
      ['', 'Paulo ___ to delete the post.', ['has', 'have', 'must'], ['has'], { have: 'Paulo = he → HAS to.' }],
      ['', 'You ___ share fake news!', [MUSTNT, 'must', 'have to'], [MUSTNT], { must: 'Prohibited → MUSTN\'T.' }],
    ], ['==must== / ==has to== = obrigação', "==mustn't== = proibido"], 'modals: must / have to'),
    bVF_([['Paulo owns a soda shop.', true], ['Dr. Nina created the post.', false], ['Pedro shared the post.', true], ['Doctors say soda is better than water.', false]],
      ['Check clue B.', 'Dr. Nina is a ==doctor==.'], 'fake news'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI16', 'EF09LI06'], ['Fake news is dangerous because ', 'explicar por que fake news é perigosa.', 'Fake news is dangerous because people believe it and make bad choices.', 'fake news']);

  c = m9('rules', '2026-04', 'APR·2', 'The New School Rules');
  c(1, 'Hi, checker! There is a [[rumour|boato]] about new school rules. Let\'s learn the rules!', [], [
    bFiguras_([['👕', ['wear a uniform', 'run'], 0], ['📵', ['use phones', 'no phones'], 1], ['⏰', ['be on time', 'be late'], 0], ['🍔', ['eat in the library', 'no food in the library'], 1]],
      ['==wear a uniform== = usar uniforme · ==be on time== = chegar no horário', '📵 = ==no phones== (proibido celular)'], 'modals: must (vocabulário)'),
    bOuvir_([['You must be on time.', ['⏰', '🛌'], 0], ["You mustn't run in the hall.", ['🚶', '🏃'], 1]],
      ['==must== = precisa (obrigação) · ==mustn\'t== = proibido', '==run== = correr 🏃'], 'compreensão oral'),
    bBlocos_("Must or mustn't?", 'Complete the sentence.', "MUST = é obrigatório · MUSTN'T = é proibido.", [
      ['👕', 'You ___ wear a uniform.', ['must', MUSTNT], ['must'], { "mustn't": 'It is a rule to wear it → MUST.' }],
      ['🍔', 'You ___ eat in the library.', [MUSTNT, 'must'], [MUSTNT], { must: 'No food in the library → MUSTN\'T.' }],
    ], ['obrigação → ==must== · proibição → ==mustn\'t==', "You ==mustn't== eat in the library."], 'modals: must'),
  ], ['EF09LI16', 'EF09LI07', 'EF09LI16'], ['At my school, you must ', 'escrever uma regra da sua escola.', "At my school, you must wear a uniform. You mustn't run in the hall.", 'modals: must']);
  c(2, 'Hi, checker! A post says students [[have to|têm que]] study on Saturdays. Is it true?', [
    post_('A', 'A · Viral post', 'S', 'pop', '@SchoolGossip', 'yesterday', 'NEW RULE: from May, students have to study on Saturdays! 😱', '900 SHARES'),
    bCaderno_('B', 'B · Official notice', 'Principal · New rules 2026', ['1. Students must wear a uniform.', "2. Students don't have to bring books on Fridays.", '3. Students mustn\'t use phones in class.']),
    bAudio_('tom', 'Mr. Tom · principal', "There's no Saturday class. Students don't have to come on Saturdays."),
  ], [
    bLerOuvir_([['Do students have to study on Saturdays?', ["No, they don't.", 'Yes, they do.', 'Yes, they must.'], 0], ['What must students wear?', ['a uniform', 'a hat', 'sneakers'], 0]],
      ['Tom: "Students ==don\'t have to== come on Saturdays."', 'Notice: "must wear a ==uniform=="'], 'fake news'),
    { titulo: 'What does it mean?', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['👀', 'Read the notice.', 'Leia o aviso (pista B).'], ['🧩', 'Match the rules.', 'Coloque o significado embaixo de cada expressão.']],
      dicas: ["==mustn't== = é proibido", "==don't have to== = não precisa (é opcional)"],
      partes: [{ tipo: 'associar', alvos: [{ texto: 'must', resposta: 1 }, { texto: "mustn't", resposta: 2 }, { texto: "don't have to", resposta: 0 }], blocos: ["it isn't necessary", 'it is necessary', 'it is prohibited'] }],
      solucao: "**must** = it is necessary · **mustn't** = it is prohibited · **don't have to** = it isn't necessary",
      etiquetas: [{ codigo: 'EF09LI16', foco: "modals: must × don't have to" }] },
    bBlocos_('The real rules', 'Complete the sentences.', "must · mustn't · don't have to.", [
      ['', 'Students ___ use phones in class.', [MUSTNT, 'must', "don't have to"], [MUSTNT], { must: 'Phones are prohibited → MUSTN\'T.' }],
      ['', 'Students ___ bring books on Fridays.', ["don't have to", MUSTNT, 'must'], ["don't have to"], { "mustn't": "It's not necessary (not prohibited) → DON'T HAVE TO." }],
      ['', 'The post is ___.', ['fake', 'true', 'official'], ['fake'], { true: 'There is no Saturday class → FAKE.' }],
    ], ["proibido → ==mustn't== · opcional → ==don't have to==", 'O post é ==fake=='], 'modals: must / have to'),
  ], ['EF09LI06', 'EF09LI16', 'EF09LI16'], ["At home, I don't have to ", 'contar algo que você não precisa fazer em casa.', "At home, I don't have to wash the dishes, but I have to make my bed.", 'modals: have to']);
  c(3, 'Hi, checker! Someone [[changed|mudou]] the notice and started the rumour. Who?', [
    bCaderno_('B', 'B · Fake notice', 'Principal · New rules 2026', ['1. Students must wear a uniform.', '2. Students have to study on Saturdays.', '3. Students mustn\'t use phones in class.']),
    bFichas_([['leo', 'LEO', ['has the key of the notice board', 'hates uniforms']], ['ana', 'ANA', ['wants more study time', 'has the key of the notice board']], ['sam', 'SAM', ['wants more study time', 'has no key']]]),
    bAudio_('tom', 'Mr. Tom · principal', 'The person who changed the notice has the key, and this person wants more study time.'),
  ], [
    bQuem_('Who changed the notice?', 'Click the person.', 'Clique em quem mudou o aviso.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'ana', texto: 'ANA' }, { personagem: 'sam', texto: 'SAM' }], 1,
      { 0: 'Leo has the key, but he hates uniforms. He did not ask for more study.', 2: 'Sam has no key.' }, ['==The key== + ==more study time==.', 'Check clue B.'], 'It was **Ana**!'),
    bOuvirPista_("Mr. Tom's message", [['What does the person have?', ['the key', 'a phone', 'a uniform'], 0], ['What does the person want?', ['more study time', 'no uniform', 'Saturday off'], 0]],
      ['Listen for ==key== and ==study==.', 'Tom: "wants more ==study time=="'], 'compreensão oral'),
    bBlocos_('Have to / has to', 'Complete the sentences.', 'I/you/we/they HAVE to · he/she HAS to.', [
      ['', 'Ana ___ to talk to the principal.', ['has', 'have', 'must'], ['has'], { have: 'Ana = she → HAS to.' }],
      ['', 'Students ___ have to study on Saturdays.', [DONT, DOESNT, MUSTNT], [DONT], { "doesn't": "Students = they → DON'T have to." }],
      ['', 'You ___ change official notices!', [MUSTNT, "don't have to", 'should'], [MUSTNT], { "don't have to": 'It is prohibited → MUSTN\'T.' }],
    ], ['she ==has to== · they ==don\'t have to==', "proibido → ==mustn't=="], 'modals: must / have to'),
    bVF_([['Ana has the key.', true], ['Sam has the key.', false], ['Leo hates uniforms.', true], ['Students have to study on Saturdays.', false]],
      ['Check clues B and C.', 'Sam has ==no key==.'], 'cruzar informações'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI16', 'EF09LI07'], ['A good school rule is: students must ', 'criar uma regra nova para a escola.', 'A good school rule is: students must recycle their trash.', 'modals: must']);

  // ======================================================== JUNHO · fato × opinião, argumentos, conectores
  c = m9('a9', '2026-06', 'JUN·1', 'The Best Pizza in Town');
  c(1, 'Hi, checker! A post says "This is the best pizza in town!" Is it a [[fact|fato]] or an [[opinion|opinião]]?', [], [
    bFiguras_([['🍕', ['The pizza costs $10.', 'The pizza is delicious.'], 0], ['😋', ['The pizza costs $10.', 'The pizza is delicious.'], 1], ['🕗', ['It opens at 8.', 'It is the best place.'], 0], ['⭐', ['It opens at 8.', 'It is the best place.'], 1]],
      ['==fact== = fato: dá para provar (preço, horário)', '==opinion== = opinião: o que alguém acha (delicious, best)'], 'fato × opinião'),
    bOuvir_([['I think the pizza is amazing.', ['opinion', 'fact'], 0, 'pilulas'], ['The shop opened in 2010.', ['opinion', 'fact'], 1, 'pilulas']],
      ['==I think== = opinião', '==opened in 2010== = fato (dá para provar)'], 'compreensão oral'),
    bBlocos_('Because, but, so', 'Complete the sentence.', 'BECAUSE = porque · BUT = mas.', [
      ['🍕', 'I like this pizza ___ it has a lot of cheese.', ['because', 'but'], ['because'], { but: 'A reason → BECAUSE.' }],
      ['💸', 'The pizza is good, ___ it is expensive.', ['but', 'because'], ['but'], { because: 'An opposite idea → BUT.' }],
    ], ['motivo → ==because== · ideia contrária → ==but==', 'good, ==but== expensive'], 'connectors'),
  ], ['EF09LI06', 'EF09LI07', 'EF09LI14'], ['In my opinion, the best food is ', 'dar sua opinião sobre uma comida e dizer por quê.', 'In my opinion, the best food is pizza because it has cheese.', 'fato × opinião']);
  c(2, 'Hi, checker! Read the pizza [[reviews|avaliações]]. Find facts and opinions!', [
    { id: 'A', aba: 'A · Reviews', moldura: 'celular', blocos: [{ tipo: 'post', meta: 'Ben ⭐⭐⭐⭐⭐', texto: 'The best pizza in town! It is delicious.' }, { tipo: 'post', meta: 'Lucy ⭐⭐', texto: 'I waited 40 minutes, so I was angry. The pizza was cold.' }] },
    bCaderno_('B', 'B · Menu', "Mario's Pizza", ['Open from 6 pm to 11 pm.', 'Large pizza: $12.', 'Opened in 2015.']),
    bAudio_('mia', 'Mia', "I think Mario's pizza is good, but it is too slow."),
  ], [
    bLerOuvir_([['How long did Lucy wait?', ['40 minutes', '10 minutes', '1 hour'], 0], ['What does Mia think?', ['good, but too slow', 'the best pizza', 'very cheap'], 0]],
      ['Lucy: "I waited ==40 minutes=="', 'Mia: "good, ==but== it is too slow"'], 'localizar informação'),
    { titulo: 'Fact or opinion?', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👀', 'Read clues A and B.', 'Leia as avaliações e o cardápio.'], ['👆', 'Click FACT or OPINION.', 'FATO = dá para provar. OPINIÃO = o que alguém acha.']],
      dicas: ['Price and time = ==FACT==.', '==best== and ==delicious== = OPINION.'],
      partes: [{ tipo: 'classificar', categorias: ['FACT', 'OPINION'], itens: [
        { texto: 'A large pizza costs $12.', resposta: 0 }, { texto: 'It is the best pizza in town.', resposta: 1 },
        { texto: 'It opened in 2015.', resposta: 0 }, { texto: 'The pizza is delicious.', resposta: 1 }] }],
      solucao: '**Facts**: $12, opened in 2015 · **Opinions**: the best pizza, delicious',
      etiquetas: [{ codigo: 'EF09LI06', foco: 'fato × opinião' }] },
    bBlocos_('Connectors', 'Complete the sentences.', 'because = porque · but = mas · so = então.', [
      ['', 'Lucy waited 40 minutes, ___ she was angry.', ['so', 'but', 'because'], ['so'], { because: 'A result → SO.' }],
      ['', 'The pizza is good, ___ it is slow.', ['but', 'so', 'because'], ['but'], { so: 'An opposite idea → BUT.' }],
      ['', 'Ben gave 5 stars ___ he loved the pizza.', ['because', 'so', 'but'], ['because'], { so: 'A reason → BECAUSE.' }],
    ], ['==because== motivo · ==so== resultado · ==but== contraste', 'waited, ==so== angry'], 'connectors'),
  ], ['EF09LI07', 'EF09LI06', 'EF09LI14'], ['I like this place, but ', 'escrever uma avaliação curta com because/but/so.', "I like this place, but it is noisy, so I don't go there often.", 'connectors']);
  c(3, "Hi, checker! One review is [[fake|falsa]]: it was written before the shop opened. Which one?", [
    { id: 'A', aba: 'A · Reviews', moldura: 'celular', blocos: [{ tipo: 'post', meta: 'Ben · 2018', texto: 'The best pizza in town!' }, { tipo: 'post', meta: 'Lucy · 2014', texto: 'Amazing pizza! Five stars!' }, { tipo: 'post', meta: 'Sam · 2020', texto: 'Good pizza, but slow.' }] },
    bCaderno_('B', 'B · Menu', "Mario's Pizza", ['Open from 6 pm to 11 pm.', 'Large pizza: $12.', 'Opened in 2015.']),
    bAudio_('nadia', 'Editor Nadia', 'A real review must come after the opening date. Check the years!'),
  ], [
    bQuem_('Which review is fake?', 'Click the review.', 'Clique na avaliação falsa.',
      [{ personagem: 'ben', texto: 'BEN · 2018' }, { personagem: 'lucy', texto: 'LUCY · 2014' }, { personagem: 'sam', texto: 'SAM · 2020' }], 1,
      { 0: '2018 is after 2015.', 2: '2020 is after 2015.' }, ['The shop ==opened in 2015==.', 'Which review is ==before 2015==?'], "**Lucy's** review is fake: 2014 is before the shop opened!"),
    bOuvirPista_("Nadia's message", [['When must a real review come?', ['after the opening', 'before the opening', 'any time'], 0], ['What should you check?', ['the years', 'the stars', 'the photos'], 0]],
      ['Listen for ==after== and ==years==.', 'Nadia: "Check the ==years=="'], 'compreensão oral'),
    bBlocos_('Arguments', 'Complete the sentences.', 'because · so · however (porém).', [
      ['', "Lucy's review is fake ___ the shop opened in 2015.", ['because', 'so', 'however'], ['because'], { so: 'A reason → BECAUSE.' }],
      ['', 'Sam liked the pizza. ___, it was slow.', ['However', 'Because', 'So'], ['However'], { So: 'An opposite idea → HOWEVER.' }],
      ['', 'The review is fake, ___ we must report it.', ['so', 'because', 'however'], ['so'], { because: 'A result → SO.' }],
    ], ['==however== = porém (contraste)', 'fake, ==so== we must report it'], 'connectors'),
    bVF_([['The shop opened in 2015.', true], ["Ben's review is from 2014.", false], ["Sam's review is real.", true], ['The best pizza in town is a fact.', false]],
      ['Check clues A and B.', '"the best" is an ==opinion==.'], 'fato × opinião'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI14', 'EF09LI06'], ['The review is fake because ', 'explicar a checagem com because.', 'The review is fake because it was written before 2015.', 'argumentos']);

  c = m9('debate', '2026-06', 'JUN·2', 'The Phone Debate');
  c(1, 'Hi, checker! Today we have a [[debate|debate]]: phones at school. For or against?', [], [
    bFiguras_([['👍', ['for', 'against'], 0], ['👎', ['for', 'against'], 1], ['🔍', ['research', 'games'], 0], ['😵', ['focus', 'distraction'], 1]],
      ['==for== = a favor 👍 · ==against== = contra 👎', '==research== = pesquisa · ==distraction== = distração'], 'argumentos (vocabulário)'),
    bOuvir_([['Phones help us do research.', ['👍', '👎'], 0], ['Phones are a big distraction.', ['👍', '👎'], 1]],
      ['==help us== = argumento a favor 👍', '==distraction== = argumento contra 👎'], 'compreensão oral'),
    bBlocos_('First conditional', 'Complete the sentence.', 'If + presente, … WILL + verbo.', [
      ['📵', 'If we use phones in class, we ___ lose focus.', ['will', 'are'], ['will'], { are: 'If…, … WILL + verb.' }],
      ['📚', 'If you study, you ___ pass.', ['will', 'wills'], ['will'], { wills: 'WILL never takes -s.' }],
    ], ['If + presente → ==will== + verbo', 'If you study, you ==will== pass.'], 'conditionals (first)'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI15'], ['I am for phones at school because ', 'dar sua opinião sobre celular na escola.', 'I am against phones at school because they are a distraction.', 'argumentos']);
  c(2, 'Hi, checker! Read the debate [[arguments|argumentos]]. For or against?', [
    { id: 'A', aba: 'A · Debate', moldura: 'celular', blocos: [{ tipo: 'post', meta: 'Pedro · FOR', texto: 'Phones help us do research. Also, we can use dictionaries.' }, { tipo: 'post', meta: 'Ana · AGAINST', texto: 'Phones are a distraction. However, they are useful at home.' }] },
    bCaderno_('B', 'B · School survey', 'Survey: 200 students', ['120 students: phones distract them in class.', '80 students: phones help them study.']),
    bAudio_('tom', 'Mr. Tom · principal', 'If most students say phones distract them, we will keep phones off in class.'),
  ], [
    bLerOuvir_([['How many students say phones distract them?', ['120', '80', '200'], 0], ['What will the school do?', ['keep phones off in class', 'give phones to students', 'nothing'], 0]],
      ['Survey: "==120== students: phones distract them"', 'Tom: "we will keep phones ==off== in class"'], 'localizar informação'),
    { titulo: 'For or against?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the arguments.', 'Separe: argumentos A FAVOR e CONTRA o celular na escola.']],
      dicas: ['==help==, ==useful== → for', '==distraction==, ==cheat== → against'],
      partes: [{ tipo: 'separar', caixas: ['FOR 👍', 'AGAINST 👎'], itens: [
        { texto: 'Phones help us do research.', resposta: 0 }, { texto: 'Phones are a distraction.', resposta: 1 }, { texto: 'We can use dictionaries.', resposta: 0 },
        { texto: 'Students can cheat on tests.', resposta: 1 }, { texto: 'We can take photos of the board.', resposta: 0 }, { texto: 'Some students play games in class.', resposta: 1 }] }],
      solucao: '**For**: research, dictionaries, photos of the board · **Against**: distraction, cheating, games',
      etiquetas: [{ codigo: 'EF09LI07', foco: 'argumentos' }] },
    bBlocos_('Connectors', 'Complete the sentences.', 'also = também · however = porém.', [
      ['', 'Phones help us do research. ___, we can use dictionaries.', ['Also', 'However', 'Because'], ['Also'], { However: 'Another idea in the same direction → ALSO.' }],
      ['', 'Phones are a distraction. ___, they are useful at home.', ['However', 'Also', 'So'], ['However'], { Also: 'An opposite idea → HOWEVER.' }],
      ['', 'If phones distract students, the school ___ keep them off.', ['will', 'is', 'would'], ['will'], { is: 'If…, … WILL + verb.' }],
    ], ['==also== soma · ==however== contraste', 'If…, … ==will== + verbo'], 'connectors'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI14'], ['Phones are useful. However, ', 'escrever um argumento com however.', 'Phones are useful. However, students must use them only for research.', 'connectors']);
  c(3, 'Hi, checker! A post says "Most students want phones in class". Is it [[true|verdade]]?', [
    post_('A', 'A · Viral post', 'P', 'go', '@PhoneLovers', 'today', 'Survey: MOST students want phones in class! 📱', '2K SHARES'),
    bCaderno_('B', 'B · School survey', 'Survey: 200 students', ['120 students: phones distract them in class.', '80 students: phones help them study.']),
    bAudio_('pedro', 'Pedro', "I'm for phones, but the post is not true. Most students said phones distract them."),
  ], [
    bQuem_('What is the truth?', 'Click the right headline.', 'Clique na manchete correta.',
      ['MOST students want phones in class.', 'MOST students say phones distract them.', 'NO students use phones.'], 1,
      { 0: '80 is less than 120.', 2: '80 students say phones help them.' }, ['Compare ==120== and ==80==.', 'Most = more than half (100).'], 'The truth: **most students (120) say phones distract them**.', 'lista'),
    bOuvirPista_("Pedro's message", [['Is Pedro for or against phones?', ['for', 'against', 'he has no opinion'], 0], ['Is the post true?', ["No, it isn't.", 'Yes, it is.', 'Yes, he is.'], 0]],
      ['Listen for ==for== and ==not true==.', 'Pedro: "the post is ==not true=="'], 'compreensão oral'),
    bBlocos_('If…', 'Complete the sentences.', 'If + presente, … will · If + passado, … would.', [
      ['', 'If the school keeps phones off, students ___ focus more.', ['will', 'would', 'are'], ['will'], { would: 'If + present → WILL.' }],
      ['', 'If you ___ the survey, you will see the truth.', ['read', 'will read', 'reads'], ['read'], { 'will read': 'After IF → present: READ.' }],
      ['', "If the post ___ true, I would share it. But it isn't!", ['were', 'is', 'will be'], ['were'], { is: "It isn't true: imaginary → IF … WERE." }],
    ], ['If + presente → ==will== · If + ==were== → would', 'If you ==read==…, you will…'], 'conditionals'),
    bVF_([['120 students say phones distract them.', true], ['Most students want phones in class.', false], ['Pedro is for phones.', true], ['The post is true.', false]],
      ['Check clue B.', '==120== > 80'], 'fato × opinião'),
  ], ['EF09LI06', 'EF09LI07', 'EF09LI15', 'EF09LI06'], ['If my school allows phones, ', 'completar com uma consequência (first conditional).', 'If my school allows phones, I will use them for research.', 'conditionals (first)']);

  // ======================================================== AGOSTO · condicionais 1 e 2
  c = m9('a9', '2026-08', 'AUG·1', 'The Festival Rumour');
  c(1, 'Hi, checker! A post says the school [[festival|festa]] is cancelled. Let\'s check!', [], [
    bFiguras_([['🌧️', ['If it rains, we will stay inside.', 'If it is sunny, we will go to the park.'], 0], ['☀️', ['If it rains, we will stay inside.', 'If it is sunny, we will go to the park.'], 1], ['📚', ['If you study, you will pass.', 'If you sleep, you will be tired.'], 0], ['🥶', ['If it is hot, we will swim.', 'If it is cold, we will wear coats.'], 1]],
      ['==If it rains== = se chover', '==we will stay inside== = vamos ficar dentro'], 'conditionals (first)'),
    bOuvir_([['If it rains, the festival will be in the gym.', ['🏀', '🏖️'], 0], ['If you come early, you will get a free drink.', ['🍕', '🥤'], 1]],
      ['==gym== = ginásio 🏀', '==free drink== = bebida grátis 🥤'], 'compreensão oral'),
    bBlocos_('First conditional', 'Complete the sentence.', 'If + presente, … will + verbo.', [
      ['🌧️', 'If it ___, we will stay inside.', ['rains', 'will rain'], ['rains'], { 'will rain': 'After IF → present: RAINS.' }],
      ['☀️', 'If it is sunny, we ___ play outside.', ['will', 'are'], ['will'], { are: 'If…, … WILL + verb.' }],
    ], ['==If== + presente, ... ==will== + verbo', 'If it ==rains==, we will…'], 'conditionals (first)'),
  ], ['EF09LI15', 'EF09LI07', 'EF09LI15'], ['If it rains tomorrow, I will ', 'contar o que você vai fazer se chover amanhã.', 'If it rains tomorrow, I will watch movies at home.', 'conditionals (first)']);
  c(2, 'Hi, checker! Is the [[festival|festa]] cancelled? Read the clues!', [
    post_('A', 'A · Viral post', 'F', 'pop', '@FestNews', '1 hour ago', 'The school festival is CANCELLED because of rain! 😭', '600 SHARES'),
    bCaderno_('B', 'B · Official notice', 'School festival · Saturday', ['If it rains, the festival will be in the gym.', 'If it is sunny, the festival will be in the park.']),
    bAudio_('tom', 'Mr. Tom · principal', "The festival isn't cancelled. If it rains, we will move it to the gym. That's all!"),
  ], [
    bLerOuvir_([['Is the festival cancelled?', ["No, it isn't.", 'Yes, it is.', 'Yes, because of rain.'], 0], ['Where will the festival be if it rains?', ['in the gym', 'in the park', 'at home'], 0]],
      ['Tom: "The festival ==isn\'t cancelled=="', 'Notice: "If it rains, ... in the ==gym=="'], 'fake news'),
    { titulo: 'If … then …', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['👀', 'Read the notice.', 'Leia o aviso (pista B).'], ['🧩', 'Match the two halves.', 'Ligue cada condição (if) à sua consequência.']],
      dicas: ['Rain → ==gym==. Sun → ==park==.', 'Early → ==free drink==.'],
      partes: [{ tipo: 'associar', alvos: [{ texto: 'If it rains,', resposta: 1 }, { texto: 'If it is sunny,', resposta: 0 }, { texto: 'If you come early,', resposta: 2 }], blocos: ['the festival will be in the park.', 'the festival will be in the gym.', 'you will get a free drink.'] }],
      solucao: '**rains** → gym · **sunny** → park · **early** → free drink',
      etiquetas: [{ codigo: 'EF09LI15', foco: 'conditionals (first)' }] },
    bBlocos_('First conditional', 'Complete the sentences.', 'If + presente, … will + verbo.', [
      ['', 'If it ___ sunny, the festival will be in the park.', ['is', 'will be', 'are'], ['is'], { 'will be': 'After IF → present: IS.' }],
      ['', 'If it rains, they ___ move it to the gym.', ['will', 'would', 'are'], ['will'], { would: 'Real possibility → WILL.' }],
      ['', 'If you share fake news, people ___ believe it.', ['will', 'wills', 'are'], ['will'], { wills: 'WILL never takes -s.' }],
    ], ['If + ==presente==, ... ==will==', 'If it ==is== sunny…'], 'conditionals (first)'),
  ], ['EF09LI06', 'EF09LI15', 'EF09LI15'], ['If I go to the festival, I will ', 'contar o que você vai fazer na festa.', 'If I go to the festival, I will eat popcorn.', 'conditionals (first)']);
  c(3, 'Hi, checker! Who posted the festival [[rumour|boato]]?', [
    post_('A', 'A · Viral post', 'F', 'pop', '@FestNews', 'Friday · 8 pm', 'The school festival is CANCELLED because of rain! 😭', '600 SHARES'),
    bFichas_([['leo', 'LEO', ['didn\'t read the notice', 'was at home on Friday night']], ['bia', 'BIA', ['read the notice', 'was at home on Friday night']], ['sam', 'SAM', ['didn\'t read the notice', 'was at a party on Friday night, no phone']]]),
    bAudio_('nadia', 'Editor Nadia', "If the person had read the notice, they wouldn't post it. So the person didn't read it, and was online at 8 pm."),
  ], [
    bQuem_('Who posted the rumour?', 'Click the person.', 'Clique em quem postou o boato.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'bia', texto: 'BIA' }, { personagem: 'sam', texto: 'SAM' }], 0,
      { 1: 'Bia read the notice.', 2: 'Sam had no phone on Friday night.' }, ["==Didn't read the notice== + ==at home (online)== on Friday.", 'Check clue B.'], 'It was **Leo**!'),
    bOuvirPista_("Nadia's message", [['Did the person read the notice?', ["No, they didn't.", 'Yes, they did.', 'Yes, at 8 pm.'], 0], ['When was the person online?', ['at 8 pm', 'at 8 am', 'on Saturday'], 0]],
      ['Listen for ==didn\'t read== and ==8 pm==.', 'Nadia: "online at ==8 pm=="'], 'compreensão oral'),
    bBlocos_('Conditionals', 'Complete the sentences.', 'real → If + presente, will · imaginário → If + passado, would.', [
      ['', 'If Leo reads the notice, he ___ delete the post.', ['will', 'would', 'is'], ['will'], { would: 'Real possibility → WILL.' }],
      ['', 'If I ___ Leo, I would say sorry.', ['were', 'am', 'will be'], ['were'], { am: 'Imaginary (I am not Leo) → IF I WERE.' }],
      ['', "If people check the notice, they ___ believe the rumour.", [WONT, "wouldn't", "don't"], [WONT], { "wouldn't": "Real possibility → WON'T." }],
    ], ['real → ==will== · imaginário → If I ==were==… would', "they ==won't== believe"], 'conditionals'),
    bVF_([['Bia read the notice.', true], ['Sam posted the rumour.', false], ['Leo was at home on Friday night.', true], ['The festival is cancelled.', false]],
      ['Check clue B.', 'Sam had ==no phone==.'], 'cruzar informações'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI15', 'EF09LI07'], ['If I were Leo, I would ', 'dizer o que você faria no lugar do Leo (second conditional).', 'If I were Leo, I would say sorry to the school.', 'conditionals (second)']);

  c = m9('wish', '2026-08', 'AUG·2', 'If I Were a Millionaire');
  c(1, 'Hi, checker! What would you do if you [[were|fosse]] a millionaire?', [], [
    bFiguras_([['✈️', ['travel the world', 'clean the house'], 0], ['🏠', ['buy a bike', 'buy a house'], 1], ['🎁', ['help my family', 'sleep all day'], 0], ['🐶', ['go to school', 'adopt a dog'], 1]],
      ['==travel the world== = viajar pelo mundo', '==adopt a dog== = adotar um cachorro'], 'conditionals (second)'),
    bOuvir_([['If I were rich, I would travel the world.', ['✈️', '🏠'], 0], ['If I had a big house, I would adopt a dog.', ['🐱', '🐶'], 1]],
      ['==If I were rich== = se eu fosse rico', '==I would travel== = eu viajaria'], 'compreensão oral'),
    bBlocos_('Second conditional', 'Complete the sentence.', 'Situação imaginária: If + passado, … WOULD + verbo.', [
      ['💰', 'If I ___ a millionaire, I would travel.', ['were', 'am'], ['were'], { am: 'Imaginary → IF I WERE.' }],
      ['🐶', 'If I had money, I ___ adopt a dog.', ['would', 'will'], ['would'], { will: 'Imaginary → WOULD.' }],
    ], ['If I ==were== … I ==would== …', 'situação imaginária → ==would=='], 'conditionals (second)'),
  ], ['EF09LI15', 'EF09LI07', 'EF09LI15'], ['If I were a millionaire, I would ', 'contar o que você faria se fosse milionário.', 'If I were a millionaire, I would help my family.', 'conditionals (second)']);
  c(2, 'Hi, checker! A post says a student [[won the lottery|ganhou na loteria]]. Is it true?', [
    post_('A', 'A · Viral post', 'L', 'sun', '@LuckyNews', 'today', 'A 9th grade student WON the lottery! He is buying a mansion! 🤑', '3K SHARES'),
    bCaderno_('B', 'B · School newspaper', 'Interview with Pedro', ['Q: What would you do if you won the lottery?', 'Pedro: If I won the lottery, I would buy a mansion. But I have never played the lottery!']),
    bAudio_('pedro', 'Pedro', "I didn't win anything! I only said what I would do. It was an imaginary question."),
  ], [
    bLerOuvir_([['Did Pedro win the lottery?', ["No, he didn't.", 'Yes, he did.', 'Yes, he would.'], 0], ['What would Pedro buy?', ['a mansion', 'a car', 'a dog'], 0]],
      ['Pedro: "I ==didn\'t win== anything!"', 'Interview: "I would buy a ==mansion=="'], 'fake news'),
    { titulo: 'Real or imaginary?', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👆', 'Click REAL or IMAGINARY.', 'A frase fala de algo REAL/possível (will) ou IMAGINÁRIO (would)?']],
      dicas: ['If + presente, ==will== → real', 'If + passado, ==would== → imaginary'],
      partes: [{ tipo: 'classificar', categorias: ['REAL', 'IMAGINARY'], itens: [
        { texto: 'If it rains, I will stay home.', resposta: 0 }, { texto: 'If I won the lottery, I would buy a mansion.', resposta: 1 },
        { texto: 'If you study, you will pass.', resposta: 0 }, { texto: 'If I were a bird, I would fly.', resposta: 1 }] }],
      solucao: '**Real**: rains/will stay, study/will pass · **Imaginary**: won/would buy, were a bird/would fly',
      etiquetas: [{ codigo: 'EF09LI15', foco: 'conditionals (first × second)' }] },
    bBlocos_('Second conditional', 'Complete the sentences.', 'If + passado, … would + verbo.', [
      ['', 'If I ___ the lottery, I would buy a mansion.', ['won', 'win', 'will win'], ['won'], { win: 'Imaginary → past: WON.' }],
      ['', 'If Pedro were rich, he ___ travel.', ['would', 'will', 'is'], ['would'], { will: 'Imaginary → WOULD.' }],
      ['', 'The post is fake. Pedro ___ win the lottery.', ["didn't", "wouldn't", "doesn't"], ["didn't"], { "wouldn't": "It is about the past (fact) → DIDN'T." }],
    ], ['If + ==passado==, ... ==would==', 'If I ==won==…'], 'conditionals (second)'),
  ], ['EF09LI06', 'EF09LI15', 'EF09LI15'], ['If I won the lottery, I would ', 'contar o que você faria se ganhasse na loteria.', 'If I won the lottery, I would build a school.', 'conditionals (second)']);
  c(3, 'Hi, checker! Who [[changed|mudou]] Pedro\'s words and wrote the fake post?', [
    bCaderno_('B', 'B · School newspaper', 'Interview with Pedro', ['Pedro: If I won the lottery, I would buy a mansion. But I have never played the lottery!']),
    bFichas_([['marcos', 'MARCOS', ['read the interview', 'account: @LuckyNews']], ['ana', 'ANA', ['wrote the interview', 'account: @AnaReports']], ['leo', 'LEO', ["didn't read the interview", 'account: @LeoGames']]]),
    bAudio_('nadia', 'Editor Nadia', "The writer read the interview, but changed 'would buy' to 'is buying'. Check the account name!"),
  ], [
    bQuem_('Who wrote the fake post?', 'Click the person.', 'Clique em quem escreveu o post falso.',
      [{ personagem: 'marcos', texto: 'MARCOS' }, { personagem: 'ana', texto: 'ANA' }, { personagem: 'leo', texto: 'LEO' }], 0,
      { 1: "Ana's account is @AnaReports.", 2: "Leo didn't read the interview." }, ['The post was on ==@LuckyNews==.', 'Check clue B.'], "It was **Marcos**: @LuckyNews is his account!"),
    bOuvirPista_("Nadia's message", [['What did the writer change?', ["'would buy' to 'is buying'", "'mansion' to 'car'", 'nothing'], 0], ['Did the writer read the interview?', ['Yes, they did.', "No, they didn't.", 'No, never.'], 0]],
      ['Listen for ==changed== and ==read==.', "Nadia: \"changed 'would buy' to 'is buying'\""], 'compreensão oral'),
    bBlocos_('Conditionals', 'Complete the sentences.', 'real → will · imaginário → would.', [
      ['', 'If Marcos ___ the truth, he would delete the post.', ['told', 'tells', 'will tell'], ['told'], { tells: 'Imaginary → past: TOLD.' }],
      ['', 'If we publish the truth, people ___ understand.', ['will', 'would', 'are'], ['will'], { would: 'Real possibility → WILL.' }],
      ['', 'If I ___ Pedro, I would be angry.', ['were', 'am', 'was be'], ['were'], { am: 'Imaginary → IF I WERE.' }],
    ], ['real → ==will== · imaginário → ==would==', 'If I ==were== Pedro…'], 'conditionals'),
    bVF_([['Marcos read the interview.', true], ['Pedro won the lottery.', false], ['Ana wrote the interview.', true], ['"Would buy" means he is buying now.', false]],
      ['Check clues B and C.', '==would== = imaginary.'], 'fato × opinião'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI15', 'EF09LI06'], ['If I were a journalist, I would ', 'dizer o que você faria se fosse jornalista.', 'If I were a journalist, I would always check the facts.', 'conditionals (second)']);

  // ======================================================== OUTUBRO (2º caso) · present perfect + since / for
  c = m9('hack', '2026-10', 'OCT·2', 'The Hacked Account');
  c(1, 'Hi, checker! The school account [[has been hacked|foi invadida]]! Let\'s investigate.', [], [
    bFiguras_([['🔑', ['changed the password', 'eaten lunch'], 0], ['📤', ['slept', 'posted a photo'], 1], ['🗑️', ['deleted a post', 'played soccer'], 0], ['📩', ['read a book', 'sent a message'], 1]],
      ['==has changed the password== = mudou a senha', '==has posted== = postou · ==has sent== = enviou'], 'present perfect (vocabulário)'),
    bOuvir_([['Someone has changed the password.', ['🔑', '🍕'], 0], ['The hacker has posted a funny photo.', ['📩', '📤'], 1]],
      ['==has changed== = mudou', '==has posted== = postou 📤'], 'compreensão oral'),
    bBlocos_('Present perfect', 'Complete the sentence.', 'has/have + particípio (changed, posted).', [
      ['🔑', 'The hacker ___ changed the password.', ['has', 'have'], ['has'], { have: 'The hacker = he/she → HAS.' }],
      ['📤', 'They have ___ a photo.', ['posted', 'post'], ['posted'], { post: 'have + particípio → POSTED.' }],
    ], ['he/she ==has== · they ==have==', 'have ==posted=='], 'present perfect'),
  ], ['EF09LI21-JO', 'EF09LI07', 'EF09LI21-JO'], ['Today I have ', 'contar algo que você já fez hoje.', 'Today I have eaten breakfast and I have walked to school.', 'present perfect']);
  c(2, 'Hi, checker! Read the clues about the [[hacked|invadida]] account.', [
    post_('A', 'A · Hacked post', 'S', 'blue', '@SchoolOfficial', '2 hours ago', 'NO SCHOOL FOR A MONTH! 🎉🎉', '1K SHARES'),
    bCaderno_('B', 'B · Account log', 'Security log', ['The account has existed since 2019.', 'The password has not changed for three years.', 'Today: someone has logged in from a new phone.']),
    bAudio_('tom', 'Mr. Tom · principal', "We haven't posted that. The school has never cancelled classes for a month."),
  ], [
    bLerOuvir_([['Since when has the account existed?', ['since 2019', 'since 2023', 'for a month'], 0], ['Has the school posted that?', ["No, it hasn't.", 'Yes, it has.', 'Yes, today.'], 0]],
      ['Log: "==since 2019=="', 'Tom: "We ==haven\'t posted== that."'], 'localizar informação'),
    bBlocos_('Since or for?', 'Complete the sentences.', 'SINCE = desde (um ponto) · FOR = por (um período).', [
      ['', 'The account has existed ___ 2019.', ['since', 'for', 'ago'], ['since'], { for: '2019 is a point in time → SINCE.' }],
      ['', 'The password has not changed ___ three years.', ['for', 'since', 'ago'], ['for'], { since: 'Three years is a period → FOR.' }],
      ['', 'The school ___ never cancelled classes for a month.', ['has', 'have', 'is'], ['has'], { have: 'The school = it → HAS.' }],
    ], ['==since== 2019 · ==for== three years', 'The school ==has== never…'], 'since × for'),
    { titulo: 'Since or for?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the expressions.', 'Separe: SINCE (um ponto no tempo) e FOR (um período).']],
      dicas: ['Point: ==2019==, ==Monday==, ==8 am== → since', 'Period: ==three years==, ==two hours== → for'],
      partes: [{ tipo: 'separar', caixas: ['SINCE', 'FOR'], itens: [
        { texto: '2019', resposta: 0 }, { texto: 'three years', resposta: 1 }, { texto: 'Monday', resposta: 0 },
        { texto: 'two hours', resposta: 1 }, { texto: '8 am', resposta: 0 }, { texto: 'a long time', resposta: 1 }] }],
      solucao: '**since**: 2019, Monday, 8 am · **for**: three years, two hours, a long time',
      etiquetas: [{ codigo: 'EF09LI020-JO', foco: 'since × for' }] },
  ], ['EF09LI07', 'EF09LI020-JO', 'EF09LI020-JO'], ['I have studied at this school since ', 'contar desde quando ou há quanto tempo você estuda na escola.', 'I have studied at this school since 2020. I have known my best friend for five years.', 'since × for']);
  c(3, 'Hi, checker! Who [[hacked|invadiu]] the school account?', [
    bCaderno_('B', 'B · Account log', 'Security log', ['Today: someone has logged in from a NEW phone.', 'The hacker has used the password from a sticky note in the office.']),
    bFichas_([['leo', 'LEO', ['has had a new phone since Monday', 'has been in the office today']], ['bia', 'BIA', ['has had the same phone for 2 years', 'has been in the office today']], ['ana', 'ANA', ['has had a new phone since Monday', "hasn't been in the office"]]]),
    bAudio_('marcos', 'Marcos', 'The hacker has a new phone and has seen the sticky note in the office.'),
  ], [
    bQuem_('Who hacked the account?', 'Click the person.', 'Clique em quem invadiu a conta.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'bia', texto: 'BIA' }, { personagem: 'ana', texto: 'ANA' }], 0,
      { 1: 'Bia has had the same phone for 2 years.', 2: "Ana hasn't been in the office." }, ['==New phone== + ==the office==.', 'Check clue B.'], 'It was **Leo**!'),
    bOuvirPista_("Marcos's message", [['What kind of phone does the hacker have?', ['a new phone', 'an old phone', 'no phone'], 0], ['Where was the sticky note?', ['in the office', 'in the gym', 'in the library'], 0]],
      ['Listen for ==new phone== and ==office==.', 'Marcos: "the sticky note in the ==office=="'], 'compreensão oral'),
    bBlocos_('Present perfect + since/for', 'Complete the sentences.', 'has/hasn\'t + particípio · since/for.', [
      ['', 'Leo has had a new phone ___ Monday.', ['since', 'for', 'ago'], ['since'], { for: 'Monday is a point → SINCE.' }],
      ['', 'Bia has had her phone ___ two years.', ['for', 'since', 'already'], ['for'], { since: 'Two years is a period → FOR.' }],
      ['', 'Ana ___ been in the office.', [HASNT, HAVENT, "isn't"], [HASNT], { "haven't": "Ana = she → HASN'T." }],
    ], ['==since== Monday · ==for== two years', "she ==hasn't== been"], 'present perfect + since/for'),
    bVF_([['Leo has been in the office today.', true], ['Bia has a new phone.', false], ['Ana has had a new phone since Monday.', true], ['The school has posted "No school for a month".', false]],
      ['Check clue B.', 'Bia: the same phone for ==2 years==.'], 'cruzar informações'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI020-JO', 'EF09LI07'], ['To protect my account, I have ', 'contar o que você já fez para proteger suas contas.', 'To protect my account, I have changed my password.', 'present perfect']);

  // ======================================================== NOVEMBRO (2º caso) · ever / never / already / yet
  c = m9('travel', '2026-11', 'NOV·2', 'The Travel Influencer');
  c(1, 'Hi, checker! An [[influencer|influenciador]] says he has been to 50 countries. Let\'s check!', [], [
    bFiguras_([['🗼', ['been to Paris', 'been to Tokyo'], 0], ['🗻', ['been to Paris', 'been to Tokyo'], 1], ['✈️', ['flown on a plane', 'ridden a horse'], 0], ['🛂', ['lost a phone', 'got a passport'], 1]],
      ['==been to Paris== = esteve em Paris 🗼', '==got a passport== = tirou passaporte 🛂'], 'present perfect (particípios)'),
    bOuvir_([['Have you ever been to Paris?', ['🗼', '🗽'], 0], ['I have never flown on a plane.', ['🚌', '✈️'], 1]],
      ['==Have you ever…?== = você já…?', '==never flown== = nunca voou ✈️'], 'compreensão oral'),
    bBlocos_('Ever or never?', 'Complete the sentence.', 'EVER = alguma vez (pergunta) · NEVER = nunca.', [
      ['🗽', 'Have you ___ been to New York?', ['ever', 'never'], ['ever'], { never: 'A question → EVER.' }],
      ['✈️', 'I have ___ flown on a plane.', ['never', 'ever'], ['never'], { ever: 'Negative answer → NEVER.' }],
    ], ['pergunta → ==ever== · nunca → ==never==', 'Have you ==ever==…?'], 'ever / never'),
  ], ['EF09LI21-JO', 'EF09LI07', 'EF09LI020-JO'], ['I have never been to ', 'contar um lugar onde você nunca foi.', 'I have never been to the beach in winter.', 'present perfect']);
  c(2, 'Hi, checker! Check the [[influencer|influenciador]]\'s posts.', [
    post_('A', 'A · Profile', 'J', 'orange', '@JakeTravels', '50K followers', "I've already visited 50 countries! 🌍 I haven't been to Antarctica yet.", '20K LIKES'),
    bCaderno_('B', 'B · Passport', "Jake's passport", ['Stamps: Argentina, Chile, Uruguay.', 'Passport issued: January 2026.']),
    bAudio_('nadia', 'Editor Nadia', "A passport shows the countries you have visited. Jake's passport has only three stamps."),
  ], [
    bLerOuvir_([['How many stamps are in the passport?', ['three', 'fifty', 'none'], 0], ['Has Jake been to Antarctica?', ["No, he hasn't.", 'Yes, he has.', 'Yes, already.'], 0]],
      ['Nadia: "only ==three== stamps"', 'Post: "I haven\'t been to Antarctica ==yet=="'], 'fake news'),
    bBlocos_('Already or yet?', 'Complete the sentences.', 'ALREADY = já (afirmativa) · YET = ainda (negativa/pergunta, no fim).', [
      ['', "Jake says he has ___ visited 50 countries.", ['already', 'yet', 'ever'], ['already'], { yet: 'Affirmative → ALREADY.' }],
      ['', "He hasn't been to Antarctica ___.", ['yet', 'already', 'never'], ['yet'], { already: 'Negative, at the end → YET.' }],
      ['', 'Has he visited Chile ___?', ['yet', 'already', 'since'], ['yet'], { already: 'Question, at the end → YET.' }],
    ], ['afirmativa → ==already== · negativa/pergunta → ==yet==', "He hasn't been there ==yet==."], 'already / yet'),
    { titulo: 'True or false?', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👀', 'Read the passport.', 'Leia o passaporte (pista B).'], ['👆', 'Click TRUE or FALSE.', 'Compare as frases com o passaporte.']],
      dicas: ['Stamps: ==Argentina, Chile, Uruguay==.', '==Japan== is not in the passport.'],
      partes: [{ tipo: 'classificar', categorias: ['TRUE', 'FALSE'], itens: [
        { texto: 'Jake has been to Chile.', resposta: 0 }, { texto: 'Jake has been to 50 countries.', resposta: 1 },
        { texto: 'Jake has visited Uruguay.', resposta: 0 }, { texto: 'Jake has visited Japan.', resposta: 1 }] }],
      solucao: '**True**: Chile, Uruguay · **False**: 50 countries, Japan',
      etiquetas: [{ codigo: 'EF09LI06', foco: 'fake news (checar evidências)' }] },
  ], ['EF09LI06', 'EF09LI020-JO', 'EF09LI06'], ['I have already ', 'contar algo que você já fez este ano (already).', 'I have already visited my grandparents this year.', 'already / yet']);
  c(3, 'Hi, checker! Jake posted a photo "in Paris". Who [[took|tirou]] the photo?', [
    post_('A', 'A · Post', 'J', 'orange', '@JakeTravels', 'yesterday', "I've just arrived in Paris! 🗼 (photo by my friend)", '30K LIKES'),
    bFichas_([['paulo', 'PAULO', ['photographer', 'has never been to Paris', 'has a big Eiffel Tower model in his studio']], ['rosa', 'ROSA', ['has been to Paris', 'is in Paris now']], ['pedro', 'PEDRO', ['photographer', "hasn't met Jake yet"]]]),
    bAudio_('marcos', 'Marcos', 'The photo was not taken in Paris. It was taken in a studio, by a friend who has worked with Jake.'),
  ], [
    bQuem_('Who took the photo?', 'Click the person.', 'Clique em quem tirou a foto.',
      [{ personagem: 'paulo', texto: 'PAULO' }, { personagem: 'rosa', texto: 'ROSA' }, { personagem: 'pedro', texto: 'PEDRO' }], 0,
      { 1: 'The photo was taken in a studio, not in Paris.', 2: "Pedro hasn't met Jake yet." }, ['==A studio== + ==a friend of Jake==.', 'Who has an Eiffel Tower model?'], "It was **Paulo**: the 'Paris' photo was in his studio!"),
    bOuvirPista_("Marcos's message", [['Where was the photo taken?', ['in a studio', 'in Paris', 'in a park'], 0], ['Who took it?', ['a friend of Jake', 'Jake', 'a stranger'], 0]],
      ['Listen for ==studio== and ==friend==.', 'Marcos: "in a ==studio=="'], 'compreensão oral'),
    bBlocos_('Ever, never, already, yet', 'Complete the sentences.', 'ever · never · already · yet.', [
      ['', 'Paulo has ___ been to Paris.', ['never', 'ever', 'yet'], ['never'], { ever: 'Negative meaning → NEVER.' }],
      ['', "Pedro hasn't met Jake ___.", ['yet', 'already', 'ever'], ['yet'], { already: 'Negative, at the end → YET.' }],
      ['', 'Has Jake ___ told the truth?', ['ever', 'never', 'already'], ['ever'], { never: 'Question → EVER.' }],
    ], ['==never== · ==yet== · ==ever==', "hasn't met him ==yet=="], 'present perfect + ever/never/already/yet'),
    bVF_([['Paulo has never been to Paris.', true], ['The photo was taken in Paris.', false], ['Rosa is in Paris now.', true], ['Pedro has worked with Jake.', false]],
      ['Check clues B and C.', 'The photo was taken in a ==studio==.'], 'fato × opinião'),
  ], ['EF09LI07', 'EF09LI07', 'EF09LI020-JO', 'EF09LI06'], ['Have you ever ', 'escrever uma pergunta com "Have you ever…?" e responder.', "Have you ever been to Florianópolis? Yes, I have. I've been there twice.", 'present perfect']);

  // ======================================================== Exercícios avulsos (só para o "Meu reforço")
  L.push.apply(L, avulsosLeitura_('9º', [
    { texto: 'BTW, the test is tomorrow. Call me ASAP!', pergunta: "What does 'ASAP' mean?", opcoes: ['as soon as possible', 'always say a prayer', 'after school at the park'], resposta: 0, codigo: 'EF09LI13', foco: 'linguagem digital (acrônimos)' },
    { texto: 'English is an official language in India, Nigeria and Canada. In Brazil, we speak Portuguese.', pergunta: 'Where is English an official language?', opcoes: ['in India', 'in Brazil', 'in Argentina'], resposta: 0, codigo: 'EF09LI17', foco: 'English in the world' },
    { texto: 'The museum opened in 1998. I think it is the most boring place in town.', pergunta: 'Which part is an opinion?', opcoes: ['It is the most boring place.', 'It opened in 1998.', 'It is a museum.'], resposta: 0, codigo: 'EF09LI06', foco: 'fato × opinião' },
    { texto: 'A post says that eating carrots makes you see in the dark. Doctors say this is not true.', pergunta: 'Is the post true?', opcoes: ['No, it is fake news.', 'Yes, doctors agree.', 'Yes, carrots are magic.'], resposta: 0, codigo: 'EF09LI06', foco: 'fake news' },
    { texto: 'Uniforms are cheap. Also, they make students equal. However, some students think they are ugly.', pergunta: 'Which word shows an opposite idea?', opcoes: ['However', 'Also', 'they'], resposta: 0, codigo: 'EF09LI14', foco: 'connectors' },
    { texto: 'Video games can improve memory. A study with 500 students showed this in 2024.', pergunta: 'What is the evidence for the argument?', opcoes: ['a study with 500 students', 'the opinion of a gamer', 'a funny video'], resposta: 0, codigo: 'EF09LI07', foco: 'argumentos' },
    { texto: 'Mia has lived in Joinville since 2015. She has never moved to another city.', pergunta: 'How long has Mia lived in Joinville?', opcoes: ['since 2015', 'for two months', 'since last week'], resposta: 0, codigo: 'EF09LI020-JO', foco: 'since × for' },
    { texto: 'Phones should be allowed in class because students can use dictionaries and do research.', pergunta: 'What is the argument for phones?', opcoes: ['Students can do research.', 'Phones are expensive.', 'Students play games.'], resposta: 0, codigo: 'EF09LI07', foco: 'argumentos' },
    { texto: 'The library is open from 8 am to 5 pm, Monday to Friday. It is closed on weekends.', pergunta: 'Is the library open on Saturday?', opcoes: ['No, it is closed.', 'Yes, from 8 to 5.', 'Yes, all day.'], resposta: 0, codigo: 'EF09LI07', foco: 'localizar informação' },
    { texto: 'Lia Storm has sold 2 million albums. Her next concert will be in Curitiba on May 3rd.', pergunta: 'Where will the next concert be?', opcoes: ['in Curitiba', 'in Joinville', 'on May 2nd'], resposta: 0, codigo: 'EF09LI07', foco: 'localizar informação' },
    { texto: 'If it rains on Saturday, the game will be on Sunday. If it is sunny, the game will be on Saturday.', pergunta: 'When will the game be if it rains on Saturday?', opcoes: ['on Sunday', 'on Saturday', 'on Monday'], resposta: 0, codigo: 'EF09LI07', foco: 'localizar informação' },
  ]));
  L.push.apply(L, avulsosBlocos_('9º', [
    { figura: '😂', frase: 'LOL = laughing out ___', blocos: ['loud', 'love', 'late'], resposta: 'loud', codigo: 'EF09LI13', foco: 'linguagem digital (acrônimos)', dica: '==LOL== = laughing out loud' },
    { figura: '🤷', frase: "IDK = I ___ know", blocos: [DONT, DOESNT, 'not'], resposta: DONT, codigo: 'EF09LI13', foco: 'linguagem digital (acrônimos)', dica: "==IDK== = I don't know" },
    { figura: '🦷', frase: 'You ___ brush your teeth every day.', blocos: ['should', "shouldn't", 'would'], resposta: 'should', codigo: 'EF09LI16', foco: 'modals: should', dica: 'conselho → ==should==' },
    { figura: '🚭', frase: 'You ___ smoke in the hospital.', blocos: [MUSTNT, "don't have to", 'should'], resposta: MUSTNT, codigo: 'EF09LI16', foco: 'modals: must', dica: "proibido → ==mustn't==" },
    { figura: '🎒', frase: 'She ___ to wear a uniform.', blocos: ['has', 'have', 'must'], resposta: 'has', codigo: 'EF09LI16', foco: 'modals: have to', dica: 'she → ==has== to' },
    { figura: '☔', frase: 'It was raining, ___ we stayed home.', blocos: ['so', 'because', 'but'], resposta: 'so', codigo: 'EF09LI14', foco: 'connectors', dica: 'resultado → ==so==' },
    { figura: '🤔', frase: 'The phone is good. ___, it is expensive.', blocos: ['However', 'Also', 'So'], resposta: 'However', codigo: 'EF09LI14', foco: 'connectors', dica: 'contraste → ==however==' },
    { figura: '🌧️', frase: 'If it rains, we ___ stay home.', blocos: ['will', 'would', 'are'], resposta: 'will', codigo: 'EF09LI15', foco: 'conditionals (first)', dica: 'If + presente → ==will==' },
    { figura: '🦅', frase: 'If I were a bird, I ___ fly.', blocos: ['would', 'will', 'am'], resposta: 'would', codigo: 'EF09LI15', foco: 'conditionals (second)', dica: 'If I were → ==would==' },
    { figura: '🍽️', frase: 'She has ___ lunch.', blocos: ['eaten', 'eat', 'ate'], resposta: 'eaten', codigo: 'EF09LI21-JO', foco: 'present perfect', dica: 'has + particípio → ==eaten==' },
    { figura: '⏳', frase: 'I have known him ___ ten years.', blocos: ['for', 'since', 'ago'], resposta: 'for', codigo: 'EF09LI020-JO', foco: 'since × for', dica: 'período → ==for==' },
    { figura: '📝', frase: "I haven't finished my homework ___.", blocos: ['yet', 'already', 'ever'], resposta: 'yet', codigo: 'EF09LI020-JO', foco: 'already / yet', dica: 'negativa, no fim → ==yet==' },
  ]));

  return L;
}
