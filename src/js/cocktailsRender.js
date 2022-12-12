import { refs } from './refs';

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

  //--------генерация опций в списке алфавита моб
  renderOptionDataList() {
    return this.generateAlphabet().forEach(letter => {
      let option = document.createElement('option');
      option.value = letter;
      option.classList = "cocktails__option";
      option.textContent = letter;
      refs.searchDatalist.appendChild(option);
    });
  }

  // -------------test------------------

  addDatalistListeners() {
    input.onfocus = function () {
    cocktailsAbc.style.display = 'block';
    input.style.borderRadius = '4px';
    };
  for (let option of cocktailsAbc.options) {
    option.onclick = function () {
      input.value = option.value;
      cocktailsAbc.style.display = 'none';
      input.style.borderRadius = '4px';
    };
  }

  input.oninput = function () {
    currentFocus = -1;
    var text = input.value.toUpperCase();
    for (let option of cocktailsAbc.options) {
      if (option.value.toUpperCase().indexOf(text) > -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    }
  };
  }
}


// ---------------TEST-----------------

export function dataList() {
  const input = document.querySelector('.hero__input');
  const cocktailsAbc = document.querySelector('#cocktails__abc');

  input.onfocus = function () {
    cocktailsAbc.style.display = 'block';
    input.style.borderRadius = '4px';
  };
  for (let option of cocktailsAbc.options) {
    option.onclick = function () {
      input.value = option.value;
      cocktailsAbc.style.display = 'none';
      input.style.borderRadius = '4px';
    };
  }

  input.oninput = function () {
    currentFocus = -1;
    var text = input.value.toUpperCase();
    for (let option of cocktailsAbc.options) {
      if (option.value.toUpperCase().indexOf(text) > -1) {
        option.style.display = 'block';
      } else {
        option.style.display = 'none';
      }
    }
  };
}


