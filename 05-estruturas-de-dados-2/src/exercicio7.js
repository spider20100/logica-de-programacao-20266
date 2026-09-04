import leia from "readline-sync";

var nomes = [];

for (var i = 0; i < 5; i++) {

    var nome = leia.question("Qual seu nome: ");

    nomes.push(nome);
}

console.log("Nomes cadastrados:");

for (var i = 0; i < nomes.length; i++) {

    console.log(nomes[i]);
}