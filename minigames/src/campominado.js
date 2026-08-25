import readline from 'readline-sync';

var LINHAS = 8;
var COLUNAS = 8;
var BOMBAS = 10;
var MODO = 1;

// Configura a dificuldade escolhida
function escolherDificuldade() {
  console.clear();
  console.log('=== ESCOLHA A DIFICULDADE ===');
  console.log('1. Facil (6x6 - 5 bombas)');
  console.log('2. Medio (8x8 - 10 bombas)');
  console.log('3. Dificil (10x10 - 20 bombas)');
  
  var opcao = readline.questionInt('Escolha uma opcao (1-3): ');
  
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
}

// Configura o modo de jogo
function escolherModoJogo() {
  console.log('\n=== ESCOLHA O MODO DE JOGO ===');
  console.log('1. Normal (Jogo tradicional)');
  console.log('2. Sem Dicas (Nao mostra a quantidade de bombas vizinhas)');
  console.log('3. Morte Subita (Sem opcao de errar ou colocar bandeiras)');
  console.log('4. Campo Livre (Primeira jogada nunca tem bombas ao redor)');
  console.log('5. Desafio de Bombas (Mais bombas espalhadas no mapa)');
  
  var opcao = readline.questionInt('Escolha uma opcao (1-5): ');
  
  if (opcao >= 1 && opcao <= 5) {
    MODO = opcao;
  } else {
    MODO = 1;
  }

  // Modificador do Modo 5: Aumenta a proporção de bombas
  if (MODO === 5) {
    BOMBAS = Math.floor(BOMBAS * 1.5);
  }
}

// Cria o tabuleiro do jogo
function criarTabuleiro(valor) {
  var tabuleiro = [];
  for (var l = 0; l < LINHAS; l++) {
    var linha = [];
    for (var c = 0; c < COLUNAS; c++) {
      linha.push(valor);
    }
    tabuleiro.push(linha);
  }
  return tabuleiro;
}

// Posiciona as bombas no tabuleiro (respeitando a primeira jogada se for Modo 4)
function posicionarBombas(tabuleiro, linhaInicial, colunaInicial) {
  var bombasColocadas = 0;
  while (bombasColocadas < BOMBAS) {
    var l = Math.floor(Math.random() * LINHAS);
    var c = Math.floor(Math.random() * COLUNAS);
    
    // Regra do Modo Campo Livre (Modo 4): evita bombas perto do primeiro clique
    var proximoDaPrimeiraJogada = MODO === 4 && 
      Math.abs(l - linhaInicial) <= 1 && 
      Math.abs(c - colunaInicial) <= 1;

    if (tabuleiro[l][c] !== 'B' && !proximoDaPrimeiraJogada) {
      tabuleiro[l][c] = 'B';
      bombasColocadas++;
    }
  }
}

// Conta quantas bombas existem ao redor de uma célula
function contarBombasVizinhas(tabuleiro, linha, coluna) {
  var contador = 0;
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      var novaL = linha + i;
      var novaC = coluna + j;
      if (
        novaL >= 0 && novaL < LINHAS &&
        novaC >= 0 && novaC < COLUNAS &&
        tabuleiro[novaL][novaC] === 'B'
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
  var cabecalho = '   ';
  for (var i = 0; i < COLUNAS; i++) {
    cabecalho += i + ' ';
  }
  console.log(cabecalho);
  
  var divisoria = '  +';
  for (var d = 0; d < COLUNAS * 2; d++) {
    divisoria += '-';
  }
  console.log(divisoria);
  
  for (var l = 0; l < LINHAS; l++) {
    var linhaTexto = l + ' | ';
    for (var c = 0; c < COLUNAS; c++) {
      linhaTexto += tabuleiroVisivel[l][c] + ' ';
    }
    console.log(linhaTexto);
  }
  console.log('');
}

// Revela a célula e seus vizinhos
function revelarCelula(tabuleiroReal, tabuleiroVisivel, linha, coluna) {
  if (
    linha < 0 || linha >= LINHAS ||
    coluna < 0 || coluna >= COLUNAS ||
    tabuleiroVisivel[linha][coluna] !== '.'
  ) {
    return;
  }

  var vizinhas = contarBombasVizinhas(tabuleiroReal, linha, coluna);
  
  // Regra do Modo Sem Dicas (Modo 2)
  if (MODO === 2) {
    tabuleiroVisivel[linha][coluna] = ' ';
  } else {
    tabuleiroVisivel[linha][coluna] = vizinhas.toString();
  }

  if (vizinhas === 0) {
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i !== 0 || j !== 0) {
          revelarCelula(tabuleiroReal, tabuleiroVisivel, linha + i, coluna + j);
        }
      }
    }
  }
}

