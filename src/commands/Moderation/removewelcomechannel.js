const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports={
    data: new SlashCommandBuilder()
    .setName('removewelchannel')
    .setDescription('This is disable welcome channel'),
    async execute(interaction){
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({content: "You don't have permission to execute this command!", ephemeral: true})


        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setDescription(`:white_check_mark: Your welcome channel has been removed`)

        await db.delete(`welchannel_${interaction.guild.id}`)

        await interaction.reply({embeds:[embed]});
    }

}