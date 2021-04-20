module.exports = {
	name: `topic`,
	permissions: `MANAGE_CHANNELS`,
	description: `Change the topic of the channel`,
	args: true,
	usage: `<topic>`,
	execute(message, args) {
		const { channel } = message;
		const topic = args.join(' ');
		channel.setTopic(topic).then(() => {
			return message.reply(`Successfully set topic to ${topic}`).then(msg => {
				message.delete()
				setTimeout(() => msg.delete(), 5000)
			});
		}).catch(error => {
			return message.reply(`Your topic may be too long, or I do not have the correct permissions to do this.`).then(msg => {
				setTimeout(() => msg.delete(), 5000)
				message.delete()
			});
		})

	}
}