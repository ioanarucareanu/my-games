let htmlTemplates = {

	getGameTemplate(game) {
		return `<div class="thumbnail">`
			+ `<figure><img src="${game.thumbnail()}" alt=""/><figcaption>${game.name}</figcaption></figure>`
			+ `<button type="button" class="btn-add" data-game-id="${game.short}">Add</button>`
			+ `</div>`;
	}
};