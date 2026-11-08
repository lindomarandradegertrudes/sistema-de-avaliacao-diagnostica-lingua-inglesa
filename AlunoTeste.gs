/**
 * Aluno Teste do professor (grava resultados, só para o professor testar).
 * Quatro alunos fictícios (6º ao 9º), cada um numa turma oculta "TESTE 6º"… O professor entra pelo painel
 * ("🧪 Entrar como Aluno Teste") com a própria conta: as chamadas da tela do aluno passam por comoAlunoTeste(),
 * que confere que quem pede é professor e executa a função do aluno como o aluno de teste daquela série.
 * Diferente do link de demonstração (?modo=teste, Teste.gs), aqui tudo grava como um aluno real.
 */

const SERIES_ALUNO_TESTE = ['6º', '7º', '8º', '9º'];

/** E-mail do aluno de teste em uso nesta execução (só dentro de comoAlunoTeste). */
var PERSONIFICADO_ = null;

function emailAlunoTeste_(serie) { return 'aluno.teste.' + String(serie).charAt(0) + '@teste.invalid'; }
function turmaAlunoTeste_(serie) { return 'TESTE ' + serie; }
function nomeAlunoTeste_(serie) { return 'Aluno Teste ' + serie; }
function ehTurmaTeste_(turma) { return /^TESTE \d/.test(String(turma)); }
function ehEmailAlunoTeste_(email) { return /@teste\.invalid$/.test(String(email)); }

/** Turmas reais (sem as TESTE): para cadastro, relatórios, médias e grupos. */
function turmasReais_() { return listarTurmas_().filter(function (t) { return !ehTurmaTeste_(t.turma); }); }

function serieAlunoTeste_(v) {
  const m = String(v || '').match(/[6-9]/);
  const serie = m ? m[0] + 'º' : '';
  if (SERIES_ALUNO_TESTE.indexOf(serie) === -1) throw new Error('Escolha a série do Aluno Teste (6º ao 9º).');
  return serie;
}

/** Cria (uma vez) as turmas TESTE e os quatro alunos de teste. */
function garantirAlunosTeste_() {
  const faltaTurma = function () {
    const turmas = listarTurmas_().map(function (t) { return t.turma; });
    return SERIES_ALUNO_TESTE.filter(function (s) { return turmas.indexOf(turmaAlunoTeste_(s)) === -1; });
  };
  const faltaAluno = function () {
    const emails = lerTabela_('Alunos').map(function (a) { return String(a.email).toLowerCase(); });
    return SERIES_ALUNO_TESTE.filter(function (s) { return emails.indexOf(emailAlunoTeste_(s)) === -1; });
  };
  if (!faltaTurma().length && !faltaAluno().length) return;
  comTrava_(function () {
    faltaTurma().forEach(function (s) { aba_('Turmas').appendRow(linhaDe_('Turmas', { turma: turmaAlunoTeste_(s), serie: s })); });
    const agora = new Date();
    faltaAluno().forEach(function (s) {
      aba_('Alunos').appendRow(linhaDe_('Alunos', { email: emailAlunoTeste_(s), nome: nomeAlunoTeste_(s), turma: turmaAlunoTeste_(s), cadastrado_em: agora, atualizado_em: agora }));
    });
  });
}

/**
 * Executa uma função da tela do aluno (alunoObterEstado, alunoAbrirTda…) como o Aluno Teste da série.
 * Só o professor pode chamar; só funções "aluno…"; só os alunos de teste.
 */
function comoAlunoTeste(serie, fn, args) {
  exigirProfessor_();
  serie = serieAlunoTeste_(serie);
  fn = String(fn || '');
  if (!/^aluno[A-Z]\w*$/.test(fn) || fn === 'alunoCadastrar' || typeof globalThis[fn] !== 'function') throw new Error('Função não permitida no Aluno Teste.');
  garantirAlunosTeste_();
  PERSONIFICADO_ = emailAlunoTeste_(serie);
  try {
    return globalThis[fn].apply(null, Array.isArray(args) ? args : []);
  } finally {
    PERSONIFICADO_ = null;
  }
}

/** Para o painel: os links de entrada (um por série). */
function profLinksAlunoTeste() {
  exigirProfessor_();
  const url = ScriptApp.getService().getUrl();
  return SERIES_ALUNO_TESTE.map(function (s) { return { serie: s, nome: nomeAlunoTeste_(s), turma: turmaAlunoTeste_(s), link: url + '?como=' + s.charAt(0) }; });
}
