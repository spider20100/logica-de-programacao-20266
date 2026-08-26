import readline from 'readline-sync';
import fs from 'fs';

// =====================================================
// 🎮 CAMPO MINADO - VERSÃO ESTILIZADA
// =====================================================

// CORES
var RESET = '\x1b[0m';
var VERDE = '\x1b[32m';
var VERMELHO = '\x1b[31m';
var AMARELO = '\x1b[33m';
var AZUL = '\x1b[34m';
var CIANO = '\x1b[36m';
var MAGENTA = '\x1b[35m';
var BRANCO = '\x1b[37m';
var CINZA = '\x1b[90m';
var NEGRITO = '\x1b[1m';

// CONFIGURAÇÕES
var LINHAS = 8;
var COLUNAS = 8;
var BOMBAS = 10;

var MODO = 1;
var LIMITE_TEMPO = 60;

var ARQUIVO_RANKING = './ranking.json';

// =====================================================
// 🖥️ FUNÇÕES VISUAIS
// =====================================================

function titulo(texto) {

    console.log('');

    console.log(
        CIANO + NEGRITO +
        '╔════════════════════════════════════════════╗' +
        RESET
    );

    console.log(
        CIANO + NEGRITO +
        '║' +
        texto.padStart(22 + texto.length / 2)
             .padEnd(43) +
        '║' +
        RESET
    );

    console.log(
        CIANO + NEGRITO +
        '╚════════════════════════════════════════════╝' +
        RESET
    );

    console.log('');
}


function pausa() {

    readline.question(
        CINZA + '\nPressione ENTER para continuar...' + RESET
    );
}


// =====================================================
// 🏆 RANKING
// =====================================================

function carregarRanking() {

    try {

        if (fs.existsSync(ARQUIVO_RANKING)) {

            var conteudo =
                fs.readFileSync(
                    ARQUIVO_RANKING,
                    'utf-8'
                );

            return JSON.parse(conteudo);
        }

    } catch (erro) {

        console.log(
            VERMELHO +
            'Erro ao carregar ranking.' +
            RESET
        );
    }

    return [];
}


function salvarRanking(ranking) {

    try {

        fs.writeFileSync(
            ARQUIVO_RANKING,
            JSON.stringify(ranking, null, 2),
            'utf-8'
        );

    } catch (erro) {

        console.log(
            VERMELHO +
            'Erro ao salvar ranking.' +
            RESET
        );
    }
}


function registrarResultado(
    nome,
    venceu,
    tempo,
    dificuldade,
    modo
) {

    var ranking = carregarRanking();

    var resultado = {

        nome: nome,

        venceu: venceu,

        tempo: tempo,

        dificuldade: dificuldade,

        modo: modo,

        data: new Date().toLocaleString()
    };

    ranking.push(resultado);

    salvarRanking(ranking);
}


function mostrarRanking() {

    console.clear();

    titulo('🏆 RANKING');

    var ranking = carregarRanking();

    if (ranking.length === 0) {

        console.log(
            AMARELO +
            'Nenhuma partida registrada ainda.' +
            RESET
        );

        pausa();

        return;
    }

    for (
        var i = 0;
        i < ranking.length;
        i++
    ) {

        var jogador = ranking[i];

        var resultado;

        if (jogador.venceu) {

            resultado =
                VERDE + '🏆 Vitória' + RESET;

        } else {

            resultado =
                VERMELHO + '💥 Derrota' + RESET;
        }

        console.log(
            CIANO +
            (i + 1) +
            '. ' +
            RESET +
            jogador.nome +
            ' | ' +
            resultado +
            ' | ' +
            jogador.tempo +
            's | ' +
            jogador.dificuldade +
            ' | ' +
            jogador.modo
        );
    }

    pausa();
}


// =====================================================
// 🎯 DIFICULDADE
// =====================================================

