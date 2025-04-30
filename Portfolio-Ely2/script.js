const header = () => {
  const headerContainer = document.getElementById("header");
  headerContainer.innerHTML = `
    <div class="header-logo">
        <!-- <img src="images/logo.png" alt="Logo" /> -->
        <h1 class="header-logo-title">Home</h1>
    </div>
    <nav class="header-nav">
        <ul class="header-nav-list">
            <li><a href="#">About</a></li>
            <li><a href="#">Skills</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>
    <button class="header-button">Get in touch</button>
            `;
};

header();

/*--------LUIZ--------*/
document.addEventListener("DOMContentLoaded", function () {
    const bloquinhos = document.querySelectorAll(".bloquinho-skills");
  
    bloquinhos.forEach(bloquinho => {
      bloquinho.addEventListener("click", () => {
        bloquinhos.forEach(outro => {
          if (outro !== bloquinho) {
            outro.classList.remove("expandido");
          }
        });
  
        bloquinho.classList.toggle("expandido");
  
        if (bloquinho.classList.contains("expandido")) {
          bloquinho.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
    });
  });
/*-------------------*/