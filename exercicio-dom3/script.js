function getById(id) {
  return document.getElementById(id);
}

function getBotaoClicavel(id, funcao) {
  getById(id).addEventListener("click", funcao);
  return getById(id);
}

let idCounter = 1;
let tarefas = [];
let filtroAtual = "todas";

function salvarTarefas() {
  try {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    localStorage.setItem("idCounter", idCounter.toString());
  } catch (error) {
    console.error("Erro ao salvar tarefas:", error);
  }
}

function carregarTarefas() {
  try {
    const tarefasSalvas = localStorage.getItem("tarefas");
    const idSalvo = localStorage.getItem("idCounter");

    if (tarefasSalvas) {
      tarefas = JSON.parse(tarefasSalvas);
    }

    if (idSalvo) {
      idCounter = Number.parseInt(idSalvo);
    }
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
    tarefas = [];
    idCounter = 1;
  }
}

function criarTarefa(descricao) {
  return {
    id: idCounter++,
    descricao: descricao,
    dataInicio: new Date().toLocaleDateString("pt-BR"),
    dataConclusao: "",
    concluida: false,
  };
}

document.addEventListener("DOMContentLoaded", () => {
  carregarTarefas();

  getBotaoClicavel("adicionarBtn", adicionarTarefa);

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      filtroAtual = this.dataset.filter;
      renderizarTabela();
    });
  });

  getById("descricaoTarefa").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      adicionarTarefa();
    }
  });

  const toggleViewBtn = getById("toggleViewBtn");
  const viewToggle = getById("viewToggle");

  function checkMobileView() {
    if (window.innerWidth <= 768) {
      viewToggle.style.display = "block";
      document.querySelector("table").style.display = "none";
      const mobileCards = document.querySelector(".mobile-cards");
      if (mobileCards) {
        mobileCards.style.display = "block";
      }
      toggleViewBtn.textContent = "📊 Ver como Tabela";
      toggleViewBtn.classList.add("active");
    } else {
      viewToggle.style.display = "none";
      document.querySelector("table").style.display = "table";
      const mobileCards = document.querySelector(".mobile-cards");
      if (mobileCards) {
        mobileCards.style.display = "none";
      }
    }
  }

  toggleViewBtn.addEventListener("click", toggleView);

  window.addEventListener("resize", checkMobileView);

  checkMobileView();

  renderizarTabela();
  atualizarEstatisticas();
});

function adicionarTarefa() {
  const descricaoInput = getById("descricaoTarefa");
  const descricao = descricaoInput.value.trim();
  const errorMessage = getById("errorMessage");

  if (!descricao) {
    descricaoInput.classList.add("error");
    errorMessage.style.display = "block";
    return;
  }

  descricaoInput.classList.remove("error");
  errorMessage.style.display = "none";

  const novaTarefa = criarTarefa(descricao);
  tarefas.push(novaTarefa);

  salvarTarefas();

  descricaoInput.value = "";

  mostrarMensagemSucesso("Tarefa adicionada com sucesso!");

  renderizarTabela();
  atualizarEstatisticas();
}

function concluirTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa && !tarefa.concluida) {
    tarefa.concluida = true;
    tarefa.dataConclusao = new Date().toLocaleDateString("pt-BR");

    salvarTarefas();

    mostrarMensagemSucesso("Tarefa concluída!");
    renderizarTabela();
    atualizarEstatisticas();
  }
}

function reabrirTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === id);
  if (tarefa && tarefa.concluida) {
    tarefa.concluida = false;
    tarefa.dataConclusao = "";

    salvarTarefas();

    mostrarMensagemSucesso("Tarefa reaberta!");
    renderizarTabela();
    atualizarEstatisticas();
  }
}

