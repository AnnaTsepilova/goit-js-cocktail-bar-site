!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},r={},t=e.parcelRequired7c6;null==t&&((t=function(e){if(e in n)return n[e].exports;if(e in r){var t=r[e];delete r[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var d=new Error("Cannot find module '"+e+"'");throw d.code="MODULE_NOT_FOUND",d}).register=function(e,n){r[e]=n},e.parcelRequired7c6=t);var o=t("4Nugj");t("gJIrg"),t("UL92Z"),t("lRuYh"),t("bhhwi");var d=t("bjNOr");t("lrVmX");const a={openModalIngredBtn:document.querySelector("[data-modalIngred-open]"),closeModalIngredBtn:document.querySelector("[data-modalIngred-close]"),modalIngred:document.querySelector("[data-modalIngred]"),openModalIngredLinkT:document.querySelector("[data-modalIngredLinkT-open]"),openModalIngredLinkM:document.querySelector("[data-modalIngredLinkM-open]")};function c(){a.modalIngred.classList.toggle("i-backdrop--is-hidden")}a.closeModalIngredBtn.addEventListener("click",c),a.modalIngred.addEventListener("click",(function(e){e.currentTarget===e.target&&c()})),(()=>{const e=document.querySelector(".js-menu-container"),n=document.querySelector(".js-open-menu");document.querySelector(".js-close-menu");window.matchMedia("(min-width: 768px)").addEventListener("change",(r=>{r.matches&&(e.classList.remove("is-open"),n.setAttribute("aria-expanded",!1),bodyScrollLock.enableBodyScroll(document.body))}))})(),t("4Nugj");t("dIxxU");document.querySelector(".search-set__list"),document.querySelector(".search__input"),document.querySelector(".header__search"),document.querySelector(".search-set__caption");const l=new(0,d.CocktailsRender);o.refs.searchList.innerHTML=l.renderAlphabet(),l.renderOptionDataList(),l.addDatalistListeners(),l.renderRandomCocktails(),o.refs.searchList.addEventListener("click",(function(e){l.searchByABC(e)})),o.refs.headerSearch.addEventListener("submit",(function(e){l.searchByHeader(e)}))}();
//# sourceMappingURL=index.a79821c3.js.map
