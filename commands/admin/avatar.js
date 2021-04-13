module.exports = {
	name: 'avatar',
	usage: '<user>',
	execute(message, args, client) {
		function getUserFromMention(mention) {
			if (!mention) return;

			if (mention.startsWith('<@') && mention.endsWith('>')) {
				mention = mention.slice(2, -1);

				if (mention.startsWith('!')) {
					mention = mention.slice(1);
				}

				return client.users.cache.get(mention);
			}
		}
		if (args[0]) {
			const user = getUserFromMention(args[0]) || message.guild.members.cache.get(message.author.id);
			if (!user) {
				return message.reply('Please use a proper mention if you want to see someone elses avatar.');
			}

			return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}

		return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
	}
}