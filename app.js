//troca conteudo da tag do HTML
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.4});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p','Escolha um numero de 1 a 10');    
}

exibirMensagemInicial();

//quantidade de vezes que chutou
let tentativa = 1;
let listaNumerosEscolhidos = [];
let numeroLimite = 5;

//quando o botao "chute é clicado" ocorre isso
function verificarChute() {
    //chute recebe o valor inserido no "input"
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto em ${tentativa} ${palavraTentativa}!`;

        exibirTextoNaTela('h1', 'Acertou');
        exibirTextoNaTela('p', mensagemTentativas);

        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {

        if (chute < numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é maior');
            
        } else {
            exibirTextoNaTela('p', 'O número secreto é menor');
        }
        tentativa++;
        limparCampo();
    }
}

//Gera numero aleatorio
function numeroAleatorio() {
    let numeroSorteado = parseInt(Math.random()*numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosEscolhidos.length;

    if (quantidadeElementosLista == numeroLimite) {
        listaNumerosEscolhidos = [];
    }

    if (listaNumerosEscolhidos.includes(numeroSorteado)) {
        return numeroAleatorio();
    } else {
        listaNumerosEscolhidos.push(numeroSorteado);
        console.log(listaNumerosEscolhidos);
        return numeroSorteado;
    }
}

//variavel que recebe o numero aleatorio
let numeroSecreto = numeroAleatorio();

//limpa o input apos cliclar no botao "chute"
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = numeroAleatorio();
    limparCampo();
    tentativa = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}