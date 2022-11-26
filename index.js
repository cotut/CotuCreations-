

const Discord = require('discord.js');



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS"] });

client.login(process.env.BOT);

client.on('ready', () => {
	console.log('Project ready')

	client.user.setActivity("> /help", {type: 'PLAYING'})
})



client.on('messageCreate', msg => {

	const c2 = ['cock', 'c o c k', 'coc k', 'co ck', 'c ock', 'co c k', 'c o ck']
	const d = ['dick', 'd i c k']

	const msg1 = msg.content.toLowerCase()

	
	if(c2.some(c => msg1.includes(c)) || d.some(d => msg1.includes(d))){
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


client.on('interactionCreate', inte => {
	if(!inte.isChatInputCommand) return

	if(inte.commandName === 'ping'){
		inte.reply({content: `**Your latency is of *${client.ws.ping}* ms**`, ephemeral: true})
	}
})