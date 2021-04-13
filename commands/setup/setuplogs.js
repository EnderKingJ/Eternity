module.exports = {
	name: 'setuplogs',
	permissions: 'MANAGE_GUILD',
	args: true,
	minArgs: 1,
	usage: `<#logging channel>`,
	execute(message, args) {
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const channel = message.mentions.channels.first();
		if (!channel) return message.channel.send(`Please provide a valid channel.`)
		guildInfo.set('logid', channel.id);
	}
}