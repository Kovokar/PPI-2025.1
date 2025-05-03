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

window.addEventListener("scroll", function () {
  const header = document.querySelector("#header");
  header.classList.toggle("sticky", window.scrollY > 0);
});
