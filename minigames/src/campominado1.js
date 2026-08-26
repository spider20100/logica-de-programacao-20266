import readline from 'readline-sync';
import fs from 'fs';

var LINHAS = 8;
var COLUNAS = 8;
var BOMBAS = 10;
var MODO = 1;
var LIMITE_TEMPO_SEGUNDOS = 120; // usado no Modo 4 (Contra o Tempo)

var ARQUIVO_RANKING = './ranking.json';

// Carrega o ranking salvo em disco (ou cria vazio se não existir)
function carregarRanking() {
  try {
    if (fs.existsSync(ARQUIVO_RANKING)) {
      var conteudo = fs.readFileSync(ARQUIVO_RANKING, 'utf-8');
      return JSON.parse(conteudo);
    }
  } catch (erro) {
    console.log('Aviso: não foi possível ler o ranking salvo. Iniciando um novo.');
  }
  return [];
}

// Salva o ranking atualizado em disco
function salvarRanking(ranking) {
  try {
    fs.writeFileSync(ARQUIVO_RANKING, JSON.stringify(ranking, null, 2), 'utf-8');
  } catch (erro) {
    console.log('Aviso: não foi possível salvar o ranking.');
  }
}

// Adiciona um novo resultado ao ranking e persiste no arquivo
function registrarResultado(nome, vitoria, tempoSegundos, dificuldade, modo) {
  var ranking = carregarRanking();
  var registro = {
    nome: nome,
    vitoria: vitoria,
    tempoSegundos: tempoSegundos,
    dificuldade: dificuldade,
    modo: modo,
    data: new Date().toISOString()
  };
  ranking.push(registro);
  salvarRanking(ranking);
}

// Exibe o histórico de partidas salvo em disco
function exibirRanking() {
  var ranking = carregarRanking();
  if (ranking.length === 0) {
    console.log('Nenhuma partida registrada ainda.');
    return;
  }
  console.log('--- HISTÓRICO DE PARTIDAS ---');
  for (var i = 0; i < ranking.length; i++) {
    var registro = ranking[i];
    var resultado = 'Derrota';
    if (registro.vitoria) {
      resultado = 'Vitória';
    }
    var modoTexto = 'Normal';
    if (registro.modo) {
      modoTexto = registro.modo;
    }
    console.log(
      (i + 1) + '. ' + registro.nome +
      ' - ' + resultado +
      ' - ' + registro.tempoSegundos + 's' +
      ' - Dificuldade: ' + registro.dificuldade +
      ' - Modo: ' + modoTexto
    );
  }
}

// Configura a dificuldade escolhida
function escolherDificuldade() {
  console.clear();
  console.log('--- ESCOLHA A DIFICULDADE ---');
  console.log('1. Fácil (6x6 - 5 bombas)');
  console.log('2. Médio (8x8 - 10 bombas)');
  console.log('3. Difícil (10x10 - 20 bombas)');

  var opcao = readline.questionInt('Escolha uma opção (1-3): ');

  if (opcao === 1) {
    LINHAS = 6;
    COLUNAS = 6;
    BOMBAS = 5;
  } else if (opcao === 3) {
    LINHAS = 10;
    COLUNAS = 10;
    BOMBAS = 20;
  } else {
    LINHAS = 8;
    COLUNAS = 8;
    BOMBAS = 10;
  }

  if (opcao === 1) {
    return 'Fácil';
  } else if (opcao === 3) {
    return 'Difícil';
  } else {
    return 'Médio';
  }
}

