const buttons = document.querySelectorAll('.filters-buttons .btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active')); // remove dos outros
        button.classList.add('active'); // adiciona ao clicado
    });
});
