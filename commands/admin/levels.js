module.exports = {
	name: 'levels',
	permissions: `MANAGE_GUILD`,
	args: true,
	minArgs: 1,
	execute(message, args) {
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		if (!args) return;
		if (args[0] == 'on' || args[0] == 'true') {
			guildInfo.set("leveltoggle", true)
			message.reply(`Levels are now on.`)
		}
		else {
			guildInfo.set("leveltoggle", false)
			message.reply(`Levels are now off.`)
		}
	}
}