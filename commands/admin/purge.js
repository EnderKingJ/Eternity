module.exports = {
	name: 'purge',
	args: true,
	usage: '<amount>',
	deleted: true,
	description: 'Delete a certain amount of messages',
	permissions: "MANAGE_MESSAGES",
	execute(message, args) {
		const amount = parseInt(args[0]);

		if (isNaN(amount)) {
			return message.reply('that doesn\'t seem to be a valid number.');
		}
		if (amount < 100) {
			message.channel.bulkDelete(amount + 1, true);
		}
		else {
			message.reply('Please provide a number between 0 and 99!')
		}
	},
};