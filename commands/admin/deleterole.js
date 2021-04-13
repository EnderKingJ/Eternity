module.exports = {
	name: 'deleterole',
	permissions: 'ADMINISTRATOR',
	args: true,
	usage: '<@role>',
	description: `Delete a role`,
	deleted: true,
	execute(message, args) {
		const rolemention = message.mentions.roles.first();
		const { guild } = message;
		guild.roles.cache.find(role => role === rolemention).delete();
	}
}