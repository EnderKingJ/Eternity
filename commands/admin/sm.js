module.exports = {
	name: 'sm',
	minArgs: 1,
	args: true,
	description: 'Change the slowmode.',
	usage: `<seconds>`,
	deleted: true,
	permissions: 'MANAGE_CHANNELS',
	execute(message, args) {
		const time = parseInt(args[0]);
		message.channel.setRateLimitPerUser(time);
		message.channel.send(`Successfully set sm.`).then(message => {
			setTimeout(() => message.delete(), 5000)
		})
	}
}