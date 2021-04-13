module.exports = {
	name: 'warns',
	args: true,
	permissions: 'MANAGE_MESSAGES',
	usage: `<@user>`,
	execute(message, args, client, embed) {
		const JSONdb = require(`simple-json-db`);
		const fs = require(`fs`);
		const user = message.mentions.users.first()
		if (!fs.existsSync(`./servers/${message.guild.id}.json`)) {
			fs.writeFileSync(`./servers/${message.guild.id}.json`, '');
			message.channel.send(embed(`This user has no warns`,`Warns`, `0f0`));
		}
		let guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		let warns = guildInfo.get(`${user.id}warns`) ? guildInfo.get(`${user.id}warns`) : null;
		warns ? message.channel.send(embed(`${user.username} has ${warns} ${warns > 1 ? "warns" : "warn"}`, 'Warns', `FF0000`)) : message.channel.send(embed(`This user has no warns`,`Warns`, `0f0`));
	}
}					