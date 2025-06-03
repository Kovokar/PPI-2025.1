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
  `;

  // Store card data as a dataset
  card.dataset.modalData = JSON.stringify({
    photo, title, topic, subtitle, categories, github, linkedin, description
  });

  const detailsButton = card.querySelector('.details-button');
  detailsButton.addEventListener('click', () => {
    showModal(JSON.parse(card.dataset.modalData));
  });

  return card;
}

// Create a single modal for all cards
const modalTemplate = `
  <div class="modal-overlay" id="globalModal">
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <div class="top-container">
        <div class="title-container">
          <h2></h2>
        </div>
      </div>
      <div class="modal-body">
        <div class="img-container">
          <img alt="">
        </div>
        <p class="subtitle"></p>
        <div class="categories"></div>
        <div id="project-info">
          <p class="title-info"></p>
          <ul class="info-list"></ul>
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

// Add modal to body when the script loads
document.body.insertAdjacentHTML('beforeend', modalTemplate);

// Function to show and populate modal
function showModal(data) {
  const modal = document.getElementById('globalModal');
  
  // Populate modal content
  modal.querySelector('.title-container h2').textContent = data.title;
  modal.querySelector('.img-container img').src = data.photo;
  modal.querySelector('.img-container img').alt = data.title;
  modal.querySelector('.subtitle').textContent = data.subtitle;
  modal.querySelector('.categories').innerHTML = 
    data.categories.map(cat => `<span class="category">${cat}</span>`).join('');
  modal.querySelector('.title-info').textContent = data.description.title;
  modal.querySelector('.info-list').innerHTML = 
    data.description.items.map(item => `<li>${item}</li>`).join('');

  // Show modal
  modal.style.display = 'flex';

  // Add event listeners
  const closeButton = modal.querySelector('.close-modal');
  closeButton.onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}
