let games = [];

function getPortofolioGameTemplate(game) {
	let container = document.createElement('div');
	let text = document.createTextNode(game.name);
	container.appendChild(text);
	return container;
}

function getGameTemplate(game) {
	let container = document.createElement('div');
	let text = document.createTextNode(game.name);
	let addButton = document.createElement('button');
	addButton.setAttribute('class', 'add');
	addButton.innerHTML = 'Add to portofolio';
	addButton.addEventListener('click', () => {
		portofolio.addItem(game);
		buildGamesList('#portofolio-games .games', portofolio.getGamesList(), getPortofolioGameTemplate);
	});
	container.appendChild(text);
	container.appendChild(addButton);
	return container;
}


function buildGamesList(listSelector, games, templateFct) {
	let list = document.querySelector(listSelector);
	list.innerHTML = '';
	games.forEach(game => {
		let listItem = document.createElement('li');
		let itemTemplate = templateFct(game);
		listItem.appendChild(itemTemplate);
		list.appendChild(listItem);
	});
}

//Load King games list
utils.loadJSON('../data/games.json',
	data => {
		games = data.games;
		buildGamesList('#king-games .games', games, getGameTemplate);
	},
	err => console.log(err)
);

//Load Portofolio with games
buildGamesList('#portofolio-games .games', portofolio.getGamesList(), getPortofolioGameTemplate);

let searchKing = document.querySelector('#king-games .searchInput');
searchKing.addEventListener('keyup', (event) => {
	let searchText = searchKing.value;
	buildGamesList(`#king-games .games`, utils.searchGamesByName(games, searchText), getGameTemplate);
});

let searchPortofolio = document.querySelector('#portofolio-games .searchInput');
searchPortofolio.addEventListener('keyup', (event) => {
	let searchText = searchPortofolio.value;
	buildGamesList(`#portofolio-games .games`, utils.searchGamesByName(portofolio.getGamesList(), searchText), getPortofolioGameTemplate);
});


