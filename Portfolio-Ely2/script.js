/*--------LUIZ--------*/
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".bloquinho-skills").forEach((bloquinho) => {
    bloquinho.addEventListener("click", () => {
      bloquinho.classList.toggle("expandido");

      document.querySelectorAll(".bloquinho-skills").forEach((outro) => {
        if (outro !== bloquinho) {
          outro.classList.remove("expandido");
        }
      });

      if (bloquinho.classList.contains("expandido")) {
        bloquinho.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  });

  document.querySelectorAll(".bloquinho-linguagem").forEach((bloquinho) => {
    bloquinho.addEventListener("click", function () {
      this.classList.toggle("expandido");

      document.querySelectorAll(".bloquinho-linguagem").forEach((b) => {
        if (b !== this) {
          b.classList.remove("expandido");
        }
      });
    });
  });
});

/*-------------------*/
