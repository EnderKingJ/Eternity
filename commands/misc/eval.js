module.exports = {
	name: `eval`,
	ownerOnly: true,
	execute(message, args, client) {
  try {
    var result = message.content.trim().split(" ").slice(1).join(" ")
			let evaled = eval(result)

			const embed = new Discord.MessageEmbed()
			
			embed.setTitle('results')
			embed.addField('Code' , `\`\`\`js\n${result}\`\`\``)
			embed.addField('Error' , `\`\`\`diff\n+ None           \n\`\`\``, true)
			embed.addField('Error info' , `\`\`\`diff\n+ None           \n\`\`\``, true)
			embed.setColor('#000080')
			message.channel.send(embed)
    } 
		catch (err) {
      const embed = new Discord.MessageEmbed()
      embed.setTitle('results')
				var result = message.content.split(" ").slice(1).join(" ")
      embed.addField('Code' , `\`\`\`js\n${result}\`\`\``)
      embed.addField('Error Type' , `\`\`\`diff\n- ${err.name} \n\`\`\``, true)
      embed.addField('Error info' , `\`\`\`diff\n- ${err.message} \n\`\`\``, true)
      embed.setColor('#DC143C')
      message.channel.send(embed)
    }
	}
}