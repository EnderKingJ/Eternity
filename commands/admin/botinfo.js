module.exports = {
	name: 'botinfo',
	usage: '',
	description: `Get the info for Eternity`,
	execute(message, args, client) {
		let totalSeconds = (client.uptime / 1000);
		let days = Math.floor(totalSeconds / 86400);
		totalSeconds %= 86400;
		let hours = Math.floor(totalSeconds / 3600);
		totalSeconds %= 3600;
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = Math.floor(totalSeconds % 60);
		const uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
		const JSONdb = require(`simple-json-db`);
		const clientInfo = new JSONdb(`./client.json`);
		const guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		let users = 0
		client.guilds.cache.forEach(guild => {
			guild.members.cache.forEach(member => {
				users += 1
			})
		})
		const servers = clientInfo.get("servers");
		const Discord = require(`discord.js`);
		let date = (data) => new Date(Date.now() - data)
		const embed = new Discord.MessageEmbed()
			.addFields([
				{
					name: 'Uptime',
					value: `${uptime}`,
					inline: true
				},
				{
					name: 'Prefix',
					value: `${guildInfo.get("prefix")}`,
					inline: true
				},
				{
					name: 'Guilds',
					value: `${servers}`,
					inline: true
				},
				{
					name: 'Users',
					value: `${users}`,
					inline: true
				}
			]);
		message.channel.send(embed);
	}
}