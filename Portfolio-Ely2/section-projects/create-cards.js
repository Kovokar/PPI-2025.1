// projects.js
import { createCard } from '../components/cards/card.js';

const cards = [
  {
    photo: 'https://via.placeholder.com/300x180?text=Projeto+1',
    title: 'Projeto Alpha',
    subtitle: 'React App',
    categories: ['React', 'Frontend', 'API'],
    github: 'https://github.com/seuusuario/projeto-alpha',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: 'https://via.placeholder.com/300x180?text=Projeto+2',
    title: 'Projeto Beta',
    subtitle: 'Node Backend',
    categories: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/seuusuario/projeto-beta',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: 'https://via.placeholder.com/300x180?text=Projeto+3',
    title: 'Projeto Gamma',
    subtitle: 'Fullstack App',
    categories: ['React', 'Node.js', 'SQL'],
    github: 'https://github.com/seuusuario/projeto-gamma',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: 'https://via.placeholder.com/300x180?text=Projeto+4',
    title: 'Projeto Delta',
    subtitle: 'Mobile App',
    categories: ['React Native', 'Expo', 'UI/UX'],
    github: 'https://github.com/seuusuario/projeto-delta',
    linkedin: 'https://linkedin.com/in/seuusuario'
  }
];

const container = document.getElementById('grid-cards');
cards.forEach(data => {
  const card = createCard(data);
  container.appendChild(card);
});