// Verifica condição de vitória
function verificarVitoria(tabuleiroVisivel, tabuleiroReal) {
  for (var l = 0; l < LINHAS; l++) {
    for (var c = 0; c < COLUNAS; c++) {
      if (tabuleiroReal[l][c] !== 'B' && (tabuleiroVisivel[l][c] === '.' || tabuleiroVisivel[l][c] === 'F')) {
        return false;
      }
    }
  }
  return true;
}

// Função principal
function jogar() {
  escolherDificuldade();
  escolherModoJogo();

  var tabuleiroReal = criarTabuleiro('0');
  var tabuleiroVisivel = criarTabuleiro('.');
  var primeiraJogada = true;
  var gameOver = false;

  while (!gameOver) {
    exibirTabuleiro(tabuleiroVisivel);

    console.log('Acoes dispoiveis:');
    console.log('1. Revelar celula');
    if (MODO !== 3) console.log('2. Colocar/Remover Bandeira (F)');

    var acao = 1;
    if (MODO !== 3) {
      acao = readline.questionInt('Escolha uma acao (1-2): ');
    }

    var entradaLinha = readline.questionInt('Linha (0 a ' + (LINHAS - 1) + '): ');
    var entradaColuna = readline.questionInt('Coluna (0 a ' + (COLUNAS - 1) + '): ');

    if (
      entradaLinha < 0 || entradaLinha >= LINHAS ||
      entradaColuna < 0 || entradaColuna >= COLUNAS
    ) {
      readline.question('Coordenadas invalidas! Pressione Enter.');
      continue;
    }

    // Gerar bombas apenas na primeira jogada (para suportar o Modo 4)
    if (primeiraJogada) {
      posicionarBombas(tabuleiroReal, entradaLinha, entradaColuna);
      primeiraJogada = false;
    }

    if (acao === 2 && MODO !== 3) {
      // Alternar bandeira
      if (tabuleiroVisivel[entradaLinha][entradaColuna] === '.') {
        tabuleiroVisivel[entradaLinha][entradaColuna] = 'F';
      } else if (tabuleiroVisivel[entradaLinha][entradaColuna] === 'F') {
        tabuleiroVisivel[entradaLinha][entradaColuna] = '.';
      }
    } else {
      // Revelar célula
      if (tabuleiroVisivel[entradaLinha][entradaColuna] === 'F') {
        readline.question('Remova a bandeira antes de revelar essa celula! Pressione Enter.');
        continue;
      }

      if (tabuleiroReal[entradaLinha][entradaColuna] === 'B') {
        for (var l = 0; l < LINHAS; l++) {
          for (var c = 0; c < COLUNAS; c++) {
            if (tabuleiroReal[l][c] === 'B') {
              tabuleiroVisivel[l][c] = 'X';
            }
          }
        }
        exibirTabuleiro(tabuleiroVisivel);
        console.log('BOOM! Voce acertou uma bomba. Fim de jogo!');
        gameOver = true;
      } else {
        revelarCelula(tabuleiroReal, tabuleiroVisivel, entradaLinha, entradaColuna);

        if (verificarVitoria(tabuleiroVisivel, tabuleiroReal)) {
          exibirTabuleiro(tabuleiroVisivel);
          console.log('Parabens! Voce venceu o jogo!');
          gameOver = true;
        }
      }
    }
  }
}

jogar();