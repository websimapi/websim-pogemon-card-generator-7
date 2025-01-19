import { initDB } from './db.js';
import { setupEventListeners } from './eventHandlers.js';
import { generateCard } from './cardGenerator.js';
import { showCollection } from './ui/collection.js';

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

  // Add collection button
  const collectionBtn = document.createElement('button');
  collectionBtn.className = 'collection-btn';
  collectionBtn.innerHTML = `
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/>
    </svg>
  `;
  document.querySelector('.container').appendChild(collectionBtn);
  collectionBtn.addEventListener('click', showCollection);
});

// Export necessary functions
export { generateCard };