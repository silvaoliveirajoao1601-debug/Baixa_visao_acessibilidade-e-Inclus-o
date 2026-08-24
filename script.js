/* =========================================
   SITE OLHAR E BAIXA VISÃO
   JavaScript de acessibilidade
========================================= */

// Tamanho padrão da fonte
let tamanhoFonte = 16;
const tamanhoMinimo = 14;
const tamanhoMaximo = 26;


/* =========================================
   AUMENTAR O TEXTO
========================================= */

function aumentarTexto() {
    if (tamanhoFonte < tamanhoMaximo) {
        tamanhoFonte += 2;
        document.documentElement.style.fontSize = tamanhoFonte + "px";

        localStorage.setItem("tamanhoFonte", tamanhoFonte);
    }
}


/* =========================================
   DIMINUIR O TEXTO
========================================= */

function diminuirTexto() {
    if (tamanhoFonte > tamanhoMinimo) {
        tamanhoFonte -= 2;
        document.documentElement.style.fontSize = tamanhoFonte + "px";

        localStorage.setItem("tamanhoFonte", tamanhoFonte);
    }
}


/* =========================================
   TAMANHO NORMAL
========================================= */

function tamanhoNormal() {
    tamanhoFonte = 16;

    document.documentElement.style.fontSize = "16px";

    localStorage.setItem("tamanhoFonte", tamanhoFonte);
}


/* =========================================
   ALTO CONTRASTE
========================================= */

function alternarContraste() {

    document.body.classList.toggle("high-contrast");

    const contrasteAtivo =
        document.body.classList.contains("high-contrast");

    localStorage.setItem(
        "altoContraste",
        contrasteAtivo
    );
}


/* =========================================
   LEITOR DE TEXTO
========================================= */

function lerTexto(texto = null) {

    // Para qualquer leitura anterior
    window.speechSynthesis.cancel();

    let conteudo = texto;

    // Se nenhum texto foi enviado,
    // pega o conteúdo da caixa de texto
    if (!conteudo) {

        const caixa =
            document.getElementById("fala");

        if (caixa) {
            conteudo = caixa.value;
        }
    }

    if (!conteudo || conteudo.trim() === "") {

        alert(
            "Digite algum texto para que o leitor possa fazer a leitura."
        );

        return;
    }

    const leitura =
        new SpeechSynthesisUtterance(conteudo);

    leitura.lang = "pt-BR";
    leitura.rate = 0.9;
    leitura.pitch = 1;

    window.speechSynthesis.speak(leitura);
}


/* =========================================
   PARAR LEITURA
========================================= */

function pararLeitura() {

    window.speechSynthesis.cancel();
}


/* =========================================
   LER TEXTO SELECIONADO
========================================= */

function lerSelecao() {

    const selecionado =
        window.getSelection().toString();

    if (!selecionado) {

        alert(
            "Selecione um texto da página para fazer a leitura."
        );

        return;
    }

    lerTexto(selecionado);
}


/* =========================================
   INVERTER CORES
========================================= */

function inverterCores() {

    document.body.classList.toggle("inverter-cores");

    const ativo =
        document.body.classList.contains("inverter-cores");

    localStorage.setItem(
        "coresInvertidas",
        ativo
    );
}


/* =========================================
   SALVAR PREFERÊNCIAS
========================================= */

function carregarPreferencias() {

    // Tamanho da fonte
    const fonteSalva =
        localStorage.getItem("tamanhoFonte");

    if (fonteSalva) {

        tamanhoFonte =
            Number(fonteSalva);

        document.documentElement.style.fontSize =
            tamanhoFonte + "px";
    }


    // Alto contraste
    const contrasteSalvo =
        localStorage.getItem("altoContraste");

    if (contrasteSalvo === "true") {

        document.body.classList.add(
            "high-contrast"
        );
    }


    // Cores invertidas
    const coresSalvas =
        localStorage.getItem("coresInvertidas");

    if (coresSalvas === "true") {

        document.body.classList.add(
            "inverter-cores"
        );
    }
}


/* =========================================
   BOTÃO VOLTAR AO TOPO
========================================= */

function voltarAoTopo() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================
   TECLADO
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        // Alt + +
        if (event.altKey && event.key === "+") {
            aumentarTexto();
        }

        // Alt + -
        if (event.altKey && event.key === "-") {
            diminuirTexto();
        }

        // Alt + C
        if (
            event.altKey &&
            event.key.toLowerCase() === "c"
        ) {
            alternarContraste();
        }

        // Esc para parar leitura
        if (event.key === "Escape") {
            pararLeitura();
        }
    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        carregarPreferencias();

        console.log(
            "Site Olhar e Baixa Visão carregado."
        );
    }
);