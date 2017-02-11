function Game(name, short, url, tags, hasBoosters) {
	this.name = name;
	this.short = short;
	this.url = url;
	this.tags = tags;
	this.hasBoosters = hasBoosters;
}

Game.prototype.smallImage = () => `http://royal1.midasplayer.com/images/games/${short}/${short}_60x60.gif`;
Game.prototype.middleImage = () => `http://royal1.midasplayer.com/images/games/${short}/${short}_81x46.gif`;