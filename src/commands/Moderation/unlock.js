const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const { execute } = require("./xp-reset");

module.exports={
    data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("For unlock channel")
    .addChannelOption(option => option.setName('channel').setDescription("The channel you want to lock").addChannelTypes(ChannelType.GuildText).setRequired(true)),
    async execute(interaction){

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return await interaction.reply({content: "You don't have permission to execute this command!", ephemeral: true})
        let channel = interaction.options.getChannel('channel');

        channel.permissionOverwrites.create(interaction.guild.id, {SendMessages: true})

        const embed = new EmbedBuilder()
        .setColor('Aqua')
        .setDescription(`:white_check_mark:  ${channel} has been **unlocked**`)

        await interaction.reply({embeds: [embed]})
    }
}