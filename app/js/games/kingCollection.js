(function() {
	'use strict';

	class KingCollection extends GamesCollection {

		constructor(games) {
			super(games);
		}

		getItemTemplate(game) {
			return htmlTemplates.getGameTemplate(game);
		}

		toggleGameUsed(shortName) {
			this.games[shortName].used = !this.games[shortName].used;
		}
	}
	window.KingCollection = KingCollection;
})();