import { refs } from './js/refs';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';
import { Header } from './js/header';

import * as modalCocktails from './js/modalCocktails';
import * as modalIngredients from './js/modalIngredients';

import * as mobileMenu from './js/mobileMenu';
import * as searchCoctails from './js/searchCoctails';

// ---------инициализация класса CocktailsRender для вывода блоков----------
const cocktailUI = new CocktailsRender();

// ---------рендерим алфавитный поиск----------
refs.searchList.innerHTML = cocktailUI.renderAlphabet();

cocktailUI.renderOptionDataList();
cocktailUI.addDatalistListeners();
cocktailUI.renderRandomCocktails();
refs.searchList.addEventListener('click', function (e) {
  cocktailUI.searchByABC(e);
});
refs.headerSearch.addEventListener('submit', function (e) {
  cocktailUI.searchByHeader(e);
});

// refs.closeModalBtn.addEventListener("click", cocktailUI.toggleModal);
