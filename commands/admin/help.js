const { prefix } = require('../../config.json');

const Discord = require('discord.js')
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	usage: '[command name]',
	execute(message, args) {
		const data = [];
		const data1 = [];
		const { commands } = message.client;
		console.log(commands)
		if (!args.length) { 
			data1.push('Here\'s a list of all my commands:\n');
			let cmds = commands.map(command => command.name)
			cmds.shift();
			data.push(cmds.join(', '));
			data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!\n`);
			const exampleEmbed = new Discord.MessageEmbed()
				.setColor('#0099ff')
				.setTitle(data1)
				.setDescription(data.join(''));
			return message.author.send(exampleEmbed)
				.then(() => {
					if (message.channel.type === 'dm') return;
					message.reply('I\'ve sent you a DM with all my commands, and if you need help make sure to join the main server! (do e!invite to get the link)');
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
					message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
				});
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });

		// ...
	},
};