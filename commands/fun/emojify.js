module.exports = {
	name: 'emojify',
	args: true,
	minArgs: 1,
	description: `Emojify anything!`,
	usage: `<words to be emojified>`,
	execute(message, args) {
		const filter = data => {
			let args1 = data.split(" ");
			let splitData = e => args1[e].split("");
			let outcome = "";
			let outcome1 = ""
			for (i = 0; i < args1.length; i++) {
				if (/(:[^:\s]+:|<:[^:\s]+:[0-9]+>|<a:[^:\s]+:[0-9]+>)/g.test(args1[i])) {
					outcome += args1[i] + " ";
				}
				else {	
					outcome1 = "";
					for (e = 0; e < args1[i].length; e++) {
						if (splitData(i)[e] == " ") {
							outcome1 += " ";
						}
						else if (/[\s~!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._1234567890]/g.test(splitData(i)[e])) {
							outcome1 += `${splitData(i)[e]}`
						}
						else {
							outcome1 += `:regional_indicator_${splitData(i)[e]}:`
							console.log(splitData(i)[e])
						}
					}
					outcome += `${outcome1}    `
					console.log(outcome)
				}
			}
			return outcome;
		}
		message.channel.send(filter(args.join(' ').toLowerCase()))
	}
}