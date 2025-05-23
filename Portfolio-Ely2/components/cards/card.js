export function createCard({ photo, title, topic, subtitle, categories, github, linkedin, description }) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-container">
      <div class="img-container">
        <img src="${photo}" alt="${title}">
        <div class="topic-class"><span>${topic}</span></div>
      </div>
      <div class="card-content">
        <div class="card-text">
          <h2>${title}</h2>
          <h4>${subtitle}</h4>
        </div>
        <div class="categories">
          ${categories.map(cat => `<span class="category">${cat}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="details-button">Detalhes</button>
        <div class="social-buttons">
          <a href="${github}" target="_blank">
            <img src="../../assets/logo.png" alt="GitHub" class="icon">
          </a>
          <a href="${linkedin}" target="_blank">
            <img src="https://www.shareicon.net/data/2016/03/14/733781_arrows_512x512.png" alt="LinkedIn" class="icon redirect">
          </a>
        </div>
      </div>
    </div>
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="close-modal">&times;</button>

        <div class="top-container">
          <div class="title-container">
            <h2>${title}</h2>
          </div>
        </div>
        <div class="modal-body">
          <div class="img-container">
            <img src="${photo}" alt="${title}">
          </div>
          <p>${subtitle || 'Sem descrição detalhada disponível.'}</p>
          <div class="categories">
            ${categories.map(cat => `<span class="category">${cat}</span>`).join('')}
          </div>
          <div id="project-info">
            <p class="title-info">${description.title}</p>
            <ul class="info-list">
              ${description.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

        </div>
        <div class="modal-footer">
          <button class="git-button">
            <i class="fab fa-github"></i> GitHub
          </button>
          <button class="visit-button">
            <i class="fas fa-external-link-alt"></i> Visit
          </button>
        </div>

      </div>
    </div>
  `;

  // Adicionar event listeners para o modal
  const detailsButton = card.querySelector('.details-button');
  const modalOverlay = card.querySelector('.modal-overlay');
  const closeButton = card.querySelector('.close-modal');

  detailsButton.addEventListener('click', () => {
    modalOverlay.style.display = 'flex';
  });

  closeButton.addEventListener('click', () => {
    modalOverlay.style.display = 'none';
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
    }
  });

  return card;
}
