module.exports = {
	name: 'verification',
	usage: '<on/off>',
	args: true,
	permissions: 'MANAGE_GUILD',
	description: 'Enable or disable a simple verification channel',
	execute: async function(message, args, client) {
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		const Discord = require(`discord.js`);
		const toggle = args[0];
		toggle.toLowerCase() == "on" ? guildInfo.set("verification", true) : guildInfo.set("verification", false);
		let verify = message.guild.channels.cache.find(channel => {
			return channel.name === "verify"
		})
		verify ? verify.delete() : null;
		const role1 = message.guild.roles.cache.find(roless => {
			return roless.name.toLowerCase() === 'unverified'
		});
		const role2 = role1 ||
			await message.guild.roles.create({
				data: {
					name: 'unverified'
				}
			}).then(role => {return role});
    console.log(role2.id);
		if (guildInfo.get("verification") == true) {
			message.guild.channels.create('verify', {
				type: 'text',
				permissionOverwrites: [
					{
						id: message.guild.roles.everyone.id,
						deny: 'SEND_MESSAGES'
					}
				]
			}).then(newchannel => {
					message.guild.channels.cache.forEach(async channel => {
						if (channel.name !== "verify")  {
							await channel.overwritePermissions(channel.permissionOverwrites);
						  setTimeout(() => channel.updateOverwrite(role2, { VIEW_CHANNEL: false })
							.then(channel => {
								console.log(`pog`)
							}), 1000)
						}
					})
				let newEmbed = new Discord.MessageEmbed()
					.setTitle(`Verify`)
					.setDescription(`React with ✅ to verify!`);
				newchannel.send(newEmbed).then(message => {
					message.react(`✅`)
				})
			}) 
		}
	}
}