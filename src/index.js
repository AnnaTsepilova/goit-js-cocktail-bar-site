import { refs } from './js/refs';
import { CocktailsApi } from './js/cocktailsApi';
import { LocalStorage } from './js/localStorage';
import * as favorites from './js/favoritesApi';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';
import * as searchCoctails from './js/searchCoctails';

// ---------инициализация класса CocktailsRender для вывода блоков----------
const cocktailUI = new CocktailsRender();

// ---------рендерим алфавитный поиск----------
refs.searchList.innerHTML = cocktailUI.renderAlphabet();
 
cocktailUI.renderOptionDataList();
cocktailUI.addDatalistListeners();
cocktailUI.renderRandomCocktails();

