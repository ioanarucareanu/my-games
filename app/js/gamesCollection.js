class GamesCollection {

	constructor() {
		this.games = {};
		this.gamesIds = [];
	}

	loadGames() {

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
		let matchedGames = Object.values(this.games).filter(game => {
			return game.name.search(regex) !== -1;
		});
		console.log(`Found ${matchedGames.length}.`);
		return matchedGames;
	}
}