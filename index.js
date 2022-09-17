

const Discord = require('discord.js');

//DISCORD CLIENT//

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS"] });

client.login(process.env.BOT);

client.on('guildMemberAdd', guildMember => { 
	const emb = new Discord.MessageEmbed()
	.setTitle('Benvenuto!🎉')
	.setThumbnail(guildMember.guild.iconURL({size: 1024}))
	.setDescription('**Oi grazie per essere entrato😉**\n\ndivertiti, mostra le tue creazioni, ma soprattutto, aiutaci a diventare grandi (non ti perdere i giveaway). BENVENUTO DI NUOVO!')
	.setFooter(`By ${client.user.tag}`)
	.setColor('RANDOM')
    guildMember.guild.channels.cache.get('1019250025332752519').send(`<@${guildMember.user.id}>`)
	guildMember.guild.channels.cache.get('1019250025332752519').send({embeds: [emb]})

	const role = guildMember.guild.roles.cache.get('1019266493822804018')

	guildMember.roles.add(role)
	
});



//COMMANDS CREATE//

client.once('ready', () => {
	console.log(`Cotu i ve logged in as ${client.user.tag}`);

	client.guilds.cache.forEach(guild => {
		guild.commands.create({
			name: 'ping',
			description: 'Shows you your latency.'
		})

		guild.commands.create({
			name: 'about',
			description: 'Shows the mentioned member infos',
			options: [
				{
					name: 'user',
					description: 'Mention a user',
					type: 'USER',
					required: true
				}
			]
		})

		guild.commands.create({
			name: 'recensione',
			description: 'Dai una recensiano su quello che hai comprato.',
			options: [
				{
					name: 'prodotto',
					description: 'scrivi il prodotto su cui vuoi fare la recensione',
					type: 'STRING',
					required: true,
				},
				{
					name: 'stelle',
					description: 'Inserisci il numero di stelle, massimo: 5, min: 1',
					type: 'INTEGER',
					required: true,
				},
				{
					name: 'recensione',
					description: 'Inserisci la descrizione',
					type: 'STRING',
					required: true
				}

			]
		})

		guild.commands.create({
			name: 'vendi',
			description: 'Comando solo per l owner',
			options: [
				{
					name: 'prodotto',
					description: 'inserire titolo del prodotto',
					type: 'STRING',
					required: true,
				},
				{
					name: 'descrizione',
					description: 'Inserisci una descrizone',
					type: 'STRING',
					required: true,
				},
				{
					name: 'link',
					description: 'Inserisci il link',
					type: 'STRING',
					required: true,
				}
			]
		})
	})
})

client.on('interactionCreate', interaction => {
	if(!interaction.isCommand) return

	if(interaction.commandName === 'ping'){
		interaction.reply(`Hey ${interaction.user}, il tuo ping é di ||${client.ws.ping}||.`)
	} else if(interaction.commandName === 'about') {

		const member = interaction.options.getMember('user');
		const ABOUT_EMBED = new Discord.MessageEmbed()
			.setColor('RANDOM')
			.setTitle(`${member.user.tag} - info`)
			.setThumbnail(`${member.user.avatarURL()}`)
			.addFields(
				{
					name: 'Id:',
					value: member.user.id,
					inline: false
				},
			{
				name: 'User tag:',
				value: member.user.tag,
				inline: false
			},
    	{
				name: 'Roles:',
				value: '[STILL WORKING ON]',
				inline: false
			}
      )
		.setTimestamp()
		.setFooter('Cotu creations', 'https://i.ibb.co/wNkZG5V/a89c4048ded8.png')


		interaction.reply({embeds: [ABOUT_EMBED]})

	} else if(interaction.commandName === 'recensione'){
		const pro = interaction.options.getString('prodotto')
		const stel = interaction.options.getInteger('stelle')
		const rec = interaction.options.getString('recensione')
		const chan = client.channels.cache.get('1019250025332752521')

		const e1 = new Discord.MessageEmbed()
		.setTitle(`Recensione di ${interaction.user.tag}`)
		.addFields(
			{
				name: 'Prodotto:',
				value:`${pro}`,
				inline: false,
			},
			{
				name: 'Stelle:',
				value: '⭐',
				inline: false,
			},
			{
				name: 'Recensione',
				value: `${rec}`,
				inline: false
			}
		)

		const e2 = new Discord.MessageEmbed()
		.setTitle(`Recensione di ${interaction.user.tag}`)
		.addFields(
			{
				name: 'Prodotto:',
				value:`${pro}`,
				inline: false,
			},
			{
				name: 'Stelle:',
				value: '⭐⭐',
				inline: false,
			},
			{
				name: 'Recensione',
				value: `${rec}`,
				inline: false
			}
		)

		const e3 = new Discord.MessageEmbed()
		.setTitle(`Recensione di ${interaction.user.tag}`)
		.addFields(
			{
				name: 'Prodotto:',
				value:`${pro}`,
				inline: false,
			},
			{
				name: 'Stelle:',
				value: '⭐⭐⭐',
				inline: false,
			},
			{
				name: 'Recensione',
				value: `${rec}`,
				inline: false
			}
		)

		const e4 = new Discord.MessageEmbed()
		.setTitle(`Recensione di ${interaction.user.tag}`)
		.addFields(
			{
				name: 'Prodotto:',
				value:`${pro}`,
				inline: false,
			},
			{
				name: 'Stelle:',
				value: '⭐⭐⭐⭐',
				inline: false,
			},
			{
				name: 'Recensione',
				value: `${rec}`,
				inline: false
			}
		)

		const e5 = new Discord.MessageEmbed()
		.setTitle(`Recensione di ${interaction.user.tag}`)
		.addFields(
			{
				name: 'Prodotto:',
				value:`${pro}`,
				inline: false,
			},
			{
				name: 'Stelle:',
				value: '⭐⭐⭐⭐⭐',
				inline: false,
			},
			{
				name: 'Recensione',
				value: `${rec}`,
				inline: false
			}
		)

		if(stel < 1) return interaction.reply('❌ Recensione non valida, il minimo di stelle é 1' + `|| ${interaction.user} ||`)
		if(stel === 1){
			chan.send({embeds: [e1]})
			interaction.reply('✅ Recensione inviata')

		}
		if(stel > 5) return interaction.reply('❌ Recensione non valida, il massimo di stelle é 5'+ `|| ${interaction.user} ||`)
		if(stel === 2){
			chan.send({embeds: [e2]})
			interaction.reply('✅ Recensione inviata')

		}
		if(stel === 3){
			chan.send({embeds: [e3]})
			interaction.reply('✅ Recensione inviata')

		}
		if(stel === 4){
			chan.send({embeds: [e4]})
			interaction.reply('✅ Recensione inviata')

		}
		if(stel === 5){
			chan.send({embeds: [e5]})
			interaction.reply('✅ Recensione inviata')

		}

		




	} else if(interaction.commandName === 'vendi'){
		if(!interaction.member.roles.cache.has('1019267950500388886')) return interaction.reply('Non hai il permesso')

		const title = interaction.options.getString('prodotto')
		const desc = interaction.options.getString('descrizione')
		const link = interaction.options.getString('link')
		const chan = interaction.guild.channels.cache.get('1019648984840679554')

		const embed = new Discord.MessageEmbed()
			.setTitle(`${title}`)
			.setDescription(`${desc}`)
			.addFields(
				{
					name: 'link',
					value: `${link}`,
					inline: false
				}
			)
		
		interaction.reply('Venduto')
		chan.send('@here')
		chan.send({embeds: [embed]})
	}
})


