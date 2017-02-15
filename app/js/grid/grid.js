(function() {
	'use strict';

	class Grid {
		constructor(itemsPerPage, parentSelector) {
			this.itemsPerPage = itemsPerPage;
			this.currPage = 0;

			let parentContainer = document.querySelector(parentSelector);
			this.components = {
				grid: parentContainer.querySelector('.coll-grid'),
				btnNext: parentContainer.querySelector('.coll-pagination .btn-next'),
				btnPrev: parentContainer.querySelector('.coll-pagination .btn-prev'),
				pageSpan: parentContainer.querySelector('.coll-pagination .curr-page'),
				totalSpan: parentContainer.querySelector('.coll-pagination .total-pages')
			};
			this.components.btnNext.onclick = () => this.next();
			this.components.btnPrev.onclick = () => this.prev();

		}

		setCollection(coll) {
			this.collection = coll;
			this.ids = Object.keys(coll.getAll());
		}

		reset() {
			this.currPage = 0;
		}

		append(id) {
			this.ids.push(id);
			this._loadPage();
		}

		remove(id) {
			let index = this.ids.indexOf(id);
			this.ids.splice(index, 1);
			this._loadPage();
		}

		_getNextItems() {
			let items = [];
			let currIndex = (this.currPage - 1) * this.itemsPerPage;
			for (let i = currIndex; i < this.itemsPerPage + currIndex && i < this.ids.length; i++) {
				items.push(this.collection.getGameById(this.ids[i]));
			}
			return items;
		}

		next() {
			if (this.currPage < this._numPages()) {
				this.currPage++;
				this._loadPage();
			}
		}

		prev() {
			if (this.currPage > 1) {
				this.currPage--;
				this._loadPage();
			}
		}

		searchByName(name) {
			let regex = new RegExp(name, 'i');
			let matched = this.ids.filter(id => {
				return this.collection.getGameById(id).name.search(regex) !== -1;
			});
			this.ids = matched;
			this.reset();
			this.next();
		}

		_loadPage() {
			// In case there are no elements left on the current page, reinitialise the current page.
			if (this.currPage > this._numPages()) this.currPage = this._numPages();

			if (this.ids.length === 0) {
				this.components.grid.innerHTML = 'Nothing to show';
			}
			else {
				this.components.grid.innerHTML = '';
				let items = this._getNextItems();
				items.forEach(item => {
					this.components.grid.innerHTML += this.collection.getItemTemplate(item);
				});
			}

			this.components.pageSpan.innerHTML = this.currPage;
			this.components.totalSpan.innerHTML = this._numPages();

			if (this.currPage === 1) {
				utils.dom.hide(this.components.btnPrev);
			}
			else {
				utils.dom.show(this.components.btnPrev);
			}
			if (this.currPage === this._numPages()) {
				utils.dom.hide(this.components.btnNext);
			}
			else {
				utils.dom.show(this.components.btnNext)
			}
		}

		_numPages() {
			return Math.ceil(this.ids.length / this.itemsPerPage);
		}

	}
	window.Grid = Grid;
})();