let htmlTemplates = {

	getGameTemplate(game) {
		let className = game.used ? 'hidden' : '';
		return `<div class="coll-item ${game.short}">` +
			`<div class="item-img" style="background-image: url('${game.thumbnail()}')" onclick="openGameView('${game.short}')"></div>` +
			`<div class="item-title"><h4>${game.name}</h4></div>` +
			`<span class="btn-save ${className}" onclick="addToPortofolio('${game.short}')"></span>` +
			`<div>`;
	},

	getPortofolioGameTemplate(game) {
		return `<div class="coll-item ${game.short}">` +
			`<span class="close" onclick="removeFromPortofolio('${game.short}')">&times;</span>` +
			`<div class="item-img" style="background-image: url('${game.thumbnail()}')" onclick="openGameView('${game.short}')"></div>` +
			`<div class="item-title"><h4>${game.name}</h4></div>` +
			`<div>`;
	},

	getAllKingGamesTemplate() {
		return `<div id="king-games" class="coll-container">` +
			`<div class="coll-header header-with-controls"><div class="coll-title"><h3>Browse</h3>` +
			`</div><div class="coll-search"><input type="text" class="search-input" id="searchKing" results="5" placeholder="Search by name" />` +
			`</div></div>` +
			`<div class="coll-grid"></div>` +
			`<div class="coll-pagination">` +
			`<span class="icon btn-prev"> < </span>` +
			`<span class="progress"><span class="curr-page"></span> / <span class="total-pages"></span>` +
			`</span><span class="icon btn-next"> > </span></div></div>`;
	}
};