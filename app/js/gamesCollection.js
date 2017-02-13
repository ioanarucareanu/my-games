'use strict';

class GamesCollection {

	constructor() {
		this.games = {};
		this.gamesIds = [];
	}

	readGames() {
		//to be implemented in the child classes
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

	getGameById(short) {
		return this.games[short];
	}

	searchByName(name) {
		console.log(`Searching for ${name}.....`);
		let regex = new RegExp(name, 'i');
		let matchedGames = Object.keys(this.games).filter(gameId => {
			return this.games[gameId].name.search(regex) !== -1;
		});
		console.log(`Found ${matchedGames}.`);
		this.gamesIds = matchedGames;
		this.paginator.loadPage();
	}
}