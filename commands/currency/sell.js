module.exports = {
	name: 'sell',
	args: true,
	maxArgs: 2,
	usage: '<item> <amount>',
	execute(message, args) {
		const {author} = message;
		const item = args[0];
		let isAll;
		let amount = parseInt(args[1]) || 1;
		if (amount < 0) return message.channel.send(`You can't sell a negative number!
		srry no coin batteries 4 u`)
		if (args[1] === "0") message.channel.send(`You can't sell zero items!`);
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`)
		const userItems = userInfo.get("items");
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON();
		let itemName;
		for (itemid in shopItems) {
			const tRegex = new RegExp(args[0]);
			if (shopItems[args[0]] || tRegex.test(itemid)) itemName = itemid.toString();
		}
		const itemInfo = shopItems[item];
		if (!shopItems[item]) return message.channel.send(`There is no item named \`${item}\`!`);
		if (!userItems[item]) return message.channel.send(`You do not have an item named \`${item}\`!`);
		console.log(userItems[item])
		if (args[1] === "all" || args[1] === "max") amount = parseInt(userItems[item])
		console.log(`BOBOOBRKOPJBO ${amount}`)
		if (!itemInfo['sell']) return message.channel.send(`This item cannot be sold!`);
		if (userItems[item] < amount) return message.channel.send(`You can't sell more than you have!`);
		const addedBal = itemInfo['sell'] * amount;
		userItems[item] -= amount;
		let coins = userInfo.get("coins");
		coins += addedBal;
		userInfo.set("items", userItems);
		userInfo.set("coins", coins);
		message.channel.send(`Successfully sold ${amount} ${amount === 1 ? item : itemInfo["plural"]} for ${addedBal} coins!`);
	}
}//h