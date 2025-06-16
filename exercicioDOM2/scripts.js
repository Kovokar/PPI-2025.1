function mostrarErro(idElemento, mensagem) {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = mensagem;
  elemento.classList.remove("oculto");
  setTimeout(() => elemento.classList.add("oculto"), 3000);
}

const botaoExibir = document.getElementById("botaoExibir");
botaoExibir.addEventListener("click", () => {
  const texto = document.getElementById("caixaDeTexto").value.trim();
  if (!texto) {
    mostrarErro("mensagemErroTexto", "O campo de texto não pode estar vazio.");
    return;
  }
  document.getElementById("conteudo").innerHTML = texto;
});

function calcularEngajamento() {
  const interacoes = document.getElementById("interacoes").value.trim();
  const visualizacoes = document.getElementById("visualizacoes").value.trim();
  const erro = "mensagemErroEngajamento";

  if (
    isNaN(interacoes) ||
    isNaN(visualizacoes) ||
    !interacoes ||
    !visualizacoes
  ) {
    mostrarErro(erro, "Insira valores numéricos válidos.");
    return;
  }

  const taxa = (parseFloat(interacoes) / parseFloat(visualizacoes)) * 100;
  document.getElementById(
    "resultadoEngajamento"
  ).textContent = `Taxa: ${taxa.toFixed(2)}%`;
}

function carregarImagem() {
  const file = document.getElementById("uploadImagem").files[0];
  if (!file) return;
  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";
  resultado.appendChild(img);
}

const selectImagem = document.getElementById("selectImagem");
selectImagem.addEventListener("change", () => {
  const valor = selectImagem.value;
  const img =
    document.getElementById("imgDestino") || document.createElement("img");
  img.id = "imgDestino";
  img.src = valor;
  const destino = document.getElementById("imagemSelecionada");
  destino.innerHTML = "";
  destino.appendChild(img);
});

const btnEnviar = document.getElementById("enviarBtn");
btnEnviar.addEventListener("click", () => {
  const checkboxes = document.getElementsByName("redesSociais");
  const selecionadas = [];
  for (let c of checkboxes) {
    if (c.checked) selecionadas.push(c.value);
  }
  const erro = document.getElementById("mensagemErroRedes");
  const saida = document.getElementById("redesSelecionadas");

  if (selecionadas.length === 0) {
    mostrarErro("mensagemErroRedes", "Selecione ao menos uma rede social.");
    saida.innerHTML = "";
  } else {
    erro.classList.add("oculto");
    saida.innerHTML = "Selecionadas: " + selecionadas.join(", ");
  }
});

let listaHashtags = document.getElementById("listaHashtags");
let hashtags = [];

function adicionarHashtag() {
  const nova = document.getElementById("novaHashtag").value.trim();
  const erro = "mensagemErroHashtag";

  if (
    !nova ||
    nova.length < 2 ||
    hashtags.includes(nova) ||
    hashtags.length >= 5
  ) {
    mostrarErro(erro, "Hashtag inválida, repetida ou limite atingido.");
    return;
  }

  hashtags.push(nova);
  const option = document.createElement("option");
  option.text = nova;
  listaHashtags.appendChild(option);
  document.getElementById("novaHashtag").value = "";
}

function removerHashtag() {
  const selecionadas = Array.from(listaHashtags.selectedOptions);
  for (let opt of selecionadas) {
    hashtags = hashtags.filter((h) => h !== opt.text);
    listaHashtags.removeChild(opt);
  }
}

const moverDireita = document.getElementById("moverParaDireitaBtn");
const moverEsquerda = document.getElementById("moverParaEsquerdaBtn");
const ativosDisponiveis = document.getElementById("ativosDisponiveis");
const carteiraInvestimentos = document.getElementById("carteiraInvestimentos");

function moverItens(origem, destino) {
  const selecionados = Array.from(origem.selectedOptions);
  if (selecionados.length === 0) return;
  for (let opt of selecionados) {
    origem.removeChild(opt);
    destino.appendChild(opt);
  }
}

moverDireita.addEventListener("click", () =>
  moverItens(ativosDisponiveis, carteiraInvestimentos)
);
moverEsquerda.addEventListener("click", () =>
  moverItens(carteiraInvestimentos, ativosDisponiveis)
);
