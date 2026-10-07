# English Learning App — Guia de instalação

Faça tudo com a sua **conta institucional**.

---

# Etapa 3 · Habilidades, dificuldades e reforço individual

## A. Atualizar o código
**Antes de colar, deixe cada arquivo totalmente vazio (Ctrl+A, Delete).**

| Arquivo no editor | O que fazer |
|---|---|
| `Habilidades` | **arquivo novo:** **+ > Script**, nome `Habilidades`, cole **Habilidades.gs** |
| `Dificuldades` | **arquivo novo:** **+ > Script**, nome `Dificuldades`, cole **Dificuldades.gs** |
| `ProfDificuldades` | **arquivo novo:** **+ > HTML**, nome `ProfDificuldades`, cole **ProfDificuldades.html** |
| `Casos`, `Ciclos`, `Codigo` | apague tudo e cole as novas versões (.gs) |
| `Professor`, `ProfJogos`, `Aluno`, `CasoMotor` | apague tudo e cole as novas versões (.html) |

Depois: **Salvar** → **Nova versão** → **F5**. Não precisa rodar `instalar` (a aba Ciclos ganha as colunas novas sozinha).

## B. Usar
1. **Aba Habilidades:** escolha a turma. A tabela mostra o acerto de cada aluno em cada habilidade do Mapa (vermelho = dificuldade: abaixo de 60% com pelo menos 3 itens). Clique no nome do aluno para ver a ficha. Embaixo, os **grupos de reforço** sugeridos.
2. **Ciclo misto:** ao criar ou editar um ciclo, escolha **Reforço individual: 0, 1 ou 2 casos**. Na primeira vez que o aluno abre o painel, o sistema escolhe para ele casos da série (de meses anteriores ou do mês) que treinam as habilidades em que ele mais erra. Esses casos também valem nota.
3. **Meu reforço:** o aluno vê em Missions o cartão **💪 Meu reforço** com as habilidades a treinar e o botão **TRAIN**: sessões de 4 cadeados curtos, sem nota, que podem ser repetidas.

**De onde vêm os dados:** questões do diagnóstico e dos mensais (respondidas online ou lançadas com letras), rubricas das TDAs, cadeados dos casos, da Trilha Base e do Meu reforço. O mais recente pesa mais. As questões são ligadas às habilidades automaticamente pelo tópico; questões novas já entram etiquetadas.

---

# Ajuste da Etapa 2 · nota só entra no nível ao concluir o ciclo

Substitua **Ciclos** (.gs), **Aluno** e **ProfJogos** (.html) → Salvar → Nova versão → F5.

---

# Etapa 2 · Ciclos com nota e casos do ano em degraus

## A. Atualizar o código

| Arquivo no editor | O que fazer |
|---|---|
| `Ciclos` | **arquivo novo:** **+ > Script**, nome `Ciclos`, cole **Ciclos.gs** |
| `CasosAno` | **arquivo novo:** **+ > Script**, nome `CasosAno`, cole **CasosAno.gs** |
| `Casos`, `CasosPadrao`, `Codigo`, `Relatorios` | apague tudo e cole as novas versões (.gs) |
| `CasoMotor`, `ProfJogos`, `Aluno`, `Professor` | apague tudo e cole as novas versões (.html) |

Depois: **Salvar** → **Implantar > Gerenciar implantações > ✏️ > Nova versão > Implantar** → abra o app e aperte **F5**. Não precisa rodar `instalar` (a aba **Ciclos** é criada sozinha).

## B. Usar
1. Aba **Jogos** → **Carregar casos do ano**: entram outubro e novembro, cada caso com ★, ★★ e ★★★.
2. Se você tinha deixado o caso de outubro "Aberto" na Etapa 1, a coluna **Treino livre** vai mostrar **Misto**: escolha **Rascunho** (só no ciclo) ou **Aberto** (treino para todos).
3. **+ Novo ciclo**: escolha a série, marque as turmas, o título, o mês, o prazo e de 1 a 3 casos. É criado um ciclo para cada turma.
4. O aluno vê o ciclo no topo de **🕵️ Missions**, com o prazo, e joga a versão do seu degrau. Dentro do jogo aparece "vale nota até…".
5. **Resultados** do ciclo: degrau e pontos de cada caso (✔ no prazo, ⏰ fora do prazo), a **nota** e o botão **Prazo** para prorrogar só para um aluno.
6. **Fechar** o ciclo congela as notas. Reabrir volta a aceitar conclusões dentro do prazo.

