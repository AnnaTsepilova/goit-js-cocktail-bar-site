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
}
