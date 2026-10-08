# English Learning App — contexto unificado

Consolidação das conversas **"English Learning App"** (sistema de grupos, questionários, TDAs, entregas diárias, manual) e **"Aplicativo de jogos de inglês"** (jogos investigativos). As duas trabalham no mesmo projeto: `Lindomar\sistema-grupos-ingles`.
Gerado em 08/10/2026 a partir dos históricos das duas sessões. Este arquivo não tem dados de alunos nem chaves de API.

## 1. Projeto
- **Quem:** professor Lindomar de Língua Inglesa, Rede Municipal de Joinville. 12 turmas (6ºA a 9ºC), até 35 alunos.
- **Base pedagógica:** Mapa de Progressão da rede (PDFs de 6º a 9º ano, 2026).
- **Plataforma:** Google Apps Script web app ligado a uma Planilha Google, na conta `@edu.joinville.sc.gov.br`. Um único link serve professor e aluno (reconhece a conta). Publicação: Implantar > Gerenciar implantações > ✏️ > Nova versão. Depois, F5.
- **GitHub:** repositório `lindomarandradegertrudes/sistema-de-avaliacao-diagnostica-lingua-inglesa`, branch `main`.

## 2. Regras de trabalho (valem sempre)
- **Entrevistar antes de executar** e entregar em etapas, esperando o "funcionou" do usuário.
- **Commit/push só quando o usuário pedir**, sempre como único autor: identidade local `Lindomar Andrade Gertrudes <288164723+lindomarandradegertrudes@users.noreply.github.com>`. **Sem Co-Authored-By e sem "Generated with"** nos commits deste repositório.
- **Não atualizar** `CONTEXTO-GEMINI.md` nem `SISTEMA-COMPLETO-GEMINI.md` (o usuário disse que não precisa mais).
- Ao instalar: apagar o arquivo inteiro no editor (Ctrl+A, Delete) antes de colar a versão nova. Colar por cima já causou erro de "declarado duas vezes".
- Otimizações de desempenho (cache, tela inicial leve, retry) foram **recusadas** por ora; a lentidão com 30 alunos foi atribuída à rede da escola. Sugerido entrar em duas levas.

## 3. Linha do tempo

### Conversa "English Learning App" (28/09 a 08/10)
1. **Etapa 1** — planilha-base, cadastro do aluno (turma + nome, e-mail automático), painel do professor, domínio `edu.joinville.sc.gov.br`.
2. **Etapa 2** — questionários. Diagnóstico de 15 questões (4 fáceis, 7 médias, 4 difíceis) por série, com os conteúdos do 1º e 2º trimestre do Mapa. Resposta online dentro do app (o gabarito nunca vai ao navegador) ou prova impressa com lançamento por letras. Níveis: Iniciante 0–39, Básico 40–59, Intermediário 60–79, Avançado 80–100, pela média simples.
3. **Etapa 3** — grupos de no máximo 5, em serpentina com ajuste de médias; opções "manter grupos" ou "gerar sugestão"; o aluno vê só os colegas, sem nível. Aluno sem teste fica fora dos grupos.
4. **Etapa 4** — relatórios: evolução por aluno, comparativo das 12 turmas, tópicos mais errados, impressão e exportação para Planilha Google no Drive.
5. **Renomeado** para **English Learning App**. Cópia das respostas dos questionários salva.
6. **TDAs** (do skill de planejamento Joinville): nos dois formatos, escolha por TDA, aluno anexa foto, arquivo ou link do Canva, peso igual ao dos questionários, aluno vê correção, feedback e nota. JSON das TDAs de setembro (`tdas-setembro-2026.json`).
7. **Monitoramento de saída da tela** durante avaliações, com opção "Monitorar saídas da tela" por atividade. A tolerância passou a 5 segundos. Abrir anexo ou link não conta. O botão "Abrir o Canva" leva direto ao Canva, sem mostrar o aviso dos 3 minutos.
8. **Entregas diárias:** períodos definidos pelo professor, grade ✅/❌/➖ com salvamento automático, bônus 🟢 1,0 (100%) · 🟡 0,5 (80–99%) · 🟠 0,2 (50–79%) · 🔴 0. Não afeta nível nem grupos. Fechar período gera planilha no Drive.
9. **Editor de texto da TDA** estilo Word (título, B/I/U, listas, cores, sem corretor, contador, rascunho automático, colar bloqueado, filtro de HTML). **Bloqueio de Canva e anexos** por chave geral e por TDA.
10. **Manual do aluno**: `Manual-do-aluno.pdf` (19 páginas) e página no app (botão "❓ Como funciona"). Não cita os 5 s nem os 3 min. Commit `8156000`.
11. Dúvida sobre o aviso do Slack: nenhum projeto usa Slack. Esse tema ficou só nessa conversa.

