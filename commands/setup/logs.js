module.exports = client => {
	const Discord = require(`discord.js`)
	const JSONdb = require(`simple-json-db`)
	
	// Start of delete logging
	client.on(`messageDelete`, async message => {
		const { guild } = message;
		console.log(message)
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`)
		if (!guild) return;
		const logid = guildInfo.get("logid");
		if (!logid) return;
		const logs1 = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		const channel = guild.channels.cache.get(logid);
		if (logs.target.id !== message.author.id) {
			const embed = new Discord.MessageEmbed()
				.setDescription(`<@${message.author.id}> deleted their message in <#${message.channel.id}>`)
				.addFields([
					{
						name: 'Message Content',
						value: message.content.toString(),
						inline: true
					}
				]);
			channel.send(embed);
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setDescription(`<@${logs.executor.id}> deleted a message sent by <@${logs.target.id}> in <#${logs.extra.channel.id}>`)
				.addFields([
					{
						name: 'Message Content',
						value: message.content.toString(),
						inline: true
					}
				]);
			channel.send(embed);
		}

	})
	// End of delete logging

	//Start of kick logging
	client.on(`guildMemberRemove`, async member => {
		const { guild } = member;
		if (!guild) return;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const logid = guildInfo.get("logid");
		if (!logid) return;
		const channel = guild.channels.cache.get(logid);
		const logs1 = await guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_KICK',
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		if (logs.target.id !== member.id) return;
		const embed = new Discord.MessageEmbed()
			.setDescription(`<@${member.id}> was kicked by <@${logs.executor.id}> for ${logs.reason}`);
		channel.send(embed);
	})
	//End of kick logging

	//Start of ban logging


	client.on(`guildBanAdd`, async (guild, user) => {
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const logid = guildInfo.get("logid");
		const logs1 = await guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_BAN_ADD'
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		if (logs.target.id !== user.id) return;
		const embed = new Discord.MessageEmbed()
			.setDescription(`<@${logs.target.id}> was banned by <@${logs.executor.id}> for ${logs.reason}`);
		const channel = guild.channels.cache.get(logid);
		channel.send(embed).catch(error => console.log(`oops`));
	})

	//end of ban logging

	// Start of unban logging

	client.on(`guildBanRemove`, async (guild, user) => {
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const logid = guildInfo.get("logid");
		const logs1 = await guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_BAN_REMOVE'
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		if (logs.target.id !== user.id) return	;
		const embed = new Discord.MessageEmbed()
			.setDescription(`<@${logs.target.id}> was unbanned by <@${logs.executor.id}> for ${logs.reason}`);
		const channel = guild.channels.cache.get(logid);
		channel.send(embed);
	})

	//End of unban logging

	client.on(`channelCreate`, async channel => {
		const { guild } = channel;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const logid = guildInfo.get("logid");
		if (!logid) return;
		const logs1 = await guild.fetchAuditLogs({
			limit: 1,
			type: `CHANNEL_CREATE`
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		if (logs.target.id !== channel.id) return;
		const embed = new Discord.MessageEmbed()
			.setDescription(`<#${logs.target.id}> was created by <@${logs.executor.id}>.`);
		const channel1 = guild.channels.cache.get(logid);
		channel1.send(embed);
	})

	client.on(`channelDelete`, async channel => {
		const { guild } = channel;
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const logid = guildInfo.get("logid");
		if (!logid) return;
		const logs1 = await guild.fetchAuditLogs({
			limit: 1,
			type: `CHANNEL_DELETE`
		});
		const logs = logs1.entries.first();
		if (!logs) console.log(logs1);
		if (logs.target.id !== channel.id) return;
		const embed = new Discord.MessageEmbed()
			.setDescription(`<#${logs.target.name}> was deleted by <@${logs.executor.id}>.`);
		const channel1 = guild.channels.cache.get(logid);
		channel1.send(embed);
	})
}