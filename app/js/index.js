
function buildGamesGrid(containerSelector, gamesCollection, paginator) {
	// let container = document.querySelector(containerSelector);
	//Fill in current page
	paginator.loadPage();
	// container.querySelector('.btn-next').addEventListener('click', () => {
	// 	paginator.next();
	// });
	// container.querySelector('.btn-prev').addEventListener('click', () => {
	// 	paginator.prev();
	// });
}

let portofolio = new Portofolio();
let kingColl = new KingCollection();
portofolio.loadGames();

let paginationPortofolio = new Pagination(portofolio, 8, '#portofolio-games', htmlTemplates.getGameTemplate);
buildGamesGrid('#portofolio-games', portofolio, paginationPortofolio);


let paginationKing;
kingColl.loadGames(() => {
	//TODO something with err
	kingColl.markGamesAsUsed(portofolio.getAll());
	paginationKing = new Pagination(kingColl, 4, '#king-games', htmlTemplates.getGameTemplate);
	buildGamesGrid('#king-games', kingColl, paginationKing);
});

//Events

document.querySelector('#king-games').addEventListener('click', function (e) {
	if (Array.from(e.target.classList).indexOf('btn-add') > -1) {
		console.log('add from King clicked');
		let gameId = utils.getAttributeValue(e.target, 'data-game-id');
		let game = kingColl.getGameById(gameId);

		portofolio.addItem(game);
		kingColl.useGame(gameId);
		buildGamesGrid('#portofolio-games', portofolio, paginationPortofolio);
	}
}, false);

document.querySelector('#portofolio-games').addEventListener('click', function (e) {
	if (Array.from(e.target.classList).indexOf('btn-add') > -1) {
		console.log('add from Portofolio clicked');
	}
}, false);

