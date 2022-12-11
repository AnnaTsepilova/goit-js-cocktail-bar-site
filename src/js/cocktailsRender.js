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
}

// НОВОЕ (руками убрать бекспейсом букву А на сайте и выпадет список)

const searchDatalist = document.querySelector('#cocktails__list');
// ----не могу достучаться к ней из класса, надо пофиксить
function generateAlphabet() {
  const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
  const numbers = [...Array(9)].map((_, i) => String.fromCharCode(i + 49));
  const num0 = numbers.push(String.fromCharCode(48));
  return [...alphabet, ...numbers];
}
//--------генерация опций в списке алфавита моб
function renderOptionDataList() {
  return generateAlphabet().forEach(letter => {
    let option = document.createElement('option');
    option.value = letter;
    searchDatalist.appendChild(option);
  });
}
renderOptionDataList();
