let htmlTemplates = {

	getGameTemplate(game) {
		let className = game.used ? 'hidden' : '';
		return `<div class="coll-item ${game.short}">` +
			`<div class="item-img" style="background-image: url('${game.thumbnail()}')"></div>` +
			`<div class="item-title"><h4>${game.name}</h4></div>` +
			`<span class="btn-save ${className}" data-game-id="${game.short}"></span>` +
			`<div>`;
	},

	getPortofolioGameTemplate(game) {
		// `<div class="thumbnail ${game.short}">` +
		// 	`<span class="close">&times;</span>` +
		// 	`<a href="#" onclick="openGameView('${game.name}', '${game.largeImage()}', 'https://king.com${game.url}')"><img src="${game.thumbnail()}" class="responsive-image" /></a>` + `<div class="cell-content">` +
		// 	`<h4>${game.name}</h4>` +
		// 	`</div>` +
		// 	`</div>`;

		return `<div class="coll-item ${game.short}">` +
			`<span class="close" data-game-id="${game.short}">&times;</span>` +
			`<div class="item-img" style="background-image: url('${game.thumbnail()}')"></div>` +
			`<div class="item-title"><h4>${game.name}</h4></div>` +
			`<div>`;
	},

	getAllKingGamesTemplate() {
		return `<div id="king-games" class="coll-container">` +
			`<div class="coll-header header-with-controls"><div class="coll-title"><h3>Collection</h3>` +
			`</div><div class="coll-search"><input type="search" class="search-input" id="searchKing" results="5" placeholder="Search by name" />` +
			`</div></div>` +
			`<div class="coll-grid"></div>` +
			`<div class="coll-pagination">` +
			`<span class="icon btn-prev"> < </span>` +
			`<span class="progress"><span class="curr-page"></span> / <span class="total-pages"></span>` +
			`</span><span class="icon btn-next"> > </span></div></div>`;
	}
};