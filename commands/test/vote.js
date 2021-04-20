module.exports = {
	name: 'vote',
	description: 'Links to vote for Eternity',
	execute(message, args) {
		const { MessageEmbed } = require(`discord.js`);
		const embed = new MessageEmbed()
			.setDescription(`Vote for me on [top.gg](https://top.gg/bot/822105903599058994/vote) to recieve 30k coins!`);
		message.channel.send(embed);
	}
}