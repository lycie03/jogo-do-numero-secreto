let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// função com parametro
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    // codigo responsável por adcionar uma  descrição falada ao jogo
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

// função sem parametro
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        
        //ativa o botão 'novo jogo'
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo();
    }
}

// função com retorno
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantNumerosNaLista = listaDeNumerosSorteados.length;

    if (quantNumerosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    // 'includes' = método booleano que verifica se o elemento está na lista
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// função que limpa o valor no input a cada tentativa
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ' ';
}

// função que gera um novo número e reinicia o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;

    exibirMensagemInicial();

    // ativa o botão 'novo jogo' somente quando o número secreto é descoberto
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

