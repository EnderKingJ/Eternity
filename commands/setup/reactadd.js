module.exports = {
	name: 'reactadd',
	permissions: `MANAGE_GUILD`,
	args: true,
	description: 'Add a role for users to get when reacting to a message',
	minArgs: 3,
	usage: '<message id> <emoji> <new role name>',
	async execute(message, args, client) {
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const id = args[0];
		const emoji = message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/) || null;
		console.log(message.content);
		const emoji1 = emoji ? null : args[1];
		const roles = guildInfo.get(`${id}-roles`) || {};
		args.shift()
		args.shift()
		const role1 = args[1] ? args.join(' ') : args[0];
		const role = message.mentions.roles.first() || await guild.roles.create({
			data: {
				name: role1
			}
		}).then(newrole => {
			return newrole;
		})
		const msg12 = guild.channels.cache.forEach(async channel => {
			if (!channel.messages) return;
			let msg = await channel.messages.fetch(id).then(m => m).catch(error => {
				return;
			})
			if (msg) {
				msg.react(emoji1 ? emoji1 : emoji[3]);
				roles[emoji1 ? emoji1 : emoji[3]] = role.id;
				guildInfo.set(`${id}-roles`, roles);
				console.log(emoji)
			}
		})
	}
}