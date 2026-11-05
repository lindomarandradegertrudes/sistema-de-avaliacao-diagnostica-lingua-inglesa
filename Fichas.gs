/**
 * Fichas teóricas ("📖 Study") das habilidades do Mapa, mostradas antes dos treinos do "Meu reforço".
 * Cada ficha: regra (em português), pontos de atenção, exemplos (inglês + tradução), erro comum e um mini Check sem nota.
 * O texto padrão fica aqui; o professor pode editar cada ficha no painel (aba Habilidades) — a versão editada
 * fica na aba Fichas e tem prioridade. A leitura obrigatória vale por habilidade: depois que o aluno leu a ficha
 * até o fim (aba FichasLidas), nos próximos treinos ela aparece, mas pode ser pulada.
 * Marcações no texto (iguais às dos casos): **negrito**, ==destaque==, ~~riscado~~.
 */

/** Habilidades que usam a ficha de outra (estratégias de leitura/escuta e itens da Trilha Base iguais aos do 6º ano). */
const ALIAS_FICHAS = {
  '7-oral': '6-oral', '8-oral': '6-oral', '9-oral': '6-oral', 'b-oral': '6-oral',
  '7-leitura': '6-leitura', '8-leitura': '6-leitura', '9-leitura': '6-leitura', 'b-leitura': '6-leitura',
  'b-possessivos': '6-possessivos', 'b-presentcont': '6-presentcont', 'b-present3': '6-present3',
  'b-rotina': '6-rotina', 'b-tobe': '6-tobe', 'b-familia': '6-familia',
};

