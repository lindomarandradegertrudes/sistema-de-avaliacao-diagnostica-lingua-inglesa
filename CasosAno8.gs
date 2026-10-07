/**
 * Banco do 8º ano (Etapa 4): 2 casos por período do Mapa 2026, cada um em 3 degraus,
 * e exercícios avulsos de leitura e gramática para o "Meu reforço". Saga: Future Lab 2050.
 */

function casosAno8_() {
  const L = [];
  const WONT = "won't", ISNT = "isn't", ARENT = "aren't", WASNT = "wasn't", WERENT = "weren't";
  function m8(sufixo, mes, numero, titulo) {
    return function (degrau, abertura, ev, travas, codigos, final) {
      L.push(aCaso_('8º', sufixo, mes, numero, titulo, degrau, abertura, ev, travas, codigos, final));
    };
  }

  // ======================================================== MARÇO · inferência e textos narrativos
  let c = m8('a8', '2026-03', 'MAR·1', 'The Mystery Story');
  c(1, 'Hi, scientist! A [[story|história]] arrived from 2050. How do the people feel?', [], [
    bFiguras_([['😱', ['scared', 'bored'], 0], ['😤', ['calm', 'angry'], 1], ['🤔', ['confused', 'sleepy'], 0], ['🥳', ['sad', 'excited'], 1]],
      ['==scared== = com medo · ==angry== = bravo', '==confused== = confuso · ==excited== = animado'], 'vocabulário: sentimentos (inferência)'),
    bOuvir_([['She opened the door and screamed.', ['😱', '😴'], 0], ['He smiled and jumped.', ['😢', '🥳'], 1]],
      ['==screamed== = gritou 😱', '==smiled and jumped== = sorriu e pulou 🥳'], 'compreensão oral'),
    bBlocos_('How do they feel?', 'Complete the sentence.', 'Use as pistas da frase para adivinhar (inferir).', [
      ['🕷️', 'Lucy saw a big spider. She was ___.', ['scared', 'happy'], ['scared'], { happy: 'A big spider… Is she happy? → SCARED.' }],
      ['🌧️', 'It was raining, so Ben took an ___.', ['umbrella', 'ice cream'], ['umbrella'], { 'ice cream': 'Rain → UMBRELLA.' }],
    ], ['pistas: ==spider== → medo · ==rain== → guarda-chuva', 'Leia a frase inteira antes de escolher.'], 'inferência'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI05'], ['I feel happy when ', 'contar quando você se sente feliz.', 'I feel happy when I play with my friends.', 'inferência']);
  c(2, 'Hi, scientist! A [[mystery story|história de mistério]] came from 2050. The last page is missing!', [
    bCaderno_('A', 'A · Story', 'The Last Light', ['It was midnight. Mia heard a noise in the lab. The lights went off. She took her phone and walked slowly to the door…']),
    bMsg_('lu', 'Dr. Lu', 'This story came from 2050. The last page is missing!'),
    bAudio_('ravi', 'Dr. Ravi', 'In 2050, robots turn off the lights at midnight to save energy.'),
  ], [
    bLerOuvir_([['When did the story happen?', ['at midnight', 'at noon', 'in the morning'], 0], ['Why do the lights go off at midnight?', ['to save energy', 'because of a storm', 'because Mia did it'], 0]],
      ['Story: "It was ==midnight=="', 'Ravi: "to ==save energy=="'], 'inferência'),
    { titulo: 'It says or we infer?', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['👀', 'Read story A again.', 'Leia a história (pista A).'], ['👆', 'Click SAYS or INFER.', 'SAYS = está escrito no texto. INFER = não está escrito, mas dá para deduzir pelas pistas.']],
      dicas: ['"It was midnight." is written in the text → ==SAYS==.', 'Mia walked ==slowly== in the dark → she was nervous (INFER).'],
      partes: [{ tipo: 'classificar', categorias: ['SAYS', 'INFER'], itens: [
        { texto: 'It was midnight.', resposta: 0 }, { texto: 'Mia was nervous.', resposta: 1 },
        { texto: 'The lights went off.', resposta: 0 }, { texto: 'A robot turned off the lights.', resposta: 1 }] }],
      solucao: '**Says**: midnight, the lights went off · **Infer**: Mia was nervous, a robot turned off the lights',
      etiquetas: [{ codigo: 'EF08LI05', foco: 'inferência' }] },
    bBlocos_('Story verbs', 'Complete in the past.', 'Revisão: passado regular e irregular.', [
      ['', 'Mia ___ a noise.', ['heard', 'hear', 'heared'], ['heard'], { heared: 'Irregular: hear → HEARD.' }],
      ['', 'The lights ___ off.', ['went', 'go', 'goed'], ['went'], { goed: 'Irregular: go → WENT.' }],
      ['', 'She ___ slowly to the door.', ['walked', 'walk', 'walks'], ['walked'], { walk: 'Past → WALKED.' }],
    ], ['hear → ==heard== · go → ==went==', 'walk → ==walked=='], 'narrativa: verbos no passado'),
  ], ['EF08LI05', 'EF08LI05', 'EF08LI06'], ['At midnight, ', 'escrever uma frase de suspense para uma história.', 'At midnight, I heard a strange noise in the kitchen.', 'narrativa']);
  c(3, 'Hi, scientist! How does the mystery story [[end|terminar]]? Find the clues!', [
    bCaderno_('A', 'A · Story', 'The Last Light', ['It was midnight. Mia heard a noise in the lab. The lights went off. She walked slowly to the door and saw a small light moving…']),
    { id: 'B', aba: 'B · Endings', blocos: [{ tipo: 'itens', itens: [['A', 'A cleaning robot was working in the lab.'], ['B', 'A ghost was in the lab.'], ['C', 'Mia was dreaming in her bed.']] }] },
    bAudio_('ravi', 'Dr. Ravi', 'In 2050, cleaning robots work at night, when the lights are off. They have a small light on their heads.'),
  ], [
    bQuem_('Which ending is right?', 'Click the ending.', 'Clique no final que combina com as pistas.',
      ['A: a cleaning robot', 'B: a ghost', 'C: Mia was dreaming'], 0,
      { 1: 'There is no clue about ghosts.', 2: 'The story says she walked in the lab, not in her bed.' }, ['Listen to Ravi: robots have a ==small light==.', 'The story: "a small light moving"'], 'Ending **A**: it was a cleaning robot!', 'lista'),
    bOuvirPista_("Ravi's message", [['When do cleaning robots work?', ['at night', 'in the morning', 'at lunch'], 0], ['What do they have on their heads?', ['a small light', 'a hat', 'a camera'], 0]],
      ['Listen for ==night== and ==light==.', 'Ravi: "a ==small light== on their heads"'], 'compreensão oral'),
    bBlocos_('The end of the story', 'Complete the sentences.', 'was/were · passado irregular.', [
      ['', 'The robot ___ cleaning.', ['was', 'were', 'is'], ['was'], { were: 'The robot = it → WAS.' }],
      ['', 'Mia ___ the robot.', ['saw', 'see', 'seed'], ['saw'], { seed: 'Irregular: see → SAW.' }],
      ['', 'She ___ scared anymore.', [WASNT, WERENT, ISNT], [WASNT], { "weren't": "She → WASN'T." }],
    ], ["it ==was== · see → ==saw== · she ==wasn't==", 'Mia ==saw== the robot.'], 'narrativa: verbos no passado'),
    bVF_([['The story happened at midnight.', true], ['Mia was at home in her bed.', false], ['Robots clean at night in 2050.', true], ['A ghost turned off the lights.', false]],
      ['Check clues A and C.', 'Mia was in the ==lab==.'], 'inferência'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI06', 'EF08LI05'], ['In the end, ', 'escrever outro final para a história.', 'In the end, Mia found her cat in the lab!', 'narrativa']);

  c = m8('poem', '2026-03', 'MAR·2', 'The Poem Machine');
  c(1, 'Hi, scientist! The lab has a [[poem|poema]] machine. Let\'s find words that rhyme!', [], [
    bFiguras_([['🐱 cat', ['hat', 'cup'], 0], ['🌙 moon', ['car', 'spoon'], 1], ['☀️ day', ['play', 'night'], 0], ['⭐ star', ['bus', 'car'], 1]],
      ['==rhyme== = rimar: palavras que terminam com o mesmo som', 'c==at== / h==at== · m==oon== / sp==oon=='], 'literatura: rimas'),
    bOuvir_([['Twinkle, twinkle, little star.', ['⭐', '🌙'], 0], ['The sun is in the sky.', ['🌧️', '☀️'], 1]],
      ['==star== = ⭐ · ==sun== = ☀️', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Finish the rhyme', 'Complete the rhyme.', 'Escolha a palavra que rima.', [
      ['🌙', 'I see the moon, I see a ___.', ['spoon', 'car'], ['spoon'], { car: 'moon rhymes with SPOON.' }],
      ['🐱', 'The cat is fat, it has a ___.', ['hat', 'bus'], ['hat'], { bus: 'cat / fat rhyme with HAT.' }],
    ], ['m==oon== → sp==oon==', 'c==at== → h==at=='], 'literatura: rimas'),
  ], ['EF08LI06', 'EF08LI03', 'EF08LI06'], ['I like ', 'escrever duas linhas que rimam.', 'I like the sun, I like to run.', 'literatura']);
  c(2, 'Hi, scientist! A [[robot|robô]] wrote a poem in 2050. Read it!', [
    bCaderno_('A', 'A · Poem', 'Robots in the Rain', ['Robots walk, robots talk,', 'in the rain, they never stop.', 'Metal hands and metal feet,', 'they clean the city, every street.']),
    bMsg_('lu', 'Dr. Lu', 'This poem is from 2050! A robot wrote it.'),
    bAudio_('ravi', 'Dr. Ravi', 'In 2050, robots write poems and songs. People read them in the parks.'),
  ], [
    bLerOuvir_([['Who wrote the poem?', ['a robot', 'Dr. Lu', 'Ravi'], 0], ['Where do people read poems in 2050?', ['in the parks', 'in the lab', 'in cars'], 0]],
      ['Dr. Lu: "A ==robot== wrote it."', 'Ravi: "People read them in the ==parks=="'], 'literatura'),
    { titulo: 'Rhyme boxes', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: palavras que rimam com TALK e palavras que rimam com FEET.']],
      dicas: ['t==alk== / w==alk==', 'f==eet== / str==eet=='],
      partes: [{ tipo: 'separar', caixas: ['rhymes with TALK', 'rhymes with FEET'], itens: [
        { texto: 'walk', resposta: 0 }, { texto: 'street', resposta: 1 }, { texto: 'chalk', resposta: 0 },
        { texto: 'sweet', resposta: 1 }, { texto: 'hawk', resposta: 0 }, { texto: 'meet', resposta: 1 }] }],
      solucao: '**talk**: walk, chalk, hawk · **feet**: street, sweet, meet',
      etiquetas: [{ codigo: 'EF08LI06', foco: 'literatura: rimas' }] },
    bBlocos_('Understand the poem', 'Complete the sentences.', 'Releia o poema (pista A).', [
      ['', 'The robots clean the ___.', ['streets', 'rain', 'poems'], ['streets'], { rain: 'Poem: "they clean the city, every STREET".' }],
      ['', 'In the rain, they never ___.', ['stop', 'talk', 'walk'], ['stop'], { talk: 'Poem: "in the rain, they never STOP".' }],
    ], ['Releia o poema.', '"every ==street=="'], 'literatura'),
  ], ['EF08LI06', 'EF08LI06', 'EF08LI05'], ['Robots ', 'escrever duas linhas de poema sobre robôs (com rima).', 'Robots can play, robots work all day.', 'literatura']);
  c(3, 'Hi, scientist! Which robot [[wrote|escreveu]] the poem "Robots in the Rain"?', [
    bCaderno_('A', 'A · Note', 'About the poet', ['The poet robot works in the rain and cleans streets.']),
    { id: 'B', aba: 'B · Robots', blocos: [{ tipo: 'itens', itens: [['🤖', 'K-1: cleans windows, works indoors'], ['🤖', 'P-7: cleans streets, works in the rain'], ['🤖', 'T-3: cooks, works in the kitchen']] }] },
    bAudio_('lu', 'Dr. Lu', 'The poet robot has metal feet and walks all day in the city.'),
  ], [
    bQuem_('Which robot is the poet?', 'Click the robot.', 'Clique no robô poeta.',
      [{ emoji: '🤖', texto: 'K-1' }, { emoji: '🤖', texto: 'P-7' }, { emoji: '🤖', texto: 'T-3' }], 1,
      { 0: 'K-1 works indoors.', 2: 'T-3 works in the kitchen.' }, ['==Rain== + ==streets==.', 'Check clue B.'], "It's **P-7**!", 'figuras'),
    bOuvirPista_("Dr. Lu's message", [['Where does the poet robot walk?', ['in the city', 'in the kitchen', 'in the lab'], 0], ['What does it have?', ['metal feet', 'wings', 'wheels'], 0]],
      ['Listen for ==feet== and ==city==.', 'Lu: "metal ==feet=="'], 'compreensão oral'),
    bBlocos_('Rhymes', 'Choose the rhyme.', 'Rima = mesmo som no final.', [
      ['', 'FEET rhymes with ___.', ['street', 'foot', 'fast'], ['street'], { foot: 'f==eet== / str==eet==' }],
      ['', 'TALK rhymes with ___.', ['walk', 'take', 'talks'], ['walk'], { take: 't==alk== / w==alk==' }],
      ['', 'RAIN rhymes with ___.', ['train', 'run', 'red'], ['train'], { run: 'r==ain== / tr==ain==' }],
    ], ['som final igual', 'r==ain== / tr==ain=='], 'literatura: rimas'),
    bVF_([['P-7 cleans streets.', true], ['T-3 works in the rain.', false], ['K-1 works indoors.', true], ['The poem is about the kitchen.', false]],
      ['Check clue B.', 'T-3 works in the ==kitchen==.'], 'literatura'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI06', 'EF08LI06'], ['My city ', 'escrever duas linhas de poema sobre a sua cidade.', 'My city is green, the cleanest I have seen.', 'literatura']);

  // ======================================================== ABRIL · comparativos e superlativos
  c = m8('a8', '2026-04', 'APR·1', 'The Fastest Robot');
  c(1, "Hi, scientist! It's the robot [[race|corrida]]! Let's compare.", [], [
    bFiguras_([['🐢', ['slow', 'fast'], 0], ['🐆', ['slow', 'fast'], 1], ['🐘', ['big', 'small'], 0], ['🐭', ['big', 'small'], 1]],
      ['==slow== = devagar · ==fast== = rápido', '==big== = grande · ==small== = pequeno'], 'comparatives (adjetivos)'),
    bOuvir_([['The cheetah is faster than the turtle.', ['🐆', '🐢'], 0], ['The mouse is smaller than the elephant.', ['🐘', '🐭'], 1]],
      ['==faster== = mais rápido · ==smaller== = menor', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('-er than', 'Complete the sentence.', 'Comparar: adjetivo curto + ER + than (faster than).', [
      ['🐆', 'The cheetah is ___ than the dog.', ['faster', 'fast'], ['faster'], { fast: 'Compare → FASTER than.' }],
      ['🐘', 'The elephant is ___ than the cat.', ['bigger', 'biger'], ['bigger'], { biger: 'big → BIGGER (double g).' }],
    ], ['adjetivo curto + ==er== + than', 'big → ==bigger=='], 'comparatives'),
  ], ['EF08LI15', 'EF08LI03', 'EF08LI15'], ['I am taller than ', 'comparar você com alguém.', 'I am taller than my sister, but she is older.', 'comparatives']);
  c(2, "Hi, scientist! Here are the robot race [[results|resultados]]. Read the clues!", [
    { id: 'A', aba: 'A · Results', blocos: [{ tipo: 'itens', itens: [['🤖', 'R-1: 20 km/h, 50 kg'], ['🤖', 'R-2: 35 km/h, 80 kg'], ['🤖', 'R-3: 15 km/h, 30 kg']] }] },
    bMsg_('sam', 'Sam', 'R-2 is faster than R-1, but it is heavier!'),
    bAudio_('lu', 'Dr. Lu', 'R-3 is the lightest robot, but it is the slowest.'),
  ], [
    bLerOuvir_([['Which robot is the fastest?', ['R-2', 'R-1', 'R-3'], 0], ['Which robot is the lightest?', ['R-3', 'R-1', 'R-2'], 0]],
      ['Results: R-2 = ==35 km/h==', 'Lu: "R-3 is the ==lightest=="'], 'localizar informação'),
    bBlocos_('Comparatives', 'Complete the sentences.', 'adjetivo + ER + than · heavy → heavier.', [
      ['', 'R-2 is ___ than R-1.', ['faster', 'fast', 'fastest'], ['faster'], { fastest: 'Two robots → FASTER than.' }],
      ['', 'R-2 is ___ than R-3.', ['heavier', 'heavy', 'heavyer'], ['heavier'], { heavyer: 'heavy → HEAVIER (y → ier).' }],
      ['', 'R-3 is ___ than R-1.', ['slower', 'slow', 'slowest'], ['slower'], { slowest: 'Two robots → SLOWER than.' }],
    ], ['dois → ==-er== than', 'heavy → ==heavier=='], 'comparatives'),
    bBlocos_('Superlatives', 'Complete the sentences.', 'O mais de todos: the + adjetivo + EST.', [
      ['', 'R-2 is the ___ robot.', ['fastest', 'faster', 'most fast'], ['fastest'], { faster: 'The most of all → FASTEST.' }],
      ['', 'R-3 is the ___ robot.', ['lightest', 'lighter', 'most light'], ['lightest'], { lighter: 'The most of all → LIGHTEST.' }],
    ], ['the + ==-est==', 'the ==fastest=='], 'superlatives'),
  ], ['EF08LI05', 'EF08LI15', 'EF08LI15'], ['The best robot is ', 'comparar dois robôs ou animais.', 'The best robot is R-2 because it is the fastest.', 'comparatives and superlatives']);
  c(3, 'Hi, scientist! Which robot [[won|venceu]] the race? Check the rules!', [
    bCaderno_('A', 'A · Rules', 'Race rules', ['The winner is faster than R-1, but lighter than 70 kg.']),
    { id: 'B', aba: 'B · Robots', blocos: [{ tipo: 'itens', itens: [['🤖', 'R-1: 20 km/h, 50 kg'], ['🤖', 'R-2: 35 km/h, 80 kg'], ['🤖', 'R-4: 30 km/h, 60 kg']] }] },
    bAudio_('sam', 'Sam', "The winner wasn't the heaviest robot. It was faster than R-1."),
  ], [
    bQuem_('Which robot won?', 'Click the robot.', 'Clique no robô vencedor.',
      [{ emoji: '🤖', texto: 'R-1' }, { emoji: '🤖', texto: 'R-2' }, { emoji: '🤖', texto: 'R-4' }], 2,
      { 0: 'R-1 cannot be faster than itself.', 1: 'R-2 weighs 80 kg: heavier than 70 kg.' }, ['==Faster than R-1== + ==lighter than 70 kg==.', 'Check clue B.'], '**R-4** won!', 'figuras'),
    bOuvirPista_("Sam's message", [['Was the winner the heaviest robot?', ["No, it wasn't.", 'Yes, it was.', "No, it isn't."], 0], ['The winner was faster than…', ['R-1', 'R-2', 'R-4'], 0]],
      ['Listen for ==heaviest== and ==faster==.', 'Sam: "It was faster than ==R-1=="'], 'compreensão oral'),
    bBlocos_('Compare the robots', 'Complete the sentences.', '-er than · the -est.', [
      ['', 'R-4 is ___ than R-2.', ['lighter', 'light', 'lightest'], ['lighter'], { lightest: 'Two robots → LIGHTER than.' }],
      ['', 'R-2 is the ___ robot.', ['heaviest', 'heavier', 'most heavy'], ['heaviest'], { heavier: 'The most of all → HEAVIEST.' }],
      ['', 'R-4 is ___ than R-1.', ['faster', 'fast', 'fastest'], ['faster'], { fastest: 'Two robots → FASTER than.' }],
    ], ['==-er== than · the ==-est==', 'R-2 is the ==heaviest=='], 'comparatives and superlatives'),
    bVF_([['R-4 is faster than R-1.', true], ['R-2 is lighter than R-4.', false], ['R-2 is the heaviest robot.', true], ['R-1 won the race.', false]],
      ['Check clue B.', 'R-2 = 80 kg, R-4 = ==60 kg==.'], 'comparatives and superlatives'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI15', 'EF08LI15'], ['The fastest animal is ', 'escrever sobre o animal mais rápido ou maior que você conhece.', 'The fastest animal is the cheetah.', 'superlatives']);

  c = m8('city', '2026-04', 'APR·2', 'Cities of the Future');
  c(1, "Hi, scientist! Let's visit the [[cities|cidades]] of 2050!", [], [
    bFiguras_([['🏙️', ['big city', 'small town'], 0], ['🌳', ['grey', 'green'], 1], ['🏔️', ['high', 'low'], 0], ['🔊', ['quiet', 'noisy'], 1]],
      ['==big city== = cidade grande · ==green== = verde', '==high== = alto · ==noisy== = barulhento'], 'comparatives (adjetivos)'),
    bOuvir_([['This is the biggest city in the world.', ['🏙️', '🏡'], 0], ['The park is more beautiful than the street.', ['🚗', '🌳'], 1]],
      ['==biggest== = a maior · ==more beautiful== = mais bonito', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('More or most?', 'Complete the sentence.', 'Adjetivos longos: MORE (mais… que) e THE MOST (o mais).', [
      ['🌳', 'The park is ___ beautiful than the street.', ['more', 'most'], ['more'], { most: 'Two things → MORE … than.' }],
      ['🏙️', 'Tokyo is the ___ city.', ['biggest', 'bigger'], ['biggest'], { bigger: 'The most of all → BIGGEST.' }],
    ], ['longo: ==more== … than · ==the most==', 'curto: the ==biggest=='], 'comparatives and superlatives'),
  ], ['EF08LI15', 'EF08LI03', 'EF08LI15'], ['My city is ', 'comparar sua cidade com outra.', 'My city is smaller than São Paulo, but it is greener.', 'comparatives']);
  c(2, 'Hi, scientist! Compare the cities of [[2050|2050]]. Read the clues!', [
    { id: 'A', aba: 'A · Cities', blocos: [{ tipo: 'itens', itens: [['🏙️', 'Neo-Tokyo: 40 million people, very noisy'], ['🌿', 'Green Lisbon: 3 million people, very clean'], ['🏝️', 'Sky Joinville: 2 million people, very modern']] }] },
    bMsg_('mia', 'Mia', 'Neo-Tokyo is bigger than Green Lisbon, but Green Lisbon is cleaner.'),
    bAudio_('ravi', 'Dr. Ravi', 'In 2050, Sky Joinville is the most modern city in Brazil!'),
  ], [
    bLerOuvir_([['Which city is the biggest?', ['Neo-Tokyo', 'Green Lisbon', 'Sky Joinville'], 0], ['Which city is the most modern?', ['Sky Joinville', 'Neo-Tokyo', 'Green Lisbon'], 0]],
      ['Neo-Tokyo: ==40 million== people', 'Ravi: "Sky Joinville is the ==most modern=="'], 'localizar informação'),
    bBlocos_('Compare the cities', 'Complete the sentences.', 'curto: -er / -est · longo: more / most.', [
      ['', 'Neo-Tokyo is ___ than Green Lisbon.', ['bigger', 'big', 'biggest'], ['bigger'], { biggest: 'Two cities → BIGGER than.' }],
      ['', 'Green Lisbon is ___ than Neo-Tokyo.', ['cleaner', 'clean', 'cleanest'], ['cleaner'], { cleanest: 'Two cities → CLEANER than.' }],
      ['', 'Sky Joinville is the ___ modern city.', ['most', 'more', 'much'], ['most'], { more: 'The most of all → THE MOST modern.' }],
    ], ['==-er== / ==the most==', 'the ==most== modern'], 'comparatives and superlatives'),
    { titulo: 'Short or long?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the adjectives to the boxes.', 'Separe: adjetivos curtos (-er/-est) e longos (more/most).']],
      dicas: ['Short: ==fast → faster==.', 'Long: ==beautiful → more beautiful==.'],
      partes: [{ tipo: 'separar', caixas: ['-er / -est (short)', 'more / most (long)'], itens: [
        { texto: 'fast', resposta: 0 }, { texto: 'beautiful', resposta: 1 }, { texto: 'big', resposta: 0 },
        { texto: 'modern', resposta: 1 }, { texto: 'clean', resposta: 0 }, { texto: 'expensive', resposta: 1 }] }],
      solucao: '**-er/-est**: fast, big, clean · **more/most**: beautiful, modern, expensive',
      etiquetas: [{ codigo: 'EF08LI15', foco: 'comparatives (short × long)' }] },
  ], ['EF08LI05', 'EF08LI15', 'EF08LI15'], ['In 2050, my city will be ', 'imaginar sua cidade em 2050 com comparativos.', 'In 2050, my city will be cleaner and more modern.', 'comparatives']);
  c(3, 'Hi, scientist! In which city does Dr. Ravi [[live|mora]]?', [
    bCaderno_('A', 'A · Note', 'Clue', ["Ravi lives in the smallest city of the three. It is more modern than Neo-Tokyo."]),
    { id: 'B', aba: 'B · Cities', blocos: [{ tipo: 'itens', itens: [['🏙️', 'Neo-Tokyo: 40 million people, very noisy'], ['🌿', 'Green Lisbon: 3 million people, very clean'], ['🏝️', 'Sky Joinville: 2 million people, very modern']] }] },
    bAudio_('ravi', 'Dr. Ravi', "My city isn't the biggest, but it is the most modern in Brazil."),
  ], [
    bQuem_('Where does Ravi live?', 'Click the city.', 'Clique na cidade do Ravi.',
      [{ emoji: '🏙️', texto: 'Neo-Tokyo' }, { emoji: '🌿', texto: 'Green Lisbon' }, { emoji: '🏝️', texto: 'Sky Joinville' }], 2,
      { 0: 'Neo-Tokyo is the biggest.', 1: 'Green Lisbon has 3 million people. It is not the smallest.' }, ['==The smallest== + ==more modern==.', 'Check the numbers in clue B.'], 'Ravi lives in **Sky Joinville**!', 'figuras'),
    bOuvirPista_("Ravi's message", [["Is Ravi's city the biggest?", ["No, it isn't.", 'Yes, it is.', "No, it wasn't."], 0], ['His city is in…', ['Brazil', 'Japan', 'Portugal'], 0]],
      ['Listen for ==biggest== and a country.', 'Ravi: "the most modern in ==Brazil=="'], 'compreensão oral'),
    bBlocos_('Compare', 'Complete the sentences.', '-er than · the -est · more/most.', [
      ['', 'Sky Joinville is ___ than Green Lisbon.', ['smaller', 'small', 'smallest'], ['smaller'], { smallest: 'Two cities → SMALLER than.' }],
      ['', 'Neo-Tokyo is the ___ city.', ['noisiest', 'noisier', 'most noisy'], ['noisiest'], { noisier: 'The most of all → NOISIEST.' }],
      ['', 'Green Lisbon is ___ than Neo-Tokyo.', ['cleaner', 'more clean', 'cleanest'], ['cleaner'], { 'more clean': 'clean is short → CLEANER.' }],
    ], ['noisy → ==noisiest== · clean → ==cleaner==', 'curto: -er/-est'], 'comparatives and superlatives'),
    bVF_([['Sky Joinville is the smallest city.', true], ['Green Lisbon is the noisiest city.', false], ['Neo-Tokyo is bigger than Sky Joinville.', true], ['Ravi lives in Neo-Tokyo.', false]],
      ['Check clue B.', 'Neo-Tokyo is ==very noisy==.'], 'comparatives and superlatives'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI15', 'EF08LI15'], ['The best city in the world is ', 'escrever qual é a melhor cidade e por quê (superlativo).', 'The best city in the world is Joinville because it is the greenest.', 'superlatives']);

  // ======================================================== JUNHO · will (previsões)
  c = m8('a8', '2026-06', 'JUN·1', 'The Prediction Machine');
  c(1, 'Hi, scientist! Our [[prediction|previsão]] machine is ready. What will happen?', [], [
    bFiguras_([['🌧️', ['It will rain.', 'It will be sunny.'], 0], ['☀️', ['It will rain.', 'It will be sunny.'], 1], ['❄️', ['It will snow.', 'It will be hot.'], 0], ['🌪️', ['It will be calm.', 'It will be windy.'], 1]],
      ['==It will rain.== = Vai chover.', '==sunny== = ensolarado · ==windy== = ventando'], 'will (predictions)'),
    bOuvir_([['Tomorrow it will rain.', ['🌧️', '☀️'], 0], ['In 2050, cars will fly.', ['🚲', '🛸'], 1]],
      ['==rain== = 🌧️ · ==fly== = voar 🛸', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Will', 'Complete the sentence.', 'Futuro (previsão): WILL + verbo.', [
      ['🌧️', 'Tomorrow it ___ rain.', ['will', 'wills'], ['will'], { wills: 'WILL never takes -s.' }],
      ['🤖', 'Robots ___ cook for us.', ['will', 'are'], ['will'], { are: 'Future → WILL cook.' }],
    ], ['==will== + verbo (sem -s)', 'It ==will== rain.'], 'will (predictions)'),
  ], ['EF08LI14', 'EF08LI03', 'EF08LI14'], ['In 2050, ', 'fazer uma previsão para 2050.', 'In 2050, people will live on the Moon.', 'will (predictions)']);
  c(2, 'Hi, scientist! The [[predictions|previsões]] for 2050 are here. Read the clues!', [
    { id: 'A', aba: 'A · Predictions', blocos: [{ tipo: 'itens', itens: [['🛸', 'Cars will fly.'], ['🤖', 'Robots will teach English.'], ['🌡️', 'It will be hotter.']] }] },
    bMsg_('lu', 'Dr. Lu', "I think people will live on Mars, but they won't live under the sea."),
    bAudio_('ravi', 'Dr. Ravi', "In 2050, cars fly, but robots don't teach English. Teachers are still very important!"),
  ], [
    bLerOuvir_([['Where will people live, according to Dr. Lu?', ['on Mars', 'under the sea', 'on the Moon'], 0], ['Do robots teach English in 2050?', ["No, they don't.", 'Yes, they do.', 'Yes, they will.'], 0]],
      ['Lu: "people will live on ==Mars=="', 'Ravi: "robots ==don\'t teach== English"'], 'localizar informação'),
    bBlocos_("Will or won't?", 'Complete the sentences.', "WILL = vai · WON'T = não vai.", [
      ['', 'People ___ live on Mars.', ['will', 'wills', 'are'], ['will'], { wills: 'WILL never takes -s.' }],
      ['', 'They ___ live under the sea.', [WONT, "willn't", "don't"], [WONT], { "willn't": "The negative is WON'T." }],
      ['', 'It ___ be hotter.', ['will', 'is', 'wills'], ['will'], { is: 'Future → WILL be.' }],
    ], ["==will== · ==won't==", "They ==won't== live under the sea."], 'will (predictions)'),
    { titulo: 'Right or wrong?', tipo: 'Evidence', onomatopeia: 'CLICK!',
      passos: [['🎧', 'Listen to Ravi (clue C).', 'Ouça o Ravi, que mora em 2050.'], ['👆', 'Click RIGHT or WRONG.', 'A previsão acertou (RIGHT) ou errou (WRONG)?']],
      dicas: ['Ravi: "cars ==fly==".', 'Ravi: "robots ==don\'t teach== English. Teachers are still ==important==."'],
      partes: [{ tipo: 'classificar', categorias: ['RIGHT', 'WRONG'], itens: [
        { texto: 'Cars will fly.', resposta: 0 }, { texto: 'Robots will teach English.', resposta: 1 },
        { texto: 'Teachers will be important.', resposta: 0 }, { texto: 'Nobody will need teachers.', resposta: 1 }] }],
      solucao: '**Right**: cars will fly, teachers will be important · **Wrong**: robots will teach English, nobody will need teachers',
      etiquetas: [{ codigo: 'EF08LI14', foco: 'will (predictions)' }] },
  ], ['EF08LI03', 'EF08LI14', 'EF08LI14'], ['I think that in 2050 ', 'escrever duas previsões para 2050 (will / won\'t).', "I think that in 2050 cars will fly, but people won't live on Mars.", 'will (predictions)']);
  c(3, 'Hi, scientist! Only one [[prediction|previsão]] from 2026 came true in 2050. Whose was it?', [
    bCaderno_('A', 'A · Note', 'Prediction contest', ['Only one prediction from 2026 was correct in 2050.']),
    bFichas_([['sam', 'SAM', ['Cars will fly.']], ['mia', 'MIA', ['Robots will be teachers.']], ['ben', 'BEN', ['People will live on Mars.']]]),
    bAudio_('ravi', 'Dr. Ravi', 'In 2050, nobody lives on Mars, and teachers are humans. But cars fly everywhere!'),
  ], [
    bQuem_('Whose prediction came true?', 'Click the person.', 'Clique em quem acertou a previsão.',
      [{ personagem: 'sam', texto: 'SAM' }, { personagem: 'mia', texto: 'MIA' }, { personagem: 'ben', texto: 'BEN' }], 0,
      { 1: 'In 2050, teachers are humans.', 2: 'In 2050, nobody lives on Mars.' }, ['Listen to Ravi (clue C).', 'What happens in ==2050==?'], "**Sam's** prediction came true: cars fly!"),
    bOuvirPista_("Ravi's message", [['Do people live on Mars in 2050?', ["No, they don't.", 'Yes, they do.', 'Yes, they will.'], 0], ['Are teachers robots?', ['No, they are humans.', 'Yes, they are.', 'No, they are cars.'], 0]],
      ['Listen for ==Mars== and ==teachers==.', 'Ravi: "teachers are ==humans=="'], 'compreensão oral'),
    bBlocos_("Will or won't?", 'Complete the sentences.', "WILL = vai · WON'T = não vai.", [
      ['', 'In 2050, cars ___ fly.', ['will', WONT, 'wills'], ['will'], { "won't": 'Cars fly in 2050 → WILL.' }],
      ['', 'Robots ___ be teachers.', [WONT, 'will', ARENT], [WONT], { will: 'Teachers are humans → WON\'T.' }],
      ['', 'People ___ live on Mars in 2050.', [WONT, 'will', "don't"], [WONT], { will: 'Nobody lives on Mars → WON\'T.' }],
    ], ["==will== · ==won't==", "People ==won't== live on Mars."], 'will (predictions)'),
    bVF_([['Cars fly in 2050.', true], ['People live on Mars in 2050.', false], ['Teachers are humans in 2050.', true], ["Mia's prediction was right.", false]],
      ['Check clues B and C.', 'Teachers are ==humans==.'], 'will (predictions)'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI14', 'EF08LI14'], ['My prediction is: ', 'escrever uma previsão para a sua vida em 2040.', 'My prediction is: I will be a doctor in 2040.', 'will (predictions)']);

  c = m8('promise', '2026-06', 'JUN·2', 'Promises to the Planet');
  c(1, 'Hi, scientist! Let\'s make [[promises|promessas]] to help the planet!', [], [
    bFiguras_([['➡️📅', ['tomorrow', 'yesterday'], 0], ['⬅️📅', ['tomorrow', 'yesterday'], 1], ['🔜', ['ago', 'soon'], 1], ['🚀', ['in the future', 'in the past'], 0]],
      ['==tomorrow== = amanhã · ==yesterday== = ontem', '==soon== = em breve · ==in the future== = no futuro'], 'future time expressions'),
    bOuvir_([['I will recycle next week.', ['next week', 'last week'], 0, 'pilulas'], ['We will plant trees tomorrow.', ['🚗', '🌳'], 1]],
      ['==next week== = semana que vem', '==plant trees== = plantar árvores 🌳'], 'compreensão oral'),
    bBlocos_('Promises', 'Complete the sentence.', 'Promessa: I will + verbo.', [
      ['💧', 'I ___ save water.', ['will', 'wills'], ['will'], { wills: 'WILL never takes -s.' }],
      ['🌳', 'We will plant trees ___.', ['tomorrow', 'yesterday'], ['tomorrow'], { yesterday: 'Future → TOMORROW.' }],
    ], ['promessa: ==I will== …', 'futuro: ==tomorrow=='], 'future time expressions'),
  ], ['EF08LI12', 'EF08LI03', 'EF08LI12'], ['I promise I will ', 'fazer uma promessa para ajudar o planeta.', 'I promise I will turn off the lights.', 'will']);
  c(2, "Hi, scientist! Read the class [[promises|promessas]] for the planet.", [
    { id: 'A', aba: 'A · Poster', blocos: [{ tipo: 'itens', itens: [['💧', 'Ben: I will take shorter showers.'], ['🌳', 'Lucy: I will plant a tree next month.'], ['🚲', 'Sam: I will ride my bike to school.']] }] },
    bMsg_('lu', 'Dr. Lu', 'Great promises! Who will plant a tree?'),
    bAudio_('lucy', 'Lucy', 'I will plant my tree next month, near the school.'),
  ], [
    bLerOuvir_([['Who will plant a tree?', ['Lucy', 'Ben', 'Sam'], 0], ['When will she plant it?', ['next month', 'tomorrow', 'last month'], 0]],
      ['Poster: "Lucy: I will plant a ==tree=="', 'Lucy: "==next month=="'], 'localizar informação'),
    bBlocos_('Will', 'Complete the sentences.', 'will + verbo (sem -s, sem to).', [
      ['', 'Ben ___ take shorter showers.', ['will', 'wills', 'is'], ['will'], { wills: 'WILL never takes -s.' }],
      ['', 'Sam will ___ his bike to school.', ['ride', 'rides', 'riding'], ['ride'], { rides: 'After WILL → RIDE.' }],
      ['', 'Lucy will plant a tree next ___.', ['month', 'ago', 'yesterday'], ['month'], { ago: 'Future → NEXT month.' }],
    ], ['==will== + verbo puro', 'will ==ride=='], 'will'),
    { titulo: 'Past or future?', tipo: 'Sort', onomatopeia: 'POW!',
      passos: [['✋', 'Drag the words to the boxes.', 'Separe: expressões do PASSADO e do FUTURO.']],
      dicas: ['==yesterday==, ==last year==, ==ago== → past', '==tomorrow==, ==next week==, ==soon== → future'],
      partes: [{ tipo: 'separar', caixas: ['PAST', 'FUTURE'], itens: [
        { texto: 'yesterday', resposta: 0 }, { texto: 'tomorrow', resposta: 1 }, { texto: 'last year', resposta: 0 },
        { texto: 'next week', resposta: 1 }, { texto: 'two days ago', resposta: 0 }, { texto: 'soon', resposta: 1 }] }],
      solucao: '**Past**: yesterday, last year, two days ago · **Future**: tomorrow, next week, soon',
      etiquetas: [{ codigo: 'EF08LI12', foco: 'future time expressions' }] },
  ], ['EF08LI03', 'EF08LI14', 'EF08LI12'], ['Next month, I will ', 'escrever duas promessas para o próximo mês.', 'Next month, I will recycle and I will read more.', 'will']);
  c(3, 'Hi, scientist! Someone [[broke a promise|quebrou uma promessa]]. Who?', [
    bCaderno_('A', 'A · Note', 'From Dr. Lu', ["One student didn't keep the promise: this person said 'I will ride my bike', but came by car."]),
    bFichas_([['sam', 'SAM', ['promise: ride his bike']], ['lucy', 'LUCY', ['promise: plant a tree']], ['ben', 'BEN', ['promise: shorter showers']]]),
    bAudio_('mia', 'Mia', "Sam's father drove him to school today. It was raining!"),
  ], [
    bQuem_('Who broke the promise?', 'Click the person.', 'Clique em quem não cumpriu a promessa.',
      [{ personagem: 'sam', texto: 'SAM' }, { personagem: 'lucy', texto: 'LUCY' }, { personagem: 'ben', texto: 'BEN' }], 0,
      { 1: "Lucy's promise was about a tree.", 2: "Ben's promise was about showers." }, ["The promise: ==I will ride my bike==.", 'Who came by car?'], 'It was **Sam**!'),
    bOuvirPista_("Mia's message", [['How did Sam come to school?', ['by car', 'by bike', 'on foot'], 0], ['Why?', ['It was raining.', 'His bike was broken.', 'He was late.'], 0]],
      ['Listen for ==drove== and ==raining==.', 'Mia: "It was ==raining=="'], 'compreensão oral'),
    bBlocos_('Will and time', 'Complete the sentences.', "will · won't · next.", [
      ['', 'Sam ___ ride his bike tomorrow.', ['will', 'wills', 'is'], ['will'], { wills: 'WILL never takes -s.' }],
      ['', 'He ___ come by car again.', [WONT, "willn't", "doesn't"], [WONT], { "willn't": "The negative is WON'T." }],
      ['', 'Lucy will plant a tree next ___.', ['month', 'ago', 'before'], ['month'], { ago: 'Future → NEXT month.' }],
    ], ["==will== · ==won't== · ==next==", "He ==won't== come by car."], 'will'),
    bVF_([['Sam came by car.', true], ['Sam rode his bike today.', false], ['It was raining.', true], ['Lucy broke her promise.', false]],
      ['Check clue C.', "Sam's father ==drove== him."], 'will'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI14', 'EF08LI14'], ['Tomorrow, I will ', 'escrever uma promessa e o que você não vai mais fazer (won\'t).', "Tomorrow, I will save water. I won't take long showers.", 'will']);

  // ======================================================== AGOSTO · going to (planos)
  c = m8('a8', '2026-08', 'AUG·1', 'The Mars Mission Plan');
  c(1, "Hi, scientist! We have a [[plan|plano]]: a mission to Mars!", [], [
    bFiguras_([['🚀', ['travel to Mars', 'cook'], 0], ['🎒', ['sleep', 'pack'], 1], ['🧪', ['study', 'swim'], 0], ['📸', ['eat', 'take photos'], 1]],
      ['==travel== = viajar · ==pack== = fazer as malas', '==study== = estudar · ==take photos== = tirar fotos'], 'going to (vocabulário)'),
    bOuvir_([["I'm going to travel to Mars.", ['🚀', '🏖️'], 0], ['She is going to study science.', ['🎨', '🧪'], 1]],
      ['==going to travel== = vai viajar', '==science== = ciências 🧪'], 'compreensão oral'),
    bBlocos_('Going to', 'Complete the sentence.', 'Plano: am/is/are + going TO + verbo.', [
      ['🚀', 'I am going ___ travel.', ['to', 'for'], ['to'], { for: 'going TO + verb.' }],
      ['🎒', 'They ___ going to pack.', ['are', 'is'], ['are'], { is: 'They → ARE going to.' }],
    ], ['am/is/are + going ==to==', 'They ==are== going to pack.'], 'going to'),
  ], ['EF08LI14', 'EF08LI03', 'EF08LI14'], ["This weekend I'm going to ", 'contar um plano para o fim de semana.', "This weekend I'm going to visit my cousins.", 'going to']);
  c(2, 'Hi, scientist! Here is the Mars mission [[plan|plano]]. Read the clues!', [
    bCaderno_('A', 'A · Mission plan', 'Mission Mars 2050', ['1. The crew is going to train in May.', '2. They are going to leave Earth in June.', '3. They are going to land on Mars in December.']),
    bMsg_('ravi', 'Dr. Ravi', "I'm going to be the pilot! Lucy is going to be the doctor."),
    bAudio_('lu', 'Dr. Lu', "The crew isn't going to take pets. Robots are going to help them."),
  ], [
    bLerOuvir_([['Who is going to be the pilot?', ['Ravi', 'Lucy', 'Dr. Lu'], 0], ['Are they going to take pets?', ["No, they aren't.", 'Yes, they are.', "No, they won't."], 0]],
      ['Ravi: "I\'m going to be the ==pilot=="', 'Lu: "The crew ==isn\'t== going to take pets"'], 'localizar informação'),
    bBlocos_('Going to', 'Complete the sentences.', 'am/is/are + going to + verbo.', [
      ['', 'The crew is going ___ train in May.', ['to', 'for', 'at'], ['to'], { for: 'going TO + verb.' }],
      ['', 'They ___ going to leave in June.', ['are', 'is', 'am'], ['are'], { is: 'They → ARE going to.' }],
      ['', 'Lucy is going to ___ the doctor.', ['be', 'is', 'being'], ['be'], { is: 'going to + BE.' }],
    ], ['==are== going ==to== + verbo', 'going to ==be=='], 'going to'),
    { titulo: 'The plan in order', tipo: 'Order', onomatopeia: 'POW!',
      passos: [['✋', 'Put the plan in order.', 'Coloque o plano da missão em ordem.']],
      dicas: ['Look at clue A: May → June → December.', 'Train → leave → land → build.'],
      partes: [{ tipo: 'ordenar', itens: ['They are going to train.', 'They are going to leave Earth.', 'They are going to land on Mars.', 'They are going to build a base.'], embaralhar: [2, 0, 3, 1] }],
      solucao: 'train → leave Earth → land on Mars → build a base',
      etiquetas: [{ codigo: 'EF08LI14', foco: 'going to' }] },
  ], ['EF08LI03', 'EF08LI14', 'EF08LI14'], ['Next year, I am going to ', 'contar um plano para o ano que vem.', 'Next year, I am going to learn to swim.', 'going to']);
  c(3, 'Hi, scientist! One member is [[not going to travel|não vai viajar]]. Who?', [
    bCaderno_('A', 'A · Note', 'Mission team', ['One member is not going to travel. This person is going to control the mission from the lab.']),
    bFichas_([['ravi', 'RAVI', ['pilot', 'going to travel']], ['lucy', 'LUCY', ['doctor', 'going to travel']], ['lu', 'DR. LU', ['chief', 'going to work in the lab']]]),
    bAudio_('ravi', 'Dr. Ravi', "Dr. Lu isn't going to come with us. She is going to talk to us from the lab every day."),
  ], [
    bQuem_('Who is going to stay?', 'Click the person.', 'Clique em quem vai ficar na Terra.',
      [{ personagem: 'ravi', texto: 'RAVI' }, { personagem: 'lucy', texto: 'LUCY' }, { personagem: 'lu', texto: 'DR. LU' }], 2,
      { 0: 'Ravi is the pilot. He is going to travel.', 1: 'Lucy is the doctor. She is going to travel.' }, ['==Control the mission from the lab==.', 'Check clue B.'], "It's **Dr. Lu**!"),
    bOuvirPista_("Ravi's message", [['Is Dr. Lu going to travel?', ["No, she isn't.", 'Yes, she is.', "No, she won't."], 0], ['How often is she going to talk to the crew?', ['every day', 'every week', 'never'], 0]],
      ['Listen for ==isn\'t going to== and ==every==.', 'Ravi: "==every day=="'], 'compreensão oral'),
    bBlocos_('Going to', 'Complete the sentences.', 'is/are + going to + verbo.', [
      ['', 'Dr. Lu ___ going to stay in the lab.', ['is', 'are', 'am'], ['is'], { are: 'Dr. Lu = she → IS.' }],
      ['', "She isn't going ___ travel.", ['to', 'for', 'at'], ['to'], { for: 'going TO + verb.' }],
      ['', 'Ravi and Lucy are going to ___ to Mars.', ['travel', 'travels', 'traveling'], ['travel'], { travels: 'going to + TRAVEL.' }],
    ], ['she ==is== going to · they ==are== going to', 'going to ==travel=='], 'going to'),
    bVF_([['Dr. Lu is going to stay on Earth.', true], ['Lucy is going to be the pilot.', false], ['Ravi is going to travel.', true], ['They are going to take pets.', false]],
      ['Check clue B.', 'Ravi is the ==pilot==.'], 'going to'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI14', 'EF08LI14'], ['If I go to Mars, I am going to ', 'contar o que vai fazer numa viagem a Marte.', 'If I go to Mars, I am going to take many photos.', 'going to']);

  c = m8('weekend', '2026-08', 'AUG·2', 'Plans for the Weekend');
  c(1, "Hi, scientist! What are the scientists going to do this [[weekend|fim de semana]]?", [], [
    bFiguras_([['🎬', ['watch a movie', 'play soccer'], 0], ['🏖️', ['study', 'go to the beach'], 1], ['🎂', ['make a cake', 'swim'], 0], ['🎮', ['read', 'play video games'], 1]],
      ['==watch a movie== = ver um filme · ==go to the beach== = ir à praia', '==make a cake== = fazer um bolo · ==play video games== = jogar videogame'], 'going to (vocabulário)'),
    bOuvir_([["We're going to watch a movie.", ['🎬', '⚽'], 0], ["He's going to make a cake.", ['🏖️', '🎂'], 1]],
      ['==movie== = 🎬 · ==cake== = 🎂', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Going to', 'Complete the sentence.', 'going TO + verbo.', [
      ['🎬', "We're going ___ watch a movie.", ['to', 'will'], ['to'], { will: 'going TO + verb.' }],
      ['🌧️', "Look at the clouds! It's going ___ rain.", ['to', 'for'], ['to'], { for: 'going TO + verb.' }],
    ], ['going ==to== + verbo', "It's going ==to== rain."], 'going to'),
  ], ['EF08LI14', 'EF08LI03', 'EF08LI14'], ["On Saturday, I'm going to ", 'contar seus planos para sábado.', "On Saturday, I'm going to play soccer with my friends.", 'going to']);
  c(2, 'Hi, scientist! The scientists are talking about their [[plans|planos]]. Read the clues!', [
    { id: 'A', aba: 'A · Chat', moldura: 'celular', blocos: [{ tipo: 'post', meta: 'Mia', texto: 'What are you going to do this weekend?' }, { tipo: 'post', meta: 'Ben', texto: "I'm going to visit my grandma." }] },
    bMsg_('sam', 'Sam', "I'm not going to stay home. I'm going to the beach!"),
    bAudio_('mia', 'Mia', "I'm going to make a cake for my mother's birthday on Sunday."),
  ], [
    bLerOuvir_([['What is Ben going to do?', ['visit his grandma', 'go to the beach', 'make a cake'], 0], ["When is Mia's mother's birthday?", ['on Sunday', 'on Saturday', 'on Friday'], 0]],
      ['Ben: "I\'m going to ==visit my grandma=="', 'Mia: "on ==Sunday=="'], 'localizar informação'),
    bBlocos_('Going to', 'Complete the sentences.', "going to + verbo · isn't going to.", [
      ['', "I'm going to ___ my grandma.", ['visit', 'visits', 'visiting'], ['visit'], { visits: 'going to + VISIT.' }],
      ['', 'Sam ___ going to stay home.', [ISNT, ARENT, WONT], [ISNT], { "aren't": "Sam = he → ISN'T." }],
      ['', "Mia is going to make a cake ___ Sunday.", ['on', 'in', 'at'], ['on'], { in: 'Days → ON.' }],
    ], ["going to + ==verbo== · he ==isn't==", 'on ==Sunday=='], 'going to'),
    bBlocos_('Plan or decision?', 'Choose the right form.', 'Plano já decidido → GOING TO · decisão na hora → WILL.', [
      ['🎟️', 'I have the tickets. I ___ watch the game.', ['am going to', 'will'], ['am going to'], { will: 'You have tickets: it is a PLAN → AM GOING TO.' }],
      ['📞', 'The phone is ringing! I ___ answer it.', ['will', 'am going to'], ['will'], { 'am going to': 'Decision now → WILL.' }],
    ], ['plano → ==going to== · decisão agora → ==will==', 'The phone is ringing! I ==will== answer it.'], 'will vs going to'),
  ], ['EF08LI03', 'EF08LI14', 'EF08LI14'], ["This weekend, I'm not going to ", 'contar o que você vai e não vai fazer no fim de semana.', "This weekend, I'm not going to study. I'm going to rest!", 'going to']);
  c(3, "Hi, scientist! We found a weekend [[plan|plano]] without a name. Whose plan is it?", [
    bCaderno_('A', 'A · Plan', 'No name', ['Saturday: beach. Sunday: a cake for Mom.']),
    bFichas_([['mia', 'MIA', ['Sat: beach', 'Sun: cake for Mom']], ['sam', 'SAM', ['Sat: beach', 'Sun: soccer']], ['ben', 'BEN', ['Sat: grandma', 'Sun: cake for Mom']]]),
    bAudio_('ben', 'Ben', 'Mia and Sam are going to the beach on Saturday. But only Mia is going to bake.'),
  ], [
    bQuem_('Whose plan is it?', 'Click the person.', 'Clique em quem fez o plano.',
      [{ personagem: 'mia', texto: 'MIA' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'ben', texto: 'BEN' }], 0,
      { 1: 'Sam is going to play soccer on Sunday.', 2: 'Ben is going to visit his grandma on Saturday.' }, ['==Beach== on Saturday + ==cake== on Sunday.', 'Check clue B.'], "It's **Mia's** plan!"),
    bOuvirPista_("Ben's message", [['Who is going to the beach?', ['Mia and Sam', 'Ben and Mia', 'only Ben'], 0], ['Who is going to bake?', ['only Mia', 'Sam', 'Ben'], 0]],
      ['Listen for ==beach== and ==bake==.', 'Ben: "only ==Mia== is going to bake"'], 'compreensão oral'),
    bBlocos_('Going to', 'Complete the sentences.', "is/are + going to · isn't.", [
      ['', 'Mia is going to ___ a cake.', ['bake', 'bakes', 'baking'], ['bake'], { bakes: 'going to + BAKE.' }],
      ['', 'Sam and Mia ___ going to the beach.', ['are', 'is', 'am'], ['are'], { is: 'Sam and Mia = they → ARE.' }],
      ['', 'Ben ___ going to the beach.', [ISNT, ARENT, WONT], [ISNT], { "aren't": "Ben = he → ISN'T." }],
    ], ['they ==are== · he ==isn\'t==', 'going to ==bake=='], 'going to'),
    bVF_([['Mia is going to bake a cake.', true], ['Ben is going to the beach.', false], ['Sam is going to play soccer on Sunday.', true], ['Sam is going to bake.', false]],
      ['Check clues B and C.', 'Ben is going to visit his ==grandma==.'], 'going to'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI14', 'EF08LI14'], ['On my next holiday, I am going to ', 'contar seus planos para as próximas férias.', 'On my next holiday, I am going to travel to the beach.', 'going to']);

  // ======================================================== OUTUBRO (2º caso) · prefixos e sufixos
  c = m8('shop', '2026-10', 'OCT·2', 'The Word Lab Shop');
  c(1, 'Hi, scientist! The lab has a [[shop|loja]] of new words!', [], [
    bFiguras_([['😀', ['happy', 'unhappy'], 0], ['🙁', ['happy', 'unhappy'], 1], ['👩‍🏫', ['teacher', 'teach'], 0], ['🎨', ['paint', 'painter'], 1]],
      ['==unhappy== = un + happy (não feliz)', '==teacher== = teach + er (quem ensina)'], 'prefixes and suffixes'),
    bOuvir_([['This box is useless.', ['useless', 'useful'], 0, 'pilulas'], ['She is a great singer.', ['🍳', '🎤'], 1]],
      ['==useless== = sem utilidade', '==singer== = quem canta 🎤'], 'compreensão oral: palavras novas'),
    bBlocos_('Build the word', 'Choose the right word.', '-er = pessoa que faz · im-/un- = não.', [
      ['🎤', 'A person who sings is a ___.', ['singer', 'singful'], ['singer'], { singful: 'A person who → -ER: SINGER.' }],
      ['🚫', 'not possible = ___', ['impossible', 'unpossible'], ['impossible'], { unpossible: 'possible → IMpossible.' }],
    ], ['==-er== = pessoa · ==im-== = não', 'not possible → ==impossible=='], 'prefixes and suffixes'),
  ], ['EF08LI13', 'EF08LI03', 'EF08LI13'], ['A good friend is ', 'descrever um bom amigo com palavras de sufixo -ful/-less.', 'A good friend is helpful and careful.', 'prefixes and suffixes']);
  c(2, "Hi, scientist! Welcome to the Word Lab Shop. Read the [[catalogue|catálogo]]!", [
    { id: 'A', aba: 'A · Catalogue', blocos: [{ tipo: 'itens', itens: [['🔦', 'Unbreakable flashlight'], ['🧴', 'Reusable bottle'], ['🎧', 'Wireless headphones']] }] },
    bMsg_('lu', 'Dr. Lu', 'Everything in our shop is useful for 2050!'),
    bAudio_('ravi', 'Dr. Ravi', 'I bought a reusable bottle. I use it again and again!'),
  ], [
    bLerOuvir_([['What did Ravi buy?', ['a reusable bottle', 'headphones', 'a flashlight'], 0], ["'Reusable' means you can…", ['use it again', 'not use it', 'break it'], 0]],
      ['Ravi: "I bought a ==reusable bottle=="', '"I use it ==again and again=="'], 'prefixes and suffixes'),
    { titulo: 'What does it mean?', tipo: 'Discover the rule', onomatopeia: 'ZAP!',
      passos: [['👀', 'Read the catalogue.', 'Leia o catálogo (pista A).'], ['🧩', 'Match the words and meanings.', 'Coloque o significado embaixo de cada palavra.']],
      dicas: ['un- = not · re- = again · -less = without', '==wireless== = without wires (fios)'],
      partes: [{ tipo: 'associar', alvos: [{ texto: 'unbreakable', resposta: 2 }, { texto: 'reusable', resposta: 0 }, { texto: 'wireless', resposta: 1 }], blocos: ['you can use it again', 'without wires', "you can't break it"] }],
      solucao: "**unbreakable** = you can't break it · **reusable** = you can use it again · **wireless** = without wires",
      etiquetas: [{ codigo: 'EF08LI13', foco: 'prefixes and suffixes' }] },
    bBlocos_('Build the word', 'Complete the sentences.', '-er = pessoa · -ful = cheio de.', [
      ['', 'a person who paints = a ___', ['painter', 'painting', 'paintful'], ['painter'], { paintful: 'A person who → -ER: PAINTER.' }],
      ['', 'full of color = ___', ['colorful', 'colorless', 'uncolor'], ['colorful'], { colorless: 'FULL of → -FUL: COLORFUL.' }],
    ], ['==-er== pessoa · ==-ful== cheio de', 'full of color → ==colorful=='], 'prefixes and suffixes'),
  ], ['EF08LI13', 'EF08LI13', 'EF08LI13'], ['In my backpack there is a ', 'descrever um objeto com uma palavra de prefixo ou sufixo.', 'In my backpack there is a reusable bottle.', 'prefixes and suffixes']);
  c(3, 'Hi, scientist! A customer has a [[complaint|reclamação]]. Which product broke?', [
    bCaderno_('A', 'A · Complaint', 'From a customer', ['My product broke on the first day! The box said it was impossible to break.']),
    { id: 'B', aba: 'B · Products', blocos: [{ tipo: 'itens', itens: [['🔦', 'Flashlight: unbreakable'], ['🧴', 'Bottle: reusable'], ['🎧', 'Headphones: wireless']] }] },
    bAudio_('sam', 'Sam', "I dropped it and it broke. The box said 'unbreakable'!"),
  ], [
    bQuem_('Which product broke?', 'Click the product.', 'Clique no produto que quebrou.',
      [{ emoji: '🔦', texto: 'flashlight' }, { emoji: '🧴', texto: 'bottle' }, { emoji: '🎧', texto: 'headphones' }], 0,
      { 1: "Reusable = you can use it again. It doesn't say 'impossible to break'.", 2: 'Wireless = without wires.' }, ['"==impossible to break==" = ?', 'un + break + able'], 'The **flashlight**: it was "unbreakable"!', 'figuras'),
    bOuvirPista_("Sam's message", [['What happened?', ['He dropped it.', 'He lost it.', 'He sold it.'], 0], ['What did the box say?', ['unbreakable', 'reusable', 'wireless'], 0]],
      ['Listen for ==dropped== and the word on the box.', 'Sam: "The box said ==unbreakable=="'], 'compreensão oral'),
    bBlocos_('Word builder', 'Complete the sentences.', 'un- = não · re- = de novo · -less = sem.', [
      ['', 'Sam was ___ with the flashlight.', ['unhappy', 'happyless', 'rehappy'], ['unhappy'], { happyless: 'not happy → UNhappy.' }],
      ['', 'He wants to ___ it.', ['replace', 'unplace', 'placeful'], ['replace'], { unplace: 'place again → REplace.' }],
      ['', 'The headphones are ___: they have no wires.', ['wireless', 'wireful', 'unwire'], ['wireless'], { wireful: 'without wires → WIRELESS.' }],
    ], ['==un-== · ==re-== · ==-less==', 'without wires → ==wireless=='], 'prefixes and suffixes'),
    bVF_([['The flashlight broke.', true], ['The bottle was unbreakable.', false], ['The headphones are wireless.', true], ['Sam was happy with the flashlight.', false]],
      ['Check clues B and C.', 'The ==flashlight== was "unbreakable".'], 'prefixes and suffixes'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI13', 'EF08LI13'], ['I want a product that is ', 'inventar um produto e descrevê-lo com prefixo/sufixo.', 'I want a product that is unbreakable and reusable.', 'prefixes and suffixes']);

  // ======================================================== NOVEMBRO (2º caso) · pronomes relativos e literatura
  c = m8('library', '2026-11', 'NOV·2', 'The Library of 2050');
  c(1, "Hi, scientist! Let's visit the [[library|biblioteca]] of 2050!", [], [
    bFiguras_([['📚', ['library', 'kitchen'], 0], ['👩‍💼', ['pilot', 'librarian'], 1], ['📖', ['novel', 'map'], 0], ['✍️', ['driver', 'writer'], 1]],
      ['==library== = biblioteca · ==librarian== = bibliotecária', '==novel== = romance · ==writer== = escritor'], 'vocabulário: literatura'),
    bOuvir_([['The librarian is the woman who helps you.', ['👩‍💼', '📖'], 0], ['This is the book which I love.', ['🚗', '📖'], 1]],
      ['==who== = pessoa 👩‍💼 · ==which== = coisa 📖', 'Toque em 📄 TEXT para ler o áudio.'], 'compreensão oral'),
    bBlocos_('Who or which?', 'Choose WHO or WHICH.', 'WHO = pessoa · WHICH = coisa.', [
      ['✍️', 'The writer ___ wrote this book is famous.', ['who', 'which'], ['who'], { which: 'A writer is a person → WHO.' }],
      ['📖', 'The book ___ I read was great.', ['which', 'who'], ['which'], { who: 'A book is a thing → WHICH.' }],
    ], ['pessoa → ==who== · coisa → ==which==', 'The book ==which== I read…'], 'relative pronouns'),
  ], ['EF08LI06', 'EF08LI03', 'EF08LI17'], ['My favourite book is the one which ', 'falar de um livro ou filme favorito usando which.', 'My favourite book is the one which has dragons.', 'relative pronouns']);
  c(2, 'Hi, scientist! The library [[catalogue|catálogo]] is here. Read the clues!', [
    { id: 'A', aba: 'A · Catalogue', blocos: [{ tipo: 'itens', itens: [['📕', '"The Red Planet": a novel which tells a story on Mars'], ['📘', '"Ocean Robots": a book which explains how robots clean the sea'], ['📗', '"Grandma Nina": the story of a woman who flew planes']] }] },
    bMsg_('lucy', 'Lucy', 'I want the book which talks about the sea.'),
    bAudio_('lu', 'Dr. Lu', "The writer who wrote 'The Red Planet' is Ravi!"),
  ], [
    bLerOuvir_([['Which book does Lucy want?', ['Ocean Robots', 'The Red Planet', 'Grandma Nina'], 0], ['Who wrote "The Red Planet"?', ['Ravi', 'Lucy', 'Dr. Lu'], 0]],
      ['Lucy: "the book which talks about the ==sea=="', 'Lu: "The writer who wrote it is ==Ravi=="'], 'localizar informação'),
    bBlocos_('Who or which?', 'Complete the sentences.', 'WHO = pessoa · WHICH = coisa · WHOSE = de quem.', [
      ['', 'Ravi is the writer ___ wrote "The Red Planet".', ['who', 'which', 'whose'], ['who'], { which: 'A writer is a person → WHO.' }],
      ['', '"Ocean Robots" is the book ___ explains robots.', ['which', 'who', 'whose'], ['which'], { who: 'A book is a thing → WHICH.' }],
      ['', 'Nina is the woman ___ flew planes.', ['who', 'which', 'whose'], ['who'], { which: 'A woman is a person → WHO.' }],
    ], ['==who== pessoa · ==which== coisa', 'the woman ==who== flew planes'], 'relative pronouns'),
    bBlocos_('Whose', 'Complete with WHOSE.', 'WHOSE = cujo/cuja (de quem é).', [
      ['', 'Ravi is the writer ___ book is about Mars.', ['whose', 'who', 'which'], ['whose'], { who: 'The book belongs to Ravi → WHOSE.' }],
      ['', 'Lucy is the girl ___ favourite topic is the sea.', ['whose', 'who', 'which'], ['whose'], { who: 'Her favourite topic → WHOSE.' }],
    ], ['==whose== = de quem (posse)', 'the writer ==whose== book…'], 'relative pronouns'),
  ], ['EF08LI03', 'EF08LI17', 'EF08LI17'], ['My favourite writer is a person who ', 'descrever um escritor ou personagem usando who/which.', 'My favourite writer is a person who writes about dragons.', 'relative pronouns']);
  c(3, "Hi, scientist! Someone [[borrowed|pegou emprestado]] 'The Red Planet'. Who?", [
    bCaderno_('A', 'A · Note', 'Library note', ["The person who borrowed 'The Red Planet' is a student whose favourite planet is Mars."]),
    bFichas_([['lucy', 'LUCY', ['favourite topic: the sea']], ['sam', 'SAM', ['favourite planet: Mars']], ['mia', 'MIA', ['favourite planet: Venus']]]),
    bAudio_('lu', 'Dr. Lu', 'The student who borrowed it returned another book which was about robots.'),
  ], [
    bQuem_('Who borrowed the book?', 'Click the person.', 'Clique em quem pegou o livro.',
      [{ personagem: 'lucy', texto: 'LUCY' }, { personagem: 'sam', texto: 'SAM' }, { personagem: 'mia', texto: 'MIA' }], 1,
      { 0: "Lucy's favourite topic is the sea.", 2: "Mia's favourite planet is Venus." }, ['A student ==whose favourite planet is Mars==.', 'Check clue B.'], 'It was **Sam**!'),
    bOuvirPista_("Dr. Lu's message", [['What did the student return?', ['a book about robots', 'a book about the sea', 'nothing'], 0], ["Who borrowed 'The Red Planet'?", ['a student', 'a teacher', 'a robot'], 0]],
      ['Listen for ==returned== and ==robots==.', 'Lu: "another book which was about ==robots=="'], 'compreensão oral'),
    bBlocos_('Who, which or whose?', 'Complete the sentences.', 'who · which · whose.', [
      ['', 'Sam is the student ___ borrowed the book.', ['who', 'which', 'whose'], ['who'], { which: 'A student is a person → WHO.' }],
      ['', 'He returned a book ___ was about robots.', ['which', 'who', 'whose'], ['which'], { who: 'A book is a thing → WHICH.' }],
      ['', 'Mia is the girl ___ favourite planet is Venus.', ['whose', 'who', 'which'], ['whose'], { who: 'Her favourite planet → WHOSE.' }],
    ], ['==who== · ==which== · ==whose==', 'the girl ==whose== favourite planet…'], 'relative pronouns'),
    bVF_([['Sam likes Mars.', true], ["Lucy's favourite planet is Mars.", false], ['The student returned a book about robots.', true], ["Mia borrowed 'The Red Planet'.", false]],
      ['Check clues B and C.', "Lucy's favourite topic is the ==sea==."], 'relative pronouns'),
  ], ['EF08LI05', 'EF08LI03', 'EF08LI17', 'EF08LI17'], ['The best book is the one which ', 'recomendar um livro ou filme usando who/which.', 'The best book is the one which my teacher gave me.', 'relative pronouns']);

  // ======================================================== Exercícios avulsos (só para o "Meu reforço")
  L.push.apply(L, avulsosLeitura_('8º', [
    { texto: 'Leo looked at the sky, took his umbrella and closed the window.', pergunta: 'What will happen soon?', opcoes: ['It will rain.', 'It will be sunny.', 'It will snow.'], resposta: 0, codigo: 'EF08LI05', foco: 'inferência' },
    { texto: "Mia didn't sleep all night. In class, she closed her eyes many times.", pergunta: 'How did Mia feel in class?', opcoes: ['tired', 'excited', 'angry'], resposta: 0, codigo: 'EF08LI05', foco: 'inferência' },
    { texto: 'Once upon a time, a little robot lived in a big, quiet library. Every night, it read a new book.', pergunta: 'What kind of text is this?', opcoes: ['a story', 'a recipe', 'a news report'], resposta: 0, codigo: 'EF08LI06', foco: 'literatura' },
    { texto: 'The blue car is faster than the red car, but the green car is the fastest of all.', pergunta: 'Which car is the fastest?', opcoes: ['the green car', 'the blue car', 'the red car'], resposta: 0, codigo: 'EF08LI05', foco: 'localizar informação' },
    { texto: "Ben is going to travel to Salvador next week. He has already bought his ticket.", pergunta: 'When is Ben going to travel?', opcoes: ['next week', 'last week', 'today'], resposta: 0, codigo: 'EF08LI05', foco: 'localizar informação' },
    { texto: 'Sara smiled when she opened the box. Inside, there was a puppy with a red ribbon.', pergunta: 'Why did Sara smile?', opcoes: ['She got a puppy as a present.', 'She lost her dog.', 'The box was empty.'], resposta: 0, codigo: 'EF08LI05', foco: 'inferência' },
    { texto: 'The scientist who invented the machine lives in Joinville. Her machine cleans rivers.', pergunta: 'What does the machine do?', opcoes: ['It cleans rivers.', 'It cooks food.', 'It flies.'], resposta: 0, codigo: 'EF08LI05', foco: 'localizar informação' },
    { texto: 'In 2050, people will use flying taxis. They will be quieter and cleaner than cars.', pergunta: 'What will people use in 2050?', opcoes: ['flying taxis', 'old cars', 'horses'], resposta: 0, codigo: 'EF08LI05', foco: 'localizar informação' },
  ]));
  L.push.apply(L, avulsosBlocos_('8º', [
    { figura: '🦒', frase: 'The giraffe is ___ than the horse.', blocos: ['taller', 'tallest', 'more tall'], resposta: 'taller', codigo: 'EF08LI15', foco: 'comparatives', dica: 'dois → ==-er== than' },
    { figura: '🐋', frase: 'The blue whale is the ___ animal.', blocos: ['biggest', 'bigger', 'most big'], resposta: 'biggest', codigo: 'EF08LI15', foco: 'superlatives', dica: 'o mais de todos → ==the -est==' },
    { figura: '🎨', frase: 'This painting is ___ beautiful than that one.', blocos: ['more', 'most', 'much'], resposta: 'more', codigo: 'EF08LI15', foco: 'comparatives', dica: 'adjetivo longo → ==more== … than' },
    { figura: '🌧️', frase: 'I think it ___ rain tomorrow.', blocos: ['will', 'is', 'wills'], resposta: 'will', codigo: 'EF08LI14', foco: 'will (predictions)', dica: 'previsão → ==will==' },
    { figura: '🚫', frase: "Don't worry, I ___ forget your birthday.", blocos: [WONT, "willn't", "don't"], resposta: WONT, codigo: 'EF08LI14', foco: 'will (predictions)', dica: "negativa → ==won't==" },
    { figura: '✈️', frase: 'We are going ___ visit Rio in July.', blocos: ['to', 'for', 'at'], resposta: 'to', codigo: 'EF08LI14', foco: 'going to', dica: 'going ==to== + verbo' },
    { figura: '🎒', frase: 'She ___ going to study tonight.', blocos: ['is', 'are', 'will'], resposta: 'is', codigo: 'EF08LI14', foco: 'going to', dica: 'she → ==is== going to' },
    { figura: '👩‍🍳', frase: 'The woman ___ cooks here is my aunt.', blocos: ['who', 'which', 'whose'], resposta: 'who', codigo: 'EF08LI17', foco: 'relative pronouns', dica: 'pessoa → ==who==' },
    { figura: '📱', frase: 'The phone ___ I bought is new.', blocos: ['which', 'who', 'whose'], resposta: 'which', codigo: 'EF08LI17', foco: 'relative pronouns', dica: 'coisa → ==which==' },
    { figura: '🐶', frase: 'That is the boy ___ dog is very big.', blocos: ['whose', 'who', 'which'], resposta: 'whose', codigo: 'EF08LI17', foco: 'relative pronouns', dica: 'posse → ==whose==' },
    { figura: '🔁', frase: 'write again = ___', blocos: ['rewrite', 'unwrite', 'writeless'], resposta: 'rewrite', codigo: 'EF08LI13', foco: 'prefixes and suffixes', dica: '==re-== = de novo' },
    { figura: '🗓️', frase: 'I will call you ___ week.', blocos: ['next', 'last', 'ago'], resposta: 'next', codigo: 'EF08LI12', foco: 'future time expressions', dica: 'futuro → ==next== week' },
  ]));

  return L;
}
