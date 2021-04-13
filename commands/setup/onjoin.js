const JSONdb = require('simple-json-db');
const fs = require('fs');
module.exports = {
	name: 'onjoin',
	args: true,
	description: 'What role to give on join, and the channel to send join messages in (optional)',
	usage: '<@role> <@channel> <join message>',
	permissions: 'MANAGE_GUILD',
	execute(message, args, client) {
		args.shift();
		args.shift();
		const joinMessage = args.join(' ');
		if (!fs.existsSync(`./servers/${message.guild.id}.json`)) fs.writeFileSync(`./servers/${message.guild.id}.json`, '');
		let guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		if (message.mentions.channels) {
			guildInfo.set(`joinchannel`, message.mentions.channels.first().id);
		}
		if (message.mentions.roles.first()) guildInfo.set(`rolejoinid`, message.mentions.roles.first().id);
		if (joinMessage && joinMessage !== "" && message.mentions.channels) {
			guildInfo.set("joinmessage", joinMessage)
		}
	}
}