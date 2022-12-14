import { refs } from './refs';
import { CocktailsApi } from './cocktailsApi';
import sprite from '../images/sprite.svg';
import { createCocktailDetails, createCocktailDetailsMobile } from './modalCocktails';

export class CocktailsRender {
  cocktailsApi;

  constructor() {
    this.cocktailsApi = new CocktailsApi();
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

  // ---------показываем и прячем выпадающий список поиска по алфавиту в мобильном версии------------------
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
    
    this.cocktailsApi.getCocktailsBySymbol(letter)
      .then(response => {
        if (response.drinks === null) {
          // ----заинсталить красивую нотификашку

          window.alert('На жаль такий коктейль відсутній');
          return;
          // ----заинсталить красивую нотификашку ^^^^^
        }
        refs.searchSetCaption.textContent = 'Searching results';
        refs.searchSet.innerHTML = thisObj.createCocktailCard(response.drinks);
        thisObj.onRenderComplete();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // ----------------рендерим карточки коклейлей----------
  createCocktailCard(drinks) {
    return drinks
      .map(({ strDrinkThumb, strDrink, idDrink }) => {
        return `<li class="coctail__card">
            <img class="coctail__pic" src="${strDrinkThumb}" alt="${strDrink}" />
            <p class="coctail__desc">${strDrink}</p>
            <div class="box__btn">
              <button class="btn-learn_more" type="button" data-cocktail-id="${idDrink}">Learn more</button>
              <button class="btn-add_and_remove" type="button" data-cocktail-id="${idDrink}">
                Add to
                <svg class="icon-heart__svg" width="22" height="19">
                  <use href="${sprite}#icon-heart"/>
                </svg>
              </button>
            </div>
          </li>`;
      })
      .join('');
  }

  // ----------------рендерим карточки коктейлей по ABC----------
  searchByABC(e) {
    e.preventDefault();

    const letter = e.target.innerText;
    console.dir(e.target.innerText);
    refs.searchSet.innerHTML = '';
    const thisObj = this;

    this.cocktailsApi.getCocktailsBySymbol(letter)
      .then(response => {
        console.log(response);
        if (response.drinks === null) {
          // ----заинсталить красивую нотификашку

          window.alert('На жаль такий коктейль відсутній');
          return;
          // ----заинсталить красивую нотификашку ^^^^^
        }
        refs.searchSetCaption.textContent = 'Searching results';
        refs.searchSet.innerHTML = thisObj.createCocktailCard(response.drinks);
        thisObj.onRenderComplete();
      })

      .catch(error => {
        console.log(error);
      });
  }

  // ----------------рендерим карточки коктейлей из хедера----------
  searchByHeader(e) {
    e.preventDefault();

    const cocktailName = e.currentTarget.elements.query.value;
    console.log(cocktailName);
    const thisObj = this;

    console.log(e.currentTarget.elements.query.value);
    refs.searchSet.innerHTML = '';

    this.cocktailsApi.searchCocktailByName(cocktailName)
      .then(response => {
        console.log(response);
        if (response.drinks === null) {
          // ----заинсталить красивую нотификашку

          window.alert('На жаль такий коктейль відсутній');
          return;
          // ----заинсталить красивую нотификашку ^^^^^
        }

        refs.searchSetCaption.textContent = 'Searching results';
        refs.searchSet.innerHTML = thisObj.createCocktailCard(response.drinks);
        thisObj.onRenderComplete();
      })

      .catch(error => {
        console.log(error);
      });
  }
  
  // ----------------рендерим рандомные 9 коктейлей----------
  renderRandomCocktails() {
    const thisObj = this;
    
    const makePromise = () => {
      return new Promise(resolve => {
        thisObj.cocktailsApi.getRandomCocktail()
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
        thisObj.onRenderComplete();
      }) 
      .catch(error => console.log(error));
  }

  // -------------подключаем кнопку learn more к отрендеренным карточкам коктейлей---------------
  onRenderComplete() {
    const learnMoreBtn = document.querySelectorAll('.btn-learn_more');

    for (let btn of learnMoreBtn) {
      btn.addEventListener('click', this.onLearnMoreBtn)
    }
  }

  onLearnMoreBtn(e) {
    e.preventDefault();
    const thisObj = this;
    refs.modalCocktailWindow.classList.toggle("с-backdrop--is-hidden");
    const cocktailsApi = new CocktailsApi();
    cocktailsApi.getCocktailById(e.target.dataset.cocktailId)
      .then(response => {
        // console.log(response);
        // console.log(refs.modalDetailCocktailContainer);

        if (window.screen.width < 768){
          refs.modalDetailCocktailContainerMobile.innerHTML = createCocktailDetailsMobile(response.drinks[0]);
        } else {
          refs.modalDetailCocktailContainer.innerHTML = createCocktailDetails(response.drinks[0]);
        }

        this.onRenderCompleteModal();
        
      });
  }

  toggleModal() {
    refs.modalCocktailWindow.classList.toggle("с-backdrop--is-hidden");
  }


  onRenderCompleteModal() {
    const addToFavBtn = document.querySelector('.btn-favorite');
    console.log(addToFavBtn);
  
  // addToFavBtn.addEventListener('click', this.onLearnMoreBtn)
    
  }





}
