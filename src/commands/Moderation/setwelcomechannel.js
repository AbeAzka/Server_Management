const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports={
    data: new SlashCommandBuilder()
    .setName('setwelchannel')
    .addChannelOption(option => option.setName('channel').setDescription('This name of channel you want to add welcome').setRequired(true))
    .setDescription('This is a welcome channel'),
    async execute(interaction){
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: "You don't have permission to execute this command!", ephemeral: true})

        const channel = interaction.options.getChannel('channel');

        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setDescription(`:white_check_mark: Your welcome channel has been set to ${channel}`)

        await db.set(`welchannel_${interaction.guild.id}`, channel.id)

        await interaction.reply({embeds:[embed]});
    }

}