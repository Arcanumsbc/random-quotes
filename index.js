import quotes from "./src/data/quotes.js";
import { handleQuote, displayQuote } from "./src/handlers/quote.js";
import { toggleFavorite, hideFavoritesBtn, showFavoriteCard } from "./src/handlers/favorites.js";
import {
  localStorageGetItem,
  localStorageSetItem
} from "./src/utils/localStorage.js";

const CURRENT_QUOTE_KEY = 'currentQuote'
const FAVORITE_QUOTES_KEY = 'favoriteQuotes'

let currentQuote = null;
const favoriteQuotes = [];

function setCurrentQuote(quote, shouldToggleIsFavorite = false) {
  if (shouldToggleIsFavorite) {
    quote.isFavorite = !quote.isFavorite;
    if (quote.isFavorite) {
      favoriteQuotes.push({...quote});
    } else {
      const index = favoriteQuotes.findIndex(
        (favoriteQuote) => favoriteQuote.id === quote.id
      );
      if (index !== -1) {
        favoriteQuotes.splice(index, 1);
      }
    }
    localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
  }
  currentQuote = quote;
  localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);
}

const favoriteBtn = document.getElementById('favorite-btn');
const favoritesContainer = document.getElementById('favorites-container');
hideFavoritesBtn();
favoriteBtn.addEventListener('click', () => toggleFavorite(currentQuote, setCurrentQuote, favoriteBtn, favoritesContainer));

const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', () => handleQuote(quotes, favoriteQuotes, setCurrentQuote));

function init() {
  const currenQuoteFromStorage = localStorageGetItem(CURRENT_QUOTE_KEY);
  if (currenQuoteFromStorage) {
    displayQuote(currenQuoteFromStorage);
    currentQuote = currenQuoteFromStorage;
  }

  const favoriteQuoteFromStorage = localStorageGetItem(FAVORITE_QUOTES_KEY);
  if (favoriteQuoteFromStorage) {
    favoriteQuoteFromStorage.forEach((quote) => {
      showFavoriteCard(quote, setCurrentQuote, favoritesContainer);
      favoriteQuotes.push(quote);
    });
  }
}

window.addEventListener('load', init);

export { favoriteBtn }