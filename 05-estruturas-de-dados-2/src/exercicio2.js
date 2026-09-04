import leia from 'readline-sync';

var vendas = [];
var total = 0;
var media = 0;
var maior = 0;

for (var i = 0; i < 5; i++) {
    vendas[i] = Number(leia.question("Digite o valor da venda " + (i + 1) + ": "));

    total = total + vendas[i];

    if (i == 0 || vendas[i] > maior) {
        maior = vendas[i];
    }
}

media = total / 5;

console.log("\n=== RESULTADO ===");

console.log("Valores cadastrados:");

for (var i = 0; i < 5; i++) {
    console.log("Venda " + (i + 1) + ": R$ " + vendas[i].toFixed(2));
}

console.log("Valor total das vendas: R$ " + total.toFixed(2));
console.log("Média das vendas: R$ " + media.toFixed(2));
console.log("Maior valor registrado: R$ " + maior.toFixed(2));