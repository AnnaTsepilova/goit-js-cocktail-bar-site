import { refs } from './js/refs';
import { ApiFavorite } from './js/favoritesApi';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';
import * as mobileMenu from './js/mobileMenu';
import { onCocktailModalOpen } from './js/modalIngredients';

const favorite = new ApiFavorite();
const cocktailUI = new CocktailsRender();

renderFavoriteIngridients();

refs.searchFavorite.addEventListener('submit', function (event) {
  favorite.searchByIngredientsName(event);
});

// refs.modalIngridients.addEventListener('click', function (event) {
//   renderFavoriteIngridients();
// });

function onRemoveBtn(e) {
  favorite.removeIngredientById(e.id);
  e.remove();
}

function renderFavoriteIngridients() {
  let ingredients = favorite.getAllIngredients();
  if (ingredients.length === 0) {
    refs.ingridientsList.innerHTML = favorite.renderEmptyFavIngredientsPage();
  } else {
    refs.ingridientsList.innerHTML = favorite.renderAllIngredient(ingredients);
  };
}



const ingredientsList = document.querySelectorAll('.list-ingredients__item');
cocktailUI.onRenderComplete();

for (let ingredient of ingredientsList) {
  console.log('remove');
  const btn = ingredient.querySelector('[data-ingredient-remove]');
  btn.addEventListener('click', e => {
    e.preventDefault();
    onRemoveBtn(ingredient);
  });
}

onCocktailModalOpen();

// const removeBtn = document.querySelectorAll('.btn-add_and_remove');
// cocktailUI.onRenderComplete();
// // ------ listener на кнопку remove----------
// for (let btn of removeBtn) {
//   console.log('remove');
//   btn.addEventListener('click', onRemoveBtn);
// }
