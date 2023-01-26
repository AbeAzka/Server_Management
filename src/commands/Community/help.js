const {SlashCommandBuilder}=require('@discordjs/builders');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle}=require('discord.js');

module.exports={
    data: new SlashCommandBuilder()
    .setName('helps')
    .setDescription('This is help command!'),
    async execute (interaction, client){

        const embed = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("Help Center")
        .setDescription("Help Command Guide:")
        .addFields({name: "Page 1", value: "Help & Resources (Button_1)"})
        .addFields({name: "Page 2", value: "Community Commands (Button_2)"})
        .addFields({name: "Page 3", value: "Moderation Commands (Button_3)"})

        const embed2 = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("Community Commands")
        .addFields({name: "/help", value: "You know, for check list of command :)"})
        .addFields({name: "/invites", value: "For check members invites count"})
        .addFields({name: "/test", value: "This command is the first command from this bot!"})
        .addFields({name: "/rank", value: "For know members rank"})
        .addFields({name: "/xp-leaderboard", value: "This command for check leaderboard from member ranks"})
        .setFooter({text: "Community Commands"})
        .setTimestamp()

        const embed3 = new EmbedBuilder()
        .setColor("Aqua")
        .setTitle("Moderation Commands")
        .addFields({name: "/ticket", value: "This function for send a Ticket"})
        .addFields({name: "/ban", value: "This function for band a member"})
        .addFields({name: "/unban", value: "This function for unban a member"})
        .addFields({name: "/reactionrole", value: "This function for create reactionrole with embed format"})
        .addFields({name: "/verify", value: "This function for check the user has verified"})
        .addFields({name: "/verify2", value: "This function for add verify embed"})
        .addFields({name: "/warn", value: "For warn a member"})
        .addFields({name: "/warnings", value: "For show list warns member"})
        .addFields({name: "/clearwarn", value: "For clear wans from member"})
        .addFields({name: "/setwelchannel", value: "For set welcome channel"})
        .addFields({name: "/removewelchannel", value: "Use this for remove welcome channel"})
        .addFields({name: "/xp-reset", value: "**Attention!!**, **If you try this command, all xp from server will be deleted!**"})
        .addFields({name: "/xpuser-reset", value: "Use this command for deleted rank from members"})
        .addFields({name: "/kick", value: "**Best Command**, Kicked all sus member from here"})
        .addFields({name: "/clear", value: "Do this for clear message in channel"})
        .addFields({name: "/lock", value: "For lock channel"})
        .addFields({name: "/unlock", value: "For unlock channel"})
        .setFooter({text: "Moderation Comands"})
        .setTimestamp()

        const button = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`page1`)
            .setLabel(`Page 1`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page2`)
            .setLabel(`Page 2`)
            .setStyle(ButtonStyle.Success),

            new ButtonBuilder()
            .setCustomId(`page3`)
            .setLabel(`Page 3`)
            .setStyle(ButtonStyle.Success),
        )

        const message = await interaction.reply({embeds: [embed], components: [button]});
        const collector = await message.createMessageComponentCollector();

        collector.on('collect', async i =>{

            if(i.customId === 'page1'){
                
                if(i.user.id !== interaction.user.id){
                    return await i.reply({content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({embeds: [embed], components: [button]})
            }

            if(i.customId === 'page2'){
                
                if(i.user.id !== interaction.user.id){
                    return await i.reply({content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({embeds: [embed2], components: [button]})
            }

            if(i.customId === 'page3'){
                
                if(i.user.id !== interaction.user.id){
                    return await i.reply({content: `Only ${interaction.user.tag} can use these buttons!`, ephemeral: true})
                }
                await i.update({embeds: [embed3], components: [button]})
            }
        })

        
    }

}