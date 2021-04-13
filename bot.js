require('dotenv').config();
const fs = require('fs');
const token = process.env.TOKEN
const Discord = require('discord.js');
const JSONdb = require(`simple-json-db`);
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER'], intents: [Discord.Intents.ALL], shards: 'auto' });
let clientInfo = new JSONdb(`./client.json`)
client.login(token);
const log = require(`./commands/setup/logs.js`);
client.commands = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
		client.commands.set(command.category, folder);
	}	
}
const { sync } = require(`./sync.js`);
const antiad = require(`./commands/admin/ad.js`);
// 819283598879883334
process.on('UnhandledPromiseRejectionWarning', error => {

});
const Topgg = require("@top-gg/sdk");
const express = require("express");

const app = express();

const webhook = new Topgg.Webhook(process.env.AUTH);

app.post("/vote", webhook.middleware(), (req, res) => {
  // req.vote will be your vote object, e.g
  const channel = client.channels.cache.get(`831197619929481259`);
	const { guild } = channel;
	console.log(req.vote.user);
	const user = client.users.cache.get(req.vote.user);
	channel.send(`${user.username}#${user.discriminator} voted for Eternity, ty!`)
});

app.listen(8080);
client.on('guildCreate', guild => {
	let servers1 = clientInfo.get("servers");
	
	clientInfo.set("servers", servers1 + 1);
	servers1 += 1
	let users7 = 0
	client.guilds.cache.forEach(guild => {
		guild.members.cache.forEach(member => {
			users7 += 1
		})
	})
	client.user.setPresence({ 
		status: `online`,
		activity: {
			name: `e!help in ${servers1} servers for ${users7} users.`,
			type: 'WATCHING'
		}
	});
	if (!fs.existsSync(`./servers/${guild.id}.json`)) fs.writeFileSync(`./servers/${guild.id}.json`, '');
	console.log(guild);
	const newGuild = client.channels.cache.get('828320940534136882');
	const owner = client.users.cache.get(guild.ownerID);
	newGuild.send(`${owner.username}#${owner.discriminator} added Eternity, thanks!`);
	owner.send(`If you are having troubles, join the discord! (https://discord.gg/GDnx2qqsdz), and make sure to upvote! https://top.gg/bot/822105903599058994/vote`).catch(error => console.error)
});

client.on(`guildDelete`, async guild => {
	let servers = clientInfo.get("servers")
	clientInfo.set("servers", clientInfo.get("servers") - 1);
	servers = servers - 1
	let users7 = 0;
	const newGuild = client.channels.cache.get('828320940534136882');
	const owner = client.users.cache.get(guild.ownerID);
	client.guilds.cache.forEach(guild => {
		guild.members.cache.forEach(member => {
			users7 += 1
		})
	})
	client.user.setPresence({ 
		status: `online`,
		activity: {
			name: `e!help in ${servers} servers for ${users7} users.`,
			type: 'WATCHING'
		}
	});
	newGuild.send(`${owner.username}#${owner.discriminator} removed Eternity, oof`);
})
const inviteJoin = require(`./commands/admin/invitejoin.js`);

client.once('ready', () => {
	antiad.start(client);
	inviteJoin(client);
	log(client);
	let servers = clientInfo.get("servers");
	let abce = 0
	let users7 = 0
	client.guilds.cache.forEach(guild => {
		guild.members.cache.forEach(member => {
			users7 += 1
		})
	})
	client.user.setPresence({ 
		status: `online`,
		activity: {
			name: `e!help in ${servers} servers for ${users7} users.`,
			type: 'WATCHING'
		}
	});
	let channelName = "general" 
	sync(client);
	const channel = client.channels.cache.find(channels => {
		return channels.name === channelName;
	});
});
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
client.on('message', message => {
	const { guild } = message;
	
	if (!guild) {
		return;
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
		return message.reply("I would say the same, but I am simply a NodeJS project always running so I am physically incabable of love, but if you want me to like you more just add me to your server ;)")
	}
	const [, matchedPrefix] = message.content.match(prefixRegex);
	const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();
	if (!client.commands.has(commandName)) return;
	const command = client.commands.get(commandName);
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
			if (!authorPerms || !authorPerms.has(command.permissions) && message.author.id !== "729864813467140206") {
				return message.reply(`ERROR: Missing permissions: ${command.permissions}`);
			}
			
		}
		if (typeof command.execute !== "function") return;
		command.execute(message, args, client, embed);
		if (command.deleted === true) return message.delete();
	} catch (error) {
		
	}
});
console.log(`e`);