function fichasPadrao_() {
  const F = function (regra, atencao, exemplos, erro, check) {
    return {
      regra: regra, atencao: atencao,
      exemplos: exemplos.map(function (e) { return { en: e[0], pt: e[1] }; }),
      erro: { errado: erro[0], certo: erro[1], porque: erro[2] },
      check: { pergunta: check[0], opcoes: check[1], correta: check[2], explicacao: check[3] },
    };
  };
  return {
    // ======================================================== 6º ano
    '6-genitivo': F(
      "Usamos **'s** depois do nome do dono para mostrar posse: *Tom's bike* = a bicicleta do Tom. Em inglês o **dono vem primeiro** e a coisa depois.",
      ["Dono no plural terminado em -s leva só o apóstrofo: *my parents' car* (o carro dos meus pais).", "Não confunda com *it's* (= it is)."],
      [["Ana's cat is black.", 'O gato da Ana é preto.'], ["This is my sister's room.", 'Este é o quarto da minha irmã.'], ["Leo's friends are funny.", 'Os amigos do Leo são engraçados.']],
      ['the bike of Tom', "Tom's bike", "Em inglês o dono vem antes, com 's."],
      ["Como se diz \"o celular da Bia\"?", ["the phone Bia's", "Bia's phone", "phone's Bia"], 1, "Dono + 's + coisa: Bia's phone."]),
    '6-possessivos': F(
      'Os **possessive adjectives** vêm **antes** do substantivo e mostram de quem é: **my** (meu), **your** (seu), **his** (dele), **her** (dela), **its** (dele/dela, coisa ou animal), **our** (nosso), **their** (deles).',
      ['**his** = dele (menino/homem); **her** = dela (menina/mulher).', 'Eles não mudam no plural: *my books*, *their house*.'],
      [['She loves her dog.', 'Ela ama o cachorro dela.'], ['His name is Pedro.', 'O nome dele é Pedro.'], ['Our school is big.', 'A nossa escola é grande.']],
      ['Maria and his brother', 'Maria and her brother', 'Maria é menina: o possessivo é her.'],
      ['Complete: Lucas is with ___ mother.', ['her', 'his', 'their'], 1, 'Lucas é menino → his.']),
    '6-pronomes': F(
      'Os **subject pronouns** indicam quem faz a ação: **I, you, he, she, it, we, they**. Em inglês o sujeito quase **nunca é omitido**.',
      ['**I** (eu) é sempre maiúsculo.', '**it** = coisas e animais; **they** = eles/elas (pessoas ou coisas).'],
      [['Paulo is 12. He is my friend.', 'Paulo tem 12 anos. Ele é meu amigo.'], ['The cat is small. It is cute.', 'O gato é pequeno. Ele é fofo.'], ['Ana and I are students. We are in 6ºA.', 'Ana e eu somos alunos. Nós estamos no 6ºA.']],
      ['Is my friend.', 'He is my friend.', 'Em inglês a frase precisa do sujeito.'],
      ['Mia and Sam → ___ are cousins.', ['We', 'They', 'She'], 1, 'Mia e Sam = eles → they.']),
    '6-presentcont': F(
      'O **present continuous** mostra uma ação **acontecendo agora**: **am / is / are + verbo com -ing**.',
      ['Verbo terminado em -e perde o e: *dance → dancing*. Alguns dobram a consoante: *run → running*.', 'Palavras-pista: *now, right now, look!, listen!*'],
      [['I am reading a book now.', 'Eu estou lendo um livro agora.'], ['She is playing soccer.', 'Ela está jogando futebol.'], ['They are watching TV.', 'Eles estão assistindo TV.']],
      ['He playing now.', 'He is playing now.', 'Falta o verb to be (is) antes do -ing.'],
      ['Look! The dog ___ .', ['running', 'is running', 'runs'], 1, 'Ação acontecendo agora: is + running.']),
    '6-present3': F(
      'No **simple present**, com **he, she, it** o verbo ganha **-s**: *she plays*. Na negativa e na pergunta usamos **doesn\'t / does**, e o verbo **volta sem -s**.',
      ['*go → goes, watch → watches, study → studies, have → has*.', "*She doesn't play* — nunca *doesn't plays*."],
      [['He goes to school by bus.', 'Ele vai para a escola de ônibus.'], ['My mom works in a bank.', 'Minha mãe trabalha em um banco.'], ['Does she like pizza?', 'Ela gosta de pizza?']],
      ["She don't likes milk.", "She doesn't like milk.", "Com she usamos doesn't, e o verbo fica sem -s."],
      ['Complete: Tom ___ soccer on Saturdays.', ['play', 'plays', 'playing'], 1, 'Tom = he → plays.']),
    '6-tobe': F(
      'O **verb to be** significa **ser** ou **estar**: **I am** · **you / we / they are** · **he / she / it is**.',
      ["Formas curtas: *I'm, you're, he's, she's, it's, we're, they're*.", "Negativa: *isn't / aren't*. Pergunta: o verbo vem antes — *Are you 12?*"],
      [['I am from Joinville.', 'Eu sou de Joinville.'], ['She is my teacher.', 'Ela é minha professora.'], ["We aren't tired.", 'Nós não estamos cansados.']],
      ['They is happy.', 'They are happy.', 'Com they usamos are.'],
      ['___ you ready?', ['Is', 'Am', 'Are'], 2, 'you → are.']),
    '6-paises': F(
      "Países e nacionalidades sempre começam com **letra maiúscula** em inglês: *Brazil → Brazilian*. Dizemos *I'm **from** Brazil* ou *I'm Brazilian*.",
      ['**from** + país; a nacionalidade vem sem from.', 'Terminações comuns: -ian / -an (*Brazilian, Mexican*), -ese (*Japanese, Chinese*), -ish (*English, Spanish*).'],
      [['Messi is from Argentina. He is Argentinian.', 'Messi é da Argentina. Ele é argentino.'], ['Sushi is Japanese food.', 'Sushi é comida japonesa.'], ['Where are you from?', 'De onde você é?']],
      ['I am from Brazilian.', 'I am from Brazil. / I am Brazilian.', 'Depois de from vem o país, não a nacionalidade.'],
      ['Paris is in France. People there are ___ .', ['France', 'French', 'Frances'], 1, 'França → French.']),
    '6-familia': F(
      'Palavras da família: **mother, father, parents** (pais), **brother, sister, grandmother, grandfather, uncle** (tio), **aunt** (tia), **cousin** (primo/prima), **son, daughter**.',
      ['**parents** = mãe e pai, não "parentes" (*relatives*).', '**cousin** serve para primo e para prima.'],
      [["My aunt is my mother's sister.", 'Minha tia é irmã da minha mãe.'], ['I have two cousins.', 'Eu tenho dois primos.'], ['His grandparents live in Blumenau.', 'Os avós dele moram em Blumenau.']],
      ['My parents are my uncles and cousins.', 'My relatives are my uncles and cousins.', 'parents = só mãe e pai; parentes = relatives.'],
      ['The son of my uncle is my ___ .', ['brother', 'cousin', 'nephew'], 1, 'Filho do tio = primo (cousin).']),
    '6-rotina': F(
      'Para falar da rotina usamos o **simple present**: *I wake up at 7*. Horas: **at** + hora. Dias da semana: **on** + dia (com letra maiúscula).',
      ["*It's seven o'clock* (7:00) · *half past seven* (7:30) · *quarter to eight* (7:45).", 'Frequência antes do verbo: *I **always / usually / sometimes / never** …*'],
      [['I have lunch at 12:30.', 'Eu almoço às 12h30.'], ['We play soccer on Fridays.', 'Nós jogamos futebol às sextas.'], ['I never go to bed late.', 'Eu nunca vou dormir tarde.']],
      ['I go to school in Monday.', 'I go to school on Monday.', 'Dias da semana usam on.'],
      ['What time is it? (8:30)', ["It's half past eight.", "It's eight and thirty past.", "It's half to eight."], 0, '8:30 = half past eight.']),
    '6-oral': F(
      'Para entender um áudio: **1)** leia a pergunta antes; **2)** ouça procurando a **palavra-chave** e as palavras parecidas com o português; **3)** se precisar, use 🐢 **SLOWER** ou abra o 📄 **TEXT**.',
      ['Você não precisa entender todas as palavras, só a informação pedida.', 'Números, horas, nomes e lugares costumam ser a resposta.'],
      [['"The museum opens at nine."', 'Pergunta "What time?" → a pista é *nine* (9 horas).'], ['"My birthday is in May."', 'Pergunta "When?" → o mês é *May* (maio).'], ['"She is from Canada."', 'Pergunta "Where?" → o país é *Canada*.']],
      ['Parar de ouvir na primeira palavra que não entendeu.', 'Continuar ouvindo e focar na palavra-chave da pergunta.', 'A resposta pode estar no fim da frase.'],
      ['A pergunta é "What time?". O que você deve procurar no áudio?', ['um número ou uma hora', 'o nome de uma cor', 'um país'], 0, 'What time = que horas → procure números.']),
    '6-inferencia': F(
      '**Inferir** é descobrir algo que o texto **não diz com todas as letras**, juntando pistas (imagens, título, palavras). A **finalidade** é para que o texto serve: convidar, informar, vender, avisar.',
      ['Olhe o formato: convite, anúncio, mensagem, cartaz.', 'Pergunte-se: quem escreveu? para quem? por quê?'],
      [['"Bring your swimsuit! Pool party, Saturday, 3 pm."', 'Finalidade: convidar para uma festa na piscina.'], ['"Sorry, I can\'t come. I\'m sick."', 'Inferência: a pessoa vai faltar porque está doente.'], ['"50% OFF all shoes!"', 'Finalidade: vender (anúncio de promoção).']],
      ['Escolher a alternativa só porque tem uma palavra igual à do texto.', 'Juntar as pistas para chegar à ideia.', 'Na inferência, a resposta não aparece escrita igual no texto.'],
      ['"Don\'t forget your umbrella today!" — O que podemos inferir?', ['Vai chover.', 'Está muito calor.', 'É feriado.'], 0, 'Guarda-chuva → provavelmente vai chover.']),
    '6-leitura': F(
      'Para **localizar uma informação específica**: leia a pergunta, veja **o que** você procura (nome, número, lugar, data) e passe os olhos pelo texto até encontrar (*scanning*).',
      ['Não precisa ler tudo palavra por palavra.', 'Números e palavras com letra maiúscula ajudam a achar a resposta.'],
      [['"How old is Lia?" → procure um número perto de *Lia*.', '"Lia is 11." → ela tem 11 anos.'], ['"Where does Ben live?" → procure um lugar.', '"Ben lives in Curitiba."'], ['"When is the test?" → procure um dia ou data.', '"The test is on Monday."']],
      ['Escolher a alternativa só porque tem uma palavra igual à do texto.', 'Conferir se a frase do texto responde mesmo à pergunta.', 'Palavras iguais podem estar em outro contexto.'],
      ['"Max has two dogs and a cat." How many dogs?', ['one', 'two', 'three'], 1, 'two dogs = dois cachorros.']),

    // ======================================================== 7º ano
    '7-pasttobe': F(
      'No passado, o verb to be vira **was** (I, he, she, it) e **were** (you, we, they).',
      ["Negativa: *wasn't / weren't*.", 'Pergunta: o verbo vem antes — *Were you at school yesterday?*'],
      [['I was at home yesterday.', 'Eu estava em casa ontem.'], ['They were very happy.', 'Eles estavam muito felizes.'], ['Was the movie good?', 'O filme foi bom?']],
      ['We was late.', 'We were late.', 'we → were.'],
      ['My parents ___ at the beach last week.', ['was', 'were', 'are'], 1, 'parents = they, no passado → were.']),
    '7-past': F(
      'O **simple past** fala de ações **terminadas no passado**. Verbos **regulares** ganham **-ed** (*play → played*). Verbos **irregulares** têm forma própria (*go → went, see → saw, have → had*).',
      ["Negativa e pergunta: **didn't / did + verbo na forma base** — *I didn't go*, *Did you see?*", '*study → studied*, *stop → stopped*, *like → liked*.'],
      [['We visited our grandma last Sunday.', 'Nós visitamos nossa avó no domingo passado.'], ['She went to the mall yesterday.', 'Ela foi ao shopping ontem.'], ['Did you watch the game?', 'Você assistiu ao jogo?']],
      ["I didn't went.", "I didn't go.", "Depois de didn't o verbo volta à forma base."],
      ['Yesterday I ___ pizza.', ['eat', 'ate', 'eated'], 1, 'eat é irregular: ate.']),
    '7-preposicoes': F(
      'Preposições de tempo: **in** (meses, anos, estações, partes do dia) · **on** (dias e datas) · **at** (horas e momentos).',
      ['*in the morning / in the afternoon*, mas ***at** night*.', '*on Monday*, *on May 5th*, *at 3 o\'clock*.'],
      [['My birthday is in July.', 'Meu aniversário é em julho.'], ['The class starts at 7:30.', 'A aula começa às 7h30.'], ['We have English on Tuesdays.', 'Nós temos inglês às terças.']],
      ['in Monday', 'on Monday', 'Dias da semana usam on.'],
      ['The concert is ___ Saturday.', ['in', 'on', 'at'], 1, 'Dia da semana → on.']),
    '7-conectores': F(
      '**Connectors** ligam ideias: **and** (e), **but** (mas), **because** (porque), **so** (então, por isso), **then** (depois), **first / after that / finally** (para ordenar fatos).',
      ['**because** traz a causa; **so** traz a consequência.', 'Em histórias no passado, use *first, then, after that, finally*.'],
      [['I was tired, so I went to bed.', 'Eu estava cansado, então fui dormir.'], ['She was sad because she lost her phone.', 'Ela estava triste porque perdeu o celular.'], ['First we ate, then we played.', 'Primeiro comemos, depois brincamos.']],
      ['It rained, because I stayed home.', 'It rained, so I stayed home.', 'Ficar em casa é a consequência da chuva → so.'],
      ['It was cold, ___ I wore a jacket.', ['because', 'so', 'but'], 1, 'Consequência → so.']),
    '7-can': F(
      '**can** = poder / saber fazer (presente). **could** = podia / sabia (passado) ou pedido educado. Depois deles o verbo fica na **forma base, sem to**.',
      ["Negativa: *can't / couldn't*.", 'Nunca: ~~can to swim~~, ~~she cans~~.'],
      [['I can ride a bike.', 'Eu sei andar de bicicleta.'], ["She couldn't swim when she was five.", 'Ela não sabia nadar quando tinha cinco anos.'], ['Could you help me, please?', 'Você poderia me ajudar, por favor?']],
      ['He can to play guitar.', 'He can play guitar.', 'Depois de can não usamos to.'],
      ['When I was 4, I ___ read.', ["can't", "couldn't", "don't"], 1, "Passado → couldn't."]),
    '7-pronomes': F(
      '**Subject pronouns** fazem a ação: *I, you, he, she, it, we, they*. **Object pronouns** recebem a ação ou vêm depois de preposição: *me, you, him, her, it, us, them*.',
      ['*She loves **him*** — ela (sujeito) ama ele (objeto).', 'Depois de preposição: *with **me***, *for **them***.'],
      [['I called her yesterday.', 'Eu liguei para ela ontem.'], ['Can you help us?', 'Você pode nos ajudar?'], ['This gift is for them.', 'Este presente é para eles.']],
      ['Give it to I.', 'Give it to me.', 'Depois de preposição usamos o object pronoun.'],
      ['I know Pedro. I see ___ every day.', ['he', 'him', 'his'], 1, 'Objeto, menino → him.']),
    '7-comida': F(
      '**Countable** (contáveis) têm plural: *an apple, two apples*. **Uncountable** (incontáveis) não têm: *water, rice, milk, bread*. Use **how many** com contáveis e **how much** com incontáveis. Em receitas, o **imperativo** dá as instruções: *Mix, Add, Cut*.',
      ['**some** na afirmativa; **any** na negativa e na pergunta.', '*a / an* só com contáveis no singular.'],
      [['How many eggs do we need?', 'Quantos ovos precisamos?'], ["There isn't any milk.", 'Não tem leite nenhum.'], ['Add some sugar and mix.', 'Adicione um pouco de açúcar e misture.']],
      ['How many water?', 'How much water?', 'water é incontável → much.'],
      ['How ___ apples are there?', ['much', 'many', 'any'], 1, 'apples é contável → many.']),
    '7-present': F(
      'O **simple present** fala de hábitos e verdades: *I play*, *she plays*. Com he/she/it, verbo + **-s**; negativa **don\'t / doesn\'t**; pergunta **do / does**.',
      ['Palavras-pista: *every day, usually, always, on Mondays*.', 'Depois de doesn\'t / does o verbo fica sem -s.'],
      [['We go to school every day.', 'Nós vamos à escola todo dia.'], ["My brother doesn't like fish.", 'Meu irmão não gosta de peixe.'], ['Do you speak English?', 'Você fala inglês?']],
      ['Does he plays?', 'Does he play?', 'Com does o verbo fica na forma base.'],
      ['She ___ TV every night.', ['watch', 'watches', 'watching'], 1, 'she → watches.']),
    '7-global': F(
      'O **sentido global** é a ideia principal do texto, sem traduzir tudo. Use o **título**, as **imagens**, as **palavras cognatas** (parecidas com o português) e as palavras que se **repetem**.',
      ['Cognatas: *important, family, music, problem*.', 'Cuidado com os falsos cognatos: *pretend* = fingir; *parents* = pais.'],
      [['"Plastic in the ocean: a big problem"', 'Título + palavras repetidas → o assunto é a poluição dos oceanos.'], ['Mensagens com emojis e horários', 'O formato mostra o gênero: mensagens de celular.'], ['"English is a lingua franca."', 'O inglês é usado para pessoas de países diferentes se comunicarem.']],
      ['Traduzir palavra por palavra antes de entender o assunto.', 'Ler o título e as palavras-chave primeiro.', 'A ideia geral guia o resto da leitura.'],
      ['Um texto tem as palavras *goal, team, match, player*. Qual é o assunto?', ['Futebol', 'Culinária', 'Música'], 0, 'São palavras de esporte → futebol.']),

    // ======================================================== 8º ano
    '8-goingto': F(
      '**be going to + verbo** fala de **planos já decididos** e de **previsões com evidência**: *I\'m going to travel*.',
      ['**am / is / are + going to + verbo base**.', "Evidência: *Look at the clouds! It's going to rain.*"],
      [['We are going to visit Florianópolis next month.', 'Nós vamos visitar Florianópolis no mês que vem.'], ["She isn't going to come.", 'Ela não vai vir.'], ['Are you going to study tonight?', 'Você vai estudar hoje à noite?']],
      ['I going to play.', 'I am going to play.', 'Falta o verb to be (am).'],
      ['Look at that ball! It ___ break the window.', ['is going to', 'will to', 'goes to'], 0, 'Há evidência → is going to.']),
    '8-will': F(
      '**will + verbo** fala do futuro: **previsões**, **decisões na hora** e **promessas**: *It will rain tomorrow. I\'ll help you!*',
      ["Negativa: *won't* (= will not).", 'Depois de will, verbo base sem to: *will go* (nunca ~~will to go~~).'],
      [['In 2050, cars will fly.', 'Em 2050, os carros vão voar.'], ["I'll open the door.", 'Eu abro a porta (decisão na hora).'], ["She won't be late.", 'Ela não vai se atrasar.']],
      ['He will goes.', 'He will go.', 'Depois de will o verbo fica na forma base.'],
      ['I think robots ___ do our homework one day.', ['will', 'are', 'going'], 0, 'Previsão / opinião sobre o futuro → will.']),
    '8-futuro': F(
      'Expressões de tempo futuro: **tomorrow**, **next** week / month / year, **soon**, **tonight**, **in** 2030, **in** ten years, **the day after tomorrow**.',
      ['*next Monday* = segunda que vem (sem *the*).', '*in* + período: *in two days* = daqui a dois dias.'],
      [["I'll call you tomorrow.", 'Eu te ligo amanhã.'], ["We're going to move next year.", 'Nós vamos nos mudar no ano que vem.'], ['In ten years, I will be 24.', 'Daqui a dez anos, eu terei 24.']],
      ['I will travel last week.', 'I will travel next week.', 'last = passado; next = futuro.'],
      ['Qual expressão indica futuro?', ['yesterday', 'next Friday', 'last night'], 1, 'next Friday = sexta que vem.']),
    '8-comparativos': F(
      '**Comparativo**: adjetivo curto + **-er** + than (*taller than*); adjetivo longo: **more** + adjetivo + than (*more expensive than*). **Superlativo**: **the** + adjetivo + **-est** (*the tallest*) ou **the most** + adjetivo (*the most beautiful*).',
      ['Irregulares: *good → better → the best*; *bad → worse → the worst*.', '*big → bigger*, *happy → happier*.'],
      [['My brother is taller than me.', 'Meu irmão é mais alto que eu.'], ['This is the most interesting book.', 'Este é o livro mais interessante.'], ['Today is better than yesterday.', 'Hoje está melhor que ontem.']],
      ['more tall than', 'taller than', 'Adjetivo curto usa -er.'],
      ['The cheetah is ___ animal on land.', ['the faster', 'the fastest', 'more fast'], 1, 'Superlativo de fast → the fastest.']),
    '8-prefixos': F(
      '**Prefixos** vêm antes da palavra e mudam o sentido: *un-, dis-, im-, re-* (*happy → unhappy*). **Sufixos** vêm depois e mudam a classe da palavra: *-ful, -less, -ness, -er, -ly* (*care → careful, careless*).',
      ['*un- / dis- / im-* costumam indicar o contrário.', '*re-* = de novo: *rewrite* (reescrever). *-less* = sem: *useless* (sem utilidade).'],
      [['This answer is incorrect.', 'Esta resposta está incorreta.'], ['Please rewrite the sentence.', 'Por favor, reescreva a frase.'], ['She is a helpful friend.', 'Ela é uma amiga prestativa.']],
      ['unpossible', 'impossible', 'Com possible, o prefixo de negação é im-.'],
      ['*use* = usar. "Sem utilidade" = ___', ['useful', 'useless', 'reuse'], 1, '-less = sem.']),
    '8-relativos': F(
      'Os **relative pronouns** ligam frases e explicam de quem ou do que falamos: **who** (pessoas), **which** (coisas e animais), **that** (pessoas ou coisas), **whose** (cujo, de quem).',
      ['*The girl **who** won* = a menina que venceu.', '*The book **which** I read* = o livro que eu li.'],
      [['The man who lives here is a doctor.', 'O homem que mora aqui é médico.'], ['This is the phone which I bought.', 'Este é o celular que eu comprei.'], ["She's the girl whose dog is lost.", 'Ela é a menina cujo cachorro está perdido.']],
      ['The teacher which helped me.', 'The teacher who helped me.', 'Para pessoas usamos who.'],
      ['The robot ___ cleans the house is new.', ['who', 'which', 'whose'], 1, 'Robô é uma coisa → which.']),
    '8-inferencia': F(
      'Em textos narrativos (contos, poemas), muitas ideias não são ditas diretamente. **Infira** sentimentos e intenções pelas **ações**, **falas** e **detalhes** dos personagens. Em poemas, observe as **rimas** e as **repetições**.',
      ['Pergunte-se: o que a ação do personagem mostra sobre ele?', 'Imagens e o título também são pistas.'],
      [['"Tom\'s hands were shaking."', 'Inferência: Tom estava nervoso ou com medo.'], ['"She closed the door and didn\'t say goodbye."', 'Inferência: ela estava chateada.'], ['"Night, light, bright" no fim dos versos', 'São rimas: o poema repete o som -ight.']],
      ['Procurar a resposta escrita igual no texto.', 'Juntar as pistas (ações, falas, detalhes).', 'Sentimentos quase nunca são ditos com todas as letras.'],
      ['"She smiled and jumped with joy." Como ela se sentia?', ['Feliz', 'Triste', 'Brava'], 0, 'Sorrir e pular de alegria → feliz.']),

    // ======================================================== 9º ano
    '9-presentperfect': F(
      'O **present perfect** = **have / has + particípio**. Liga o passado ao presente: **experiências** (*I have visited Rio*), ações que **começaram no passado e continuam** e **resultados agora**.',
      ['**has** com he / she / it.', 'Particípio regular = -ed; irregulares: *go → gone, see → seen, eat → eaten, be → been*.'],
      [['I have never been to Europe.', 'Eu nunca fui à Europa.'], ['She has lost her keys.', 'Ela perdeu as chaves (e ainda não achou).'], ['Have you ever eaten sushi?', 'Você já comeu sushi?']],
      ['She have finished.', 'She has finished.', 'she → has.'],
      ['They ___ seen this movie three times.', ['has', 'have', 'are'], 1, 'they → have.']),
    '9-advtempo': F(
      '**since** + ponto de início (*since 2020*); **for** + duração (*for two years*); **already** = já (afirmativa); **yet** = ainda / já (negativa e pergunta, no fim da frase); **never** = nunca; **ever** = já (em perguntas).',
      ['*since* responde "desde quando?"; *for* responde "há quanto tempo?".', "*I haven't finished **yet***. *Have you finished **yet**?*"],
      [['I have lived here since 2019.', 'Eu moro aqui desde 2019.'], ['We have studied English for five years.', 'Nós estudamos inglês há cinco anos.'], ["I've already done my homework.", 'Eu já fiz minha lição.']],
      ['I have lived here since five years.', 'I have lived here for five years.', 'Duração → for.'],
      ['She has worked here ___ January.', ['for', 'since', 'yet'], 1, 'Ponto de início (janeiro) → since.']),
    '9-condicionais': F(
      '**1st conditional** (situação real / possível): **If + present, will + verbo** — *If it rains, I will stay home.* **2nd conditional** (situação imaginária): **If + past, would + verbo** — *If I had money, I would travel.*',
      ['No 2nd conditional é comum *If I **were** you…*', 'A ordem pode inverter: *I will stay home if it rains* (sem vírgula).'],
      [['If you study, you will pass.', 'Se você estudar, vai passar.'], ['If I were you, I would apologize.', 'Se eu fosse você, eu pediria desculpas.'], ['If we recycle, we will help the planet.', 'Se reciclarmos, vamos ajudar o planeta.']],
      ['If it will rain, I stay home.', 'If it rains, I will stay home.', 'O will fica na outra parte da frase, não depois do if.'],
      ['If I ___ a superpower, I would fly.', ['have', 'had', 'will have'], 1, 'Situação imaginária → If + past (had).']),
    '9-modais': F(
      '**should** = deveria (conselho) · **must** = tem que (obrigação forte, regra) · **have to** = precisa (obrigação) · **mustn\'t** = é proibido · **don\'t have to** = não precisa.',
      ['Depois de should / must, verbo base sem to.', "Atenção: **mustn't** (proibido) é diferente de **don't have to** (não é necessário)."],
      [['You should drink more water.', 'Você deveria beber mais água.'], ['Students must wear the uniform.', 'Os alunos têm que usar o uniforme.'], ["You don't have to come tomorrow.", 'Você não precisa vir amanhã.']],
      ['You must to study.', 'You must study.', 'Depois de must não usamos to.'],
      ['It\'s a rule: you ___ use your phone during the test.', ["mustn't", "don't have to", 'should'], 0, "Proibido → mustn't."]),
    '9-conectores': F(
      'Conectores para argumentar: **however** (porém), **although** (embora), **because / since** (porque), **therefore** (portanto), **moreover / in addition** (além disso), **for example** (por exemplo).',
      ['*However* costuma vir no começo da frase, com vírgula: *However, …*', '*although* + frase completa: *Although it was late, we stayed.*'],
      [['Social media is useful; however, it can be dangerous.', 'As redes sociais são úteis; porém, podem ser perigosas.'], ['Although he was tired, he finished the work.', 'Embora estivesse cansado, ele terminou o trabalho.'], ['Plastic pollutes the ocean. Therefore, we should recycle.', 'O plástico polui o oceano. Portanto, devemos reciclar.']],
      ['Although it rained, but we played.', 'Although it rained, we played.', 'Não usamos although e but juntos.'],
      ['The test was hard. ___, I passed.', ['Because', 'However', 'Moreover'], 1, 'Ideia contrária → However.']),
    '9-digital': F(
      'A **linguagem digital** usa abreviações, siglas e emojis: **LOL** (laughing out loud), **BRB** (be right back), **BTW** (by the way), **IDK** (I don\'t know), **ASAP** (as soon as possible), **u** = you, **2** = to / too, **4** = for, **l8r** = later.',
      ['Use em chats e posts informais, não em textos formais.', 'O contexto ajuda a descobrir o que a sigla significa.'],
      [['IDK the answer, sorry!', 'Não sei a resposta, desculpa!'], ['BRB, my mom is calling.', 'Já volto, minha mãe está chamando.'], ['See u l8r!', 'Até mais tarde!']],
      ['Usar "u" e "LOL" numa redação formal.', 'Usar a linguagem digital só em mensagens informais.', 'Cada gênero de texto pede uma linguagem.'],
      ['"Call me ASAP." O que significa ASAP?', ['o mais rápido possível', 'amanhã', 'talvez'], 0, 'ASAP = as soon as possible.']),
    '9-expansao': F(
      'O inglês se espalhou pelo mundo pela **colonização britânica**, pela influência dos **EUA** (economia, tecnologia, música, cinema) e pela **internet**. Hoje é uma **língua franca**: usada entre pessoas de línguas diferentes. O português também tem **empréstimos** do inglês: *shopping, delivery, mouse*.',
      ['Existem várias variedades: inglês britânico, americano, australiano, indiano, nigeriano…', 'Nenhum sotaque é "errado".'],
      [['English is an official language in India and Nigeria.', 'O inglês é língua oficial na Índia e na Nigéria.'], ['Words like "online" and "game" are used in Portuguese.', 'Palavras como online e game são usadas em português.'], ['A Brazilian and a Japanese speak English at work.', 'Um brasileiro e um japonês falam inglês no trabalho.']],
      ['Achar que só existe um inglês "certo".', 'Reconhecer as variedades do inglês pelo mundo.', 'O inglês pertence a todos que o usam.'],
      ['Por que o inglês é chamado de língua franca?', ['Porque é usado entre falantes de línguas diferentes', 'Porque é falado só na França', 'Porque é a língua mais antiga'], 0, 'Língua franca = língua comum de comunicação.']),
    '9-fato': F(
      '**Fato** pode ser **comprovado** (dados, datas, números). **Opinião** mostra o que alguém pensa: *I think, in my opinion, the best, amazing, should*. Para identificar **fake news**: confira a **fonte**, a **data** e se **outras fontes** dizem o mesmo.',
      ['Adjetivos de valor (*best, terrible, amazing*) indicam opinião.', 'Manchetes exageradas e sem fonte são suspeitas.'],
      [['Brazil has 26 states and a Federal District.', 'Fato: dá para comprovar.'], ['Brazil is the best country in the world.', 'Opinião: depende de quem fala.'], ['"Scientists say…" sem dizer quais cientistas', 'Sem fonte → cuidado, pode ser fake news.']],
      ['Tratar "This is the best phone" como fato.', 'Reconhecer que é opinião (a palavra best).', 'Opiniões não podem ser provadas.'],
      ['Qual frase é um FATO?', ['Water boils at 100 °C at sea level.', 'Pizza is the most delicious food.', 'Summer is better than winter.'], 0, 'Pode ser comprovado → fato.']),
    '9-argumentos': F(
      'Um bom texto argumentativo tem: **tese** (a opinião defendida), **argumentos** (as razões) e **evidências** (dados, exemplos, pesquisas). Conectores como *because, for example, therefore* ligam as partes.',
      ['Evidência responde à pergunta: "como você sabe disso?"', 'Um argumento sem evidência é mais fraco.'],
      [['Thesis: Schools should have more sports.', 'Tese: as escolas deveriam ter mais esportes.'], ['Argument: Sports improve health.', 'Argumento: esportes melhoram a saúde.'], ['Evidence: A study shows active students sleep better.', 'Evidência: um estudo mostra que alunos ativos dormem melhor.']],
      ['Repetir a opinião várias vezes, sem dar razões.', 'Apresentar razões e evidências.', 'Repetir não convence; provar convence.'],
      ['"60% of teens use their phones before sleeping." Isso é:', ['uma evidência', 'uma opinião', 'uma conclusão'], 0, 'É um dado → evidência.']),

    // ======================================================== Trilha Base (as demais usam as fichas do 6º ano)
    'b-havehas': F(
      '**have** = ter, com **I, you, we, they**. **has** = tem, com **he, she, it**.',
      ["Negativa: *don't have / doesn't have* (depois de doesn't, volta para have).", "Pergunta: *Do you have…? / Does she have…?*"],
      [['I have a cat.', 'Eu tenho um gato.'], ['She has two brothers.', 'Ela tem dois irmãos.'], ["He doesn't have a bike.", 'Ele não tem bicicleta.']],
      ['She have a dog.', 'She has a dog.', 'she → has.'],
      ['My grandpa ___ a big garden.', ['have', 'has', 'haves'], 1, 'grandpa = he → has.']),
    'b-can': F(
      "**can** = saber / conseguir fazer (habilidade): *I can swim*. **can't** = não sei / não consigo. O verbo depois fica na forma base.",
      ['Igual para todos: *I can, she can, they can* (sem -s).', 'Pergunta: *Can you dance?* — *Yes, I can. / No, I can\'t.*'],
      [['I can ride a bike.', 'Eu sei andar de bicicleta.'], ["Fish can't fly.", 'Peixes não conseguem voar.'], ['Can you speak English?', 'Você sabe falar inglês?']],
      ['She cans dance.', 'She can dance.', 'can não muda com she.'],
      ['Birds ___ fly, but penguins ___ .', ["can / can't", "can't / can", 'can / can'], 0, "Pássaros voam; pinguins não → can / can't."]),
    'b-like': F(
      "**like** = gostar. *I like pizza.* / *I don't like fish.* Com **he, she, it**: *likes* / *doesn't like*. Comidas e bebidas: *apple, bread, rice, beans, juice, milk, water*.",
      ['Depois de like, o nome da comida vem direto: *I like apples* (sem "de").', "*Do you like…?* — *Yes, I do. / No, I don't.*"],
      [['I like orange juice.', 'Eu gosto de suco de laranja.'], ["He doesn't like milk.", 'Ele não gosta de leite.'], ['Do you like rice and beans?', 'Você gosta de arroz e feijão?']],
      ['I like of chocolate.', 'I like chocolate.', 'Em inglês não existe o "de" depois de like.'],
      ['Maria ___ bananas.', ['like', 'likes', 'liking'], 1, 'Maria = she → likes.']),
    'b-lugares': F(
      '**There is** (singular) / **There are** (plural) = **há / tem**. Lugares: *school, park, library, bakery, hospital*. Preposições de lugar: **in** (dentro), **on** (em cima), **under** (embaixo), **next to** (ao lado), **between** (entre).',
      ["Negativa: *there isn't / there aren't*. Pergunta: *Is there…? / Are there…?*", '*between* + duas coisas: *between the bank and the park*.'],
      [['There is a park near my house.', 'Tem um parque perto da minha casa.'], ['There are two libraries in my city.', 'Há duas bibliotecas na minha cidade.'], ['The cat is under the table.', 'O gato está embaixo da mesa.']],
      ['There is three bakeries.', 'There are three bakeries.', 'Plural → there are.'],
      ['The bank is ___ the school and the park.', ['between', 'under', 'on'], 0, 'Entre duas coisas → between.']),
  };
}

