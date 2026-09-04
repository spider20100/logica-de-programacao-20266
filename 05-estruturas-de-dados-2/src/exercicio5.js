import leia from 'readline-sync';

var funcionarios = [];

var quantidade = Number(
    leia.question("Digite a quantidade de funcionarios: ")
);

for (var i = 0; i < quantidade; i++) {

    var nome = leia.question(
        "Digite o nome do funcionario " + (i + 1) + ": "
    );

    var idade = Number(
        leia.question("Digite a idade de " + nome + ": ")
    );

    var funcionario = {
        nome: nome,
        idade: idade
    };

    funcionarios.push(funcionario);
}

var maioresOuIguais18 = 0;
var menores18 = 0;

var funcionarioMaisVelho = funcionarios[0];

for (var i = 0; i < funcionarios.length; i++) {

    if (funcionarios[i].idade >= 18) {
        maioresOuIguais18++;
    } else {
        menores18++;
    }

    if (funcionarios[i].idade > funcionarioMaisVelho.idade) {
        funcionarioMaisVelho = funcionarios[i];
    }
}

console.log("\n=== RESULTADO ===");

for (var i = 0; i < funcionarios.length; i++) {
    console.log(
        "Nome: " + funcionarios[i].nome +
        " | Idade: " + funcionarios[i].idade
    );
}

console.log(
    "\nQuantidade com 18 anos ou mais: " + maioresOuIguais18
);

console.log(
    "Quantidade com menos de 18 anos: " + menores18
);

console.log(
    "Funcionario mais velho: " +
    funcionarioMaisVelho.nome +
    " (" +
    funcionarioMaisVelho.idade +
    " anos)"
);