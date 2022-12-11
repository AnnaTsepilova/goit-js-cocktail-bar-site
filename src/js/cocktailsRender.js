const SearchList = document.querySelector('.search__list');

// --------генератор алфавита------------
function generateAlphabet() {
  const alphabet = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
  const numbers = [...Array(9)].map((_, i) => String.fromCharCode(i + 49));
  const num0 = numbers.push(String.fromCharCode(48));
  return [...alphabet, ...numbers];
}

// ---------разметка алфавита---------
const letterMarkup = generateAlphabet()
  .map(
    letter => `<li class="search__item">
    <button class="letter__btn" type="button">${letter}</button></li>
`
  )
  .join('');

// ---------цепляем в хтмл----------
SearchList.insertAdjacentHTML('beforeend', letterMarkup);
