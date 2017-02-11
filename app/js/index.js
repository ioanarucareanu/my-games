let games = {};

function getPortofolioGameTemplate(game) {
	let container = document.createElement('div');
	let text = document.createTextNode(game.name);
	let removeButton = document.createElement('button');
	removeButton.setAttribute('class', 'remove');
	removeButton.innerHTML = 'Remove from portofolio';
	removeButton.addEventListener('click', () => {
		//Remove from memory
		portofolio.removeItem(game.short);
		//Remove from list
		let listItem = container.parentNode;
		listItem.parentNode.removeChild(listItem);
		//TODO: update the games collection: in memory + <li>
	});
	container.appendChild(text);
	container.appendChild(removeButton);
	return container;
}

function getGameTemplate(game) {
	let container = document.createElement('div');
	let text = document.createTextNode(game.name);
	container.appendChild(text);
	//Add button
	let addButton = document.createElement('button');
	addButton.setAttribute('class', 'add');
	addButton.innerHTML = 'Add to portofolio';
	addButton.addEventListener('click', () => {
		portofolio.addItem(game);
		game.portofolio = true;
		buildGamesList('#portofolio-games .games', portofolio.getGamesList(), getPortofolioGameTemplate);
	});
	container.appendChild(addButton);
	//end add button

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
utils.readAllGames((err, data) => {
	if (err) {
		console.log('Could not read King\'s games', err);
	}
	games = data;
	buildGamesList(`#king-games .games`, Object.values(games), getGameTemplate);
});

//Load Portofolio with games
portofolio.reloadFromStorage();
buildGamesList('#portofolio-games .games', portofolio.getGamesList(), getPortofolioGameTemplate);

let searchKing = document.querySelector('#king-games .searchInput');
searchKing.addEventListener('keyup', (event) => {
	let searchText = searchKing.value;
	buildGamesList(`#king-games .games`, utils.searchGamesByName(Object.values(games), searchText), getGameTemplate);
});

let searchPortofolio = document.querySelector('#portofolio-games .searchInput');
searchPortofolio.addEventListener('keyup', (event) => {
	let searchText = searchPortofolio.value;
	buildGamesList(`#portofolio-games .games`, utils.searchGamesByName(portofolio.getGamesList(), searchText), getPortofolioGameTemplate);
});

document.getElementById('save-portofolio').addEventListener('click', () => {
	portofolio.store();
});


