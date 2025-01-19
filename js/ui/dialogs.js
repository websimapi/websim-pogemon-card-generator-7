import { showToast } from './toast.js';
import { sendToPoGePalace } from '../api.js';

/**
 * Show a confirmation dialog to release a Pogemon.
 * 
 * @param {Object} cardData - The data of the Pogemon to release.
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms, false otherwise.
 */
export function showConfirmDialog(cardData) {
  return new Promise((resolve) => {
    const dialog = document.createElement('div');
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
      <h3>Release Pogemon</h3>
      <p>Are you sure you want to release ${cardData.name}?</p>
      <div class="confirm-dialog-buttons">
        <button class="cancel">Cancel</button>
        <button class="confirm">Release</button>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector('.cancel').addEventListener('click', () => {
      dialog.remove();
      resolve(false);
    });

    dialog.querySelector('.confirm').addEventListener('click', () => {
      dialog.remove();
      resolve(true);
    });
  });
}

/**
 * Show an import dialog to handle potential duplicates.
 * 
 * @param {number} totalCards - The total number of cards to import.
 * @returns {Promise<string|null>} A promise that resolves to the selected duplicate handling option, or null if the user cancels.
 */
export function showImportDialog(totalCards) {
  return new Promise((resolve) => {
    const dialog = document.createElement('div');
    dialog.className = 'import-dialog';
    dialog.innerHTML = `
      <h3>Import Collection</h3>
      <p>About to import ${totalCards} cards.</p>
      <p>How would you like to handle potential duplicates?</p>
      <div class="import-options">
        <label>
          <input type="radio" name="duplicate-handling" value="skip" checked>
          Skip exact duplicates
        </label>
        <label>
          <input type="radio" name="duplicate-handling" value="allow">
          Allow all duplicates
        </label>
      </div>
      <div class="import-dialog-buttons">
        <button class="cancel">Cancel</button>
        <button class="confirm">Import</button>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector('.cancel').addEventListener('click', () => {
      dialog.remove();
      resolve(null);
    });

    dialog.querySelector('.confirm').addEventListener('click', () => {
      const selectedOption = dialog.querySelector('input[name="duplicate-handling"]:checked').value;
      dialog.remove();
      resolve(selectedOption);
    });
  });
}

/**
 * Show a dialog to send a Pogemon to PoGePalace.
 * 
 * @param {Object} cardData - The data of the Pogemon to send.
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms and the send is successful, false otherwise.
 */
export async function showPalaceDialog(cardData) {
  const dialog = document.createElement('div');
  dialog.className = 'confirm-dialog palace-dialog';
  dialog.innerHTML = `
    <h3>Send to PoGePalace</h3>
    <p>Would you like to add ${cardData.name} to the PoGePalace?</p>
    <div class="confirm-dialog-buttons">
      <button class="cancel">Cancel</button>
      <button class="confirm">
        Send to Palace
        <span class="loading-spinner hidden"></span>
      </button>
    </div>
  `;

  document.body.appendChild(dialog);

  try {
    const result = await new Promise((resolve) => {
      const cancelBtn = dialog.querySelector('.cancel');
      const confirmBtn = dialog.querySelector('.confirm');
      const spinner = dialog.querySelector('.loading-spinner');

      cancelBtn.addEventListener('click', () => {
        dialog.remove();
        resolve(false);
      });

      confirmBtn.addEventListener('click', async () => {
        // Show loading state
        confirmBtn.disabled = true;
        spinner.classList.remove('hidden');

        try {
          const result = await sendToPoGePalace(cardData);
          dialog.remove();
          showToast(`${cardData.name} was successfully added to PoGePalace!`);
          resolve(true);
        } catch (error) {
          console.error('Failed to send to PoGePalace:', error);
          showToast('Failed to send to PoGePalace', true);
          // Re-enable button and hide spinner on error
          confirmBtn.disabled = false;
          spinner.classList.add('hidden');
        }
      });
    });

    return result;
  } catch (error) {
    dialog.remove();
    throw error;
  }
}