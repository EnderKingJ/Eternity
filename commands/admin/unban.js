module.exports = {
	name: 'unban',
	description: 'Unban a user',
	args: true,
	usage: '<user id>',
	deleted: true,
	permissions: 'BAN_MEMBERS',
	execute(message, args) {
		let guild = message.guild
		const taggedUser = args[0];
		console.log(taggedUser);
		guild.members.unban(taggedUser);
	},
};