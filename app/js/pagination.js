'use strict';

class Paginator {

	constructor(collection, itemsPerPage, parentContainerSelector, itemTemplateFct) {
		this.collection = collection;
		this.itemsPerPage = itemsPerPage;
		this.itemTemplateFct = itemTemplateFct;

		this.currPage = 1;

		let parentContainer = document.querySelector(parentContainerSelector);
		this.components = {
			grid: parentContainer.querySelector('.grid'),
			btnNext: parentContainer.querySelector('.btn-next'),
			btnPrev: parentContainer.querySelector('.btn-prev'),
			pageSpan: parentContainer.querySelector('.page')
		};
		this.components.btnNext.onclick = () => this.next();
		this.components.btnPrev.onclick = () => this.prev();
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
		// Validate page
		// if (this.currPage < 1) this.currPage = 1;
		// if (this.currPage > this.numPages()) this.currPage = this.numPages();

		if (Object.keys(this.collection.getAll()).length === 0) {
			this.components.grid.innerHTML = 'Nothing to show';
		}
		else {
			this.components.grid.innerHTML = '';
			// Get elements from collection, apply template and add them to the grid
			let items = this.collection.getXGamesFrom(this.itemsPerPage, (this.currPage - 1) * this.itemsPerPage);
			items.forEach(item => {
				this.components.grid.innerHTML += this.itemTemplateFct(item);
			});
		}

		this.components.pageSpan.innerHTML = this.currPage;

		if (this.currPage === 1) {
			utils.dom.hide(this.components.btnPrev);
		}
		else {
			utils.dom.show(this.components.btnPrev);
		}
		if (this.currPage === this.numPages()) {
			utils.dom.hide(this.components.btnNext)
		}
		else {
			utils.dom.show(this.components.btnNext)
		}
	}

	numPages() {
		return Math.ceil(Object.keys(this.collection.getAll()).length / this.itemsPerPage);
	}
}