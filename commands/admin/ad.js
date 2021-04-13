module.exports.start = (client) => {
	client.on("message", async message => {
		const { guild, member, content } = message;
		if (!guild || !member || !content) return;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const user = guild.members.cache.get(member.id);
		if (guildInfo.get("antiad") == true) {
			const isAdmin = user.roles.cache.find(role => {
				return (role.rawPosition + 1) > guildInfo.get("bypasspos");
			})
			if (content.includes(`discord.gg/`) || content.includes('https://') || content.includes('http://') || content.includes(`.com`)) {
				if (guildInfo.get(`bypass-${message.channel.id}`) == true) return;
				if (isAdmin) return;
				message.reply(`Please do not post links in chat.`).then(msg => setTimeout(() => msg.delete(), 6700));
				guildInfo.set(`${message.author.id}warns`, (guildInfo.get(`${message.author.id}warns`) || 0) + 1);
				if (guildInfo.get(`${message.author.id}warns`) > 4) {
					const role1 = guild.roles.cache.find(role => {
						return role.name === 'Muted'
					});
					const role = role1 || await message.guild.roles.create({
						data: {
							name: 'Muted'
						}
					}).then(role => { return role });
					if (!role1) {
						guild.channels.cache.forEach(async channel => {
							await channel.overwritePermissions(channel.permissionOverwrites);
							channel.updateOverwrite(role, { 'SEND_MESSAGES': false });
						});
					}
					user.roles.add(role).then(r => {
						setTimeout(() => user.roles.remove(role), (1000 * 60 * 60));
						guildInfo.set(`${message.author.id}warns`, 0)
					})
					member.send(`You were muted for 1 hour for continuous infractions.`);
				}
				message.delete()
			}
		}
	})
}