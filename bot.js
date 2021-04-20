
require('dotenv').config();//default on repl???
const fs = require('fs');
const token = process.env.TOKEN
const Discord = require('discord.js');
const JSONdb = require(`simple-json-db`);
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'], intents: [Discord.Intents.ALL]});
client.login(token)
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
require(`./ExtendedMessage`);
let clientInfo = new JSONdb(`./client.json`)
const log = require(`./commands/setup/logs.js`);
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
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
			if (client.channels.cache.get('831197619929481259')) client.channels.cache.get('831197619929481259').send(`${user.tag} voted for Eternity and got \`30k\` coins!`);
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
console.log(`e`);