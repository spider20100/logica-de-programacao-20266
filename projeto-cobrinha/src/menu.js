import leia from 'readline-sync';
import { DIFICULDADES } from './config/config.js';
import { jogo } from './objetos/jogo.js';

function mostrarMenu() {
    console.log("=============================");
    console.log("       JOGO DA COBRINHA      ");
    console.log("=============================");

    console.log("1 - Fácil");
    console.log("2 - Médio");
    console.log("3 - Difícil");

    var opcao = leia.questionInt("Escolha uma opcao: ");
    var difilculdade = DIFICULDADES[opcao];

    if (difilculdade === undefined) {
        console.log("Opção Inválida");
        return;
    }

    jogo.iniciar(difilculdade)
}

mostrarMenu();

