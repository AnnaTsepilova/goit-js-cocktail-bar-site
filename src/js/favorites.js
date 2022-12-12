import axios from 'axios';
import { LocalStorage } from './localStorage';
import { CocktailsApi } from './cocktailsApi';

const locStorage = new LocalStorage();
const coctailApi = new CocktailsApi();

const getId = document.querySelector('.btn-add_and_remove');

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

  async getAllIngredients() {}

  searchByCocktailName() {}

  searchByIngredientsName() {}

  isCoctailInFavorites() {}
}
