// Back button functionality
document.querySelector('.back-button').addEventListener('click', function() {
    window.history.back();
});

// Search functionality
const searchInput = document.querySelector('.search-input');
const specialtyItems = document.querySelectorAll('.specialty-item');

searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    
    specialtyItems.forEach(item => {
        const specialtyName = item.querySelector('.specialty-name').textContent.toLowerCase();
        const specialtyDescription = item.querySelector('.specialty-description').textContent.toLowerCase();
        
        if (specialtyName.includes(searchTerm) || specialtyDescription.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Specialty item click functionality
specialtyItems.forEach(item => {
    item.addEventListener('click', function() {
        const specialtyName = this.querySelector('.specialty-name').textContent;
        const specialtyPrice = this.querySelector('.specialty-price').textContent;
        
        alert(`Você selecionou: ${specialtyName}\n${specialtyPrice}`);
    });
});

// Bottom navigation functionality
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        const navText = this.querySelector('.nav-text').textContent;
        console.log(`Navegando para: ${navText}`);
    });
});

// Loading animation
document.addEventListener('DOMContentLoaded', function() {
    const specialties = document.querySelectorAll('.specialty-item');
    specialties.forEach((specialty, index) => {
        setTimeout(() => {
            specialty.style.opacity = '1';
            specialty.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// Smooth scroll for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});