function escolherDificuldade() {

    console.clear();

    titulo('🎯 DIFICULDADE');

    console.log(
        VERDE +
        '1. 🟢 Fácil' +
        RESET +
        '   → 6x6 | 5 bombas'
    );

    console.log(
        AMARELO +
        '2. 🟡 Médio' +
        RESET +
        '   → 8x8 | 10 bombas'
    );

    console.log(
        VERMELHO +
        '3. 🔴 Difícil' +
        RESET +
        ' → 10x10 | 20 bombas'
    );

    console.log('');

    var opcao =
        readline.questionInt(
            CIANO +
            '➜ Escolha: ' +
            RESET
        );

    if (opcao === 1) {

        LINHAS = 6;
        COLUNAS = 6;
        BOMBAS = 5;

        return 'Fácil';

    } else if (opcao === 3) {

        LINHAS = 10;
        COLUNAS = 10;
        BOMBAS = 20;

        return 'Difícil';

    } else {

        LINHAS = 8;
        COLUNAS = 8;
        BOMBAS = 10;

        return 'Médio';
    }
}


// =====================================================
// 🎮 MODOS
// =====================================================

function escolherModo() {

    console.clear();

    titulo('🎮 MODO DE JOGO');

    console.log(
        '1. ⚔️  Normal'
    );

    console.log(
        '2. 🛡️  Primeira jogada segura'
    );

    console.log(
        '3. 🟢 Área segura'
    );

    console.log(
        '4. ⏱️  Contra o tempo'
    );

    console.log(
        '5. ☠️  Hardcore'
    );

    console.log('');

    var opcao =
        readline.questionInt(
            CIANO +
            '➜ Escolha o modo: ' +
            RESET
        );

    if (
        opcao < 1 ||
        opcao > 5
    ) {

        opcao = 1;
    }

    MODO = opcao;

    if (MODO === 1) {

        return 'Normal';

    } else if (MODO === 2) {

        return 'Primeira jogada segura';

    } else if (MODO === 3) {

        return 'Área segura';

    } else if (MODO === 4) {

        return 'Contra o tempo';

    } else {

        return 'Hardcore';
    }
}


// =====================================================
// 🧱 TABULEIRO
// =====================================================

function criarTabuleiro(valor) {

    var tabuleiro = [];

    for (
        var i = 0;
        i < LINHAS;
        i++
    ) {

        var linha = [];

        for (
            var j = 0;
            j < COLUNAS;
            j++
        ) {

            linha.push(valor);
        }

        tabuleiro.push(linha);
    }

    return tabuleiro;
}


// =====================================================
// 💣 ÁREA SEGURA
// =====================================================

function estaNaAreaSegura(
    linha,
    coluna,
    linhaInicial,
    colunaInicial
) {

    var distanciaLinha =
        Math.abs(
            linha - linhaInicial
        );

    var distanciaColuna =
        Math.abs(
            coluna - colunaInicial
        );

    return (
        distanciaLinha <= 1 &&
        distanciaColuna <= 1
    );
}


// =====================================================
// 💣 POSICIONAR BOMBAS
// =====================================================

function posicionarBombas(
    tabuleiro,
    linhaInicial,
    colunaInicial
) {

    var bombasColocadas = 0;

    while (
        bombasColocadas < BOMBAS
    ) {

        var linha =
            Math.floor(
                Math.random() * LINHAS
            );

        var coluna =
            Math.floor(
                Math.random() * COLUNAS
            );

        if (
            tabuleiro[linha][coluna] === 'B'
        ) {

            continue;
        }

        var primeira =
            linha === linhaInicial &&
            coluna === colunaInicial;

        if (
            (MODO === 2 ||
             MODO === 4 ||
             MODO === 5) &&
            primeira
        ) {

            continue;
        }

        if (
            MODO === 3 &&
            estaNaAreaSegura(
                linha,
                coluna,
                linhaInicial,
                colunaInicial
            )
        ) {

            continue;
        }

        tabuleiro[linha][coluna] = 'B';

        bombasColocadas++;
    }
}


