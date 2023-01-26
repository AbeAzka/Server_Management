const{ SlashCommandBuilder } = require('@discordjs/builders');
const{ EmbedBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');
const levelSchema = require('../../Schemas.js/level');
const Canvacord = require('canvacord');

module.exports={
    data: new SlashCommandBuilder()
    .setName('xp-reset')
    .setDescription('Reset all of the servers XP levels'),
    async execute (interaction){
    
        const perm = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`:white_check_mark: You dont have permission to reset xp levels in this server`)
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({embeds:[perm], ephemeral:true});

        const { guildId } = interaction;

        levelSchema.deleteMany({Guild: guildId}, async(err, data) =>{

            const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setDescription(`:white_check_mark: The XP system in your servers has been reset!`)

            await interaction.reply({embeds:[embed]})
        })
    }

}