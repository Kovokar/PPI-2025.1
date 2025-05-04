// projects.js
import { createCard } from '../components/cards/card.js';

const cards = [
  {
    photo: '../assets/explorer.png',
    title: 'Cryptofile',
    topic: 'security',
    subtitle: 'A set of tools for file encryption, including a secure file explorer and an automatic encryptor.',
    categories: ['React', 'Frontend', 'API'],
    github: 'https://github.com/seuusuario/projeto-alpha',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: '../assets/dexter.png',
    title: 'Projeto Beta',
    topic: 'security2',
    subtitle: 'Node Backend',
    categories: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/seuusuario/projeto-beta',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: '../assets/rasp.png',
    title: 'Projeto Gamma',
    topic: 'security3',
    subtitle: 'Fullstack App',
    categories: ['React', 'Node.js', 'SQL'],
    github: 'https://github.com/seuusuario/projeto-gamma',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: '../assets/singed.png',
    title: 'Projeto Delta',
    topic: 'security4',
    subtitle: 'Mobile App',
    categories: ['React Native', 'Expo', 'UI/UX'],
    github: 'https://github.com/seuusuario/projeto-delta',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: '../assets/frutas.png',
    title: 'Projeto Delta',
    topic: 'security4',
    subtitle: 'Mobile App',
    categories: ['React Native', 'Expo', 'UI/UX'],
    github: 'https://github.com/seuusuario/projeto-delta',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },
  {
    photo: '../assets/apic.png',
    title: 'Projeto Delta',
    topic: 'security4',
    subtitle: 'Mobile App',
    categories: ['React Native', 'Expo', 'UI/UX'],
    github: 'https://github.com/seuusuario/projeto-delta',
    linkedin: 'https://linkedin.com/in/seuusuario'
  },

];

const container = document.getElementById('grid-cards');
cards.forEach(data => {
  const card = createCard(data);
  container.appendChild(card);
});
