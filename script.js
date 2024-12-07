const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco'); // Botão para foco
const curtoBt = document.querySelector('.app__card-button--curto'); // Botão para descanso curto
const longoBt = document.querySelector('.app__card-button--longo'); // Botão para descanso longo
const banner = document.querySelector('.app__image'); // Imagens das Páginas
const titulo = document.querySelector('.app__title'); // Texto das Páginas
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBtIcone = document.querySelector('#start-pause img'); // Seleciona o ícone (img) dentro do botão
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer')
const musica = new Audio('/sons/luna-rise-part-one.mp3');
musica.loop = true;
musica.volume = 0.5;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
const beepSound = new Audio('/sons/beep.mp3');
const audioPausa = new Audio('/sons/pause.mp3');
const audioPlay = new Audio('/sons/play.wav');
// Atribuindo um valor correto ao pauseIcone ou removê-lo caso não seja usado
// const pauseIcone = document.querySelector(''); 

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

// Novo evento para foco
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});
// Novo evento para descanso curto
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

// Novo evento para descanso longo
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

// Função para alterar contexto e imagem
function alterarContexto(contexto) {
    mostrarTempo()
    botoes.forEach(function(botao) {
        botao.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
               Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;

        case "descanso-curto":
            titulo.innerHTML = `
                Pausa rápida,<br>
                <strong class="app__title-strong">recarregue suas energias.</strong>
            `;
            break;

        case "descanso-longo":
            titulo.innerHTML = `
                Relaxe profundamente,<br>
                <strong class="app__title-strong">é hora de um descanso prolongado.</strong>
            `;
            break;

        default:
            titulo.innerHTML = `
                Bem-vindo,<br>
                <strong class="app__title-strong">selecione uma opção.</strong>
            `;
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        beepSound.play();
        zerar();
        alert('Tempo Finalizado!');
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()

}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        // Se já está rodando, ao clicar ele pausa
        audioPausa.play(); // Toca o som de pausa
        iniciarOuPausarBt.textContent = "Começar"; // Altera o texto para "Começar"
        iniciarOuPausarBtIcone.setAttribute('src', '/imagens/play_arrow.png'); // Altera o ícone para "play"
        zerar(); // Para o temporizador
        return;
    }

    // Se estava pausado, ao clicar ele inicia
    audioPlay.play(); // Toca o som de início
    intervaloId = setInterval(contagemRegressiva, 1000); // Inicia o temporizador
    iniciarOuPausarBt.textContent = "Pausar"; // Altera o texto para "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/pause.png'); // Altera o ícone para "pause"
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar";
    iniciarOuPausarBtIcone.setAttribute('src', '/imagens/play_arrow.png')
    intervaloId = null;

}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo()