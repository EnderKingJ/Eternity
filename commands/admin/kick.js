
module.exports = {
	name: 'kick',
	args: true,
	usage: '<user>',
	description: 'Kick a user',
	permissions: 'KICK_MEMBERS',
	deleted: true,
	execute(message, args) {
		const { guild } = message;
		const taggedUser = message.mentions.users.first()
		const member = guild.members.cache.get(taggedUser.id);
		member.kick();
	},
};