module.exports = {
	name: 'intro',
	description: `Gives an intro to new users!`,
	async execute(message) {
		const Discord = require(`discord.js`);
		message.channel.send(`Hey there! My name is Eternity, and I am a multi purpose bot with the features of many other popular bots. I am open source (, and approved on https://top.gg/bot/822105903599058994! For more info about me, just say \`yes\``);
		const filter = e => e.author.id === message.author.id
		const contin = await message.channel.awaitMessages(filter, {limit: 1}).then(msg => {
			return msg;
		})
		console.log(contin)
	}
}