import { refs } from './refs';
import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function getCocktailsBySymbol(symbol) {
  const response = await axios.get(`${BASE_URL}search.php?f=${symbol}`);
  return response.data;
}

const searchSet = document.querySelector('.search-set__list');
refs.searchList.addEventListener('click', searchByABC);

// ------поиск по АВС
function searchByABC(e) {
  // if (e.target.value !== 'BUTTON') return;
  const letter = e.target.innerText;
  console.dir(e.target.innerText);
  searchSet.innerHTML = '';

  getCocktailsBySymbol(letter)
    .then(response => {
      console.log(response);
      if (response.drinks === null) {
        window.alert('На жаль такий коктейль відсутній');
        return;
      }
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

// // ----погорелова шалит в отдельном файле Серч--------
// import * as searchCoctails from './js/searchCoctails';
