const { SlashCommandBuilder } = require ('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Testing Description'),
    async execute(interaction, client) {
        await interaction.reply({content: 'Bot Working' });
    }
}