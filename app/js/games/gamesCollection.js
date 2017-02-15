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

		getXGamesFrom(noOfGames, from) {
			let section = [];
			let total = this.gamesIds.length;
			for (let i = 0; i < noOfGames && (i + from) < total; i++) {
				section[i] = this.games[this.gamesIds[i + from]];
			}
			return section;
		}

		searchByName(name) {
			let regex = new RegExp(name, 'i');
			let matchedGames = Object.keys(this.games).filter(gameId => {
				return this.games[gameId].name.search(regex) !== -1;
			});
			this.gamesIds = matchedGames;
			this.loadPage();
		}

		getItemTemplate(game) {
			//to be implemented in the child classes
		}
	}

	window.GamesCollection = GamesCollection;
})();