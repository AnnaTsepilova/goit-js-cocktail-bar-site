import axios from 'axios';

export class CocktailsApi {
  static BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

  constructor() {}

  async searchCocktailByName(cocktailName) {
    const response = await axios.get(`${CocktailsApi.BASE_URL}search.php?s=${cocktailName}`);
    return response.data;
  }

  async getCocktailById(cocktailId) {
    const response = await axios.get(`${CocktailsApi.BASE_URL}lookup.php?i=${cocktailId}`);
    return response.data;
  }

  async getCocktailsBySymbol(symbol) {
    const response = await axios.get(`${CocktailsApi.BASE_URL}search.php?f=${symbol}`);
    return response.data;
  }

  async getIngredientByName(IngredientName) {
    const response = await axios.get(`${CocktailsApi.BASE_URL}search.php?i=${IngredientName}`);
    return response.data;
  }

  async getIngredientById(ingredientId) {
    const response = await axios.get(`${CocktailsApi.BASE_URL}lookup.php?iid=${ingredientId}`);
    return response.data;
  }
}
