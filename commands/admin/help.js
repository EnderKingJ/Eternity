const { prefix } = require('../../config.json');

const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: '[category] [command name]',
	execute(message, args) {
		const data = [];
		const data1 = [];
		const { commands } = message.client;
		const name = args[1] ? args[1].toLowerCase() : null;
		const nCategory = args[0] ? args[0].toLowerCase() : null;
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		const Discord = require(`discord.js`);
		if (!name && nCategory) {
			const cmds = commands.map(c => {
				return c;
			})//crosis = gamer
			const categories = {};
			const daCats = [];
			cmds.forEach(cmd => {
				if (!categories[cmd.category]) {
					categories[cmd.category] = [];
					daCats.push(cmd.category);
				}
				let category = categories[cmd.category];
				category.push(cmd);
				categories[cmd.category] = category;
			})
			const daCmds = [];
			if (!categories[nCategory]) return message.channel.send(`There is no category named ${nCategory}`);
			categories[nCategory].forEach(cmd => {
				daCmds.push(cmd.name);
			})
			const embed = new Discord.MessageEmbed()
				.setTitle(nCategory)
				.setAuthor(message.author.tag,
				message.author.displayAvatarURL({ dynamic: true }))
				.setTimestamp(Date.now())
				.setURL(`https://eternitydc.xyz`)
				.setDescription(daCmds.join(`,\n`));
			message.channel.send(embed)
		}
		else if (name) {
			if (!command) {
				return message.reply('that\'s not a valid command!');
			}
			let cName = `${command.name}`
			let cAliases;
			let cDescription;
			let cUsage;
			if (command.aliases) cAliases = `**Aliases:** ${command.aliases.join(', ')}`
			if (command.description) cDescription = `**Description:** ${command.description}`
			if (command.usage) cUsage = `**Usage:** ${prefix}${command.name} ${command.usage}`

			let cCooldown = `**Cooldown:** ${command.cooldown || 1} second(s)`
			let cCategory = `**Category**: ${command.category}`
			const embed = new Discord.MessageEmbed()
				.setTitle(cName)
				.setAuthor(message.client.user.tag, message.client.user.displayAvatarURL({ dynamic: true }))
				.setDescription(`${cAliases ? cAliases : ""}\n${cDescription ? cDescription : ""}\n${cUsage ? cUsage : ""}\n${cCooldown}\n${cCategory}`);
			message.channel.send(embed)
		}
		else {
			// Start of pagination
			/*



			// End of pagination	
			*/		
			const cmds = commands.map(c => {
				return c;
			})//crosis = gamer
			const categories = {};
			const daCats = [];
			cmds.forEach(cmd => {
				if (!categories[cmd.category]) {
					categories[cmd.category] = [];
					daCats.push(cmd.category);
				}
				let category = categories[cmd.category];
				category.push(cmd);
				categories[cmd.category] = category;
			})
			const cats1 = [];
			const cats = [];
			for (var catname in categories) {
				cats1.push(categories[catname]);
			}
			for (i = 0; i < cats1.length; i += 10) {
				cats.push(cats1[i / 10].slice(i, i + 10));
			}
			const generateEmbed = (start) => {
				const daCmds = [];
				let categor;
				const current = cats[0][start]
				console.log(current);
				console.log(cats1[0].length)
				current.forEach(cmd => {
					daCmds.push(cmd.name);
					if (!categor) categor = cmd.category;
				})
				
				const embed = new Discord.MessageEmbed()
					.setTitle(categor)
					.setAuthor(message.author.tag,
					message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp(Date.now())
					.setURL(`https://eternitydc.xyz`)
					.setDescription(daCmds.join(`,\n`));
				return embed
			}
			const author = message.author

			message.channel.send(generateEmbed(0)).then(message => {
				if (cats[0].length <= 1) return
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
						reaction.emoji.name === '⬅️' ? currentIndex -= 1 : currentIndex += 1
						// edit message with new embed
						message.edit(generateEmbed(currentIndex))
						if (currentIndex !== 0) await message.react('⬅️')
						if (currentIndex + 1 < cats[0].length) message.react('➡️')
					})
				})
			})
		}

		// ... // quoi?
	},
};