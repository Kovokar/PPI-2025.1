import { createCard } from '../components/cards/card.js';

const cards = [
  {
    photo: '../assets/explorer.png',
    title: 'Cryptofile',
    topic: 'security',
    subtitle: 'A set of tools for file encryption, including a secure file explorer and an automatic encryptor.',
    categories: ['React', 'Frontend', 'API'],
    github: 'https://github.com/seuusuario/projeto-alpha',
    linkedin: 'https://linkedin.com/in/seuusuario',
    description: {
      title: 'Key Features',
      items: [
        'Key Features',
        'Modern and intuitive graphical interface',
        'Strong encryption using Fernet (AES-128-CBC)',
        'Password protection with PBKDF2HMAC',
        'Compatible with Windows and Linux',
        'Integrated file navigation',
        'Individual file encryption and decryption'
      ]
    }
  },
  {
    photo: '../assets/dexter.png',
    title: 'Projeto Beta',
    topic: 'security2',
    subtitle: 'Node Backend',
    categories: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/seuusuario/projeto-beta',
    linkedin: 'https://linkedin.com/in/seuusuario',
    description: {
      title: 'Projeto Beta',
      items: [
        'RESTful API using Express.js',
        'JWT-based authentication',
        'MongoDB with Mongoose ODM',
        'Robust error handling middleware',
        'Environment-based config setup',
        'Secure endpoints with role-based access control'
      ]
    }
  },
  {
    photo: '../assets/rasp.png',
    title: 'Projeto Gamma',
    topic: 'security3',
    subtitle: 'Fullstack App',
    categories: ['React', 'Node.js', 'SQL'],
    github: 'https://github.com/seuusuario/projeto-gamma',
    linkedin: 'https://linkedin.com/in/seuusuario',
    description: {
      title: 'Projeto Gamma',
      items: [
        'Fullstack application with React and Node.js',
        'User authentication with sessions',
        'PostgreSQL integration with Sequelize ORM',
        'Responsive dashboard and user panels',
        'CRUD operations for managing user data',
        'Backend validation and secure API routes'
      ]
    }
  },
  {
    photo: '../assets/singed.png',
    title: 'Projeto Delta',
    topic: 'security4',
    subtitle: 'Mobile App',
    categories: ['React Native', 'Expo', 'UI/UX'],
    github: 'https://github.com/seuusuario/projeto-delta',
    linkedin: 'https://linkedin.com/in/seuusuario',
    description: {
      title: 'Projeto Delta',
      items: [
        'Cross-platform mobile app using React Native',
        'Built with Expo for fast prototyping',
        'Intuitive user interface with custom components',
        'Navigation with React Navigation',
        'Form validation using Formik and Yup',
        'Dark mode support and custom theming'
      ]
    }
  },
  {
    photo: '../assets/frutas.png',
    title: 'Projeto Épsilon',
    topic: 'security5',
    subtitle: 'A modern and responsive e-commerce platform specialized in fruits, developed with React, Node.js, and MongoDB.',
    categories: ['React Native', 'Expo', 'Firebase'],
    github: 'https://github.com/seuusuario/projeto-epsilon',
    linkedin: 'https://linkedin.com/in/seuusuario',
    description: {
      title: 'Projeto Épsilon',
      items: [
        'E-commerce interface for mobile',
        'Product listing and detail view',
        'Shopping cart and checkout flow',
        'User login with Firebase Authentication',
        'Data persistence with Firebase Firestore',
        'Real-time updates and push notifications'
      ]
    }
  },
  {
    photo: '../assets/apic.png',
    title: 'Projeto Zeta',
    topic: 'security6',
    subtitle: 'API Integrator',
    categories: ['Node.js', 'API', 'Backend'],
    github: 'https://github.com/seuusuario/projeto-zeta',
    linkedin: 'https://linkedin.com/in/seuusuario',
    description: {
      title: 'Projeto Zeta',
      items: [
        'Backend service to integrate third-party APIs',
        'Handles authentication with multiple APIs',
        'Data normalization and response formatting',
        'REST and GraphQL support',
        'Custom rate limiting and retry logic',
        'Unit tests with Jest and Supertest'
      ]
    }
  },
];

const container = document.getElementById('grid-cards');
cards.forEach(data => {
  const card = createCard(data);
  container.appendChild(card);
});
