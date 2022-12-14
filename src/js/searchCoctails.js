// // import * as searchCoctails from './js/searchCoctails';
// // -----   ПОДКЛЮЧИ ИМПОРТ В ИНДЕКС ШОБ ПОСМОТРЕТЬ ПРЕВЬЮ

// import { refs } from './refs';
// import axios from 'axios';

// // ------из класса апи
// const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

// async function getCocktailsBySymbol(symbol) {
//   const response = await axios.get(`${BASE_URL}search.php?f=${symbol}`);
//   return response.data;
// }
// async function searchCocktailByName(cocktailName) {
//   const response = await axios.get(`${BASE_URL}search.php?s=${cocktailName}`);
//   return response.data;
// }
// // ------из класса апи^^^^^

// // ----консты и ивенты
// const searchSet = document.querySelector('.search-set__list');
// const searchInput = document.querySelector('.search__input');
// const headerSearch = document.querySelector('.header__search');
// const searchSetCaption = document.querySelector('.search-set__caption');

// refs.searchList.addEventListener('click', searchByABC);
// searchInput.addEventListener('blur', searchDatalistByABC);
// headerSearch.addEventListener('submit', searchByHeader);
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

// // ----поиск через хедер
// function searchByHeader(e) {
//   const cocktailName = e.currentTarget.elements.query.value;
//   e.preventDefault();
//   console.log(e.currentTarget.elements.query.value);
//   searchSet.innerHTML = '';

//   searchCocktailByName(cocktailName)
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
