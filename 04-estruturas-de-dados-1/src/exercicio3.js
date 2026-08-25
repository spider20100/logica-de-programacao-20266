import leia from "readline-sync";

var quantidade = leia.questionInt("Digite a quantidade de abastecimentos: ");

var gasolina = 0;
var etanol = 0;
var diesel = 0;

var totalLitros = 0;
var totalArrecadado = 0;

for (var i = 1; i <= quantidade; i++) {

    var tipo;
    var litros;
    var valorLitro;
    var nomeCombustivel;
    var valido = false;

    while (valido == false) {

        console.log("\nAbastecimento " + i);
        console.log("1 - Gasolina");
        console.log("2 - Etanol");
        console.log("3 - Diesel");

        tipo = leia.questionInt("Escolha o tipo de combustivel: ");

        if (tipo == 1) {

            nomeCombustivel = "Gasolina";
            valorLitro = 6.20;
            gasolina++;
            valido = true;

        } else if (tipo == 2) {

            nomeCombustivel = "Etanol";
            valorLitro = 4.30;
            etanol++;
            valido = true;

        } else if (tipo == 3) {

            nomeCombustivel = "Diesel";
            valorLitro = 5.90;
            diesel++;
            valido = true;

        } else {

            console.log("Combustivel invalido! Digite novamente.");
        }
    }

    litros = leia.questionInt( "Digite a quantidade de litros abastecidos: ");

    var valorPagar = litros * valorLitro;

    console.log("Combustivel: " + nomeCombustivel);
    console.log("Valor a pagar: R$ " + valorPagar.toFixed(2));

    totalLitros = totalLitros + litros;
    totalArrecadado = totalArrecadado + valorPagar;
}

console.log("\n===== RESULTADO FINAL =====");

console.log("Abastecimentos com gasolina: " + gasolina);
console.log("Abastecimentos com etanol: " + etanol);
console.log("Abastecimentos com diesel: " + diesel);

console.log("Total de litros vendidos: " + totalLitros.toFixed(2) + " litros");
console.log("Valor total arrecadado: R$ " + totalArrecadado.toFixed(2));

if (gasolina > etanol && gasolina > diesel) {

    console.log("Combustivel com maior quantidade de abastecimentos: Gasolina");

} else if (etanol > gasolina && etanol > diesel) {

    console.log("Combustivel com maior quantidade de abastecimentos: Etanol");

} else if (diesel > gasolina && diesel > etanol) {

    console.log("Combustivel com maior quantidade de abastecimentos: Diesel");

} else {

    console.log("Houve empate na quantidade de abastecimentos.");
}