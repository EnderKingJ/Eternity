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
			}).catch(error => {
				
			})
		})
	}

	client.guilds.cache.forEach(async guild => {
		invites[guild.id] = await getInvites(guild);
	})
	client.on(`guildCreate`, async guild => {
		invites[guild.id] = await getInvites(guild);
	})


	client.on('guildMemberAdd', async member => {
		const { guild, id } = member;
		const { username, discriminator } = member.user;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const invitesBefore = invites[guild.id];
		const invitesAfter = await getInvites(guild);
		for (const i in invitesAfter) {
			if (invitesBefore[i] === invitesAfter[i] - 1) {
				let test = guildInfo.get("invites");
				if (!test) test = {};
				test[i] = (test[i] || 0) + 1
				guildInfo.set("invites", test);
				const count = test[i];
				console.log(`hellothere`)
				let channel = guild.channels.cache.find(channel => {
					return channel.id === guildInfo.get("joinchannel");
				});
				console.log(guildInfo.get("joinmessage"))
				if (channel) channel.send(`${guildInfo.get("joinmessage") || "Welcome"} <@${id}> invited by ${i} (`  + count  + `) invites.`).catch(error => {
					
				});
				let test2 = guildInfo.get("invitedby") || {};
				test2[`${username}#${discriminator}`] = `${i}`
				guildInfo.set("invitedby", test2)
				return;
			}	
			invites[guild.id] = invitesAfter;
		}

		
	})
	client.on("guildMemberRemove", async member => {
		const {guild, id} = member;
		const { username, discriminator } = member.user
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		console.log(invites[guild.id]);
		for (const inviter in guildInfo.get("invitedby")) {
			let test = guildInfo.get("invites");
			let test2 = guildInfo.get("invitedby") || {};
			if (test[test2[inviter]]) test[test2[inviter]] = test[test2[inviter]] - 1;
			guildInfo.set("invites", test);
		}
		let channel = guild.channels.cache.get(guildInfo.get("joinchannel"));
		if (channel) {
			channel.send(`${username}#${discriminator} left ${guild.name}`)
		}
	})
}	