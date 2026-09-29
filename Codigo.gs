/**
 * English Learning App – Língua Inglesa
 * Instalação da planilha, acesso aos dados, permissões, cadastro de alunos e painel do professor.
 */

const FUSO = 'America/Sao_Paulo';
const SERIES = ['6º', '7º', '8º', '9º'];
const LETRAS = ['A', 'B', 'C'];
const MAX_ALUNOS_TURMA = 35;

const CABECALHOS = {
  Config: ['chave', 'valor', 'descricao'],
  Turmas: ['turma', 'serie'],
  Alunos: ['email', 'nome', 'turma', 'cadastrado_em', 'atualizado_em'],
  Questionarios: ['id', 'tipo', 'serie', 'mes', 'titulo', 'conteudo', 'questoes_json', 'status', 'form_id', 'criado_em'],
  Respostas: ['questionario_id', 'email', 'turma', 'pontuacao', 'total', 'percentual', 'acertos_json', 'origem', 'respondido_em'],
  Grupos: ['mes', 'turma', 'grupo', 'email', 'nome', 'nivel', 'media', 'aplicado_em'],
  Entregas: ['questionario_id', 'turma', 'grupo', 'membros', 'email', 'texto', 'link', 'anexos_json', 'enviado_em', 'atualizado_em', 'saidas_json'],
};

const CONFIG_PADRAO = [
  ['dominio', 'edu.joinville.sc.gov.br', 'Domínio dos e-mails da escola, sem @. Vazio = aceita qualquer conta.'],
  ['professores', '', 'E-mails com acesso ao painel do professor, separados por vírgula.'],
  ['cadastro_aberto', 'SIM', 'SIM = alunos podem se cadastrar; NÃO = novos cadastros bloqueados.'],
  ['tamanho_max_grupo', 5, 'Máximo de alunos por grupo.'],
  ['faixa_basico', 40, 'Média mínima (%) para o nível Básico. Abaixo disso: Iniciante.'],
  ['faixa_intermediario', 60, 'Média mínima (%) para o nível Intermediário.'],
  ['faixa_avancado', 80, 'Média mínima (%) para o nível Avançado.'],
];

// ============================================================
// Instalação
// ============================================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('English Learning App')
    .addItem('Instalar / atualizar planilha', 'instalar')
    .addItem('Mostrar link do sistema', 'mostrarLink')
    .addToUi();
}

/** Cria as abas, as 12 turmas e as configurações padrão. Pode ser executada várias vezes sem apagar dados. */
function instalar() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) throw new Error('Abra o Apps Script pela planilha (Extensões > Apps Script) e execute novamente.');
  PropertiesService.getScriptProperties().setProperty('PLANILHA_ID', ss.getId());
  ss.setSpreadsheetTimeZone(FUSO);

  Object.keys(CABECALHOS).forEach(function (nome) {
    const aba = ss.getSheetByName(nome) || ss.insertSheet(nome);
    const cab = CABECALHOS[nome];
    aba.getRange(1, 1, 1, cab.length).setValues([cab]).setFontWeight('bold').setBackground('#dbe4ff');
    aba.setFrozenRows(1);
  });

  const turmas = ss.getSheetByName('Turmas');
  if (turmas.getLastRow() < 2) {
    const linhas = [];
    SERIES.forEach(function (s) { LETRAS.forEach(function (l) { linhas.push([s + l, s]); }); });
    turmas.getRange(2, 1, linhas.length, 2).setValues(linhas);
  }

  const cfg = ss.getSheetByName('Config');
  const chaves = cfg.getLastRow() > 1
    ? cfg.getRange(2, 1, cfg.getLastRow() - 1, 1).getValues().map(function (l) { return l[0]; })
    : [];
  CONFIG_PADRAO.forEach(function (item) {
    if (chaves.indexOf(item[0]) !== -1) return;
    const linha = item.slice();
    if (linha[0] === 'professores') linha[1] = Session.getEffectiveUser().getEmail();
    cfg.appendRow(linha);
  });
  cfg.autoResizeColumns(1, 3);

  ['Página1', 'Planilha1', 'Sheet1'].forEach(function (n) {
    const a = ss.getSheetByName(n);
    if (a && a.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(a);
  });

  const msg = 'Instalação concluída. Agora publique o sistema em Implantar > Nova implantação > App da Web.';
  Logger.log(msg);
  try { SpreadsheetApp.getUi().alert(msg); } catch (e) { /* executado pelo editor: sem interface */ }
}