### Conversa "Aplicativo de jogos de inglês" (05/10 a 08/10)
1. **Entrevista:** jogos dentro do English Learning App, individuais, estilo escape room, análise de evidências e descoberta de regras. Visual de quadrinhos (HQ). Comandos curtos em inglês com ícones, botão "? Ajuda em português", áudio com 🎧 PLAY / 🐢 SLOWER / 📄 TEXT. 6º ano com 3 cadeados e evidência visual.
2. **Etapa 1** — motor dos casos (`Casos.gs`, `Caso*.html`), aba **Jogos** do professor, cartão **🕵️ Missions** do aluno, 4 casos de outubro. Pontuação por cadeado (20 pts no protótipo): dica −5, erro −4, 3º erro revela a resposta e vale 0. Só a 1ª jogada vale nota. Correção no servidor. Commit `da1eb53`.
3. **Teste em sala:** difícil demais. Criada a **Trilha Base "Detective Academy"**: Mission 0 (tutorial guiado) e 8 missões, cada uma em 3 degraus (★ ★★ ★★★). Sem nota. Degrau inicial pelo nível do aluno; sobe com 80+ em 2 missões seguidas, desce com menos de 40. Testada nos Chromebooks, ok.
4. **Etapa 2** — **ciclos por turma** com prazo e 1 a 3 casos; casos do ano em 3 degraus, todos valendo 100; caso novo de novembro por série. **Regra de nota decidida:** a nota só entra no nível quando o aluno conclui todos os casos no prazo ou quando o professor fecha o ciclo (casos faltantes valem 0 no fechamento; quem não fez nenhum fica sem nota). Commits `a652b64` e `0ebf497`.
5. **Etapa 3** — catálogo de habilidades do Mapa e etiquetas, **dificuldades** do aluno (abaixo de 60% com pelo menos 3 itens, itens recentes pesam mais), **"Meu reforço"** (treinos de 4 cadeados, sem nota), ciclo misto com reforço 0/1/2 casos, mapa da turma e grupos de reforço sugeridos.
6. **Etapa 4** — banco do ano inteiro: 2 casos por período × 3 degraus e exercícios avulsos, série por série. Commit `491edae`.
7. **Etapa 5** — A: **gerador de casos** com claude.ai sem custo de API (`Gerador.gs`, converte a resposta na importação, não afeta casos já gravados). B: **relatórios dos jogos** (turma por caso, evolução do aluno, resumo por trimestre). Commit `f779a9f`.
8. **Aluno teste:** aba para qualquer perfil da escola (professores de outras áreas, direção) testar com acesso a todas as séries. Commit feito depois do "funcionou".

## 4. Arquitetura (resumo)
- **Servidor (.gs):** `Codigo` (config, doGet, estado do aluno), `Questionarios`, `Grupos`, `Relatorios`, `Tda`, `Diarias`, `Teste`, `Casos` (motor), `CasosPadrao`, `CasosBase`, `CasosAno` + `CasosAno6/7/8/9`, `Ciclos`, `Habilidades`, `Dificuldades`, `RelatoriosJogos`, `Gerador`.
- **Telas (.html):** `Professor`, `Aluno`, `Estilo`, `Manual`, `Caso`, `CasoEstilo`, `CasoMotor`, e `Prof*` (Grupos, Relatorios, Tda, Diarias, Jogos, Dificuldades, RelJogos, AlunoTeste).
- **Abas da planilha:** Config, Turmas, Alunos, Questionarios, Respostas, Grupos, Tdas, Entregas, Periodos, Aulas, EntregasDiarias, Casos, Jogadas, Ciclos, entre outras.

## 5. Armadilhas técnicas já aprendidas
- Todos os `.gs` compartilham um escopo global: nomes de função repetidos se sobrescrevem. Um `const` no topo do arquivo não pode chamar funções de arquivos carregados depois (por isso os casos do ano ficam em funções).
- Arquivos HTML de template não levam código. Evitar `//` no meio de linha dentro de `<script>` em HTML e evitar `$&`.
- O Planilhas converte `"2026-10"` em data: gravar com apóstrofo (`"'" + mes`).
- `google.script.run` descarta `null` dentro de objetos, entregando `undefined`: testar os dois casos.
- Gabarito e soluções são removidos antes de enviar o caso ao aluno; a correção é sempre no servidor.
- Após publicar uma nova versão, recarregar com F5 (a página antiga fica em cache).
- Testes: harness em Node com `SpreadsheetApp` simulado, rodando as suites e depois conferindo as telas no navegador. O código real do Apps Script e os Chromebooks só são testados pelo usuário.

## 6. Pendências e ideias em aberto
- Confirmar a instalação do que foi entregue por último em cada conversa (aluno teste, manual) no Apps Script real.
- Otimizações de desempenho, caso a lentidão volte com a rede estável: cache de dados que mudam pouco, tela inicial mais leve, tirar a fila de bloqueio na primeira jogada, tentar de novo automático.
- Manter o **manual do aluno** em dia quando alguma regra mudar (PDF e página no app).
- Ampliar o banco de exercícios avulsos conforme as habilidades mais fracas dos alunos.
- O app 3º–5º ano é outro projeto (ver `English Kids App`); a conversa dele não foi unificada aqui.
