module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args, client) {
		const Discord = require(`discord.js`)
		let embed2 = new Discord.MessageEmbed()
			.setTitle(`Checking...`);
		message.reply(embed2).then(msg => {
			const embed1 = new Discord.MessageEmbed()
				.setDescription(`Latency: \`${msg.createdTimestamp - message.createdTimestamp}ms\`\nWebsocket Heartbeat: \`${client.ws.ping}\``);
			msg.edit(embed1);
		});
	},
};