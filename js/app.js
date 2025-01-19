import { initDB } from './db.js';
import { setupEventListeners } from './eventHandlers.js';
import { generateCard } from './cardGenerator.js';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  initDB();
  setupEventListeners();
  
  // Setup initial card if it exists
  const initialCard = document.querySelector('.card');
  if (initialCard) {
    initialCard.addEventListener('click', (e) => {
      const cardInner = e.currentTarget.querySelector('.card-inner');
      cardInner.classList.toggle('flipped');
    });
  }
});

// Export necessary functions
export { generateCard };