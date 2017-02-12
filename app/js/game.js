class Game {

	constructor(name, short, url, tags, hasBoosters, used = false) {
		this.name = name;
		this.short = short;
		this.url = url;
		this.tags = tags;
		this.hasBoosters = hasBoosters;
		this.used = used;
	}
	smallImage() {
		return `http://royal1.midasplayer.com/images/games/${this.short}/${this.short}_60x60.gif`
	}
	middleImage() {
		return `http://royal1.midasplayer.com/images/games/${this.short}/${this.short}_81x46.gif`;
	}
	thumbnail() {
		return `http://royal1.midasplayer.com/images/games/${this.short}/${this.short}_170x80.gif`;
	}
}