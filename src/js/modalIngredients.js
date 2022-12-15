import { CocktailsApi } from './cocktailsApi';
import { refs } from './refs';
import { ApiFavorite } from './favoritesApi';

const refsByModal = {
  closeModalIngredBtn: document.querySelector("[data-modalIngred-close]"),
  modalIngred: document.querySelector("[data-modalIngred]"),
};

refsByModal.closeModalIngredBtn.addEventListener("click", closeModalWindow);

function closeModalWindow (e) {
  refsByModal.modalIngred.classList.toggle("i-backdrop--is-hidden");
  refs.modalDetailIngredientContainer.innerHTML = '';
}

function toggleModalIngred(e) {
  refsByModal.modalIngred.classList.toggle("i-backdrop--is-hidden");
  refs.modalDetailIngredientContainer.innerHTML = '';
  const cocktailsApi = new CocktailsApi();
  const favoriteApi = new ApiFavorite();
  const ingredientName = e.currentTarget.dataset.ingredientName;
  cocktailsApi.getIngredientByName(ingredientName);  

  cocktailsApi.getIngredientByName(e.target.dataset.ingredientName).then(response => {
    const inFavorites = favoriteApi.isIngredientInFavorites(response.ingredients[0].idIngredient);
    refs.modalDetailIngredientContainer.innerHTML = createIngrDetails(response.ingredients[0], inFavorites);
    const ingrFavoriteBtn = document.querySelector(".modal-ingredients__btn");
    ingrFavoriteBtn.addEventListener('click', onIngrFavClick);
  });
};

refsByModal.modalIngred.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalIngred();
  }
}

function onIngrFavClick(e) {
  const favoriteApi = new ApiFavorite();
  const inFavorites = favoriteApi.isIngredientInFavorites(e.currentTarget.dataset.ingredientId);
  if (inFavorites) {
    e.currentTarget.textContent = "Add to favorite";
    favoriteApi.removeIngredientById(e.currentTarget.dataset.ingredientId);
  } else {
    e.currentTarget.textContent = "Remove from favorite";
    favoriteApi.addIngredientById(e.currentTarget.dataset.ingredientId);
  }
}

export function onCocktailModalOpen() {
  const ingredientLinks = document.querySelectorAll("[data-modalIngred-open]");
  ingredientLinks.forEach(elm => elm.addEventListener("click", toggleModalIngred));
};

export const createIngrDetails = (ingr, inFavorites) => {

  let addBtnText = 'Add to favorite';
  let removeBtnText = 'Remove from favorite';

  let btnStatusFav = addBtnText;
  if (inFavorites) {
    btnStatusFav = removeBtnText;
  } else {
    btnStatusFav = addBtnText;
  }

  return `
    <h2 class="modal-ingredients__title">${ingr.strIngredient}</h2>
    <h3 class="modal-ingredients__headline">${ingr.strType}</h3>
    <span class="modal-ingredients__line"></span>
    <p class="modal-ingredients__text">${ingr.strDescription}</p>
    <ul class="modal-ingredients__list">
      <li class="modal-ingredients__item">Type: ${ingr.strType}</li>
      <li class="modal-ingredients__item">Alcoholic: ${ingr.strAlcohol}</li>
    </ul>
    <button type="button" class="modal-ingredients__btn btn-favorite" data-ingredient-id="${ingr.idIngredient}">${btnStatusFav}</button>
  `;
}