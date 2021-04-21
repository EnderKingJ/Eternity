const JSONdb = require(`simple-json-db`);
const Discord = require(`discord.js`)
module.exports = {
	name: `message`,
	execute(message, client) {
			const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const cooldowns = new JSONdb(`./cooldowns.json`);
			const { guild } = message;
			
			if (!guild) {
				return console.log(`hec`)
			}
			let guildInfo = new JSONdb(`./servers/${guild.id}.json`);
			if (!guildInfo.has("prefix")) guildInfo.set("prefix", "e!");
			let prefix = guildInfo.get("prefix");
			const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
			const embed = (description, title, color) => {
				return new Discord.MessageEmbed()
					.setTitle(title)
					.setColor(color)
					.setDescription(description);
			}
			if (!prefixRegex.test(message.content)) return;
			if (message.content.toLowerCase() == "ily eternity" | "i love eternity") {
				return message.reply("I would say the same, but I am simply a NodeJS project always running so I am physically incabable of love\nbut if you want me to like you more just add me to your server ;)")
			}
			const [, matchedPrefix] = message.content.match(prefixRegex);
			const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
			const commandName = args.shift().toLowerCase();
			const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));
			if (!command) return;
			if (!cooldowns.has(command.name)) {
				cooldowns.set(command.name, {})//pourquoi?
			}
			const cooldownAmount =	(command.cooldown || 1) * 1000
			const timestamps = cooldowns.get(command.name);
			if (timestamps[message.author.id] && (timestamps[message.author.id] + cooldownAmount) > Date.now()) {
				const expirationTime = timestamps[message.author.id] + cooldownAmount;
				if (Date.now() < expirationTime) {
					let timeLeft = (expirationTime - Date.now()) / 1000;
					let days = Math.floor(timeLeft / 86400);
					timeLeft %= 86400;
					let hours = Math.floor(timeLeft / 3600);
					timeLeft %= 3600;
					let minutes = Math.floor(timeLeft / 60);
					let seconds = Math.floor(timeLeft % 60);
					let reply = `Please wait `
					if (days !== 0 && days) {
						reply += `${days} days, `
					}
					if (hours !== 0 && hours) {
						reply += `${hours} hours, `
					}
					if (minutes && minutes !== 0) {
						reply += `${minutes} minutes, `
					}
					if (seconds && seconds !== 0) {
						if ((days !== 0 && days) || (hours !== 0 && hours) || (minutes && minutes !== 0)) reply += `and `
						reply += `${seconds} seconds`
					}
					return message.reply(`${reply} before reusing the \`${command.name}\` command.`);
				}
			}
			timestamps[message.author.id] = Date.now();
			cooldowns.set(command.name, timestamps)
			function delet() {
				delete timestamps[message.author.id]
				cooldowns.set(command.name, timestamps)
			}
			setTimeout(() => delet, cooldownAmount);
			try {
				if (command.args && !args.length) {
					let data = [];
					data.push(`**Name:** ${command.name}`);

					if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
					if (command.description) data.push(`**Description:** ${command.description}`);
					if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

					data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
					let reply = embed(data.join("\n"), `Invalid Arguments`, `FF0000`);
					return message.channel.send(reply);
				}
				if (command.minArgs) {
					if (command.minArgs > args.length) {
						let data = [];
						data.push(`**Name:** ${command.name}`);

						if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
						if (command.description) data.push(`**Description:** ${command.description}`);
						if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

						data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
						let reply = embed(data.join("\n"), `Invalid Arguments`, `FF0000`);
						return message.channel.send(reply);
					}
				}
				if (command.maxArgs) {
					if (command.maxArgs < args.length) {
						let data = [];
						data.push(`**Name:** ${command.name}`);

						if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
						if (command.description) data.push(`**Description:** ${command.description}`);
						if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

						data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);
						let reply = embed(data.join("\n"), `Invalid Arguments`, `FF0000`);
						return message.channel.send(reply);
					}
				}
				if (command.permissions) {
					const authorPerms = message.channel.permissionsFor(message.author);
					const clientPerms = message.channel.permissionsFor(client.user);
					if (!authorPerms || !authorPerms.has(command.permissions) && message.author.id !== "729864813467140206") {
						return message.reply(`ERROR: Missing permissions: ${command.permissions}`);
					}
					
				}
				if (command.ownerOnly) {
					if (message.author.id !== '729864813467140206') return message.channel.send(`i see a fool tryna use owner only commands`)
				}
				if (typeof command.execute !== "function") return;
				command.execute(message, args, client, embed)
				if (command.deleted === true) return message.delete().catch(error => {

				});
			} catch (error) {
				console.error("\033[91m"+error+"\033[0m");
			}
	}
}