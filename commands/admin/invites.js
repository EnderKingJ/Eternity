module.exports = {
	name: 'invites',
	execute(message, args) {
		const { guild } = message; 
		const JSONdb = require(`simple-json-db`);
		guild.fetchInvites().then((invites) => {
			const inviteCounter = {};

			invites.forEach((invite) => {
				const { uses, inviter } = invite
				const { username, discriminator } = inviter
				const name = `${username}#${discriminator}`


				inviteCounter[name] = (inviteCounter[name] || 0) + uses;


			})

			let replyText = `${message.mentions.users.first() ? message.mentions.users.first().username : message.author.username}#${message.mentions.users.first() ? message.mentions.users.first().discriminator : message.author.discriminator} has `;
			let guildInfo = new JSONdb(`./servers/${message.guild.id}.json`);
			console.log(message.guild.id)
			const count = guildInfo.get("invites") ? guildInfo.get("invites")[`${message.mentions.users.first() ? message.mentions.users.first().username : message.author.username}#${message.mentions.users.first() ? message.mentions.users.first().discriminator : message.author.discriminator}`] : 0;
			replyText += `**`  + (count || 0) + `** invite(s).`;
			message.channel.send(replyText);
		})
	} 
}