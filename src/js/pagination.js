export class Pagination {
  constructor(options) {
    this.items = options.items ? options.items : [];
    this.paginationRoot = options.paginationRoot;
    this.page = 1;
    this.range = options.range;
    this.pages = Math.ceil(this.items.length / options.range);
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
    const pagElements = [];
    if (this.pages > 6) {
      for (let i = 1; i <= this.pages; i += 1) {
        if (i < 3) {
          pagElements.push(`
            <div class="btnBox ${i === 0 ? 'active' : ''}" data-index="${i}">
              ${i}
            </div>`);
        } else {
          pagElements.push(`
            <div class="btnBox" data-index="${i}">
              ${i}
            </div>`);
        }
      }
    } else {
      for (let i = 1; i <= this.pages; i += 1) {
        // Hidde pages if only one page
        if (this.pages < 2) {
          break;
        }
        // console.log(i, '    ', this.page);
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
    //this.returnItems();
    //console.log(this.returnItems());
    this.callback(this.returnItems());
  }
}

