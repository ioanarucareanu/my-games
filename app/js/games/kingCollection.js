(function() {
	'use strict';

	/**
	 * King Collection extending the base GamesCollection. Designed to hold all the games available in the system.
	 */
	class KingCollection extends GamesCollection {

		constructor(games) {
			super(games);
		}

		getItemTemplate(game) {
			return htmlTemplates.getGameTemplate(game);
		}

		/**
		 * Toggles the flag indicating the usage of the game with the given id.
		 * @param id -the id of the game
		 */
		toggleGameUsed(id) {
			this.games[id].used = !this.games[shortName].used;
		}
	}
	window.KingCollection = KingCollection;
})();