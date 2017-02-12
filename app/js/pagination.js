class Pagination {

	constructor(collection, itemsPerPage, parentContainerSelector, itemTemplateFct) {
		this.collection = collection;
		this.itemsPerPage = itemsPerPage;
		this.parentContainer = document.querySelector(parentContainerSelector);
		this.itemTemplateFct = itemTemplateFct;

		this.currPage = 1;

		this.parentContainer.querySelector('.btn-next').addEventListener('click', () => {
			console.log('clicked next');
			this.next();
		});
		this.parentContainer.querySelector('.btn-prev').addEventListener('click', () => {
			console.log('clicked prev');
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

		if (this.currPage == 1) {
			btnPrev.style.visibility = "hidden";
		} else {
			btnPrev.style.visibility = "visible";
		}

		if (this.currPage == this.numPages()) {
			btnNext.style.visibility = "hidden";
		} else {
			btnNext.style.visibility = "visible";
		}
	}

	numPages() {
		return Math.ceil(Object.keys(this.collection.getAll()).length / this.itemsPerPage);
	}
}