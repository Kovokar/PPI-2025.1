export function initializeFilters(cards) {
  const filterButtons = document.querySelectorAll('.filters-buttons .btn');
  const gridCards = document.getElementById('grid-cards');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.textContent.trim();
      
      // Show all projects if "All Projects" is selected
      if (filterValue === 'All Projects') {
        cards.forEach(card => card.style.display = 'block');
        return;
      }

      // Filter cards based on their categories
      cards.forEach(card => {
        const categories = Array.from(card.querySelectorAll('.category'))
          .map(cat => cat.textContent.trim());
        
        // Check if any of the card's categories match the filter
        const matchesFilter = categories.some(category => 
          category.toLowerCase().includes(filterValue.toLowerCase()));
        
        card.style.display = matchesFilter ? 'block' : 'none';
      });
    });
  });
}