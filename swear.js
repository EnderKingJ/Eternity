module.exports = (client) => {
	client.on('message', message => {
		const { guild, content, member } = message;
		const { JSONdb } = require(`./require.js`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		if (!guildInfo.get("antiswear") || guildInfo.get("antiswear") == false) return;
		const regex = (datas) => {
			return new RegExp(datas);
		}
		const authorPerms = message.channel.permissionsFor(message.author);
		if (authorPerms.has(`ADMINISTRATOR`) || authorPerms.has(`MANAGE_GUILD`) || authorPerms.has(`BAN_MEMBERS`)) return;
		if (message.author.bot) return;
		let data = content.split(' ').join('');
		let swears = ['fuck', 'shit', 'ass', 'bitch']
		for (i = 0; i < swears.length; i++) {
			if (regex(swears[i]).test(data)) {
				message.delete()
				message.channel.send(`<@${message.author.id}>, please do not use profanity in this server.`);
			}
		}
	})
}//squawk