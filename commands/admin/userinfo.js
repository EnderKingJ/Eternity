module.exports = {
	name: 'userinfo',
	permissions: 'MANAGE_MESSAGES',
	args: true,
	minArgs: 1,
	usage: `<@user>`,
	description: `Gets the info about a user.`,
	execute(message, args) {
		const Discord = require(`discord.js`)
		const user1 = message.mentions.members.first()
		const { user } = user1; 
		console.log(user1);
		let date = (data) => new Date(data).toDateString();
		const embed = new Discord.MessageEmbed()
			.addFields([
				{
					name: 'Id',
					value: `${user.id}`,
					inline: true
				},
				{
					name: 'Username',
					value: `${user.username}`,
					inline: true
				},
				{
					name: 'Bot',
					value: `${user.bot}`,
					inline: true
				},
				{
					name: 'Discriminator',
					value: `#${user.discriminator}`,
					inline: true
				},
				{
					name: 'Owner',
					value: `${user1.guild.ownerID === user.id}`,
					inline: true
				},
				{
					name: 'Date Created',
					value: `${date(user.createdAt)}`,
					inline: true
				},
				{
					name: 'Date Joined',
					value: `${date(user1.joinedTimestamp)}`,
					inline: true
				}
			]);
		message.channel.send(embed);
	}
}