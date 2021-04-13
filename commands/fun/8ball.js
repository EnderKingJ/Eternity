module.exports = {
	name: '8ball',
	args: true,
	usage: `<yes or no question>`,
	minArgs: 1,
	execute(message, guild) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}
		let options = [
			'Of course!',
			`Yes`,
			`Maybe`,
			'Only the stars can tell',
			`Check back later for an answer`,
			`DEFINITELY NOT`,
			`No`,
			`I think so!`,
			`I think not!`
		]
	let reply = options[getRandomInt(options.length)];
	message.channel.send(reply);
	}
}