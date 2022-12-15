import { refs } from './refs';
import { CocktailsApi } from './cocktailsApi';
import { ApiFavorite } from './favoritesApi';
import { onCocktailModalOpen } from './modalIngredients';

const refsByModal = {
  closeModalCocktailsBtn: document.querySelector("[data-modalCocktails-close]"),
  closeModalCocktailsBtnTablet: document.querySelector("[data-modalCocktailsTablet-close]"),
  modalCocktails: document.querySelector("[data-modalCocktails]"),
};

refsByModal.closeModalCocktailsBtn.addEventListener("click", toggleModal);
refsByModal.closeModalCocktailsBtnTablet.addEventListener("click", toggleModal);

function toggleModal() {
  refsByModal.modalCocktails.classList.toggle("c-backdrop--is-hidden");
};



refsByModal.modalCocktails.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModal();
  }
}

export const onLearnMoreBtn = (e) => {
  e.preventDefault();

  const cocktailsApi = new CocktailsApi();
  const favoriteApi = new ApiFavorite();

  refs.modalCocktailWindow.classList.toggle('c-backdrop--is-hidden');
  refs.modalDetailCocktailContainer.innerHTML = '';
  refs.modalDetailCocktailContainerMobile.innerHTML = '';

  cocktailsApi.getCocktailById(e.target.dataset.cocktailId).then(response => {
    let drink = response.drinks[0];
    let isFavorite = favoriteApi.isCoctailInFavorites(drink.idDrink);

    if (window.screen.width < 768) {
      refs.modalDetailCocktailContainerMobile.innerHTML = createCocktailDetailsMobile(
        drink,
        isFavorite
      );
      onCocktailModalOpen();
    } else {
      refs.modalDetailCocktailContainer.innerHTML = createCocktailDetails(drink, isFavorite);
      onCocktailModalOpen();
    }

    favoriteApi.favoritesBtnLister(drink, isFavorite);
  });
}

// ----------------возвращает список ингрудиентов из объекта коктейля----------
function parseIngredients(drink) {
  let ingredients = [];
  for (let props in drink) {
    if (props.indexOf('strIngredient') != -1) {
      if (drink[props]) {
        ingredients.push(drink[props]);
      }
    }
  }

  return ingredients;
}


// ----------------рендерим модальное окно Cocktail Details Tablet----------
export const createCocktailDetails = (drink, inFavorites) => {
  let ingredients = parseIngredients(drink);
  let addBtnText = 'Add to favorite';
  let removeBtnText = 'Remove from favorite';

  let btnStatusFav = addBtnText;
  if (inFavorites) {
    btnStatusFav = removeBtnText;
  } else {
    btnStatusFav = addBtnText;
  }

  return `
      <div class="modal-cocktails-title__wrap">
        <img
          class="modal-cocktails__img"
          src="${drink.strDrinkThumb}"
          alt="${drink.strDrink}"
          width="288"
          height="320"
          loading="lazy"
        />
        <div class="modal-cocktails__wrap">
          <h2 class="modal-cocktails__title">${drink.strDrink}</h2>
          <h3 class="modal-cocktails__subject">Ingredients</h3>
          <p class="modal-cocktails__subtitle">Per cocktail</p>
          <ul class="modal-cocktails__list">` +
    ingredients.map(ingredient => {
      return `
            <li class="modal-cocktails__item">
              <a class="modal-cocktails__link" href="#" data-modalIngred-open data-ingredient-name="${ingredient}">${ingredient}</a>
            </li>`
    }).join('') +
    `</ul>
        </div>
      </div>
      <h3 class="modal-cocktails__headline">Instractions:</h3>
      <p class="modal-cocktails__text">${drink.strInstructions}</p>
      <button class="modal__btn btn-favorite" data-cocktail-id="${drink.idDrink}">${btnStatusFav}</button>
      `;
}

// ----------------рендерим модальное окно Cocktail Details Mobile----------
export const createCocktailDetailsMobile = (drink, inFavorites) => {
  let ingredients = parseIngredients(drink);
  let addBtnText = 'Add to favorite';
  let removeBtnText = 'Remove from favorite';

  let btnStatusFav = addBtnText;
  if (inFavorites) {
    btnStatusFav = removeBtnText;
  } else {
    btnStatusFav = addBtnText;
  }

  return `
    <h2 class="modal-cocktails__title">${drink.strDrink}</h2>
    <h3 class="modal-cocktails__headline">Instractions:</h3>
    <p class="modal-cocktails__text">${drink.strInstructions}</p>
    <img class="modal-cocktails__img" src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="280" height="280" loading="lazy" />

    <h3 class="modal-cocktails__subject">Ingredients</h3>
    <p class="modal-cocktails__subtitle">Per cocktail</p>
    <ul class="modal-cocktails__list">` +
    ingredients.map(ingredient => {
      return `
        <li class="modal-cocktails__item">
          <a class="modal-cocktails__link" href="#" data-modalIngred-open data-ingredient-name="${ingredient}">${ingredient}</a>
        </li>`
    }).join('') +
    `</ul>
    <button class="modal__btn btn-favorite" data-cocktail-id="${drink.idDrink}">${btnStatusFav}</button>

  `;
}


