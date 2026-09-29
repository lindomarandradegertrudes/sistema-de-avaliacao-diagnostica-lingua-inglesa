# English Learning App — Guia de instalação

Faça tudo com a sua **conta institucional**.

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
