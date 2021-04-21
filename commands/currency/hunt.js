module.exports = {
	name: `hunt`,
	description: `damn son where'd you find this`,
	cooldown: 35,
	execute(message) {
		const { guild, author } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON();
		const Discord = require(`discord.js`);
		const userItems = userInfo.get("items");
		if (!userItems['huntingrifle']) return message.channel.send(`You can't shoot without a rifle!`);
		function randomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		const possibleItems = [
			"bear",
			"bird"
		]
		const addedItem = possibleItems[randomInt(0, 1)];
		const addAmount = randomInt(1, 5);
		let currentItem = userItems[addedItem] || 0;
		currentItem += addAmount;
		userItems[addedItem] = currentItem;
		userInfo.set("items", userItems);
		message.reply(`You just killed ${addAmount} ${addedItem}${addAmount == 1 ? "" : "s"}, proud of yourself!?`)
	}
}