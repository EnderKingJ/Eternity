module.exports = {
	name: 'snipe',
	description: 'Tells you the most recent deleted message',
	execute(message, args) {
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const Discord = require(`discord.js`)
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`)
		const recent = guildInfo.get(`${message.channel.id}-snipe`);
		console.log(recent);
		if (!recent || (Date.now() - recent.time) > 600000 ) return message.channel.send(`Nothing to snipe!`);
		console.log(`test`);
		const embed = new Discord.MessageEmbed()
			.setTimestamp(recent.time)
			.addFields([
				{
					name: `${recent.name} said...`,
					value: recent.content.toString(),
					inline: true
				}
			]);
		message.channel.send(embed);
	}
}