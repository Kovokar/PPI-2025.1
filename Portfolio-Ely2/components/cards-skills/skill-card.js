export function createSkillCard({ icon, title, description, details }) {
  const card = document.createElement('div');
  card.className = 'skill-card';

  card.innerHTML = `
    <div class="skill-card-content">
      <div class="skill-info">
      <div class="title-container">
        <span class="icon ${icon}"></span>
        <h3>${title}</h3>
        <button class="chevron-btn" title="Ver mais">
          <span>&#x25BA;</span>
        </button>
      </div> 
      <p class="skill-desc">${description}</p>
      </div>
    </div>
  `;

  // Store details for modal
  card.dataset.modalData = JSON.stringify({ title, details });

  // Event listener for modal
  card.querySelector('.chevron-btn').addEventListener('click', () => {
    showSkillModal(JSON.parse(card.dataset.modalData));
  });

  return card;
}

// Single modal for all skill cards
const skillModalTemplate = `
  <div class="modal-overlay" id="skillModal">
    <div class="modal-content">
      <button class="close-modal">&times;</button>
      <div class="modal-body">
        <h2 class="modal-title"></h2>
        <ul class="modal-list"></ul>
      </div>
    </div>
  </div>
`;

if (!document.getElementById('skillModal')) {
  document.body.insertAdjacentHTML('beforeend', skillModalTemplate);
}

function showSkillModal(data) {
  const modal = document.getElementById('skillModal');
  modal.querySelector('.modal-title').textContent = data.title;
  const list = modal.querySelector('.modal-list');
  list.innerHTML = '';
  (data.details || []).forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });

  modal.style.display = 'flex';

  // Close logic
  modal.querySelector('.close-modal').onclick = () => modal.style.display = 'none';
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = 'none';
  };
}