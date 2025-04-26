document.addEventListener('DOMContentLoaded', () => {
  loadFooter();
  setupCircleToggles();
});

function loadFooter() {
  fetch('./ft/ft.html')
    .then(res => res.text())
    .then(html => {
      const footer = document.createElement('footer');
      footer.innerHTML = html;
      document.body.appendChild(footer);
      setupCircleToggles(); // caso tenha toggle-circle dentro do footer também
    })
    .catch(err => console.error('Erro ao carregar footer:', err));
}

function setupCircleToggles() {
  const toggleButtons = document.querySelectorAll('.toggle-circle');

  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const container = button.closest('.circle-container');
      container.classList.toggle('ativo');
    });
  });
}
