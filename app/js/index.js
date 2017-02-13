'use strict';

let portofolio = new Portofolio();
let kingColl = new KingCollection();

portofolio.paginator.loadPage();


kingColl.readGames(() => {
	//TODO something with err
	kingColl.markGamesAsUsed(portofolio.getAll());
	kingColl.paginator.loadPage();
});

//Events

let searchPortofolio = document.getElementById('searchPortofolio');

searchPortofolio.onkeydown = (event) => {
	if (event.keyCode == 13 || event.which == 13) {
		portofolio.searchByName(searchPortofolio.value);
	}
};

document.querySelector('#king-games').onclick = (e) => {
	if (Array.from(e.target.classList).indexOf('btn-add') > -1) {
		let gameId = utils.dom.getAttributeValue(e.target, 'data-game-id');
		let game = kingColl.getGameById(gameId);

		portofolio.addItem(game);
		portofolio.storeGames();
		kingColl.useGame(gameId);

		utils.dom.hide(document.querySelector(`#king-games .${game.short} .btn-add`));
		portofolio.paginator.loadPage();
	}
};

document.querySelector('#portofolio-games').onclick = (e) => {
	if (Array.from(e.target.classList).indexOf('btn-add') > -1) {
		console.log('TODO');
	}
};

function openGameView(title, thumbnail, playUrl) {
	let modal = document.getElementById('view-modal');
	let span = modal.querySelector('.close');

	modal.style.display = "block";
	span.onclick = () => {
		modal.style.display = "none";
	};
	document.getElementById('game-name').innerHTML = title;
	document.querySelector('#game-screenshot img').src = thumbnail;
	document.getElementById('game-play').href = playUrl;

}