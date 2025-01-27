import { quoteFavoriteBtn, removeFavoriteQuote } from "../../index.js";

function toggleFavoriteCard(quote, container) {
  quote.isFavorite ? showFavoriteCard(quote, container) : removeFavoriteCard(quote.id);
}

function updateFavoriteButton(isFavorite) {
  const btn = quoteFavoriteBtn;

  if (typeof isFavorite === 'boolean') {
    // Режим установки состояния
    btn.style.display = 'inline-block';
    if (isFavorite) {
      btn.classList.replace('fa-regular', 'fa');
    } else {
      btn.classList.replace('fa', 'fa-regular');
    }
  } else {
    // Режим переключения
    if (btn.classList.contains('fa')) {
      btn.classList.replace('fa', 'fa-regular');
    } else if (btn.classList.contains('fa-regular')) {
      btn.classList.replace('fa-regular', 'fa');
    }
  }
}

function hideFavoritesBtn() {
  quoteFavoriteBtn.style.display = 'none';
}

function showFavoriteCard(quote, container) {
  const { id, text, author } = quote;
  const favoriteCard = document.createElement('div');
  favoriteCard.classList.add('favorite-card');
  favoriteCard.dataset.quoteId = id;
  favoriteCard.innerHTML = `
      <div class="favorite-card-content">
      <p>${text}</p>
      <p class="author">${author}</p>
      </div>
      <button class="btn btn-delete"><i class="far fa-trash-alt"></i> Remove from favorintes</button>
    `;
  container.appendChild(favoriteCard);

  const removeButton = favoriteCard.querySelector('.btn-delete');
  removeButton.addEventListener('click',() => removeFavoriteQuote(id))
}

function removeFavoriteCard(id) {
  const card = document.querySelector(`[data-quote-id="${id}"]`);
  if (card) {
    card.remove();
  }
}

export { toggleFavoriteCard, hideFavoritesBtn, showFavoriteCard, removeFavoriteCard, updateFavoriteButton };