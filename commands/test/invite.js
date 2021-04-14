module.exports = {
	name: 'invite',
	description: 'Invite',
	execute(message, args) {
		const Discord = require('discord.js');
		const { guild } = message
		const exampleEmbed1 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setDescription('https://eternity.geplcord.rf.gd/\nVote for us on [top.gg](https://top.gg/bot/822105903599058994/vote)!')
			.addFields([
				{
					name: 'What we have to offer.',
					value: `Tickets, anti advertising, roles on join, invite logger, backups, chatlogs, logs, react roles, verification, banning, kicking, muting, warning, automod, and there are new features added **every day**.`,
					inline: true
				}
			])
		const member = guild.members.cache.get(message.author.id);
		message.channel.send(exampleEmbed1)
	},
};