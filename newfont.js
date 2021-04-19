
const generateEmbed = start => {
  const current = guilds.slice(start, start + 5)
  const embed = new Discord.MessageEmbed()
	
  current.forEach(g => embed.addField(g.name, `**ID:** ${g.id}
**Owner:** ${g.owner.user.tag}`))
  return embed
}
const author = message.author

message.channel.send(generateEmbed(0)).then(message => {
  if (guilds.length <= 5) return
  message.react('➡️')
  const collector = message.createReactionCollector(
    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === author.id,
    {time: 60000}
  )

  let currentIndex = 0
  collector.on('collect', reaction => {
    // remove the existing reactions
    message.reaction.removeAll().then(async () => {
      // increase/decrease index
      reaction.emoji.name === '⬅️' ? currentIndex -= 5 : currentIndex += 5
      // edit message with new embed
      message.edit(generateEmbed(currentIndex))
      if (currentIndex !== 0) await message.react('⬅️')
      if (currentIndex + 5 < guilds.length) message.react('➡️')
    })
  })
})