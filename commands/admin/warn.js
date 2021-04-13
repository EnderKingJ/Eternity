module.exports = {
	name: 'warn',
	permissions: 'MANAGE_MESSAGES',
	args: true,
	usage: "<@user> <reason>",
	deleted: true,
	execute(message, args) {
		const Discord = require('discord.js');
		const JSONdb = require(`simple-json-db`);
		const guild = message.guild;
		const fs = require(`fs`);
		args.shift();
		const guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		const reason = args.join(' ');
		const user = guild.members.cache.get(message.mentions.users.first().id)
		const self = guild.members.cache.get(message.author.id);
		let sposition = 0;
		let position = 0;
		console.log(self)
		self.roles.cache.forEach(role => {
			sposition += role.rawPosition;
		});
		user.roles.cache.forEach(role => {
			position += role.rawPosition;
		});
		if (position > sposition || position == sposition) { return message.reply(`You cannot do this, as the user is equal to or higher rank than you.`) }
		const embed1 = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setDescription(`** *${user.user.username} has been warned.* **`);
		message.channel.send(embed1);
		const newEmbed = new Discord.MessageEmbed()
			.setColor('#FF0000')
			.setDescription(`You were warned by ${message.author.username} for ${reason}.`);
		user.send(newEmbed);
		guildInfo.set(`${user.user.id}warns`, guildInfo.get(`${user.user.id}warns`) ? guildInfo.get(`${user.id}warns` + 1) : 1);
	}
}