module.exports = {
	name: 'addrole',
	args: true,
	minArgs: 2,
	usage: '<@user> <@role>',
	deleted: true,
	description: 'Add a role',
	permissions: "MANAGE_ROLES",
	execute(message, args) {
		const { guild } = message;
		args.shift();
		const roleName = message.mentions.roles.first().id;
		const role = guild.roles.cache.find(role => {
			return role.id === roleName
		});
		const user = message.mentions.members.first().id;
		const member = guild.members.cache.get(user);
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
		member.roles.add(role)		
	},
};