// ============================================================
// Leitura, edição e validação
// ============================================================

function habilidadeExiste_(id) {
  return Object.keys(HABILIDADES).some(function (s) { return HABILIDADES[s].some(function (h) { return h.id === id; }); });
}

function nomeHabilidade_(id) {
  let nome = id;
  Object.keys(HABILIDADES).forEach(function (s) { HABILIDADES[s].forEach(function (h) { if (h.id === id) nome = h.nome; }); });
  return nome;
}

function fichasEditadas_() {
  garantirAba_('Fichas');
  const mapa = {};
  lerTabela_('Fichas').forEach(function (l) {
    try { mapa[String(l.hab_id)] = { ficha: JSON.parse(l.ficha_json), linha: l._linha, atualizado_em: String(l.atualizado_em) }; } catch (e) { /* ignora linha corrompida */ }
  });
  return mapa;
}

/** Ficha em uso: a editada pelo professor ou a padrão (própria ou compartilhada). */
function fichaDe_(id, editadas, padrao) {
  if (editadas[id]) return editadas[id].ficha;
  return padrao[id] || padrao[ALIAS_FICHAS[id]] || null;
}

function validarFicha_(f) {
  f = f || {};
  const txt = function (v, max) { return String(v == null ? '' : v).trim().slice(0, max || 600); };
  const ficha = {
    regra: txt(f.regra, 1200),
    atencao: (Array.isArray(f.atencao) ? f.atencao : []).map(function (a) { return txt(a); }).filter(String).slice(0, 5),
    exemplos: (Array.isArray(f.exemplos) ? f.exemplos : []).map(function (e) { return { en: txt(e && e.en, 300), pt: txt(e && e.pt, 300) }; })
      .filter(function (e) { return e.en; }).slice(0, 6),
    erro: { errado: txt(f.erro && f.erro.errado, 300), certo: txt(f.erro && f.erro.certo, 300), porque: txt(f.erro && f.erro.porque, 400) },
    check: null,
  };
  if (!ficha.regra) throw new Error('Escreva a regra (explicação) da ficha.');
  const c = f.check || {};
  const opcoes = (Array.isArray(c.opcoes) ? c.opcoes : []).map(function (o) { return txt(o, 200); }).filter(String);
  if (txt(c.pergunta)) {
    if (opcoes.length < 2) throw new Error('O Check precisa de pelo menos 2 alternativas.');
    const correta = Number(c.correta);
    if (!(correta >= 0 && correta < opcoes.length)) throw new Error('Marque a alternativa correta do Check.');
    ficha.check = { pergunta: txt(c.pergunta, 400), opcoes: opcoes.slice(0, 4), correta: correta, explicacao: txt(c.explicacao, 400) };
  }
  return ficha;
}

