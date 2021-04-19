module.exports = {
	name: `addcoins`,
	ownerOnly: true,
	args: true,
	usage: `<user id> <coins>`,
	description: `Only something Crosis can use.`,
	execute(message, args) {
		const { user } = message.guild.members.cache.get(args[0]);
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${user.id}.json`);
		let coins = userInfo.get("coins") || 0;
		const added = parseInt(args[1]);
	  coins += added;
		message.channel.send(`Successfully added ${added} coins to ${user.tag}`);
		userInfo.set("coins", coins);

	}
}