**Regras da nota:** média dos casos do ciclo (todas as versões valem 100). A nota só entra no nível quando o aluno **conclui todos os casos no prazo** ou quando você **fecha o ciclo** (aí quem fez só parte recebe 0 nos casos que faltaram; quem não fez nenhum fica sem nota). Antes disso o aluno vê só a média parcial. **Feche o ciclo depois do prazo.** A nota tem o mesmo peso de um questionário mensal e aparece nos Relatórios como "Jogos".

---

# Trilha Base · Detective Academy (reposição de aprendizagem)

## A. Atualizar o código

| Arquivo no editor | O que fazer |
|---|---|
| `CasosBase` | **arquivo novo:** **+ > Script**, nome `CasosBase`, cole **CasosBase.gs** |
| `Casos` | apague tudo e cole **Casos.gs** |
| `CasoMotor` | apague tudo e cole **CasoMotor.html** |
| `CasoEstilo` | apague tudo e cole **CasoEstilo.html** |
| `ProfJogos` | apague tudo e cole **ProfJogos.html** |
| `Aluno` | apague tudo e cole **Aluno.html** |

Depois: **Salvar** → **Implantar > Gerenciar implantações > ✏️ > Nova versão > Implantar**. Não precisa rodar `instalar`. Se a tela não mudar, recarregue com **F5**.

## B. Usar
1. Aba **Jogos** → **Carregar Trilha Base** → **Abrir a trilha inteira**.
2. Teste: na linha de cada missão, os botões **Tutorial / ★ / ★★ / ★★★** abrem cada degrau.
3. O aluno vê em **🕵️ Missions** a **Detective Academy**: começa pela **Mission 0** (tutorial guiado) e cada missão libera a seguinte.
4. O degrau é automático: Iniciante ou sem nível = ★, Básico/Intermediário = ★★, Avançado = ★★★. Sobe com 80+ pontos em 2 missões seguidas e desce abaixo de 40.
5. **Resultados** de cada missão mostram, por turma, o degrau atual do aluno, o degrau que ele jogou, quantas missões já fez e os pontos por cadeado.

A Trilha Base **não vale nota**. Os casos do ano continuam na mesma aba, logo abaixo.

---

# Jogos investigativos — Etapa 1 (motor dos casos)

## A. Atualizar o código

| Arquivo no editor | O que fazer |
|---|---|
| `Casos.gs` | **arquivo novo:** clique em **+ > Script**, dê o nome `Casos` e cole **Casos.gs** |
| `CasosPadrao.gs` | **arquivo novo:** **+ > Script**, nome `CasosPadrao`, cole **CasosPadrao.gs** |
| `Caso.html` | **arquivo novo:** **+ > HTML**, nome `Caso`, cole **Caso.html** |
| `CasoEstilo.html` | **arquivo novo:** **+ > HTML**, nome `CasoEstilo`, cole **CasoEstilo.html** |
| `CasoMotor.html` | **arquivo novo:** **+ > HTML**, nome `CasoMotor`, cole **CasoMotor.html** |
| `ProfJogos.html` | **arquivo novo:** **+ > HTML**, nome `ProfJogos`, cole **ProfJogos.html** |
| `Codigo.gs`, `Professor.html`, `Aluno.html` | apague tudo e cole as novas versões |

Depois:
1. Execute **instalar**. Ela cria as abas **Casos** e **Jogadas**.
2. Publique em **Implantar > Gerenciar implantações > ✏️ > Nova versão**.

## B. Usar
1. No painel, abra a aba **Jogos** e clique em **Carregar casos padrão**. Entram 4 casos de outubro, um por série, todos como **Rascunho**.
2. Clique em **Testar** para jogar como aluno. As suas jogadas de teste não aparecem nos resultados. Dentro do jogo, **PLAY AGAIN** recomeça.
3. Mude a situação para **Aberto**. O caso aparece para os alunos da série no cartão **🕵️ Missions**.
4. Em **Resultados**, escolha a turma e veja os pontos de cada aluno por cadeado (verde = cheio, amarelo = perdeu pontos, vermelho = 0 ou revelado), as dicas, os erros e a frase final. **Zerar** apaga as jogadas do aluno nesse caso, e ele joga de novo valendo.

