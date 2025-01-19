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
  document.getElementById('collectionBtn').addEventListener('click', showCollection);

  // Card hover effects
  document.addEventListener('mousemove', handleHover);
  document.addEventListener('mouseleave', resetHover);
}