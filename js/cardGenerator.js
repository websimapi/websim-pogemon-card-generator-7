import { getPokemonDescription } from './api.js';
import { saveCard } from './db.js';
import { showToast } from './ui/toast.js';
import { createCardElement } from './ui/cardElement.js';

export async function generateCard() {
  // Remove existing card and submenu if any
  const existingCard = document.querySelector('.card');
  const existingSubmenu = document.querySelector('.submenu');
  if (existingCard) existingCard.remove();
  if (existingSubmenu) existingSubmenu.remove();

  // Get Pokemon data
  const pokemonData = await getPokemonDescription();
  
  // Create and add new card
  const card = createCardElement(pokemonData);
  document.getElementById('cardContainer').appendChild(card);

  return card;
}