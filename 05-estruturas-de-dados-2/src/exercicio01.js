import leia from 'readline-sync';

var cinema = [];
for (var i = 0; i < 20; i++) {
    var cadeira = {
        numero: (i < 10) ? "A" + (i + 1) : "B" + (i - 9),
        ocupado: false,
        tipo: (i < 5) ? "Preferencial" : "Normal"
    }

    cinema.push(cadeira);
}

function mostrarCinema() {
    console.log("======CADEIRAS========");
    cinema.forEach((cadeira) => {
        var situacao = cadeira.ocupado === true ? "OCUPADA" : "LIVRE";
        console.log(`Assento - ${cadeira.numero} | ${cadeira.tipo} | ${situacao}`)
    })
}

function reservarCadeira() {
    var reserva = leia.question("INFORME O ASSENTO: [A1-10 - B1-10]").toUpperCase();
    var encontrouCadeira = false;

    cinema.forEach((cadeira) => {
        if (cadeira.numero === reserva) {
            encontrouCadeira = true;
            if (cadeira.ocupado === true) {
                console.log("CADEIRA JÁ ESTÁ OCUPADA! TENTE NOVAMENTE")
            } else {
                cadeira.ocupado = true;
                console.log("CADEIRA RESERVADA COM SUCESSO!!!")
            }

            return;
        }
    })

    if (encontrouCadeira === false) {
        console.log("CADEIRA INFORMADA NÃO EXISTE")
    }
}

function cancelarReserva() {
    var reserva = leia.question("INFORME O ASSENTO: [A1-10 - B1-10]").toUpperCase();
    var encontrouCadeira = false;

    cinema.forEach((cadeira) => {
        if (cadeira.numero === reserva) {
            encontrouCadeira = true;
            if (cadeira.ocupado === false) {
                console.log("CADEIRA NÃO ESTÁ RESERVADA! TENTE NOVAMENTE")
            } else {
                cadeira.ocupado = false;
                console.log("RESERCA CANCELADA COM SUCESSO!!!")
            }

            return;
        }
    })

    if (encontrouCadeira === false) {
        console.log("CADEIRA INFORMADA NÃO EXISTE")
    }
}


var opcao;
do {
    console.log("\n=====CINEMA========")
    console.log("1 - Mostrar assentos")
    console.log("2 - Reservar assentos")
    console.log("3 - Cancelar assentos")
    console.log("4 - Mostrar quantidade livres")
    console.log("5 - Mostrar quantidade ocupados")
    console.log("0 - Sair")

    opcao = leia.questionInt("INFORME UMA OPCAO: ");

    if (opcao === 1) {
        mostrarCinema();
    } else if (opcao === 2) {
        reservarCadeira();
    } else if (opcao === 3) {
        // CANCELAR ASSENTOS
    } else if (opcao === 4) {
        // QUANTIDADE LIVRE ASSENTOS
    } else if (opcao === 5) {
        // QUANTIDADE OCUPADOS ASSENTOS
    } else {
        console.log("ENCERRANDO SISTEMA!!!")
    }
} while (opcao !== 0);

console.log("======SISTEMA ENCERRADO========");