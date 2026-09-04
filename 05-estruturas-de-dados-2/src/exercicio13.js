import leia from "readline-sync";

var alunos = [];

var quantidade = leia.questionInt("Digite a quantidade de alunos: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- ALUNO " + (i + 1) + " ---");

    var nome = leia.question("Digite o nome: ");

    var nota;

    do {
        nota = leia.questionFloat("Digite a nota de 0 a 10: ");

        if (nota < 0 || nota > 10) {
            console.log("Nota invalida!");
        }

    } while (nota < 0 || nota > 10);

    var aluno = {
        nome: nome,
        nota: nota
    };

    alunos.push(aluno);
}

var maiorNota = alunos[0];
var menorNota = alunos[0];
var soma = 0;
var aprovados = 0;
var reprovados = 0;

console.log("\n=== ALUNOS ===");

for (var i = 0; i < alunos.length; i++) {

    console.log(
        "Nome: " + alunos[i].nome +
        " | Nota: " + alunos[i].nota
    );

    soma += alunos[i].nota;

    if (alunos[i].nota > maiorNota.nota) {
        maiorNota = alunos[i];
    }

    if (alunos[i].nota < menorNota.nota) {
        menorNota = alunos[i];
    }

    if (alunos[i].nota >= 7) {
        aprovados++;
    } else {
        reprovados++;
    }
}

var media = soma / alunos.length;

console.log("\nMaior nota: " + maiorNota.nome);
console.log("Menor nota: " + menorNota.nome);
console.log("Media da turma: " + media.toFixed(2));
console.log("Aprovados: " + aprovados);
console.log("Reprovados: " + reprovados);