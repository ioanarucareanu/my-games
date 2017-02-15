(function() {
	'use strict';

	/**
	 * The Game class.
	 */
	class Game {
		/**
		 * Constructor for every game object.
		 * @param name - the name of the game
		 * @param short - the short name, used also as identifier
		 * @param url - the play url
		 * @param tags - the game's tags
		 * @param hasBoosters - flag indicating whether the game has boosters or not
		 * @param used - flag indicating whether the game has been already saved by the user
		 */
		constructor(name, short, url, tags, hasBoosters, used = false) {
			this.name = name;
			this.short = short;
			this._url = url;
			this.tags = tags;
			this.hasBoosters = hasBoosters;
			this.used = used;
		}

		get url() {
			return `http://royal1.midasplayer.com${this._url}`;
		}
		smallImage() {
			return `http://royal1.midasplayer.com/images/games/${this.short}/${this.short}_60x60.gif`;
		}
		middleImage() {
			return `http://royal1.midasplayer.com/images/games/${this.short}/${this.short}_81x46.gif`;
		}
		thumbnail() {
			return `http://royal1.midasplayer.com/images/games/${this.short}/dumps/screen_${this.short}.gif`;
		}
		thumbnailMobile() {
			return `http://royal1.midasplayer.com/images/games/${this.short}/${this.short}_170x80.gif`;
		}
		largeImage() {
			return `http://royal1.midasplayer.com/images/games/${this.short}/tournamentPage/${this.short}_764x260.jpg`;
		}
	}
	window.Game = Game;
})();