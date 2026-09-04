import leia from "readline-sync";

var produtos = [];

var quantidade = leia.questionInt("Digite a quantidade de produtos: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- PRODUTO " + (i + 1) + " ---");

    var nome = leia.question("Digite o nome: ");
    var preco = leia.questionFloat("Digite o preco: ");
    var estoque = leia.questionInt("Digite a quantidade em estoque: ");

    var produto = {
        nome: nome,
        preco: preco,
        estoque: estoque
    };

    produtos.push(produto);
}

var maiorEstoque = produtos[0];
var menorEstoque = produtos[0];
var totalEstoque = 0;
var estoqueBaixo = 0;

console.log("\n=== PRODUTOS CADASTRADOS ===");

for (var i = 0; i < produtos.length; i++) {

    console.log(
        "Nome: " + produtos[i].nome +
        " | Preco: R$ " + produtos[i].preco.toFixed(2) +
        " | Estoque: " + produtos[i].estoque
    );

    totalEstoque += produtos[i].estoque;

    if (produtos[i].estoque > maiorEstoque.estoque) {
        maiorEstoque = produtos[i];
    }

    if (produtos[i].estoque < menorEstoque.estoque) {
        menorEstoque = produtos[i];
    }

    if (produtos[i].estoque < 10) {
        estoqueBaixo++;
    }
}

console.log("\nProduto com maior estoque: " + maiorEstoque.nome);
console.log("Produto com menor estoque: " + menorEstoque.nome);
console.log("Quantidade total em estoque: " + totalEstoque);
console.log("Produtos com estoque menor que 10: " + estoqueBaixo);