// import * as localStorage from './js/localStorage';
import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?';

export default class ApiFavorite {
  constructor() {
    this.searchCocktailName = '';
    this.searchCocktailName = '';
    // this.cocktails = [...cocktails];
    // this.inngredients = [...inngredients];
  }

  addCocktailById(id) {}

  addIngredientByName(addIngredient) {}

  remmoveCocktailById() {}

  removeIngredientByName() {}

  async getAllCocktails() {
    try {
      const response = await axios(`${BASE_URL}f=a`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  async getAllIngredients() {
    try {
      const response = await axios(`${BASE_URL}i=vodka`);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  searchByCocktailName() {}

  searchByIngredientsName() {}

  isCoctailInFavorites() {}
}

const newApi = new ApiFavorite();

newApi.getAllCocktails();