**Regras:** cada caso vale 100 pontos, divididos entre os cadeados. Cada dica custa 5 pontos e cada tentativa errada custa 4. Na 3ª tentativa errada, a resposta aparece e o cadeado vale 0. Resposta incompleta não custa nada. Só a **1ª jogada** vale; as seguintes são treino. A correção é feita no servidor: a resposta certa nunca vai para o computador do aluno.

**Frase final:** é um bônus, sem nota. Se a chave da API do Claude estiver cadastrada em Configurações, o aluno recebe um comentário curto em português. Sem a chave, aparece só "Obrigado! O professor vai ler", e você lê a frase em Resultados.

**Nesta etapa os jogos ainda não entram no nível.** Os ciclos com prazo por turma e a nota mensal chegam na Etapa 2.

**Voz e Chromebook:** o áudio usa a voz em inglês do Chrome, a mesma do English Kids App. O botão **📄 TEXT** mostra a transcrição.

---

# Exceção do monitoramento de tela (uso do Canva)

Substitua **Codigo.gs, Questionarios.gs, Tda.gs, Professor.html e Aluno.html**. Depois execute **instalar**, que acrescenta a coluna `monitorar` na aba Questionarios, e publique uma **nova versão**.

No editor de cada questionário ou TDA aparece a caixa **"Monitorar saídas da tela"**:
- **marcada (padrão):** o aluno é avisado e você vê as saídas nos Resultados;
- **desmarcada:** o aluno pode usar o Canva ou outros sites nessa atividade, sem aviso e sem registro.

As atividades já existentes continuam monitoradas. O sistema não tem como liberar só um site específico, porque o navegador não informa para onde o aluno foi.

---

# Entregas diárias (bônus)

## A. Atualizar o código

| Arquivo no editor | O que fazer |
|---|---|
| `Diarias.gs` | **arquivo novo:** clique em **+ > Script**, dê o nome `Diarias` e cole **Diarias.gs** |
| `ProfDiarias.html` | **arquivo novo:** clique em **+ > HTML**, dê o nome `ProfDiarias` e cole **ProfDiarias.html** |
| `Codigo.gs`, `Professor.html`, `Aluno.html` | apague tudo e cole as novas versões |

Depois faça o seguinte:
1. Execute **instalar**. Ela cria as abas **Periodos**, **Aulas** e **EntregasDiarias** e as faixas do bônus em Config.
2. Publique em **Implantar > Gerenciar implantações > ✏️ > Nova versão**.

## B. Usar
1. **Crie o período:** em **Entregas diárias > Períodos**, dê um nome (ex.: "3º trimestre") e as datas de início e fim. Os períodos não podem se sobrepor.
2. **Registre a aula:** escolha a turma e clique em **+ Aula**. Informe a data e, se quiser, a tarefa do dia.
3. **Marque as entregas:** clique na célula do aluno para alternar entre ✅ entregou, ❌ não entregou, ➖ dispensado (falta justificada, por exemplo) e vazio. O botão **✅ todos** marca como entregue quem ainda está em branco naquela aula. Tudo é salvo sozinho em cerca de 1 segundo.
4. **Acompanhe o bônus:** ao lado de cada aluno aparecem as entregas, o percentual e o bônus na cor da faixa.
5. **Feche o período:** o botão **Fechar período e gerar planilha** bloqueia as marcações de todas as turmas e cria no seu Drive a planilha com o bônus de cada aluno. Você pode reabrir se precisar corrigir.

**Regra do bônus:** conta o percentual de tarefas entregues no período. As aulas com ➖ ou em branco não entram na conta. As faixas são editáveis em Configurações.

| Cor | Bônus | Faixa padrão |
|---|---|---|
| 🟢 Verde | 1,0 | 100% |
| 🟡 Amarelo | 0,5 | 80–99% |
| 🟠 Laranja | 0,2 | 50–79% |
| 🔴 Vermelho | 0 | abaixo de 50% |

