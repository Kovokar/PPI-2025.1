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
  document.querySelectorAll(".bloquinho-skills").forEach(bloquinho => {
    bloquinho.addEventListener("click", () => {
      bloquinho.classList.toggle("expandido");

      document.querySelectorAll(".bloquinho-skills").forEach(outro => {
        if (outro !== bloquinho) {
          outro.classList.remove("expandido");
        }
      });

      if (bloquinho.classList.contains("expandido")) {
        bloquinho.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  document.querySelectorAll('.bloquinho-linguagem').forEach(bloquinho => {
    bloquinho.addEventListener('click', function () {
      this.classList.toggle('expandido');

      document.querySelectorAll('.bloquinho-linguagem').forEach(b => {
        if (b !== this) {
          b.classList.remove('expandido');
        }
      });
    });
  });
});


/*--------PAMELLA--------*/
document.querySelectorAll('.dropdown-toggle').forEach(function(dropdownToggle) {
  dropdownToggle.addEventListener('click', function(event) {
    event.preventDefault(); 
    event.stopPropagation(); 

    const dropdown = this.closest('.dropdown');

    document.querySelectorAll('.dropdown').forEach(d => {
      if (d !== dropdown) d.classList.remove('show');
    });

    dropdown.classList.toggle('show');
  });
});

window.addEventListener('click', function() {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
});
