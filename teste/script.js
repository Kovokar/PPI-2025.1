document.addEventListener('DOMContentLoaded', () => {
  const introMsg = document.getElementById('intro-msg');
  const introPopup = document.getElementById('intro-popup');
  const popupClose = document.querySelector('.popup-close');

  // Abrir popup automaticamente ao carregar a página
  function openPopup() {
    introPopup.style.display = 'flex';
    // Pequeno delay para garantir que a transição CSS funcione
    setTimeout(() => {
      introPopup.classList.add('show');
    }, 10);
  }

  // Fechar popup
  function closePopup() {
    introPopup.classList.remove('show');
    // Espera a animação terminar antes de esconder
    setTimeout(() => {
      introPopup.style.display = 'none';
    }, 1000);
  }

  // Abrir popup automaticamente ao carregar a página
  openPopup();

  // Abrir popup ao clicar na imagem de intro
  introMsg.addEventListener('click', openPopup);

  // Fechar popup ao clicar no botão de fechar
  popupClose.addEventListener('click', closePopup);

  // Fechar popup ao clicar fora da imagem
  introPopup.addEventListener('click', (event) => {
    if (event.target === introPopup) {
      closePopup();
    }
  });

  // Fechar popup com a tecla ESC
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  });
});