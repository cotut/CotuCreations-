

const Discord = require('discord.js');



const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS", "GUILD_PRESENCES"] });

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
	if(!inte.isCommand) return

	if(inte.commandName === 'ping'){
		inte.reply({content: `**Your latency is of *${client.ws.ping}* ms**`, ephemeral: true})
	} else if(inte.commandName === 'info'){
		const user = inte.options.getUser('user')
		const mem = inte.options.getMember('user')

		if(!user){
			const info1 = new Discord.MessageEmbed()
				.setColor('#303136')
				.setTitle('Info Service')
				.setFooter('Requested by urself')
				.setTimestamp()
				.setThumbnail(inte.user.avatarURL())
				.addFields(
					[
						{
							name: 'Ping:',
							value: `<@${inte.user.id}>`,
							inline: true,
						},
						{
							name: 'Tag:',
							value: inte.user.tag,
							inline: true,
						},
						{
							name: 'Id:',
							value: inte.user.id,
							inline: true,
						},
            {
							name: 'Status:',
							value: inte.member.presence?.status || 'offline',
							inlime: true,
						},
						{
							name: 'Avatar URL:',
							value: `[Image](${inte.user.avatarURL()})`,
							inline: true
						},
						{
							name: 'N° Roles:',
							value: (inte.member.roles.cache.size).toString(),
							inline: true,
						},
						{
							name: 'Roles',
							value: inte.member.roles.cache.map(role => `<@&${role.id}>`).join(' , '),
              inline: true,
							}
					]
				)

			inte.reply({embeds: [info1]})
		} else {

			
			const status = mem.presence?.status || 'offline'
				
			const info2 = new Discord.MessageEmbed()
				.setColor('#303136')
				.setTitle('Info Service')
				.setThumbnail(user.avatarURL())
				.setFooter(`Requested by ${inte.user.tag}`)
				.setTimestamp()
				.addFields(
					[
						{
							name: 'Ping:',
							value: `<@${user.id}>`,
							inline: true,
						},
						{
							name: 'Tag:',
							value: user.tag,
							inline: true,
						},
						{
							name: 'Id:',
							value: user.id,
							inline: true,
						},
						{
							name: 'Status:',
							value: status,
							inline: true,
						},
						{
							name: 'Avatar URL:',
							value: `[Image](${user.avatarURL()})`,
							inline: true
						},
						{
							name: 'N° Roles:',
							value: (mem.roles.cache.size).toString(),
							inline: true
						},
						{
							name: 'Roles',
							value: mem.roles.cache.map(role => `<@&${role.id}>`).join(' , '),
              inline: true,
						}
					]

				)

			inte.reply({embeds: [info2]})
		}
	}
})