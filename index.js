

const Discord = require('discord.js');



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS"] });

client.login(process.env.BOT);

client.on('ready', () => {
	console.log('Project ready')

	client.user.setActivity(`${client.guilds.cache.size} servers`, {type: 'WATCHING'})
})



client.on('messageCreate', msg => {

	const c2 = ['cock', 'Cock', 'cOck', 'coCk', 'cocK', 'COCK', 'COck', 'COCk', 'c0ck', 'C0ck']
	const d = ['dick', 'Dick', 'dIck', 'diCk', 'dicK', 'DICK', 'DIck', 'DICk', 'd1ck', 'D1ck']

	
	if(c2.some(c => msg.content.includes(c)) || d.some(d => msg.content.includes(d))){
		if(msg.author.id === client.user.id) return

		const logss = msg.guild.channels.cache.find(chan => chan.name === 'logs')

		
		const log = new Discord.MessageEmbed()
			.setTitle(`Moderation Logs`)
			.addFields(
				{
					name: '✉️  Message:',
					value: `${msg.content}`,
					inline: false,
				},
				{
					name: '👦  Offender:',
					value: `<@${msg.author.id}>`,
					inline: false,
				},
				{
					name: '📜  Reason:',
					value: 'Used an inappropriate word',
					inline: false
				},
				{
					name: 'General rule:',
					value: '```#2 Don t use inappropriate words```',
					inline: false
				}
			)
			.setFooter('ModLux Moderation Service - MLMS')
			.setColor('RANDOM')

		if(!msg.guild.channels.cache.find(chan => chan.name === 'logs')){
			return
		} else {
			logss.send({embeds: [log]})
		}




		
	}
})