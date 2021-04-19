module.exports = {
	name: `item`,
	args: true,
	usage: `<item>`,
	maxArgs: 1,
	execute(message, args) {
		const { author } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		const userItems = userInfo.get("items");
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON();
		const item = args[0];
		const Discord = require(`discord.js`);
		const itemEmbed = new Discord.MessageEmbed();
		let itemName;
		console.log(`test`)
		for (itemid in shopItems) {
			if (itemid == item) {
				itemName = itemid;
				break;
			}
		}
		if (!itemName) message.channel.send(`There is no item with the name of \`${item}\`!`);
		const itemInfo = shopItems[itemName];
		const price = (itemInfo['price'] ? itemInfo['price'] + ' coins' : null) || `Not buyable`;
		const sell = (itemInfo['sell'] ? itemInfo['sell'] + ' coins' : null) || `Not sellable`;
		const displayName = itemInfo['displayname'];
		const description = itemInfo['description'];
		itemEmbed.setTitle(displayName);
		itemEmbed.setDescription(`ID: \`${itemName}\`\nPrice: ${price}\nSell price: ${sell}\nDescription: ${description}`);
		message.reply(itemEmbed);
	}
}