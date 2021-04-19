module.exports = {
	name: 'buy',
	cooldown: 5,
	usage: `<item> <amount>`,
	args: true,
	execute(message, args) {
		const JSONdb = require(`simple-json-db`);
		const { guild, author } = message;
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		const coins = userInfo.get("coins") || 0;
		const userItems = userInfo.get("items") || {};
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON()
		const amount = args[1] || 1;//raw gamer :>
		if (amount < 0) return message.channel.send(`You can't buy a negative number!
		tryna abuse buy/sell prices no0b?`)
		if (args[1] === "0") message.channel.send(`You can't buy zero items!`);
		let itemName;
		for (var itemid in shopItems) {
			const tRegex = new RegExp(args[0]);
			if (tRegex.test(itemid)) itemName = itemid.toString();
		}
		if (!itemName) return message.channel.send(`Idk what you're on, but I don't see any items named \`${args[0]}\``);
		let iteminfo = shopItems[itemName];
		if (iteminfo['shop'] !== true) return message.channel.send(`This item can't be bought!`);
		const price = iteminfo['price'] * amount;
		if (price > coins) return message.channel.send(`You don't have enough coins for that!`);

		const newBal = coins - price;
		let itemAmount = parseInt(userItems[itemName]) || 0;
		itemAmount += parseInt(amount);
		userItems[itemName] = itemAmount
		userInfo.set("items", userItems);
		userInfo.set("coins", newBal);
		message.channel.send(`Successfully bought ${amount} ${iteminfo['displayname']}(s) for ${price} coins`);
	}//j'existe
}