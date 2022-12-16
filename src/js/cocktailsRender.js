import { refs } from './refs';
import { CocktailsApi } from './cocktailsApi';
import sprite from '../images/sprite.svg';
import { onLearnMoreBtn } from './modalCocktails';
import { ApiFavorite } from './favoritesApi';
import { Pagination } from './pagination';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

export class CocktailsRender {
  #cocktailsApi;
  #favoriteApi;

  constructor() {
    this.#cocktailsApi = new CocktailsApi();
    this.#favoriteApi = new ApiFavorite();
  }
  // --------генератор алфавита------------
  generateAlphabet() {
    const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
    const numbers = [...Array(9)].map((_, i) => String.fromCharCode(i + 49));
    const num0 = numbers.push(String.fromCharCode(48));
    return [...alphabet, ...numbers];
  }

  // ---------разметка алфавита---------
  renderAlphabet() {
    return this.generateAlphabet()
      .map(
        letter => `<li class="search__item">
    <button class="letter__btn" type="button">${letter}</button></li>
    `
      )
      .join('');
  }

  //-----------генерация опций в списке алфавита моб-------------------------
  renderOptionDataList() {
    return this.generateAlphabet().forEach(letter => {
      let option = document.createElement('option');
      option.value = letter;
      option.classList = 'cocktails__option';
      option.textContent = letter;
      refs.searchDatalist.appendChild(option);
    });
  }

  // -----------показываем и прячем выпадающий список поиска по алфавиту в мобильном версии------------------
  addDatalistListeners() {
    const thisObj = this;
    refs.searchMobileInput.onfocus = function () {
      refs.searchDatalist.style.display = 'block';
    };
    for (let option of refs.searchDatalist.options) {
      option.onclick = function () {
        refs.searchMobileInput.value = option.value;
        refs.searchDatalist.style.display = 'none';
        thisObj.searchDatalistByABC();
      };
    }

    refs.searchMobileInput.oninput = function () {
      const text = refs.searchMobileInput.value.toUpperCase();
      for (let option of refs.searchDatalist.options) {
        if (option.value.toUpperCase().indexOf(text) > -1) {
          option.style.display = 'block';
        } else {
          option.style.display = 'none';
        }
      }
    };
  }

