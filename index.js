const express = require('express');
const moment = require('moment')

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

const Discord = require('discord.js');

//DISCORD CLIENT//

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "DIRECT_MESSAGES", "GUILD_INTEGRATIONS"] });

client.login('MTAxOTQ4NjAyOTIwNTQ3MTMxMw.GBkT8I.dqP_NZ7lH6UiH9wuYm1zrsGKbRzKoNNI54Nz1A');



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
				name: 'Joined at:',
				value: moment(member.joinedAt).format('MMM/DD/YYYY'),
				inline: false
			},
			{
				name: 'Roles:',
				value: '[STILL WORKING ON]',
				inline: false
			}
      )
		.setTimestamp()


		interaction.reply({embeds: [ABOUT_EMBED]})

	}
})


