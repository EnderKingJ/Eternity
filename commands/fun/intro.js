module.exports = {
	name: 'intro',
	description: `Gives an intro to new users!`,
	async execute(message) {
		const Discord = require(`discord.js`);
		message.channel.send(`Hey there! My name is Eternity, and I am a multi purpose bot with the features of many other popular bots. I am open source (https://github.com/Crosis08/Eternity), and approved on https://top.gg/bot/822105903599058994! For more info about me, just say \`yes\``);
		const filter = e => e.author.id === message.author.id
		const contin = await message.channel.awaitMessages(filter, { max: 1 }).then(msg => {
			return msg.map(msg => msg.content.toLowerCase());
		})
		if (contin !== 'yes') return message.channel.send(`Ok, goodbye!`);
		else {
			message.channel.send(`For only a list of cmds / features, just do \`e!help\`, and for a detailed list just say \`list\``)
			const more = await message.channel.awaitMessages(filter, { max: 1 }).then(msg => {
				return msg.map(msg => msg.content.toLowerCase());
			})
			if (more !== 'list') return message.channel.send(`Ok, bi!`);
			else {
				const embed = new Discord.MessageEmbed()
					.setTitle(`Features`)
					.addFields([
						{
							name: 'Support Tickets (e!ticketsetup)',
							value: `A simple ticket system for contacting staff easily.`,
							inline: true
						},
						{
							name: `React roles (e!reactadd)`,
							value: `Create a role for users to get when reacted to a message.`,
							inline: true
						},
						{
							name: 'Verification (e!verification)',
							value: `Simple verification`,
							inline: true
						},
						{
							name: 'Roles on join, welcome message, invite logger (e!onjoin)',
							value: `Something that logs invites, and sends a welcome message.`,
							inline: true
						},
						{
							name: 'Anti advertising (e!antiad)',
							value: `Deletes messages with urls/advertising`,
							inline: true
						}
					])
			}
		}
	}
}