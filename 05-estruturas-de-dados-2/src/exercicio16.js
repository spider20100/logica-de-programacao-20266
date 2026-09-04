import leia from "readline-sync";

var numeros = [];

for (var i = 0; i < 10; i++) {

    var numero = leia.questionInt(
        "Digite o " + (i + 1) + " numero: "
    );

    numeros.push(numero);
}

var pares = 0;
var impares = 0;
var somaPares = 0;
var somaImpares = 0;

var maior = numeros[0];
var menor = numeros[0];

for (var i = 0; i < numeros.length; i++) {

    if (numeros[i] % 2 == 0) {

        pares++;
        somaPares += numeros[i];

    } else {

        impares++;
        somaImpares += numeros[i];
    }

    if (numeros[i] > maior) {
        maior = numeros[i];
    }

    if (numeros[i] < menor) {
        menor = numeros[i];
    }
}

console.log("\n=== RESULTADOS ===");

console.log("Numeros digitados:");

for (var i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);
}

console.log("\nQuantidade de pares: " + pares);
console.log("Quantidade de impares: " + impares);
console.log("Soma dos pares: " + somaPares);
console.log("Soma dos impares: " + somaImpares);
console.log("Maior numero: " + maior);
console.log("Menor numero: " + menor);