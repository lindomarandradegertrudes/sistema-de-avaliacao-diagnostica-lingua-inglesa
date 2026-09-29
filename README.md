# Sistema de Avaliação Diagnóstica – Língua Inglesa

Sistema web para professores de Língua Inglesa do Ensino Fundamental II (6º ao 9º ano) avaliarem e acompanharem a aprendizagem das turmas e formarem **grupos heterogêneos** de até 5 alunos, que misturam alunos com mais e com menos conhecimento.

Roda **gratuitamente** no Google Workspace da escola: Google Apps Script e Google Planilhas. Não precisa de servidor próprio.

## Funcionalidades

- **Cadastro:** o aluno se cadastra no primeiro acesso com a conta Google da escola, e o professor pode editar ou excluir cadastros.
- **Questionários:** há o diagnóstico e os mensais, respondidos online (com correção automática) ou impressos (com lançamento das respostas). As questões podem ser geradas com IA a partir do conteúdo do mês, o que é opcional.
- **Níveis:** Iniciante, Básico, Intermediário e Avançado, calculados pela média de todas as avaliações. As faixas são configuráveis.
- **Grupos mensais:** a sugestão automática distribui os alunos em serpentina e depois equilibra as médias dos grupos. O professor pode fazer ajustes manuais e decide, a cada mês, se mantém ou refaz os grupos. O aluno vê apenas o próprio grupo, sem níveis nem notas.
- **Relatórios:**
  - comparativo das turmas;
  - tópicos com mais erros;
  - evolução por aluno;
  - impressão em PDF e exportação para Google Planilhas.

## Estrutura

| Arquivo | Conteúdo |
|---|---|
| `Codigo.gs` | Instalação, acesso à planilha, permissões, cadastro e painel |
| `Questionarios.gs` | Questionários, correção, lançamento, níveis e geração com IA |
| `Grupos.gs` | Leitura e gravação dos grupos mensais |
| `Relatorios.gs` | Comparativo, tópicos, evolução e exportação |
| `Professor.html` | Painel do professor |
| `ProfGrupos.html` / `ProfRelatorios.html` | Abas de Grupos e Relatórios |
| `Aluno.html` | Tela do aluno |
| `Estilo.html` | Estilos compartilhados |
| `diagnosticos-2026.json` | Diagnósticos de 6º a 9º ano, baseados no Mapa de Progressão 2026 da Rede Municipal de Joinville |

## Instalação

Siga o passo a passo em [GUIA-INSTALACAO.md](GUIA-INSTALACAO.md). Em resumo:

1. Crie uma planilha no Google Drive e abra **Extensões > Apps Script**.
2. Crie os arquivos acima no editor e cole o conteúdo de cada um.
3. Execute a função `instalar`.
4. Publique como **App da Web**: *Executar como: Eu*; *Acesso: qualquer pessoa do domínio da escola*.

## Privacidade

Todos os dados dos alunos ficam somente na planilha do professor, dentro da conta Google da escola. A geração de questões com IA, que é opcional, envia apenas o conteúdo pedagógico, nunca dados de alunos.

## Autor

Lindomar Andrade Gertrudes, professor de Língua Inglesa.