// ============================================================
// Aluno: o "📖 Study" do treino
// ============================================================

/** Habilidades dos cadeados do treino, na ordem em que aparecem (sem repetir). */
function habilidadesDoCaso_(caso) {
  const ids = [];
  (caso.dados.travas || []).forEach(function (t) {
    const e = (t.etiquetas || [])[0];
    const h = e ? habilidadeDe_(caso.serie, e.foco, e.codigo) : null;
    if (h && ids.indexOf(h.id) === -1) ids.push(h.id);
  });
  return ids;
}

function fichasLidas_(email) {
  garantirAba_('FichasLidas');
  const lidas = {};
  lerTabela_('FichasLidas').forEach(function (l) { if (String(l.email).toLowerCase() === email) lidas[String(l.hab_id)] = true; });
  return lidas;
}

/** Fichas do treino para a tela do caso. obrigatoria = alguma ficha ainda não foi lida até o fim por este aluno. */
function estudoDoTreino_(caso, email, professor, sempreObrigatoria) {
  const editadas = fichasEditadas_();
  const padrao = fichasPadrao_();
  const lidas = professor ? {} : fichasLidas_(email);
  const fichas = habilidadesDoCaso_(caso).map(function (id) {
    const f = fichaDe_(id, editadas, padrao);
    return f ? { id: id, nome: nomeHabilidade_(id).replace(/^Base: /, ''), ficha: f, lida: !!lidas[id] } : null;
  }).filter(Boolean);
  return { fichas: fichas, obrigatoria: !professor && (!!sempreObrigatoria || fichas.some(function (f) { return !f.lida; })) };
}

