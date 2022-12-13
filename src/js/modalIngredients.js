const refs = {
  openModalIngredBtn: document.querySelector("[data-modalIngred-open]"),
  closeModalIngredBtn: document.querySelector("[data-modalIngred-close]"),
  modalIngred: document.querySelector("[data-modalIngred]"),
  openModalIngredLinkT: document.querySelector("[data-modalIngredLinkT-open]"),
  openModalIngredLinkM: document.querySelector("[data-modalIngredLinkM-open]"),
};

refs.openModalIngredBtn.addEventListener("click", toggleModalIngred);
refs.closeModalIngredBtn.addEventListener("click", toggleModalIngred);
refs.openModalIngredLinkT.addEventListener("click", toggleModalIngred);
refs.openModalIngredLinkM.addEventListener("click", toggleModalIngred);

function toggleModalIngred() {
  refs.modalIngred.classList.toggle("i-backdrop--is-hidden");
};

refs.modalIngred.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModalIngred();
  }
}