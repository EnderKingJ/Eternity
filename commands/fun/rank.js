module.exports = {
	name: 'rank',
	description: `Gives the rank of another user or yourself`,
	async execute(message, args) {
		const { guild, member } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const cases = message.mentions.users.first() || message.author;
		const users = guildInfo.get("levelusers") || {};
		const userInfo = users[cases] || {};
		const getNeededXP = (level) => { 
			return level ** 2 * 80;//80l^2!?
		}
		const xp = userInfo["xp"] || 0;
		const level = userInfo["level"] || 1;
		const canvacord = require(`canvacord`);
		const rank = new canvacord.Rank()//rank? more like h
			.setAvatar(cases.displayAvatarURL({ dynamic: true }))
			.setCurrentXP(xp)
			.setLevel(level)
			.setNeededXP(getNeededXP(level))
			.setUsername(cases.username)
			.setDiscriminator(cases.discriminator)
			.setProgressBar(`#FFFFFF`, "GRADIENT", true);
		const Discord = require(`discord.js`);
		rank.build().then(data => {
			const attachment = new Discord.MessageAttachment(data, `rankcard.png`);
			message.channel.send(attachment).catch(error => {
				console.log(`permission error`);
			});
		})
	}
}