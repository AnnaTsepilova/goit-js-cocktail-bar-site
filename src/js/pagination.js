import sprite from '../images/sprite.svg';

export class Pagination {
  constructor(options) {
    this.items = options.items ? options.items : [];
    this.paginationRoot = options.paginationRoot;
    this.page = 1;
    this.range = options.range;
    this.totalPages = Math.ceil(this.items.length / options.range);
    this.callback = options.callback

    this.nextStep();
  }
  returnItems() {
    //console.log('items: ', [...this.items]);
    //console.log('first: ', this.range * (this.page - 1));
    //console.log('second: ', this.range * this.page);
    return [...this.items].splice(this.range * (this.page - 1), this.range);
  }
  makePagination() {
    let pagElements = [];

    if (this.totalPages > 1) {
      pagElements.push(`
        <li class="paginarion__item arrows">
          <a class="paginarion__btn-prev" data-index="` + (this.page - 1) + `">
            <svg class="paginarion__btn-prev-icon ` + ((this.page == 1) ? "arrow-grey" : "") + `" width="24" height="24">
              <use xlink:href="${sprite}#icon-pag-btn-prev" />
            </svg>
          </a>
        </li>
        `);
    }
    
    pagElements.push(`<li class="paginarion__item pages-container">`);
    
    if (this.totalPages > 6) {
      for (let i = 1; i <= this.totalPages; i += 1) {
        if (i < 3) {
          pagElements.push(`
            <a class="pages__link ${i === this.page ? 'active' : ''}" data-index="${i}">
              ${i}
            </a>
            `);
        } else {
          pagElements.push(`
            <a class="pages__link ${i === this.page ? 'active' : ''}" data-index="${i}">
              ${i}
            </a>
          `);
        }
      }
    } else {
      for (let i = 1; i <= this.totalPages; i += 1) {
        // Hidde pages if only one page
        if (this.totalPages < 2) {
          break;
        }
        // console.log(i, '    ', this.page);
        pagElements.push(`
              <a class="pages__link ${i === this.page ? 'active' : ''}" data-index="${i}">
                ${i}
              </a>
            `);
      }
    }
    pagElements.push(`</li>`);

    
    if (window.screen.width < 768) {
      const limit = 4;
      let c = 0;
      pagElements = pagElements.filter(elm => {
        if (c > limit) {
          return;
        }
        c += 1;
        return elm;
      })
    }

    if (this.totalPages > 1) {
      pagElements.push(`
        <li class="paginarion__item arrows">
          <a class="paginarion_btn-next" data-index="` + (this.page + 1) + `" >
            <svg class="paginarion__btn-next-icon ` + ((this.page === this.totalPages) ? "arrow-grey" : "") + `" width="24" height="24">
              <use xlink:href="${sprite}#icon-pag-btn-next" />
            </svg>
          </a>
        </li>`);
    }

    this.paginationRoot.innerHTML = '';
    this.paginationRoot.innerHTML = pagElements.join('');
  }

  eventHandler(event) {
    this.page = Number(event.currentTarget.dataset.index);
    if (isNaN( this.page ) || this.page < 1 || this.page > this.totalPages) {
      return;
    }
    this.nextStep();
  }
  makeEventListener() {
    const pagElms = document.querySelectorAll('.paginarion__container a');

    pagElms.forEach(element => {
      element.addEventListener('click', event => this.eventHandler(event), {
        //once: true,
      });
    })
  }

  nextStep() {
    this.makePagination();
    this.makeEventListener();
    this.makeMarkup();
  }

  makeMarkup() {
    //this.returnItems();
    //console.log(this.returnItems());
    this.callback(this.returnItems());
  }
}

