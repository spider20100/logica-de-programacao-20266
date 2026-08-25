import readline from "readline-sync";

var senhaCorreta = 4321;
var tentativas = 0;
var senha;
var acesso = false;

while (tentativas < 3) {

    senha = Number(readline.question("Digite a senha: "));
    tentativas++;

    if (senha === senhaCorreta) {
        console.log("Acesso permitido.");
        acesso = true;
        break;
    } else {
        console.log("Senha incorreta! Tente novamente.");
    }
}

if (acesso === false) {
    console.log("Acesso bloqueado.");
}

console.log("Tentativas utilizadas: " + tentativas);