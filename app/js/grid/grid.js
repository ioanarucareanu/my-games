(function() {
	'use strict';

	class Grid {
		constructor(itemsPerPage, parentSelector) {
			this.itemsPerPage = itemsPerPage;
			this.currPage = 0;

			let parentContainer = document.querySelector(parentSelector);
			this.components = {
				grid: parentContainer.querySelector('.coll-grid'),
				paginationContainer: parentContainer.querySelector('.coll-pagination'),
				btnNext: parentContainer.querySelector('.btn-next'),
				btnPrev: parentContainer.querySelector('.btn-prev'),
				pageSpan: parentContainer.querySelector('.curr-page'),
				totalSpan: parentContainer.querySelector('.total-pages')
			};
			this.components.btnNext.onclick = () => this.next();
			this.components.btnPrev.onclick = () => this.prev();

		}

		setCollection(coll) {
			this.collection = coll;
			this.ids = Object.keys(coll.getAll());
		}

		/**
		 * Move to the first page, and reload it with the initial data from the collection.
		 */
		reset() {
			this.currPage = 1;
			this.ids = Object.keys(this.collection.getAll());
			this._loadPage();
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
			this.currPage = 1;
			this._loadPage();
		}

		_loadPage() {
			//In case we just added the first element in the grid, set curr page to 1 and show the pagination.
			if (this.currPage < 1 && !this.collection.isEmpty()) {
				this.currPage = 1;
			}
			// In case there are no elements left on the current page, reinitialise the current page.
			if (this.currPage > this._numPages()) {
				this.currPage = this._numPages();
			}

			if (this.ids.length === 0) {
				this.components.grid.innerHTML = 'Browse through the King games and add items to your portofolio.';
				utils.dom.hide(this.components.paginationContainer);
				this.currPage = 0;
			}
			else {
				utils.dom.show(this.components.paginationContainer);
				this.components.grid.innerHTML = '';
				let items = this._getNextItems();
				items.forEach(item => {
					this.components.grid.innerHTML += this.collection.getItemTemplate(item);
				});
			}

			this.components.pageSpan.innerHTML = this.currPage;
			this.components.totalSpan.innerHTML = this._numPages();

			if (this.currPage === 1  ) {
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