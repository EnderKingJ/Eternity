module.exports = {
	name: 'prefix',
	args: true,
	permissions: 'MANAGE_GUILD',
	usage: `<prefix>`,
	execute(message, args) {
		const JSONdb = require(`simple-json-db`);
		const Discord = require(`discord.js`);
		let guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
		guildInfo.set("prefix", args[1] ? args.join(' ') : args[0]);
		let embed = new Discord.MessageEmbed()
			.setDescription(`Successfully set prefix to **${args[1] ? args.join(' ') : args[0]}**.`)
			.setColor(`#0f0`);
		message.channel.send(embed);
	}
}