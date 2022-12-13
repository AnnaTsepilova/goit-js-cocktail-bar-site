// import * as searchCoctails from './js/searchCoctails';
// -----   ПОДКЛЮЧИ ИМПОРТ В ИНДЕКС ШОБ ПОСМОТРЕТЬ ПРЕВЬЮ

import { refs } from './refs';
import axios from 'axios';

// ------из класса апи
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function getCocktailsBySymbol(symbol) {
  const response = await axios.get(`${BASE_URL}search.php?f=${symbol}`);
  return response.data;
}
async function searchCocktailByName(cocktailName) {
  const response = await axios.get(`${BASE_URL}search.php?s=${cocktailName}`);
  return response.data;
}
// ------из класса апи^^^^^

// ----консты и ивенты
const searchSet = document.querySelector('.search-set__list');
const searchInput = document.querySelector('.search__input');
const headerSearch = document.querySelector('.header__search');
const searchSetCaption = document.querySelector('.search-set__caption');

// refs.searchList.addEventListener('click', searchByABC);
// searchInput.addEventListener('blur', searchDatalistByABC);
headerSearch.addEventListener('submit', searchByHeader);
// ----консты и ивенты^^^^^

// ------поиск по АВС
// function searchByABC(e) {
//   const letter = e.target.innerText;
//   console.dir(e.target.innerText);
//   searchSet.innerHTML = '';

//   getCocktailsBySymbol(letter)
//     .then(response => {
//       console.log(response);
//       if (response.drinks === null) {
//         // ----заинсталить красивую нотификашку

//         window.alert('На жаль такий коктейль відсутній');
//         return;
//         // ----заинсталить красивую нотификашку ^^^^^
//       }

//       searchSetCaption.textContent = 'Searching results';
//       createCoctailCard(response.drinks);
//     })

//     .catch(error => {
//       console.log(error);
//     });
// }

// ------поиск мобилка АВС
// function searchDatalistByABC(e) {
//   const letter = refs.searchMobileInput.value;
//   console.log(refs.searchMobileInput.value);
//   console.log(e.target.value);
//   searchSet.innerHTML = '';

//   getCocktailsBySymbol(letter)
//     .then(response => {
//       console.log(response);
//       if (response.drinks === null) {
//         // ----заинсталить красивую нотификашку

//         window.alert('На жаль такий коктейль відсутній');
//         return;
//         // ----заинсталить красивую нотификашку ^^^^^
//       }

//       searchSetCaption.textContent = 'Searching results';
//       createCoctailCard(response.drinks);
//     })

//     .catch(error => {
//       console.log(error);
//     });
// }

// ----поиск через хедер
function searchByHeader(e) {
  const cocktailName = e.currentTarget.elements.query.value;
  e.preventDefault();
  console.log(e.currentTarget.elements.query.value);
  searchSet.innerHTML = '';

  searchCocktailByName(cocktailName)
    .then(response => {
      console.log(response);
      if (response.drinks === null) {
        // ----заинсталить красивую нотификашку

        window.alert('На жаль такий коктейль відсутній');
        return;
        // ----заинсталить красивую нотификашку ^^^^^
      }

      searchSetCaption.textContent = 'Searching results';
      createCoctailCard(response.drinks);
    })

    .catch(error => {
      console.log(error);
    });
}

// ------создание карточек
function createCoctailCard(drinks) {
  console.log(`Rendering...`);
  const markup = drinks
    .map(({ strDrinkThumb, strDrink }) => {
      return `<li class="coctail__card">
          <img class="coctail__pic" src="${strDrinkThumb}" alt="${strDrink}" />
          <p class="coctail__desc">${strDrink}</p>
          <div class="box__btn">
            <button class="btn-learn_more" type="button">Learn more</button>
            <button class="btn-add_and_remove" type="button">
              Add to
              <svg class="icon-heart__svg" width="22" height="19">
                <use href="./images/sprite.svg#icon-heart"></use>
              </svg>
            </button>
          </div>
        </li>`;
    })
    .join('');
  searchSet.insertAdjacentHTML('beforeend', markup);

}

// ------ПАГИНАЦИЯ-------------------------------------------------
const pagination = document.querySelector('.pagination__list');

export class Pagination {
  constructor() {
    this.totalPages = 1;
    this.page = 1;
    this.filmsOnPage = 1;
    this.fetch = null;
    this.lastQuery = '';
  }
  createMarkup() {
    const totalPages = this.totalPages;
    const page = this.page;
    let markup = '';

    const firstPage = `<li class="num">1</li>`;
    const lastPage = `<li class="num">${totalPages}</li>`;
    const dots = `<li class="dots">...</li>`;
    const btnPrev = `<li class="btn__prev"></li>`;
    const btnNext = `<li class="btn__next"></li>`;

    let beforePages = page - 2;
    let afterPages = page + 2;

    if (totalPages === 1) {
      return '';
    }
    if (page > 1) {
      markup += btnPrev;
    }

    if (window.screen.width < 767) {
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
      if (page < 3 && totalPages > 5) {
        for (let i = 1; i <= 5; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
      if (page > 2 && page < totalPages - 1) {
        for (let i = beforePages; i <= afterPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
      if (page > totalPages - 3 && totalPages > 5) {
        for (let i = totalPages - 5; i <= totalPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
    } else {
      if (totalPages < 10) {
        for (let i = 1; i <= totalPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
      if (totalPages >= 10 && page < 6) {
        for (let i = 1; i < 8; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
      if (page === totalPages && totalPages > 9) {
        markup += firstPage + dots;
        for (let i = totalPages - 6; i <= totalPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }
      if (page > totalPages - 5 && page < totalPages && totalPages > 9) {
        markup += firstPage + dots;
        for (let i = totalPages - 6; i < totalPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }

      if (page >= 6 && page <= totalPages - 5) {
        markup += firstPage + dots;
        for (let i = beforePages; i <= afterPages; i++) {
          markup += `<li class="num${i === page ? ' active' : ''}">${i}</li>`;
        }
      }

      if (page < totalPages && totalPages > 9) {
        if (page < totalPages - 4) {
          markup += dots;
        }
        markup += lastPage;
      }
    }

    if (page < totalPages) {
      markup += btnNext;
    }
    return markup;
  }

  renderMarkup() {
    pagination.innerHTML = this.createMarkup();
    console.log(pagination);
  }
  removeMarkup() {
    pagination.innerHTML = '';
  }
  incrementPage() {
    this.page += 1;
  }
  decrementPage() {
    this.page -= 1;
  }
  resetPage() {
    this.page = 1;
  }

  calculateTotalPages(items) {
    this.totalPages = Math.ceil(items / this.filmsOnPage);
  }
  calculateFilmsOnPage() {
    if (window.screen.width < 768) {
      this.filmsOnPage = 4;
    }
    if (window.screen.width >= 768 && window.screen.width < 1280) {
      this.filmsOnPage = 8;
    }
    if (window.screen.width >= 1280) {
      this.filmsOnPage = 9;
    }
  }
}
