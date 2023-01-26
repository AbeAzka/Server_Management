const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, ButtonInteraction } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket')
    .addChannelOption(option => option.setName('category').setDescription('This is category you want to create a ticket').setRequired(true))
    .setDescription('Use this command to create a ticket message'),
    
    async execute (interaction, client) {
        
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: "You must  be an administrator to create a ticket message", ephemeral: true})

        const category = interaction.options.getChannel('category');

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('button')
            .setEmoji('📩')
            .setLabel('Create Ticket')
            .setStyle(ButtonStyle.Secondary),
        )
        const embed = new EmbedBuilder()
        .setColor("Blue")
        .setTitle("Tickets & Support")
        .setDescription('Click the button below to talk with to staff (create a ticket)')


        await interaction.reply({embeds: [embed], components: [button] });

        const collector = await interaction.channel.createMessageComponentCollector();

        collector.on('collect', async i =>{
            await i.update({embeds: [embed], components: [button] });

            const channel = await interaction.guild.channels.create({
                name: `📩 ticket ${i.user.tag}`,
                type: ChannelType.GuildText,
                parent: category.id
            });

            channel.permissionOverwrites.create(i.user.id, { ViewChannel: true, SendMessages: true});
            channel.permissionOverwrites.create(channel.guild.roles.everyone, {ViewChannel: false, SendMessages: false});

            channel.send({content: `Welcome to your tickets ${i.user}. When you are done with problem here, ask Admin for close this ticket.`});
            
            i.user.send(`Your ticket in **${i.guild.name}** has been created. You can view it in ${channel}.`).catch(err =>{
                return;
            })
        })

        
    }
}