function mostrarLink() {
  const url = ScriptApp.getService().getUrl();
  SpreadsheetApp.getUi().alert(url ? 'Link do sistema:\n\n' + url : 'O sistema ainda não foi publicado (Implantar > Nova implantação).');
}

// ============================================================
// Acesso à planilha
// ============================================================

function planilha_() {
  const id = PropertiesService.getScriptProperties().getProperty('PLANILHA_ID');
  if (!id) throw new Error('Sistema não instalado. Execute a função "instalar" no editor do Apps Script.');
  return SpreadsheetApp.openById(id);
}

function aba_(nome) {
  return planilha_().getSheetByName(nome);
}

/** Lê uma aba como lista de objetos. Datas viram texto (google.script.run não transporta Date). */
function lerTabela_(nome) {
  const valores = aba_(nome).getDataRange().getValues();
  const cab = valores.shift();
  return valores
    .map(function (linha, i) {
      const obj = { _linha: i + 2 };
      cab.forEach(function (c, j) {
        const v = linha[j];
        obj[c] = v instanceof Date ? Utilities.formatDate(v, FUSO, 'dd/MM/yyyy HH:mm') : v;
      });
      return obj;
    })
    .filter(function (o) { return cab.some(function (c) { return o[c] !== ''; }); });
}

function linhaDe_(nome, obj) {
  return CABECALHOS[nome].map(function (c) {
    const v = obj[c] === undefined ? '' : obj[c];
    // Texto digitado por alunos não pode virar fórmula na planilha.
    return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
  });
}

function lerConfig_() {
  const cfg = {};
  lerTabela_('Config').forEach(function (l) { cfg[l.chave] = l.valor; });
  return cfg;
}

function listarTurmas_() {
  return lerTabela_('Turmas').map(function (t) { return { turma: String(t.turma), serie: String(t.serie) }; });
}

function comTrava_(fn) {
  const trava = LockService.getScriptLock();
  trava.waitLock(20000);
  try { return fn(); } finally { trava.releaseLock(); }
}

// ============================================================
// Identificação e permissões
// ============================================================

function usuarioAtual_() {
  return String(Session.getActiveUser().getEmail() || '').toLowerCase().trim();
}

function ehProfessor_(email, cfg) {
  if (!email) return false;
  const lista = String((cfg || lerConfig_()).professores || '')
    .toLowerCase().split(/[\s,;]+/).filter(String);
  return email === Session.getEffectiveUser().getEmail().toLowerCase() || lista.indexOf(email) !== -1;
}

function exigirProfessor_() {
  const email = usuarioAtual_();
  if (!ehProfessor_(email)) throw new Error('Acesso restrito ao professor.');
  return email;
}

function validarAluno_(email, cfg) {
  if (!email) throw new Error('Não foi possível identificar sua conta. Entre com a sua conta Google da escola.');
  const dominio = String(cfg.dominio || '').replace(/^@/, '').toLowerCase().trim();
  if (dominio && !email.endsWith('@' + dominio)) {
    throw new Error('Use a sua conta Google da escola (@' + dominio + '). Você entrou como ' + email + '.');
  }
}

// ============================================================
// Páginas
// ============================================================

function doGet() {
  try {
    const email = usuarioAtual_();
    const pagina = ehProfessor_(email) ? 'Professor' : 'Aluno';
    const t = HtmlService.createTemplateFromFile(pagina);
    t.email = email;
    return t.evaluate()
      .setTitle(pagina === 'Professor' ? 'English Learning App – Professor' : 'English Learning App')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  } catch (e) {
    return HtmlService.createHtmlOutput('<p style="font-family:sans-serif;padding:24px">' + e.message + '</p>');
  }
}

function incluir(arquivo) {
  return HtmlService.createHtmlOutputFromFile(arquivo).getContent();
}

// ============================================================
// Utilitários de texto
// ============================================================

const MINUSCULAS = ['da', 'de', 'do', 'das', 'dos', 'e'];

function formatarNome_(nome) {
  return String(nome || '').trim().replace(/\s+/g, ' ').toLowerCase().split(' ')
    .map(function (p, i) { return i > 0 && MINUSCULAS.indexOf(p) !== -1 ? p : p.charAt(0).toUpperCase() + p.slice(1); })
    .join(' ');
}

