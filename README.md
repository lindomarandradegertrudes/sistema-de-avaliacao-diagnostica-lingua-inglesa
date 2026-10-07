# English Learning App

**Sistema de Avaliação Diagnóstica – Língua Inglesa**

Sistema web para professores de Língua Inglesa do Ensino Fundamental II (6º ao 9º ano) avaliarem e acompanharem a aprendizagem das turmas, formarem **grupos heterogêneos** de até 5 alunos, que misturam alunos com mais e com menos conhecimento, e aplicarem **jogos investigativos** baseados no Mapa de Progressão da Rede Municipal de Joinville.

Roda **gratuitamente** no Google Workspace da escola: Google Apps Script e Google Planilhas. Não precisa de servidor próprio.

## Funcionalidades

- **Cadastro:** o aluno se cadastra no primeiro acesso com a conta Google da escola, e o professor pode editar ou excluir cadastros.
- **Questionários:** há o diagnóstico e os mensais, respondidos online (com correção automática) ou impressos (com lançamento das respostas). As questões podem ser geradas com IA a partir do conteúdo do mês, o que é opcional.
- **TDAs (Tarefas de Desempenho Autêntico):** a entrega final do mês pode ser individual ou em grupo, feita no papel ou no sistema, com texto, link e anexos. A correção usa uma rubrica de 4 níveis, e o aluno vê a nota, o feedback e a rubrica.
- **Entregas diárias com bônus:** o professor marca a entrega da tarefa de cada aula. O percentual de entregas no período vira um ponto extra (vermelho 0 · laranja 0,2 · amarelo 0,5 · verde 1,0), e o aluno acompanha numa barra colorida no painel dele.
- **Monitoramento de saídas da tela:** questionários e TDAs registram quando o aluno troca de aba ou de janela.
- **Níveis:** Iniciante, Básico, Intermediário e Avançado, calculados pela média de todas as avaliações. As faixas são configuráveis.
- **Grupos mensais:** a sugestão automática distribui os alunos em serpentina e depois equilibra as médias dos grupos. O professor pode fazer ajustes manuais e decide, a cada mês, se mantém ou refaz os grupos. O aluno vê apenas o próprio grupo, sem níveis nem notas.
- **Relatórios:**
  - comparativo das turmas;
  - tópicos com mais erros;
  - evolução por aluno (inclui as notas de jogos);
  - impressão em PDF e exportação para Google Planilhas.

### Jogos investigativos

- **Casos em visual de HQ:** o aluno analisa evidências (posts, mensagens, notícias, áudios) e abre cadeados. Há escape room, análise de evidências e descoberta de regras gramaticais.
- **Recursos de apoio em cada caso:**
  - comandos curtos em inglês, com ícones e ajuda em português;
  - glossário ao tocar nas palavras;
  - áudio com a voz do Chrome, com opção de texto;
  - blocos de palavras no lugar da digitação.
- **Correção no servidor:** a resposta certa nunca chega ao navegador do aluno. Cada dica custa 5 pontos e cada erro custa 4. No 3º erro, a resposta é revelada e o cadeado vale 0. Só a 1ª jogada vale; as seguintes são treino.
- **Sagas por série:**
  - 6º *Lost & Found Agency*;
  - 7º *Time Detectives*;
  - 8º *Future Lab 2050*;
  - 9º *Fact Checkers HQ*.
- **3 degraus de dificuldade (★ ★★ ★★★):** cada aluno joga a versão do seu degrau. O degrau começa pelo nível do aluno e muda com o desempenho: sobe com 80+ pontos em 2 missões seguidas e desce abaixo de 40.
- **Trilha Base · Detective Academy:** reposição de aprendizagem igual para o 6º ao 9º ano, sem nota. Começa por um tutorial guiado e tem 8 missões, que abrem em sequência.
- **Ciclos com nota:** o professor libera de 1 a 3 casos por turma, com prazo. Também pode incluir até 2 casos de **reforço individual**, escolhidos pelas dificuldades de cada aluno. A nota mensal de jogos entra no nível quando o aluno conclui o ciclo ou quando o professor o fecha.
- **Habilidades e dificuldades:**
  - catálogo de habilidades do Mapa por série, com etiquetagem automática de questões e cadeados;
  - mapa da turma (aluno × habilidade) e ficha do aluno;
  - grupos de reforço sugeridos.
