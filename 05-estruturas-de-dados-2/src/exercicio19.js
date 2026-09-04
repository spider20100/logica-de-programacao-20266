import leia from "readline-sync";

var times = [];

var quantidade = leia.questionInt("Digite a quantidade de times: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- TIME " + (i + 1) + " ---");

    var nome = leia.question("Digite o nome do time: ");
    var vitorias = leia.questionInt("Digite a quantidade de vitorias: ");
    var empates = leia.questionInt("Digite a quantidade de empates: ");
    var derrotas = leia.questionInt("Digite a quantidade de derrotas: ");

    var time = {
        nome: nome,
        vitorias: vitorias,
        empates: empates,
        derrotas: derrotas
    };

    times.push(time);
}

var maiorPontuacao = times[0];
var somaPontos = 0;

console.log("\n=== CLASSIFICACAO ===");

for (var i = 0; i < times.length; i++) {

    var pontos =
        (times[i].vitorias * 3) +
        (times[i].empates * 1);

    console.log(
        times[i].nome +
        " - " +
        pontos +
        " pontos"
    );

    somaPontos += pontos;

    if (pontos > maiorPontuacao.pontos) {
        maiorPontuacao = times[i];
        maiorPontuacao.pontos = pontos;
    }

    times[i].pontos = pontos;
}

var media = somaPontos / times.length;

console.log("\nTime com maior pontuacao: " + maiorPontuacao.nome);
console.log("Maior pontuacao: " + maiorPontuacao.pontos);
console.log("Media de pontos: " + media.toFixed(2));