// Questão 2a
function alterarTexto() {
  const elemento = document.getElementById("paragrafo-id");
  elemento.innerText = "Texto alterado com getElementById()!";
}

// Questão 2b
function listarItens() {
  const itens = document.getElementsByTagName("li");
  console.log("Itens encontrados:");
  for (let i = 0; i < itens.length; i++) {
    console.log(`- ${itens[i].innerText}`);
  }
}


// Questão 3
function contarParagrafos() {
  const div = document.getElementById("conteudo");
  const paragrafos = div.getElementsByTagName("p");
  const quantidade = paragrafos.length;
  document.getElementById("resultado").innerText = `Total de parágrafos: ${quantidade}`;
}

// Questão 4
document.addEventListener("DOMContentLoaded", function () {
    const botaoQ4 = document.getElementById("botao-q4");
    const paragrafoQ4 = document.getElementById("paragrafo-q4");

    const frases = [
        "Hoje é um ótimo dia para aprender JavaScript!",
        "A prática leva à perfeição.",
        "DOM significa Document Object Model.",
        "Cliquei e apareceu uma nova frase!",
        "Vamos dominar o JavaScript passo a passo!"
    ];

    botaoQ4.addEventListener("click", function () {
    const indiceAleatorio = Math.floor(Math.random() * frases.length);
    paragrafoQ4.textContent = frases[indiceAleatorio];
    });


  limparQ4.addEventListener("click", function () {
    paragrafoQ4.textContent = "";
  });
});


// Questão 5: textContent vs innerText vs innerHTML
function mostrarDiferencas() {
  const el = document.getElementById("teste-html");
  console.log("textContent:", el.textContent);
  console.log("innerText:", el.innerText);
  console.log("innerHTML:", el.innerHTML);
}

// Questão 6: Alterar estilo via DOM
function alterarEstilo() {
  const p = document.getElementById("paragrafo-estilo");
  p.style.color = "green";
  p.style.fontSize = "20px";
  p.style.fontWeight = "bold";
}

// Questão 7: Copiar texto em caixa alta
function copiarCaixaAlta() {
  const entrada = document.getElementById("entrada");
  const saida = document.getElementById("saida");
  saida.value = entrada.value.toUpperCase();
}

// Questão 8: Modo alto contraste e reset
function ativarAltoContraste() {
  document.body.classList.add("contraste-alto");
}

function resetarCores() {
  document.body.classList.remove("contraste-alto");
}

// Questão 9: Alterar tamanho da fonte da página
let tamanhoFonte = 16; // valor base em px
function alterarFonte(valor) {
  tamanhoFonte += valor;
  if (tamanhoFonte < 10) tamanhoFonte = 10;
  document.body.style.fontSize = `${tamanhoFonte}px`;
}

// Questão 10: Calculadora
function calcular() {
  const n1 = parseFloat(document.getElementById("calc1").value);
  const n2 = parseFloat(document.getElementById("calc2").value);
  const operacoes = document.getElementsByName("operacao");
  let operacaoSelecionada;

  for (let op of operacoes) {
    if (op.checked) {
      operacaoSelecionada = op.value;
      break;
    }
  }

  let resultado;
  switch (operacaoSelecionada) {
    case "soma":
      resultado = n1 + n2;
      break;
    case "subtracao":
      resultado = n1 - n2;
      break;
    case "multiplicacao":
      resultado = n1 * n2;
      break;
    case "divisao":
      resultado = n2 !== 0 ? n1 / n2 : "Erro: divisão por zero";
      break;
  }

  document.getElementById("resultado-calc").innerHTML = `<strong>Resultado:</strong> ${resultado}`;
}

// Questão 11: Adicionar item à lista
function adicionarNaLista() {
  const texto = document.getElementById("texto-lista").value;
  if (texto.trim() !== "") {
    const li = document.createElement("li");
    li.textContent = texto;
    document.getElementById("lista-ul").appendChild(li);
    document.getElementById("texto-lista").value = "";
  }
}

// Questão 12: Adicionar item ao select
function adicionarNoSelect() {
  const texto = document.getElementById("texto-select").value;
  if (texto.trim() !== "") {
    const option = document.createElement("option");
    option.text = texto;
    option.value = texto.toLowerCase();
    document.getElementById("select-opcoes").appendChild(option);
    document.getElementById("texto-select").value = "";
  }
}
