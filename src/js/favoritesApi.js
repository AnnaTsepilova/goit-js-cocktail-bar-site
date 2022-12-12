import axios from 'axios';
import { LocalStorage } from './localStorage';
import { CocktailsApi } from './cocktailsApi';
import { x } from './test';

const cocktailApi = new CocktailsApi();

const getId = document.querySelector('.btn-add_and_remove');

export class ApiFavorite {
  static localStorageKey = 'favorite-cocktails';

  constructor() { }

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

    localStorage.setItem(ApiFavorite.localStorageKey, JSON.stringify(cocktails));
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

    localStorage.setItem(ApiFavorite.localStorageKey, JSON.stringify(cocktails));
  }

  getAllCocktails() {
    return JSON.parse(localStorage.getItem(ApiFavorite.localStorageKey));
  }

  addIngredientByName(newIngredient) {}

  /*removeCocktailById(removeId) {
    const index = this.arrCockt.indexOf(removeId);
    this.arrCockt.splice(index, 1);
  }*/

  removeIngredientByName() {}

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
      .map(cocktail => 
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

  getAllIngredients(data) {
    return data
      .map(elem => {
        `
        <li class="list-ingredients__item">
          <h3 class="list-ingredients__name">${data}</h3>
          <p class="list-ingredients__descr">${data}</p>
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
      .join(' ');
  }

  renderAllIngredient(data) {}

  // async searchByCocktailName(event) {
  //   event.preventDefault();
  //   searchText = event.currentTarget.searchQuery.value.trim();
  //   const { hits } = await localStorage(searchText);
  //   event.target.reset();
  //   if (hits.length === 0) {
  //     favoriteCocktails.classList.add('is-hidden'),
  //       favoriteCocktailsNotFound.classList.remove('is-hidden');
  //   } else {
  //     return localStorage.map(() => ``).join('');
  //   }
  // }

  searchByIngredientsName() {}

  isCoctailInFavorites() {}
}

// const favoriteCocktails = document.querySelector('.favorite-cocktails');
// const favoriteCocktailsNotFound = document.querySelector('.add-box-cocktails');
// form.addEventListener('submit', formSubmit);
// let searchText = '';
