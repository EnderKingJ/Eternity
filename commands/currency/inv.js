module.exports = {
	name: `inv`,
	cooldown: 2,
	description: `Show how many of dem items your mothers card bought`,
	execute(message, args) {
		const { guild, author } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		const userItems = userInfo.get("items");
		const shopItemsVar = new JSONdb(`./shopitems.json`);
		const shopItems = shopItemsVar.JSON();
		const Discord = require(`discord.js`);
		// start of big brain
		console.log(`hi there`)
		const inv = [];
		for (var item in userItems) {
			inv.push({
				displayname: shopItems[item]['displayname'],
				id: item,
				amount: userItems[item] 
			});
		}
		const generateEmbed = start => {
			const current = inv.slice(start, start + 5)
			console.log(current)
			const invEmbed = new Discord.MessageEmbed()
				.setTitle(`Inventory`)
				.setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }));
			current.forEach(item => {
				console.log(item)
				const displayname = item.displayname;
				const id = item.id;
				const amount = item.amount || 0;
				invEmbed.addField(`${amount} ${displayname}(s)`, `ID: ${id}`);
			});
			return invEmbed
		}

		message.channel.send(generateEmbed(0)).then(message => {
			if (inv.length <= 5) return
			message.react('➡️')
			const collector = message.createReactionCollector(
				(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
				{time: 60000}
			)

			let currentIndex = 0
			collector.on('collect', reaction => {
				// remove the existing reactions
				message.reactions.removeAll().then(async () => {
					// increase/decrease index
					reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
					// edit message with new embed
					message.edit(generateEmbed(currentIndex))
					if (currentIndex !== 0) await message.react('⬅️')
					if (currentIndex + 5 < inv.length) message.react('➡️')
				})
			})
		})
		// another start of big brain
	}
}
//raw gamer right 'ere, that's for sure