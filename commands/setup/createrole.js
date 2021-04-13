module.exports = {
	name: 'createrole',
	permissions: 'MANAGE_GUILD',
	args: true,
	usage: '<rolename spaces are _> <color> <position> <permisson> <hoist (whether it should show or not on member list)>',
	description: `Create a role`,
	execute(message, args) {
		const { guild } = message;
		const name = args[0].replace("_", " ");
		const color = args[1];
		const position = args[2];
		const permission = args[3];
		const hoist = args[4];
		guild.roles.create({
			data: {
				name: name,
				color: color,
				permissions: permission,
				position: position,
				hoist: true
			}
		})
	}
}