**O que o aluno vê**, em "Minhas tarefas diárias":
- a barra na cor da faixa e o bônus atual;
- quantas tarefas entregou;
- o que falta para a próxima cor;
- a lista das aulas com ✅, ❌, ➖ e ⏳ (aguardando o professor).

O bônus **não** altera o nível nem os grupos.

---

# TDAs (Tarefas de Desempenho Autêntico)

## A. Atualizar o código

| Arquivo no editor | O que fazer |
|---|---|
| `Tda.gs` | **arquivo novo:** clique em **+ > Script**, dê o nome `Tda` e cole **Tda.gs** |
| `ProfTda.html` | **arquivo novo:** clique em **+ > HTML**, dê o nome `ProfTda` e cole **ProfTda.html** |
| `Codigo.gs`, `Questionarios.gs`, `Relatorios.gs` | apague tudo e cole as novas versões |
| `Professor.html`, `Aluno.html`, `ProfRelatorios.html` | apague tudo e cole as novas versões |

Depois faça o seguinte:
1. Execute a função **instalar**. Ela cria a aba **Entregas** na planilha.
2. Autorize o **Google Drive** quando o Google pedir. É onde ficam os anexos dos alunos.
3. Publique em **Implantar > Gerenciar implantações > ✏️ > Nova versão**.

## B. Cadastrar a TDA do mês
Só a TDA da **entrega final**, a da última aula, vai para o sistema. As TDAs das aulas anteriores são etapas feitas em sala.

- **Pela skill de planejamento:** peça "gere também o JSON das TDAs para o English Learning App" e cole o resultado em **Questionários > Importar JSON**. Se vierem várias TDAs, o sistema importa **só a última**.
- **À mão:** clique em **+ Novo questionário**, escolha o tipo **TDA** e preencha a situação-problema, o produto final, as tarefas, os critérios e a rubrica.
- **Modo:** escolha **Individual** ou **Em grupo**. No modo grupo, a TDA usa os grupos do mês.

## C. Aplicar
- **No sistema:** clique em **Liberar para alunos**. O aluno vê a TDA em "Tarefas (TDA)" e envia texto, **link** (Canva, Padlet…) e/ou até **3 anexos** (foto, PDF, Word, PowerPoint). Ele pode atualizar a entrega até você corrigir. No modo grupo, qualquer integrante envia, e a entrega vale para o grupo todo.
- **No papel:** use **Imprimir TDA**, na tela da TDA ou no editor.
- **Onde ficam os anexos:** na pasta **"English Learning App – Anexos das TDAs"** do seu Drive.

## D. Corrigir
1. Clique em **Resultados** na TDA e escolha a turma.
2. Clique em **Corrigir** no aluno ou no grupo. Aparecem a entrega (texto, link e anexos) e a rubrica.
3. Clique no nível de cada critério e escreva o comentário.
4. **No modo grupo**, a nota vale para os integrantes marcados. O botão **Ajustar** muda a nota de um aluno específico.
5. **Trabalho feito no papel:** corrija do mesmo jeito, mesmo sem entrega online.

**Nota** = soma dos níveis ÷ (4 × número de critérios). Ela entra na média do nível com o **mesmo peso** de um questionário.

## E. O que o aluno vê
Depois da correção, o aluno vê a **nota**, o **seu comentário** e a **rubrica com o nível alcançado em cada critério destacado**. A partir daí, a entrega não pode mais ser alterada. Se precisar reabrir, use **Apagar correção**.

---

# Etapa 4 — Relatórios

## A. Atualizar o código

| Arquivo no editor | O que fazer |
|---|---|
| `Relatorios.gs` | **arquivo novo:** clique em **+ > Script**, dê o nome `Relatorios` e cole **Relatorios.gs** |
| `ProfRelatorios.html` | **arquivo novo:** clique em **+ > HTML**, dê o nome `ProfRelatorios` e cole **ProfRelatorios.html** |
| `Professor.html` | apague tudo e cole o novo **Professor.html** |
| os outros | não mudaram |

Salve e depois publique em **Implantar > Gerenciar implantações > ✏️ > Nova versão > Implantar**.