// Configura o modo de jogo
function escolherModoJogo() {
  console.log('--- ESCOLHA O MODO ---');
  console.log('1. Normal (bombas fixas em qualquer lugar)');
  console.log('2. Seguro na primeira jogada (a célula clicada nunca é bomba)');
  console.log('3. Área segura (a célula clicada e seus vizinhos nunca são bomba)');
  console.log('4. Contra o tempo (vença em até ' + LIMITE_TEMPO_SEGUNDOS + 's)');
  console.log('5. Hardcore (sem revelação em cascata)');
  var opcao = readline.questionInt('Escolha uma opção (1-5): ');

  if (opcao >= 1 && opcao <= 5) {
    MODO = opcao;
  } else {
    MODO = 1;
  }

  var nomeModo = 'Normal';
  if (MODO === 2) {
    nomeModo = 'Seguro na primeira jogada';
  } else if (MODO === 3) {
    nomeModo = 'Área segura';
  } else if (MODO === 4) {
    nomeModo = 'Contra o tempo';
  } else if (MODO === 5) {
    nomeModo = 'Hardcore';
  }

  return nomeModo;
}

// Cria o tabuleiro do jogo
function criarTabuleiro(valor) {
  var tabuleiro = [];
  for (var i = 0; i < LINHAS; i++) {
    var linha = [];
    for (var j = 0; j < COLUNAS; j++) {
      linha.push(valor);
    }
    tabuleiro.push(linha);
  }
  return tabuleiro;
}

// Verifica se uma posição está na área protegida (usada no Modo 3)
function estaNaAreaSegura(linha, coluna, linhaInicial, colunaInicial) {
  var diferencaLinha = Math.abs(linha - linhaInicial);
  var diferencaColuna = Math.abs(coluna - colunaInicial);
  return diferencaLinha <= 1 && diferencaColuna <= 1;
}

// Posiciona as bombas no tabuleiro (respeitando a primeira jogada conforme o modo)
function posicionarBombas(tabuleiro, linhaInicial, colunaInicial) {
  var bombasPossiveis = LINHAS * COLUNAS - 1;
  if (MODO === 3) {
    bombasPossiveis = LINHAS * COLUNAS - 9; // célula inicial + até 8 vizinhos
  }
  if (BOMBAS > bombasPossiveis) {
    BOMBAS = bombasPossiveis;
  }

  var bombasColocadas = 0;
  while (bombasColocadas < BOMBAS) {
    var linha = Math.floor(Math.random() * LINHAS);
    var coluna = Math.floor(Math.random() * COLUNAS);

    var ehPosicaoInicial = (linha === linhaInicial && coluna === colunaInicial);
    var jaTemBomba = tabuleiro[linha][coluna] === 'B';

    if (jaTemBomba) continue;

    if ((MODO === 2 || MODO === 4 || MODO === 5) && ehPosicaoInicial) continue;
    if (MODO === 3 && estaNaAreaSegura(linha, coluna, linhaInicial, colunaInicial)) continue;

    tabuleiro[linha][coluna] = 'B';
    bombasColocadas++;
  }
}

// Conta quantas bombas existem ao redor de uma célula
function contarBombasVizinhas(tabuleiro, linha, coluna) {
  var contador = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      var linhaVizinha = linha + i;
      var colunaVizinha = coluna + j;
      if (
        linhaVizinha >= 0 && linhaVizinha < LINHAS &&
        colunaVizinha >= 0 && colunaVizinha < COLUNAS &&
        tabuleiro[linhaVizinha][colunaVizinha] === 'B'
      ) {
        contador++;
      }
    }
  }
  return contador;
}

// Imprime o tabuleiro visível no terminal
function exibirTabuleiro(tabuleiroVisivel) {
  console.clear();
  if (MODO === 4) {
    console.log('(Modo Contra o Tempo: limite de ' + LIMITE_TEMPO_SEGUNDOS + 's)');
  }
  if (MODO === 5) {
    console.log('(Modo Hardcore: cada jogada revela apenas uma célula)');
  }
  var cabecalho = '   ';
  for (var c = 0; c < COLUNAS; c++) {
    cabecalho += c.toString().padStart(2, ' ') + ' ';
  }
  console.log(cabecalho);

  for (var l = 0; l < LINHAS; l++) {
    var linhaTexto = l.toString().padStart(2, ' ') + ' ';
    for (var col = 0; col < COLUNAS; col++) {
      linhaTexto += tabuleiroVisivel[l][col].toString().padStart(2, ' ') + ' ';
    }
    console.log(linhaTexto);
  }
}

