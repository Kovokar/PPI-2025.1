document.addEventListener('DOMContentLoaded', () => {
  const introMsg = document.getElementById('intro-msg');
  const introPopup = document.getElementById('intro-popup');
  const popupClose = document.querySelector('.popup-close');

  function openPopup() {
    introPopup.style.display = 'flex';
    setTimeout(() => {
      introPopup.classList.add('show');
    }, 10);
  }

  function closePopup() {
    introPopup.classList.remove('show');
    setTimeout(() => {
      introPopup.style.display = 'none';
    }, 1000);
  }

  openPopup();

  introMsg.addEventListener('click', openPopup);
  popupClose.addEventListener('click', closePopup);

  introPopup.addEventListener('click', (event) => {
    if (event.target === introPopup) {
      closePopup();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePopup();
    }
  });
});
