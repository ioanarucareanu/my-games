let kingColl;
let portofolioColl;

portofolioColl = new Portofolio();
portofolioColl.load();

let gridPortofolio = new Grid(6, '#portofolio-games');
gridPortofolio.setCollection(portofolioColl);
if (!portofolioColl.isEmpty()) {
	gridPortofolio.next();
}

let gridKing = new Grid(3, '#king-games');

utils.loadJSON('../data/games.json',
	data => {
		let games = {};
		data.games.forEach(_game => {
			let inPortofolio = portofolioColl.hasItem(_game.short);
			games[_game.short] = new Game(_game.name, _game.short, _game.url, _game.tags, _game.hasBoosters, inPortofolio);
		});
		kingColl = new KingCollection(games);
		gridKing.setCollection(kingColl);
		gridKing.next();
	},
	err => {
		//TODO error
	}
);

//Events

let searchPortofolio = document.getElementById('searchPortofolio');

searchPortofolio.onkeyup = (event) => {
	if (searchPortofolio.value === '') {
		gridPortofolio.reset();
	}
	if (event.keyCode == 13 || event.which == 13) {
		gridPortofolio.searchByName(searchPortofolio.value);
	}
};

function addToPortofolio(gameId) {
	let game = kingColl.getGameById(gameId);

	if (portofolioColl.hasItem(gameId)) {
		return;
	}
	portofolioColl.addItem(game);
	if (document.getElementById('portofolio-games')) {
		gridPortofolio.append(gameId);
	}

	kingColl.toggleGameUsed(gameId);

	utils.dom.hide(document.querySelector(`#king-games .${gameId} .btn-save`)); //
}

function removeFromPortofolio(gameId) {
	portofolioColl.removeItem(gameId);
	gridPortofolio.remove(gameId);

	kingColl.toggleGameUsed(gameId);

	//If the correspondent King game is loaded on the page, make the save button available again.
	let kingGame = document.querySelector(`#king-games .coll-item.${gameId}`);
	if (kingGame) {
		utils.dom.show(document.querySelector(`#king-games .${gameId} .btn-save`));
	}
}

function showAllKingCollection() {
	document.getElementById('main').innerHTML = htmlTemplates.getAllKingGamesTemplate();
	let gridKing = new Grid(12, '#king-games');
	gridKing.setCollection(kingColl);
	gridKing.next();

	let searchKing = document.getElementById('searchKing');

	searchKing.onkeyup = (event) => {
		if (searchKing.value === '') {
			gridKing.reset();
		}
		if (event.keyCode == 13 || event.which == 13) {
			gridKing.searchByName(searchKing.value);
		}
	};
}

function openGameView(gameId) {
	let game = kingColl.getGameById(gameId);
	let modal = document.getElementById('view-modal');
	let span = modal.querySelector('.close');

	modal.style.display = "block";
	span.onclick = () => {
		modal.style.display = "none";
	};
	document.getElementById('game-name').innerHTML = game.name;
	document.querySelector('#game-screenshot img').src = game.largeImage();
	document.getElementById('game-play').href = game.url;

	initAction();

	function initAction() {
		let anchor = document.querySelector('#action a');
		if (!game.used) {
			anchor.innerHTML = 'Add to portofolio';
			anchor.onclick = () => { addToPortofolio(game.short);initAction(); };
		}
		else {
			anchor.innerHTML = 'Remove from portofolio';
			anchor.onclick = () => { removeFromPortofolio(game.short); initAction(); };
		}

	}
}