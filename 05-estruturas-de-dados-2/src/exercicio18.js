import leia from "readline-sync";

var livros = [];
var opcao = 0;

while (opcao != 0) {

    console.log("\n==============================");
    console.log("       BIBLIOTECA");
    console.log("==============================");
    console.log("1 - Cadastrar livro");
    console.log("2 - Listar livros");
    console.log("3 - Pesquisar livro");
    console.log("4 - Mostrar livros recentes");
    console.log("0 - Sair");

    opcao = leia.questionInt("Escolha uma opcao: ");

    if (opcao == 1) {

        var titulo = leia.question("Digite o titulo: ");
        var autor = leia.question("Digite o autor: ");
        var ano = leia.questionInt("Digite o ano: ");

        var livro = {
            titulo: titulo,
            autor: autor,
            ano: ano
        };

        livros.push(livro);

        console.log("Livro cadastrado!");

    } else if (opcao == 2) {

        console.log("\n=== LIVROS ===");

        for (var i = 0; i < livros.length; i++) {

            console.log(
                "Titulo: " + livros[i].titulo +
                " | Autor: " + livros[i].autor +
                " | Ano: " + livros[i].ano
            );
        }

    } else if (opcao == 3) {

        var pesquisa = leia.question("Digite o titulo do livro: ");
        var encontrado = false;

        for (var i = 0; i < livros.length; i++) {

            if (livros[i].titulo.toLowerCase() == pesquisa.toLowerCase()) {

                console.log("\nLivro encontrado!");
                console.log("Titulo: " + livros[i].titulo);
                console.log("Autor: " + livros[i].autor);
                console.log("Ano: " + livros[i].ano);

                encontrado = true;
            }
        }

        if (encontrado == false) {
            console.log("Livro nao encontrado.");
        }

    } else if (opcao == 4) {

        console.log("\n=== LIVROS RECENTES ===");

        for (var i = 0; i < livros.length; i++) {

            if (livros[i].ano >= 2020) {

                console.log(
                    livros[i].titulo +
                    " - " + livros[i].ano
                );
            }
        }

    } else if (opcao == 0) {

        console.log("Programa encerrado.");

    } else {

        console.log("Opcao invalida!");
    }
}