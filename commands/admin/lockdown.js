module.exports = {
	name: 'lockdown',
	args: true,
	usage: `<on/off> <kick/ban>`,
	permissions: 'ADMINISTRATOR',
	deleted: true,
	execute(message, args, client) {
		const method = args[1];
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		if (method !== "kick" && method !== "ban" && method) {
			return message.reply(`You need to put either \`kick\` or \`ban\``);
		}
		if (args[0] == "on") {
			message.channel.send(`Successfully put on lockdown`);
			guildInfo.set("lockdown", true);
			guildInfo.set("lockmethod", method);
		}
		else {
			message.channel.send(`Turned off lockdown`);
			guildInfo.set("lockdown", false);
		}
		client.on("guildMemberAdd", async member => {
			const lmethod = guildInfo.get("lockmethod");
			await member.send(`The server is currently on lockdown, so you have been ${lmethod == "ban" ? `${lmethod}ned` : `${lmethod}ed`}. Please contact an admin if this was a mistake.`);
			if (lmethod == "ban") {
				member.ban()
			}
			if (lmethod == "kick") {
				member.kick();
			}
		})
	}
}