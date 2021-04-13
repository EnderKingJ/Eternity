const Discord = require(`discord.js`);
module.exports = {
	name: 'rules',
	description: "Embeds!",
	execute(message, args) {
		const newEmbed = new Discord.MessageEmbed()
			.setColor('#304281  ')
			.setTitle('Rules')
			.setURL('https://www.youtube.com/%27')
			.setDescription('This is a Embed for the rules')
			.setImage('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.theguardian.com%2Fscience%2F2019%2Fjun%2F17%2Fhow-dogs-capture-your-heart-evolution-puppy-dog-eyes&psig=AOvVaw1p_mzrDYx59392Fq01T6m0&ust=1616187213146000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMDntfbcuu8CFQAAAAAdAAAAABAE%27')
			.setFooter('Make sure to check out the rules channels')
			.addFields(
				{name: 'Rule 1', value: 'Dont Be toxic to peoples. People can be easily offended!'},
				{name: 'Rule 2', value: 'Dont Send Nsfw. Never in this server!'},
				{name: 'Rule 3', value: ' Dont use nazist or racism meanings. Never in this server!'},
				{name: 'Rule 4', value: ' Do not send malware links or similar. Never in this Server!'},
				{name: 'Rule 5', value: 'Follow these rules, so everyone can feel safe'}
			);
		message.channel.send(newEmbed);
	}
}