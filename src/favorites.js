import { refs } from './js/refs';
import { ApiFavorite } from './js/favoritesApi';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';
import * as mobileMenu from './js/mobileMenu';

const favorite = new ApiFavorite();
const cocktailUI = new CocktailsRender();

// --------------------------------------
renderFavorites();

refs.searchFavorite.addEventListener('submit', function (event) {
  favorite.searchByCocktailName(event);
  onRenderFavorites();
});

refs.modalCocktails.addEventListener('click', function (event) {
  renderFavorites();
});

function onRemoveBtn(e) {
  e.preventDefault();
  favorite.removeCocktailById(e.currentTarget.dataset.cocktailId);
  const removeCocktailCard = document.querySelector('#c_' + e.currentTarget.dataset.cocktailId);
  removeCocktailCard.remove();
}

function renderFavorites() {
  let cocktails = favorite.getAllCocktails();
  if (cocktails.length === 0) {
    refs.cocktailsList.innerHTML = favorite.renderEmptyFavCocktailsPage();
  } else {
    refs.cocktailsList.innerHTML = favorite.renderAllCocktails(cocktails);
  };
  onRenderFavorites();
}

function onRenderFavorites() {
  const removeBtn = document.querySelectorAll('.btn-add_and_remove');
  cocktailUI.onRenderComplete();
  // ------ listener на кнопку remove----------
  for (let btn of removeBtn) {
    console.log('remove');
    btn.addEventListener('click', onRemoveBtn);
  }
}
