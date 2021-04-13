module.exports = {
	name: 'invite',
	description: 'Invite',
	execute(message, args) {
		const Discord = require('discord.js');
		const { guild } = message
		const exampleEmbed1 = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setDescription('Want to add me to your server? Click [here](https://discord.com/api/oauth2/authorize?client_id=822105903599058994&permissions=8&scope=bot). Also, make sure you join the official discord server https://discord.gg/GDnx2qqsdz and make sure you add [BruhBot](https://discord.com/oauth2/authorize?client_id=818577943277469716&permissions=8&scope=bot)!');
		const member = guild.members.cache.get(message.author.id);
		member.send(exampleEmbed1).catch(error => {
			message.channel.send(`<@${message.author.id}> it seems as though you have DM's disabled, here is the info:`);
			message.channel.send(exampleEmbed1);
		});
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setTitle(`Invite`)
			.setDescription(`<@${message.author.id}>, I sent you the invite link. **Please check your dms!**`);
		message.reply(exampleEmbed)
	},
};