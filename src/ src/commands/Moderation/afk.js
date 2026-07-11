const { SlashCommandBuilder } = require("discord.js");

const STAFF_ROLE_ID = "1520177903722037470";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("afk")
        .setDescription("Set yourself as AFK"),

    async execute(interaction) {

        if (!interaction.member.roles.cache.has(STAFF_ROLE_ID)) {
            return interaction.reply({
                content: "❌ You do not have permission to use this command.",
                ephemeral: true
            });
        }

        const member = interaction.member;
        const oldName = member.nickname || member.user.username;

        await member.setNickname(`AFK | ${oldName}`);

        await interaction.reply({
            content: `💤 ${member} is now AFK.`
        });
    }
};
