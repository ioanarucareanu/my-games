let kingColl;
let portofolioColl;

portofolioColl = new Portofolio();
portofolioColl.load();

let gridPortofolio = new Grid(6, '#portofolio-games');
gridPortofolio.setCollection(portofolioColl);
gridPortofolio.next();

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

searchPortofolio.onkeydown = (event) => {
	if (event.keyCode == 13 || event.which == 13) {
		gridPortofolio.searchByName(searchPortofolio.value);
	}
};

document.querySelector('#king-games').onclick = (e) => {
	if (Array.from(e.target.classList).indexOf('btn-save') > -1) {
		let gameId = utils.dom.getAttributeValue(e.target, 'data-game-id');
		let game = kingColl.getGameById(gameId);

		if (portofolioColl.hasItem(gameId)) {
			return;
		}
		portofolioColl.addItem(game);
		gridPortofolio.append(gameId);

		kingColl.toggleGameUsed(gameId);

		utils.dom.hide(document.querySelector(`#king-games .${gameId} .btn-save`));
	}
};

document.querySelector('#portofolio-games').onclick = (e) => {
	if (Array.from(e.target.classList).indexOf('close') > -1) {
		let gameId = utils.dom.getAttributeValue(e.target, 'data-game-id');

		portofolioColl.removeItem(gameId);
		gridPortofolio.remove(gameId);

		kingColl.toggleGameUsed(gameId);

		//If the correspondent King game is loaded on the page, make the save button available again.
		let kingGame = document.querySelector(`#king-games .coll-item.${gameId}`);
		if (kingGame) {
			utils.dom.show(document.querySelector(`#king-games .${gameId} .btn-save`));
		}
	}
};

function showAllKingCollection() {
	document.getElementById('main').innerHTML = htmlTemplates.getAllKingGamesTemplate();
	let gridKing = new Grid(12, '#king-games');
	gridKing.setCollection(kingColl);
	gridKing.next();

	let searchKing = document.getElementById('searchKing');

	searchKing.onkeydown = (event) => {
		if (event.keyCode == 13 || event.which == 13) {
			gridKing.searchByName(searchKing.value);
		}
	};
}

// function openGameView(title, thumbnail, playUrl) {
// 	let modal = document.getElementById('view-modal');
// 	let span = modal.querySelector('.close');
//
// 	modal.style.display = "block";
// 	span.onclick = () => {
// 		modal.style.display = "none";
// 	};
// 	document.getElementById('game-name').innerHTML = title;
// 	document.querySelector('#game-screenshot img').src = thumbnail;
// 	document.getElementById('game-play').href = playUrl;
//
// }
