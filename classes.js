const JSONdb = require(`simple-json-db`);
class Utils {
	constructor(min, max) {
		this.min = min,
		this.max = max
	}
	static randomInt = Math.floor(Math.random() * (this.max - this.min)) + this.min;
	//quoi est-ce!?
}
class Coins {
	constructor(user) {
		this.db = new JSONdb(`users/${user.id}.json`),
		this.val = db.get("coins") || 0
	}
	Profit(moneyz = Number) {
		this.db.set("coins", this.val + moneyz);
		this.val += moneyz;
	}
	Deduct(moneyz = Number) {
		this.db.set("coins", this.val - moneyz);
		this.val -= moneyz;
	}
	static Balance = this.val;
}
module.exports = {
	Utils: Utils,
	Coins: Coins
}