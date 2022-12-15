import { refs } from './js/refs';
import { ApiFavorite } from './js/favoritesApi';
import * as themeSwitch from './js/themeSwitch';
import { CocktailsRender } from './js/cocktailsRender';
import * as mobileMenu from './js/mobileMenu';
import * as modalIngredients from './js/modalIngredients';

const favorite = new ApiFavorite();
const cocktailUI = new CocktailsRender();

// ------------ПРИМЕР---------------------
// cocktailsApi.getIngredientByName('v').then(function (response) {
//   let i = 0;
//   for (cocktail of response.strIngredient) {
//     //console.log(cocktail);
//     favorite.saveIngridients(cocktail);
//     i++;
//     if (i >= 4) break;
//   }
// });

const arrIngr = [
  {
    idIngredient: '1',
    strABV: '40',
    strAlcohol: 'Yes',
    strDescription:
      'Vodka is a distilled beverage composed primarily of water and ethanol, sometimes with traces of impurities and flavorings. Traditionally, vodka is made by the distillation of fermented cereal grains or potatoes, though some modern brands use other substances, such as fruits or sugar.\r\n\r\nSince the 1890s, the standard Polish, Russian, Belarusian, Ukrainian, Estonian, Latvian, Lithuanian and Czech vodkas are 40% alcohol by volume ABV (80 US proof), a percentage that is widely misattributed to Dmitri Mendeleev. The European Union has established a minimum of 37.5% ABV for any "European vodka" to be named as such. Products sold as "vodka" in the United States must have a minimum alcohol content of 40%. Even with these loose restrictions, most vodka sold contains 40% ABV. For homemade vodkas and distilled beverages referred to as "moonshine", see moonshine by country.\r\n\r\nVodka is traditionally drunk neat (not mixed with any water, ice, or other mixer), though it is often served chilled in the vodka belt countries (Belarus, Estonia, Finland, Iceland, Latvia, Lithuania, Norway, Poland, Russia, Sweden, Ukraine). It is also commonly used in cocktails and mixed drinks, such as the vodka martini, Cosmopolitan, vodka tonic, Screwdriver, Greyhound, Black or White Russian, Moscow Mule, and Bloody Mary.\r\n\r\nScholars debate the beginnings of vodka. It is a contentious issue because very little historical material is available. For many centuries, beverages differed significantly compared to the vodka of today, as the spirit at that time had a different flavor, color and smell, and was originally used as medicine. It contained little alcohol, an estimated maximum of about 14%, as only this amount can be attained by natural fermentation. The still, allowing for distillation ("burning of wine"), increased purity, and increased alcohol content, was invented in the 8th century.\r\n\r\nA common property of the vodkas produced in the United States and Europe is the extensive use of filtration prior to any additional processing including the addition of flavorants. Filtering is sometimes done in the still during distillation, as well as afterwards, where the distilled vodka is filtered through activated charcoal and other media to absorb trace amounts of substances that alter or impart off-flavors to the vodka. However, this is not the case in the traditional vodka-producing nations, so many distillers from these countries prefer to use very accurate distillation but minimal filtering, thus preserving the unique flavors and characteristics of their products.\r\n\r\nThe master distiller is in charge of distilling the vodka and directing its filtration, which includes the removal of the "fore-shots", "heads" and "tails". These components of the distillate contain flavor compounds such as ethyl acetate and ethyl lactate (heads) as well as the fusel oils (tails) that impact the usually desired clean taste of vodka. Through numerous rounds of distillation, or the use of a fractioning still, the taste is modified and clarity is increased. In contrast, distillery process for liquors such as whiskey, rum, and baijiu allow portions of the "heads" and "tails" to remain, giving them their unique flavors.\r\n\r\nRepeated distillation of vodka will make its ethanol level much higher than is acceptable to most end users, whether legislation determines strength limits or not. Depending on the distillation method and the technique of the stillmaster, the final filtered and distilled vodka may have as much as 95–96% ethanol. As such, most vodka is diluted with water prior to bottling.\r\n\r\nPolish distilleries make a very pure (96%, 192 proof, formerly also 98%) rectified spirit (Polish language: spirytus rektyfikowany). Technically a form of vodka, it is sold in liquor stores rather than pharmacies. Similarly, the German market often carries German, Hungarian, Polish, and Ukrainian-made varieties of vodka of 90 to 95% ABV. A Bulgarian vodka, Balkan 176°, has an 88% alcohol content. Everclear, an American brand, is also sold at 95% ABV.',
    strIngredient: 'Vodka',
    strType: 'Vodka',
  },
  {
    idIngredient: '363',
    strABV: '38',
    strAlcohol: 'Yes',
    strDescription:
      'Ouzo (Greek: ούζο, IPA: [ˈuzo]) is an anise-flavoured aperitif that is widely consumed in Greece and Cyprus. Its taste is similar to other anise liquors like pastis, sambuca, arak, rakı, and mastika, that are traditionally produced and consumed in Mediterranean countries.\r\n\r\nOuzo has its roots in tsipouro, which is said to have been the work of a group of 14th-century monks on Mount Athos. One version of it was flavoured with anise. This version eventually came to be called ouzo.\r\n\r\nModern ouzo distillation largely took off in the beginning of the 19th century following Greek independence. The first ouzo distillery was founded in Tyrnavos in 1856 by Nikolaos Katsaros, giving birth to the famous ouzo Tyrnavou. When absinthe fell into disfavour in the early 20th century, ouzo was one of the products whose popularity rose to fill the gap; it was once called "a substitute for absinthe without the wormwood".[2] In 1932, ouzo producers developed a method of distillation using copper stills that is now the standard method of production. One of the largest producers of ouzo today is Varvayiannis (Βαρβαγιάννης),[citation needed] located in the town of Plomari in the southeast portion of the island of Lesbos, while in the same town Pitsiladi (Πιτσιλαδή), a variety of high-quality ouzo, is also distilled.\r\n\r\nOuzo is traditionally mixed with water, becoming cloudy white, sometimes with a faint blue tinge, and served with ice cubes in a small glass. Ouzo can also be drunk straight from a shot glass.\r\n\r\nOuzo is traditionally served with a small plate of a variety of appetizers called mezes, usually small fresh fish, fries, olives and feta cheese. Ouzo can be described to have a similar taste to absinthe which is liquorice-like, but smoother.\r\n\r\nOn October 25, 2006, Greece won the right to label ouzo as an exclusively Greek product. The European Union now recognizes ouzo, as well as the Greek drinks tsipouro and tsikoudia, as products with a Protected Designation of Origin, which prohibits European makers other than Greece and Cyprus from using the name.\r\n\r\nThere is an ouzo museum in Plomari, Lesvos.',
    strIngredient: 'Ouzo',
    strType: 'Aperitif',
  },
  {
    idIngredient: '286',
    strABV: null,
    strAlcohol: 'No',
    strDescription: null,
    strIngredient: 'Kiwi',
    strType: null,
  },
];

