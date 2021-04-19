module.exports = {
	name: `listguilds`,
	ownerOnly: true,
	async execute(message, args, client) {
		const amount1 = await client.shard.broadcastEval('this.guilds.cache.map(g => ` \${g.name}`)')
		console.log(amount1)
		const amount = amount1.reduce((acc, e) => `${acc},` + e, 0)
		console.log(amount)
		message.channel.send(amount, { split: true })
	}
}