// =====================================================
// 🔢 CONTAR BOMBAS
// =====================================================

function contarBombas(
    tabuleiro,
    linha,
    coluna
) {

    var contador = 0;

    for (
        var i = -1;
        i <= 1;
        i++
    ) {

        for (
            var j = -1;
            j <= 1;
            j++
        ) {

            if (
                i === 0 &&
                j === 0
            ) {

                continue;
            }

            var novaLinha =
                linha + i;

            var novaColuna =
                coluna + j;

            if (
                novaLinha >= 0 &&
                novaLinha < LINHAS &&
                novaColuna >= 0 &&
                novaColuna < COLUNAS
            ) {

                if (
                    tabuleiro[
                        novaLinha
                    ][
                        novaColuna
                    ] === 'B'
                ) {

                    contador++;
                }
            }
        }
    }

    return contador;
}


// =====================================================
// 👀 MOSTRAR TABULEIRO
// =====================================================

function mostrarTabuleiro(tabuleiro) {

    console.clear();

    titulo('💣 CAMPO MINADO');

    console.log(
        CINZA +
        '      ' +
        RESET
    );

    var cabecalho = '      ';

    for (
        var c = 0;
        c < COLUNAS;
        c++
    ) {

        cabecalho +=
            AZUL +
            ' ' +
            c +
            '  ' +
            RESET;
    }

    console.log(cabecalho);

    console.log(
        CINZA +
        '    ┌' +
        '───┬'.repeat(COLUNAS - 1) +
        '───┐' +
        RESET
    );

    for (
        var l = 0;
        l < LINHAS;
        l++
    ) {

        var texto =
            CINZA +
            l.toString().padStart(2, ' ') +
            RESET +
            '  │';

        for (
            var c = 0;
            c < COLUNAS;
            c++
        ) {

            var valor =
                tabuleiro[l][c];

            var simbolo = '■';

            var cor = CINZA;

            if (valor === '.') {

                simbolo = '■';

                cor = CINZA;

            } else if (valor === 'X') {

                simbolo = '💣';

                cor = VERMELHO;

            } else if (valor === 0) {

                simbolo = ' ';

                cor = BRANCO;

            } else if (valor === 1) {

                simbolo = '1';

                cor = CIANO;

            } else if (valor === 2) {

                simbolo = '2';

                cor = VERDE;

            } else if (valor === 3) {

                simbolo = '3';

                cor = AMARELO;

            } else {

                simbolo = valor;

                cor = VERMELHO;
            }

            texto +=
                cor +
                ' ' +
                simbolo +
                ' ' +
                RESET +
                '│';
        }

        console.log(texto);

        if (
            l < LINHAS - 1
        ) {

            console.log(
                CINZA +
                '    ├' +
                '───┼'.repeat(COLUNAS - 1) +
                '───┤' +
                RESET
            );
        }
    }

    console.log(
        CINZA +
        '    └' +
        '───┴'.repeat(COLUNAS - 1) +
        '───┘' +
        RESET
    );

    console.log('');

    console.log(
        CINZA +
        '■ = desconhecido' +
        RESET
    );

    console.log('');
}


// =====================================================
// 🔍 REVELAR CÉLULA
// =====================================================

function revelar(
    real,
    visivel,
    linha,
    coluna
) {

    if (
        linha < 0 ||
        linha >= LINHAS ||
        coluna < 0 ||
        coluna >= COLUNAS
    ) {

        return;
    }

    if (
        visivel[linha][coluna] !== '.'
    ) {

        return;
    }

    if (
        real[linha][coluna] === 'B'
    ) {

        visivel[linha][coluna] = 'X';

        return;
    }

    var bombas =
        contarBombas(
            real,
            linha,
            coluna
        );

    visivel[linha][coluna] =
        bombas;

    // Hardcore não faz cascata
    if (
        bombas === 0 &&
        MODO !== 5
    ) {

        for (
            var i = -1;
            i <= 1;
            i++
        ) {

            for (
                var j = -1;
                j <= 1;
                j++
            ) {

                if (
                    i === 0 &&
                    j === 0
                ) {

                    continue;
                }

                revelar(
                    real,
                    visivel,
                    linha + i,
                    coluna + j
                );
            }
        }
    }
}


