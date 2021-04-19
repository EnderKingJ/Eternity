module.exports = {
	name: 'translate',
	args: true,
	minArgs: 2,
	maxArgs: 2,
	usage: `<from language> <to language>`,
	async execute(message, args) {
		const translate = require(`translate`);
		const froml = args[0];
		const tol = args[1];
		args.shift()
		args.shift()
		translate.from = froml
		translate.to = tol;
		translate.engine = `libre`
		const filter = e => e.author.id === message.author.id
		const msg1 = await message.channel.send(`Send what you would like to translate`).then(() => message.channel.awaitMessages(filter, {max: 1, time: 60000}).then(msgs => {
			return msgs.map(m => m.content);
		}));
		const msg = await translate(msg1);
		const Discord = require(`discord.js`);
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic:true}))
			.setDescription(msg);
		message.channel.send(embed);
	}
}