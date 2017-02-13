let htmlTemplates = {

	getGameTemplate(game) {
		let className = game.used ? 'hidden' : '';
		return `<div class="thumbnail ${game.short}">`
			+ `<a href="#" onclick="openGameView('${game.short}')"><img src="${game.thumbnail()}" class="responsive-image"></a>`
			+ `<div class="cell-content">`
			+ `<h4>${game.name}</h4>`
			+ `<button type="button" class="btn-add ${className}" data-game-id="${game.short}">Add</button>`
			+ `</div>`
			+ `</div>`;
	}
};