// ===============================================
localStorage.setItem(ApiFavorite.favoriteIngridientsKey, JSON.stringify(arrIngr));

renderFavoriteIngridients();

refs.searchFavorite.addEventListener('submit', function (event) {
  favorite.searchByIngredientsName(event);
});

refs.modalIngridients.addEventListener('click', function (event) {
  renderFavoriteIngridients();
});

function onRemoveBtn(e) {
  favorite.removeIngredientByName(e.id);
  e.remove();
}

function renderFavoriteIngridients() {
  let ingredients = favorite.getAllIngredients();
  refs.ingridientsList.innerHTML = favorite.renderAllIngredient(ingredients);
}

const ingredientsList = document.querySelectorAll('.list-ingredients__item');
cocktailUI.onRenderComplete();

for (let ingredient of ingredientsList) {
  console.log('remove');
  const btn = ingredient.querySelector('.btn-add_and_remove');
  btn.addEventListener('click', e => {
    e.preventDefault();
    onRemoveBtn(ingredient);
  });
}

// const removeBtn = document.querySelectorAll('.btn-add_and_remove');
// cocktailUI.onRenderComplete();
// // ------ listener на кнопку remove----------
// for (let btn of removeBtn) {
//   console.log('remove');
//   btn.addEventListener('click', onRemoveBtn);
// }
