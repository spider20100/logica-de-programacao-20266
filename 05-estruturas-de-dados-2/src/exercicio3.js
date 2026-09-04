import leia from 'readline-sync';

var estudantes = [];
var maioresOuIguais = 0;
var menores = 0;

for (var i = 0; i < 3; i++) {

    var nome = leia.question("Digite o nome do estudante " + (i + 1) + ": ");

    var nota = Number(leia.question("Digite a nota de " + nome + ": "));

    while (nota < 0 || nota > 10) {
        console.log("Nota inválida! Digite uma nota entre 0 e 10.");
        nota = Number(leia.question("Digite a nota novamente: "));
    }

    var estudante = {
        nome: nome,
        nota: nota
    };

    estudantes.push(estudante);

    if (nota >= 7) {
        maioresOuIguais++;
    } else {
        menores++;
    }
}

console.log("\n=== RESULTADO ===");

for (var i = 0; i < estudantes.length; i++) {
    console.log(
        "Nome: " + estudantes[i].nome +
        " | Nota: " + estudantes[i].nota
    );
}

console.log("\nQuantidade com nota maior ou igual a 7: " + maioresOuIguais);
console.log("Quantidade com nota menor que 7: " + menores);