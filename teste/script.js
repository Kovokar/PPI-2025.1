
document.getElementById('intro-msg').addEventListener('click', function() {
    const img = this;

    // Verifica se a intro-msg está com 100% de largura
    console.log(img.style.width)
    if (img.style.width === '40%') {
        img.style.width = '10%';
    } else {
        img.style.width = '40%';
    }
});