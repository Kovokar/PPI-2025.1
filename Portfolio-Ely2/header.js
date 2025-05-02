const header = () => {
  const headerContainer = document.getElementById("header");
  headerContainer.innerHTML = `
    <div class="header-logo">
        <!-- <img src="images/logo.png" alt="Logo" /> -->
        <h1 class="header-logo-title">Home</h1>
    </div>
    <nav class="header-nav">
        <ul class="header-nav-list">
            <li><a href="#home">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#project">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>
    <button class="header-button">Get in touch</button>
            `;
};

header();

/*--------LUIZ--------*/
/*
document.addEventListener("DOMContentLoaded", () => {
  const blocos = document.querySelectorAll(".bloquinho-skills");
  let blocoAtivo = null;
  let popup = null;
  let overlay = null;

  // Dicionário com descrições para cada skill
  const descricoesSkills = {
    skill1: {
      titulo: "Desenvolvimento Web",
      descricao: "Criação de sites modernos com HTML, CSS e JavaScript."
    },
    skill2: {
      titulo: "Banco de Dados",
      descricao: "Modelagem e consulta de dados com MySQL e PostgreSQL."
    },
    skill3: {
      titulo: "Versionamento com Git",
      descricao: "Controle de versão e colaboração usando Git e GitHub."
    },
    skill4: {
      titulo: "Design Responsivo",
      descricao: "Criação de layouts que se adaptam a diferentes telas e dispositivos."
    },
    skill5: {
      titulo: "APIs REST",
      descricao: "Desenvolvimento e consumo de APIs RESTful com Node.js."
    },
    skill6: {
      titulo: "UX/UI Design",
      descricao: "Conceitos de design focados na experiência do usuário."
    }
  };

  blocos.forEach(bloco => {
    bloco.addEventListener("click", () => {
      const id = bloco.id;
      const conteudo = descricoesSkills[id];

      if (!conteudo) return;

      if (popup && bloco === blocoAtivo) {
        return;
      }

      if (popup) {
        popup.remove();
        overlay.remove();
      }

      overlay = document.createElement("div");
      overlay.id = "overlay";
      document.body.appendChild(overlay);

      popup = document.createElement("div");
      popup.id = "popup-info";
      popup.innerHTML = `
        <h2>${conteudo.titulo}</h2>
        <p>${conteudo.descricao}</p>
      `;

      document.body.appendChild(popup);
      blocoAtivo = bloco;

      popup.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
        blocoAtivo = null;
      });

      overlay.addEventListener("click", () => {
        popup.remove();
        overlay.remove();
        blocoAtivo = null;
      });
    });
  });
});
*/
/*-------------------*/