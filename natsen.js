const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('natsen')
        .setDescription('Shows that Natsen is tuff'),

    async execute(interaction) {
        await interaction.reply('Natsen is tuff 🔥');
    },
};
