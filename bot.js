'use strict';

require('dotenv').config();//default on repl???
const fs = require('fs');
const token = process.env.TOKEN
const Discord = require('discord.js');
const JSONdb = require(`simple-json-db`);
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], intents: [Discord.Intents.ALL]});
client.login(token)
let clientInfo = new JSONdb(`./client.json`)
client.on('debug', console.log);
client.on('error', console.error)
const log = require(`./commands/setup/logs.js`);
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		if (!command.name) return;
		command.category = folder; 
		client.commands.set(command.name, command);
	}	
}
if (client.shard.parentPort) {
	client.shard.parentPort.on("message", message => {
		if (message.type !== 'voteID') return false;

		const user = client.users.cache.get(message.data.voteID);
		if (!user) return false;
		else {
			if (client.channels.cache.get('831197619929481259')) client.channels.cache.get('831197619929481259').send(`${user.tag} voted for Eternity, thanks!`);
			user.send(`Thanks for voting! You have received your 30k coins, and you can vote again in 12 hours`) 
			const JSONdb = require(`simple-json-db`);
			const userInfo = new JSONdb(`./users/${user.id}.json`);
			const coins = userInfo.get("coins") || 0;
			userInfo.set("coins", coins + 30000)
		}
	})
}
if (process) {
	process.on("message", message => {
		if (message.type !== 'voteID') return false;

		const user = client.users.cache.get(message.data.voteID);
		if (!user) return false;
		else {
			if (client.channels.cache.get('831197619929481259')) client.channels.cache.get('831197619929481259').send(`${user.tag} voted for Eternity, thanks!`);
			user.send(`Thanks for voting! You have received your 30k coins, and you can vote again in 12 hours`) 
			const JSONdb = require(`simple-json-db`);
			const userInfo = new JSONdb(`./users/${user.id}.json`);
			const coins = userInfo.get("coins") || 0;
			userInfo.set("coins", coins + 30000)
		}
	})
}

client.on(`shardReady`, async shard => {
	if (client.shard.count - 1 == shard) {
		const amount1 = await client.shard.fetchClientValues(`guilds.cache.size`);
		console.log(client.shard.count - 1)
		const amount = amount1.reduce((acc, am) => acc + am, 0);
		client.shard.broadcastEval(`
			this.user.setPresence({ 
				status: 'online',
				activity: {
					name: 'e!help | eternitydc.xyz | ${amount} guilds | ${client.shard.count} shards',
					type: 'WATCHING'
				}
			});
		`)
	}
})
client.on(`guildMemberUpdate`, (oldMember, newMember) => {
	const { guild } = oldMember;
	if (guild.id !== `821903342338179132`) return;
	console.log(`test`)
	if (oldMember.roles.cache.get(`826116686864318515`) || !newMember.roles.cache.get(`826116686864318515`)) return;
	if (oldMember.roles.cache.get(`826116686864318515`) &&  !newMember.roles.cache.get(`826116686864318515`)) {
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${newMember.id}.json`);
		userInfo.set("boosting", false);
	}
	if (!oldMember.roles.cache.get(`826116686864318515`) && newMember.roles.cache.get(`826116686864318515`)) {
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${newMember.id}.json`);
		let coins = userInfo.get("coins") || 0;
		userInfo.set("boosting", true);
		coins += 500000;
		userInfo.set("coins", coins);
		newMember.send(`You now have double xp, and you have received 50k coins!`)
	}
})
const { sync } = require(`./sync.js`);
const { run } = require(`./levels.js`)
const antiad = require(`./commands/admin/ad.js`);
// 819283598879883334
client.shard.parentPort.on('UnhandledPromiseRejection', error => {
	console.error(error)
});

client.on('guildCreate', async guild => {
	let servers1 = clientInfo.get("servers");
	clientInfo.set("servers", servers1 + 1);
	servers1 += 1
	let users7 = 0
	client.guilds.cache.forEach(guild => {
		guild.members.cache.forEach(member => {
			users7 += 1
		})
	})
	const amount1 = await client.shard.fetchClientValues(`guilds.cache.size`);
	const amount = amount1.reduce((acc, am) => acc + am, 0);
	client.user.setPresence({ 
		status: `online`,
		activity: {
			name: `e!help | eternitydc.xyz | ${amount} guilds | ${client.shard.count} shards`,
			type: 'WATCHING'
		}
	});
	if (!fs.existsSync(`./servers/${guild.id}.json`)) fs.writeFileSync(`./servers/${guild.id}.json`, '');
	console.log(guild);
	const owner = client.users.cache.get(guild.ownerID);
	client.shard.broadcastEval(`this.channels.cache.get('828320940534136882').send('${owner.tag} added Eternity, thanks!')`);
	owner.send(`https://eternitydc.xyz \nIf you are having troubles, join the discord! (https://discord.gg/GDnx2qqsdz), and make sure to upvote! https://top.gg/bot/822105903599058994/vote`).catch(error => console.error)
});
client.on(`debug`, debug => {
	console.log(debug)
})
client.on(`guildDelete`, async guild => {
	let servers2 = clientInfo.get("servers")
	clientInfo.set("servers", clientInfo.get("servers") - 1);
	servers2 = servers2 - 1
	let users7 = 0;
	const owner = client.users.cache.get(guild.ownerID);
	client.shard.broadcastEval(`this.channels.cache.get('828320940534136882').send('${owner.username}#${owner.discriminator} removed Eternity, oof')`)
	client.guilds.cache.forEach(guild => {
		guild.members.cache.forEach(member => {
			users7 += 1
		})
	})
	const amount1 = await client.shard.fetchClientValues(`guilds.cache.size`);
	const amount = amount1.reduce((acc, am) => acc + am, 0);
	client.user.setPresence({ 
		status: `online`,
		activity: {
			name: `e!help | eternitydc.xyz | ${amount} guilds | ${client.shard.count} shards`,
			type: 'WATCHING'
		}
	});
})
const inviteJoin = require(`./commands/admin/invitejoin.js`);

client.once('ready', async () => {
	console.log(client.shard.ids)
	run(client);
	antiad.start(client);
	inviteJoin(client);
	log(client);
	let channelName = "general" 
	sync(client);
});

const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.on('message', message => {
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
		console.log(error)
	}
});
console.log(`e`);