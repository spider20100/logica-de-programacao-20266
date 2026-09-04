import leia from 'readline-sync';

var produtos = [];

var quantidade = Number(
    leia.question("Digite a quantidade de produtos: ")
);

for (var i = 0; i < quantidade; i++) {

    var nome = leia.question("Digite o nome do produto " + (i + 1) + ": ");

    var preco = Number(
        leia.question("Digite o preco do produto: ")
    );

    var produto = {
        nome: nome,
        preco: preco
    };

    produtos.push(produto);
}

var pesquisa = leia.question("\nDigite o nome do produto para pesquisar: ");

var encontrado = false;

for (var i = 0; i < produtos.length; i++) {

    if (produtos[i].nome.toLowerCase() == pesquisa.toLowerCase()) {

        console.log("\n=== PRODUTO ENCONTRADO ===");
        console.log("Nome: " + produtos[i].nome);
        console.log("Preco: R$ " + produtos[i].preco.toFixed(2));

        encontrado = true;
    }
}

if (encontrado == false) {
    console.log("\nProduto nao encontrado.");
}