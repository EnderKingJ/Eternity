module.exports = {
	name: 'antiswear',
	args: true,
	usage: `<on/off>`,
	permissions: `MANAGE_GUILD`,
	execute(message, args) {
		const { guild } = message;
		const JSONdb = require(`./require.js`).JSONdb;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const toggle = args[0];
		if (toggle !== "on" | "off") return message.channel.send(`Please provide valid arguments.`);
		if (toggle == "on") {
			guildInfo.set(`antiswear`, true)
		}
		else {
			guildInfo.set(`antiswear`, false)
		}
	}
}