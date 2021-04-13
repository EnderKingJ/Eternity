module.exports = {
	name: 'mute',
	permissions: 'MANAGE_MESSAGES',
	args: true,
	minArgs: 2,
	deleted: true,
	description: 'Mute a user for a certain amount of time.',
	usage: `<user> <time> <time format>`,
	async execute(message, args) {
		const { guild } = message;
		const user = message.mentions.users.first();
		const member = guild.members.cache.get(user.id);
		args.shift();
		const time = args[0] * 1000 * 60
		args.shift();
		const reason = args.join(' ');
		const role1 = guild.roles.cache.find(role => {
			return role.name === 'Muted'
		});
		const role = role1 || await message.guild.roles.create({
			data: {
				name: 'Muted'
			}
		}).then(role => { return role });
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
		guild.channels.cache.forEach(async channel => {
			await channel.overwritePermissions(channel.permissionOverwrites);
			channel.updateOverwrite(role, { 'SEND_MESSAGES': false });
		});
		member.roles.add(role).then(r => {
			message.channel.send(`Successfully muted user.`)
			setTimeout(() => member.roles.remove(role), time)
		})
	}
}