import { refs } from './refs';
import { CocktailsApi } from './cocktailsApi';
import sprite from '../images/sprite.svg';
import { createCocktailDetails, createCocktailDetailsMobile } from './modalCocktails';

const cocktailApi = new CocktailsApi();

const getId = document.querySelector('.btn-add_and_remove');

export class ApiFavorite {
  static favoriteCocktailsKey = 'favorite-cocktails';
  static favoriteIngridientsKey = 'favorite-ingridient';

  constructor() {}

  addCocktailById(cocktailID) {
    const thisObj = this;
    cocktailApi.getCocktailById(cocktailID).then(function (resposne) {
      thisObj.addCocktail(resposne.drinks[0]);
    });
  }

  addCocktail(cocktailObject) {
    // Check for cocktail ID
    if (!cocktailObject.idDrink) {
      return;
    }

    let cocktails = this.getAllCocktails();
    //console.log(cocktails);
    if (!cocktails) {
      cocktails = [];
    }

    // Check for added cocktail
    let result = cocktails.filter(cocktail => cocktail.idDrink === cocktailObject.idDrink);
    if (result.length) {
      return;
    }

    cocktails.push(cocktailObject);

    localStorage.setItem(ApiFavorite.favoriteCocktailsKey, JSON.stringify(cocktails));
  }

  removeCocktailById(cocktailID) {
    if (!cocktailID) {
      return;
    }
    let cocktails = this.getAllCocktails();
    if (!cocktails) {
      return;
    }

    for (let key in cocktails) {
      if (cocktails[key].idDrink == cocktailID) {
        cocktails.splice(key, 1);
      }
    }

    localStorage.setItem(ApiFavorite.favoriteCocktailsKey, JSON.stringify(cocktails));
  }

  getAllCocktails() {
    return JSON.parse(localStorage.getItem(ApiFavorite.favoriteCocktailsKey)) ?? [];
  }

  async addIngredientByName(name) {
    const ingridients = this.getAllIngredients();
    if (ingridients && ingridients.find(ingridient => ingridient.strIngredient === name)) {
      return;
    }
    const ingridientsByName = await cocktailApi.getIngredientByName(name);

    const newIngridient =
      ingridientsByName &&
      ingridientsByName.ingredients.find(ingridient => ingridient.strIngredient === name);
    // если не нашло то может вывести alert?
    if (!newIngridient) {
      return;
    }

    ingridients.push(newIngridient);
    this.saveIngridients(ingridients);
  }

  /*removeCocktailById(removeId) {
    const index = this.arrCockt.indexOf(removeId);
    this.arrCockt.splice(index, 1);
  }*/

  removeIngredientByName(name) {
    const ingredients = this.getAllIngredients();
    const filteredIngridients = ingredients.filter(ingridient => ingridient.idIngredient !== name);
    this.saveIngridients(filteredIngridients);
  }

  /*async getAllCocktails() {
    const memoryId = JSON.parse(locStorage.getByKey(id));
    const arrId = memoryId.filter(el => el.idDrink);
    coctailApi.getCocktailById(arrId);
  }*/

  renderAllCocktails(cocktails) {
    if (!cocktails) {
      return;
    }
    return cocktails
      .map(
        cocktail =>
          `
        <li class="list-favorite__item" id="c_${cocktail.idDrink}">
          <img class="list-favorite_img" src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}" />
          <h3 class="list-favorite_coctail">${cocktail.strDrink}</h3>
          <div class="list-favorite_btn">
            <button class="btn-learn_more" data-cocktail-id="${cocktail.idDrink}">Learn more</button>
            <button class="btn-add_and_remove" data-cocktail-id="${cocktail.idDrink}">
              Remove
              <svg class="icon-heart__svg solid" width="22" height="19">
                <use href="${sprite}#icon-heart"/>
              </svg>
            </button>
          </div>
        </li>`
      )
      .join('');
  }

  /**
   * @typedef {object} Ingredient
   * @property {string} Ingredient.idIngredient
   * @property {string} Ingredient.strIngredient
   * @property {string} Ingredient.strDescription
   * @property {string} Ingredient.strType
   * @property {string} Ingredient.strAlcohol
   * @property {string} Ingredient.strABV
   * @return {[Ingredient]}
   */

  getAllIngredients() {
    return JSON.parse(localStorage.getItem(ApiFavorite.favoriteIngridientsKey)) ?? [];
  }

  saveIngridients(ingridients) {
    localStorage.setItem(ApiFavorite.favoriteIngridientsKey, JSON.stringify(ingridients));
  }

  renderAllIngredient(ingridients) {
    // console.log(ingridients);
    return ingridients
      .map(ingridient => {
        return `
        <li class="list-ingredients__item" id="${ingridient.idIngredient}">
          <h3 class="list-ingredients__name">${ingridient.strIngredient}</h3>
          <p class="list-ingredients__descr">${ingridient.strType}</p>
          <div class="box-btn">
            <button class="btn-learn_more1" data-modalIngred-open data-ingredient-name="${ingridient.strIngredient}">Learn more</button>
            <button class="btn-add_and_remove solid">
              Remove<svg class="icon-heart__svg solid" width="22" height="19">
                <use href="${sprite}#icon-heart"></use>
              </svg>
            </button>
          </div>
        </li>`;
      })
      .join('');
  }

  searchByCocktailName(event) {
    event.preventDefault();
    const searchText = event.target.query.value;
    const cocktails = this.getAllCocktails();
    refs.cocktailsList.innerHTML = '';
    const newCocktails = cocktails.reduce((acc, cocktail) => {
      const cocByName = cocktail.strDrink.toLowerCase();
      return cocByName.includes(searchText.toLowerCase()) ? [...acc, cocktail] : [...acc];
    }, []);
    refs.cocktailsList.insertAdjacentHTML('beforeend', this.renderAllCocktails(newCocktails));
  }

  searchByIngredientsName(event) {
    event.preventDefault();
    const searchText = event.target.query.value;
    const ingridients = this.getAllIngredients();
    refs.ingridientsList.innerHTML = '';
    const newIngridients = ingridients.reduce((acc, ingridient) => {
      const ingrByName = ingridient.strIngredient.toLowerCase();
      return ingrByName.includes(searchText.toLowerCase()) ? [...acc, ingridient] : [...acc];
    }, []);
    refs.ingridientsList.insertAdjacentHTML('beforeend', this.renderAllIngredient(newIngridients));
  }

  isCoctailInFavorites(cocktailId) {
    const cocktails = this.getAllCocktails();
    return !!cocktails.find(cocktail => cocktail.idDrink === cocktailId);
  }

  // -----------функция добавления/удаления коктейля в Favorites из Cocktails Details----------------
  favoritesBtnLister(drink) {
    const addToFavBtn = document.querySelector('.btn-favorite');

    addToFavBtn.addEventListener('click', e => {
      let isFavorite = this.isCoctailInFavorites(drink.idDrink);

      if (isFavorite) {
        this.removeCocktailById(drink.idDrink);
      } else {
        this.addCocktailById(drink.idDrink);
      }

      if (window.screen.width < 768) {
        refs.modalDetailCocktailContainerMobile.innerHTML = createCocktailDetailsMobile(
          drink,
          !isFavorite
        );
      } else {
        refs.modalDetailCocktailContainer.innerHTML = createCocktailDetails(drink, !isFavorite);
      }

      this.favoritesBtnLister(drink);
    });
  }
}
