import leia from "readline-sync";

var alunos = [];
var opcao = 0;

while (opcao != 0) {

    console.log("\n==============================");
    console.log("       SISTEMA DE ALUNOS");
    console.log("==============================");
    console.log("1 - Cadastrar aluno");
    console.log("2 - Listar alunos");
    console.log("3 - Pesquisar aluno");
    console.log("4 - Mostrar aprovados");
    console.log("5 - Mostrar reprovados");
    console.log("0 - Sair");

    opcao = leia.questionInt("Escolha uma opcao: ");

    if (opcao == 1) {

        var nome = leia.question("Digite o nome: ");

        var nota;

        do {
            nota = leia.questionFloat("Digite a nota de 0 a 10: ");

            if (nota < 0 || nota > 10) {
                console.log("Nota invalida!");
            }

        } while (nota < 0 || nota > 10);

        var aluno = {
            nome: nome,
            nota: nota
        };

        alunos.push(aluno);

        console.log("Aluno cadastrado com sucesso!");

    } else if (opcao == 2) {

        console.log("\n=== ALUNOS CADASTRADOS ===");

        if (alunos.length == 0) {
            console.log("Nenhum aluno cadastrado.");
        }

        for (var i = 0; i < alunos.length; i++) {

            console.log(
                "Nome: " + alunos[i].nome +
                " | Nota: " + alunos[i].nota
            );
        }

    } else if (opcao == 3) {

        var pesquisa = leia.question("Digite o nome do aluno: ");
        var encontrado = false;

        for (var i = 0; i < alunos.length; i++) {

            if (alunos[i].nome.toLowerCase() == pesquisa.toLowerCase()) {

                console.log("\nAluno encontrado!");
                console.log("Nome: " + alunos[i].nome);
                console.log("Nota: " + alunos[i].nota);

                encontrado = true;
            }
        }

        if (encontrado == false) {
            console.log("Aluno nao encontrado.");
        }

    } else if (opcao == 4) {

        console.log("\n=== APROVADOS ===");

        for (var i = 0; i < alunos.length; i++) {

            if (alunos[i].nota >= 7) {
                console.log(
                    alunos[i].nome +
                    " - Nota: " + alunos[i].nota
                );
            }
        }

    } else if (opcao == 5) {

        console.log("\n=== REPROVADOS ===");

        for (var i = 0; i < alunos.length; i++) {

            if (alunos[i].nota < 7) {
                console.log(
                    alunos[i].nome +
                    " - Nota: " + alunos[i].nota
                );
            }
        }

    } else if (opcao == 0) {

        console.log("Programa encerrado.");

    } else {

        console.log("Opcao invalida!");
    }
}