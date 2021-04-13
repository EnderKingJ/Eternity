module.exports = {
	name: 'reactdelete',
	permissions: `MANAGE_GUILD`,
	args: true,
	description: 'Delete a role for users to get when reacting to a message',
	minArgs: 3,
	usage: '<message id> <emoji> <@role>',
	async execute(message, args, client) {
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const id = args[0];
		const emoji = message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/) ? message.content.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/) : null;
		const roles = guildInfo.get(`${id}-roles`) || {};
		const role = message.mentions.roles.first();
		const msg12 = guild.channels.cache.forEach(async channel => {
			if (!channel.messages) return;
			let msg = await channel.messages.fetch(id).then(m => m).catch(error => {
				return;
			})
			if (msg) {
				delete roles[emoji[3]]; 
				guildInfo.set(`${id}-roles`, roles);
			}
		})
	}
}