const {ShardingManager} = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: process.env.TOKEN, mode: `worker`, totalShards: 'auto'});
const Statcord = require(`statcord.js`);
const ws = require(`ws`);
manager.on('shardCreate', shard => {
	console.log(`helo`)
	shard.on(`ready`, () => {
		console.log(`eiejoaj`)
	})
});
const JSONdb = require(`simple-json-db`)
const http = require(`http`);
manager.spawn();
//aww man shards :<
const Topgg = require("@top-gg/sdk");
const express = require("express");
const statcord = new Statcord.ShardingClient({
	manager,
	key: process.env.KEY
});
const app = express();
const server = http.createServer(app);
const url = require(`url`);
const transfertoken = process.env.TRANSFERTOKEN;
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.post(`/bruhbot-transfer`, (req, res) => {
	res.type("application/json");
	if (req.body.token !== transfertoken) return res.send({
		error: "Unauthorized",
		data: {}
	});
	const addedAmount = parseInt(req.body.amount) * 125;
	const user = req.body.user;
	const userInfo = new JSONdb(`./users/${user.id}.json`);
	let currentCoins = parseInt(userInfo.get("coins")) || 0;;
	currentCoins += addedAmount;
	userInfo.set("coins", currentCoins);
	res.send({
		error: false,
		data: {
			transferRate: 125,
			balance: currentCoins,
			profit: addedAmount
		}
	});
});
const OAuthClient = require(`disco-oauth`);
const client = new OAuthClient('833235095472308235', process.env.SECRET)
const cookies = require(`cookies`);
const cookieparser = require(`cookie-parser`);
client.setRedirect(`https://dashboard.eternitydc.xyz/login`);
client.setScopes('guilds', 'identify')
app.use(cookies.express());
app.use(cookieparser());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
const Discord = require(`discord.js`)
app.get(`/`, async (req, res) => {
	const key = req.cookies.get(`key`);
	if (!key) res.redirect(`/login`);
	else {
		let user = await client.getUser(key).catch(error => {
			return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=833235095472308235&redirect_uri=https%3A%2F%2Fdashboard.eternitydc.xyz%2Flogin&response_type=code&scope=identify%20guilds`)
		});
		let guildsHolder = await client.getGuilds(key);
		const myGuilds = new Discord.Collection()
		guildsHolder.forEach(guild => {
			if (guild._permissions.includes(`MANAGE_GUILD`)) {
				myGuilds.set(guild._id, guild);
			}
		})
		if (!myGuilds) return res.send(`You do not have any guilds that I can access!`);
		res.sendFile(`${__dirname}/views/dashboard.html`);
	}
})
app.get('/login', async (req, res) => {
	console.log(req.query.code)
	const key = req.cookies.get(`key`);
	if (!key) {
		if (req.query.code === undefined) return res.redirect(`https://discord.com/api/oauth2/authorize?client_id=833235095472308235&redirect_uri=https%3A%2F%2Fdashboard.eternitydc.xyz%2Flogin&response_type=code&scope=identify%20guilds`)
		let userkey = await client.getAccess(req.query.code).catch(console.error);
		res.cookies.set('key', userkey);
		res.redirect(301, `/`)
	}
	if (key) {
		let user = await client.getUser(key)
		console.log(user);
		res.redirect(301, `/`)
	}
})
const wsServer = new ws.Server({
	server
})
const clients = [];
wsServer.on("connection", async (sock, req) => {
	console.log(`hello there fellow dashboard user`);
	const key = req.cookies.get(`key`);
	const user = await client.getUser(key);
	clients.push({ key: key, socket: sock });
	sock.on("message", data => {
		let message = data.substring(1);
		switch (data[0]) {
			case "a":
				const sUser = clients.find(thisuser => {
					return thisuser.key === key;
				});
				sUser.send(`${user.username}#${user.discriminator}`);
				break;
		}
	})
})
const webhook = new Topgg.Webhook(process.env.AUTH);
app.post(`/ob0wkb0wb0w0bkamoa`, webhook.listener(async vote => {
	console.log(vote)
	console.log(`helo`)
  // req.vote will be your vote object, e.g
	manager.broadcast({ type: `voteID`, data: {voteID: vote.user } }).then(shard => {
		shard.send({ type: `voteID`, data: {voteID: vote.user }})
	})
}));
statcord.on("autopost-start", () => {
    // Emitted when statcord autopost starts
    console.log("Started autopost");
});

statcord.on("post", status => {
    // status = false if the post was successful
    // status = "Error message" or status = Error if there was an error
    if (!status) console.log("Successful post");
    else console.error(status);
});
server.listen(8080);