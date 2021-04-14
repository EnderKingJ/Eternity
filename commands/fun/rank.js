module.exports = {
	name: 'rank',
	description: `Gives the rank of another user or yourself`,
	async execute(message, args) {
		const { guild, member } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const axios = require(`axios`);

		const cases = message.mentions.users.first() || message.author;
		const users = guildInfo.get("levelusers") || {};
		const userInfo = users[cases.id] || {};
		const getNeededXP = (level) => { 
			return level ** 2 * 80;//80l^2!?
		}
		const xp = userInfo["xp"] || 0;
		const level = userInfo["level"] || 1;
		const canvas = require(`discord-canvas`);
		const url = cases.displayAvatarURL({dynamic: true, format: 'png'})
		console.log(url)
		const fs = require(`fs`);
			//quoi!?
		const rank = await new canvas.RankCard()
			.setXP("current", xp)
			.setAvatar(url)
			.setXP("needed", getNeededXP(level))
			.setLevel(level)
			.setUsername(cases.tag)//bruh just use tag
			.toAttachment();
		const Discord = require(`discord.js`);
		const attachment = new Discord.MessageAttachment(rank.toBuffer(), 'rankcard.png')
		message.channel.send(attachment).then(() => {
			console.log("h");
		}, () => {
			console.log("no e");
		});
		// :pray:
	}
}