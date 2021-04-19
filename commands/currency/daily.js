module.exports = {
	name: `daily`,
	description: `Get them juicy coins`,//lol
	cooldown: 60 ** 2 * 24,
	execute(message) {
		const Discord = require(`discord.js`);
		const fs = require(`fs`);
		const { author } = message;
		const JSONdb = require(`simple-json-db`);
		if (!fs.existsSync(`./users/${author.id}.json`)) fs.writeFileSync(`./users/${author.id}.json`, ``);
		const userInfo = new JSONdb(`./users/${author.id}.json`);
		const funni = [
			"PROFITS PROFITS PROFITS",
			"daily stonks",
			"juicy, juicy coins",
			"bruhbot did this worse",
			"gamer",
			"raw stonks",
			"raw profits"
		];//funni
		let coins = userInfo.get("coins") || 0;
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		const randomRange = function(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}
		const newMoney = randomRange(10000, 15000);//me big brain :>
		console.log(newMoney)
		coins += newMoney;
		if (!coins) return console.log(`FUCCCC`)//bruh
		userInfo.set("coins", coins);
		console.log(`test1`)
		const embed = new Discord.MessageEmbed()
			.setAuthor(author.tag, author.displayAvatarURL({dynamic: true}))
			.setTimestamp(Date.now())
			.setTitle(funni[getRandomInt(funni.length)])
			.setDescription(`Here are your daily coins for the day: **${newMoney}** coins!`);
		console.log(`test2`)
		message.channel.send(embed).catch(console.error);
	}
}