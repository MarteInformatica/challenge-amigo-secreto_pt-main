let participantes = [];
let sorteados = new Set();

function formatarNome(nome) {
    return nome.toLowerCase().replace(/\b\w/g, letra => letra.toUpperCase());
}

function verificarEntrada() {
    let nomeInput = document.getElementById("amigo");
    let botaoAdicionar = document.querySelector(".button-add");
    let nome = nomeInput.value.trim();

  
    let regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    botaoAdicionar.disabled = !regex.test(nome) || nome === "";
}

function adicionarAmigo() {
    let nomeInput = document.getElementById("amigo");
    let mensagemErro = document.getElementById("mensagemErro"); 
    let nome = formatarNome(nomeInput.value.trim());

   
    if (!nome.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)) {
        if (mensagemErro) {
            mensagemErro.textContent = "Digite um nome válido!";
        }
        console.log("Nome inválido! Por favor, Digite um nome válido.");
        return;
    }
    if (participantes.includes(nome)) {    
        if (mensagemErro) {
           let mensagemErro = "Este nome já foi adicionado.";
           resultado.innerHTML = mensagemErro;
        falarTexto(mensagemErro); 
        }
        console.log("Este nome já foi adicionado!");
        return;
    }

    if (mensagemErro) {
        mensagemErro.textContent = ""; 
    }
    participantes.push(nome);
    console.log(`Nome adicionado: ${nome}`);
    nomeInput.value = "";
    
   
    atualizarListaAmigos();
    verificarEntrada();  
}

function atualizarListaAmigos() {
    console.log("Lista de participantes atualizada:", participantes);
}


function detectarGenero(nome) {
    let sufixosFemininos = ["a", "e", "i"];
    return sufixosFemininos.includes(nome.slice(-1).toLowerCase()) ? "A amiga sorteada é" : "O amigo sorteado é";
}

function falarTexto(texto) {
    let sintese = window.speechSynthesis;
    let fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
    sintese.speak(fala);
}

// sorteando o amigo secreto
function sortearAmigo() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (participantes.length === 0) {
        let mensagem = "Nenhum nome na lista para sortear!";
        console.log(mensagem);
        resultado.innerHTML = mensagem;
        falarTexto(mensagem);
        return;
    }
              // exibe a  mensagem em voz alta
    if (sorteados.size === participantes.length) {
        let mensagem = "Todos os participantes já foram sorteados!";
        console.log(mensagem);
        resultado.innerHTML = mensagem;
        falarTexto(mensagem); 
    
        // Exibir mensagem final após 5 segundos
        setTimeout(() => {
        let mensagemFinal = "Agradecemos a sua participação. Até a próxima!";
        console.log(mensagemFinal);
        resultado.innerHTML = mensagemFinal;
        falarTexto(mensagemFinal);
        }, 5000);
        return;       
    }
    let sorteado;
    do {
        let indice = Math.floor(Math.random() * participantes.length);
        sorteado = participantes[indice];
    } while (sorteados.has(sorteado));

    sorteados.add(sorteado);
    let mensagem = `${detectarGenero(sorteado)} ${sorteado}`;
    console.log(`Sorteado: ${sorteado}`);
    resultado.innerHTML = mensagem;
    falarTexto(mensagem);
}

document.getElementById("amigo").addEventListener("input", verificarEntrada);
document.querySelector(".button-add").disabled = true;