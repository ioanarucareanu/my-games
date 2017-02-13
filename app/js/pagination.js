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
			pageSpan: parentContainer.querySelector('.curr-page'),
			totalSpan: parentContainer.querySelector('.total-pages')
		};
		this.components.btnNext.onclick = () => this.next();
		this.components.btnPrev.onclick = () => this.prev();
	}

	reset() {
		this.currPage = 1;
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
		this.components.totalSpan.innerHTML = this.numPages();

		if (this.currPage === 1) {
			utils.dom.hide(this.components.btnPrev);
			// this.components.btnPrev.disabled = true;
		}
		else {
			utils.dom.show(this.components.btnPrev);
			// this.components.btnPrev.disabled = false;
		}
		if (this.currPage === this.numPages()) {
			utils.dom.hide(this.components.btnNext);
			// this.components.btnNext.disabled = true;
		}
		else {
			// this.components.btnNext.disabled = false;
			utils.dom.show(this.components.btnNext)
		}
	}

	numPages() {
		return Math.ceil(Object.keys(this.collection.getAll()).length / this.itemsPerPage);
	}
}