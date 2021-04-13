module.exports = {
	name: 'ytplay',
	args: true,
	usage: `<yt url>`,
	description: `Play the audio from a yt video or search.`,
	execute(message, args) {
		const ytdl = require('ytdl-core');
		const ytsr = require(`ytsr`);
		const url = args[0];
		const search = args[1] ? args.join(' ') : null;
		console.log(search)
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send(`You must be in a voice channel!`)
		const { guild } = message;
		const JSONdb = require(`simple-json-db`);
		const guildInfo = new JSONdb(`./servers${guild.id}.json`);
		console.log(`helo`)
 		voiceChannel.join().then(async connection => {
			let test;
		  if (search) test = await ytsr(search, { limit: 1})
			const stream = ytdl(search ? test.url : url);
			if (!stream) return message.channel.send(`Invalid url.`);
			const dispatcher = connection.play(stream)
			dispatcher.on('finish', () => voiceChannel.leave());
		})
	}
}