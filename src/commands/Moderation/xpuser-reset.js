const{ SlashCommandBuilder } = require('@discordjs/builders');
const{ EmbedBuilder, AttachmentBuilder, PermissionsBitField } = require('discord.js');
const levelSchema = require('../../Schemas.js/level');
const Canvacord = require('canvacord');

module.exports={
    data: new SlashCommandBuilder()
    .setName('xpuser-reset')
    .setDescription('Reset a members XP')
    .addUserOption(option => option.setName('user').setDescription('The member you want to clear the XP of').setRequired(true)),
    async execute (interaction){
    
        const perm = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`:white_check_mark: You dont have permission to reset xp levels in this server`)
        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({embeds:[perm], ephemeral:true});

        const { guildId } = interaction;

        const target = interaction.options.getUser('user');

        levelSchema.deleteMany({Guild: guildId, User: target.id}, async(err, data) =>{

            const embed = new EmbedBuilder()
            .setColor('Aqua')
            .setDescription(`:white_check_mark: ${target.tag}'s XP has been reset!`)

            await interaction.reply({embeds:[embed]})
        })
    }

}