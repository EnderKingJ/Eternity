module.exports = {
	name: 'args-info',
	description: 'Information about the arguments provided.',
	args: true,
	execute(message, args) {
		const { guild } = message;
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		const user = guild.members.cache.get(message.author.id);
		user.roles.cache.find(role => {
			if (role.rawPosition < 4) return true;
		})
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};