// =====================================================
// 🏆 VERIFICAR VITÓRIA
// =====================================================

function verificarVitoria(
    visivel,
    real
) {

    for (
        var i = 0;
        i < LINHAS;
        i++
    ) {

        for (
            var j = 0;
            j < COLUNAS;
            j++
        ) {

            if (
                visivel[i][j] === '.' &&
                real[i][j] !== 'B'
            ) {

                return false;
            }
        }
    }

    return true;
}


// =====================================================
// 💣 REVELAR TODAS AS BOMBAS
// =====================================================

function revelarBombas(
    real,
    visivel
) {

    for (
        var i = 0;
        i < LINHAS;
        i++
    ) {

        for (
            var j = 0;
            j < COLUNAS;
            j++
        ) {

            if (
                real[i][j] === 'B'
            ) {

                visivel[i][j] = 'X';
            }
        }
    }
}


// =====================================================
// 🎮 JOGAR
// =====================================================

function iniciarJogo() {

    console.clear();

    titulo('🎮 NOVA PARTIDA');

    var nome =
        readline.question(
            CIANO +
            '👤 Digite seu nome: ' +
            RESET
        );

    var dificuldade =
        escolherDificuldade();

    var modo =
        escolherModo();

    var visivel =
        criarTabuleiro('.');

    var real = null;

    var bombasProntas = false;

    var acabou = false;

    var venceu = false;

    var inicio = Date.now();

    while (!acabou) {

        mostrarTabuleiro(visivel);

        // CONTADOR DO MODO 4
        if (
            MODO === 4 &&
            bombasProntas
        ) {

            var tempoAtual =
                Math.floor(
                    (Date.now() - inicio) / 1000
                );

            var restante =
                LIMITE_TEMPO -
                tempoAtual;

            if (restante <= 0) {

                console.log(
                    VERMELHO +
                    NEGRITO +
                    '⏰ TEMPO ESGOTADO!' +
                    RESET
                );

                venceu = false;

                acabou = true;

                revelarBombas(
                    real,
                    visivel
                );

                pausa();

                break;
            }

            console.log(
                AMARELO +
                '⏱️ Tempo restante: ' +
                restante +
                ' segundos' +
                RESET
            );
        }

        console.log('');

        var linha =
            readline.questionInt(
                CIANO +
                '📍 Linha: ' +
                RESET
            );

        var coluna =
            readline.questionInt(
                CIANO +
                '📍 Coluna: ' +
                RESET
            );

        // VERIFICA POSIÇÃO
        if (
            linha < 0 ||
            linha >= LINHAS ||
            coluna < 0 ||
            coluna >= COLUNAS
        ) {

            console.log(
                VERMELHO +
                '❌ Posição inválida!' +
                RESET
            );

            pausa();

            continue;
        }

        // PRIMEIRA JOGADA
        if (!bombasProntas) {

            real =
                criarTabuleiro(0);

            posicionarBombas(
                real,
                linha,
                coluna
            );

            bombasProntas = true;
        }

        // REVELAR
        revelar(
            real,
            visivel,
            linha,
            coluna
        );

        // BOMBA
        if (
            visivel[linha][coluna] === 'X'
        ) {

            revelarBombas(
                real,
                visivel
            );

            mostrarTabuleiro(visivel);

            console.log(
                VERMELHO +
                NEGRITO +
                '💥 BOOM!' +
                RESET
            );

            console.log(
                VERMELHO +
                'Você encontrou uma bomba!' +
                RESET
            );

            venceu = false;

            acabou = true;

            pausa();

            continue;
        }

        // VITÓRIA
        if (
            verificarVitoria(
                visivel,
                real
            )
        ) {

            mostrarTabuleiro(visivel);

            console.log(
                VERDE +
                NEGRITO +
                '🏆 VOCÊ VENCEU!' +
                RESET
            );

            console.log(
                VERDE +
                '🎉 Parabéns, ' +
                nome +
                '!' +
                RESET
            );

            venceu = true;

            acabou = true;

            pausa();
        }
    }

    var tempoFinal =
        Math.floor(
            (Date.now() - inicio) / 1000
        );

    registrarResultado(
        nome,
        venceu,
        tempoFinal,
        dificuldade,
        modo
    );
}


