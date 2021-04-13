module.exports = {
	name: 'type',
	execute(message, args) {
		let words = `I am a speedy typer`
		let fakeWords = `I‎‎‎ am a ‎‎‎speedy ‎‎‎typer`
		const filter = m => m.author.id === message.author.id && m.content === words
		message.channel.send(`Type \`${fakeWords}\` for rewards!`).then(() => {
			message.channel.awaitMessages(filter, {max: 1, time: 5000})
			.then(answer => {
				console.log(answer.map(msg => msg.content).toString())
				if (answer.map(msg => msg.content).toString() === words) message.channel.send(`<@${answer.map(msg => msg.author.id)}> get scammmmmeeeedddd`);
				else {
					message.channel.send(`You ran out of time!`);
				}
			})
			.catch(error => {
				console.log(error);
			})
		})
	}
}