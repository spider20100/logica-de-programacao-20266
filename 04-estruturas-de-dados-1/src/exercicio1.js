import leia from "readline-sync";

var quantidade = Number(leia.question("Digite a quantidade de vendedores: "));

var total = 0;
var mais5000 = 0;
var ate5000 = 0;

for (var i = 1; i <= quantidade; i++) {

    var vendas = Number(
        leia.question("Digite o total de vendas do vendedor " + i + ": R$ ")
    );

    total = total + vendas;

    if (vendas > 5000) {
        mais5000++;
    } else {
        ate5000++;
    }
}

var media = total / quantidade;

console.log("\n===== RESULTADO =====");
console.log("Vendedores que venderam mais de R$ 5.000: " + mais5000);
console.log("Vendedores que venderam R$ 5.000 ou menos: " + ate5000);
console.log("Valor total vendido: R$ " + total.toFixed(2));
console.log("Média de vendas: R$ " + media.toFixed(2));