/** Ficha de uma habilidade para o aluno abrir pelo "O que estudar" da TDA corrigida (não marca como lida). */
function alunoFichaHabilidade(id) {
  jogador_();
  id = String(id || '');
  if (!habilidadeExiste_(id)) throw new Error('Habilidade não encontrada.');
  const f = fichaDe_(id, fichasEditadas_(), fichasPadrao_());
  if (!f) throw new Error('Esta habilidade ainda não tem ficha.');
  return { id: id, nome: nomeHabilidade_(id).replace(/^Base: /, ''), ficha: f };
}

/** O aluno rolou a teoria até o fim: nas próximas vezes essas fichas ficam opcionais. */
function alunoMarcarFichasLidas(ids) {
  const eu = jogador_();
  if (eu.professor) return true;
  const validos = (Array.isArray(ids) ? ids : []).map(String).filter(habilidadeExiste_);
  if (!validos.length) return true;
  comTrava_(function () {
    const ja = fichasLidas_(eu.email);
    const agora = new Date();
    const novas = validos.filter(function (id, i) { return !ja[id] && validos.indexOf(id) === i; })
      .map(function (id) { return linhaDe_('FichasLidas', { email: eu.email, hab_id: id, lida_em: agora }); });
    if (novas.length) {
      const aba = garantirAba_('FichasLidas');
      aba.getRange(aba.getLastRow() + 1, 1, novas.length, CABECALHOS.FichasLidas.length).setValues(novas);
    }
  });
  return true;
}

