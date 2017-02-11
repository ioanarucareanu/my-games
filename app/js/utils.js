let utils = {

	loadJSON(path, success, error) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error)
						error(xhr);
				}
			}
		};
		xhr.open("GET", path, true);
		xhr.send();
	},

	readAllGames(callback) {
		this.loadJSON('../data/games.json',
			data => {
				let games = data.games;
				let gamesObj = {};
				games.forEach(_game => {
					gamesObj[_game.short] = new Game(_game.name, _game.short, _game.url, _game.tags, _game.hasBoosters,
						portofolio.hasItem(_game.short));
				});
				return callback(null, gamesObj);
			},
			err => {
				callback(err, {});
			}
		);
	},

	findAncestor(elem, className) {
		while ((elem = elem.parentElement) && !elem.classList.contains(className));
		return elem;
	},

	searchGamesByName(games, name) {
		console.log(`Searching for ${name}.....`)
		let regex = new RegExp(name, 'i');
		let matchedGames = Object.values(games).filter(game => {
			return game.name.search(regex) !== -1;
		});
		console.log(`Found ${matchedGames.length}.`);
		return matchedGames;
	}
};