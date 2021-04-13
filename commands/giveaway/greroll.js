module.exports = {
	name: 'greroll',
	permissions: "MANAGE_MESSAGES",
	description: "Reroll the most recent giveaway.",
	async execute(message, args) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		if (!guildInfo.get("gwinners")) return message.reply(`There is no giveaways running right now, or there is no users.`);
		else {
			const users = guildInfo.get("gwinners");
			message.channel.send(`The new winner is <@${users[getRandomInt(users.length)]}>! Congrats!`);
		}
	}
}