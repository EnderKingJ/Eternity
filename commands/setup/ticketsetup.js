const Discord = require(`discord.js`);
const JSONdb = require(`simple-json-db`);
const fs = require(`fs`);
module.exports = {
	name: 'ticketsetup',
	description: 'Beta, to refresh tickets',
	args: true,
	minArgs: 2,
	usage: '<@role for access> <category name>',
	permissions: 'MANAGE_GUILD',
	execute: async function (message, args, client) {
		if (!fs.existsSync(`./servers/${message.guild.id}.json`)) fs.writeFileSync(`./servers/${message.guild.id}.json`, '');
		let guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		args.shift();
		const name12 = args[1] ? args.join(' ') : args[0];
		const folder = client.channels.cache.find(channel => {
			return channel.name === args[1] ? args.join(' ') : args[0]
		});
		
		const channel123 = client.channels.cache.find(channel => {
			return channel.id === guildInfo.get("ticketid");
		});
		console.log(message.guild);
		const catid = message.guild.channels.cache.find(category => {
			return category.name.toLowerCase() === name12.toLowerCase();
		});
		console.log(catid);
		if (channel123) channel123.delete();
		const channelId = await message.guild.channels.create('tickets', {
			permissionOverwrites: [
				{
					id: message.guild.roles.everyone,
					deny: ['SEND_MESSAGES']
				}
			]
		}).then(channel => {
			channel.setParent(catid.id);
			return channel.id
		});
		const channel = client.channels.cache.find(channels => {
			return channels.id === channelId;
		});
		const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setDescription(`React with 🎫 to create a new ticket`)
			.setTitle(`Ticket Creation`);
		const id = await channel.send(exampleEmbed).then(function (message1) {
			message1.react("🎫");
			guildInfo.set(`ticketid`, channel.id);
			return channel.id
		}).catch(error => {
			console.log(error);
		})	
		client.off('messageReactionAdd', function (user, reaction) {
			
		})
		const role = message.mentions.roles.first().id
		guildInfo.set(`roleid`, role);
		guildInfo.set(`args`, args);
		client.on('messageReactionAdd', async (user, reaction) => {
			const name12 = args[1] ? args.join(' ') : args[0];
			const { message } = user;
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
					return channel.name == `ticket-${reaction.username.toLowerCase()}`
				})) { //checks if there in an item in the channels collection that corresponds with the supplied parameters, returns a boolean
					console.log(`eee`)
						message.reply(`The ticket-${reaction.username.toLowerCase()} channel already exists in this guild.`)
						return; //prevents the rest of the code from being executed
				}
				else {
					console.log(`ticket-${reaction.username}`)
				}
				message.reactions.resolve("🎫").users.remove(reaction.id);
				const channel2 = await client.channels.cache.find(channels => {
					return channels.name === `ticket-${reaction.username}`;
				});
				if (!channel2) {
				message.guild.channels
					.create(`ticket-${reaction.username}`, {
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
	},
};