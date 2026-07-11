const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loa")
        .setDescription("Give yourself the LOA role")
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for your LOA")
                .setRequired(true)
        ),

    async execute(interaction) {

        const loaRoleId = "1524817037652918282";
        const staffRoleId = "1520177903722037470";

        // Check staff role
        if (!interaction.member.roles.cache.has(staffRoleId)) {
            return interaction.reply({
                content: "❌ You must be staff to use this command.",
                ephemeral: true
            });
        }

        const loaRole = interaction.guild.roles.cache.get(loaRoleId);

        if (!loaRole) {
            return interaction.reply({
                content: "❌ LOA role not found.",
                ephemeral: true
            });
        }

        // Check if already has LOA
        if (interaction.member.roles.cache.has(loaRoleId)) {
            return interaction.reply({
                content: "❌ You already have the LOA role.",
                ephemeral: true
            });
        }

        await interaction.member.roles.add(loaRole);

        const reason = interaction.options.getString("reason");

        await interaction.reply({
            content: `✅ LOA role given!\n**Reason:** ${reason}`,
            ephemeral: true
        });
    }
};
