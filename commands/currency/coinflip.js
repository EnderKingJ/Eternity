module.exports = {
	name: `coinflip`,
	args: true,
	cooldown: 35,
	usage: `<amount>`,
	execute(message, args) {
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${message.author.id}.json`);
		const Discord = require(`discord.js`)
		let coins = userInfo.get("coins") || 0;
		coins = parseInt(coins);
		let amount1 = args[0]
		let amount;
		if (amount1 == 'all' || amount1 == 'max') amount = coins;
		else amount = amount1
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		if (amount > coins) return message.channel.send(`You can't bet more coins than you have!`);
		if ((coins + amount) < coins) return message.channel.send(`Please provide a positive integer.`);
		console.log(`testing123`)
		const flip = getRandomInt(2)
		console.log(getRandomInt(1))
		console.log(flip)
		if (flip == 0) {
			console.log(`winner`)
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(`You won!`)
				.setDescription(`You won ${amount} coins!`)
				.setColor(`03fc03`);
			console.log(`herm`)
			message.channel.send(embed);
			coins += amount;
		}
		else if (flip == 1) {
			console.log(`loser`)
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
				.setTitle(`i smell a loser`)
				.setDescription(`You lost ${amount} coins...`)
				.setColor(`#fc0303`);
			message.channel.send(embed);
			coins -= amount;
		}
		userInfo.set("coins", coins)
	}
}