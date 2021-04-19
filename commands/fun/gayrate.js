module.exports = {
	name: `gayrate`,
	execute(message) {
		const Discord = require(`discord.js`);
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		const user = message.mentions.users.first() || message.author;
		const embed = new Discord.MessageEmbed()
			.setTitle(`Gayrate`)
			.setAuthor(`${user.tag}`, user.displayAvatarURL({dynamic:true}))
			.setDescription(`:rainbow_flag: ${getRandomInt(100)}%`);
		message.channel.send(embed);
	}
}