module.exports.run = (client) => {
	function getRandomInt(max) {
		return Math.floor(Math.random() * Math.floor(max));
	}
	client.on('message', message => {
		const { guild, member } = message
		const JSONdb = require(`simple-json-db`);
		if (!guild) return;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const userInfo = new JSONdb(`./users/${message.author.id}.json`);
		if (guildInfo.get("leveltoggle") !== true) return;
		if (message.author.bot || !guild || !member) return;
		if (userInfo.get("booster") == true) return addXP(guild.id, message.author.id, 46 + getRandomInt(40), message);
		addXP(guild.id, message.author.id, 23 + getRandomInt(20), message)
	})
	const getNeededXP = (level) => level * level * 50;
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
			userInfo["xp"] = 0;
			message.channel.send(`GG <@${userId}>, you reached level ${userInfo["level"]}`);
		}
		users[userId] = userInfo;
		guildInfo.set("levelusers", users)
	}
}