import leia from 'readline-sync';

var livros = [];
var opcao = -1;

while (opcao != 0) {

    console.log("\n=== BIBLIOTECA ===");
    console.log("1 - Cadastrar livro");
    console.log("2 - Listar livros");
    console.log("3 - Pesquisar livro");
    console.log("0 - Sair");

    opcao = leia.questionInt("Escolha uma opcao: ");

    if (opcao == 1) {

        var titulo = leia.question("Digite o titulo do livro: ");
        var autor = leia.question("Digite o autor do livro: ");

        var livro = {
            titulo: titulo,
            autor: autor
        };

        livros.push(livro);

        console.log("Livro cadastrado com sucesso!");

    } else if (opcao == 2) {

        console.log("\n=== LIVROS CADASTRADOS ===");

        if (livros.length == 0) {

            console.log("Nenhum livro cadastrado.");

        } else {

            for (var i = 0; i < livros.length; i++) {

                console.log(
                    (i + 1) +
                    " - Titulo: " +
                    livros[i].titulo +
                    " | Autor: " +
                    livros[i].autor
                );
            }
        }

    } else if (opcao == 3) {

        var pesquisa = leia.question(
            "Digite o titulo do livro para pesquisar: "
        );

        var encontrado = false;

        for (var i = 0; i < livros.length; i++) {

            if (
                livros[i].titulo.toLowerCase() ==
                pesquisa.toLowerCase()
            ) {

                console.log("\n=== LIVRO ENCONTRADO ===");
                console.log("Titulo: " + livros[i].titulo);
                console.log("Autor: " + livros[i].autor);

                encontrado = true;
            }
        }

        if (encontrado == false) {

            console.log("Livro nao encontrado.");

        }

    } else if (opcao == 0) {

        console.log("Programa encerrado.");

    } else {

        console.log("Opcao invalida!");

    }
}