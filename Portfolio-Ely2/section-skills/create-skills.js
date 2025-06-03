import { createSkillCard } from '../components/cards-skills/skill-card.js';

const skillsData = [
    {
    logo: "path/to/react-logo.png",
    title: "React",
    description: "Building modern interfaces with React",
    details: [
        "Component-Based Architecture",
        "Hooks (useState, useEffect)",
        "State Management",
        "JSX Syntax",
        "Routing with React Router"
        ]
    },
    {
    logo: "path/to/html-logo.png",
    title: "HTML5",
    description: "Markup for structured web content",
    details: [
        "Semantic Elements",
        "Forms and Validation",
        "Media Elements",
        "Accessibility (ARIA)",
        "SEO-Friendly Markup"
        ]
    },
    {
    logo: "path/to/css-logo.png",
    title: "CSS3",
    description: "Styling responsive and modern UIs",
    details: [
        "Flexbox & Grid",
        "Animations & Transitions",
        "Responsive Design",
        "Custom Properties (Variables)",
        "Media Queries"
        ]
    },
    {
    logo: "path/to/git-logo.png",
    title: "Git & GitHub",
    description: "Version control and collaboration",
    details: [
        "Branching & Merging",
        "Commit Management",
        "Pull Requests",
        "Conflict Resolution",
        "Remote Repositories"
        ]
    },
    {
    logo: "path/to/typescript-logo.png",
    title: "TypeScript",
    description: "Typed superset of JavaScript",
    details: [
        "Static Typing",
        "Interfaces & Types",
        "Generics",
        "Type Inference",
        "Tooling & Compilation"
        ]
    },
    {
    logo: "path/to/database-logo.png",
    title: "Databases",
    description: "Working with SQL and NoSQL databases",
    details: [
        "PostgreSQL & MySQL",
        "MongoDB",
        "Data Modeling",
        "CRUD Operations",
        "Indexing & Optimization"
        ]
    }
  // Add more skills as needed
];

function initializeSkillsGrid() {
  const container = document.getElementById('grid-skills-container');
  skillsData.forEach(skillData => {
    const card = createSkillCard(skillData);
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', initializeSkillsGrid);