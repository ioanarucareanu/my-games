class Paginator {

	constructor(collection, itemsPerPage, parentContainerSelector, itemTemplateFct) {
		this.collection = collection;
		this.itemsPerPage = itemsPerPage;
		this.parentContainer = document.querySelector(parentContainerSelector);
		this.itemTemplateFct = itemTemplateFct;

		this.currPage = 1;

		this.parentContainer.querySelector('.btn-next').addEventListener('click', () => {
			this.next();
		});
		this.parentContainer.querySelector('.btn-prev').addEventListener('click', () => {
			this.prev();
		});
	}

	next() {
		if (this.currPage < this.numPages()) {
			this.currPage++;
			this.loadPage();
		}
	}

	prev() {
		if (this.currPage > 1) {
			this.currPage--;
			this.loadPage();
		}
	}

	loadPage() {
		let grid =  this.parentContainer.querySelector('.grid');
		let btnNext = this.parentContainer.querySelector('.btn-next');
		let btnPrev =  this.parentContainer.querySelector('.btn-prev');
		let pageSpan =  this.parentContainer.querySelector('.page');

		// Validate page
		// if (this.currPage < 1) this.currPage = 1;
		// if (this.currPage > this.numPages()) this.currPage = this.numPages();

		if (Object.keys(this.collection.getAll()).length == 0) {
			grid.innerHTML = 'No games to show';
		}
		else {
			grid.innerHTML = '';
			// Get elements from collection, apply template and add them to the grid
			let items = this.collection.getXGamesFrom(this.itemsPerPage, (this.currPage - 1) * this.itemsPerPage);
			items.forEach(item => {
				grid.innerHTML += this.itemTemplateFct(item);
			});
		}

		pageSpan.innerHTML = this.currPage;

		this.currPage === 1 ? utils.hide(btnPrev) : utils.show(btnPrev);
		this.currPage === this.numPages() ? utils.hide(btnNext) : utils.show(btnNext);
	}

	numPages() {
		return Math.ceil(Object.keys(this.collection.getAll()).length / this.itemsPerPage);
	}
}