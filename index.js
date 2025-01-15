import quotes from "./src/data/quotes.js";
import { handleQuote } from "./src/handlers/quote.js";
import { toggleFavorite, hideFavoritesBtn } from "./src/handlers/favorites.js";

let currentQuote = null;

function setCurrentQuote(quote) {
  currentQuote = quote;
}

const favoriteBtn = document.getElementById('favorite-btn');
const favoritesContainer = document.getElementById('favorites-container');
hideFavoritesBtn(favoriteBtn);
favoriteBtn.addEventListener('click', () => toggleFavorite(currentQuote, favoriteBtn, favoritesContainer));

const generateBtn = document.getElementById('generate-btn');
generateBtn.addEventListener('click', () => handleQuote(quotes, setCurrentQuote));

export { favoriteBtn }