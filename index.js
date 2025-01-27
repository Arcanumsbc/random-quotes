import { displayCurrentQuote } from "./src/handlers/currentQuote.js";
import {
  hideFavoritesBtn,
  showFavoriteCard,
  updateFavoriteButton,
  toggleFavoriteCard,
  removeFavoriteCard,
} from "./src/handlers/favorites.js";
import { localStorageGetItem, localStorageSetItem } from "./src/utils/localStorage.js";
import { getRandomQuote } from "./src/handlers/randomQuote.js";
import { removeObjectFromArrayById } from "./src/utils/array.js";

const CURRENT_QUOTE_KEY = 'currentQuote'
const FAVORITE_QUOTES_KEY = 'favoriteQuotes'

const randomQuoteBtn = document.getElementById('random-quote-btn');
const quoteFavoriteBtn = document.getElementById('favorite-btn');
const favoritesContainer = document.getElementById('favorites-container');

let currentQuote = null;
const favoriteQuotes = [];

function removeFavoriteQuote(id) {
  //REMOVE FAVORITE QUOTE
  if (id === currentQuote.id) {
    //Removing from favorites current quote by clocking on the card Remove
    // from favorites button
    toggleCurrentQuote();
  } else {
    //Removing from favorites quote which is not current quote
    //sync app state by remove favorite quote from the favorite quotes array
    removeObjectFromArrayById(favoriteQuotes, id);

  }
  //Remove favorite card from UI
  removeFavoriteCard(id);
  //Save favorite quotes in the local storage
  localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);

  // const currentQuote = document.querySelector(`[data-current-quote-id]`);
  // const currentQuoteId = currentQuote.dataset.currentQuoteId;
}

function toggleCurrentQuote () {
  //CURRENT QUOTE UPDATE
  //sync app state and toggle isFavorite of the current quote
  currentQuote.isFavorite = !currentQuote.isFavorite;
  //update UI by toggling favorite Icon (no need to display again current
  // quote
  updateFavoriteButton(currentQuote.isFavorite)
  //Save current quote in the local storage
  localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);

  //FAVORITE QUOTES UPDATE
  //sync app state and update favoriteQuotes array
  if (currentQuote.isFavorite) {
    favoriteQuotes.push( {...currentQuote} );
  } else {
    removeObjectFromArrayById(favoriteQuotes, currentQuote.id);
  }

  //update UI by adding or removing favorite card
  toggleFavoriteCard(currentQuote, favoritesContainer);
  //Save favorite quotes in the local storage
  localStorageSetItem(FAVORITE_QUOTES_KEY, favoriteQuotes);
}

function setCurrentQuote(quote) {
  //SET CURRENT QUOTE
  //Change app state and write copy of the quote to the current quote
  currentQuote = { ...quote };
  //Check if id of the current quote is among favorites quotes and set
  // isFavorite
  currentQuote.isFavorite = !!favoriteQuotes.find((favoriteQuote) => favoriteQuote.id === currentQuote.id);
  //Show current quote in the UI
  displayCurrentQuote(currentQuote);
  //Display favorite Icon and change its state
  updateFavoriteButton(currentQuote.isFavorite)
  // showFavoritesBtn(currentQuote.isFavorite)
  //Save current quote in the local storage
  localStorageSetItem(CURRENT_QUOTE_KEY, currentQuote);
}

hideFavoritesBtn();
quoteFavoriteBtn.addEventListener('click', toggleCurrentQuote);

//expecting new random quote {id, text, author, ...}
randomQuoteBtn.addEventListener('click', () => setCurrentQuote(getRandomQuote()));

function init() {
  const favoriteQuoteFromStorage = localStorageGetItem(FAVORITE_QUOTES_KEY);
  if (favoriteQuoteFromStorage) {
    favoriteQuoteFromStorage.forEach((quote) => {
      showFavoriteCard(quote, favoritesContainer);
      favoriteQuotes.push(quote);
    });
  }

  const currenQuoteFromStorage = localStorageGetItem(CURRENT_QUOTE_KEY);
  if (currenQuoteFromStorage) {
    setCurrentQuote( { quote: currenQuoteFromStorage, isFromStorage: true });
  }
}

window.addEventListener('load', init);

export { quoteFavoriteBtn, removeFavoriteQuote }