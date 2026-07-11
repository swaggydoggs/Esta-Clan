import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("loa")
    .setDescription("Give LOA role")
    .addStringOption(option =>
        option.setName("reason")
        .setDescription("Reason")
        .setRequired(true)
    );

export async function execute(interaction) {
    const loaRoleId = "1524817037652918282";
    const staffRoleId = "1520177903722037470";

    if (!interaction.member.roles.cache.has(staffRoleId)) {
        return interaction.reply({
            content: "❌ Staff only.",
            ephemeral: true
        });
    }

    await interaction.member.roles.add(loaRoleId);

    await interaction.reply({
        content: "✅ LOA role added.",
        ephemeral: true
    });
}
