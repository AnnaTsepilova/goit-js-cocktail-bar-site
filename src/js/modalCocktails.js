const refs = {
  openModalCoctailsBtn: document.querySelector("[data-modalCoctails-open]"),
  closeModalCoctailsBtn: document.querySelector("[data-modalCoctails-close]"),
  closeModalCoctailsBtnTablet: document.querySelector("[data-modalCoctailsTablet-close]"),
  modalCoctails: document.querySelector("[data-modalCoctails]"),
};

refs.openModalCoctailsBtn.addEventListener("click", toggleModal);
refs.closeModalCoctailsBtn.addEventListener("click", toggleModal);
refs.closeModalCoctailsBtnTablet.addEventListener("click", toggleModal);

function toggleModal() {
  refs.modalCoctails.classList.toggle("с-backdrop--is-hidden");
};

refs.modalCoctails.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    toggleModal();
  }
}