## B. Usar
Abra a aba **Relatórios**. Ela tem três visões:
- **Comparativo das turmas:** para cada turma, os avaliados, a média e a barra colorida dos 4 níveis, com o total por série. Embaixo aparece a **média por mês** de cada turma.
- **Tópicos com mais erros:** escolha a série e veja os tópicos do menor para o maior acerto. Vermelho indica menos de 50%, amarelo de 50% a 69% e azul 70% ou mais. Serve para planejar retomadas de conteúdo.
- **Evolução por aluno:** escolha a turma e o aluno. Aparecem o nível atual, a média, um gráfico com a nota de cada avaliação e a média acumulada sobre as faixas de nível, a lista de avaliações e o desempenho por tópico.

Botões:
- **Imprimir / PDF:** imprime a visão aberta. Para salvar em PDF, escolha "Salvar como PDF" na janela de impressão.
- **Exportar para planilha:** cria uma planilha nova no seu Google Drive com as abas Turmas, Alunos (nota de cada questionário), Tópicos e Grupos. É a forma pronta de enviar os dados à coordenação.

O detalhe por tópico só existe para as respostas online e para as provas impressas lançadas **com letras**. Lançamentos feitos só com o número de acertos entram na média, mas não na análise por tópico.

---

# Etapa 3 — Grupos

## A. Atualizar o código
No editor do Apps Script:

| Arquivo no editor | O que fazer |
|---|---|
| `Grupos.gs` | **arquivo novo:** clique em **+ > Script**, dê o nome `Grupos` e cole **Grupos.gs** |
| `ProfGrupos.html` | **arquivo novo:** clique em **+ > HTML**, dê o nome `ProfGrupos` e cole **ProfGrupos.html** |
| `Professor.html` | apague tudo e cole o novo **Professor.html** |
| os outros | não mudaram |

Salve e depois publique em **Implantar > Gerenciar implantações > ✏️ > Nova versão > Implantar**.

## B. Formar os grupos (todo mês)
1. Abra a aba **Grupos** e escolha o **mês**. A tabela mostra a situação de cada turma:
   - **Definido:** os grupos do mês já foram aplicados.
   - **Pendente:** ainda estão valendo os grupos de um mês anterior.
   - **Sem grupos:** a turma ainda não tem grupos.
2. Clique em **Abrir** na turma e escolha uma das opções:
   - **Manter grupos atuais neste mês:** repete os grupos do mês anterior.
   - **✨ Gerar sugestão:** monta grupos novos, e cada clique gera uma combinação diferente.
3. Ajuste o que quiser pelo **"Mover para…"** de cada aluno: outro grupo, um **grupo novo** ou **fora dos grupos**.
4. Clique em **Aplicar grupos**. Os alunos passam a ver o novo grupo na hora.
5. **Imprimir grupos** gera a lista para a sala, só com os nomes, sem níveis.

**Como a sugestão é montada:** os alunos são ordenados pela média e distribuídos em serpentina (1→7, 7→1…), o que coloca em cada grupo alunos com mais e com menos conhecimento. Depois, o sistema troca alunos de **mesmo nível** entre os grupos até que as médias dos grupos fiquem parecidas. Nenhum grupo passa de 5 alunos.

**Alunos sem avaliação** ficam em "Fora dos grupos" até fazerem o teste. Depois de avaliados, encaixe-os com "Mover para…" ou gere uma nova sugestão.

---

# Etapa 2 — Questionários e diagnóstico

A Etapa 2 inclui:
- a aba **Questionários**, onde você cria, edita, importa e libera questionários;
- a geração de questões com IA, que é opcional;
- a impressão da prova, da folha de respostas e do gabarito;
- o lançamento das provas impressas;
- os resultados por turma e o acerto por questão;
- o **nível** de cada aluno na aba Alunos;
- na tela do aluno, a lista de questionários pendentes para responder online.

## A. Atualizar o código
No editor do Apps Script (**Extensões > Apps Script** na planilha):

| Arquivo no editor | O que fazer |
|---|---|
| `Código.gs` | apague tudo e cole o novo **Codigo.gs** |
| `Questionarios.gs` | **arquivo novo:** clique em **+ > Script**, dê o nome `Questionarios` e cole **Questionarios.gs** |
| `Professor.html` | apague tudo e cole o novo **Professor.html** |
| `Aluno.html` | apague tudo e cole o novo **Aluno.html** |
| `Estilo.html` | não mudou |

