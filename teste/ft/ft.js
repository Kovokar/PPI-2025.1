function loadFooter() {
  fetch('./ft/ft.html') // Caminho atualizado
    .then(res => res.text())
    .then(html => {
      const footer = document.createElement('footer'); // Cria o footer se não existir
      footer.innerHTML = html;
      document.body.appendChild(footer); // Adiciona no final do body
    });
}

document.addEventListener('DOMContentLoaded', loadFooter);
