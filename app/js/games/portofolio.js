(function() {
	'use strict';

	const portofolioKey = 'portofolio';

	class Portofolio extends GamesCollection {

		constructor() {
			super();
		}

		load() {
			let data = JSON.parse(localStorage.getItem(portofolioKey)) || {};
			let games = Object.keys(data);
			games.forEach(id => {
				let game = data[id];
				this.games[id] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, game.used);
			});
		}

		save() {
			localStorage.setItem(portofolioKey, JSON.stringify(this.games));
		}

		addItem(game) {
			if (game.short in this.games) {
				return;
			}
			this.games[game.short] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, true);
			this.save();
		}

		hasItem(id) {
			return id in this.games;
		}

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