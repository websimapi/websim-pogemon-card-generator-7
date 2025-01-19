import { generatePokemonImage } from '../api.js';
import { saveCard } from '../db.js';
import { getTypeIcon, getTypeColor } from './typeUtils.js';
import { handleHover, resetHover } from './cardEffects.js';

export function createCardElement(pokemonData) {
  const card = document.createElement('div');
  card.className = 'card';
  
  const cardInner = document.createElement('div');
  cardInner.className = 'card-inner flipped';
  
  const types = pokemonData.type.split('/');
  const primaryType = types[0].toLowerCase().trim();
  const secondaryType = types[1] ? types[1].toLowerCase().trim() : primaryType;
  const primaryColor = getTypeColor(primaryType);
  const secondaryColor = getTypeColor(secondaryType);
  
  cardInner.innerHTML = `
    <div class="card-front" style="background: linear-gradient(135deg, ${primaryColor}26, ${secondaryColor}26 70%)">
      <h2 class="pokemon-name">${pokemonData.name}</h2>
      <div class="card-image-container"></div>
      <div class="stats-container">
        <div class="type-wrapper">
          ${types.map(type => `
            <div class="type-icon ${type.toLowerCase().trim()}" title="${type.trim()}">
              ${getTypeIcon(type.trim())}
            </div>
          `).join('')}
        </div>
        <p class="pokemon-stats">${pokemonData.height} | ${pokemonData.weight}</p>
      </div>
      <div class="card-description">
        <p class="pokemon-description">${pokemonData.description}</p>
      </div>
    </div>
    <div class="card-back">
      <div class="card-back-design">
        <svg class="card-back-logo" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/>
          <circle cx="50" cy="50" r="20" fill="currentColor"/>
          <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" stroke-width="2"/>
        </svg>
        <div class="card-back-pattern"></div>
      </div>
    </div>
  `;
  
  card.appendChild(cardInner);

  // Generate image for the card
  generatePokemonImage(`cartoon Pogemon ${pokemonData.description}`).then(async imageUrl => {
    if (imageUrl) {
      const pokemonImage = document.createElement('img');
      pokemonImage.className = 'pokemon-image hidden';
      pokemonImage.src = imageUrl;
      pokemonImage.alt = `cartoon Pogemon ${pokemonData.description} - ${pokemonData.name} cartoon Pogemon`;
      
      pokemonImage.addEventListener('load', async function() {
        const actualSrc = this.currentSrc || this.src;
        if (!actualSrc.includes('cartoon Pogemon')) {
          this.classList.remove('hidden');
          // Create backup
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `${pokemonData.name}.png`, { type: 'image/png' });
            const backupImageUrl = await websim.upload(file);
            
            // Save card with both image URLs
            await saveCard({
              name: pokemonData.name,
              description: pokemonData.description,
              type: pokemonData.type,
              height: pokemonData.height,
              weight: pokemonData.weight,
              imageUrl: actualSrc,
              backupImageUrl: backupImageUrl
            });
          } catch (error) {
            console.error('Failed to create backup image:', error);
            // Continue without backup URL
            await saveCard({
              name: pokemonData.name,
              description: pokemonData.description,
              type: pokemonData.type,
              height: pokemonData.height,
              weight: pokemonData.weight,
              imageUrl: actualSrc
            });
          }
        }
      });
      
      pokemonImage.addEventListener('error', function() {
        this.classList.add('hidden');
      });
      
      const imageContainer = card.querySelector('.card-image-container');
      imageContainer.appendChild(pokemonImage);
    }
  });

  // Add hover effects
  card.addEventListener('mousemove', handleHover);
  card.addEventListener('mouseleave', resetHover);

  // Add flip functionality
  card.addEventListener('click', (e) => {
    const cardInner = e.currentTarget.querySelector('.card-inner');
    cardInner.classList.toggle('flipped');
  });

  // Show card with initial animation
  requestAnimationFrame(() => {
    card.classList.add('show');
  });

  return card;
}