Depois de colar, clique no **disquete** para salvar.

## B. Autorizar
1. Selecione a função **instalar** e clique em **▶ Executar**.
2. O Google vai pedir uma **nova permissão**, que serve para o sistema conectar-se à IA. Clique em **Revisar permissões > Avançado > Acessar > Permitir**.

## C. Publicar a nova versão
Clique em **Implantar > Gerenciar implantações > ✏️ (Editar) > Versão: Nova versão > Implantar**. O link continua o mesmo.

## D. Importar os diagnósticos
1. Abra o painel e vá em **Questionários > Importar JSON**.
2. Abra o arquivo **diagnosticos-2026.json** no Bloco de Notas, aperte **Ctrl+A** e depois **Ctrl+C**, cole no painel e clique em **Importar**.
3. Os 4 diagnósticos (6º ao 9º ano, com 15 questões cada) aparecem como **Rascunho**.
4. Clique em **Editar** para revisar as questões. Você pode mudar qualquer questão até o primeiro aluno responder.

## E. Aplicar
- **Online:** clique em **Liberar para alunos**. Os alunos da série veem o diagnóstico ao abrir o link e respondem uma única vez. A correção é automática.
- **Impresso:** clique em **Resultados > Imprimir prova**. A última página é a folha de respostas; o gabarito sai em **Imprimir gabarito**. Para lançar as notas, abra **Resultados**, escolha a turma e digite na coluna "Lançar impresso" as letras marcadas pelo aluno, em ordem (ex.: `BCADBBACDBCDAAC`, com `-` para questão em branco), ou só o número de acertos. Depois clique em **Salvar lançamentos**.
- **Encerrar:** clique em **Encerrar** quando o prazo terminar. Isso impede novas respostas online.

## F. Níveis
Na aba **Alunos**, cada aluno aparece com o **nível** (Iniciante, Básico, Intermediário ou Avançado) e a **média**. A média é simples, de todos os questionários: o diagnóstico mais os mensais. Os alunos não veem nível nem nota.

## Gerar questões com IA (opcional)
- **Com chave da API:** cadastre a chave em **Configurações > Geração de questões com IA**. A chave é criada em console.anthropic.com e o uso é pago por uso. Depois, no editor do questionário, preencha o **Conteúdo do mês** e clique em **✨ Gerar questões com IA**.
- **Sem chave:** me envie o conteúdo aqui no chat. Eu gero as questões e você cola em **Colar questões (JSON)** ou em **Importar JSON**.

---

# Etapa 1 — Instalação inicial (já feita)

## 1. Criar a planilha
1. No Google Drive, crie uma planilha em branco com o nome **Sistema de Grupos – Inglês**.
2. Abra o menu **Extensões > Apps Script**.

## 2. Colar o código

| Arquivo no editor | Como criar | Conteúdo |
|---|---|---|
| `Código.gs` | já existe; apague o conteúdo | cole **Codigo.gs** |
| `Questionarios.gs` | **+ > Script**, com o nome `Questionarios` | cole **Questionarios.gs** |
| `Estilo` | **+ > HTML**, com o nome `Estilo` | cole **Estilo.html** |
| `Professor` | **+ > HTML**, com o nome `Professor` | cole **Professor.html** |
| `Aluno` | **+ > HTML**, com o nome `Aluno` | cole **Aluno.html** |

## 3. Instalar
Selecione a função **instalar**, clique em **Executar** e autorize o acesso.

## 4. Publicar
1. Clique em **Implantar > Nova implantação > ⚙ > App da Web**.
2. Preencha:
   - **Executar como:** *Eu*
   - **Quem pode acessar:** *Qualquer pessoa em edu.joinville.sc.gov.br*

## Quando eu enviar uma nova versão do código
1. Substitua os arquivos e clique em **Salvar**.
2. Execute **instalar**.
3. Vá em **Implantar > Gerenciar implantações > ✏️ > Nova versão > Implantar**.

## Observações
- Os dados ficam só na sua planilha. Não edite os cabeçalhos da linha 1.
- Para dar acesso ao painel a outro professor, acrescente o e-mail dele em **Configurações**.
- Excluir um aluno remove apenas o cadastro. As respostas antigas ficam guardadas.
