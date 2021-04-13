module.exports = {
	name: 'vote',
	description: 'Links to vote for Eternity',
	execute(message, args) {
		const { MessageEmbed } = require(`discord.js`);
		const embed = new MessageEmbed()
			.setDescription(`[top.gg](https://top.gg/bot/822105903599058994/vote)`);
		message.channel.send(embed);
	}
}