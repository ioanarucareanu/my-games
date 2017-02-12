class Portofolio extends GamesCollection {

	constructor() {
		super();
	}

	loadGames() {
		let data = JSON.parse(localStorage.getItem('portofolio')) || {};
		let games = Object.keys(data);
		games.forEach(short => {
			let game = data[short];
			this.games[short] = new Game(game.name, game.short, game.url, game.tags, game,hasBoosters, game.used);
		});
		this.gamesIds = Object.keys(this.games);
	}

	storeGames() {
		localStorage.setItem('portofolio', JSON.stringify(this.games));
	}

	addItem(game) {
		this.games[game.short] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters, true);
		this.gamesIds.push(game.short);
	}

	hasItem(shortName) {
		return shortName in this.games;
	}

	removeItem(shortName) {
		delete this.games[shortName];
		delete this.gamesIds(shortName);
	}
};