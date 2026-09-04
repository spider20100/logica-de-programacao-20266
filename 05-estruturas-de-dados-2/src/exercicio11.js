import leia from "readline-sync";

var funcionarios = [];

var quantidade = leia.questionInt("Digite a quantidade de funcionarios: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- FUNCIONARIO " + (i + 1) + " ---");

    var nome = leia.question("Digite o nome: ");
    var cargo = leia.question("Digite o cargo: ");
    var salario = leia.questionFloat("Digite o salario: ");

    var funcionario = {
        nome: nome,
        cargo: cargo,
        salario: salario
    };

    funcionarios.push(funcionario);
}

var maiorSalario = funcionarios[0];
var menorSalario = funcionarios[0];
var somaSalarios = 0;
var acima3000 = 0;

console.log("\n=== FUNCIONARIOS ===");

for (var i = 0; i < funcionarios.length; i++) {

    console.log(
        "Nome: " + funcionarios[i].nome +
        " | Cargo: " + funcionarios[i].cargo +
        " | Salario: R$ " + funcionarios[i].salario.toFixed(2)
    );

    somaSalarios += funcionarios[i].salario;

    if (funcionarios[i].salario > maiorSalario.salario) {
        maiorSalario = funcionarios[i];
    }

    if (funcionarios[i].salario < menorSalario.salario) {
        menorSalario = funcionarios[i];
    }

    if (funcionarios[i].salario > 3000) {
        acima3000++;
    }
}

var media = somaSalarios / funcionarios.length;

console.log("\nMaior salario: " + maiorSalario.nome);
console.log("Menor salario: " + menorSalario.nome);
console.log("Media salarial: R$ " + media.toFixed(2));
console.log("Funcionarios que recebem mais de R$ 3000: " + acima3000);