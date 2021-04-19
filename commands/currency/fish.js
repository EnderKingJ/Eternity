module.exports = {
	name: `fish`,
	description: `COME HERE FISHY FISHHHHYYYY`,//lol
	cooldown: 35,
	execute(message) {
		const { guild, author } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON();
		const Discord = require(`discord.js`);
		const userItems = userInfo.get("items");
		if (!userItems['fishingpole']) return message.reply(`You gonna jump in the lake for those fish? You need a **fishing** rod for **fishing**!`);
		function randomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		const fishAmount = randomInt(1, 7);
		const isLegendary = randomInt(0, 50) === 25;// 1/50 chance
		if (isLegendary === false) {
			let currentFish = userItems['fish'] || 0;
			currentFish += fishAmount
			userItems['fish'] = currentFish;
			userInfo.set("items", userItems);
			message.reply(`You got ${fishAmount} fish, nice catch!`);
		} else {
			let currentFish = userItems['legendaryfish'] || 0;
			currentFish += 1
			userItems['legendaryfish'] = currentFish;
			userInfo.set("items", userItems);
			message.reply(`YOU CAUGHT A LEGENDARY FISH, NICE ONE!`);
		}
	}
}