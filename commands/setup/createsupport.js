module.exports = {
	name: 'createsupport',
	permissions: 'MANAGE_GUILD',
	description: 'Create a support role used for tickets.',
	execute(message, args) {
		const { guild } = message;
		guild.roles.create({
			data: {
				name: 'Support',
				hoist: false
			}
		}).then(role => {
			message.channel.send(`<@${message.author.id}> Successfully created <@&${role.id}>!`)
		});
	}
}