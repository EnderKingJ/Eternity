module.exports = (client) => {
	const invites = {};
	const JSONdb = require(`simple-json-db`);
	const getInvites = async (guild) => {
		return await new Promise(resolve => {
			guild.fetchInvites().then(invites => {
				const inviteCounter = {};
				
				invites.forEach(invite => {
					const { uses, inviter} = invite;
					const { username, discriminator } = inviter;
					const name = `${username}#${discriminator}`;
					inviteCounter[name] = (inviteCounter[name] || 0) + uses;
				})
				resolve(inviteCounter);
			})
		})
	}

	client.guilds.cache.forEach(async guild => {
		invites[guild.id] = await getInvites(guild);
	});
	
	client.on('guildMemberAdd', async member => {
		const { guild, id } = member;

		const invitesBefore = invites[guild.id];
		const invitesAfter = await getInvites(guild);

		console.log(`BEFORE: `, invitesBefore);
		console.log(`AFTER: `, invitesAfter);
		let guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		for (const inviter in invitesAfter) {
			console.log(inviter)
			if (invitesBefore[inviter] === invitesAfter[inviter] - 1) {
				const count = invitesAfter[inviter];
				if (guildInfo.get("joinchannel")) {
					let channel = guild.channels.cache.get(guildInfo.get("joinchannel"));
					if (channel) channel.send(`Welcome <@${id}> invited by ${inviter} (${count}) invites.`)
				}
			}
			invites[guild.id] = invitesAfter;
			return;
		}

		
	})
}