// Revela a célula e seus vizinhos (a cascata é desativada no Modo 5 - Hardcore)
function revelarCelula(tabuleiroReal, tabuleiroVisivel, linha, coluna) {
  if (
    linha < 0 || linha >= LINHAS ||
    coluna < 0 || coluna >= COLUNAS ||
    tabuleiroVisivel[linha][coluna] !== '.'
  ) {
    return;
  }

  if (tabuleiroReal[linha][coluna] === 'B') {
    tabuleiroVisivel[linha][coluna] = 'X';
    return;
  }

  var bombasVizinhas = contarBombasVizinhas(tabuleiroReal, linha, coluna);
  tabuleiroVisivel[linha][coluna] = bombasVizinhas;

  if (bombasVizinhas === 0 && MODO !== 5) {
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        revelarCelula(tabuleiroReal, tabuleiroVisivel, linha + i, coluna + j);
      }
    }
  }
}

// Verifica condição de vitória
function verificarVitoria(tabuleiroVisivel, tabuleiroReal) {
  for (var l = 0; l < LINHAS; l++) {
    for (var c = 0; c < COLUNAS; c++) {
      var celulaOculta = tabuleiroVisivel[l][c] === '.';
      var naoEhBomba = tabuleiroReal[l][c] !== 'B';
      if (celulaOculta && naoEhBomba) {
        return false;
      }
    }
  }
  return true;
}

// Função principal
function jogar() {
  console.log('=== BEM-VINDO AO CAMPO MINADO ===');
  console.log('1. Jogar');
  console.log('2. Ver histórico de partidas');
  var opcaoMenu = readline.questionInt('Escolha uma opção (1-2): ');

  if (opcaoMenu === 2) {
    exibirRanking();
    return;
  }

  var nomeJogador = readline.question('Digite seu nome: ');
  var dificuldade = escolherDificuldade();
  var nomeModo = escolherModoJogo();

  var tabuleiroVisivel = criarTabuleiro('.');
  var tabuleiroReal = null;
  var bombasPosicionadas = false;
  var jogoAcabou = false;
  var vitoria = false;
  var inicio = Date.now();

  while (!jogoAcabou) {
    exibirTabuleiro(tabuleiroVisivel);

    if (MODO === 4 && bombasPosicionadas) {
      var decorridoAtual = Math.round((Date.now() - inicio) / 1000);
      var restante = LIMITE_TEMPO_SEGUNDOS - decorridoAtual;
      if (restante <= 0) {
        console.log('Tempo esgotado! Fim de jogo.');
        jogoAcabou = true;
        vitoria = false;
        break;
      }
      console.log('Tempo restante: ' + restante + 's');
    }

    var linha = readline.questionInt('Linha: ');
    var coluna = readline.questionInt('Coluna: ');

    if (
      linha < 0 || linha >= LINHAS ||
      coluna < 0 || coluna >= COLUNAS
    ) {
      console.log('Posição inválida, tente novamente.');
      continue;
    }

    if (!bombasPosicionadas) {
      tabuleiroReal = criarTabuleiro(0);
      posicionarBombas(tabuleiroReal, linha, coluna);
      bombasPosicionadas = true;
    }

    revelarCelula(tabuleiroReal, tabuleiroVisivel, linha, coluna);

    if (tabuleiroVisivel[linha][coluna] === 'X') {
      exibirTabuleiro(tabuleiroVisivel);
      console.log('Você pisou em uma bomba! Fim de jogo.');
      jogoAcabou = true;
      vitoria = false;
    } else if (verificarVitoria(tabuleiroVisivel, tabuleiroReal)) {
      exibirTabuleiro(tabuleiroVisivel);
      console.log('Parabéns, você venceu!');
      jogoAcabou = true;
      vitoria = true;
    }
  }

  var tempoSegundos = Math.round((Date.now() - inicio) / 1000);
  registrarResultado(nomeJogador, vitoria, tempoSegundos, dificuldade, nomeModo);
  console.log('Resultado salvo no histórico (' + ARQUIVO_RANKING + ').');
}

jogar();