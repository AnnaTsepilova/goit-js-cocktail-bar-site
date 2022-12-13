
(() => {
    const mobileMenu = document.querySelector('.js-menu-container');
    const openMenuBtn = document.querySelector('.js-open-menu');
    const closeMenuBtn = document.querySelector('.js-close-menu');
  
    const toggleMenu = () => {
      const isMenuOpen =
        openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
      openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
      mobileMenu.classList.toggle('is-open');
  
      const scrollLockMethod = !isMenuOpen
        ? 'disableBodyScroll'
        : 'enableBodyScroll';
      bodyScrollLock[scrollLockMethod](document.body);
    };
  
    openMenuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
  
    // Close the mobile menu on wider screens if the device orientation changes
    window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
      if (!e.matches) return;
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      bodyScrollLock.enableBodyScroll(document.body);
    });
  })();




// import { onFavoriteCocktails } from './favorite-cocktails';
// import { onFavoriteIngredients } from './favorite-ingredients';

// const favoriteCocktails = document.querySelector('[data-favorite_cocktails]');
// const favoriteIngredients = document.querySelector(
//   '[data-favorite_ingredients]'
// );

// favorite-cocktails.html
// favorite-ingredients.html


// HTML header ****************************************************



// <!-- <button href="#" class="mob-nav__link favorite-acctive" >
// Favorite
// </button>

// <div class="favorite-wrapper favorite-wrapper__close">
// <button class="favorite-link" data-favorite_cocktails>
// <a href="./favorite-cocktails.html"
// target="_self"></a> 
// Favorite cocktails</button>
// <button class="favorite-link" data-favorite_ingredients>

// <a href="./favorite-ingredients.html" 
// target="_self"></a> 
// Favorite ingredients
// </button>
// </div> -->


// <!-- <div class="fav-btn__header">
// <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//   Favorite
// </button>
// <div class="dropdown-menu">
//   <a class="dropdown-item" href="./favorite-cocktails.html" target="_self">Favorite cocktails</a>
//   <a class="dropdown-item" href="./favorite-ingredients.html" target="_self">Favorite ingredients</a>
// </div>
// </div> -->