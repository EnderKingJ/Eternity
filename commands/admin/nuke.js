module.exports = {
	name: 'nuke',
	description: 'Nuke a channel',
	permissions: 'MANAGE_CHANNELS',
	deleted: true,
	execute(message, args) {
		const amount = parseInt(args[0]);
		message.channel.clone().then(channel => {
			channel.setPosition(message.channel.position)
			channel.send('Successfully nuked.');
		})
		message.channel.delete()
	},
};