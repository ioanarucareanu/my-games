(function() {
	'use strict';

	class GamesCollection {

		constructor(games) {
			this.games = games || {};
		}

		isEmpty() {
			return Object.keys(this.games).length === 0;
		}

		getGameById(id) {
			return this.games[id];
		}

		getAll() {
			return this.games;
		}

		getItemTemplate(game) {
			//to be implemented in the child classes
		}
	}

	window.GamesCollection = GamesCollection;
})();