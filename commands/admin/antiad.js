module.exports = {
	name: 'antiad',
	args: true,
	minArgs: 2,
	usage: '<on/off> <@role minimum role that can bypass> <#channels that can bypass>',
	permissions: 'ADMINISTRATOR',
	deleted: true,
	execute(message, args, client) {
		const { guild, member, content } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const toggle = args[0];
		const roleid = message.mentions.roles.first().id;
		const role2 = guild.roles.cache.get(roleid);
		const pos = role2.rawPosition;
		guildInfo.set("bypasspos", pos);
		const channels = message.mentions.channels.map(channel => channel.id);
		for (i = 0; i < channels.length; i++) {
			let channel = channels[i];
			guildInfo.set(`bypass-${channel}`, true);
		}
		if (toggle == "on") {
			guildInfo.set("antiad", true);
		}
		else {
			guildInfo.set("antiad", false);
		}
	}
}