module.exports = {
	name: 'nick',
	permissions: 'MANAGE_GUILD',
	execute(message, args, client) {
		const id = message.guild.members.cache.find(user => {return user.id === client.user.id})
		id.setNickname(args[1] ? args.join(' ') : args[0]);
	}
}