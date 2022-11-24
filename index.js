

const Discord = require('discord.js');



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS"] });

client.login(process.env.BOT);

client.on('ready', () => {
	console.log('Project ready')
})



client.on('messageCreate', msg => {

	const iword = ['cock', 'Cock', 'cOck', 'coCk', 'cocK', 'COCK', 'COck', 'COCk']

	
	if(iword.some(b => msg.content.includes(b))){
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