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
