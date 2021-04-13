module.exports = {
	name: 'backup',
	permissions: 'MANAGE_GUILD',
	minArgs: 1,
	args: true,
	description: 'Creates a backup for your guild.',
	usage: '<create, delete, load, list> <name>',
	async execute(message, args, client) {
		const map = obj => {
			const keys = Object.keys(obj);
			const map = new Map();
			for(let i = 0; i < keys.length; i++){
					//inserting new key value pair inside map
					map.set(obj[keys[i]].id, obj[keys[i]]);
			};
			return map;
		};
		const map2 = obj => {
			const keys = Object.keys(obj);
			const map = new Map();
			for(let i = 0; i < keys.length; i++){
					//inserting new key value pair inside map
					map.set(obj[keys[i]].user.id, obj[keys[i]]);
			};
			return map;
		};
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const action = args[0];
		args.shift();
		const name = args[1] ? args.join(' ') : args[0];
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		if (action !== "create" && action !== "delete" && action !== "load" && action !== "list") return message.channel.send(`Please put create, delete, list, or load.`);
		let backups = guildInfo.get("backups") || {};
		if (!name && action !== "list") return;
		if (action === "create") {
			if (backups[name]) return message.channel.send(`There is already a backup with this name`)
			const msg = await message.channel.send(`Creating backup, this could take a bit...`).then(m => m);
			let testGuild = {
				members: {
					cacheType: guild.members.cacheType,
					cache: guild.members.cache.map(member => {
						return member
					}),
					guild: guild.members.guild
				},
				channels: {
					cacheType: guild.channels.cacheType,
					cache: guild.channels.cache.map(channel => {
						return channel
					}),
					guild: guild.channels.guild
				},
				roles: {
					cacheType: guild.roles.cacheType,
					cache: guild.roles.cache.map(role => {
						return role
					}),
					guild: guild.roles.guild
				},
				presences: {
					cacheType: guild.presences.cacheType,
					cache: guild.presences.cache,
					guild: guild.presences.guild
				},
				voiceStates: {
					cacheType: guild.voiceStates.cacheType,
					cache: guild.voiceStates.cache,
					guild: guild.voiceStates.guild
				},
				deleted: guild.deleted,
				available: guild.available,
				id: guild.id,
				shardID: guild.shardID,
				name: guild.name,
				icon: guild.icon,
				splash: guild.splash,
				discoverySplash: guild.discoverySplash,
				region: guild.region,
				memberCount: guild.memberCount,
				large: guild.large,
				features: guild.features,
				applicationID: guild.applicationID,
				afkTimeout: guild.afkTimeout,
				afkChannelID: guild.afkChannelID,
				systemChannelID: guild.systemChannelID,
				embedEnabled: guild.embedEnabled,
				premiumTier: guild.premiumTier,
				premiumSubscriptionCount: guild.premiumSubscriptionCount,
				verificationLevel: guild.verificationLevel,
				explicitContentFilter: guild.explicitContentFilter,
				mfaLevel: guild.mfaLevel,
				joinedTimestamp: guild.joinedTimestamp,
				defaultMessageNotifications: guild.defaultMessageNotifications,
				systemChannelFlags: guild.systemChannelFlags,
				maximumMembers: guild.maximumMembers,
				maxiumumPresences: guild.maxiumumPresences,
				approximateMemberCount: guild.approximateMemberCount,
				approximatePresenceCount: guild.approximatePresenceCount,
				vanityURLCode: guild.vanityURLCode,
				vanityURLUses: guild.vanityURLUses,
				description: guild.description,
				banner: guild.banner,
				rulesChannelID: guild.rulesChannelID,
				publicUpdatesChannelID: guild.publicUpdatesChannelID,
				preferredLocale: guild.preferredLocale,
				ownerID: guild.ownerID,
				emojis: {
					cacheType: guild.emojis.cacheType,
					cache: guild.emojis.cache,
					guild: guild.emojis.guild
				}
			}
			let testBackup = {
				members: {
					cacheType: guild.members.cacheType,
					cache: guild.members.cache.map(member => {
						let value = {
							joinedTimestamp: member.joinedTimestamp,
							lastMessageID: member.lastMessageID,
							lastMessageChannelID: member.lastMessageChannelID,
							premiumSinceTimestamp: member.premiumSinceTimestamp,
							deleted: member.deleted,
							nickname: member.nickname,
							roles: member._roles,
							user: member.user 
						}
						return value;
					}),
					guild: guild.members.guild
				},
				channels: {
					cacheType: guild.channels.cacheType,
					cache: guild.channels.cache.map(channel => { 
						let value = {
							type: channel.type,
							deleted: channel.deleted,
							id: channel.id,
							name: channel.name,
							rawPosition: channel.rawPosition,
							parentID: channel.parentID,
							permissionOverwrites: channel.permissionOverwrites ? channel.permissionOverwrites.map(permission => permission) : null,
							topic: channel.topic,
							nsfw: channel.nsfw,
							lastMessageID: channel.lastMessageID,
							lastPinTimestamp: channel.lastPinTimestamp,
							messages: channel.messages,
							rateLimitPerUser: channel.rateLimitPerUser
						}
						return value;
					}),
					guild: guild.channels.guild
				},
				roles: {
					cacheType: guild.roles.cacheType,
					cache: guild.roles.cache.map(role => {
						let value = {
							id: role.id,
							name: role.name,
							color: role.color,
							hoist: role.hoist,
							rawPosition: role.rawPosition,
							permissions: role.permissions,
							managed: role.managed,
							mentionable: role.mentionable,
							deleted: role.deleted
						};
						return value;
					}),
					guild: guild.roles.guild
				}
			}
			backups[name] = testBackup;
			console.log(testBackup.members.cache);
			guildInfo.set("backups", backups);
			msg.edit(`Created backup, in order to load a backup please make sure you have put the Eternity role above all others, or the backup may not load correctly.`)
		}
		else if (action === "list") {
			let msg = "";
			for (var backup in backups) {
				msg += `${backup}, `
			}
			message.channel.send(`${msg ? `Your backups are: ${msg}` : `You have no backups.`}`)
		}
		else if (action === "load") {
			if (!backups[name]) return;
			let backup = backups[name];
			let channels = map(backup.channels.cache);
			let roles = map(backup.roles.cache);
			let members = map2(backup.members.cache);
			let oldids = {};
			const oldcids = {};
			await guild.roles.cache.forEach(role => {
				if (role.managed === true || guild.roles.everyone.id === role.id) return;
				role.delete().then(deleted => {
					
				})
			});
			await guild.channels.cache.forEach(channel => {
				channel.delete();
			});
			await roles.forEach(role => {	
				if (role.id !== guild.roles.everyone.id && role.managed === false) {
					guild.roles.create({
						data: {
							name: role.name,
							color: role.color,
							hoist: role.hoist,
							position: role.rawPosition,
							permissions: role.permissions,
							mentionable: role.mentionable
						}
					}).then(newrole => {
						members.forEach(member => {	
							if (member.roles) {
								let mRoles = {}
								for (i = 0; i < member.roles.length; i++) {
									mRoles[member.roles[i]] = member.roles[i];
								}
								if (mRoles[role.id]) {	
									let user = guild.members.cache.get(member.user.id);
									if (user) {
										user.roles.add(newrole);
									}
								}
							}
						})
						const convertArrayToObject = (array, key) => {
							const initialValue = {};
							return array.reduce((obj, item) => {
								return {
									...obj,
									[item[key]]: item,
								};
							}, initialValue);
						};
						channels.forEach(channel => {
							guild.channels.create(channel.name, {
								type: channel.type,
								topic: channel.topic,
								nsfw: channel.nsfw,
								rateLimitPerUser: channel.rateLimitPerUser,
							}).then(newChannel => {
								guildInfo.set(`${name}-oldid-${channel.id}`, newChannel.id);
								if (guildInfo.get("ticketid") == channel.id) guildInfo.set("ticketid", newChannel.id);
								if (guildInfo.get("logid") == channel.id) guildInfo.set("logid", newChannel.id);
								if (guildInfo.get("joinchannel") == channel.id) guildInfo.set("joinchannel", newChannel.id);
								if (channel.permissionOverwrites) {
									let permissions = map(convertArrayToObject(channel.permissionOverwrites, 'id'));
									let newPerms = []
									permissions.forEach(perm => {
										const permission = perm
										if (permission.type === 'role' && permission.id === role.id) {
											newPerms.push({
												id: newrole.id,
												deny: permission.deny,
												allow: permission.allow
											})
										}
										if (permission.type === 'member' && guild.members.cache.get(permission.id)) {
											newPerms.push({
												id: permission.id,
												deny: permission.deny,
												allow: permission.allow
											})
										}
									})
									newChannel.overwritePermissions(newPerms);
								}
							})
						});
					}).catch(error => {
						console.log(error)
					})
				}
			})
			// A function to delay the position due to categories not being fully loaded, and because of the fact that NodeJS is not async by default.
			function setPos() {
				guild.channels.cache.forEach(c => {
					if (c.type !== 'category') return;
					guild.channels.cache.forEach(nc => {
						channels.forEach(channel => {
							if (channel.parentID && guildInfo.get(`${name}-oldid-${channel.parentID}`) === c.id && guildInfo.get(`${name}-oldid-${channel.id}`) === nc.id) {
								console.log(`test`)
								nc.edit({
									parentID: c.id
								}).catch(error => {
									console.log(c);
								})
							}
							if (channel.position && guildInfo.get(`${name}-oldid-${channel.id}`) === nc.id) {
								nc.setPosition(channel.position)
							}
						})
					})
				})
			}
			setTimeout(setPos, 2000);
		}
		else if (action === "delete") {
			if (!backups[name]) return message.channel.send(`That backup does not exist.`);
			const msg = await message.channel.send(`Deleting backup, this could take a bit...`).then(m => m);
			delete backups[name];
			guildInfo.set("backups", backups);
			msg.edit(`Deleted backup.`)
		}
	}
}