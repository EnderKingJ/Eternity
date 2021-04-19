module.exports = {
	name: `bal`,
	description: `Show how many of dem coins you have (or another person)`,
	execute(message) {
		const user = message.mentions.users.first() || message.author;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${user.id}.json`);
		const coins = userInfo.get("coins") || 0;
		const Discord = require(`discord.js`);
		const embed = new Discord.MessageEmbed()
			.setAuthor(user.tag, user.displayAvatarURL({dynamic: true}))
			.setTitle(`Coins`)
			.setDescription(`${message.mentions.users.first() ? `<@${user.id}> has` : `You have`} **${coins}** coins`);
		message.channel.send(embed);
	}
}