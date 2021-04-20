module.exports = {
	name: 'gnew',
	permissions: "MANAGE_MESSAGES",
	usage: `<time> <time format days, hours, minutes, or seconds (d, m, h, s)> <number of winners> <reward> `,
	minArgs: 4,
	args: true,
	async execute(message, args, client) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		let stop = false;
		const { MessageEmbed } = require(`discord.js`)
		const { channel, guild } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers/${guild.id}.json`);
		const times = {
			s: 1,
			m: 60,
			h: 60 * 60,
			d: 60 * 60 * 24,
			seconds: 1,
			minutes: 60,
			hours: 60 * 60,
			days: 60 * 60 * 24,
			second: 1,
			minute: 60,
			hour: 60 * 60,
			day: 60 * 60 * 24
		}
		const filter = m => m.author == message.author && !m.author.bot;
		const time1 = parseInt(args[0]) * 1000
    const time12 = args[1]
		const time123 = time1 * times[time12];
		const winners = parseInt(args[3]) || 1;
		args.shift();
		args.shift();
		args.shift();
		const reward = args.join(' ');
		let embed = new MessageEmbed()
			.setTitle(`Giveaway`.toUpperCase())
			.setDescription(`Winners: ${winners}\nReward: ${reward} \nReact with 🎉 to enter!\n Time: ${time123 / 1000 / times[time12]} ${time12}`);
		let embed2 = new MessageEmbed()
			.setTitle(`Giveaway Ended`)
			.setDescription(`**${reward}** \nReact with 🎉 to enter!\n Time: Ended.`);
		if (time12 !== true) {
			channel.send(embed).then(msg => {
				msg.react(`🎉`);
				let users = [];
				guildInfo.set(`${msg.id}-gwinamount`, winners);
				let collect = msg.createReactionCollector((reaction, user) => !user.bot && reaction.emoji.name === "🎉", { time: time123})
				collect.on('collect', (reaction, user) => {
					if (!users.includes(user.id)) {
						users.push(user.id);
						guildInfo.set(`${msg.id}-gusers`, users);
						user.send(`Successfully entered giveaway.`);
					}
				})
				async function edit() {
					msg.edit(embed2);
					let winUsers = [];
					for (i = 0; i < winners; i++) {
						let random = getRandomInt(users.length);
						winUsers.push(`<@${users[random]}>, `);
						delete users[random];
					}
					msg.channel.send(`${winUsers} won the ${reward}!`);
					guildInfo.set(`gwinners`, users);
				}
				setTimeout(edit, time123);
			})
		}
	}
}