function validarNome_(nome) {
  if (nome.split(' ').length < 2 || nome.length < 5) throw new Error('Informe nome e sobrenome.');
}

function validarTurma_(turma) {
  const ok = listarTurmas_().some(function (t) { return t.turma === turma; });
  if (!ok) throw new Error('Turma inválida.');
}

// ============================================================
// Área do aluno
// ============================================================

function alunoObterEstado() {
  const email = usuarioAtual_();
  const cfg = lerConfig_();
  validarAluno_(email, cfg);
  const aluno = lerTabela_('Alunos').filter(function (a) { return String(a.email).toLowerCase() === email; })[0];
  return {
    email: email,
    cadastroAberto: String(cfg.cadastro_aberto).toUpperCase() !== 'NÃO' && String(cfg.cadastro_aberto).toUpperCase() !== 'NAO',
    turmas: listarTurmas_(),
    aluno: aluno ? { nome: aluno.nome, turma: String(aluno.turma) } : null,
    grupo: aluno ? grupoDoAluno_(email, String(aluno.turma)) : null,
    questionarios: aluno ? pendentesDoAluno_(email, String(aluno.turma)) : [],
    tdas: aluno ? alunoTdas_(email, String(aluno.turma)) : [],
  };
}

function alunoCadastrar(nome, turma) {
  const email = usuarioAtual_();
  const cfg = lerConfig_();
  validarAluno_(email, cfg);
  const estado = alunoObterEstado();
  if (!estado.cadastroAberto) throw new Error('O cadastro está fechado. Fale com o professor.');
  nome = formatarNome_(nome);
  validarNome_(nome);
  validarTurma_(turma);

  comTrava_(function () {
    const existe = lerTabela_('Alunos').some(function (a) { return String(a.email).toLowerCase() === email; });
    if (existe) throw new Error('Você já está cadastrado. Recarregue a página.');
    const agora = new Date();
    aba_('Alunos').appendRow(linhaDe_('Alunos', { email: email, nome: nome, turma: turma, cadastrado_em: agora, atualizado_em: agora }));
  });
  return alunoObterEstado();
}

/** Colegas do grupo mais recente da turma. O aluno não vê níveis nem notas. */
function grupoDoAluno_(email, turma) {
  const linhas = lerTabela_('Grupos').filter(function (g) { return String(g.turma) === turma; });
  if (!linhas.length) return null;
  const ultimoMes = linhas.map(function (g) { return String(g.mes); }).sort().pop();
  const doMes = linhas.filter(function (g) { return String(g.mes) === ultimoMes; });
  const meu = doMes.filter(function (g) { return String(g.email).toLowerCase() === email; })[0];
  if (!meu) return null;
  return {
    mes: ultimoMes,
    grupo: meu.grupo,
    colegas: doMes.filter(function (g) { return g.grupo === meu.grupo; }).map(function (g) { return g.nome; }),
  };
}

// ============================================================
// Painel do professor
// ============================================================

function profResumo() {
  exigirProfessor_();
  const cfg = lerConfig_();
  const alunos = lerTabela_('Alunos');
  const turmas = listarTurmas_().map(function (t) {
    t.total = alunos.filter(function (a) { return String(a.turma) === t.turma; }).length;
    return t;
  });
  return {
    turmas: turmas,
    series: SERIES,
    totalAlunos: alunos.length,
    maxPorTurma: MAX_ALUNOS_TURMA,
    link: ScriptApp.getService().getUrl(),
    temChaveApi: !!PropertiesService.getScriptProperties().getProperty('ANTHROPIC_API_KEY'),
    config: {
      dominio: String(cfg.dominio || ''),
      professores: String(cfg.professores || ''),
      cadastro_aberto: String(cfg.cadastro_aberto || 'SIM'),
      faixa_basico: Number(cfg.faixa_basico),
      faixa_intermediario: Number(cfg.faixa_intermediario),
      faixa_avancado: Number(cfg.faixa_avancado),
    },
  };
}

