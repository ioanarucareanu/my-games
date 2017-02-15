(function() {
	'use strict';

	/**
	 * Base class for all games collections, holds a map of games.
	 */
	class GamesCollection {

		/**
		 * Builds a games collection from a given map;
		 * @param games
		 */
		constructor(games) {
			this.games = games || {};
		}

		isEmpty() {
			return Object.keys(this.games).length === 0;
		}

		/**
		 * Returns the game with the given id (equivalent of short name).
		 * @param id - the id searched for
		 * @returns {Game} object
		 */
		getGameById(id) {
			return this.games[id];
		}

		/**
		 * Returns the inner collection of games.
		 * @returns {*|{Game}}
		 */
		getAll() {
			return this.games;
		}

		/**
		 * Function describing the HTML structure of a game item. To be implemented in the child classes.
		 * @param game
		 */
		getItemTemplate(game) {
		}
	}

	window.GamesCollection = GamesCollection;
})();