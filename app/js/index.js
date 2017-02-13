'use strict';

let portofolio = new Portofolio();
let kingColl = new KingCollection();

let paginatorPortofolio = new Paginator(portofolio, 6, '#portofolio-games', htmlTemplates.getGameTemplate);
paginatorPortofolio.loadPage();


let paginatorKing;
kingColl.readGames(() => {
	//TODO something with err
	kingColl.markGamesAsUsed(portofolio.getAll());
	paginatorKing = new Paginator(kingColl, 3, '#king-games', htmlTemplates.getGameTemplate);
	paginatorKing.loadPage();
});

//Events

document.querySelector('#king-games').onclick = (e) => {
	if (Array.from(e.target.classList).indexOf('btn-add') > -1) {
		let gameId = utils.dom.getAttributeValue(e.target, 'data-game-id');
		let game = kingColl.getGameById(gameId);

		portofolio.addItem(game);
		kingColl.useGame(gameId);

		utils.dom.hide(document.querySelector(`#king-games .${game.short} .btn-add`));
		paginatorPortofolio.loadPage();
	}
};

document.querySelector('#portofolio-games').onclick = (e) => {
	if (Array.from(e.target.classList).indexOf('btn-add') > -1) {
		console.log('TODO');
	}
};

function openGameView(gameId) {
	let modal = document.getElementById('view-modal');
	let span = modal.querySelector('.close');

	modal.style.display = "block";
	span.onclick = () => modal.style.display = "none";

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = (event) => {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}