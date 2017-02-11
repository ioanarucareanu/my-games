let games = [];

function getGameTemplate(game) {
	let container = document.createElement('div');
	let text = document.createTextNode(game.name);
	let addButton = document.createElement('button');
	addButton.setAttribute('class', 'add');
	addButton.innerHTML = 'Add to portofolio';
	addButton.addEventListener('click', () => {
		portofolio.addItem(game);
	});
	container.appendChild(text);
	container.appendChild(addButton);
	return container;
}


function buildGamesList(listSelector, games) {
	let list = document.querySelector(listSelector);
	list.innerHTML = '';
	games.forEach(game => {
		let listItem = document.createElement('li');
		let itemTemplate = getGameTemplate(game);
		listItem.appendChild(itemTemplate);
		list.appendChild(listItem);
	});
}

utils.loadJSON('../data/games.json',
	data => {
		games = data.games;
		buildGamesList('#king-games .games', games);
	},
	err => console.log(err)
);

let searchInputs = Array.from(document.getElementsByClassName('searchInput'));
searchInputs.forEach(input => {
	let gamesSection = utils.findAncestor(input, 'games-container');
	input.addEventListener('keyup', (event) => {
		let searchText = input.value;
		buildGamesList(`#${gamesSection.id} .games`, utils.searchGamesByName(games, searchText));
	});
});


