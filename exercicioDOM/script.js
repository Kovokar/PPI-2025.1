// Questão 2
function exibirTextoPorId() {
  const el = document.getElementById("conteudoId");
  document.getElementById(
    "resultadoId"
  ).textContent = `Texto pelo ID: ${el.textContent}`;
}

function exibirTextoPorClasse() {
  const el = document.getElementsByClassName("conteudoClasse")[0];
  document.getElementById(
    "resultadoClasse"
  ).textContent = `Texto pela Classe: ${el.textContent}`;
}

// Questão 3
function contarParagrafos() {
  const div = document.getElementById("conteudo");
  const paragrafos = div.getElementsByTagName("p");
  document.getElementById(
    "resultado"
  ).textContent = `Quantidade de parágrafos: ${paragrafos.length}`;
}

// Questão 4
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botao").addEventListener("click", function () {
    document.getElementById("paragrafo").textContent =
      "O texto deste parágrafo foi alterado!";
  });

  document.getElementById("limpar").addEventListener("click", function () {
    document.getElementById("paragrafo").textContent = "";
  });
});

// Questão 5
function mostrarTextos() {
  const el = document.getElementById("textTarget");
  const saida = document.getElementById("saida");
  saida.textContent = `textContent: ${el.textContent}\ninnerText: ${el.innerText}\ninnerHTML: ${el.innerHTML}`;
}

// Questão 6
function alterarEstilo(cor) {
  const el = document.getElementById("css-texto");
  el.style.color = cor;
  el.style.fontWeight = "bold";
}

// Questão 7
function copiarCaixaAlta() {
  const origem = document.getElementById("origem").value;
  document.getElementById("destino").value = origem.toUpperCase();
}

// Questão 8
function ativarContraste() {
  document.body.style.backgroundColor = "black";
  document.body.style.color = "white";
}

function resetarContraste() {
  document.body.style.backgroundColor = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--cor-fundo");
  document.body.style.color = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--cor-texto");
}

// Questão 9
let tamanhoAtual = 16;
function aumentarTexto() {
  tamanhoAtual += 2;
  document.body.style.fontSize = `${tamanhoAtual}px`;
}

function diminuirTexto() {
  tamanhoAtual = Math.max(10, tamanhoAtual - 2);
  document.body.style.fontSize = `${tamanhoAtual}px`;
}

// Questão 10
function calcular() {
  const v1 = parseFloat(document.getElementById("valor1").value);
  const v2 = parseFloat(document.getElementById("valor2").value);
  const opcoes = document.getElementsByName("operacao");
  let operacao;

  for (let opcao of opcoes) {
    if (opcao.checked) {
      operacao = opcao.value;
      break;
    }
  }

  if (!operacao || isNaN(v1) || isNaN(v2)) {
    document.getElementById("resultadoCalc").textContent =
      "Preencha os valores e selecione uma operação.";
    return;
  }

  let resultado;
  switch (operacao) {
    case "+":
      resultado = v1 + v2;
      break;
    case "-":
      resultado = v1 - v2;
      break;
    case "*":
      resultado = v1 * v2;
      break;
    case "/":
      resultado = v2 !== 0 ? v1 / v2 : "Erro: divisão por zero";
      break;
  }

  document.getElementById(
    "resultadoCalc"
  ).textContent = `Resultado: ${resultado}`;
}

// Questão 11
function adicionarItemLista() {
  const input = document.getElementById("itemLista");
  const texto = input.value;
  if (texto.trim() === "") return;
  const ul = document.getElementById("lista");
  const li = document.createElement("li");
  li.textContent = texto;
  ul.appendChild(li);
  input.value = "";
}

// Questão 12
function adicionarItemSelect() {
  const input = document.getElementById("itemSelect");
  const texto = input.value;
  if (texto.trim() === "") return;
  const select = document.getElementById("selectLista");
  const option = document.createElement("option");
  option.text = texto;
  select.add(option);
  input.value = "";
  input.style.width = "200px";
}
