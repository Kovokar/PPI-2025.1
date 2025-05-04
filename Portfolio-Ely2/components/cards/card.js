export function createCard({ photo, title, topic, subtitle, categories, github, linkedin }) {
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

return card;
}
