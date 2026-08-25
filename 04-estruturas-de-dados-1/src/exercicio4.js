import readline from "readline-sync";

var opcao;
var total = 0;
var quantidade = 0;

while (opcao != 0) {

    console.log("\n===== MENU =====");
    console.log("1 - Hambúrguer - R$ 20,00");
    console.log("2 - Cachorro-quente - R$ 15,00");
    console.log("3 - Refrigerante - R$ 7,00");
    console.log("4 - Batata frita - R$ 12,00");
    console.log("0 - Finalizar pedido");

    opcao = Number(readline.question("Escolha uma opcao: "));

    if (opcao == 1) {

        total = total + 20;
        quantidade++;

        console.log("Hambúrguer adicionado!");

    } else if (opcao == 2) {

        total = total + 15;
        quantidade++;

        console.log("Cachorro-quente adicionado!");

    } else if (opcao == 3) {

        total = total + 7;
        quantidade++;

        console.log("Refrigerante adicionado!");

    } else if (opcao == 4) {

        total = total + 12;
        quantidade++;

        console.log("Batata frita adicionada!");

    } else if (opcao == 0) {

        console.log("Pedido finalizado!");

    } else {

        console.log("Opcao invalida! Tente novamente.");
    }
}

var media;

if (quantidade > 0) {
    media = total / quantidade;
} else {
    media = 0;
}

console.log("\n===== RESUMO DO PEDIDO =====");
console.log("Quantidade total de itens: " + quantidade);
console.log("Valor total da compra: R$ " + total.toFixed(2));
console.log("Valor medio por item: R$ " + media.toFixed(2));