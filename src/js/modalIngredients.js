const refs = {
  openModalIngredBtn: document.querySelector("[data-modalIngred-open]"),
  closeModalIngredBtn: document.querySelector("[data-modalIngred-close]"),
  modalIngred: document.querySelector("[data-modalIngred]"),
};

refs.openModalIngredBtn.addEventListener("click", toggleModalIngred);
refs.closeModalIngredBtn.addEventListener("click", toggleModalIngred);

function toggleModalIngred() {
  refs.modalIngred.classList.toggle("ingredbackdrop--is-hidden");
};

refs.modalCoctails.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalIngred();
  }
}