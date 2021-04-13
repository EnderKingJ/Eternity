module.exports = {
	name: 'unmute',
	args: true,
	description: 'unmute a user',
	minArgs: 1,
	usage: '<@user>',
	deleted: true,
	permissions: 'MANAGE_MESSAGES',
	execute(message, args) {
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		const { member, guild } = message;
		const role1 = guild.roles.cache.find(role => {
			return role.name === 'Muted'
		});
		const user = guild.members.cache.get(message.mentions.users.first().id)
		user.roles.remove(role1).then((role) => {
			message.channel.send(`Successfully unmuted`);
			guildInfo.set(`${message.author.id}warns`, 0)
		}).catch(error => {
			message.reply(`this user isn't muted!`);
		});
	}
}