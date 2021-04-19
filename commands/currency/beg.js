module.exports = {
	name: 'beg',
	description: `Get down on your knees and BEG that I give you coins.`,
	cooldown: 35,
	execute(message) {
		const Discord = require(`discord.js`);
		const fs = require(`fs`);
		const { author } = message;
		const JSONdb = require(`simple-json-db`);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		function getJoke() {
			const jokes = [
				`that one karen`,
				`cleaning your room is actually rewarding... `,
				`when your mother walks in`,
				`mothers credit card is fun`,
				`lucky`,
				`you better spend that money wisely`
			]
			return jokes[Math.floor(Math.random() * (jokes.length - 0)) + 0];
		}
		function randomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		console.log(`test`)
		const addedCoins = randomInt(0, 700);
		let coins = userInfo.get("coins") || 0;
		coins += addedCoins;
		const embed = new Discord.MessageEmbed()
			.setAuthor(author.tag, author.displayAvatarURL({dynamic: true}))
			.setTitle(getJoke())
			.setDescription(`You receieved ${addedCoins} coins, congrats!`);
		message.channel.send(embed);
		userInfo.set("coins", coins);
	}
}