// =====================================================
// 📖 COMO JOGAR
// =====================================================

function instrucoes() {

    console.clear();

    titulo('📖 COMO JOGAR');

    console.log(
        '🎯 Objetivo: descobrir todas as casas sem bombas.'
    );

    console.log('');

    console.log(
        '🔢 Os números mostram quantas bombas existem'
    );

    console.log(
        '   nas casas ao redor.'
    );

    console.log('');

    console.log(
        '💣 Se encontrar uma bomba, você perde.'
    );

    console.log('');

    console.log(
        '📍 Para jogar, informe a LINHA e a COLUNA.'
    );

    console.log('');

    console.log(
        CIANO +
        'Exemplo:' +
        RESET
    );

    console.log(
        'Linha: 2'
    );

    console.log(
        'Coluna: 4'
    );

    console.log('');

    pausa();
}


// =====================================================
// 🏠 MENU PRINCIPAL
// =====================================================

function menu() {

    while (true) {

        console.clear();

        console.log(
            CIANO + NEGRITO +
            '\n╔══════════════════════════════════════════════╗' +
            RESET
        );

        console.log(
            CIANO + NEGRITO +
            '║                                              ║' +
            RESET
        );

        console.log(
            CIANO + NEGRITO +
            '║             💣 CAMPO MINADO 💣              ║' +
            RESET
        );

        console.log(
            CIANO +
            '║                                              ║' +
            RESET
        );

        console.log(
            CIANO +
            '║          DESAFIE SUA ESTRATÉGIA!            ║' +
            RESET
        );

        console.log(
            CIANO + NEGRITO +
            '║                                              ║' +
            RESET
        );

        console.log(
            CIANO + NEGRITO +
            '╠══════════════════════════════════════════════╣' +
            RESET
        );

        console.log(
            '║   ' +
            VERDE +
            '1. 🎮 Jogar' +
            RESET +
            '                              ║'
        );

        console.log(
            '║   ' +
            AMARELO +
            '2. 🏆 Ranking' +
            RESET +
            '                            ║'
        );

        console.log(
            '║   ' +
            AZUL +
            '3. 📖 Como jogar' +
            RESET +
            '                         ║'
        );

        console.log(
            '║   ' +
            VERMELHO +
            '4. 🚪 Sair' +
            RESET +
            '                                ║'
        );

        console.log(
            CIANO + NEGRITO +
            '╚══════════════════════════════════════════════╝' +
            RESET
        );

        console.log('');

        var opcao =
            readline.questionInt(
                AMARELO +
                '➜ Escolha uma opção: ' +
                RESET
            );

        if (opcao === 1) {

            iniciarJogo();

        } else if (opcao === 2) {

            mostrarRanking();

        } else if (opcao === 3) {

            instrucoes();

        } else if (opcao === 4) {

            console.clear();

            console.log(
                CIANO +
                NEGRITO +
                '\n👋 Obrigado por jogar!' +
                RESET
            );

            console.log(
                VERDE +
                'Até a próxima! 💣🎮\n' +
                RESET
            );

            break;

        } else {

            console.log(
                VERMELHO +
                '\n❌ Opção inválida!' +
                RESET
            );

            pausa();
        }
    }
}


// =====================================================
// 🚀 INICIAR
// =====================================================

menu();