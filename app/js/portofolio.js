let portofolio = {

	games: {},

	getGamesList() {
		return Object.values(this.games);
	},
	store() {
		localStorage.setItem('portofolio', JSON.stringify(this.games));
	},
	reloadFromStorage() {
		this.games = JSON.parse(localStorage.getItem('portofolio')) || {};
	},
	addItem(game) {
		this.games[game.short] = new Game(game.name, game.short, game.url, game.tags, game.hasBoosters);
	},
	hasItem(shortName) {
		return shortName in this.games;
	},
	removeItem(shortName) {
		delete this.games[shortName];
	}
};