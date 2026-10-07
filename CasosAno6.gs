/**
 * Banco do 6º ano (Etapa 4): 2 casos por período do Mapa 2026, cada um em 3 degraus,
 * e exercícios avulsos de leitura para o "Meu reforço". Usa as funções de CasosBase.gs e CasosAno.gs.
 * Até outubro, só I/you/we/they no simple present (a 3ª pessoa entra em novembro, como pede o Mapa).
 */

function casosAno6_() {
  const L = [];
  const NAO = "isn't", NAOS = "aren't";
  function m6(sufixo, mes, numero, titulo) {
    return function (degrau, abertura, ev, travas, codigos, final) {
      L.push(aCaso_('6º', sufixo, mes, numero, titulo, degrau, abertura, ev, travas, codigos, final));
    };
  }

  // ======================================================== MARÇO · informações pessoais, to be, pronomes, possessivos
  let c = m6('new', '2026-03', 'MAR·1', 'The New Student');
  c(1, 'Hi, agent! We have a new [[student|aluna]]. Let\'s meet her!', [], [
    bFiguras_([['👦', ['he', 'she'], 0], ['👧', ['he', 'she'], 1], ['👦👧', ['they', 'it'], 0], ['🐶', ['it', 'she'], 0]],
      ['==he== = ele · ==she== = ela', '==they== = eles · ==it== = para animais e coisas'], 'subject pronouns'),
    bOuvir_([['I am twelve.', ['12', '20'], 0, 'pilulas'], ['She is from Joinville.', ['👧', '👦'], 0]],
      ['==twelve== = 12', '==she== = ela 👧'], 'compreensão oral'),
    bBlocos_('Am or is?', 'Complete with AM or IS.', 'I → AM · he/she → IS.', [
      ['🙋', 'I ___ Mia.', ['am', 'is'], ['am'], { is: 'With I → AM.' }],
      ['👧', 'She ___ eleven.', ['is', 'am'], ['is'], { am: 'With she → IS.' }],
    ], ['I ==am== · she ==is==', 'She ==is== eleven.'], 'verb to be (am/is)'),
  ], ['EF06LI19', 'EF06LI04', 'EF06LI19'], ['My name is ', 'apresentar-se (nome e idade).', 'My name is Ana. I am 11.', 'verb to be']);
  const newEv2 = [
    { id: 'A', aba: 'A · Student card', blocos: [{ tipo: 'itens', itens: [['📛', 'Name: Mia Costa'], ['🎂', 'Age: 11'], ['📍', 'From: Joinville'], ['🏫', 'Class: 6A']] }] },
    bMsg_('mia', 'Mia', "Hi! I'm Mia. I'm eleven. I'm from Joinville. My [[favourite|favorita]] colour is purple."),
    bAudio_('kai', 'Chief Kai', 'This is Mia. She is new here. She is in class 6A. Her teacher is Ms. Rosa.'),
  ];
  c(2, 'Hi, agent! We have a new [[student|aluna]]. Read the clues!', newEv2, [
    bLerOuvir_([['How old is Mia?', ['11', '12', '6'], 0], ['Mia is in class…', ['6A', '6B', '7A'], 0]],
      ['Mia says: "I\'m ==eleven==." = 11', 'Kai says: "She is in class ==6A==."'], 'localizar informação'),
    bBlocos_('Am, is or are?', 'Complete the sentences.', 'I am · he/she is · we/they are.', [
      ['🙋', 'I ___ from Joinville.', ['am', 'is', 'are'], ['am'], { is: 'With I → AM.' }],
      ['👧', 'Mia ___ new here.', ['is', 'am', 'are'], ['is'], { are: 'Mia = she → IS.' }],
      ['👫', 'We ___ in class 6A.', ['are', 'is', 'am'], ['are'], { is: 'With WE → ARE.' }],
    ], ['I ==am== · she ==is== · we ==are==', 'We ==are== in 6A.'], 'verb to be'),
    bBlocos_('My, her or his?', 'Choose the right word.', 'MY = meu/minha · HER = dela · HIS = dele.', [
      ['🙋', 'Mia: "___ name is Mia."', ['My', 'Your', 'His'], ['My'], { his: 'Mia is talking about herself → MY.' }],
      ['👧', 'This is Mia. ___ teacher is Ms. Rosa.', ['Her', 'His', 'My'], ['Her'], { his: 'Mia is a girl → HER.' }],
    ], ['==my== = meu · ==her== = dela', 'Mia is a girl → ==her== teacher'], 'possessive adjectives'),
  ], ['EF06LI09', 'EF06LI19', 'EF06LI23'], ['My name is ', 'apresentar-se (nome, idade e cidade).', 'My name is Leo. I am 11. I am from Joinville.', 'verb to be']);
  c(3, 'Hi, agent! A new student is at school. Who is she? Check the clues!', [
    bCaderno_('A', 'A · Note', 'From the school office', ['The new student is 11. She is from Joinville. Her favourite colour is purple.']),
    bFichas_([['mia', 'MIA', ['11', 'from Joinville', 'favourite colour: purple']], ['bia', 'BIA', ['11', 'from Curitiba', 'favourite colour: purple']], ['ana', 'ANA', ['12', 'from Joinville', 'favourite colour: green']]]),
    bAudio_('kai', 'Chief Kai', "The new student isn't from Curitiba. She is eleven, and her backpack is purple."),
  ], [
    bQuem_('Who is the new student?', 'Click the student.', 'Clique na aluna nova.',
      [{ personagem: 'mia', texto: 'MIA' }, { personagem: 'bia', texto: 'BIA' }, { personagem: 'ana', texto: 'ANA' }], 0,
      { 1: 'Bia is from Curitiba.', 2: 'Ana is 12.' }, ['The note: ==11==, ==Joinville==, ==purple==.', 'Bia is from Curitiba. Ana is 12.'], "It's **Mia**!"),
    bOuvirPista_("Kai's message", [['Is she from Curitiba?', ["No, she isn't.", 'Yes, she is.', "No, he isn't."], 0], ['Her backpack is…', ['purple', 'green', 'blue'], 0]],
      ['Listen for ==Curitiba== and ==backpack==.', 'Kai says: "her backpack is ==purple=="'], 'compreensão oral'),
    bBlocos_('To be and possessives', 'Complete the sentences.', 'is/are e my/her.', [
      ['', 'Mia ___ eleven.', ['is', 'am', 'are'], ['is'], { are: 'Mia = she → IS.' }],
      ['', 'Bia and Ana ___ not new.', ['are', 'is', 'am'], ['are'], { is: 'Bia and Ana = they → ARE.' }],
      ['', 'Mia: "___ backpack is purple."', ['My', 'Her', 'Your'], ['My'], { her: 'Mia is talking about herself → MY.' }],
    ], ['she ==is== · they ==are== · ==my== = meu', 'Bia and Ana → ==are=='], 'verb to be + possessives'),
    bVF_([['Mia is from Joinville.', true], ['Ana is eleven.', false], ['Bia is from Curitiba.', true], ["Mia's favourite colour is green.", false]],
      ['Check clue B.', 'Ana is ==12==. Mia likes ==purple==.'], 'verb to be'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI19', 'EF06LI19'], ['My best friend is ', 'apresentar um amigo (nome, idade, cidade).', 'My best friend is Leo. He is 12.', 'verb to be']);

  c = m6('ids', '2026-03', 'MAR·2', 'The School ID Cards');
  c(1, 'Hi, agent! The school [[ID cards|carteirinhas]] are ready. Let\'s learn the words!', [], [
    bFiguras_([['📛', ['name', 'age'], 0], ['🎂', ['age', 'name'], 0], ['📞', ['phone number', 'address'], 0], ['🏠', ['phone number', 'address'], 1]],
      ['==name== = nome · ==age== = idade', '==phone number== = telefone · ==address== = endereço'], 'vocabulário: informações pessoais'),
    bOuvir_([['My name is Leo.', ['Leo', 'Ana'], 0, 'pilulas'], ['I am eleven years old.', ['11', '7'], 0, 'pilulas']],
      ['==Leo== · ==eleven== = 11', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('My or her?', 'Choose MY or HER.', 'MY = meu/minha · HER = dela.', [
      ['👦', 'Leo: "___ name is Leo."', ['My', 'Her'], ['My'], { her: 'Leo is talking about himself → MY.' }],
      ['👧', 'This is Ana. ___ age is 12.', ['Her', 'My'], ['Her'], { my: 'We are talking about Ana → HER.' }],
    ], ['==my== = meu · ==her== = dela', "Ana → ==her== age"], 'possessive adjectives'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI23'], ['My name is ', 'escrever sua carteirinha (nome, idade, turma).', 'My name is Bia. I am 11. My class is 6A.', 'possessive adjectives']);
  c(2, 'Hi, agent! The ID cards are [[mixed up|misturadas]]. Read the clues!', [
    { id: 'A', aba: 'A · ID cards', blocos: [{ tipo: 'itens', itens: [['🪪', 'LEO — 11 — 6B'], ['🪪', 'ANA — 12 — 6A'], ['🪪', 'BIA — 11 — 6A']] }] },
    bMsg_('kai', 'Chief Kai', "The ID cards are mixed up! Leo's class is 6B. Ana and Bia are in 6A."),
    bAudio_('ana', 'Ana', "Hi! I'm Ana. I'm twelve. My class is 6A. My friend Bia is eleven."),
  ], [
    bLerOuvir_([["What is Leo's class?", ['6B', '6A', '7B'], 0], ['How old is Ana?', ['12', '11', '6'], 0]],
      ['Kai says: "Leo\'s class is ==6B=="', 'Ana says: "I\'m ==twelve==." = 12'], 'localizar informação'),
    bBlocos_('My, her, his or their?', 'Complete the sentences.', 'my = meu · her = dela · his = dele · their = deles.', [
      ['👦', 'Leo: "___ class is 6B."', ['My', 'His', 'Her'], ['My'], { his: 'Leo is talking about himself → MY.' }],
      ['👧', 'This is Ana. ___ class is 6A.', ['Her', 'His', 'Their'], ['Her'], { his: 'Ana is a girl → HER.' }],
      ['👧👧', 'Ana and Bia are friends. ___ class is 6A.', ['Their', 'Her', 'His'], ['Their'], { her: 'Ana and Bia = they → THEIR.' }],
    ], ['==my== · ==her== · ==his== · ==their==', 'Ana and Bia → ==their=='], 'possessive adjectives'),
    bBlocos_('Is or are?', 'Complete with IS or ARE.', 'Um → IS · dois ou mais → ARE.', [
      ['👦', 'Leo ___ eleven.', ['is', 'are', 'am'], ['is'], { are: 'Leo = he → IS.' }],
      ['👧👧', 'Ana and Bia ___ in 6A.', ['are', 'is', 'am'], ['are'], { is: 'Ana and Bia = they → ARE.' }],
    ], ['he/she → ==is== · they → ==are==', 'Ana and Bia → ==are=='], 'verb to be'),
  ], ['EF06LI09', 'EF06LI23', 'EF06LI19'], ['My class is ', 'escrever a sua turma e a de um amigo.', 'My class is 6A. His class is 6B.', 'possessive adjectives']);
  c(3, 'Hi, agent! We found an [[ID card|carteirinha]] on the floor. Whose is it?', [
    bCaderno_('A', 'A · Note', 'Found on the floor', ['An ID card: class 6A, 11 years old. The photo shows a girl.']),
    bFichas_([['ana', 'ANA', ['12', '6A']], ['bia', 'BIA', ['11', '6A']], ['leo', 'LEO', ['11', '6B']]]),
    bAudio_('paulo', 'Mr. Paulo', 'I found the card near the library. The girl is eleven, and her class is 6A.'),
  ], [
    bQuem_('Whose card is it?', 'Click the owner.', 'Clique na dona da carteirinha.',
      [{ personagem: 'ana', texto: 'ANA' }, { personagem: 'bia', texto: 'BIA' }, { personagem: 'leo', texto: 'LEO' }], 1,
      { 0: 'Ana is 12.', 2: 'Leo is a boy, and his class is 6B.' }, ['The card: ==6A==, ==11==, a ==girl==.', 'Ana is 12. Leo is a boy.'], "It's **Bia's** card!"),
    bOuvirPista_("Paulo's message", [['Where was the card?', ['near the library', 'in the cafeteria', 'in the park'], 0], ['Her class is…', ['6A', '6B', '7A'], 0]],
      ['Listen for a place and a class.', 'Paulo says: "near the ==library=="'], 'compreensão oral'),
    bBlocos_('Possessives', 'Complete the sentences.', 'my · his · her · our · their.', [
      ['', 'Bia: "___ class is 6A."', ['My', 'Her', 'His'], ['My'], { her: 'Bia is talking about herself → MY.' }],
      ['', 'Leo is in 6B. ___ age is 11.', ['His', 'Her', 'My'], ['His'], { her: 'Leo is a boy → HIS.' }],
      ['', 'Ana and Bia: "___ class is 6A."', ['Our', 'Their', 'My'], ['Our'], { their: 'They are talking about themselves → OUR.' }],
    ], ['==our== = nosso · ==their== = deles', 'Ana and Bia talking → ==our=='], 'possessive adjectives'),
    bVF_([['Bia is eleven.', true], ['Leo is in 6A.', false], ['Ana is twelve.', true], ["The card is Leo's.", false]],
      ['Check clue B.', 'Leo is in ==6B==.'], 'verb to be'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI23', 'EF06LI19'], ['My name is ', 'escrever sua carteirinha completa.', 'My name is Ana. I am 12. My class is 6A.', 'possessive adjectives']);

  // ======================================================== ABRIL · países e nacionalidades, to be (todas as formas)
  c = m6('a6', '2026-04', 'APR·1', 'The World Cup Fans');
  c(1, 'Hi, agent! Fans from many [[countries|países]] are in Joinville!', [], [
    bFiguras_([['🇧🇷', ['Brazil', 'Mexico'], 0], ['🇯🇵', ['Japan', 'China'], 0], ['🇺🇸', ['the USA', 'Canada'], 0], ['🇦🇷', ['Chile', 'Argentina'], 1]],
      ['🇧🇷 ==Brazil== · 🇯🇵 ==Japan==', '🇺🇸 ==the USA== · 🇦🇷 ==Argentina=='], 'countries and nationalities'),
    bOuvir_([['I am from Mexico.', ['Mexico', 'Japan'], 0, 'pilulas'], ['She is Brazilian.', ['🇧🇷', '🇺🇸'], 0]],
      ['==Mexico== · ==Brazilian== = brasileira', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Country or nationality?', 'Complete the sentence.', 'País: Brazil · nacionalidade: Brazilian.', [
      ['🇧🇷', 'He is ___.', ['Brazilian', 'Brazil'], ['Brazilian'], { brazil: 'He is + nationality → BRAZILIAN.' }],
      ['🇯🇵', 'She is from ___.', ['Japan', 'Japanese'], ['Japan'], { japanese: 'from + country → JAPAN.' }],
    ], ['from + ==país== · is + ==nacionalidade==', 'from ==Japan== · He is ==Brazilian=='], 'countries and nationalities'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI17'], ['I am from ', 'dizer de onde você é.', 'I am from Brazil. I am Brazilian.', 'countries and nationalities']);
  c(2, 'Hi, agent! Fans from many [[countries|países]] are here. Read the clues!', [
    { id: 'A', aba: 'A · Fans', blocos: [{ tipo: 'itens', itens: [['🇧🇷', 'Leo — Brazil'], ['🇲🇽', 'Carlos — Mexico'], ['🇯🇵', 'Yuki — Japan']] }] },
    bMsg_('leo', 'Leo', "Hi! I'm Brazilian. My friend Carlos is Mexican. Yuki is from Japan."),
    bAudio_('lucy', 'Yuki', "Hello! I'm Yuki. I'm Japanese. I'm not from China."),
  ], [
    bLerOuvir_([['Where is Carlos from?', ['Mexico', 'Brazil', 'Japan'], 0], ['Is Yuki from China?', ["No, she isn't.", 'Yes, she is.', "No, he isn't."], 0]],
      ['Leo says: "Carlos is ==Mexican=="', 'Yuki says: "I\'m ==not== from China."'], 'localizar informação'),
    bBlocos_('Country or nationality?', 'Complete the sentences.', 'from + país · is + nacionalidade.', [
      ['🇲🇽', 'Carlos is ___.', ['Mexican', 'Mexico', 'Mexicans'], ['Mexican'], { mexico: 'is + nationality → MEXICAN.' }],
      ['🇯🇵', 'Yuki is from ___.', ['Japan', 'Japanese', 'Japans'], ['Japan'], { japanese: 'from + country → JAPAN.' }],
      ['🇧🇷', 'Leo is ___.', ['Brazilian', 'Brazil', 'Brazils'], ['Brazilian'], { brazil: 'is + nationality → BRAZILIAN.' }],
    ], ['from ==Japan== · is ==Mexican==', 'nacionalidade termina em -an, -ese…'], 'countries and nationalities'),
    bBlocos_("Isn't and questions", 'Complete the sentences.', "ISN'T = não é · IS no começo = pergunta.", [
      ['🇨🇳', 'Yuki ___ from China.', [NAO, NAOS, 'am not'], [NAO], { "aren't": "Yuki = she → ISN'T." }],
      ['❓', '___ Carlos from Mexico? Yes, he is.', ['Is', 'Are', 'Am'], ['Is'], { are: 'Carlos = he → IS.' }],
    ], ["she ==isn't== · pergunta: ==Is== Carlos…?", 'Is Carlos from Mexico?'], 'verb to be (negativa e interrogativa)'),
  ], ['EF06LI09', 'EF06LI17', 'EF06LI19'], ['My friend is from ', 'dizer de onde um amigo é.', 'My friend is from Argentina. He is Argentinian.', 'countries and nationalities']);
  c(3, 'Hi, agent! A fan is [[lost|perdida]] in Joinville. Who is she?', [
    bCaderno_('A', 'A · Note', 'From the stadium', ["The lost fan isn't Brazilian. She speaks Spanish. Her shirt is blue and white."]),
    bFichas_([['mia', 'SOFIA', ['from Argentina', 'speaks Spanish', 'shirt: blue and white']], ['lucy', 'YUKI', ['from Japan', 'speaks Japanese', 'shirt: red and white']], ['ana', 'ANA', ['from Brazil', 'speaks Portuguese', 'shirt: green and yellow']]]),
    bAudio_('paulo', 'Mr. Paulo', "I found a girl from Argentina. She is Argentinian. She isn't Japanese."),
  ], [
    bQuem_('Who is the lost fan?', 'Click the fan.', 'Clique na torcedora perdida.',
      [{ personagem: 'mia', texto: 'SOFIA' }, { personagem: 'lucy', texto: 'YUKI' }, { personagem: 'ana', texto: 'ANA' }], 0,
      { 1: 'Yuki speaks Japanese, not Spanish.', 2: 'Ana is Brazilian.' }, ['The note: ==Spanish==, ==blue and white==.', "Ana is Brazilian. Yuki speaks Japanese."], "It's **Sofia** from Argentina!"),
    bOuvirPista_("Paulo's message", [['Where is the girl from?', ['Argentina', 'Japan', 'Brazil'], 0], ['Is she Japanese?', ["No, she isn't.", 'Yes, she is.', "No, she aren't."], 0]],
      ['Listen for a country.', 'Paulo says: "She ==isn\'t== Japanese."'], 'compreensão oral'),
    bBlocos_('To be', 'Complete the sentences.', "is · isn't · Is…?", [
      ['', 'Sofia ___ Argentinian.', ['is', 'are', 'am'], ['is'], { are: 'Sofia = she → IS.' }],
      ['', 'Yuki ___ from Brazil.', [NAO, NAOS, 'not'], [NAO], { "aren't": "Yuki = she → ISN'T." }],
      ['', '___ Ana Brazilian? Yes, she is.', ['Is', 'Are', 'Am'], ['Is'], { are: 'Ana = she → IS.' }],
    ], ["she ==is / isn't== · ==Is== Ana…?", "Yuki ==isn't== from Brazil."], 'verb to be (todas as formas)'),
    bVF_([['Sofia speaks Spanish.', true], ['Yuki is Brazilian.', false], ['Ana is from Brazil.', true], ['Sofia is Japanese.', false]],
      ['Check clue B.', 'Yuki is from ==Japan==.'], 'countries and nationalities'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI19', 'EF06LI17'], ['She is from ', 'descrever uma pessoa de outro país.', 'She is from Japan. She is Japanese.', 'countries and nationalities']);

  c = m6('post', '2026-04', 'APR·2', 'The Postcard Mystery');
  c(1, 'Hi, agent! We have [[postcards|cartões-postais]] from many countries!', [], [
    bFiguras_([['🇨🇦', ['Canada', 'Chile'], 0], ['🇮🇹', ['Italy', 'Spain'], 0], ['🇪🇸', ['Spain', 'Portugal'], 0], ['🇵🇹', ['Spain', 'Portugal'], 1]],
      ['🇨🇦 ==Canada== · 🇮🇹 ==Italy==', '🇪🇸 ==Spain== · 🇵🇹 ==Portugal=='], 'countries and nationalities'),
    bOuvir_([['We are from Italy.', ['🇮🇹', '🇨🇦'], 0], ['They are from Portugal.', ['🇪🇸', '🇵🇹'], 1]],
      ['==Italy== = 🇮🇹 · ==Portugal== = 🇵🇹', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_("Are or isn't?", 'Complete the sentence.', "we → ARE · he → ISN'T (não é).", [
      ['🇮🇹', 'We ___ from Italy.', ['are', 'is'], ['are'], { is: 'With WE → ARE.' }],
      ['🇪🇸', 'He ___ from Spain. He is from Portugal.', [NAO, NAOS], [NAO], { "aren't": "He → ISN'T." }],
    ], ["we ==are== · he ==isn't==", "He ==isn't== from Spain."], 'verb to be'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI19'], ['I am from ', 'escrever um cartão-postal curto (de onde você é).', 'Hello! I am from Brazil. I am in Joinville.', 'verb to be']);
  c(2, 'Hi, agent! Bia got a [[postcard|cartão-postal]]. Where are her grandparents?', [
    bCaderno_('A', 'A · Postcard', 'Postcard', ['Hello from Lisbon! We are in Portugal. It is sunny. Love, Grandma and Grandpa.']),
    bMsg_('bia', 'Bia', "My grandparents are on holiday. They aren't in Spain. They are in Portugal!"),
    bAudio_('rosa', 'Grandma Rosa', 'Hi, Bia! We are in Lisbon. Are you OK? See you in May!'),
  ], [
    bLerOuvir_([['Where are the grandparents?', ['in Portugal', 'in Spain', 'in Italy'], 0], ['Grandma says: "See you in…"', ['May', 'March', 'June'], 0]],
      ['The postcard: "We are in ==Portugal=="', 'Grandma says: "See you in ==May=="'], 'localizar informação'),
    bBlocos_("Are, aren't or is?", 'Complete the sentences.', "they are / they aren't · it is.", [
      ['', 'They ___ in Portugal.', ['are', 'is', 'am'], ['are'], { is: 'They → ARE.' }],
      ['', 'They ___ in Spain.', [NAOS, NAO, 'not'], [NAOS], { "isn't": "They → AREN'T." }],
      ['', 'It ___ sunny.', ['is', 'are', 'am'], ['is'], { are: 'It → IS.' }],
    ], ["they ==are / aren't== · it ==is==", "They ==aren't== in Spain."], 'verb to be'),
    bBlocos_('Questions', 'Complete the questions.', 'Pergunta: o verbo to be vem primeiro.', [
      ['❓', '___ you OK?', ['Are', 'Is', 'Am'], ['Are'], { is: 'With YOU → ARE.' }],
      ['❓', '___ they in Lisbon? Yes, they are.', ['Are', 'Is', 'Am'], ['Are'], { is: 'With THEY → ARE.' }],
    ], ['==Are== you…? ==Are== they…?', 'you / they → ==are=='], 'verb to be (interrogativa)'),
  ], ['EF06LI09', 'EF06LI19', 'EF06LI19'], ['Hello from ', 'escrever um cartão-postal de uma viagem imaginária.', 'Hello from Italy! We are in Rome. It is sunny.', 'verb to be']);
  c(3, 'Hi, agent! A postcard has no name. Whose family sent it?', [
    bCaderno_('A', 'A · Postcard', 'No name!', ["We are in a country with pizza and pasta. We aren't in France. See you soon!"]),
    bFichas_([['leo', 'LEO', ['parents: in Italy']], ['bia', 'BIA', ['grandparents: in Portugal']], ['ana', 'ANA', ['aunt: in France']]]),
    bAudio_('leo', 'Leo', "My parents are on holiday. They aren't in France. They love pizza!"),
  ], [
    bQuem_('Whose postcard is it?', 'Click the person.', 'Clique em quem recebeu o cartão.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'bia', texto: 'BIA' }, { personagem: 'ana', texto: 'ANA' }], 0,
      { 1: "Bia's grandparents are in Portugal.", 2: "Ana's aunt is in France, and the postcard says: not France." },
      ['==Pizza and pasta== = Italy.', "Who has family in Italy?"], "It's from **Leo's** parents in Italy!"),
    bOuvirPista_("Leo's message", [["Where are Leo's parents?", ['in Italy', 'in France', 'in Portugal'], 0], ['Are they in France?', ["No, they aren't.", 'Yes, they are.', "No, they isn't."], 0]],
      ['Listen for ==France== and ==pizza==.', 'Leo says: "They ==aren\'t== in France."'], 'compreensão oral'),
    bBlocos_('To be', 'Complete the sentences.', "are · isn't · Are…?", [
      ['', "Leo's parents ___ in Italy.", ['are', 'is', 'am'], ['are'], { is: 'Parents = they → ARE.' }],
      ['', "Ana's aunt ___ in Italy.", [NAO, NAOS, 'not'], [NAO], { "aren't": "The aunt = she → ISN'T." }],
      ['', "___ Bia's grandparents in Portugal? Yes, they are.", ['Are', 'Is', 'Am'], ['Are'], { is: 'Grandparents = they → ARE.' }],
    ], ["they ==are== · she ==isn't== · ==Are== they…?", "Ana's aunt ==isn't== in Italy."], 'verb to be (todas as formas)'),
    bVF_([["Leo's parents are in Italy.", true], ["Bia's grandparents are in France.", false], ["Ana's aunt is in France.", true], ['The postcard is from Portugal.', false]],
      ['Check clue B.', "Bia's grandparents are in ==Portugal==."], 'verb to be'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI19', 'EF06LI19'], ['Hello from ', 'escrever um cartão-postal com país e nacionalidade.', 'Hello from Japan! The people here are Japanese.', 'countries and nationalities']);

  // ======================================================== MAIO · família e genitivo 's
  c = m6('a6', '2026-05', 'MAY·1', 'The Family Tree');
  c(1, 'Hi, agent! Let\'s learn [[family|família]] words!', [], [
    bFiguras_([['👵', ['grandmother', 'sister'], 0], ['👴', ['grandfather', 'brother'], 0], ['👶', ['baby', 'grandmother'], 0], ['👨‍👩‍👧', ['school', 'family'], 1]],
      ['==grandmother== = avó · ==grandfather== = avô', '==baby== = bebê · ==family== = família'], 'family'),
    bOuvir_([['This is my grandmother.', ['👵', '👶'], 0], ['This is my baby brother.', ['👴', '👶'], 1]],
      ['==grandmother== = 👵 · ==baby== = 👶', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: família'),
    bBlocos_("Add 's", "Complete with 's.", "Para dizer de quem é: nome + 's (Ana's bike = a bicicleta da Ana).", [
      ['🚲', 'This is ___ bike. (Ana)', ["Ana's", 'Ana'], ["Ana's"], { ana: "Whose bike? Ana's bike → ANA'S." }],
      ['🐱', 'This is ___ cat. (Leo)', ["Leo's", 'Leos'], ["Leo's"], { leos: "Use the apostrophe: LEO'S." }],
    ], ["nome + ==\'s== = de quem é", "Ana's bike = a bicicleta da Ana"], "genitive 's"),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI22'], ['This is my ', 'apresentar uma pessoa da família.', 'This is my grandmother. Her name is Rosa.', 'family']);
  c(2, 'Hi, agent! Bia made a [[family tree|árvore genealógica]]. Read the clues!', [
    { id: 'A', aba: 'A · Family tree', blocos: [{ tipo: 'itens', itens: [['👴👵', 'Tom and Rosa — grandparents'], ['👨👩', 'Carlos and Julia — parents'], ['👧👦', 'Bia and Leo — children']] }] },
    bMsg_('bia', 'Bia', "This is my family. My grandfather is Tom. My mother's name is Julia. Leo is my brother."),
    bAudio_('leo', 'Leo', "Hi! I'm Leo. My sister is Bia. My father's name is Carlos."),
  ], [
    bLerOuvir_([['Who is Julia?', ["Bia's mother", "Bia's sister", "Bia's grandmother"], 0], ["What is Leo's father's name?", ['Carlos', 'Tom', 'Leo'], 0]],
      ['Bia says: "My ==mother\'s== name is Julia."', 'Leo says: "My father\'s name is ==Carlos=="'], 'localizar informação'),
    bBlocos_("Whose? Use 's", 'Complete the sentences.', "nome + 's = de quem é.", [
      ['', 'Julia is ___ mother.', ["Bia's", 'Bias', 'Bia'], ["Bia's"], { bias: "Use the apostrophe: BIA'S." }],
      ['', 'Tom is ___ grandfather.', ["Leo's", 'Leos', 'Leo'], ["Leo's"], { leo: "Whose grandfather? → LEO'S." }],
      ['', 'Carlos is ___ husband.', ["Julia's", 'Julias', 'Julia'], ["Julia's"], { julia: "Whose husband? → JULIA'S." }],
    ], ["nome + ==\'s==", "Julia is ==Bia's== mother."], "genitive 's"),
    bBlocos_('Family words', 'Complete the sentences.', 'Use a árvore (pista A).', [
      ['', "Tom is Bia's ___.", ['grandfather', 'brother', 'son'], ['grandfather'], { brother: 'Look at clue A: Tom is a grandparent.' }],
      ['', "Bia is Leo's ___.", ['sister', 'brother', 'mother'], ['sister'], { brother: 'Bia is a girl → SISTER.' }],
    ], ['==grandfather== = avô · ==sister== = irmã', 'Clue A: Tom and Rosa = grandparents'], 'family'),
  ], ['EF06LI09', 'EF06LI22', 'EF06LI17'], ["My mother's name is ", 'dizer o nome de pessoas da sua família.', "My mother's name is Ana. My father's name is João.", "family + genitive 's"]);
  c(3, 'Hi, agent! A [[lost|perdido]] dog is at the agency. Whose dog is it?', [
    bCaderno_('A', 'A · Note', 'Lost dog!', ["It's a small dog. The owner's grandmother is Rosa."]),
    bFichas_([['bia', 'BIA', ['grandmother: Rosa', 'pet: dog']], ['ana', 'ANA', ['grandmother: Julia', 'pet: cat']], ['leo', 'LEO', ['grandmother: Rosa', 'pet: fish']]]),
    bAudio_('paulo', 'Mr. Paulo', "It's Bia's dog. Her brother Leo has a fish, not a dog."),
  ], [
    bQuem_('Whose dog is it?', 'Click the owner.', 'Clique na dona do cachorro.',
      [{ personagem: 'bia', texto: 'BIA' }, { personagem: 'ana', texto: 'ANA' }, { personagem: 'leo', texto: 'LEO' }], 0,
      { 1: "Ana's grandmother is Julia.", 2: 'Leo has a fish.' }, ["The owner's grandmother is ==Rosa==.", 'Who has a dog AND grandmother Rosa?'], "It's **Bia's** dog!"),
    bOuvirPista_("Paulo's message", [['Whose dog is it?', ["Bia's", "Leo's", "Ana's"], 0], ['Leo has a…', ['fish', 'dog', 'cat'], 0]],
      ["Listen for ==Bia's== and ==fish==.", 'Paulo says: "Leo has a ==fish=="'], 'compreensão oral'),
    bBlocos_("'s and family", 'Complete the sentences.', "nome + 's · palavras da família.", [
      ['', "It's ___ dog.", ["Bia's", 'Bias', 'Bia'], ["Bia's"], { bias: "Use the apostrophe: BIA'S." }],
      ['', 'Rosa is ___ grandmother.', ["Leo's", 'Leos', 'Leo'], ["Leo's"], { leos: "Use the apostrophe: LEO'S." }],
      ['', "Leo is Bia's ___.", ['brother', 'sister', 'father'], ['brother'], { sister: 'Leo is a boy → BROTHER.' }],
    ], ["nome + ==\'s== · Leo = ==brother==", "It's ==Bia's== dog."], "genitive 's"),
    bVF_([["The dog is Bia's.", true], ["Leo's pet is a dog.", false], ["Rosa is Bia's grandmother.", true], ["Ana's pet is a fish.", false]],
      ['Check clue B.', "Leo's pet is a ==fish==. Ana's pet is a ==cat==."], 'family'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI22', 'EF06LI17'], ["My grandmother's name is ", 'falar dos avós e de um animal da família.', "My grandmother's name is Maria. Her cat is Mimi.", "family + genitive 's"]);

  c = m6('party', '2026-05', 'MAY·2', 'The Birthday Party');
  c(1, 'Hi, agent! It\'s a [[birthday party|festa de aniversário]]!', [], [
    bFiguras_([['🎂', ['cake', 'dog'], 0], ['🎁', ['present', 'pen'], 0], ['🎈', ['book', 'balloon'], 1], ['👨‍👩‍👧', ['family', 'friends'], 0]],
      ['==cake== = bolo · ==present== = presente', '==balloon== = balão · ==family== = família'], 'vocabulário: festa'),
    bOuvir_([["It's my sister's birthday.", ['👧🎂', '👦🎂'], 0], ["This is my father's present.", ['👨🎁', '👩🎁'], 0]],
      ['==sister== = 👧 · ==father== = 👨', 'Toque em 📄 TEXT para ler o áudio.'], "compreensão oral: família"),
    bBlocos_('My or his?', 'Choose the right word.', 'MY = meu · HIS = dele.', [
      ['👧', 'Bia: "___ birthday is today."', ['My', 'His'], ['My'], { his: 'Bia is talking about herself → MY.' }],
      ['👦', 'Leo is here with ___ mother.', ['his', 'her'], ['his'], { her: 'Leo is a boy → HIS.' }],
    ], ['==my== = meu · ==his== = dele', 'Leo → ==his== mother'], 'possessive adjectives'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI23'], ['My birthday is in ', 'dizer o mês do seu aniversário.', 'My birthday is in May.', 'family']);
  c(2, 'Hi, agent! Bia has a [[birthday party|festa]]. Read the clues!', [
    bCaderno_('A', 'A · Invitation', "Bia's birthday party!", ["Saturday, 3 p.m. · Bia's house"]),
    bMsg_('leo', 'Leo', "My sister's party is on Saturday. Our grandparents are here. Their present is a bike!"),
    bAudio_('rosa', 'Julia (Bia\'s mother)', "Hi! I'm Bia's mother. The cake is in the kitchen. Bia's friends are in the garden."),
  ], [
    bLerOuvir_([['When is the party?', ['on Saturday', 'on Sunday', 'on Monday'], 0], ['Where is the cake?', ['in the kitchen', 'in the garden', 'in the car'], 0]],
      ['Invitation: ==Saturday==', 'Julia says: "The cake is in the ==kitchen=="'], 'localizar informação'),
    bBlocos_('Possessives', 'Complete the sentences.', 'my · her · their.', [
      ['', 'Leo: "___ sister is Bia."', ['My', 'Her', 'Their'], ['My'], { her: 'Leo is talking about himself → MY.' }],
      ['', 'The grandparents are here. ___ present is a bike.', ['Their', 'His', 'Her'], ['Their'], { his: 'Grandparents = they → THEIR.' }],
      ['', 'Bia is happy with ___ bike.', ['her', 'his', 'their'], ['her'], { his: 'Bia is a girl → HER.' }],
    ], ['==my== · ==her== · ==their==', 'grandparents → ==their=='], 'possessive adjectives'),
    bBlocos_("Add 's", "Complete with 's.", "nome + 's = de quem é.", [
      ['🎉', "It's ___ party.", ["Bia's", 'Bias', 'Bia'], ["Bia's"], { bias: "Use the apostrophe: BIA'S." }],
      ['🌳', '___ friends are in the garden.', ["Bia's", 'Bias', 'Bia'], ["Bia's"], { bia: "Whose friends? → BIA'S." }],
    ], ["nome + ==\'s==", "==Bia's== party"], "genitive 's"),
  ], ['EF06LI09', 'EF06LI23', 'EF06LI22'], ['My birthday is in ', 'escrever um convite de aniversário curto.', "My birthday party is on Sunday. It's at my house.", 'possessive adjectives']);
  c(3, 'Hi, agent! Someone ate the [[cake|bolo]] before the party! Who was it?', [
    bCaderno_('A', 'A · Note', 'In the kitchen', ['Someone ate a piece of cake! There is chocolate on a blue shirt.']),
    bFichas_([['leo', 'LEO', ['shirt: blue', 'loves chocolate']], ['ana', 'ANA', ['shirt: red', 'loves chocolate']], ['tom', 'GRANDPA TOM', ['shirt: blue', 'hates chocolate']]]),
    bAudio_('rosa', 'Julia', "My son's shirt is blue. Grandpa's shirt is blue too, but he hates chocolate."),
  ], [
    bQuem_('Who ate the cake?', 'Click the person.', 'Clique em quem comeu o bolo.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'ana', texto: 'ANA' }, { personagem: 'tom', texto: 'TOM' }], 0,
      { 1: "Ana's shirt is red.", 2: 'Grandpa Tom hates chocolate.' }, ['==Blue shirt== + ==chocolate==.', 'Ana has a red shirt. Grandpa hates chocolate.'], 'It was **Leo**!'),
    bOuvirPista_("Julia's message", [["What colour is Leo's shirt?", ['blue', 'red', 'green'], 0], ['Who hates chocolate?', ['Grandpa', 'Leo', 'Bia'], 0]],
      ['Listen for ==blue== and ==hates==.', 'Julia says: "Grandpa ==hates== chocolate."'], 'compreensão oral'),
    bBlocos_("'s and possessives", 'Complete the sentences.', "nome + 's · my · our.", [
      ['', "It's ___ shirt.", ["Leo's", 'Leos', 'Leo'], ["Leo's"], { leos: "Use the apostrophe: LEO'S." }],
      ['', 'Leo: "Sorry! It\'s ___ fault."', ['my', 'his', 'her'], ['my'], { his: 'Leo is talking about himself → MY.' }],
      ['', 'Grandpa and Grandma: "___ present is a bike."', ['Our', 'Their', 'My'], ['Our'], { their: 'They are talking about themselves → OUR.' }],
    ], ["==\'s== · ==my== · ==our==", 'We → ==our=='], "genitive 's + possessives"),
    bVF_([["Leo's shirt is blue.", true], ["Ana's shirt is blue.", false], ['Grandpa hates chocolate.', true], ['Grandpa ate the cake.', false]],
      ['Check clues B and C.', "Ana's shirt is ==red==."], 'family'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI22', 'EF06LI17'], ['At my birthday party, ', 'contar quem estava na sua festa de aniversário.', 'At my birthday party, my grandparents and my cousins are there.', 'family']);

  // ======================================================== AGOSTO · present continuous
  c = m6('a6', '2026-08', 'AUG·1', 'The Video Call');
  c(1, 'Hi, agent! It\'s a [[video call|chamada de vídeo]]. What are they doing?', [], [
    bFiguras_([['🏊', ['swimming', 'sleeping'], 0], ['🍳', ['reading', 'cooking'], 1], ['😴', ['eating', 'sleeping'], 1], ['📖', ['reading', 'running'], 0]],
      ['==swimming== = nadando · ==cooking== = cozinhando', '==sleeping== = dormindo · ==reading== = lendo'], 'present continuous'),
    bOuvir_([['She is cooking.', ['🍳', '📖'], 0], ['They are swimming.', ['😴', '🏊'], 1]],
      ['==cooking== = 🍳 · ==swimming== = 🏊', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: ações'),
    bBlocos_('-ing', 'Complete the sentence.', 'Agora: is/are + verbo com -ING.', [
      ['👦🏃', 'He is ___.', ['running', 'run'], ['running'], { run: 'Now → -ING: RUNNING.' }],
      ['👧👦', 'They ___ playing.', ['are', 'is'], ['are'], { is: 'They → ARE.' }],
    ], ['is/are + verbo + ==ing==', 'They ==are== playing.'], 'present continuous'),
  ], ['EF06LI20', 'EF06LI04', 'EF06LI20'], ['Now I am ', 'dizer o que você está fazendo agora.', 'Now I am playing a game.', 'present continuous']);
  c(2, 'Hi, agent! Bia is on a [[video call|chamada de vídeo]] with Grandma. Read the clues!', [
    { id: 'A', aba: 'A · Screen', blocos: [{ tipo: 'itens', itens: [['👩🍳', 'Mom'], ['👦🎮', 'Leo'], ['👧📖', 'Bia'], ['🐶😴', 'Rex']] }] },
    bMsg_('bia', 'Bia', "Hi Grandma! I'm reading a book. Leo is playing video games."),
    bAudio_('rosa', 'Grandma Rosa', "Hello! I'm watching TV. Grandpa is sleeping. What are you doing?"),
  ], [
    bLerOuvir_([['What is Leo doing?', ['playing video games', 'reading', 'sleeping'], 0], ['What is Grandpa doing?', ['sleeping', 'cooking', 'swimming'], 0]],
      ['Bia says: "Leo is ==playing video games=="', 'Grandma says: "Grandpa is ==sleeping=="'], 'localizar informação'),
    bBlocos_('Am, is or are?', 'Complete the sentences.', 'I am · he/she is · they are.', [
      ['', 'Bia ___ reading.', ['is', 'are', 'am'], ['is'], { are: 'Bia = she → IS.' }],
      ['', 'I ___ watching TV.', ['am', 'is', 'are'], ['am'], { is: 'With I → AM.' }],
      ['', 'Mom and Dad ___ cooking.', ['are', 'is', 'am'], ['are'], { is: 'Mom and Dad = they → ARE.' }],
    ], ['I ==am== · she ==is== · they ==are==', 'Mom and Dad → ==are=='], 'present continuous'),
    bBlocos_('-ing', 'Complete with -ING.', 'Depois de is/are, o verbo ganha -ING.', [
      ['🐶', 'Rex is ___.', ['sleeping', 'sleep', 'sleeps'], ['sleeping'], { sleep: 'After IS → SLEEPING.' }],
      ['🎮', 'Leo is ___ video games.', ['playing', 'play', 'plays'], ['playing'], { play: 'After IS → PLAYING.' }],
    ], ['is + verbo + ==ing==', 'Rex is ==sleeping==.'], 'present continuous'),
  ], ['EF06LI09', 'EF06LI20', 'EF06LI20'], ['Now my family is ', 'contar o que a sua família está fazendo agora.', 'Now my mother is cooking and my brother is sleeping.', 'present continuous']);
  c(3, 'Hi, agent! During the video call, someone is [[not at home|fora de casa]]. Who?', [
    bCaderno_('A', 'A · Note', 'The video call', ['Someone is not at home. He is running in the park.']),
    bFichas_([['leo', 'LEO', ['is playing video games']], ['tom', 'GRANDPA TOM', ['is running in the park']], ['paulo', 'MR. PAULO', ['is cooking at home']]]),
    bAudio_('bia', 'Bia', "Grandpa isn't sleeping now. He is running in the park!"),
  ], [
    bQuem_('Who is not at home?', 'Click the person.', 'Clique em quem não está em casa.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'tom', texto: 'TOM' }, { personagem: 'paulo', texto: 'PAULO' }], 1,
      { 0: 'Leo is playing video games at home.', 2: 'Mr. Paulo is cooking at home.' }, ['He is ==running in the park==.', 'Check clue B.'], "It's **Grandpa Tom**!"),
    bOuvirPista_("Bia's message", [['Where is Grandpa?', ['in the park', 'in the kitchen', 'in his bed'], 0], ['Is Grandpa sleeping?', ["No, he isn't.", 'Yes, he is.', "No, he aren't."], 0]],
      ['Listen for ==park== and ==sleeping==.', 'Bia says: "Grandpa ==isn\'t sleeping=="'], 'compreensão oral'),
    bBlocos_('Present continuous', 'Complete the sentences.', 'is/are + -ING.', [
      ['', 'Grandpa ___ running.', ['is', 'are', 'am'], ['is'], { are: 'Grandpa = he → IS.' }],
      ['', 'Leo is ___ video games.', ['playing', 'play', 'plays'], ['playing'], { play: 'After IS → PLAYING.' }],
      ['', 'Paulo and Leo ___ at home.', ['are', 'is', 'am'], ['are'], { is: 'Paulo and Leo = they → ARE.' }],
    ], ['he ==is== · they ==are== · verbo + ==ing==', 'Paulo and Leo → ==are=='], 'present continuous'),
    bVF_([['Tom is running.', true], ['Leo is cooking.', false], ['Paulo is cooking.', true], ['Grandpa is sleeping.', false]],
      ['Check clues B and C.', 'Leo is playing ==video games==.'], 'present continuous'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI20', 'EF06LI20'], ['Right now, ', 'descrever o que três pessoas estão fazendo agora.', 'Right now, my dad is working and my sister is reading.', 'present continuous']);

  c = m6('zoo', '2026-08', 'AUG·2', 'The Zoo Trip');
  c(1, 'Hi, agent! We are at the [[zoo|zoológico]]! Look at the animals.', [], [
    bFiguras_([['🐒', ['monkey', 'lion'], 0], ['🦁', ['lion', 'elephant'], 0], ['🐘', ['bird', 'elephant'], 1], ['🐦', ['bird', 'monkey'], 0]],
      ['==monkey== = macaco · ==lion== = leão', '==elephant== = elefante · ==bird== = pássaro'], 'vocabulário: animais'),
    bOuvir_([['The monkey is eating a banana.', ['🐒', '🦁'], 0], ['The bird is singing.', ['🐘', '🐦'], 1]],
      ['==monkey== = 🐒 · ==bird== = 🐦', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: ações'),
    bBlocos_('What are they doing?', 'Complete the sentence.', 'is/are + verbo com -ING.', [
      ['🐘', 'The elephant is ___.', ['drinking', 'drink'], ['drinking'], { drink: 'After IS → DRINKING.' }],
      ['🦁🦁', 'The lions ___ sleeping.', ['are', 'is'], ['are'], { is: 'The lions = they → ARE.' }],
    ], ['is/are + ==ing==', 'The lions ==are== sleeping.'], 'present continuous'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI20'], ['At the zoo, the monkey is ', 'dizer o que um animal está fazendo.', 'At the zoo, the monkey is eating a banana.', 'present continuous']);
  c(2, 'Hi, agent! The class is at the [[zoo|zoológico]]. Read the clues!', [
    { id: 'A', aba: 'A · Zoo map', blocos: [{ tipo: 'itens', itens: [['🐒', 'Monkeys — Area 1'], ['🦁', 'Lions — Area 2'], ['🐘', 'Elephant — Area 3']] }] },
    bMsg_('ana', 'Ana', 'We are at the zoo! The monkeys are eating bananas. The lions are sleeping.'),
    bAudio_('kai', 'Chief Kai', 'Hello, agents! The elephant is drinking water. The birds are singing.'),
  ], [
    bLerOuvir_([['What are the monkeys doing?', ['eating bananas', 'sleeping', 'singing'], 0], ['What are the birds doing?', ['singing', 'drinking', 'running'], 0]],
      ['Ana says: "The monkeys are ==eating bananas=="', 'Kai says: "The birds are ==singing=="'], 'localizar informação'),
    bBlocos_('Is, are or am?', 'Complete the sentences.', 'one → is · two or more → are · I → am.', [
      ['', 'The monkeys ___ eating.', ['are', 'is', 'am'], ['are'], { is: 'Monkeys = they → ARE.' }],
      ['', 'The elephant ___ drinking water.', ['is', 'are', 'am'], ['is'], { are: 'The elephant = it → IS.' }],
      ['', 'We ___ at the zoo.', ['are', 'is', 'am'], ['are'], { is: 'With WE → ARE.' }],
    ], ['it ==is== · they/we ==are==', 'The monkeys ==are== eating.'], 'present continuous'),
    bBlocos_('-ing', 'Complete with -ING.', 'Depois de is/are, o verbo ganha -ING.', [
      ['🐦', 'The birds are ___.', ['singing', 'sing', 'sings'], ['singing'], { sing: 'After ARE → SINGING.' }],
      ['🦁', 'The lions are ___.', ['sleeping', 'sleep', 'sleeps'], ['sleeping'], { sleep: 'After ARE → SLEEPING.' }],
    ], ['are + verbo + ==ing==', 'The birds are ==singing==.'], 'present continuous'),
  ], ['EF06LI09', 'EF06LI20', 'EF06LI20'], ['At the zoo, ', 'descrever o que dois animais estão fazendo.', 'At the zoo, the lion is sleeping and the birds are singing.', 'present continuous']);
  c(3, 'Hi, agent! An animal is [[out of its area|fora do lugar]]! Which animal is it?', [
    bCaderno_('A', 'A · Note', 'Zoo alert', ["An animal is not in its area! It's big and grey. It is drinking water in the lake."]),
    { id: 'B', aba: 'B · Animals', blocos: [{ tipo: 'itens', itens: [['🐘', 'elephant: big, grey, long nose'], ['🦏', 'rhino: big, grey, short nose'], ['🐒', 'monkey: small, brown']] }] },
    bAudio_('paulo', 'Mr. Paulo', "I'm watching the lake now. The animal is drinking water with its long nose!"),
  ], [
    bQuem_('Which animal is it?', 'Click the animal.', 'Clique no animal que está fora do lugar.',
      [{ emoji: '🐘', texto: 'elephant' }, { emoji: '🦏', texto: 'rhino' }, { emoji: '🐒', texto: 'monkey' }], 0,
      { 1: 'The rhino has a short nose.', 2: 'The monkey is small and brown.' }, ['==Big== and ==grey== + ==long nose==.', 'Listen to Paulo (clue C).'], "It's the **elephant**!", 'figuras'),
    bOuvirPista_("Paulo's message", [['Where is the animal?', ['at the lake', 'in Area 1', 'in the café'], 0], ['How is it drinking?', ['with its long nose', 'with its hands', 'with a cup'], 0]],
      ['Listen for ==lake== and ==nose==.', 'Paulo says: "with its ==long nose=="'], 'compreensão oral'),
    bBlocos_('Present continuous', 'Complete the sentences.', 'is/are + -ING.', [
      ['', 'The elephant ___ drinking.', ['is', 'are', 'am'], ['is'], { are: 'The elephant = it → IS.' }],
      ['', 'Paulo is ___ the lake.', ['watching', 'watch', 'watches'], ['watching'], { watch: 'After IS → WATCHING.' }],
      ['', 'The monkeys ___ sleeping.', ['are', 'is', 'am'], ['are'], { is: 'The monkeys = they → ARE.' }],
    ], ['it ==is== · they ==are== · verbo + ==ing==', 'Paulo is ==watching==.'], 'present continuous'),
    bVF_([['The elephant is grey.', true], ['The monkey is big.', false], ['The rhino has a short nose.', true], ['The elephant is sleeping.', false]],
      ['Check clues B and C.', 'The monkey is ==small==. The elephant is ==drinking==.'], 'present continuous'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI20', 'EF06LI20'], ['At the zoo, ', 'escrever um alerta do zoológico no present continuous.', 'At the zoo, the lion is running in the park!', 'present continuous']);

  // ======================================================== OUTUBRO (2º caso) · vida escolar e rotina (I/we)
  c = m6('school', '2026-10', 'OCT·2', 'The School Timetable');
  c(1, 'Hi, agent! Let\'s learn the school [[subjects|matérias]]!', [], [
    bFiguras_([['➕', ['math', 'art'], 0], ['🎨', ['science', 'art'], 1], ['🌍', ['geography', 'music'], 0], ['⚽', ['P.E.', 'English'], 0]],
      ['==math== = matemática · ==art== = artes', '==geography== = geografia · ==P.E.== = educação física'], 'vocabulário: escola'),
    bOuvir_([["We have math at eight o'clock.", ['🕗', '🕙'], 0], ['I have art on Friday.', ['FRI', 'MON'], 0, 'pilulas']],
      ["==eight o'clock== = 🕗", '==Friday== = FRI'], 'compreensão oral: horas e dias'),
    bBlocos_('Have or go?', 'Complete the sentence.', 'I/we + verbo sem -s.', [
      ['📚', 'We ___ English on Monday.', ['have', 'has'], ['have'], { has: 'With WE → HAVE.' }],
      ['🏫', 'I ___ to school at seven.', ['go', 'goes'], ['go'], { goes: 'With I → GO.' }],
    ], ['I/we + ==have==, ==go==', 'We ==have== English.'], 'rotina (I/we + verbo)'),
  ], ['EF06LI17', 'EF06LI04', 'EF06LI19'], ['My favourite subject is ', 'dizer a sua matéria preferida.', 'My favourite subject is art.', 'rotina escolar']);
  c(2, 'Hi, agent! Here is the 6A [[timetable|horário]]. Read the clues!', [
    { id: 'A', aba: 'A · Timetable', blocos: [{ tipo: 'semana', titulo: '6A TIMETABLE', dias: [['MON', '➕'], ['TUE', '🎨'], ['WED', '🌍'], ['THU', '⚽'], ['FRI', '🇬🇧']] }] },
    bMsg_('ana', 'Ana', 'I love Fridays! We have English. On Thursdays we have P.E.'),
    bAudio_('leo', 'Leo', "My favourite day is Tuesday. We have art at ten o'clock."),
  ], [
    bLerOuvir_([['They have English on…', ['Friday', 'Monday', 'Tuesday'], 0], ["Leo's favourite day is…", ['Tuesday', 'Thursday', 'Friday'], 0]],
      ['Ana says: "I love ==Fridays==! We have English."', 'Leo says: "My favourite day is ==Tuesday=="'], 'localizar informação'),
    bBlocos_('School routine', 'Complete the sentences.', 'I/we + verbo sem -s.', [
      ['⚽', 'We ___ P.E. on Thursday.', ['have', 'has', 'having'], ['have'], { has: 'With WE → HAVE.' }],
      ['🎨', 'I ___ art.', ['love', 'loves', 'loving'], ['love'], { loves: 'With I → LOVE.' }],
      ['🚌', 'We ___ to school by bus.', ['go', 'goes', 'going'], ['go'], { goes: 'With WE → GO.' }],
    ], ['I/we + verbo sem -s', 'We ==go== to school.'], 'rotina (I/we + verbo)'),
    { titulo: 'What time is it?', tipo: 'Clocks', onomatopeia: 'TICK!',
      passos: [['👀', 'Look at the clocks.', 'Olhe os relógios.'], ['🧩', 'Put the right time.', 'Toque num bloco para colocar o horário embaixo do relógio.']],
      dicas: ['The **short** hand shows the hour.', "Short hand on 8 = ==eight o'clock==."],
      partes: [{ tipo: 'associar', alvos: [{ relogio: [8, 0], rotulo: 'math', resposta: 0 }, { relogio: [10, 0], rotulo: 'art', resposta: 1 }], blocos: ["eight o'clock", "ten o'clock", "nine o'clock"] }],
      solucao: "Math: **eight o'clock** · Art: **ten o'clock**",
      etiquetas: [{ codigo: 'EF06LI17', foco: 'horas' }] },
  ], ['EF06LI09', 'EF06LI19', 'EF06LI17'], ['On Mondays, we have ', 'contar as aulas de um dia da sua semana.', 'On Mondays, we have math and English.', 'rotina escolar']);
  c(3, 'Hi, agent! Someone lost a [[timetable|horário]]. Whose is it?', [
    bCaderno_('A', 'A · Note', 'Written on the timetable', ["My favourite subject is art. I go to school by bike. I'm in 6A."]),
    bFichas_([['leo', 'LEO', ['favourite: art', 'by bike', '6B']], ['ana', 'ANA', ['favourite: English', 'by bike', '6A']], ['bia', 'BIA', ['favourite: art', 'by bike', '6A']]]),
    bAudio_('paulo', 'Mr. Paulo', 'The student is in class 6A and loves art.'),
  ], [
    bQuem_('Whose timetable is it?', 'Click the student.', 'Clique no dono do horário.',
      [{ personagem: 'leo', texto: 'LEO' }, { personagem: 'ana', texto: 'ANA' }, { personagem: 'bia', texto: 'BIA' }], 2,
      { 0: 'Leo is in 6B.', 1: "Ana's favourite subject is English." }, ['==Art== + ==by bike== + ==6A==.', 'Leo is in 6B. Ana loves English.'], "It's **Bia's** timetable!"),
    bOuvirPista_("Paulo's message", [['The student is in…', ['6A', '6B', '7A'], 0], ['Favourite subject:', ['art', 'English', 'math'], 0]],
      ['Listen for a class and a subject.', 'Paulo says: "loves ==art=="'], 'compreensão oral'),
    bBlocos_('School routine', 'Complete the sentences.', 'I/we/they + verbo sem -s · we are.', [
      ['', 'I ___ art.', ['love', 'loves', 'loving'], ['love'], { loves: 'With I → LOVE.' }],
      ['', 'We ___ in 6A.', ['are', 'is', 'am'], ['are'], { is: 'With WE → ARE.' }],
      ['', 'Leo and Bia ___ to school by bike.', ['go', 'goes', 'going'], ['go'], { goes: 'Leo and Bia = they → GO.' }],
    ], ['they + verbo sem -s', 'Leo and Bia ==go== by bike.'], 'rotina (I/we/they + verbo)'),
    bVF_([['Bia loves art.', true], ['Leo is in 6A.', false], ['Ana goes to school by bike.', true], ["Ana's favourite subject is art.", false]],
      ['Check clue B.', 'Leo is in ==6B==. Ana loves ==English==.'], 'rotina escolar'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI19', 'EF06LI17'], ['I go to school ', 'contar como vai à escola e sua matéria preferida.', 'I go to school by bus. My favourite subject is math.', 'rotina escolar']);

  // ======================================================== NOVEMBRO (2º caso) · rotina de outras pessoas (3ª pessoa)
  c = m6('night', '2026-11', 'NOV·2', 'The Night Worker');
  c(1, 'Hi, agent! Let\'s learn about Mr. Paulo\'s [[routine|rotina]]!', [], [
    bFiguras_([['🚿', ['takes a shower', 'eats'], 0], ['☕', ['sleeps', 'drinks coffee'], 1], ['🐕', ['walks the dog', 'cooks'], 0], ['📰', ['reads the news', 'swims'], 0]],
      ['==takes a shower== = toma banho · ==drinks coffee== = bebe café', '==walks the dog== = passeia com o cachorro · ==reads the news== = lê as notícias'], 'vocabulário: rotina (3ª pessoa)'),
    bOuvir_([['He drinks coffee at seven.', ['☕', '🍕'], 0], ['She walks the dog every day.', ['🐈', '🐕'], 1]],
      ['==coffee== = ☕ · ==dog== = 🐕', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral: rotina'),
    bBlocos_('Add -s', 'Complete with the verb.', 'Com he/she, o verbo ganha -S.', [
      ['👴☕', 'Mr. Paulo ___ coffee.', ['drinks', 'drink'], ['drinks'], { drink: 'Mr. Paulo = he → DRINKS.' }],
      ['👧🐕', 'Ana ___ the dog.', ['walks', 'walk'], ['walks'], { walk: 'Ana = she → WALKS.' }],
    ], ['he/she → verbo + ==s==', 'Paulo ==drinks== coffee.'], 'simple present (he/she + -s)'),
  ], ['EF06LI19', 'EF06LI04', 'EF06LI19'], ['My father ', 'contar uma coisa que alguém da família faz todo dia.', 'My father drinks coffee every morning.', 'simple present (3ª pessoa)']);
  c(2, 'Hi, agent! What is Mr. Paulo\'s [[routine|rotina]]? Read the clues!', [
    { id: 'A', aba: "A · Paulo's day", blocos: [{ tipo: 'linha', itens: [['6:00', 'gets up'], ['7:00', 'drinks coffee'], ['8:00', 'goes to school'], ['6:00 p.m.', 'walks the dog']] }] },
    bMsg_('bia', 'Bia', "Mr. Paulo gets up at six. He doesn't have breakfast at home."),
    bAudio_('paulo', 'Mr. Paulo', 'Hi! I always walk my dog after work. I never watch TV.'),
  ], [
    bLerOuvir_([['Paulo gets up at…', ['6:00', '7:00', '8:00'], 0], ['Does Paulo watch TV?', ["No, he doesn't.", 'Yes, he does.', "No, he isn't."], 0]],
      ['Clue A: ==6:00== gets up.', 'Paulo says: "I ==never== watch TV."'], 'localizar informação'),
    bBlocos_('Add -s', 'Complete the sentences.', 'he/she → verbo + S.', [
      ['', 'Paulo ___ up at six.', ['gets', 'get', 'getting'], ['gets'], { get: 'Paulo = he → GETS.' }],
      ['', 'He ___ coffee at seven.', ['drinks', 'drink', 'drinking'], ['drinks'], { drink: 'He → DRINKS.' }],
      ['', 'He ___ the dog after work.', ['walks', 'walk', 'walking'], ['walks'], { walk: 'He → WALKS.' }],
    ], ['he → verbo + ==s==', 'He ==walks== the dog.'], 'simple present (3ª pessoa)'),
    bBlocos_("Does or doesn't?", 'Complete the sentences.', "DOES = pergunta (he/she) · DOESN'T = não (he/she).", [
      ['📺', 'He ___ watch TV.', ["doesn't", "don't", NAO], ["doesn't"], { "don't": "He → DOESN'T." }],
      ['🐕', '___ Paulo have a dog? Yes, he does.', ['Does', 'Do', 'Is'], ['Does'], { do: 'Paulo = he → DOES.' }],
    ], ["he ==doesn't== · ==Does== he…?", "He ==doesn't== watch TV."], "does / doesn't"),
  ], ['EF06LI09', 'EF06LI19', 'EF06LI19'], ['My neighbour ', 'descrever a rotina de um vizinho ou parente.', "My neighbour gets up at five. He doesn't watch TV.", 'simple present (3ª pessoa)']);
  c(3, 'Hi, agent! Someone in the neighbourhood [[works at night|trabalha à noite]]. Who?', [
    bCaderno_('A', 'A · Note', 'Found in the mailbox', ['I sleep in the morning. I work at night. I have a cat.']),
    bFichas_([['tom', 'GRANDPA TOM', ['works at night', 'has a cat']], ['paulo', 'MR. PAULO', ['works in the morning', 'has a dog']], ['rosa', 'ROSA', ['works at night', 'has a dog']]]),
    bAudio_('ana', 'Ana', 'Grandpa Tom works at night at the hospital. He sleeps in the morning.'),
  ], [
    bQuem_('Who wrote the note?', 'Click the person.', 'Clique em quem escreveu o bilhete.',
      [{ personagem: 'tom', texto: 'TOM' }, { personagem: 'paulo', texto: 'PAULO' }, { personagem: 'rosa', texto: 'ROSA' }], 0,
      { 1: 'Mr. Paulo works in the morning.', 2: 'Rosa has a dog, not a cat.' }, ['==Works at night== + ==has a cat==.', 'Paulo works in the morning. Rosa has a dog.'], "It's **Grandpa Tom**!"),
    bOuvirPista_("Ana's message", [['Tom works at…', ['the hospital', 'the school', 'the zoo'], 0], ['He sleeps in the…', ['morning', 'night', 'afternoon'], 0]],
      ['Listen for a place and a time of day.', 'Ana says: "He ==sleeps in the morning=="'], 'compreensão oral'),
    bBlocos_("-s or doesn't?", 'Complete the sentences.', "he/she + verbo com S · doesn't + verbo sem S.", [
      ['', 'Tom ___ at night.', ['works', 'work', 'working'], ['works'], { work: 'Tom = he → WORKS.' }],
      ['', 'Rosa ___ have a cat.', ["doesn't", "don't", NAO], ["doesn't"], { "don't": "Rosa = she → DOESN'T." }],
      ['', 'Paulo ___ in the morning.', ['works', 'work', 'working'], ['works'], { work: 'Paulo = he → WORKS.' }],
    ], ["he/she → +==s== · ==doesn't== + verbo", "Rosa ==doesn't== have a cat."], 'simple present (3ª pessoa)'),
    bVF_([['Tom has a cat.', true], ['Paulo works at night.', false], ['Rosa works at night.', true], ['Tom sleeps at night.', false]],
      ['Check clues B and C.', 'Paulo works in the ==morning==. Tom sleeps in the ==morning==.'], 'simple present (3ª pessoa)'),
  ], ['EF06LI09', 'EF06LI04', 'EF06LI19', 'EF06LI19'], ['My grandfather ', 'descrever a rotina de uma pessoa da família.', 'My grandfather wakes up at five and walks in the park.', 'simple present (3ª pessoa)']);

  // ======================================================== Exercícios avulsos de leitura (só para o "Meu reforço")
  L.push.apply(L, avulsosLeitura_('6º', [
    { texto: "Hi! I'm Tom. I'm 12. I'm from Joinville. My favourite sport is soccer.", pergunta: 'How old is Tom?', opcoes: ['12', '11', '13'], resposta: 0, codigo: 'EF06LI09' },
    { texto: 'This is my family. My mother is Julia. My father is Carlos. My sister is Bia.', pergunta: 'Who is Bia?', opcoes: ['the sister', 'the mother', 'the father'], resposta: 0, codigo: 'EF06LI09' },
    { texto: 'SCHOOL PARTY! Friday, 4 p.m. Bring food and drinks. Music and games!', pergunta: 'What is this text?', opcoes: ['an invitation', 'a recipe', 'a story'], resposta: 0, codigo: 'EF06LI07', foco: 'finalidade do texto (inferência)' },
    { texto: 'Leo is wearing a coat, a hat and gloves. He is drinking hot chocolate.', pergunta: 'How is the weather?', opcoes: ['cold', 'hot', 'sunny and hot'], resposta: 0, codigo: 'EF06LI07', foco: 'informação implícita (inferência)' },
    { texto: 'Ana and Bia are in the kitchen. They are making a cake for their mother.', pergunta: 'Where are Ana and Bia?', opcoes: ['in the kitchen', 'in the garden', 'at school'], resposta: 0, codigo: 'EF06LI09' },
    { texto: 'My name is Yuki. I am Japanese, but I live in Brazil. I speak Japanese and Portuguese.', pergunta: 'Where does Yuki live?', opcoes: ['in Brazil', 'in Japan', 'in China'], resposta: 0, codigo: 'EF06LI09' },
    { texto: 'Lost: a small black dog. His name is Rex. Call 3456-7890.', pergunta: 'What is the purpose of the text?', opcoes: ['to find a dog', 'to sell a dog', 'to describe a party'], resposta: 0, codigo: 'EF06LI07', foco: 'finalidade do texto (inferência)' },
    { texto: "It's 7 a.m. Mia is in her bed. Her alarm clock is ringing, but she is sleeping.", pergunta: 'What is Mia doing?', opcoes: ['sleeping', 'eating', 'running'], resposta: 0, codigo: 'EF06LI09' },
  ]));

  // Exercícios avulsos de gramática e vocabulário (para habilidades com poucos cadeados curtos)
  L.push.apply(L, avulsosBlocos_('6º', [
    { figura: '👦', frase: '___ is my brother.', blocos: ['He', 'She', 'It'], resposta: 'He', codigo: 'EF06LI19', foco: 'subject pronouns', dica: 'boy → ==he== · girl → ==she== · thing/animal → ==it==' },
    { figura: '👧👦', frase: '___ are my friends.', blocos: ['They', 'He', 'It'], resposta: 'They', codigo: 'EF06LI19', foco: 'subject pronouns', dica: 'two or more people → ==they==' },
    { figura: '🐱', frase: '___ is a cat.', blocos: ['It', 'He', 'They'], resposta: 'It', codigo: 'EF06LI19', foco: 'subject pronouns', dica: 'animal → ==it==' },
    { figura: '🚲', frase: "This is ___ bike. (Leo)", blocos: ["Leo's", 'Leo', 'Leos'], resposta: "Leo's", codigo: 'EF06LI22', foco: "genitive 's", dica: "nome + =='s== = de quem é" },
    { figura: '🐶', frase: "Rex is ___ dog. (Ana)", blocos: ["Ana's", 'Ana', 'Anas'], resposta: "Ana's", codigo: 'EF06LI22', foco: "genitive 's", dica: "nome + =='s== = de quem é" },
    { figura: '👨', frase: "Carlos is ___ father. (Bia)", blocos: ["Bia's", 'Bia', 'Bias'], resposta: "Bia's", codigo: 'EF06LI22', foco: "genitive 's", dica: "nome + =='s== = de quem é" },
    { figura: '👵', frase: "My mother's mother is my ___.", blocos: ['grandmother', 'sister', 'aunt'], resposta: 'grandmother', codigo: 'EF06LI17', foco: 'family', dica: '==grandmother== = avó' },
    { figura: '👦', frase: "My mother's son is my ___.", blocos: ['brother', 'father', 'uncle'], resposta: 'brother', codigo: 'EF06LI17', foco: 'family', dica: '==brother== = irmão' },
    { figura: '👨', frase: "My father's brother is my ___.", blocos: ['uncle', 'cousin', 'grandfather'], resposta: 'uncle', codigo: 'EF06LI17', foco: 'family', dica: '==uncle== = tio' },
    { figura: '👧', frase: 'This is Mia. ___ hair is long.', blocos: ['Her', 'His', 'Its'], resposta: 'Her', codigo: 'EF06LI23', foco: 'possessive adjectives', dica: 'girl → ==her== (dela)' },
    { figura: '🙋', frase: 'We are in 6A. ___ teacher is Ms. Rosa.', blocos: ['Our', 'Their', 'Your'], resposta: 'Our', codigo: 'EF06LI23', foco: 'possessive adjectives', dica: 'we → ==our== (nosso)' },
    { figura: '❓', frase: '___ you from Joinville?', blocos: ['Are', 'Is', 'Am'], resposta: 'Are', codigo: 'EF06LI19', foco: 'verb to be', dica: 'you → ==are==' },
  ]));

  return L;
}

/**
 * Exercícios avulsos de gramática: casos ocultos (dados.avulso) com cadeados de 1 frase para completar com blocos.
 * Só alimentam o "Meu reforço". Até 6 cadeados por caso.
 */
function avulsosBlocos_(serie, itens) {
  const casos = [];
  for (let i = 0; i < itens.length; i += 6) {
    const parte = itens.slice(i, i + 6);
    casos.push({
      id: 'v' + serie.charAt(0) + '-blocos-' + (i / 6 + 1), serie: serie, mes: '2026-03', titulo: 'Grammar practice ' + serie + ' ' + (i / 6 + 1), numero: 'G' + (i / 6 + 1),
      avulso: true, saga: 'base',
      abertura: { personagem: 'max', nome: 'COACH MAX', texto: "Let's practice!" },
      evidencias: [],
      travas: parte.map(function (it) {
        const t = bBlocos_('Complete the sentence', 'Complete the sentence.', 'Toque no bloco certo para completar a frase.',
          [[it.figura || '', it.frase, it.blocos, [it.resposta]]], [it.dica, 'A resposta certa é uma das palavras dos blocos. Leia a frase inteira.'], it.foco);
        t.etiquetas = [{ codigo: it.codigo, foco: it.foco }];
        return t;
      }),
      final: null,
    });
  }
  return casos;
}

/**
 * Exercícios avulsos de leitura: casos ocultos (dados.avulso) com cadeados de um texto curto + 1 pergunta.
 * Só alimentam o "Meu reforço" (não aparecem nas listas). Até 6 cadeados por caso.
 */
function avulsosLeitura_(serie, itens) {
  const casos = [];
  for (let i = 0; i < itens.length; i += 6) {
    const parte = itens.slice(i, i + 6);
    casos.push({
      id: 'v' + serie.charAt(0) + '-leitura-' + (i / 6 + 1), serie: serie, mes: '2026-03', titulo: 'Reading practice ' + serie + ' ' + (i / 6 + 1), numero: 'R' + (i / 6 + 1),
      avulso: true, saga: 'base',
      abertura: { personagem: 'max', nome: 'COACH MAX', texto: "Let's read!" },
      evidencias: [],
      travas: parte.map(function (it) {
        return {
          titulo: 'Read and answer', tipo: 'Reading', onomatopeia: 'YES!',
          passos: [['👀', 'Read the text.', 'Leia o texto curto.'], ['👆', 'Choose the answer.', 'Escolha a resposta.']],
          dicas: ['Read the text again, slowly.', 'Look for the key words of the question in the text.'],
          partes: [{ tipo: 'pista', blocos: [{ tipo: 'texto', texto: it.texto }] }, escolhaMisturada_({ tipo: 'escolha', pergunta: it.pergunta, opcoes: it.opcoes, resposta: it.resposta })],
          solucao: it.pergunta + ' **' + it.opcoes[it.resposta] + '**',
          etiquetas: [{ codigo: it.codigo, foco: it.foco || 'localizar informação' }],
        };
      }),
      final: null,
    });
  }
  return casos;
}