function profListarAlunos() {
  exigirProfessor_();
  const niveis = calcularNiveis_(lerConfig_());
  return lerTabela_('Alunos').map(function (a) {
    const email = String(a.email).toLowerCase();
    const n = niveis[email] || { media: null, nivel: '', avaliacoes: 0 };
    return {
      email: email, nome: String(a.nome), turma: String(a.turma), cadastrado_em: String(a.cadastrado_em),
      media: n.media, nivel: n.nivel, avaliacoes: n.avaliacoes,
    };
  });
}

/** Cria (emailOriginal vazio) ou edita um aluno. Se o e-mail mudar, o histórico acompanha. */
function profSalvarAluno(dados) {
  exigirProfessor_();
  const email = String(dados.email || '').toLowerCase().trim();
  const original = String(dados.emailOriginal || '').toLowerCase().trim();
  const nome = formatarNome_(dados.nome);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('E-mail inválido.');
  validarNome_(nome);
  validarTurma_(dados.turma);

  comTrava_(function () {
    const alunos = lerTabela_('Alunos');
    const duplicado = alunos.some(function (a) { return String(a.email).toLowerCase() === email && email !== original; });
    if (duplicado) throw new Error('Já existe um aluno com esse e-mail.');
    const aba = aba_('Alunos');

    if (!original) {
      const agora = new Date();
      aba.appendRow(linhaDe_('Alunos', { email: email, nome: nome, turma: dados.turma, cadastrado_em: agora, atualizado_em: agora }));
      return;
    }
    const atual = alunos.filter(function (a) { return String(a.email).toLowerCase() === original; })[0];
    if (!atual) throw new Error('Aluno não encontrado. Recarregue a página.');
    const cadastro = aba.getRange(atual._linha, 4).getValue();
    aba.getRange(atual._linha, 1, 1, CABECALHOS.Alunos.length)
      .setValues([linhaDe_('Alunos', { email: email, nome: nome, turma: dados.turma, cadastrado_em: cadastro, atualizado_em: new Date() })]);
    if (email !== original) trocarEmailNoHistorico_(original, email);
  });
  return profListarAlunos();
}

function trocarEmailNoHistorico_(antigo, novo) {
  ['Respostas', 'Grupos'].forEach(function (nome) {
    const aba = aba_(nome);
    const col = CABECALHOS[nome].indexOf('email') + 1;
    const n = aba.getLastRow() - 1;
    if (n < 1) return;
    const faixa = aba.getRange(2, col, n, 1);
    const valores = faixa.getValues().map(function (l) { return [String(l[0]).toLowerCase() === antigo ? novo : l[0]]; });
    faixa.setValues(valores);
  });
}

/** Remove o cadastro. As respostas antigas ficam guardadas e voltam a valer se o aluno se cadastrar de novo. */
function profExcluirAluno(email) {
  exigirProfessor_();
  email = String(email || '').toLowerCase();
  comTrava_(function () {
    const alvo = lerTabela_('Alunos').filter(function (a) { return String(a.email).toLowerCase() === email; })[0];
    if (!alvo) throw new Error('Aluno não encontrado. Recarregue a página.');
    aba_('Alunos').deleteRow(alvo._linha);
  });
  return profListarAlunos();
}

function profSalvarConfig(novos) {
  const email = exigirProfessor_();
  const b = Number(novos.faixa_basico), i = Number(novos.faixa_intermediario), a = Number(novos.faixa_avancado);
  if (!(b > 0 && b < i && i < a && a <= 100)) throw new Error('As faixas devem ser crescentes: Básico < Intermediário < Avançado ≤ 100.');
  const professores = String(novos.professores || '').toLowerCase();
  if (professores.split(/[\s,;]+/).indexOf(email) === -1 && email !== Session.getEffectiveUser().getEmail().toLowerCase()) {
    throw new Error('Seu próprio e-mail precisa continuar na lista de professores.');
  }
  const valores = {
    dominio: String(novos.dominio || '').replace(/^@/, '').toLowerCase().trim(),
    professores: professores,
    cadastro_aberto: novos.cadastro_aberto === 'NÃO' ? 'NÃO' : 'SIM',
    faixa_basico: b,
    faixa_intermediario: i,
    faixa_avancado: a,
  };
  comTrava_(function () {
    const aba = aba_('Config');
    lerTabela_('Config').forEach(function (l) {
      if (valores.hasOwnProperty(l.chave)) aba.getRange(l._linha, 2).setValue(valores[l.chave]);
    });
  });
  return profResumo();
}
