import leia from "readline-sync";

var clientes = [];
var quantidade = leia.questionInt("Digite a quantidade de clientes: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- CLIENTE " + (i + 1) + " ---");

    var nome = leia.question("Digite o nome: ");
    var idade = leia.questionInt("Digite a idade: ");
    var cidade = leia.question("Digite a cidade: ");

    var cliente = {
        nome: nome,
        idade: idade,
        cidade: cidade
    };

    clientes.push(cliente);
}

var maiores = 0;
var menores = 0;
var maisVelho = clientes[0];

console.log("\n=== CLIENTES CADASTRADOS ===");

for (var i = 0; i < clientes.length; i++) {

    console.log(
        "Nome: " + clientes[i].nome +
        " | Idade: " + clientes[i].idade +
        " | Cidade: " + clientes[i].cidade
    );

    if (clientes[i].idade >= 18) {
        maiores++;
    } else {
        menores++;
    }

    if (clientes[i].idade > maisVelho.idade) {
        maisVelho = clientes[i];
    }
}

console.log("\nQuantidade com 18 anos ou mais: " + maiores);
console.log("Quantidade com menos de 18 anos: " + menores);
console.log("Cliente mais velho: " + maisVelho.nome);