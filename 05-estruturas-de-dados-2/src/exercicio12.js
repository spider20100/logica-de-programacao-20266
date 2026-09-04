import leia from "readline-sync";

var filmes = [];

var quantidade = leia.questionInt("Digite a quantidade de filmes: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- FILME " + (i + 1) + " ---");

    var titulo = leia.question("Digite o titulo: ");
    var genero = leia.question("Digite o genero: ");

    var nota;

    do {
        nota = leia.questionFloat("Digite a nota de 0 a 10: ");

        if (nota < 0 || nota > 10) {
            console.log("Nota invalida! Digite novamente.");
        }

    } while (nota < 0 || nota > 10);

    var filme = {
        titulo: titulo,
        genero: genero,
        nota: nota
    };

    filmes.push(filme);
}

var maiorNota = filmes[0];
var somaNotas = 0;
var aprovados = 0;

console.log("\n=== FILMES CADASTRADOS ===");

for (var i = 0; i < filmes.length; i++) {

    console.log(
        "Titulo: " + filmes[i].titulo +
        " | Genero: " + filmes[i].genero +
        " | Nota: " + filmes[i].nota
    );

    somaNotas += filmes[i].nota;

    if (filmes[i].nota > maiorNota.nota) {
        maiorNota = filmes[i];
    }

    if (filmes[i].nota >= 7) {
        aprovados++;
    }
}

var media = somaNotas / filmes.length;

console.log("\nFilme com maior nota: " + maiorNota.titulo);
console.log("Media das notas: " + media.toFixed(2));
console.log("Filmes com nota maior ou igual a 7: " + aprovados);