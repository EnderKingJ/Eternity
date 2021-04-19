'use strict';

module.exports.sync = (client) => {
	const Discord = require(`discord.js`);
	const fs = require(`fs`);
	const JSONdb = require(`simple-json-db`);
	if (1 == 1) {
		// Start of tickets
		client.on('messageReactionAdd', async (user, reaction) => {
			const { message } = user;
			let { guild } = message;
			let guildInfo = new JSONdb(`./servers/${guild.id}.json`);
			let id = guildInfo.get("ticketid");
			let role = guildInfo.get("roleid");
			let args = guildInfo.get("args");
			if (!id || !role || !args) return;
			const name12 = args[1] ? args.join(' ') : args[0];
			const catid = message.guild.channels.cache.find(category => {
				return category.name.toLowerCase() === name12.toLowerCase();
			});
			if (reaction.partial) {
				// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
				try {
					await reaction.fetch();
				} catch (error) {
					console.error('Something went wrong when fetching the message: ', error);
					// Return as `reaction.message.author` may be undefined/null
					return;
				}
			}
			if (user.partial) {
				// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
				try {
					await user.fetch();
					console.log(`eee`)
				} catch (error) {
					console.error('Something went wrong when fetching the message: ', error);
					// Return as `reaction.message.author` may be undefined/null
					return;
				}
			}
			if (message.author.id == "822105903599058994" && reaction.id !== "822105903599058994") {
				if (id == message.channel.id) {
				console.log(user.emoji.name);
				if (user.emoji.name == "🎫") {
				if (message.guild.channels.cache.find(channel => {
					return channel.name == `ticket-${reaction.id}`
				})) { //checks if there in an item in the channels collection that corresponds with the supplied parameters, returns a boolean
					console.log(`eee`)
						message.reply(`The ticket-${reaction.id} channel already exists in this guild.`)
						return; //prevents the rest of the code from being executed
				}
				else {
					console.log(`ticket-${reaction.id}`)
				}
				message.reactions.resolve("🎫").users.remove(reaction.id);
				const channel2 = await client.channels.cache.find(channels => {
					return channels.name === `ticket-${reaction.id}`;
				});
				if (!channel2) {
				message.guild.channels
					.create(`ticket-${reaction.id}`, {
						permissionOverwrites: [
						{
							id: reaction.id,
							allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
						},
						{
							id: message.guild.roles.everyone.id,
							deny: ['VIEW_CHANNEL'],
						},
						{
							id: role,
							allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
						},
						],
						type: 'text',
					})
					.then(async (channel) => {
						channel.setParent(catid.id);
						channel.overwritePermissions([
							{
								id: reaction.id,
								allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
							},
							{
								id: message.guild.roles.everyone.id,
								deny: ['VIEW_CHANNEL'],
							},
							{
								id: role,
								allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
							}
						])
						channel.send(
						`<@${reaction.id}> Welcome!\n|| <@&${role}> ||`,
						new Discord.MessageEmbed()
							.setDescription(
							`Support will be with you shortly.\n`
							)
							.setColor('00f8ff')
							.setFooter(
							'Community',
							''
							)
							.setTimestamp()
						).then(function(message) {
							message.react('🔒');
						});
					});
				}
			}
			}
			else if (user.emoji.name == '🔒') {
				console.log(`eeeeeeeeeee`);
				message.reactions.resolve("🔒").users.remove(reaction.id);
				const channel2 = await client.channels.cache.find(channels => {
					return channels.id === message.channel.id;
				});
				channel2.delete();
			}
			}
		})
		// End of tickets

		// Start of role on join
		client.on('guildMemberAdd', member => {
			const { guild, user } = member;
			const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
			let roleid = guildInfo.get("rolejoinid");
			if (!roleid) return;
			const role = guild.roles.cache.find(role => {
				return role.id === roleid
			});
			const member1 = guild.members.cache.find(user1 => {   			return user1.id === user.id 
			});
			member1.roles.add(role).catch(error => console.log(`eee`))
		})
		//End of role on join


		client.on("guildMemberAdd", (member) => {
			const guildInfo = new JSONdb(`./servers/${member.guild.id}.json`);
			let verifytoggle = guildInfo.get("verification") || false;
			if (verifytoggle == false || !verifytoggle) return;
			if (Date.now() - member.user.createdAt < 1000*60*60*24*1) {
				member.send(`You have been kicked by Eternity Alt Detection. PLease wait until your account is at least 1 day old to rejoin.`);
				return member.kick();
			}
			let role = member.guild.roles.cache.find(rolee => {
				return rolee.name.toLowerCase() == "unverified" 
			});
			let user = member.guild.members.cache.get(member.user.id);
			user.roles.add(role)
		})
		client.on("messageReactionAdd", async function(reaction, user) {
			const guildInfo = new JSONdb(`./servers/${reaction.message.guild.id}.json`);
			let verifytoggle = guildInfo.get("verification") || false;
			if (!verifytoggle || verifytoggle === false) return;
			if (reaction.partial) {
				// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
				try {
					await reaction.fetch();
				} catch (error) {
					console.error('Something went wrong when fetching the message: ', error);
					// Return as `reaction.message.author` may be undefined/null
					return;
				}
			}
			if (user.partial) {
				// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
				try {
					await user.fetch();
					console.log(`eee`)
				} catch (error) {
					console.error('Something went wrong when fetching the message: ', error);
					// Return as `reaction.message.author` may be undefined/null
					return;
				}
			}
			if (user.bot) return;
			if (verifytoggle == false) return;
			let role = reaction.message.guild.roles.cache.find(role => {
				return role.name.toLowerCase() == "unverified" 
			});
			let { message } = reaction;
			let user1 = message.guild.members.cache.get(user.id);
			if (reaction.emoji.name == "✅") {
				user1.roles.remove(role);
			}
		})
		client.on("channelCreate", async channel => {
			if (channel.partial) await channel.fetch()
			const { guild } = channel;
			if (!guild) return;
			const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
			if (!guildInfo.get("verification") || guildInfo.get("verification") !== true) return;
			let role = guild.roles.cache.find(rolee => {
				return rolee.name.toLowerCase() == "unverified" 
			});
			if (channel.permissionOverwrites) await channel.overwritePermissions(channel.permissionOverwrites).catch(error => console.log(`oops`));
			setTimeout(() => channel.updateOverwrite(role, {VIEW_CHANNEL: false}));
		})

		client.on('messageReactionAdd', (reaction, user) => {
			const { message } = reaction;
			const { guild } = message;
			const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
			const reactroles = guildInfo.get(`${message.id}-roles`);
			const emoji = reaction.emoji;
			if (!reactroles) return;
			console.log(emoji);
			console.log(reactroles);
			if (!reactroles[emoji.id || emoji.name]) return;
			console.log(emoji.id);
			if (reactroles[emoji.id || emoji.name]) {
				let role = guild.roles.cache.get(reactroles[emoji.id || emoji.name]);
				let member = guild.members.cache.get(user.id);
				member.roles.add(role);
			}
		})
		client.on('messageReactionRemove', (reaction, user) => {
			const { message } = reaction;
			const { guild } = message;
			const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
			const reactroles = guildInfo.get(`${message.id}-roles`);
			if (!reactroles) return;
			const emoji = reaction.emoji;
			console.log(reactroles);
			if (!reactroles[emoji.id || emoji.name]) return;
			console.log(emoji.name);	
			if (reactroles[emoji.id || emoji.name]) {
				let role = guild.roles.cache.get(reactroles[emoji.id || emoji.name]);
				let member = guild.members.cache.get(user.id);
				member.roles.remove(role);
			}
		})
	}


	client.on(`message`, async message => {
		const { guild } = message;
		if (!guild) return;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		if (!guildInfo.get("afkusers")) return;
		const afkUsers = guildInfo.get("afkusers");
		if (afkUsers[message.author.id]) { 
			message.channel.send(`Welcome back, I removed your afk.`);
			delete afkUsers[message.author.id];
			return guildInfo.set("afkusers", afkUsers);
		}
		if (!message.mentions.members) return;
		if (afkUsers[message.mentions.members.first() ? message.mentions.members.first().user.id : null]) return message.channel.send(`${message.mentions.members.first().user.username}#${message.mentions.members.first().user.discriminator} is afk for ${afkUsers[message.mentions.members.first().id]}`);
	})


	client.on(`messageDelete`, async message => {
		if (!message.member) return;
		if (message.member.bot) return;
		const { guild } = message;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`)
		if (!guild) return;
		const logid = guildInfo.get("logid");
		const logs1 = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		const channel = guild.channels.cache.get(logid);
		let value;
		if (logs.target.id !== message.author.id) {
			value = {
				id: message.author.id,
				name: `${message.author.username}#${message.author.discriminator}`,
				content: message.content.toString(),
				time: message.createdTimestamp
			}
			console.log(`eeeeeeeeeeeeeeeeeee`)
			guildInfo.set(`${message.channel.id}-snipe`, value);
		}
		else {
			value = {
				id: logs.target.id,
				name: `${logs.target.username}#${logs.target.discriminator}`,
				content: message.content.toString(),
				time: message.createdTimestamp
			}
			console.log(`eeeeeeeeeeeeeeeeeee`)
			guildInfo.set(`${message.channel.id}-snipe`, value);
		}
	})
}