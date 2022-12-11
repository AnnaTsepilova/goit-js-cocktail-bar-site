import * as cocktailsApi from './js/cocktailsApi';
import * as localStorage from './js/localStorage';
import * as favorites from './js/favorites';
import * as themeSwitch from './js/themeSwitch';
import {CocktailsRender} from './js/cocktailsRender';

// ---------инициализация класса CocktailsRender для вывода блоков----------
const cocktailUI = new CocktailsRender();
const SearchList = document.querySelector('.search__list');

// ---------рендерим алфавитный поиск----------
SearchList.insertAdjacentHTML('beforeend', cocktailUI.renderAlphabet());
