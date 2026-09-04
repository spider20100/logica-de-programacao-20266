import leia from "readline-sync";

var produtos = [];

for (var i = 0; i < 5; i++) {

    console.log("\n--- PRODUTO " + (i + 1) + " ---");

    var nome = leia.question("Digite o nome: ");
    var categoria = leia.question("Digite a categoria: ");
    var preco = leia.questionFloat("Digite o preco: ");

    var produto = {
        nome: nome,
        categoria: categoria,
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
        console.log("Categoria: " + produtos[i].categoria);
        console.log("Preco: R$ " + produtos[i].preco.toFixed(2));

        encontrado = true;
    }
}

if (encontrado == false) {
    console.log("\nProduto nao encontrado.");
}