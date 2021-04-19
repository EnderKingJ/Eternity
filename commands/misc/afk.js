module.exports = {
	name: 'afk',
	args: true,
	minArgs: 1,
	usage: `<reason>`,
	description: `Go afk`,
	execute(message, args) {
		const { guild, author } = message;
		const reason = args[1] ? args.join(' ') : args[0];
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		userInfo.set("afk", reason)
		message.reply(`Successfully set your afk for \`${reason}\``);
	}
}