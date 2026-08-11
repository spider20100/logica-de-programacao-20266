import readline from 'readline';

import { CONFIGURACOES, SIMBOLOS } from "../config/config.js";
import { cobra } from "./cobra.js";
import { comida } from "./comida.js";
import { inimigos } from "./inimigos.js";

function iniciar(dificuldade) {
    console.log(dificuldade);
    desenhar();
}

function desenhar() {
    var tela = "";
    tela += "=================JOGO DA COBRINHA=============\n";
    tela += "W S A D = MOVER | Q = sair \n\n";

    for (var y = -1; y <= CONFIGURACOES.altura; y++) {
        var linha = "";
        for (var x = -1; x <= CONFIGURACOES.largura; x++) {
            if (x === -1 || x === CONFIGURACOES.largura || y === -1 || y === CONFIGURACOES.altura) {
                linha += SIMBOLOS.parede;
            } else if (comida.estaNaPosicao(x, y)) {
                linha += SIMBOLOS.comida;
            } else if (inimigos.estaNaPosicao(x, y)) {
                linha += SIMBOLOS.inimigo;
            } else {
                var desenhouCobra = false;
                for (var i = 0; i < cobra.partes.length; i++) {
                    if (cobra.partes[i].x === x && cobra.partes[i].y === y) {
                        linha += (i === 0) ? SIMBOLOS.cabeca : SIMBOLOS.corpo;
                        desenhouCobra = true;
                    }
                }

                if (desenhouCobra === false) {
                    linha += SIMBOLOS.vazio
                }
            }
        }
        tela += linha + "\n"
    }

    console.clear();
    process.stdout.write("\x1b[H" + tela);
}

function configurarTeclado() {
    readline.emitKeypressEvents(process.stdin);
    readline.stdin.setRawMode(true);
    readline.stdin.resume();

    readline.stdin.on("keypress", (texto, tecla) => {
        if (tecla.name === "w") cobra.alterarDirecao("w");
        if (tecla.name === "a") cobra.alterarDirecao("a");
        if (tecla.name === "s") cobra.alterarDirecao("s");
        if (tecla.name === "d") cobra.alterarDirecao("d");
        if (tecla.name === "q") jogo.gameOver = true;
    })
}

export var jogo = {
    pontos: 0,
    fase: 1,
    vidas: 0,
    gameOver: false,
    dificuldade: null,
    velocidadeAtual: 150,
    iniciar: iniciar
}
