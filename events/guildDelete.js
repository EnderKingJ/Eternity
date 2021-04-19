module.exports = {
	name: `guildDelete`,
	async execute(guild, client) {
			let users7 = 0;
			const owner = client.users.cache.get(guild.ownerID);
			client.shard.broadcastEval(`this.channels.cache.get('828320940534136882').send('${owner.username}#${owner.discriminator} removed Eternity, oof')`)
			client.guilds.cache.forEach(guild => {
				guild.members.cache.forEach(member => {
					users7 += 1
				})
			})
			const amount1 = await client.shard.fetchClientValues(`guilds.cache.size`);
			const amount = amount1.reduce((acc, am) => acc + am, 0);
			client.user.setPresence({ 
				status: `online`,
				activity: {
					name: `e!help | eternitydc.xyz | ${amount} guilds | ${client.shard.count} shards`,
					type: 'WATCHING'
				}
			});
	}
}