const refs = {
  
  closeModalIngredBtn: document.querySelector("[data-modalIngred-close]"),
  modalIngred: document.querySelector("[data-modalIngred]"),
  openModalIngredLinkT: document.querySelector("[data-modalIngredLinkT-open]"),
  openModalIngredLinkM: document.querySelector("[data-modalIngredLinkM-open]"),
};

refs.closeModalIngredBtn.addEventListener("click", toggleModalIngred);
// refs.openModalIngredLinkT.addEventListener("click", toggleModalIngred);
// refs.openModalIngredLinkM.addEventListener("click", toggleModalIngred);

function toggleModalIngred() {
  refs.modalIngred.classList.toggle("i-backdrop--is-hidden");
};

refs.modalIngred.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalIngred();
  }
}

export function onCocktailModalOpen() {
  const ingredientLinks = document.querySelectorAll("[data-modalIngred-open]");

  ingredientLinks.forEach(elm => elm.addEventListener("click", toggleModalIngred));

  console.log('test');

};

export const createIngrDetails = (ingr, inFavorites) => {

  let addBtnText = 'Add to favorite';
  let removeBtnText = 'Remove from favorite';

  let btnStatusFav = addBtnText;
  if (inFavorites) {
    btnStatusFav = removeBtnText;
  } else {
    btnStatusFav = addBtnText;
  }

  return `
    <h2 class="modal-ingredients__title">${ingr.strIngredient}</h2>
    <h3 class="modal-ingredients__headline">${ingr.strType}</h3>
    <span class="modal-ingredients__line"></span>
    <p class="modal-ingredients__text">${ingr.strDescription}</p>
    <ul class="modal-ingredients__list">
      <li class="modal-ingredients__item">Type: ${ingr.strType}</li>
      <li class="modal-ingredients__item">Alcoholic: ${ingr.strAlcohol}%</li>
    </ul>
    <button type="button" class="modal-ingredients__btn btn-favorite">${btnStatusFav}</button>
      `;
}