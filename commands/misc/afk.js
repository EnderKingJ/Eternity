module.exports = {
	name: 'afk',
	args: true,
	minArgs: 1,
	usage: `<reason>`,
	description: `Go afk`,
	execute(message, args) {
		const { guild } = message;
		const reason = args[1] ? args.join(' ') : args[0];
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const afkUsers = guildInfo.get("afkusers") || {};
		afkUsers[message.author.id] = reason;
		message.reply(`Successfully set your afk for \`${reason}\``);
		setTimeout(() => guildInfo.set('afkusers', afkUsers), 500)
	}
}