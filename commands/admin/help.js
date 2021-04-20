const { prefix } = require('../../config.json');

const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const data1 = [];
		const { commands } = message.client;
		const name = args[0] ? args[0].toLowerCase() : null;
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));
		const Discord = require(`discord.js`);
		/*if (!name && nCategory) {
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
		}*/
		if (name) {
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
			let jerry = 0;
			for (var catname in categories) {
				cats1.push(categories[catname]);
			}
			let b;
			for (var i = 0; i /*hai*/< cats1.length; i++) {
				b = i;
				if (cats1[i].length > 10) b = 0;
				cats.push(cats1[b].splice(0, 10));
			}
			console.log(cats1.length / 10)
			const generateEmbed = (start) => {
				const daCmds = [];
				let categor;
				const current = cats[start]
				if (current === undefined) console.log(start)
				const embed = new Discord.MessageEmbed()
					.setAuthor(message.author.tag,
					message.author.displayAvatarURL({ dynamic: true }))
					.setTimestamp(Date.now())
				let desc = `\`\`\`js\n`
				current.forEach(cmd => {
					if (!categor) {
						categor = cmd.category
						embed.setTitle(categor)
					}
					if (cmd.name) desc += `${cmd.name} - ${cmd.description ? cmd.description : "No description"}\n`;
				})
				desc += `\`\`\``
				embed.setDescription(desc);
				return embed
			}
			const author = message.author

			message.channel.send(generateEmbed(0)).then(async message => {
				await message.react('⬅️')
				if (cats.length <= 1) return
				message.react('➡️')
				const collector = message.createReactionCollector(
					(reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
					{time: 120000}
				)

				let currentIndex = 0
				collector.on('collect', async (reaction, user) => {
					// remove the existing reactions
					await message.reactions.resolve(reaction.emoji.name).users.remove(user.id);
					// increase/decrease index
					reaction.emoji.name === '⬅️' ? currentIndex -= 1 : currentIndex += 1
					// edit message with new embed
					if (currentIndex < 0) currentIndex += 1;
					if (currentIndex + 1 > cats.length) currentIndex -= 1;
					message.edit(generateEmbed(currentIndex))
					console.log()
				})
			})
		}

		// ... // quoi?
	},
};