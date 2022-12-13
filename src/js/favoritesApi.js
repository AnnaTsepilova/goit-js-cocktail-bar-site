import axios from 'axios';
import { LocalStorage } from './localStorage';
import { CocktailsApi } from './cocktailsApi';

const cocktailApi = new CocktailsApi();

const getId = document.querySelector('.btn-add_and_remove');

export class ApiFavorite {
  static favoriteCocktailsKey = 'favorite-cocktails';
  static favoriteIngridientsKey = 'favorite-ingridient';

  constructor() {}

  addCocktailById(cocktailID) {
    cocktailApi.getCocktailById(cocktailID).then(function (resposne) {
      this.addCocktail(resposne);
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
    const filteredIngridients = ingredients.filter(ingridient => ingridient.strIngredient !== name);
    this.saveIngridients(filteredIngridients);
  }

  /*async getAllCocktails() {
    const memoryId = JSON.parse(locStorage.getByKey(id));
    const arrId = memoryId.filter(el => el.idDrink);
    coctailApi.getCocktailById(arrId);
  }*/

  renderAllCocktails() {
    const cocktails = this.getAllCocktails();
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
            <button class="btn-learn_more">Learn more</button>
            <button class="btn-add_and_remove" data-cocktail-id="${cocktail.idDrink}">
              Remove
              <svg class="icon-heart__svg" width="22" height="19">
                <use href="./images/sprite.svg#icon-heart"></use>
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

  renderAllIngredient() {
    const ingridients = this.getAllIngredients();
    return ingridients
      .map(ingridient => {
        `
        <li class="list-ingredients__item">
          <h3 class="list-ingredients__name">${ingridient.strIngredient}</h3>
          <p class="list-ingredients__descr">${ingridient.strDescription}</p>
          <div class="box-btn">
            <button class="btn-learn_more">Learn more</button>
            <button class="btn-add_and_remove">
              Remove<svg class="icon-heart__svg" width="22" height="19">
                <use href="./images/sprite.svg#icon-heart"></use>
              </svg>
            </button>
          </div>
        </li>`;
      })
      .join('');
  }

  searchByCocktailName(event) {
    event.preventDefault();
    const searchText = event.currentTarget.searchQuery.value.trim();
    const cocktails = this.getAllCocktails();
    if (searchText === cocktails.strDrink) {
      this.renderAllCocktails();
    }
    // if (hits.length === 0) {
    // const { hits } = localStorage(searchText);
    // event.target.reset();
    //   favoriteCocktails.classList.add('is-hidden'),
    //     favoriteCocktailsNotFound.classList.remove('is-hidden');
    // } else {
    //   return localStorage.map(() => ``).join('');
    // }
  }

  searchByIngredientsName() {}

  isCoctailInFavorites(cocktailId) {
    const cocktails = this.getAllCocktails();
    return !!cocktails.find(cocktail => cocktail.idDrink === cocktailId);
  }
}

// const favoriteCocktails = document.querySelector('.favorite-cocktails');
// const favoriteCocktailsNotFound = document.querySelector('.add-box-cocktails');
// form.addEventListener('submit', formSubmit);
// let searchText = '';
