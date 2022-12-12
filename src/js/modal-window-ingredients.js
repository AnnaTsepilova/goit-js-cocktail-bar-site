(() => {
  const refs = {
    openModalBtn: document.querySelector("[i-data-modal-open]"),
    closeModalBtn: document.querySelector("[i-data-modal-close]"),
    modal: document.querySelector("[i-data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal1);
  refs.closeModalBtn.addEventListener("click", toggleModal1);

  function toggleModal1() {
    refs.modal.classList.toggle("backdrop1--is-hidden1");
  }
})();