function mostrarModal(titulo, mensagem, onConfirm) {
  const modalOverlay = getById("modalOverlay");
  const modalTitle = getById("modalTitle");
  const modalMessage = getById("modalMessage");
  const modalConfirmBtn = getById("modalConfirmBtn");
  const modalCancelBtn = getById("modalCancelBtn");

  modalTitle.textContent = titulo;
  modalMessage.textContent = mensagem;
  modalOverlay.classList.add("show");

  const newConfirmBtn = modalConfirmBtn.cloneNode(true);
  const newCancelBtn = modalCancelBtn.cloneNode(true);
  modalConfirmBtn.parentNode.replaceChild(newConfirmBtn, modalConfirmBtn);
  modalCancelBtn.parentNode.replaceChild(newCancelBtn, modalCancelBtn);

  newConfirmBtn.addEventListener("click", () => {
    esconderModal();
    if (onConfirm) onConfirm();
  });

  newCancelBtn.addEventListener("click", esconderModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      esconderModal();
    }
  });

  document.addEventListener("keydown", function escapeHandler(e) {
    if (e.key === "Escape") {
      esconderModal();
      document.removeEventListener("keydown", escapeHandler);
    }
  });
}

function esconderModal() {
  const modalOverlay = getById("modalOverlay");
  modalOverlay.classList.remove("show");
}

function excluirTarefa(id) {
  const tarefa = tarefas.find((t) => t.id === id);

  if (tarefa && tarefa.concluida) {
    mostrarModal(
      "Ação não permitida",
      "Não é possível excluir tarefas concluídas. Reabra a tarefa primeiro se necessário.",
      null
    );
    return;
  }

  mostrarModal(
    "Confirmar Exclusão",
    `Tem certeza que deseja excluir a tarefa "${tarefa.descricao}"?`,
    () => {
      tarefas = tarefas.filter((t) => t.id !== id);

      salvarTarefas();

      mostrarMensagemSucesso("Tarefa excluída!");
      renderizarTabela();
      atualizarEstatisticas();
    }
  );
}

