import readline from "readline-sync";

var partidas = Number(
    readline.question("Digite a quantidade de partidas: ")
);

var totalGols = 0;
var totalPontos = 0;
var partidasCom2OuMais = 0;

for (var i = 1; i <= partidas; i++) {

    var gols = Number(
        readline.question("Digite a quantidade de gols na partida " + i + ": ")
    );

    totalGols = totalGols + gols;

    // Cada gol vale 50 pontos
    totalPontos = totalPontos + (gols * 50);

    if (gols >= 2) {
        partidasCom2OuMais++;
    }
}

var mediaGols = totalGols / partidas;

console.log("\n===== RESULTADO =====");
console.log("Quantidade total de gols: " + totalGols);
console.log("Pontuação total do jogador: " + totalPontos);
console.log("Média de gols por partida: " + mediaGols.toFixed(2));
console.log("Partidas com 2 gols ou mais: " + partidasCom2OuMais);