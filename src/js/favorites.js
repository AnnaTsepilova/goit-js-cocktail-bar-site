import axios from 'axios';
import { LocalStorage } from './localStorage';
import { CocktailsApi } from './cocktailsApi';
import { x } from './test';

const locStorage = new LocalStorage();
const coctailApi = new CocktailsApi();

const getId = document.querySelector('.btn-add_and_remove');
const KEY = 'keyLocal';
localStorage.setItem(key, JSON.stringify(x));

export class ApiFavorite {
  static BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor() {}

  addCocktailById() {
    const id = locStorage.saveByKey(key, idDrink);
  }

  addIngredientByName(newIngredient) {}

  removeCocktailById(removeId) {
    const index = this.arrCockt.indexOf(removeId);
    this.arrCockt.splice(index, 1);
  }

  removeIngredientByName() {}

  async getAllCocktails() {
    const memoryId = JSON.parse(locStorage.getByKey(id));
    const arrId = memoryId.filter(el => el.idDrink);
    coctailApi.getCocktailById(arrId);
  }

  renderAllCocktails(data) {
    const arr = JSON.parse(localStorage.getByKey(key));
    return arr
      .map(elem => {
        `
    <li class="list-favorite__item">
    <img class="list-favorite_img" src="${elem}" alt="${elem}" />
    <h3 class="list-favorite_coctail">${elem}</h3>
    <div class="list-favorite_btn">
      <button class="btn-learn_more">Learn more</button>
      <button class="btn-add_and_remove">
        Remove
        <svg class="icon-heart__svg" width="22" height="19">
          <use href="./images/sprite.svg#icon-heart"></use>
        </svg>
      </button>
    </div>
  </li>`;
      })
      .join(' ');
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
