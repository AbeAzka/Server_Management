const { SlashCommandBuilder }=require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField, Client}=require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('This is for unban member')
    .addUserOption(option => option.setName('user').setDescription(`The member you want to ban`).setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription(`the reason for unban member`).setRequired(true)),
    async execute(interaction,client){

        const userID = interaction.options.getUser('user');
        

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({content: "You don't have permission to execute this command!", ephemeral: true})
        if(interaction.member.id === userID) return await interaction.reply({content:"You can't ban yourself",ephemeral: true});

        let reason = interaction.options.getString('reason');
        if (!reason ) reason = "No reason giveb";

        const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setDescription(`:white_check_mark: <@${userID}> has been unbanned | ${reason}`)

        await interaction.guild.bans.fetch()
        .then(async bans => {
            if(bans.size == 0) return await interaction.reply({content:"There is no one banned from this guild.", ephemeral:true})
            let bannedID = bans.find(ban => ban.user.id == userID);
            if(!bannedID) return await interaction.reply({content:"The ID stated is not banned from this server.", ephemeral:true})

            await interaction.guild.bans.remove(userID, reason).catch(err => {
                return interaction.reply({content:"I can't unban this user"})
            })
        })
        await interaction.reply({embeds: [embed]})
    }

}