- **Meu reforço:** treinos curtos de 4 cadeados, sem nota, nas habilidades mais fracas de cada aluno.
- **Banco do ano inteiro:** 2 casos por período do Mapa 2026 em cada série (6º ao 9º), cada um em 3 degraus, e exercícios avulsos de leitura e gramática para o Meu reforço.
- **Criar com IA, sem custo:** o app monta um pedido com as regras dos jogos e o Mapa do período; o professor cola no claude.ai (conta gratuita) e importa a resposta. O app converte, valida (apontando onde está o erro) e salva como rascunho. Exercícios curtos gerados só entram no Meu reforço depois de liberados.
- **Relatórios de jogos:**
  - turma por caso (pontos, erros, dicas e cadeados para retomar em aula);
  - evolução do aluno (degrau mês a mês, ciclos e habilidades: começo × agora);
  - resumo para a coordenação por trimestre, com impressão em PDF;
  - exportação de todos os dados dos jogos para uma planilha nova no Drive.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `Codigo.gs` | Instalação, acesso à planilha, permissões, cadastro e painel |
| `Questionarios.gs` | Questionários, correção, lançamento, níveis e geração com IA |
| `Grupos.gs` | Leitura e gravação dos grupos mensais |
| `Relatorios.gs` | Comparativo, tópicos, evolução e exportação |
| `Tda.gs` | TDAs: entregas, anexos no Drive e correção por rubrica |
| `ProfTda.html` | Tela de entregas e correção das TDAs |
| `Diarias.gs` | Entregas diárias: períodos, aulas, marcações, bônus e fechamento |
| `ProfDiarias.html` | Aba "Entregas diárias" do professor |
| `Professor.html` | Painel do professor |
| `ProfGrupos.html` / `ProfRelatorios.html` | Abas de Grupos e Relatórios |
| `Casos.gs` | Motor dos jogos: casos, correção dos cadeados, jogadas, degraus e Trilha Base |
| `Ciclos.gs` | Ciclos por turma com prazo, nota mensal de jogos e reforço individual |
| `Habilidades.gs` | Catálogo de habilidades do Mapa e etiquetagem automática |
| `Dificuldades.gs` | Dificuldades por habilidade, mapa da turma e treinos "Meu reforço" |
| `CasosBase.gs` | Trilha Base: tutorial e 8 missões em 3 degraus |
| `CasosPadrao.gs` / `CasosAno.gs` | Casos do ano de outubro e novembro (6º–9º) em 3 degraus |
| `CasosAno6.gs` … `CasosAno9.gs` | Banco do ano inteiro de cada série e exercícios avulsos do Meu reforço |
| `Gerador.gs` | Criar com IA: pedido para o claude.ai, conversão e validação da resposta |
| `RelatoriosJogos.gs` / `ProfRelJogos.html` | Aba "Relatórios de jogos": turma por caso, evolução, coordenação e exportação |
| `Caso.html` / `CasoEstilo.html` / `CasoMotor.html` | Tela do jogo (visual de HQ e motor no navegador) |
| `ProfJogos.html` | Aba "Jogos" do professor: ciclos, casos do ano, Criar com IA, Trilha Base e resultados |
| `ProfDificuldades.html` | Aba "Habilidades" do professor: mapa da turma, ficha e grupos de reforço |
| `Aluno.html` | Tela do aluno (inclui o cartão Missions) |
| `Estilo.html` | Estilos compartilhados |
| `diagnosticos-2026.json` | Diagnósticos de 6º a 9º ano, baseados no Mapa de Progressão 2026 da Rede Municipal de Joinville |

## Instalação

Siga o passo a passo em [GUIA-INSTALACAO.md](GUIA-INSTALACAO.md). Em resumo:

1. Crie uma planilha no Google Drive e abra **Extensões > Apps Script**.
2. Crie os arquivos acima no editor e cole o conteúdo de cada um.
3. Execute a função `instalar`.
4. Publique como **App da Web**: *Executar como: Eu*; *Acesso: qualquer pessoa do domínio da escola*.

## Privacidade

Todos os dados dos alunos ficam somente na planilha do professor, dentro da conta Google da escola. O uso de IA é opcional:
- a geração de questões envia apenas o conteúdo pedagógico;
- o comentário da frase final dos jogos envia somente a frase escrita pelo aluno e a tarefa, sem nome nem e-mail;
- o pedido para criar casos com IA é copiado pelo professor e leva apenas a série, o período do Mapa e o tema, sem dados de alunos.

## Autor

Lindomar Andrade Gertrudes, professor de Língua Inglesa.
