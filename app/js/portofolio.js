let portofolio = {

	games: {},

	getGamesList() {
		return Object.values(this.games);
	},

	store() {
		localStorage.setItem('portofolio', this.games);
	},
	getFromStorage() {
		this.games = localStorage.getItem('portofolio');

	},
	addItem(game) {
		this.games[game.short] = {
			name: game.name,
			short: game.short,
			url: game.url,
			tags: game.tags,
			hasBoosters: game.hasBoosters
		}
	},
	removeItem(shortName) {
		delete games[shortName];
	}
};