'use strict';

module.exports = {
	name: `shop`,
	cooldown: 5,
	execute(message, args) {
		const { guild, author } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`)
		const Discord = require(`discord.js`);
		const buying = args[0] ? true : false
		// The items will be `userInfo.get("items") || [];
		const coins = userInfo.get("coins") || 0;
		const currentItems = userInfo.get("items") || [];
		// format will be item: price (for the json)
		
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON();
		if (1 == 1) {
			//hhh
			const shopEmbed = new Discord.MessageEmbed();
			shopEmbed.setTitle(`Thy SHOP`);
			shopEmbed.setDescription(`This is the shop, you can do \`e!buy [item]\` to buy any item from below.`);
			for (var itemid in shopItems) {
				let iteminfo = shopItems[itemid];
				if (iteminfo['shop'] == true) {
				const price = iteminfo['price'].toString();
				const displayname = iteminfo['displayname'].toString()
				const description = iteminfo['description'].toString()
				shopEmbed.addField(displayname, `${description}\nID: \`${itemid}\`\nPrice: **${price}** coins`);
				}
			}
			message.channel.send(shopEmbed);
		}
	}
}