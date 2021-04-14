module.exports.run = (client) => {
	client.on('message', message => {
		const { guild, member } = message
		if (message.author.bot) return;
		addXP(guild.id, message.author.id, 23, message)
	})
	const getNeededXP = (level) => level * level * 70;
	const addXP = async (guildId, userId, xpToAdd, message) => { 
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guildId}.json`);
		const users = guildInfo.get("levelusers") || {};
		const userInfo = users[userId] || {};
		userInfo["xp"] = userInfo["xp"] || 0;
		if (message.createdTimestamp - (userInfo["mtime"] || 0) < 15000) return;
		userInfo["mtime"] = message.createdTimestamp;
		userInfo["xp"] += xpToAdd;
		userInfo["level"] = userInfo["level"] || 1;
		if (userInfo["xp"] >= getNeededXP(userInfo["level"])) {
			userInfo["level"] += 1;
			message.channel.send(`GG <@${userId}>, you reached level ${userInfo["level"]}`);
		}
		users[userId] = userInfo;
		guildInfo.set("levelusers", users)
	}
}