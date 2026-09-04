import leia from 'readline-sync';

var alunos = [];

for (var i = 0; i < 5; i++) {

    var nome = leia.question("Digite o nome do estudante " + (i + 1) + ": ");

    var nota = Number(leia.question("Digite sua nota" + nome + ": "));

    var aluno = {
        nome: nome,
        idade: nota,

    }
    alunos.push(aluno)
}
console.log("nota alunos: ")

for (var i = 0; i < alunos.length; i++) {
    alunos[i].nome
    alunos[i].nota

    console.log(alunos[i].nome)
    console.log(alunos[i].nota)
}