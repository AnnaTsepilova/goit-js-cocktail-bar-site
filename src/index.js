import { CocktailsApi } from './js/cocktailsApi';
import { LocalStorage } from './js/localStorage';
import * as favorites from './js/favorites';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';

// ---------инициализация класса CocktailsRender для вывода блоков----------
const cocktailUI = new CocktailsRender();
const SearchList = document.querySelector('.search__list');

// ---------рендерим алфавитный поиск----------
SearchList.insertAdjacentHTML('beforeend', cocktailUI.renderAlphabet());

// ---------инициализация класса cocktailsApi----------
const cocktailsApi = new CocktailsApi();

// ---------пример вызова API----------

/*cocktailsApi.getCocktailsBySymbol('1')
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
*/

// ---------инициализация класса localStorage----------
const localStorage = new LocalStorage();