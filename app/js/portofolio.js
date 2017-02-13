'use strict';

class Portofolio extends GamesCollection {

	constructor() {
		super();
		this.readGames();
		this.paginator = new Paginator(this, 6, '#portofolio-games', htmlTemplates.getGameTemplate);
	}

	readGames() {
		let data = JSON.parse(localStorage.getItem('portofolio')) || {};
		let games = Object.keys(data);
		games.forEach(short => {
			let game = data[short];
			this.games[short] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, game.used);
		});
		this.gamesIds = Object.keys(this.games);
	}

	storeGames() {
		localStorage.setItem('portofolio', JSON.stringify(this.games));
	}

	addItem(game) {
		if (game.short in this.games) {
			return;
		}
		this.games[game.short] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, true);
		this.gamesIds.push(game.short);
	}

	hasItem(shortName) {
		return shortName in this.games;
	}

	removeItem(shortName) {
		if (!(shortName in this.games)) {
			return;
		}
		delete this.games[shortName];
		let index = this.gamesIds.indexOf(shortName);
		if (index > -1) {
			this.gamesIds.splice(index, 1);
		}
	}
}