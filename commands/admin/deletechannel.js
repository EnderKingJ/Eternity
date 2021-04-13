module.exports = {
	name: 'deletechannel',
	args: true,
	usage: '<channel>',
	description: 'Delete a channel',
	permissons: 'ADMINISTRATOR',
	deleted: true,
	execute: async function(message, args, client) {
		console.log(args)
		const channel = message.mentions.channels.first();
		channel.delete()
	}
}