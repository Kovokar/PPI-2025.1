export function createCard({ photo, title, topic, subtitle, categories, github, linkedin }) {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <div class="card-container">
      <div class="img-container">
        <img src="${photo}" alt="${title}">
        <div class="topic-class">
          <span>${topic}</span>
        </div>
      </div>
      <div class="card-content">
        <h2>${title}</h2>
        <h4>${subtitle}</h4>
        <div class="categories">
          ${categories.map(cat => `<span class="category">${cat}</span>`).join('')}
        </div>
      </div>
      <div class="card-footer">
        <button class="details-button">Details</button>
        <div class="social-buttons">
          <a href="${github}" target="_blank">GitHub</a>
          <a href="${linkedin}" target="_blank">LinkedIn</a>
        </div>
      </div>
    </div>
  `;

  return card;
}
