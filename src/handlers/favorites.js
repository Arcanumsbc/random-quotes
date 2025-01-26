import { favoriteBtn } from "../../index.js";

function toggleFavorite(quote, setCurrentQuote, btn, container) {
  const shouldToggleIsFavorite = true;
  setCurrentQuote(quote, shouldToggleIsFavorite);
  toggleFavoriteBtnIcon(quote.isFavorite, btn);

  if (quote.isFavorite) {
    showFavoriteCard(quote, setCurrentQuote, container);
  } else {
    hideFavoriteCard(quote.id);
  }
}

function handleFavorite(isFavorite) {
  showFavoritesBtn()
  toggleFavoriteBtnIcon(isFavorite);
}

function toggleFavoriteBtnIcon(isFavorite) {
  favoriteBtn.classList.toggle('fa', isFavorite);
  favoriteBtn.classList.toggle('fa-regular', !isFavorite);
}

function showFavoritesBtn() {
 favoriteBtn.style.display = 'inline-block';
}

function hideFavoritesBtn() {
  favoriteBtn.style.display = 'none';
}

function removeFavoriteQuote(quote, setCurrentQuote) {
  const shouldToggleIsFavorite = true;
  setCurrentQuote(quote, shouldToggleIsFavorite);
  hideFavoriteCard(quote.id);
  const currentQuote = document.querySelector(`[data-current-quote-id]`);
  const currentQuoteId = currentQuote.dataset.currentQuoteId;
  if (quote.id === currentQuoteId) {
    toggleFavoriteBtnIcon(quote.isFavorite);
  }
}

function showFavoriteCard(quote, setCurrentQuote, container) {
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

  const deleteButton = favoriteCard.querySelector('.btn-delete');
  deleteButton.addEventListener('click',() => removeFavoriteQuote(quote, setCurrentQuote))
}

function hideFavoriteCard(id) {
  const card = document.querySelector(`[data-quote-id="${id}"]`);
  if (card) {
    card.remove();
  }
}

export { handleFavorite, toggleFavorite, hideFavoritesBtn, showFavoriteCard };