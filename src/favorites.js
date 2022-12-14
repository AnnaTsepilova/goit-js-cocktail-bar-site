import { refs } from './js/refs';
import { CocktailsApi } from './js/cocktailsApi';
import { ApiFavorite } from './js/favoritesApi';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';

const cocktailsApi = new CocktailsApi();
const favorite = new ApiFavorite();

// ------------ПРИМЕР---------------------
cocktailsApi.getCocktailsBySymbol('r').then(function (response) {
  let i = 0;
  for (cocktail of response.drinks) {
    //console.log(cocktail);
    favorite.addCocktail(cocktail);
    i++;
    if (i >= 4) break;
  }
});
// ------------ПРИМЕР для теста ремува из favorites---------------
favorite.removeCocktailById(11000);
// --------------------------------------
const cocktails = favorite.getAllCocktails();
refs.cocktailsList.innerHTML = favorite.renderAllCocktails(cocktails);
const removeBtn = document.querySelectorAll('.btn-add_and_remove');
// console.log(removeBtn);

for (let btn of removeBtn) {
  btn.addEventListener('click', onRemoveBtn);
}

function onRemoveBtn(e) {
  e.preventDefault();
  favorite.removeCocktailById(e.target.dataset.cocktailId);
  const removeCocktailCard = document.querySelector('#c_' + e.target.dataset.cocktailId);
  removeCocktailCard.remove();
}