function renderizarTabela() {
  const corpoTabela = getById("corpoTabela");
  const emptyState = getById("emptyState");

  let tarefasFiltradas = tarefas;
  if (filtroAtual === "pendentes") {
    tarefasFiltradas = tarefas.filter((t) => !t.concluida);
  } else if (filtroAtual === "concluidas") {
    tarefasFiltradas = tarefas.filter((t) => t.concluida);
  }

  corpoTabela.innerHTML = "";

  const existingCards = document.querySelector(".mobile-cards");
  if (existingCards) {
    existingCards.remove();
  }

  if (tarefasFiltradas.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  const mobileCardsContainer = document.createElement("div");
  mobileCardsContainer.className = "mobile-cards";

  tarefasFiltradas.forEach((tarefa) => {
    const tr = document.createElement("tr");
    tr.id = `tarefa-${tarefa.id}`;

    if (tarefa.concluida) {
      tr.classList.add("tarefa-concluida");
    }

    const tdId = document.createElement("td");
    tdId.innerText = tarefa.id;

    const tdDescricao = document.createElement("td");
    tdDescricao.innerText = tarefa.descricao;

    const tdDataInicio = document.createElement("td");
    tdDataInicio.innerText = tarefa.dataInicio;

    const tdDataConclusao = document.createElement("td");
    tdDataConclusao.innerText = tarefa.dataConclusao || "-";

    const tdStatus = document.createElement("td");
    tdStatus.innerText = tarefa.concluida ? "Concluída" : "Pendente";

    const tdAcoes = document.createElement("td");

    if (tarefa.concluida) {
      const botaoReabrir = document.createElement("button");
      botaoReabrir.innerText = "Reabrir";
      botaoReabrir.className = "reabrirBtn";
      botaoReabrir.addEventListener("click", () => reabrirTarefa(tarefa.id));
      tdAcoes.appendChild(botaoReabrir);

      const botaoExcluir = document.createElement("button");
      botaoExcluir.innerText = "Excluir";
      botaoExcluir.className = "excluirBtn";
      botaoExcluir.disabled = true;
      botaoExcluir.title = "Não é possível excluir tarefas concluídas";
      botaoExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));
      tdAcoes.appendChild(botaoExcluir);
    } else {
      const botaoConcluir = document.createElement("button");
      botaoConcluir.innerText = "Concluir";
      botaoConcluir.className = "concluirBtn";
      botaoConcluir.addEventListener("click", () => concluirTarefa(tarefa.id));
      tdAcoes.appendChild(botaoConcluir);

      const botaoExcluir = document.createElement("button");
      botaoExcluir.innerText = "Excluir";
      botaoExcluir.className = "excluirBtn";
      botaoExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));
      tdAcoes.appendChild(botaoExcluir);
    }

    tr.appendChild(tdId);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdDataInicio);
    tr.appendChild(tdDataConclusao);
    tr.appendChild(tdStatus);
    tr.appendChild(tdAcoes);

    corpoTabela.appendChild(tr);

    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    if (tarefa.concluida) {
      taskCard.classList.add("tarefa-concluida");
    }

    taskCard.innerHTML = `
      <div class="task-card-header">
        <span class="task-id">#${tarefa.id}</span>
        <span class="task-status ${
          tarefa.concluida ? "concluida" : "pendente"
        }">
          ${tarefa.concluida ? "Concluída" : "Pendente"}
        </span>
      </div>
      <div class="task-description">${tarefa.descricao}</div>
      <div class="task-dates">
        <div class="task-date-item">
          <span class="task-date-label">Início:</span>
          <span>${tarefa.dataInicio}</span>
        </div>
        <div class="task-date-item">
          <span class="task-date-label">Conclusão:</span>
          <span>${tarefa.dataConclusao || "-"}</span>
        </div>
      </div>
      <div class="task-actions" id="actions-${tarefa.id}"></div>
    `;

    const actionsContainer = taskCard.querySelector(`#actions-${tarefa.id}`);

    if (tarefa.concluida) {
      const botaoReabrir = document.createElement("button");
      botaoReabrir.innerText = "Reabrir";
      botaoReabrir.className = "reabrirBtn";
      botaoReabrir.addEventListener("click", () => reabrirTarefa(tarefa.id));
      actionsContainer.appendChild(botaoReabrir);

      const botaoExcluir = document.createElement("button");
      botaoExcluir.innerText = "Excluir";
      botaoExcluir.className = "excluirBtn";
      botaoExcluir.disabled = true;
      botaoExcluir.title = "Não é possível excluir tarefas concluídas";
      botaoExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));
      actionsContainer.appendChild(botaoExcluir);
    } else {
      const botaoConcluir = document.createElement("button");
      botaoConcluir.innerText = "Concluir";
      botaoConcluir.className = "concluirBtn";
      botaoConcluir.addEventListener("click", () => concluirTarefa(tarefa.id));
      actionsContainer.appendChild(botaoConcluir);

      const botaoExcluir = document.createElement("button");
      botaoExcluir.innerText = "Excluir";
      botaoExcluir.className = "excluirBtn";
      botaoExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));
      actionsContainer.appendChild(botaoExcluir);
    }

    mobileCardsContainer.appendChild(taskCard);
  });

  const tableContainer = document.querySelector(".table-container");
  tableContainer.parentNode.insertBefore(
    mobileCardsContainer,
    tableContainer.nextSibling
  );
}

function atualizarEstatisticas() {
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluida).length;
  const pendentes = total - concluidas;

  getById("totalTarefas").innerText = total;
  getById("tarefasConcluidas").innerText = concluidas;
  getById("tarefasPendentes").innerText = pendentes;
}

function mostrarMensagemSucesso(mensagem) {
  const successMessage = getById("successMessage");
  successMessage.innerText = mensagem;
  successMessage.style.display = "block";

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
}

function toggleView() {
  const table = document.querySelector("table");
  const mobileCards = document.querySelector(".mobile-cards");
  const toggleBtn = getById("toggleViewBtn");

  if (mobileCards && mobileCards.style.display === "none") {
    table.style.display = "none";
    mobileCards.style.display = "block";
    toggleBtn.textContent = "📊 Ver como Tabela";
    toggleBtn.classList.add("active");
  } else {
    table.style.display = "table";
    if (mobileCards) {
      mobileCards.style.display = "none";
    }
    toggleBtn.textContent = "📱 Ver como Cards";
    toggleBtn.classList.remove("active");
  }
}
