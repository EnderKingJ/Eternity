const fs = require(`fs`);
module.exports = {
	name: 'chatlog',
	args: true,
	usage: `<create, read, list, fileread, or delete> <number of messages or name of log (for deleting/reading)> <name of log (no spaces)>`,
	minArgs: 1,
	permissions: `MANAGE_GUILD`,
	description: `Create / delete a chatlog.`,
	async execute(message, args, client) {
		const { guild, channel } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const action = args[0];
		const number = parseInt(args[1]);
		const deletename = args[1];
		args.shift();
		args.shift();
		const name = args[0]
		if (args[1]) return message.channel.send(`There cannot be spaces in the name`)
		const chatlogs = guildInfo.get(`chatlogs`) || {};
		console.log(action);
		if (action !== "create" && action !== "delete" && action !== "read" && action !== "list" && action !== "fileread") return message.channel.send(`Please put create, read, fileread, list, or delete.`);
		async function getMessages(channel, limit) {
			const sum_messages = [];
			let last_id;
			while (true) {
				const options = { limit: 100 };
				if (last_id) {
					options.before = last_id;
				}

				const messages = await channel.messages.fetch(options);
				sum_messages.push(...messages.array());
				last_id = messages.last().id;

				if (messages.size != 100 || sum_messages >= limit) {
					break;
				}
			}
			return sum_messages;
		}
		if (action === "list") {
			message.channel.send(`${guildInfo.get("logsnames") ? `Your chatlogs are: ${guildInfo.get("logsnames")[1] ? guildInfo.get("logsnames").join(', ') : guildInfo.get("logsnames")[0] }` : "No chatlogs were found."}`)
		}
		else if (action === "delete") {
			if (!chatlogs[deletename]) return message.channel.send(`There is no chatlog with that name.`);
			else {
				delete chatlogs[deletename];
			}
			message.channel.send(`Deleted chatlog ${deletename}`)
			let names = guildInfo.get("logsnames");
			for (i = 0; i < names.length; i++) {
				if (names[i] === deletename) {
					delete names[i]
				}
			}
			guildInfo.set("logsnames", names);
			return guildInfo.set("chatlogs", chatlogs);
		}
		else if (action === "create") {
			if (chatlogs[name]) return message.channel.send(`There is already a backup with that name.`);
			const msg = await message.channel.send(`Creating chatlog, this may take a bit...`).then(m => m);
			const messages = [];
			const message1 = number > 100 ? await getMessages(channel, number) : await channel.messages.fetch({limit : number, before: message.id});
			let message2 = message1.map(msg => {
				return {
					authorID: msg.author.id,
					content: msg.content
				}
			})
			chatlogs[name] = message2
			guildInfo.set("chatlogs", chatlogs);
			let names = guildInfo.get("logsnames") || []
			names.push(name)
			guildInfo.set("logsnames", names)
			return msg.edit(`Created chatlog!`)
		}
		else if (action === "read") {
			console.log(deletename)
			if (!chatlogs[deletename]) return message.channel.send(`There is no backup with this name.`);
			let logs = chatlogs[deletename]
			console.log(logs);
			let messages = ""
			for (i = 0; i < logs.length; i++) {
				if (guild.members.cache.get(logs[i].authorID)) {
					const { user } = guild.members.cache.get(logs[i].authorID)
					if (user) {
						messages += `${user.username}#${user.discriminator}: ${logs[i].content}\n`
					}
				}
			}
			messages = messages.split("\n");
			messages.reverse()
			messages = messages.join('\n');
			message.channel.send(`${messages}`, { split: true, disableMentions: 'all'});
		}
		else if (action === "fileread") {
			console.log(deletename)
			if (!chatlogs[deletename]) return message.channel.send(`There is no backup with this name.`);
			let logs = chatlogs[deletename].map(msg => msg);
			let messages = ""
			for (i = 0; i < logs.length; i++) {
				if (guild.members.cache.get(logs[i].authorID)) {
					const { user } = guild.members.cache.get(logs[i].authorID)
					if (user) {
						messages += `${user.username}#${user.discriminator}: ${logs[i].content}\n`
					}
				}
			}
			messages = messages.split("\n");
			messages.reverse()
			messages = messages.join('\n');
			message.channel.send(`Chatlog: `, { split: true, files: { attachment: messages} });
		}
	}
}