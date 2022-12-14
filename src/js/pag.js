import { formToJSON } from 'axios';

import { refs } from './refs';

export class Pagination {
  constructor(options) {
    this.items = options.items;
    this.paginationRoot = options.paginationRoot;
    this.rootGallery = options.rootGallery;
    this.page = 1;
    this.range = options.range;
    this.pages = Math.ceil(options.items.length / options.range);

    this.nextStep();
  }
  returnItems() {
    console.log('items: ', [...this.items]);
    console.log('first: ', this.range * (this.page - 1));
    console.log('second: ', this.range * this.page);
    return [...this.items].splice(this.range * (this.page - 1), this.range);
  }
  makePagination() {
    const pagElements = [];
    if (this.pages > 6) {
      for (let i = 1; i <= 6; i += 1) {
        if (i < 3) {
          pagElements.push(`
            <div class="btnBox ${i === 0 ? 'active' : ''}" data-index="${i}">
              ${i}
            </div>`);
        } else {
          pagElements.push(`
            <div class="btnBox" data-index="${this.pages}">
              ${this.pages}
            </div>`);
        }
      }
    } else {
      for (let i = 1; i <= this.pages; i += 1) {
        console.log(i, '    ', this.page);
        pagElements.push(`
            <div class="btnBox ${i === this.page ? 'active' : ''}" data-index="${i}">
              ${i}
            </div>`);
      }
    }

    this.paginationRoot.innerHTML = '';
    this.paginationRoot.insertAdjacentHTML('afterbegin', pagElements.join(''));
  }
  eventHandler(event) {
    this.page = Number(event.target.dataset.index);
    this.nextStep();
  }
  makeEventListener() {
    const fn = event => this.eventHandler(event);
    this.paginationRoot.addEventListener('click', fn, {
      once: true,
    });
  }

  nextStep() {
    this.makePagination();
    this.makeEventListener();
    this.makeMarkup();
  }

  makeMarkup() {
    // this.returnItems();
    // refs.searchSet.innerHTML = rend.createCocktailCard();

    console.log(this.returnItems());
  }
}
// searchByABC(e) {
//     e.preventDefault();

//     const letter = e.target.innerText;
//     console.dir(e.target.innerText);
//     refs.searchSet.innerHTML = '';
//     const thisObj = this;

//     this.cocktailsApi
//       .getCocktailsBySymbol(letter)
//       .then(response => {
//         console.log(response);
//         if (response.drinks === null) {
//           // ----заинсталить красивую нотификашку

//           window.alert('На жаль такий коктейль відсутній');
//           return;
//           // ----заинсталить красивую нотификашку ^^^^^
//         }
//         refs.searchSetCaption.textContent = 'Searching results';
//         // refs.searchSet.innerHTML = thisObj.createCocktailCard(response.drinks);
//         // thisObj.onRenderComplete();
//         const pagCock = new Pagination({
//           items: response.drinks,
//           paginationRoot: refs.pagCont,
//           rootGallery: refs.searchSet,
//           range: 9,
//           fn: this.someFN,
//         });
//       })

//       .catch(error => {
//         console.log(error);
//       });
//   }

//   someFN(array) {
//     refs.searchSet.innerHTML = thisObj.createCocktailCard(array);
//     thisObj.onRenderComplete();
//   }

//  pagCont: document.querySelector('.pagenumbers'),
