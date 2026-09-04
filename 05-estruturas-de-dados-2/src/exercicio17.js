import leia from "readline-sync";

var compras = [];

var quantidade = leia.questionInt("Digite a quantidade de compras: ");

for (var i = 0; i < quantidade; i++) {

    console.log("\n--- COMPRA " + (i + 1) + " ---");

    var cliente = leia.question("Digite o nome do cliente: ");
    var produto = leia.question("Digite o produto: ");
    var valor = leia.questionFloat("Digite o valor da compra: ");

    var compra = {
        cliente: cliente,
        produto: produto,
        valor: valor
    };

    compras.push(compra);
}

var maiorCompra = compras[0];
var menorCompra = compras[0];
var total = 0;
var acima100 = 0;

console.log("\n=== COMPRAS ===");

for (var i = 0; i < compras.length; i++) {

    console.log(
        "Cliente: " + compras[i].cliente +
        " | Produto: " + compras[i].produto +
        " | Valor: R$ " + compras[i].valor.toFixed(2)
    );

    total += compras[i].valor;

    if (compras[i].valor > maiorCompra.valor) {
        maiorCompra = compras[i];
    }

    if (compras[i].valor < menorCompra.valor) {
        menorCompra = compras[i];
    }

    if (compras[i].valor > 100) {
        acima100++;
    }
}

var media = total / compras.length;

console.log("\nMaior compra: " + maiorCompra.cliente);
console.log("Valor: R$ " + maiorCompra.valor.toFixed(2));

console.log("\nMenor compra: " + menorCompra.cliente);
console.log("Valor: R$ " + menorCompra.valor.toFixed(2));

console.log("\nValor total vendido: R$ " + total.toFixed(2));
console.log("Media das compras: R$ " + media.toFixed(2));
console.log("Compras acima de R$ 100: " + acima100);