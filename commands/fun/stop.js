module.exports = {
	name: 'stop',
	execute(message, args, client) {
		const ytdl = require('ytdl-core');
		const voiceChannel = message.member.voice.channel;
		if (!voiceChannel) return message.channel.send(`You must be in a voice channel!`)
		voiceChannel.leave()
	}
}