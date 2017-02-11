let portofolio = {

	games: {},
	store() {
		localStorage.setItem('portofolio', portofolio.games);
	},
	getFromStorage() {
		games = localStorage.getItem('portofolio');

	},
	addItem(game) {
		games[game.short] = {
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