  // ------------рендерим коклейли по выпадающему списку в мобильной версии------------------
  searchDatalistByABC() {
    const thisObj = this;
    const letter = refs.searchMobileInput.value;
    refs.searchSet.innerHTML = '';
    refs.spinnerRef.classList.remove('visually-hidden-spinner');
    this.#cocktailsApi
      .getCocktailsBySymbol(letter)
      .then(response => {
        thisObj.renderResults(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // ----------------рендерим карточки коклейлей----------
  createCocktailCard(drinks) {
    return drinks
      .map(({ strDrinkThumb, strDrink, idDrink }) => {
        let isFavorite = this.#favoriteApi.isCoctailInFavorites(idDrink);

        return (
          `<li class="coctail__card">
            <img class="coctail__pic" src="${strDrinkThumb}" alt="${strDrink}" />
            <p class="coctail__desc">${strDrink}</p>
            <div class="box__btn">
              <button class="btn-learn_more" type="button" data-learnMore-open data-cocktail-id="${idDrink}">Learn more</button>
              <button class="btn-add_and_remove" type="button" data-cocktail-id="${idDrink}">` +
          this.createFavoriteBtn(isFavorite) +
          `</button>
            </div>
          </li>`
        );
      })
      .join('');
  }

  createFavoriteBtn(isFavorite) {
    return isFavorite
      ? `Remove
      <svg class="icon-heart__svg solid" width="22" height="19">
        <use href="${sprite}#icon-heart"/>
      </svg>`
      : `Add to
      <svg class="icon-heart__svg" width="22" height="19">
        <use href="${sprite}#icon-heart"/>
      </svg>`;
  }
  // ----------------рендерим карточки коктейлей по ABC----------
  searchByABC(e) {
    e.preventDefault();
    const thisObj = this;
    const letter = e.target.innerText;

    refs.searchSet.innerHTML = '';
    refs.pageContainer.innerHTML = '';
    refs.spinnerRef.classList.remove('visually-hidden-spinner');
    this.#cocktailsApi
      .getCocktailsBySymbol(letter)
      .then(response => {
        thisObj.renderResults(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // ----------------рендерим карточки коктейлей из хедера----------
  searchByHeader(e) {
    e.preventDefault();
    const thisObj = this;
    const cocktailName = e.currentTarget.elements.query.value;

    refs.searchSet.innerHTML = '';
    refs.pageContainer.innerHTML = '';
    refs.spinnerRef.classList.remove('visually-hidden-spinner');
    this.#cocktailsApi
      .searchCocktailByName(cocktailName)
      .then(response => {
        thisObj.renderResults(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderResults(response) {
    refs.spinnerRef.classList.add('visually-hidden-spinner');
    this.makePagination(response.drinks);
    if (response.drinks === null) {
      // ----заинсталить красивую нотификашку
      refs.searchSetCaption.textContent = '';
      refs.notifBox.classList.remove('is-hidden');
      
      return;
      // ----заинсталить красивую нотификашку ^^^^^
    }
    refs.notifBox.classList.add('is-hidden');
    refs.searchSetCaption.textContent = 'Searching results';
  }

  // ---------------пагинация-----------------------
  makePagination(drinksArray) {
    const pagCock = new Pagination({
      items: drinksArray,
      paginationRoot: refs.pageContainer,
      range: this.getPageLimit(),
      callback: array => {
        refs.searchSet.innerHTML = this.createCocktailCard(array);
        this.onRenderComplete();
      },
    });
  }

  getPageLimit() {
    // Mobile
    if (window.screen.width < 768) {
      return 3;
    }
    // Tablet
    if ((window.screen.width >= 768) & (window.screen.width < 1280)) {
      return 6;
    }
    return 9;
  }

  // ----------------рендерим рандомные 9 коктейлей----------
  renderRandomCocktails() {
    const thisObj = this;

    const makePromise = () => {
      return new Promise(resolve => {
        thisObj.#cocktailsApi.getRandomCocktail().then(response => resolve(response));
      });
    };

    let promises = [];
    for (let i = 0; i < this.getPageLimit(); i += 1) {
      promises.push(makePromise());
    }

    Promise.all(promises)
      .then(function (response) {
        let cocktailArray = [];
        response.map(elm => cocktailArray.push(elm.drinks[0]));
        refs.searchSet.innerHTML = thisObj.createCocktailCard(cocktailArray);
        refs.spinnerRef.classList.add('visually-hidden-spinner');
        thisObj.onRenderComplete();
      })
      .catch(error => console.log(error));
  }

  // -------------подключаем кнопку learn more к отрендеренным карточкам коктейлей---------------
  onRenderComplete() {
    const learnMoreBtn = document.querySelectorAll('[data-learnMore-open]');
    const favoritesBtn = document.querySelectorAll('.btn-add_and_remove');

    for (let btn of learnMoreBtn) {
      btn.addEventListener('click', e => onLearnMoreBtn(e));
    }

    for (let btn of favoritesBtn) {
      btn.addEventListener('click', e => this.onFavoritesBtn(e));
    }
  }

  onFavoritesBtn(e) {
    e.preventDefault();
    const cocktailId = e.currentTarget.dataset.cocktailId;
    let isFavorite = this.#favoriteApi.isCoctailInFavorites(cocktailId);

    if (isFavorite) {
      this.#favoriteApi.removeCocktailById(cocktailId);
    } else {
      this.#favoriteApi.addCocktailById(cocktailId);
    }

    e.currentTarget.innerHTML = this.createFavoriteBtn(!isFavorite);
  }

  toggleModal() {
    refs.modalCocktailWindow.classList.toggle('c-backdrop--is-hidden');
  }
}
