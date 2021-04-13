const Discord = require(`discord.js`)
module.exports = {
	name: 'lock',
	deleted: true,
	permissions: 'MANAGE_CHANNELS',
	args: true,
	usage: `<channel or all> <time> <reason>`,
	description: 'Lock a channel, or all channels.',
	minArgs: 3,
	async execute(message, args) {
		const { guild, member } = message;
		const channel1 = message.mentions.channels.first() || args[0]
		const times = {
			's': 1,
			'm': 60,
			'h': 60 * 60,
			'd': 60 * 60 * 24
		}
		const time123 = args[1];
		const tformat = args[1][args[1].length - 1]
		console.log(tformat)
		if (!times[tformat]) return message.channel.send(`Invalid time format.`);
		const time = parseInt(time123) * times[tformat] * 1000;
		args.shift()
		args.shift()
		const reason = args.join(' ')
		if (channel1 !== 'all' && !message.mentions.channels.first()) {
			return message.channel.send(`Please provide a channel or all.`);
		}
		if (channel1 === 'all') {
			guild.channels.cache.forEach(async channel => {
				const embed = new Discord.MessageEmbed()
					.setDescription(`This channel has been locked by ${message.author.username}#${message.author.discriminator} for ${time123} and for reason \`${reason}\`.\n You are **not** muted, so please do not dm staff asking why you are muted.`);
				channel.send(embed);
				await channel.overwritePermissions(channel.permissionOverwrites);
				setTimeout(() => channel.updateOverwrite(guild.roles.everyone, { SEND_MESSAGES: false}), 50);
				setTimeout(() => channel.updateOverwrite(guild.roles.everyone, { SEND_MESSAGES: null}), time);
				const embed1 = new Discord.MessageEmbed()
					.setDescription(`Channel unlocked.`);
				setTimeout(() => channel.send(embed1), time)
			});
		}
		else {
			const embed = new Discord.MessageEmbed()
				.setDescription(`This channel has been locked by ${message.author.username}#${message.author.discriminator} for ${time123} and for reason \`${reason}\`.\n You are **not** muted, so please do not dm staff asking why you are muted.`);
			channel1.send(embed);
			await channel1.overwritePermissions(channel1.permissionOverwrites);
			setTimeout(() => channel1.updateOverwrite(guild.roles.everyone, { SEND_MESSAGES: false }), 50);
			setTimeout(() => channel1.updateOverwrite(guild.roles.everyone, { SEND_MESSAGES: null }), time);
			const embed1 = new Discord.MessageEmbed()
				.setDescription(`Channel unlocked.`);
			setTimeout(() => channel1.send(embed1), time);
		}
	}
}