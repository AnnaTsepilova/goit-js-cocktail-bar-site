!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var i=new Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=r);var n=r("4Nugj"),i=r("gJIrg"),l=r("lRuYh");r("bhhwi"),r("bjNOr");const a=new(0,i.CocktailsApi),c=new(0,l.ApiFavorite);a.getCocktailsBySymbol("b").then((function(e){let t=0;for(cocktail of e.drinks)if(c.addCocktail(cocktail),t++,t>=4)break})),c.removeCocktailById(11e3),n.refs.cocktailsList.innerHTML=c.renderAllCocktails();const d=document.querySelectorAll(".btn-add_and_remove");console.log(d);for(let e of d)e.addEventListener("click",f);function f(e){e.preventDefault(),c.removeCocktailById(e.target.dataset.cocktailId);document.querySelector("#c_"+e.target.dataset.cocktailId).remove()}}();
//# sourceMappingURL=favorite-cocktails.04714582.js.map
