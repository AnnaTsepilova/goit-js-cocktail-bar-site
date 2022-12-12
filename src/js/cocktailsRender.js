import { refs } from './refs';
import { CocktailsApi } from './cocktailsApi';

export class CocktailsRender {
  constructor() {}
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

  //--------генерация опций в списке алфавита моб-------------------------
  renderOptionDataList() {
    return this.generateAlphabet().forEach(letter => {
      let option = document.createElement('option');
      option.value = letter;
      option.classList = 'cocktails__option';
      option.textContent = letter;
      refs.searchDatalist.appendChild(option);
    });
  }

  // ---------показываем и прячем выпадающий список поиска по алфавиту в мобильном меню------------------
  addDatalistListeners() {
    refs.searchMobileInput.onfocus = function () {
      refs.searchDatalist.style.display = 'block';
    };
    for (let option of refs.searchDatalist.options) {
      option.onclick = function () {
        refs.searchMobileInput.value = option.value;
        refs.searchDatalist.style.display = 'none';
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

  // ----------------рендерим карточки коклейлей----------
  createCocktailCard(drinks) {
    return drinks
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
  }

  // ----------------рендерим рандомные 9 коктейлей----------
  renderRandomCocktails() {
    const cocktailsApi = new CocktailsApi();
    const thisObj = this;
    
    const makePromise = () => {
      return new Promise(resolve => {
        cocktailsApi.getRandomCocktail()
        .then(response => resolve(response))
      });
    };

    let promises = [];
    for (let i = 0; i < 9; i+=1) {
      promises.push(makePromise());
    }

    Promise.all(promises)
      .then(function (response) {
        let cocktailArray = [];
        response.map(elm => cocktailArray.push(elm.drinks[0]));
        refs.searchSet.innerHTML = thisObj.createCocktailCard(cocktailArray);
      }) 
      .catch(error => console.log(error));
  }
}
