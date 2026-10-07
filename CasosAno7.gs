/**
 * Banco do 7º ano (Etapa 4): 2 casos por período do Mapa 2026, cada um em 3 degraus,
 * e exercícios avulsos de leitura e gramática para o "Meu reforço". Saga: Time Detectives.
 */

function casosAno7_() {
  const L = [];
  const WAS = "wasn't", WERE = "weren't", COULD = "couldn't", CAN = "can't", DONT = "don't", DOESNT = "doesn't";
  function m7(sufixo, mes, numero, titulo) {
    return function (degrau, abertura, ev, travas, codigos, final) {
      L.push(aCaso_('7º', sufixo, mes, numero, titulo, degrau, abertura, ev, travas, codigos, final));
    };
  }

  // ======================================================== MARÇO · inglês no mundo, simple present, estratégias de leitura
  let c = m7('a7', '2026-03', 'MAR·1', 'English Around the World');
  c(1, 'Hi, detective! People speak English all over the [[world|mundo]]. Let\'s travel!', [], [
    bFiguras_([['🇺🇸', ['English', 'Spanish'], 0], ['🇧🇷', ['English', 'Portuguese'], 1], ['🇲🇽', ['French', 'Spanish'], 1], ['🇫🇷', ['French', 'Japanese'], 0]],
      ['🇺🇸 ==English== · 🇧🇷 ==Portuguese==', '🇲🇽 ==Spanish== · 🇫🇷 ==French=='], 'língua franca: idiomas'),
    bOuvir_([['People speak English in Australia.', ['Australia', 'Brazil'], 0, 'pilulas'], ['He speaks Spanish.', ['🇯🇵', '🇲🇽'], 1]],
      ['==Australia== · ==Spanish== = 🇲🇽', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Simple present', 'Complete the sentence.', 'they + verbo · she + verbo com -S.', [
      ['🇨🇦', 'They ___ English in Canada.', ['speak', 'speaks'], ['speak'], { speaks: 'With THEY → SPEAK.' }],
      ['🇬🇧', 'She ___ in London.', ['lives', 'live'], ['lives'], { live: 'With SHE → LIVES.' }],
    ], ['they ==speak== · she ==lives==', 'he/she → verbo + s'], 'simple present'),
  ], ['EF07LI21', 'EF07LI04', 'EF07LI06'], ['I speak ', 'dizer quais línguas você fala ou quer aprender.', 'I speak Portuguese and a little English.', 'simple present']);
  c(2, 'Hi, detective! Why is English [[important|importante]] in the world? Read the clues!', [
    { id: 'A', aba: 'A · Infographic', blocos: [{ tipo: 'itens', itens: [['🌍', '1.5 billion people speak English'], ['✈️', 'Pilots speak English in the air'], ['💻', 'The internet uses a lot of English']] }] },
    bMsg_('pedro', 'Pedro', 'I play online games with kids from Japan and Mexico. We speak English to [[understand|entender]] each other!'),
    bAudio_('clock', 'Captain Clock', 'English is a lingua franca. People from different countries use English to talk to each other.'),
  ], [
    bLerOuvir_([['Pedro speaks English online to…', ['understand other kids', 'study math', 'sleep'], 0], ['A lingua franca is…', ['a common language between people', 'a type of food', 'a country'], 0]],
      ['Pedro: "to ==understand== each other"', 'Clock: "people from different countries use English to ==talk=="'], 'língua franca'),
    bBlocos_('Simple present', 'Complete the sentences.', 'they/we + verbo · he/she + verbo com -S.', [
      ['✈️', 'Pilots ___ English.', ['speak', 'speaks', 'speaking'], ['speak'], { speaks: 'Pilots = they → SPEAK.' }],
      ['🎮', 'Pedro ___ online games.', ['plays', 'play', 'playing'], ['plays'], { play: 'Pedro = he → PLAYS.' }],
      ['💻', 'Many people ___ English on the internet.', ['use', 'uses', 'using'], ['use'], { uses: 'Many people = they → USE.' }],
    ], ['they ==speak== · he ==plays==', 'Pedro = he → ==plays=='], 'simple present'),
    { titulo: 'English or not?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the countries to the boxes.', 'Separe: países onde o inglês é língua oficial e países com outras línguas.']],
      dicas: ['English is official in ==the USA==, ==Australia== and ==Canada==.', 'Brazil → Portuguese · Mexico → Spanish · Japan → Japanese'],
      partes: [{ tipo: 'separar', caixas: ['ENGLISH', 'OTHER LANGUAGES'], itens: [
        { texto: 'Brazil', resposta: 1 }, { texto: 'the USA', resposta: 0 }, { texto: 'Japan', resposta: 1 },
        { texto: 'Australia', resposta: 0 }, { texto: 'Mexico', resposta: 1 }, { texto: 'Canada', resposta: 0 }] }],
      solucao: '**English**: the USA, Australia, Canada · **Other**: Brazil, Mexico, Japan',
      etiquetas: [{ codigo: 'EF07LI21', foco: 'língua franca' }] },
  ], ['EF07LI21', 'EF07LI06', 'EF07LI21'], ['English is important because ', 'dizer por que o inglês é importante para você.', 'English is important because I play online games.', 'simple present']);
  c(3, 'Hi, detective! A [[pen pal|amigo por correspondência]] sent a letter. Who is it?', [
    bCaderno_('A', 'A · Letter', 'Pen pal letter', ['My pen pal speaks English and French. He lives in a country in North America.']),
    bFichas_([['ben', 'BEN', ['lives in Canada', 'speaks English and French']], ['sam', 'SAM', ['lives in the USA', 'speaks English and Spanish']], ['pedro', 'PEDRO', ['lives in Brazil', 'speaks Portuguese and English']]]),
    bAudio_('mia', 'Mia', "My pen pal's city is very cold in winter. People there speak English and French."),
  ], [
    bQuem_('Who is the pen pal?', 'Click the person.', 'Clique no amigo por correspondência.',
      [{ personagem: 'ben', texto: 'BEN' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'pedro', texto: 'PEDRO' }], 0,
      { 1: "Sam speaks Spanish, not French.", 2: 'Pedro lives in Brazil, in South America.' }, ['==English and French== + ==North America==.', 'Who speaks French?'], "It's **Ben**, from Canada!"),
    bOuvirPista_("Mia's message", [['His city is…', ['very cold in winter', 'very hot', 'in Brazil'], 0], ['People there speak…', ['English and French', 'Spanish', 'Japanese'], 0]],
      ['Listen for ==cold== and ==French==.', 'Mia says: "very ==cold== in winter"'], 'compreensão oral'),
    bBlocos_('Simple present', 'Complete the sentences.', 'he/she + verbo com -S · they + verbo.', [
      ['', 'Ben ___ in Canada.', ['lives', 'live', 'living'], ['lives'], { live: 'Ben = he → LIVES.' }],
      ['', 'Sam ___ English and Spanish.', ['speaks', 'speak', 'speaking'], ['speaks'], { speak: 'Sam = he → SPEAKS.' }],
      ['', 'They ___ English as a lingua franca.', ['use', 'uses', 'using'], ['use'], { uses: 'They → USE.' }],
    ], ['he ==lives== · they ==use==', 'Ben = he → ==lives=='], 'simple present'),
    bVF_([['Ben speaks French.', true], ['Sam lives in Canada.', false], ['Pedro speaks Portuguese.', true], ['Ben lives in Brazil.', false]],
      ['Check clue B.', 'Sam lives in ==the USA==.'], 'simple present'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI06', 'EF07LI06'], ['My pen pal ', 'descrever um amigo de outro país (onde mora, que língua fala).', 'My pen pal lives in Canada. He speaks English and French.', 'simple present']);

  c = m7('signs', '2026-03', 'MAR·2', 'Signs at the Airport');
  c(1, 'Hi, detective! We are at the [[airport|aeroporto]]. Read the signs!', [], [
    bFiguras_([['🚻', ['toilets', 'exit'], 0], ['🚪', ['food', 'exit'], 1], ['🍽️', ['restaurant', 'pharmacy'], 0], ['🛫', ['hotel', 'departures'], 1]],
      ['==toilets== = banheiros · ==exit== = saída', '==departures== = partidas · ==restaurant== = restaurante (cognato!)'], 'cognatos e pistas visuais'),
    bOuvir_([['The flight leaves at nine.', ['🕘', '🕒'], 0], ['Go to gate number five.', ['9', '5'], 1, 'pilulas']],
      ['==nine== = 9 = 🕘 · ==five== = 5', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Simple present', 'Complete the sentence.', 'it/he/she + verbo com -S · we + verbo.', [
      ['✈️', 'The plane ___ at nine.', ['leaves', 'leave'], ['leaves'], { leave: 'The plane = it → LEAVES.' }],
      ['🧍', 'We ___ at gate 5.', ['wait', 'waits'], ['wait'], { waits: 'With WE → WAIT.' }],
    ], ['it ==leaves== · we ==wait==', 'The plane = it → ==leaves=='], 'simple present'),
  ], ['EF07LI06', 'EF07LI04', 'EF07LI06'], ['At the airport, ', 'escrever uma placa ou aviso de aeroporto.', 'At the airport, the restaurant opens at six.', 'cognatos']);
  c(2, 'Hi, detective! The airport board has [[important|importante]] information. Read it!', [
    bTela_('A', 'A · Board', 'DEPARTURES', ['JJ205 · TO LONDON · GATE 7 · 10:30 · ON TIME', 'LA330 · TO SANTIAGO · GATE 2 · 11:15 · DELAYED']),
    bMsg_('lucy', 'Lucy', 'My flight to London leaves at 10:30. I love airports!'),
    bAudio_('clock', 'Airport announcement', 'Attention, please. Flight LA330 to Santiago is delayed. Passengers, please wait at gate two.'),
  ], [
    bLerOuvir_([['What gate is the London flight?', ['7', '2', '5'], 0], ['Which flight is delayed?', ['the flight to Santiago', 'the flight to London', 'no flight'], 0]],
      ['Board: LONDON · ==GATE 7==', 'Announcement: "LA330 to Santiago is ==delayed=="'], 'localizar informação'),
    { titulo: 'Cognates', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👀', 'Read the words.', 'Leia as palavras.'], ['👆', 'Click COGNATE or NOT.', 'COGNATE = parecida com o português e com o mesmo sentido (passenger = passageiro).']],
      dicas: ['==passenger== parece ==passageiro==.', '==delayed== = atrasado (não parece nenhuma palavra em português).'],
      partes: [{ tipo: 'classificar', categorias: ['COGNATE', 'NOT A COGNATE'], itens: [
        { texto: 'passenger', resposta: 0 }, { texto: 'delayed', resposta: 1 }, { texto: 'information', resposta: 0 }, { texto: 'gate', resposta: 1 }] }],
      solucao: '**Cognates**: passenger, information · **Not**: delayed (atrasado), gate (portão)',
      etiquetas: [{ codigo: 'EF07LI06', foco: 'cognatos' }] },
    bBlocos_('Simple present', 'Complete the sentences.', 'it + verbo com -S · they + verbo.', [
      ['✈️', 'Flight JJ205 ___ at 10:30.', ['leaves', 'leave', 'leaving'], ['leaves'], { leave: 'The flight = it → LEAVES.' }],
      ['🧍', 'Passengers ___ at gate two.', ['wait', 'waits', 'waiting'], ['wait'], { waits: 'Passengers = they → WAIT.' }],
    ], ['it ==leaves== · they ==wait==', 'The flight = it → ==leaves=='], 'simple present'),
  ], ['EF07LI09', 'EF07LI06', 'EF07LI06'], ['My flight ', 'escrever um aviso de voo (destino, portão, horário).', 'My flight to Rio leaves at 9:00 from gate 4.', 'simple present']);
  c(3, 'Hi, detective! Captain Clock [[lost|perdeu]] his ticket. Which is his flight?', [
    bCaderno_('A', 'A · Note', "Clock's note", ['My flight goes to a city in Europe. It leaves after 10 a.m.']),
    { id: 'B', aba: 'B · Board', moldura: 'tela', blocos: [{ tipo: 'meta', texto: 'DEPARTURES' }, { tipo: 'texto', texto: 'JJ205 · LONDON · 10:30' }, { tipo: 'texto', texto: 'LA330 · SANTIAGO · 11:15' }, { tipo: 'texto', texto: 'AF100 · PARIS · 9:00' }] },
    bAudio_('clock', 'Captain Clock', "I don't remember my flight number. My city is in Europe, and I want a cup of tea there!"),
  ], [
    bQuem_('Which flight is it?', 'Click the flight.', 'Clique no voo do Captain Clock.',
      [{ emoji: '🇬🇧', texto: 'JJ205' }, { emoji: '🇨🇱', texto: 'LA330' }, { emoji: '🇫🇷', texto: 'AF100' }], 0,
      { 1: 'Santiago is in South America.', 2: 'The Paris flight leaves at 9:00, before 10 a.m.' }, ['==Europe== + ==after 10 a.m.==', 'Tea → London!'], "It's **JJ205** to London!", 'figuras'),
    bOuvirPista_("Clock's message", [['He wants a cup of tea…', ['in Europe', 'in South America', 'at home'], 0], ['Does he remember his flight number?', ["No, he doesn't.", 'Yes, he does.', "No, he isn't."], 0]],
      ['Listen for ==remember== and ==tea==.', 'Clock: "I ==don\'t remember== my flight number."'], 'compreensão oral'),
    bBlocos_('Simple present', 'Complete the sentences.', 'he/it + verbo com -S · they + verbo.', [
      ['', 'The London flight ___ at 10:30.', ['leaves', 'leave', 'leaving'], ['leaves'], { leave: 'The flight = it → LEAVES.' }],
      ['', 'Captain Clock ___ tea.', ['wants', 'want', 'wanting'], ['wants'], { want: 'Clock = he → WANTS.' }],
      ['', 'The passengers ___ at the gate.', ['wait', 'waits', 'waiting'], ['wait'], { waits: 'Passengers = they → WAIT.' }],
    ], ['he ==wants== · they ==wait==', 'Clock = he → ==wants=='], 'simple present'),
    bVF_([['JJ205 goes to London.', true], ['AF100 leaves at 11:15.', false], ['Paris is in Europe.', true], ['Santiago is in Europe.', false]],
      ['Check clue B.', 'AF100 leaves at ==9:00==.'], 'cognatos'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI06', 'EF07LI06'], ['My dream trip is to ', 'contar para onde gostaria de viajar.', 'My dream trip is to London. I want to see Big Ben.', 'simple present']);

  // ======================================================== ABRIL · comida, imperativo, contáveis e incontáveis
  c = m7('a7', '2026-04', 'APR·1', 'The Recipe Thief');
  c(1, "Hi, detective! Grandma Nina's [[recipe|receita]] is missing! Let's learn food words.", [], [
    bFiguras_([['🥚', ['eggs', 'milk'], 0], ['🧈', ['bread', 'butter'], 1], ['🍚', ['flour', 'rice'], 1], ['🍓', ['strawberries', 'tomatoes'], 0]],
      ['==eggs== = ovos · ==butter== = manteiga', '==rice== = arroz · ==strawberries== = morangos'], 'food'),
    bOuvir_([['Mix the eggs and the milk.', ['🥚🥛', '🍕'], 0], ['Put the cake in the oven.', ['❄️', '🔥'], 1]],
      ['==mix== = misturar · ==oven== = forno 🔥', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Recipe verbs', 'Complete the recipe.', 'Na receita, o verbo vem no começo: Mix! Bake!', [
      ['🥣', '___ the eggs.', ['Mix', 'Mixes'], ['Mix'], { mixes: 'Recipe → the verb without -s: MIX.' }],
      ['🍰', '___ the cake for 30 minutes.', ['Bake', 'Baking'], ['Bake'], { baking: 'Recipe → BAKE.' }],
    ], ['receita: verbo no começo (==Mix==, ==Bake==)', '==Bake== the cake.'], 'imperative (recipes)'),
  ], ['EF07LI24-JO', 'EF07LI04', 'EF07LI24-JO'], ['My favourite food is ', 'dizer sua comida favorita.', 'My favourite food is pizza.', 'food']);
  c(2, "Hi, detective! Grandma Nina's [[recipe|receita]] is missing. Read the clues!", [
    bCaderno_('A', 'A · Recipe page', 'PANCAKES', ['2 eggs, 1 cup of milk, 1 cup of flour.', '1. Mix the eggs and the milk. 2. Add the flour. 3. Cook in a hot pan.']),
    bMsg_('nina', 'Grandma Nina', "My pancake recipe is a secret! Don't show it to anyone."),
    bAudio_('pedro', 'Pedro', 'The recipe is missing! We need two eggs and a cup of milk.'),
  ], [
    bLerOuvir_([['How many eggs?', ['2', '1', '3'], 0], ['Step 2: add the…', ['flour', 'eggs', 'sugar'], 0]],
      ['Recipe: ==2 eggs==', 'Step 2: ==Add the flour=='], 'localizar informação'),
    bBlocos_('Imperatives', 'Complete the recipe.', "Verbo no começo · DON'T = não.", [
      ['🥣', '___ the eggs and the milk.', ['Mix', 'Mixing', 'Mixes'], ['Mix'], { mixes: 'Recipe → MIX.' }],
      ['🌾', '___ the flour.', ['Add', 'Adds', 'Adding'], ['Add'], { adds: 'Recipe → ADD.' }],
      ['🤫', '___ show it to anyone!', [DONT, DOESNT, 'Not'], [DONT], { "doesn't": "Imperative → DON'T." }],
    ], ["==Mix== · ==Add== · ==Don't==", "==Don't== show it!"], 'imperative (recipes)'),
    { titulo: 'Put the recipe in order', tipo: 'Order', onomatopeia: 'POW!',
      passos: [['✋', 'Put the steps in order.', 'Coloque os passos da receita em ordem (arraste ou use as setas).']],
      dicas: ['Look at clue A: 1, 2, 3.', 'First ==mix==, then ==add==, then ==cook==, finally ==eat==.'],
      partes: [{ tipo: 'ordenar', itens: ['Mix the eggs and the milk.', 'Add the flour.', 'Cook in a hot pan.', 'Eat with honey!'], embaralhar: [2, 0, 3, 1] }],
      solucao: 'Mix → Add → Cook → Eat',
      etiquetas: [{ codigo: 'EF07LI24-JO', foco: 'imperative (recipes)' }] },
  ], ['EF07LI09', 'EF07LI24-JO', 'EF07LI24-JO'], ['To make a sandwich, ', 'escrever uma receita simples com imperativos.', 'To make a sandwich, take two slices of bread and add cheese.', 'imperative (recipes)']);
  c(3, "Hi, detective! Someone took Grandma Nina's [[recipe|receita]]. Who?", [
    bCaderno_('A', 'A · Note', 'In the kitchen', ['The thief has flour on his hands and loves sweet food.']),
    bFichas_([['tom', 'OTTO', ['hands: clean', 'loves salty food']], ['pedro', 'PEDRO', ['hands: flour', 'loves sweet food']], ['ben', 'BEN', ['hands: flour', 'loves salty food']]]),
    bAudio_('nina', 'Grandma Nina', 'My grandson loves pancakes. He wants to cook them for his friends!'),
  ], [
    bQuem_('Who took the recipe?', 'Click the person.', 'Clique em quem pegou a receita.',
      [{ personagem: 'tom', texto: 'OTTO' }, { personagem: 'pedro', texto: 'PEDRO' }, { personagem: 'ben', texto: 'BEN' }], 1,
      { 0: "Otto's hands are clean.", 2: 'Ben loves salty food.' }, ['==Flour on hands== + ==sweet food==.', 'Check clue B.'], 'It was **Pedro**!'),
    bOuvirPista_("Nina's message", [['Who loves pancakes?', ["Nina's grandson", 'Otto', 'Ben'], 0], ['He wants to cook for…', ['his friends', 'his teacher', 'his dog'], 0]],
      ['Listen for ==grandson== and ==friends==.', 'Nina: "He wants to cook them for his ==friends=="'], 'compreensão oral'),
    bBlocos_('Recipe and food', 'Complete the sentences.', 'imperativo · he + verbo com -S.', [
      ['', '___ two eggs.', ['Use', 'Uses', 'Using'], ['Use'], { uses: 'Recipe → USE.' }],
      ['', '___ the pancakes in a hot pan.', ['Cook', 'Cooks', 'Cooking'], ['Cook'], { cooks: 'Recipe → COOK.' }],
      ['', 'Pedro ___ sweet food.', ['loves', 'love', 'loving'], ['loves'], { love: 'Pedro = he → LOVES.' }],
    ], ['receita: ==Use==, ==Cook== · he ==loves==', 'Pedro = he → ==loves=='], 'imperative (recipes)'),
    bVF_([['Pedro has flour on his hands.', true], ['Otto loves sweet food.', false], ['Ben has flour on his hands.', true], ['The recipe has five eggs.', false]],
      ['Check clue B.', 'Otto loves ==salty== food.'], 'food'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI24-JO', 'EF07LI24-JO'], ['My family recipe: ', 'escrever uma receita da sua família em 3 passos.', 'My family recipe: mix the rice and the beans. Add salt. Eat!', 'imperative (recipes)']);

  c = m7('market', '2026-04', 'APR·2', 'The Market List');
  c(1, 'Hi, detective! We are at the [[market|feira/mercado]]. How many? How much?', [], [
    bFiguras_([['🍎', ['apples', 'water'], 0], ['💧', ['bananas', 'water'], 1], ['🍞', ['bread', 'eggs'], 0], ['🧀', ['carrots', 'cheese'], 1]],
      ['==apples== = maçãs · ==water== = água', '==bread== = pão · ==cheese== = queijo'], 'food'),
    bOuvir_([['We need some apples.', ['🍎', '🥛'], 0], ['How much milk do we need?', ['🍌', '🥛'], 1]],
      ['==apples== = 🍎 · ==milk== = 🥛', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Many or much?', 'Choose MANY or MUCH.', 'MANY = coisas que contamos (apples) · MUCH = coisas que não contamos (water).', [
      ['🍎', 'How ___ apples?', ['many', 'much'], ['many'], { much: 'We count apples → MANY.' }],
      ['💧', 'How ___ water?', ['much', 'many'], ['much'], { many: "We don't count water → MUCH." }],
    ], ['==many== + contáveis · ==much== + incontáveis', 'How ==many== apples? How ==much== water?'], 'countable and uncountable (much/many)'),
  ], ['EF07LI24-JO', 'EF07LI04', 'EF07LI25-JO'], ['I need some ', 'escrever uma lista de compras curta.', 'I need some apples and a little milk.', 'countable and uncountable']);
  c(2, 'Hi, detective! Grandma Nina has a [[shopping list|lista de compras]]. Read the clues!', [
    { id: 'A', aba: 'A · Shopping list', blocos: [{ tipo: 'itens', itens: [['🍎', '6 apples'], ['🥛', '2 liters of milk'], ['🍞', 'some bread'], ['🧀', 'a little cheese']] }] },
    bMsg_('nina', 'Grandma Nina', 'We need many apples for the pie, but not much cheese.'),
    bAudio_('pedro', 'Pedro', "There aren't any apples today! But there is some milk."),
  ], [
    bLerOuvir_([['How many apples?', ['6', '2', '10'], 0], ['Are there apples at the market?', ["No, there aren't.", 'Yes, there are.', 'Yes, there is.'], 0]],
      ['List: ==6 apples==', 'Pedro: "There ==aren\'t any== apples"'], 'localizar informação'),
    bBlocos_('Many, much or some?', 'Complete the sentences.', 'many (contáveis) · much (incontáveis) · some (alguns/um pouco).', [
      ['🍎', 'How ___ apples do we need?', ['many', 'much', 'any'], ['many'], { much: 'We count apples → MANY.' }],
      ['🥛', 'How ___ milk do we need?', ['much', 'many', 'any'], ['much'], { many: "We don't count milk → MUCH." }],
      ['🍞', 'There is ___ bread.', ['some', 'many', 'a'], ['some'], { many: "We don't count bread → SOME." }],
    ], ['==many== apples · ==much== milk · ==some== bread', 'milk = incontável → ==much=='], 'countable and uncountable (much/many)'),
    { titulo: 'Count it or not?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: o que contamos (COUNTABLE) e o que não contamos (UNCOUNTABLE).']],
      dicas: ['You can say ==two apples==, but not "two milks".', 'Liquids like ==milk== and ==water== are uncountable.'],
      partes: [{ tipo: 'separar', caixas: ['COUNTABLE (many)', 'UNCOUNTABLE (much)'], itens: [
        { texto: 'apple', resposta: 0 }, { texto: 'milk', resposta: 1 }, { texto: 'egg', resposta: 0 },
        { texto: 'water', resposta: 1 }, { texto: 'banana', resposta: 0 }, { texto: 'cheese', resposta: 1 }] }],
      solucao: '**Countable**: apple, egg, banana · **Uncountable**: milk, water, cheese',
      etiquetas: [{ codigo: 'EF07LI25-JO', foco: 'countable and uncountable' }] },
  ], ['EF07LI09', 'EF07LI25-JO', 'EF07LI25-JO'], ['For my party, I need ', 'escrever o que precisa comprar para uma festa (many/much/some).', 'For my party, I need many balloons and some juice.', 'countable and uncountable']);
  c(3, "Hi, detective! There are three shopping bags. Which one is [[Grandma Nina's|da vó Nina]]?", [
    bCaderno_('A', 'A · Note', 'From Pedro', ["Grandma's bag has a lot of fruit, but there isn't any milk in it."]),
    { id: 'B', aba: 'B · Bags', blocos: [{ tipo: 'itens', itens: [['🛍️', 'Bag 1: 5 apples, 3 bananas'], ['🛍️', 'Bag 2: milk, cheese, bread'], ['🛍️', 'Bag 3: 2 apples, milk']] }] },
    bAudio_('pedro', 'Pedro', "Grandma doesn't drink milk. She wants a lot of fruit for her pie."),
  ], [
    bQuem_("Which is Nina's bag?", 'Click the bag.', 'Clique na sacola da vó Nina.',
      [{ emoji: '🛍️', texto: 'Bag 1' }, { emoji: '🛍️', texto: 'Bag 2' }, { emoji: '🛍️', texto: 'Bag 3' }], 0,
      { 1: "Bag 2 has milk and no fruit.", 2: 'Bag 3 has milk.' }, ['==A lot of fruit== + ==no milk==.', 'Check clue B.'], "It's **Bag 1**!", 'figuras'),
    bOuvirPista_("Pedro's message", [['Does Nina drink milk?', ["No, she doesn't.", 'Yes, she does.', "No, she isn't."], 0], ['She wants a lot of…', ['fruit', 'cheese', 'bread'], 0]],
      ['Listen for ==milk== and ==fruit==.', 'Pedro: "She wants a lot of ==fruit=="'], 'compreensão oral'),
    bBlocos_('How many? How much?', 'Complete the sentences.', 'many · much · any · a little.', [
      ['', 'Bag 1 has ___ fruits.', ['many', 'much', 'any'], ['many'], { much: 'We count fruits → MANY.' }],
      ['', 'Bag 3 has a little ___.', ['milk', 'apples', 'bananas'], ['milk'], { apples: 'A LITTLE + uncountable → MILK.' }],
      ['', "There isn't ___ milk in Bag 1.", ['any', 'many', 'some'], ['any'], { some: "Negative → ANY." }],
    ], ['==many== + contáveis · negativa → ==any==', "There isn't ==any== milk."], 'countable and uncountable (much/many)'),
    bVF_([['Bag 1 has bananas.', true], ['Bag 2 has apples.', false], ['Nina wants a lot of fruit.', true], ['Nina drinks a lot of milk.', false]],
      ['Check clues B and C.', 'Bag 2 has ==milk, cheese, bread==.'], 'food'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI25-JO', 'EF07LI24-JO'], ['In my fridge, there is ', 'contar o que tem na sua geladeira (some/any).', "In my fridge, there is some milk, but there aren't any eggs.", 'countable and uncountable']);

  // ======================================================== JUNHO · past of verb to be, in/on/at, pronomes sujeito e objeto
  c = m7('a7', '2026-06', 'JUN·1', 'The Old Photo Album');
  c(1, "Hi, detective! Let's look at Grandma Nina's old [[photos|fotos]]!", [], [
    bFiguras_([['😀', ['happy', 'sad'], 0], ['😴', ['hungry', 'tired'], 1], ['🥶', ['hot', 'cold'], 1], ['😨', ['scared', 'happy'], 0]],
      ['==happy== = feliz · ==tired== = cansado', '==cold== = com frio · ==scared== = com medo'], 'past of verb to be (vocabulário)'),
    bOuvir_([['I was happy yesterday.', ['😀', '😢'], 0], ['They were cold.', ['🥵', '🥶'], 1]],
      ['==happy== = 😀 · ==cold== = 🥶', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Was or were?', 'Choose WAS or WERE.', 'I/he/she → WAS · we/you/they → WERE.', [
      ['😴', 'Yesterday I ___ tired.', ['was', 'were'], ['was'], { were: 'With I → WAS.' }],
      ['🏠', 'They ___ at home.', ['were', 'was'], ['were'], { was: 'With THEY → WERE.' }],
    ], ['I/he/she ==was== · they ==were==', 'They ==were== at home.'], 'past of verb to be'),
  ], ['EF07LI15', 'EF07LI04', 'EF07LI15'], ['Yesterday I was ', 'dizer como você estava ontem.', 'Yesterday I was tired, but I was happy.', 'past of verb to be']);
  c(2, "Hi, detective! Pedro found Grandma Nina's [[photo album|álbum de fotos]]. Read the clues!", [
    { id: 'A', aba: 'A · Album', blocos: [{ tipo: 'itens', itens: [['📷', '1960 — Nina and Otto were at the beach.'], ['📷', '1965 — Nina was a teacher.'], ['📷', '1970 — The children were very small.']] }] },
    bMsg_('pedro', 'Pedro', "This is my grandma's album. In 1965 she was a teacher. She wasn't a pilot then."),
    bAudio_('nina', 'Grandma Nina', 'We were very happy in 1960. The beach was beautiful, but the water was cold!'),
  ], [
    bLerOuvir_([['What was Nina in 1965?', ['a teacher', 'a pilot', 'a doctor'], 0], ['How was the water?', ['cold', 'hot', 'dirty'], 0]],
      ['Album: 1965 — Nina was a ==teacher==', 'Nina: "the water was ==cold=="'], 'localizar informação'),
    bBlocos_("Was, were or wasn't?", 'Complete the sentences.', "he/she → was/wasn't · they → were/weren't.", [
      ['', 'In 1965, Nina ___ a teacher.', ['was', 'were', 'is'], ['was'], { were: 'Nina = she → WAS.' }],
      ['', 'Nina and Otto ___ at the beach.', ['were', 'was', 'are'], ['were'], { was: 'Nina and Otto = they → WERE.' }],
      ['', 'She ___ a pilot in 1965.', [WAS, WERE, "isn't"], [WAS], { "weren't": "She → WASN'T." }],
    ], ["she ==was / wasn't== · they ==were==", 'Nina and Otto → ==were=='], 'past of verb to be'),
    bBlocos_('In, on or at?', 'Choose IN, ON or AT.', 'in + ano · on + dia · at + hora.', [
      ['', 'They were at the beach ___ 1960.', ['in', 'on', 'at'], ['in'], { on: 'Years → IN.', at: 'Years → IN.' }],
      ['', 'The party was ___ Saturday.', ['on', 'in', 'at'], ['on'], { in: 'Days → ON.', at: 'Days → ON.' }],
      ['', 'The class was ___ 8 a.m.', ['at', 'on', 'in'], ['at'], { on: 'Times → AT.', in: 'Times → AT.' }],
    ], ['==in== 1960 · ==on== Saturday · ==at== 8 a.m.', 'Hora → ==at=='], 'preposições in/on/at'),
  ], ['EF07LI09', 'EF07LI15', 'EF07LI15'], ['When I was five, I was ', 'contar como você era aos 5 anos.', 'When I was five, I was very small and happy.', 'past of verb to be']);
  c(3, "Hi, detective! The time machine [[changed|mudou]] one photo caption. Which one is wrong?", [
    bCaderno_('A', 'A · Note', 'Time machine alert', ['One caption in the album is wrong. Find it!']),
    { id: 'B', aba: 'B · Album', blocos: [{ tipo: 'itens', itens: [['📷', 'Photo A — 1960: Nina and Otto were at the beach.'], ['📷', 'Photo B — 1965: Nina was a pilot.'], ['📷', 'Photo C — 1970: The children were small.']] }] },
    bAudio_('pedro', 'Pedro', 'In 1965, Grandma was a teacher at a school in Joinville.'),
  ], [
    bQuem_('Which caption is wrong?', 'Click the photo.', 'Clique na foto com a legenda errada.',
      [{ emoji: '📷', texto: 'Photo A' }, { emoji: '📷', texto: 'Photo B' }, { emoji: '📷', texto: 'Photo C' }], 1,
      { 0: 'Nina and Otto were at the beach in 1960. That is right.', 2: 'The children were small in 1970. That is right.' }, ['Listen to Pedro (clue C).', 'What was Nina in ==1965==?'], '**Photo B** is wrong: Nina was a teacher in 1965.', 'figuras'),
    bOuvirPista_("Pedro's message", [['What was Nina in 1965?', ['a teacher', 'a pilot', 'a singer'], 0], ['Where was her school?', ['in Joinville', 'in Rio', 'in Lisbon'], 0]],
      ['Listen for ==1965== and a city.', 'Pedro: "a school in ==Joinville=="'], 'compreensão oral'),
    bBlocos_('Fix the album', 'Complete the sentences.', "was · were · wasn't.", [
      ['', 'In 1965, Nina ___ a teacher.', ['was', 'were', 'is'], ['was'], { were: 'Nina = she → WAS.' }],
      ['', 'The children ___ small in 1970.', ['were', 'was', 'are'], ['were'], { was: 'The children = they → WERE.' }],
      ['', 'Nina ___ a pilot in 1965.', [WAS, WERE, "isn't"], [WAS], { "weren't": "Nina = she → WASN'T." }],
    ], ["she ==was / wasn't== · they ==were==", "Nina ==wasn't== a pilot in 1965."], 'past of verb to be'),
    bVF_([['Nina was a teacher in 1965.', true], ['Photo B is correct.', false], ['The children were small in 1970.', true], ['Nina and Otto were at school in 1960.', false]],
      ['Check clues B and C.', 'In 1960 they were at the ==beach==.'], 'past of verb to be'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI15', 'EF07LI15'], ['In 2020, I was ', 'contar onde você estava e como era em um ano do passado.', 'In 2020, I was eight. I was at home a lot.', 'past of verb to be']);

  c = m7('letter', '2026-06', 'JUN·2', 'The Lost Letter');
  c(1, 'Hi, detective! We found an old [[letter|carta]]. Let\'s learn some words first!', [], [
    bFiguras_([['👧', ['her', 'him'], 0], ['👦', ['her', 'him'], 1], ['👧👦', ['them', 'it'], 0], ['📦', ['them', 'it'], 1]],
      ['girl → ==her== · boy → ==him==', 'two people → ==them== · a thing → ==it=='], 'object pronouns'),
    bOuvir_([['Give it to him.', ['👦', '👧'], 0], ['Call them now.', ['👦', '👧👦'], 1]],
      ['==him== = 👦 · ==them== = 👧👦', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('He or him?', 'Complete the sentence.', 'Antes do verbo: HE/SHE · depois do verbo: HIM/HER.', [
      ['👧', 'I love ___. (Nina)', ['her', 'she'], ['her'], { she: 'After the verb → HER.' }],
      ['👦', '___ is my friend. (Pedro)', ['He', 'Him'], ['He'], { him: 'Before the verb → HE.' }],
    ], ['sujeito: ==he/she== · objeto: ==him/her==', 'I love ==her==.'], 'subject and object pronouns'),
  ], ['EF07LI19', 'EF07LI04', 'EF07LI19'], ['My best friend is ', 'falar de um amigo usando he/she e him/her.', 'My best friend is Ana. I call her every day.', 'subject and object pronouns']);
  c(2, 'Hi, detective! Pedro found an old [[letter|carta]] in a box. Read the clues!', [
    bCaderno_('A', 'A · Letter', 'May 3rd, 1955', ['Dear Otto, I miss you. Please write to me on Monday. Love, Nina']),
    bMsg_('pedro', 'Pedro', 'I found a letter! Grandma wrote it to Grandpa Otto.'),
    bAudio_('nina', 'Grandma Nina', 'Yes! I wrote it to him in 1955. He was in Lisbon, and I was in Joinville.'),
  ], [
    bLerOuvir_([['Who wrote the letter?', ['Nina', 'Otto', 'Pedro'], 0], ['Where was Otto?', ['in Lisbon', 'in Joinville', 'in Rio'], 0]],
      ['Letter: "Love, ==Nina=="', 'Nina: "He was in ==Lisbon=="'], 'localizar informação'),
    bBlocos_('Him, her or it?', 'Complete the sentences.', 'Depois do verbo: him/her/it.', [
      ['', 'Nina wrote the letter to ___.', ['him', 'he', 'his'], ['him'], { he: 'After TO → HIM.' }],
      ['', 'Otto loved ___.', ['her', 'she', 'hers'], ['her'], { she: 'After the verb → HER.' }],
      ['', 'Pedro found ___ in a box.', ['it', 'its', 'them'], ['it'], { them: 'One letter → IT.' }],
    ], ['objeto: ==him== · ==her== · ==it==', 'to ==him=='], 'subject and object pronouns'),
    bBlocos_('He or they?', 'Complete the sentences.', 'Antes do verbo: he/she/they.', [
      ['', '___ was in Lisbon. (Otto)', ['He', 'Him', 'His'], ['He'], { him: 'Before the verb → HE.' }],
      ['', '___ were far from each other. (Nina and Otto)', ['They', 'Them', 'Their'], ['They'], { them: 'Before the verb → THEY.' }],
    ], ['sujeito: ==he== · ==they==', '==They== were far.'], 'subject and object pronouns'),
  ], ['EF07LI09', 'EF07LI19', 'EF07LI19'], ['Dear ', 'escrever o começo de uma carta para alguém.', 'Dear Ana, I miss you. Please call me on Sunday.', 'subject and object pronouns']);
  c(3, 'Hi, detective! An old letter has no name. Who [[sent|enviou]] it?', [
    bCaderno_('A', 'A · Letter', 'No name!', ['The letter was sent in May. The writer was in Joinville.']),
    bFichas_([['nina', 'NINA', ['May 1955: in Joinville']], ['tom', 'OTTO', ['May 1955: in Lisbon']], ['clock', 'CAPTAIN CLOCK', ['May 1955: in Paris']]]),
    bAudio_('pedro', 'Pedro', 'Grandpa Otto kept the letter. She sent it to him on May 3rd.'),
  ], [
    bQuem_('Who sent the letter?', 'Click the person.', 'Clique em quem enviou a carta.',
      [{ personagem: 'nina', texto: 'NINA' }, { personagem: 'tom', texto: 'OTTO' }, { personagem: 'clock', texto: 'CLOCK' }], 0,
      { 1: 'Otto was in Lisbon. He kept the letter.', 2: 'Captain Clock was in Paris.' }, ['The writer was ==in Joinville==.', 'Check clue B.'], 'It was **Nina**!'),
    bOuvirPista_("Pedro's message", [['She sent it on…', ['May 3rd', 'March 5th', 'May 30th'], 0], ['Who kept the letter?', ['Otto', 'Nina', 'Pedro'], 0]],
      ['Listen for a date and a name.', 'Pedro: "on ==May 3rd=="'], 'compreensão oral'),
    bBlocos_('Pronouns and prepositions', 'Complete the sentences.', 'him/it · in/on/at.', [
      ['', 'Nina sent it to ___.', ['him', 'he', 'his'], ['him'], { he: 'After TO → HIM.' }],
      ['', 'Otto kept ___.', ['it', 'them', 'its'], ['it'], { them: 'One letter → IT.' }],
      ['', 'She sent it ___ May 3rd.', ['on', 'in', 'at'], ['on'], { in: 'Dates → ON.', at: 'Dates → ON.' }],
    ], ['==him== · ==it== · ==on== + data', 'on ==May 3rd=='], 'subject and object pronouns'),
    bVF_([['Nina was in Joinville.', true], ['Otto was in Paris.', false], ['The letter was sent in May.', true], ['Pedro sent the letter.', false]],
      ['Check clue B.', 'Otto was in ==Lisbon==.'], 'past of verb to be'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI19', 'EF07LI15'], ['Last year, I sent ', 'contar sobre uma mensagem ou carta que você mandou.', 'Last year, I sent a message to my cousin. I miss her.', 'subject and object pronouns']);

  // ======================================================== AGOSTO · simple past regular, biografias
  c = m7('a7', '2026-08', 'AUG·1', "The Inventor's Diary");
  c(1, "Hi, detective! We found the [[inventor's|do inventor]] diary. Let's learn the past!", [], [
    bFiguras_([['🚶', ['walked', 'played'], 0], ['🎮', ['cooked', 'played'], 1], ['📞', ['called', 'watched'], 0], ['📺', ['walked', 'watched'], 1]],
      ['==walked== = caminhou · ==played== = jogou', '==called== = ligou · ==watched== = assistiu'], 'simple past regular'),
    bOuvir_([['I watched TV yesterday.', ['📺', '🎮'], 0], ['She cooked dinner.', ['🚶', '🍳'], 1]],
      ['==watched== = 📺 · ==cooked== = 🍳', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Add -ed', 'Complete in the past.', 'Verbos regulares no passado: + ED (play → played).', [
      ['⚽', 'Yesterday I ___ soccer.', ['played', 'play'], ['played'], { play: 'Yesterday → PLAYED.' }],
      ['📺', 'Last night she ___ TV.', ['watched', 'watch'], ['watched'], { watch: 'Last night → WATCHED.' }],
    ], ['passado regular: + ==ed==', 'Yesterday I ==played==.'], 'simple past regular'),
  ], ['EF07LI15', 'EF07LI04', 'EF07LI15'], ['Yesterday I ', 'contar o que fez ontem (verbos com -ed).', 'Yesterday I played soccer and watched TV.', 'simple past regular']);
  c(2, "Hi, detective! This is the diary of the [[inventor|inventor]] of the time machine. Read it!", [
    bCaderno_('A', 'A · Diary', '1920', ['Monday: I worked on my machine.', 'Tuesday: I painted it blue.', 'Wednesday: I tested it!']),
    bMsg_('clock', 'Captain Clock', 'This is the diary of Professor Weber. He invented the time machine!'),
    bAudio_('pedro', 'Pedro', 'The professor started the machine on Wednesday, and it worked!'),
  ], [
    bLerOuvir_([['On Tuesday, the professor…', ['painted the machine', 'tested the machine', 'slept'], 0], ['Did the machine work?', ['Yes, it did.', "No, it didn't.", 'Yes, it is.'], 0]],
      ['Diary: Tuesday — I ==painted== it blue.', 'Pedro: "and it ==worked=="'], 'localizar informação'),
    bBlocos_('Add -ed', 'Complete the sentences.', 'Verbos regulares no passado: + ED.', [
      ['', 'He ___ on his machine.', ['worked', 'work', 'working'], ['worked'], { work: 'Past → WORKED.' }],
      ['', 'He ___ it blue.', ['painted', 'paint', 'paints'], ['painted'], { paint: 'Past → PAINTED.' }],
      ['', 'He ___ it on Wednesday.', ['tested', 'test', 'tests'], ['tested'], { test: 'Past → TESTED.' }],
    ], ['passado: + ==ed==', 'He ==painted== it.'], 'simple past regular'),
    { titulo: '-ed, -d or -ied?', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['👀', 'Look at the examples.', 'Observe: walk → walked · live → lived · study → studied.'], ['✋', 'Drag the verbs to the boxes.', 'Separe os verbos pela forma de escrever o passado.']],
      dicas: ['Verb ends in ==e== → add only ==d== (live → lived).', 'Consonant + ==y== → ==ied== (study → studied).'],
      partes: [
        { tipo: 'exemplos', itens: ['walk → walk==ed==', 'live → live==d==', 'study → stud==ied=='] },
        { tipo: 'separar', caixas: ['+ ed', '+ d', 'y → ied'], itens: [
          { texto: 'watch', resposta: 0 }, { texto: 'like', resposta: 1 }, { texto: 'cry', resposta: 2 },
          { texto: 'play', resposta: 0 }, { texto: 'dance', resposta: 1 }, { texto: 'study', resposta: 2 }] },
      ],
      solucao: '**+ed**: watched, played · **+d**: liked, danced · **ied**: cried, studied',
      etiquetas: [{ codigo: 'EF07LI15', foco: 'simple past regular (spelling)' }] },
  ], ['EF07LI09', 'EF07LI15', 'EF07LI15'], ['Last weekend I ', 'contar seu fim de semana com verbos regulares.', 'Last weekend I visited my grandmother and cooked a cake.', 'simple past regular']);
  c(3, 'Hi, detective! Someone [[used|usou]] the time machine last night. Who?', [
    bCaderno_('A', 'A · Note', 'Lab security', ['Last night someone used the machine. The person arrived late and smelled of paint.']),
    bFichas_([['clock', 'CAPTAIN CLOCK', ['painted the lab yesterday', 'arrived late']], ['pedro', 'PEDRO', ['played soccer yesterday', 'arrived late']], ['nina', 'NINA', ['painted the lab yesterday', 'arrived early']]]),
    bAudio_('paulo', 'Mr. Paulo (guard)', "Someone arrived at ten o'clock last night. He wanted to travel to 1920."),
  ], [
    bQuem_('Who used the machine?', 'Click the person.', 'Clique em quem usou a máquina.',
      [{ personagem: 'clock', texto: 'CLOCK' }, { personagem: 'pedro', texto: 'PEDRO' }, { personagem: 'nina', texto: 'NINA' }], 0,
      { 1: 'Pedro played soccer. He did not paint.', 2: 'Nina arrived early.' }, ['==Arrived late== + ==paint==.', 'Check clue B.'], 'It was **Captain Clock**!'),
    bOuvirPista_("The guard's message", [['When did the person arrive?', ["at ten o'clock last night", 'at ten this morning', 'at noon'], 0], ['He wanted to travel to…', ['1920', '2050', '1980'], 0]],
      ['Listen for a time and a year.', 'Guard: "He wanted to travel to ==1920=="'], 'compreensão oral'),
    bBlocos_('Add -ed', 'Complete the sentences.', 'Passado regular: + ED.', [
      ['', 'Captain Clock ___ the lab.', ['painted', 'paint', 'paints'], ['painted'], { paint: 'Past → PAINTED.' }],
      ['', 'He ___ late.', ['arrived', 'arrive', 'arrives'], ['arrived'], { arrive: 'Past → ARRIVED.' }],
      ['', 'He ___ to travel to 1920.', ['wanted', 'want', 'wants'], ['wanted'], { want: 'Past → WANTED.' }],
    ], ['passado: + ==ed== / + ==d==', 'arrive → ==arrived=='], 'simple past regular'),
    bVF_([['Clock painted the lab.', true], ['Nina arrived late.', false], ['Pedro played soccer.', true], ['The person wanted to travel to 2050.', false]],
      ['Check clues B and C.', 'Nina arrived ==early==.'], 'simple past regular'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI15', 'EF07LI15'], ['Last night I ', 'contar o que você fez ontem à noite.', 'Last night I watched a movie and talked to my mother.', 'simple past regular']);

  c = m7('bio', '2026-08', 'AUG·2', 'A Short Biography');
  c(1, "Hi, detective! Let's write Grandpa Otto's [[biography|biografia]].", [], [
    bFiguras_([['🎓', ['graduated', 'danced'], 0], ['💍', ['moved', 'married'], 1], ['🏠', ['moved', 'studied'], 0], ['✈️', ['cooked', 'traveled'], 1]],
      ['==graduated== = formou-se · ==married== = casou', '==moved== = mudou-se · ==traveled== = viajou'], 'simple past (biografia)'),
    bOuvir_([['She traveled to Paris in 1960.', ['1960', '1990'], 0, 'pilulas'], ['He moved to Joinville.', ['✈️', '🏠'], 1]],
      ['==1960== · ==moved== = mudou-se 🏠', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Add -ed', 'Complete in the past.', 'Passado regular: + ED (travel → traveled).', [
      ['✈️', 'In 1950, she ___ to Rio.', ['traveled', 'travel'], ['traveled'], { travel: 'In 1950 → TRAVELED.' }],
      ['💍', 'They ___ in 1955.', ['married', 'marry'], ['married'], { marry: 'In 1955 → MARRIED.' }],
    ], ['passado: ==traveled==, ==married==', 'marry → ==married=='], 'simple past (biografia)'),
  ], ['EF07LI15', 'EF07LI04', 'EF07LI15'], ['I was born in ', 'começar a sua biografia (ano e cidade).', 'I was born in 2014 in Joinville.', 'simple past (biografia)']);
  c(2, "Hi, detective! Here is Grandpa Otto's [[timeline|linha do tempo]]. Read the clues!", [
    { id: 'A', aba: 'A · Timeline', blocos: [{ tipo: 'linha', itens: [['1925', 'born in Lisbon'], ['1950', 'moved to Brazil'], ['1955', 'married Nina'], ['1960', 'opened a bakery']] }] },
    bMsg_('pedro', 'Pedro', 'My grandpa Otto lived in Portugal. He moved to Brazil in 1950.'),
    bAudio_('nina', 'Grandma Nina', 'Otto opened a bakery in 1960. He baked the best bread in Joinville!'),
  ], [
    bLerOuvir_([['When did Otto move to Brazil?', ['in 1950', 'in 1925', 'in 1960'], 0], ['What did Otto open?', ['a bakery', 'a school', 'a hotel'], 0]],
      ['Pedro: "He moved to Brazil in ==1950=="', 'Nina: "Otto opened a ==bakery=="'], 'localizar informação'),
    bBlocos_('Add -ed', 'Complete the sentences.', 'Passado regular: + ED / + D.', [
      ['', 'Otto ___ in Portugal.', ['lived', 'live', 'lives'], ['lived'], { live: 'Past → LIVED.' }],
      ['', 'He ___ to Brazil in 1950.', ['moved', 'move', 'moves'], ['moved'], { move: 'Past → MOVED.' }],
      ['', 'He ___ Nina in 1955.', ['married', 'marry', 'marries'], ['married'], { marry: 'Past → MARRIED.' }],
    ], ['passado: ==lived==, ==moved==, ==married==', 'marry → ==married=='], 'simple past (biografia)'),
    { titulo: "Otto's life in order", tipo: 'Order', onomatopeia: 'POW!',
      passos: [['✋', 'Put the sentences in order.', 'Coloque a vida do Otto em ordem (veja a linha do tempo).']],
      dicas: ['Look at clue A: 1925, 1950, 1955, 1960.', 'Born → moved → married → bakery.'],
      partes: [{ tipo: 'ordenar', itens: ['Otto was born in Lisbon.', 'He moved to Brazil.', 'He married Nina.', 'He opened a bakery.'], embaralhar: [2, 0, 3, 1] }],
      solucao: 'Born (1925) → moved (1950) → married (1955) → bakery (1960)',
      etiquetas: [{ codigo: 'EF07LI14', foco: 'simple past (biografia)' }] },
  ], ['EF07LI09', 'EF07LI15', 'EF07LI14'], ['My grandmother was born in ', 'escrever a biografia curta de alguém da família.', 'My grandmother was born in 1960. She moved to Joinville in 1980.', 'simple past (biografia)']);
  c(3, "Hi, detective! The time machine [[changed|mudou]] Otto's biography. Find the error!", [
    bCaderno_('A', 'A · Biography', "Otto Weber's biography", ['Otto Weber was born in 1925. He moved to Brazil in 1960. He married Nina in 1955.']),
    { id: 'B', aba: 'B · Documents', blocos: [{ tipo: 'itens', itens: [['📄', 'Passport: arrived in Brazil — 1950'], ['📄', 'Marriage: Nina and Otto — 1955'], ['📄', 'Bakery license — 1960']] }] },
    bAudio_('nina', 'Grandma Nina', 'Otto arrived in Brazil in 1950. We married five years later.'),
  ], [
    bQuem_('Which sentence is wrong?', 'Click the wrong sentence.', 'Clique na frase errada da biografia.',
      ['He moved to Brazil in 1960.', 'He married Nina in 1955.', 'He was born in 1925.'], 0,
      { 1: 'The marriage document says 1955. That is right.', 2: 'This is not in the documents, but it is not the error.' }, ['Compare the biography (A) with the documents (B).', 'Passport: arrived in ==1950=='], '"He moved to Brazil in **1960**" is wrong: it was **1950**.', 'lista'),
    bOuvirPista_("Nina's message", [['When did Otto arrive?', ['in 1950', 'in 1960', 'in 1955'], 0], ['When did they marry?', ['five years later', 'one year later', 'in 1950'], 0]],
      ['Listen for ==arrived== and ==later==.', 'Nina: "We married ==five years later=="'], 'compreensão oral'),
    bBlocos_('Fix the biography', 'Complete the sentences.', 'Passado regular: + ED / + D.', [
      ['', 'He ___ to Brazil in 1950.', ['moved', 'move', 'moves'], ['moved'], { move: 'Past → MOVED.' }],
      ['', 'He ___ a bakery in 1960.', ['opened', 'open', 'opens'], ['opened'], { open: 'Past → OPENED.' }],
      ['', 'They ___ in 1955.', ['married', 'marry', 'marries'], ['married'], { marry: 'Past → MARRIED.' }],
    ], ['passado: ==moved==, ==opened==, ==married==', 'He ==moved== in 1950.'], 'simple past (biografia)'),
    bVF_([['Otto arrived in Brazil in 1950.', true], ['Otto opened the bakery in 1950.', false], ['They married in 1955.', true], ['Otto moved to Brazil in 1960.', false]],
      ['Check clue B.', 'The bakery license is from ==1960==.'], 'simple past (biografia)'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI15', 'EF07LI14'], ['My hero ', 'escrever 2 frases sobre a vida de alguém que você admira.', 'My hero is my mother. She studied a lot and worked in a hospital.', 'simple past (biografia)']);

  // ======================================================== OUTUBRO (2º caso) · simple past irregular e conectores
  c = m7('trip', '2026-10', 'OCT·2', 'The School Trip Report');
  c(1, 'Hi, detective! The class went on a [[school trip|passeio da escola]]. Let\'s learn!', [], [
    bFiguras_([['🚌', ['went', 'go'], 0], ['🍔', ['eat', 'ate'], 1], ['👀', ['saw', 'see'], 0], ['📸', ['take', 'took'], 1]],
      ['go → ==went== · eat → ==ate==', 'see → ==saw== · take → ==took=='], 'simple past irregular'),
    bOuvir_([['We went to the museum.', ['🏛️', '🏖️'], 0], ['Then we ate pizza.', ['🍎', '🍕'], 1]],
      ['==museum== = 🏛️ · ==pizza== = 🍕', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Then or but?', 'Choose the connector.', 'THEN = depois · BUT = mas.', [
      ['🏛️', 'We went to the museum. ___, we ate pizza.', ['Then', 'But'], ['Then'], { but: 'One thing after the other → THEN.' }],
      ['😴', 'It was fun, ___ I was tired.', ['but', 'so'], ['but'], { so: 'Fun ≠ tired → BUT.' }],
    ], ['==then== = depois · ==but== = mas', 'fun, ==but== tired'], 'connectors'),
  ], ['EF07LI15', 'EF07LI04', 'EF07LI15'], ['Last year, my class went to ', 'contar um passeio da escola.', 'Last year, my class went to the zoo. We saw lions.', 'simple past irregular']);
  c(2, 'Hi, detective! Read the [[report|relatório]] about the school trip.', [
    bCaderno_('A', 'A · Report', 'Our trip to the Air Museum', ['First, we went to the museum. Then, we saw old planes. After that, we ate lunch. Finally, we took photos.']),
    bMsg_('sam', 'Sam', 'I loved the trip, but I lost my cap!'),
    bAudio_('clock', 'Captain Clock', 'The bus left at eight and came back at four.'),
  ], [
    bLerOuvir_([['What did they see?', ['old planes', 'old cars', 'animals'], 0], ['When did the bus leave?', ['at eight', 'at four', 'at noon'], 0]],
      ['Report: "we saw old ==planes=="', 'Clock: "The bus left at ==eight=="'], 'localizar informação'),
    bBlocos_('Irregular verbs', 'Complete in the past.', 'Verbos irregulares mudam: go → went.', [
      ['', 'We ___ to the museum.', ['went', 'go', 'goed'], ['went'], { goed: 'Irregular: go → WENT.' }],
      ['', 'We ___ old planes.', ['saw', 'see', 'seed'], ['saw'], { seed: 'Irregular: see → SAW.' }],
      ['', 'We ___ photos.', ['took', 'take', 'taked'], ['took'], { taked: 'Irregular: take → TOOK.' }],
    ], ['go → ==went== · see → ==saw== · take → ==took==', 'Irregular: não use -ed'], 'simple past irregular'),
    { titulo: 'The report in order', tipo: 'Order', onomatopeia: 'POW!',
      passos: [['✋', 'Put the report in order.', 'Use os conectores: First, Then, After that, Finally.']],
      dicas: ['==First== starts the story. ==Finally== ends it.', 'First → Then → After that → Finally.'],
      partes: [{ tipo: 'ordenar', itens: ['First, we went to the museum.', 'Then, we saw old planes.', 'After that, we ate lunch.', 'Finally, we took photos.'], embaralhar: [2, 0, 3, 1] }],
      solucao: 'First → Then → After that → Finally',
      etiquetas: [{ codigo: 'EF07LI15', foco: 'connectors' }] },
  ], ['EF07LI09', 'EF07LI15', 'EF07LI15'], ['First, I ', 'contar seu dia de ontem com First, Then e Finally.', 'First, I woke up. Then, I went to school. Finally, I slept.', 'connectors']);
  c(3, 'Hi, detective! Someone [[lost|perdeu]] a cap on the bus. Whose is it?', [
    bCaderno_('A', 'A · Note', 'Found on the bus', ['A cap on seat 12. The owner sat next to the window and took many photos.']),
    bFichas_([['sam', 'SAM', ['seat 12', 'took many photos']], ['ben', 'BEN', ['seat 12', "didn't take photos"]], ['mia', 'MIA', ['seat 3', 'took many photos']]]),
    bAudio_('clock', 'Captain Clock', 'Sam sat by the window. He took photos of the planes all day.'),
  ], [
    bQuem_('Whose cap is it?', 'Click the person.', 'Clique no dono do boné.',
      [{ personagem: 'sam', texto: 'SAM' }, { personagem: 'ben', texto: 'BEN' }, { personagem: 'mia', texto: 'MIA' }], 0,
      { 1: "Ben didn't take photos.", 2: 'Mia sat on seat 3.' }, ['==Seat 12== + ==many photos==.', 'Check clue B.'], "It's **Sam's** cap!"),
    bOuvirPista_("Clock's message", [['Where did Sam sit?', ['by the window', 'next to the driver', 'at the back'], 0], ['What did he photograph?', ['the planes', 'the bus', 'his friends'], 0]],
      ['Listen for ==window== and ==planes==.', 'Clock: "photos of the ==planes=="'], 'compreensão oral'),
    bBlocos_('Past and connectors', 'Complete the sentences.', 'irregulares: sit → sat, take → took · but = mas.', [
      ['', 'Sam ___ next to the window.', ['sat', 'sit', 'sitted'], ['sat'], { sitted: 'Irregular: sit → SAT.' }],
      ['', 'He ___ many photos.', ['took', 'take', 'taked'], ['took'], { taked: 'Irregular: take → TOOK.' }],
      ['', "Ben was on seat 12, ___ he didn't take photos.", ['but', 'so', 'then'], ['but'], { so: 'Contrast → BUT.' }],
    ], ['sit → ==sat== · take → ==took== · contraste → ==but==', 'Sam ==sat== by the window.'], 'simple past irregular'),
    bVF_([['Sam took photos.', true], ['Mia sat on seat 12.', false], ['The cap was on seat 12.', true], ['Ben took many photos.', false]],
      ['Check clue B.', 'Mia sat on seat ==3==.'], 'simple past irregular'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI15', 'EF07LI15'], ['On my best trip, ', 'contar uma viagem ou passeio com verbos irregulares.', 'On my best trip, I went to the beach and saw dolphins.', 'simple past irregular']);

  // ======================================================== NOVEMBRO (2º caso) · can / could
  c = m7('then', '2026-11', 'NOV·2', 'Then and Now');
  c(1, 'Hi, detective! What could people do [[then|antes]]? What can they do now?', [], [
    bFiguras_([['🎹', ['play the piano', 'swim'], 0], ['🏄', ['cook', 'surf'], 1], ['💃', ['dance', 'drive'], 0], ['🚗', ['fly', 'drive'], 1]],
      ['==play the piano== = tocar piano · ==surf== = surfar', '==dance== = dançar · ==drive== = dirigir'], 'can/could (vocabulário)'),
    bOuvir_([["In 1990, I couldn't use a computer.", ['💻', '🎹'], 0], ['Now I can surf.', ['🚗', '🏄'], 1]],
      ['==computer== = 💻 · ==surf== = 🏄', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_("Can or couldn't?", 'Complete the sentence.', "CAN = agora · COULDN'T = não conseguia (passado).", [
      ['👶🚶', 'Now my baby brother ___ walk.', ['can', 'could'], ['can'], { could: 'NOW → CAN.' }],
      ['👶', 'Last year he ___ walk.', [COULD, CAN], [COULD], { "can't": "Last year → COULDN'T." }],
    ], ["agora ==can== · passado ==couldn't==", "Last year he ==couldn't== walk."], 'can/could'),
  ], ['EF07LI20', 'EF07LI04', 'EF07LI20'], ['When I was a baby, I ', 'comparar o que você não conseguia fazer e o que consegue agora.', "When I was a baby, I couldn't talk. Now I can speak two languages!", 'can/could']);
  c(2, 'Hi, detective! Life in 1950 and now. Read the clues!', [
    { id: 'A', aba: 'A · Then & now', blocos: [{ tipo: 'itens', itens: [['📞', '1950: people could use phones only at home'], ['📱', '2026: we can use phones everywhere'], ['✈️', '1950: few people could travel by plane']] }] },
    bMsg_('pedro', 'Pedro', "Grandma Nina could fly a plane in 1950, but she couldn't drive a car!"),
    bAudio_('nina', 'Grandma Nina', "Now I can't fly a plane, but I can use a smartphone!"),
  ], [
    bLerOuvir_([['What could Nina do in 1950?', ['fly a plane', 'drive a car', 'use a smartphone'], 0], ['What can Nina do now?', ['use a smartphone', 'fly a plane', 'drive a car'], 0]],
      ['Pedro: "Nina ==could fly== a plane"', 'Nina: "I ==can use== a smartphone"'], 'localizar informação'),
    bBlocos_("Can or could?", 'Complete the sentences.', "COULD/COULDN'T = passado · CAN = agora.", [
      ['', 'In 1950, Nina ___ fly a plane.', ['could', 'can', 'cans'], ['could'], { can: 'In 1950 → COULD.' }],
      ['', 'She ___ drive a car in 1950.', [COULD, CAN, 'could'], [COULD], { "can't": "In 1950 → COULDN'T." }],
      ['', 'Now she ___ use a smartphone.', ['can', 'could', CAN], ['can'], { could: 'NOW → CAN.' }],
    ], ['passado ==could== · agora ==can==', 'Now → ==can=='], 'can/could'),
    { titulo: 'Past or now?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: expressões do PASSADO (could) e de AGORA (can).']],
      dicas: ['==In 1950== and ==last century== → could.', '==Today== and ==right now== → can.'],
      partes: [{ tipo: 'separar', caixas: ['PAST → could', 'NOW → can'], itens: [
        { texto: 'in 1950', resposta: 0 }, { texto: 'today', resposta: 1 }, { texto: 'when I was five', resposta: 0 },
        { texto: 'these days', resposta: 1 }, { texto: 'last century', resposta: 0 }, { texto: 'right now', resposta: 1 }] }],
      solucao: '**Past**: in 1950, when I was five, last century · **Now**: today, these days, right now',
      etiquetas: [{ codigo: 'EF07LI20', foco: 'can × could (tempo)' }] },
  ], ['EF07LI09', 'EF07LI20', 'EF07LI20'], ['In 1950, people could ', 'comparar a vida em 1950 e hoje (could/can).', "In 1950, people couldn't use the internet. Now we can!", 'can/could']);
  c(3, 'Hi, detective! An old note says: "In 1950 I could fly a plane." Who [[wrote|escreveu]] it?', [
    bCaderno_('A', 'A · Note', 'Note from 1950', ["In 1950 I could fly a plane, but I couldn't swim."]),
    bFichas_([['nina', 'NINA', ['1950: could fly, could swim']], ['tom', 'OTTO', ["1950: could swim, couldn't fly"]], ['clock', 'CAPTAIN CLOCK', ["1950: could fly, couldn't swim"]]]),
    bAudio_('pedro', 'Pedro', 'Grandma could swim very well. Captain Clock was a pilot too, but he hated the water!'),
  ], [
    bQuem_('Who wrote the note?', 'Click the person.', 'Clique em quem escreveu o bilhete.',
      [{ personagem: 'nina', texto: 'NINA' }, { personagem: 'tom', texto: 'OTTO' }, { personagem: 'clock', texto: 'CLOCK' }], 2,
      { 0: 'Nina could swim.', 1: "Otto couldn't fly a plane." }, ['==Could fly== + ==couldn\'t swim==.', 'Check clue B.'], 'It was **Captain Clock**!'),
    bOuvirPista_("Pedro's message", [['Could Nina swim?', ['Yes, she could.', "No, she couldn't.", 'Yes, she can.'], 0], ['Who hated the water?', ['Captain Clock', 'Nina', 'Pedro'], 0]],
      ['Listen for ==swim== and ==hated==.', 'Pedro: "Grandma ==could swim== very well."'], 'compreensão oral'),
    bBlocos_("Could or couldn't?", 'Complete the sentences.', "COULD = conseguia · COULDN'T = não conseguia.", [
      ['', 'Captain Clock ___ fly a plane.', ['could', 'can', 'cans'], ['could'], { can: 'In 1950 → COULD.' }],
      ['', 'He ___ swim.', [COULD, CAN, "didn't"], [COULD], { "can't": "In 1950 → COULDN'T." }],
      ['', 'Otto ___ swim in 1950.', ['could', 'can', COULD], ['could'], { "couldn't": 'Clue B: Otto COULD swim.' }],
    ], ["==could== / ==couldn't==", "Clock ==couldn't== swim."], 'can/could'),
    bVF_([['Nina could swim.', true], ['Otto could fly a plane.', false], ['Clock could fly a plane.', true], ['Clock could swim.', false]],
      ['Check clue B.', "Otto ==couldn't== fly."], 'can/could'),
  ], ['EF07LI09', 'EF07LI04', 'EF07LI20', 'EF07LI20'], ['When my grandparents were young, they could ', 'contar o que seus avós podiam ou não podiam fazer quando jovens.', "When my grandparents were young, they could play in the street, but they couldn't watch TV.", 'can/could']);

  // ======================================================== Exercícios avulsos (só para o "Meu reforço")
  L.push.apply(L, avulsosLeitura_('7º', [
    { texto: 'Hi! I was at the beach yesterday. The water was cold, but the sun was hot.', pergunta: 'How was the water?', opcoes: ['cold', 'hot', 'dirty'], resposta: 0, codigo: 'EF07LI09' },
    { texto: 'BANANA BREAD: Mix 3 bananas, 2 eggs and 1 cup of flour. Bake for 40 minutes.', pergunta: 'What is this text?', opcoes: ['a recipe', 'a letter', 'a biography'], resposta: 0, codigo: 'EF07LI06', foco: 'gênero textual (global)' },
    { texto: 'Santos Dumont was born in 1873 in Brazil. He flew his famous plane in Paris in 1906.', pergunta: 'Where did he fly his famous plane?', opcoes: ['in Paris', 'in Brazil', 'in London'], resposta: 0, codigo: 'EF07LI09' },
    { texto: 'Last Saturday we went to the park. First we played soccer. Then we ate ice cream.', pergunta: 'What did they do first?', opcoes: ['played soccer', 'ate ice cream', 'went home'], resposta: 0, codigo: 'EF07LI09' },
    { texto: 'Pedro was very hungry. He ate two sandwiches and drank a big glass of juice.', pergunta: 'Why did Pedro eat a lot?', opcoes: ['He was hungry.', 'He was sad.', 'He was cold.'], resposta: 0, codigo: 'EF07LI06', foco: 'inferência' },
    { texto: 'Mia can speak three languages: Portuguese, English and Spanish. She studies French now.', pergunta: 'How many languages can Mia speak?', opcoes: ['three', 'two', 'four'], resposta: 0, codigo: 'EF07LI09' },
    { texto: "Ben's grandfather couldn't read when he was a child. He learned at 40!", pergunta: 'When did he learn to read?', opcoes: ['at 40', 'as a child', 'at 4'], resposta: 0, codigo: 'EF07LI09' },
    { texto: 'Welcome to Joinville Airport. Taxis are outside. Restaurants are on the second floor.', pergunta: 'Where are the restaurants?', opcoes: ['on the second floor', 'outside', 'near the taxis'], resposta: 0, codigo: 'EF07LI09' },
  ]));
  L.push.apply(L, avulsosBlocos_('7º', [
    { figura: '🏖️', frase: 'We ___ at the beach yesterday.', blocos: ['were', 'was', 'are'], resposta: 'were', codigo: 'EF07LI15', foco: 'past of verb to be', dica: 'we → ==were==' },
    { figura: '😴', frase: 'Ben ___ tired last night.', blocos: ['was', 'were', 'is'], resposta: 'was', codigo: 'EF07LI15', foco: 'past of verb to be', dica: 'he → ==was==' },
    { figura: '🏠', frase: 'They ___ at home on Sunday.', blocos: [WERE, WAS, "aren't"], resposta: WERE, codigo: 'EF07LI15', foco: 'past of verb to be', dica: "they → ==weren't==" },
    { figura: '👧', frase: 'I called ___ yesterday. (Mia)', blocos: ['her', 'she', 'hers'], resposta: 'her', codigo: 'EF07LI19', foco: 'object pronouns', dica: 'depois do verbo → ==her==' },
    { figura: '👦👧', frase: 'I saw ___ at the park. (Leo and Bia)', blocos: ['them', 'they', 'their'], resposta: 'them', codigo: 'EF07LI19', foco: 'object pronouns', dica: 'depois do verbo → ==them==' },
    { figura: '🍓', frase: 'How ___ strawberries do you want?', blocos: ['many', 'much', 'any'], resposta: 'many', codigo: 'EF07LI25-JO', foco: 'countable and uncountable', dica: 'contável → ==many==' },
    { figura: '🍯', frase: 'How ___ honey do we need?', blocos: ['much', 'many', 'a'], resposta: 'much', codigo: 'EF07LI25-JO', foco: 'countable and uncountable', dica: 'incontável → ==much==' },
    { figura: '🌍', frase: 'My cousin ___ in Canada.', blocos: ['lives', 'live', 'living'], resposta: 'lives', codigo: 'EF07LI06', foco: 'simple present', dica: 'he/she → verbo + ==s==' },
    { figura: '🌧️', frase: 'It was raining, ___ we stayed at home.', blocos: ['so', 'but', 'because'], resposta: 'so', codigo: 'EF07LI15', foco: 'connectors', dica: 'consequência → ==so== (então)' },
    { figura: '📅', frase: 'My birthday is ___ July.', blocos: ['in', 'on', 'at'], resposta: 'in', codigo: 'EF07LI15', foco: 'preposições in/on/at', dica: 'mês → ==in==' },
    { figura: '🕖', frase: 'The class starts ___ 7 a.m.', blocos: ['at', 'on', 'in'], resposta: 'at', codigo: 'EF07LI15', foco: 'preposições in/on/at', dica: 'hora → ==at==' },
    { figura: '✈️', frase: 'Last year we ___ to Rio.', blocos: ['flew', 'fly', 'flied'], resposta: 'flew', codigo: 'EF07LI15', foco: 'simple past irregular', dica: 'fly → ==flew==' },
    { figura: '📅', frase: 'The test was ___ Monday.', blocos: ['on', 'in', 'at'], resposta: 'on', codigo: 'EF07LI15', foco: 'preposições in/on/at', dica: 'dia da semana → ==on==' },
    { figura: '🎄', frase: 'We visited Grandma ___ 2024.', blocos: ['in', 'on', 'at'], resposta: 'in', codigo: 'EF07LI15', foco: 'preposições in/on/at', dica: 'ano → ==in==' },
    { figura: '🥶', frase: 'I wore a coat ___ it was cold.', blocos: ['because', 'but', 'then'], resposta: 'because', codigo: 'EF07LI15', foco: 'connectors', dica: 'motivo → ==because== (porque)' },
    { figura: '🍕', frase: 'I was hungry, ___ I ate a pizza.', blocos: ['so', 'but', 'before'], resposta: 'so', codigo: 'EF07LI15', foco: 'connectors', dica: 'consequência → ==so== (então)' },
  ]));

  return L;
}
