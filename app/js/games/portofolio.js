(function() {
	'use strict';

	// The key under which the portofolio is saved into the local storage of the browser.
	const portofolioKey = 'portofolio';

	/**
	 * Portofolio class extending the base GamesCollection, meant to hold all the user's saved games.
	 */
	class Portofolio extends GamesCollection {

		constructor() {
			super();
		}

		/**
		 * Loads the games collection from the local storage.
		 */
		load() {
			let data = JSON.parse(localStorage.getItem(portofolioKey)) || {};
			let games = Object.keys(data);
			games.forEach(id => {
				let game = data[id];
				this.games[id] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, game.used);
			});
		}

		/**
		 * Saves portofolio's content into the local storage.
		 */
		save() {
			localStorage.setItem(portofolioKey, JSON.stringify(this.games));
		}

		/**
		 * Adds a new game to the portofolio and saves the whole portofolio.
		 * @param game
		 */
		addItem(game) {
			if (game.short in this.games) {
				return;
			}
			this.games[game.short] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, true);
			this.save();
		}

		/**
		 * Checks whether the game with the given id already exists in the portofolio.
		 * @param id
		 * @returns {boolean}
		 */
		hasItem(id) {
			return id in this.games;
		}

		/**
		 * Removes the game with the given id from the portofolio and saves the portofolio.
		 * @param id
		 */
		removeItem(id) {
			if (!(id in this.games)) {
				return;
			}
			delete this.games[id];
			this.save();
		}

		getItemTemplate(game) {
			return htmlTemplates.getPortofolioGameTemplate(game);
		}
	}
	window.Portofolio = Portofolio;
})();