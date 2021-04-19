const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, mode: `worker`, totalShards: 'auto'});
manager.on('shardCreate', shard => {
	shard.on(`ready`, () => {
		console.log(`eiejoaj`)
	})
});
manager.spawn();
//aww man shards :<
const Topgg = require("@top-gg/sdk");
const express = require("express");

const app = express();
const webhook = new Topgg.Webhook(process.env.AUTH);
app.post("/vote", webhook.listener(async vote => {
	console.log(vote)
	console.log(`helo`)
  // req.vote will be your vote object, e.g
	manager.broadcast({ type: `voteID`, data: {voteID: vote.user } }).then(shard => {
		shard.send({ type: `voteID`, data: {voteID: vote.user }})
	})
}));
app.listen(8080);