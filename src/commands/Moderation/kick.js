const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports={
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("This command for kicks member")
    .addUserOption(option => option.setName('target').setDescription("The user you want to kick").setRequired(true))
    .addStringOption(option =>option.setName('reason').setDescription("The reason for kicking member")),
    async execute (interaction, client){

        const kickUser = interaction.options.getUser('target');
        const kickMember = await interaction.guild.members.fetch(kickUser);
        const channel = interaction.channel;

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({content: "You don't have permission to execute this command!", ephemeral: true})
        if(!kickMember) return await interaction.reply({content: "The user mentioned is no longer within the server", ephemeral: true});
        if(!kickMember.kickable) return await interaction.reply({content:"I can't kick this user because they have roles above me or you", ephemeral: true});

        let reason = interaction.options.getString('reason');
        if(!reason) reason = "No reason given.";

        const dmEmbed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`:white_check_mark: You have been kicked ftom **${interaction.guild.name}** | ${reason} `)
        
        const embed =  new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`:white_check_mark:  ${kickUser.tag} has been **kicked** | ${reason}`)

        await kickMember.send({embeds: [dmEmbed]}).catch(err =>{
            return;
        });

        await kickMember.kick({reason: reason}).catch(err=>{
            interaction.reply({content: "There was an error", ephemeral:true});
        });

        await interaction.reply({embeds: [embed]});
    }
}