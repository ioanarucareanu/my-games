'use strict';

class KingCollection extends GamesCollection {

	constructor() {
		super();
		this.paginator = new Paginator(this, 3, '#king-games', htmlTemplates.getGameTemplate);
	}

	readGames(callback) {
		utils.loadJSON('../data/games.json',
			data => {
				data.games.forEach(_game => {
					this.games[_game.short] = new Game(_game.name, _game.short, _game.url, _game.tags, _game.hasBoosters);
				});
				this.gamesIds = Object.keys(this.games);
				return callback();
			},
			err => {
				callback(err);
			}
		);
	}

	markGamesAsUsed(gameCollection) {
		Object.keys(gameCollection).forEach(game => {
			if (this.games[game.short]) {
				this.games[game.short].used = true;
			}
		});
	}

	useGame(shortName) {
		this.games[shortName].used = true;
	}


}