module.exports = {
	name: 'removerole',
	args: true,
	usage: `<user> <role>`,
	description: 'Remove a role',
	permissions: "MANAGE_ROLES",
	deleted: true,
	execute(message, args) {
		const { guild } = message;
		args.shift();
		const roleName = message.mentions.roles.first()
		const role = guild.roles.cache.find(role => {
			return role === roleName
		});
		const user = message.mentions.members.first();
		const member = guild.members.cache.get(user.id);
		const self = guild.members.cache.get(message.author.id);
		let sposition = 0;
		let position = 0;
		self.roles.cache.forEach(role => {
			sposition += role.rawPosition;
		});
		member.roles.cache.forEach(role => {
			position += role.rawPosition;
		});
		if (position > sposition || position == sposition) return message.reply(`You cannot do this, as the user is equal to or higher rank than you.`);
		member.roles.remove(role);
	},
};