// ============================================================
// Professor: revisar e editar as fichas (aba Habilidades)
// ============================================================

/** Fichas de uma série (ou "base") com a indicação de editada / compartilhada. */
function profFichas(serie) {
  exigirProfessor_();
  const lista = HABILIDADES[serie];
  if (!lista) throw new Error('Série inválida.');
  const editadas = fichasEditadas_();
  const padrao = fichasPadrao_();
  return lista.map(function (h) {
    return {
      id: h.id, nome: h.nome, codigo: h.codigo, ficha: fichaDe_(h.id, editadas, padrao),
      editada: !!editadas[h.id], atualizado_em: editadas[h.id] ? editadas[h.id].atualizado_em : '',
      compartilhada: !editadas[h.id] && ALIAS_FICHAS[h.id] ? nomeHabilidade_(ALIAS_FICHAS[h.id]) : '',
    };
  });
}

function profSalvarFicha(id, ficha) {
  exigirProfessor_();
  id = String(id || '');
  if (!habilidadeExiste_(id)) throw new Error('Habilidade não encontrada.');
  const limpa = validarFicha_(ficha);
  comTrava_(function () {
    const aba = garantirAba_('Fichas');
    const atual = fichasEditadas_()[id];
    const linha = linhaDe_('Fichas', { hab_id: id, ficha_json: JSON.stringify(limpa), atualizado_em: new Date() });
    if (atual) aba.getRange(atual.linha, 1, 1, linha.length).setValues([linha]);
    else aba.appendRow(linha);
  });
  return true;
}

/** Volta a ficha para o texto padrão. */
function profRestaurarFicha(id) {
  exigirProfessor_();
  comTrava_(function () {
    const atual = fichasEditadas_()[String(id)];
    if (atual) garantirAba_('Fichas').deleteRow(atual.linha);
  });
  return true;
}
