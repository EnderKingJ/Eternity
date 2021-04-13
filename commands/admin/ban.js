
module.exports = {
	name: 'ban',
	args: true,
	usage: '<user> <days or -1 for life> <reason>',
	description: 'Ban a user',
	permissions: 'BAN_MEMBERS',
	deleted: true,
	execute(message, args) {
		const { guild } = message;
		const taggedUser = message.mentions.users.first()
		const member = guild.members.cache.get(taggedUser.id);
		console.log(taggedUser.id);
		message.reply(`Successfully banned ${taggedUser.id}`);
		const time = args[1] * 1000 * 60 * 60 * 24;
		console.log(args);
		args.shift();
		args.shift();
		console.log(args);
		const reasons = args.join(' ')
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
		member.ban({ reason: reasons }).then(() => {
			if (time < 0) return;
			else {
				setTimeout(() => member.unban(), time);
			}
		});
	},
};		