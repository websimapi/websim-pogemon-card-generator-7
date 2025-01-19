import { showCollection } from './ui/collection.js';
import { generateCard } from './cardGenerator.js';
import { setupPrintButton } from './ui/print.js';
import { handleHover, resetHover } from './ui/cardEffects.js';

export function setupEventListeners() {
  // Generate button
  document.getElementById('generateBtn').addEventListener('click', generateCard);
  
  // Print button
  setupPrintButton();

  // Collection button 
  const collectionBtn = document.querySelector('.collection-btn'); 
  if (collectionBtn) {
    collectionBtn.addEventListener('click', showCollection);
  }

  // Initial card hover effects if exists
  const initialCard = document.querySelector('.card');
  if (initialCard) {
    initialCard.addEventListener('mousemove', handleHover);
    initialCard.addEventListener('mouseleave', resetHover);
  }
}