import { SlashCommandBuilder } from 'discord.js';

const STAFF_ROLE_ID = "1520177903722037470";

export const data = new SlashCommandBuilder()
    .setName("afk")
    .setDescription("Set yourself as AFK");

export async function execute(interaction) {

    if (!interaction.member.roles.cache.has(STAFF_ROLE_ID)) {
        return interaction.reply({
            content: "❌ You do not have permission to use this command.",
            ephemeral: true
        });
    }

    const member = interaction.member;

    const oldName = member.nickname || member.user.username;

    try {
        await member.setNickname(`AFK | ${oldName}`);

        await interaction.reply({
            content: `💤 ${member} is now AFK.`
        });

    } catch (error) {
        console.error(error);

        await interaction.reply({
            content: "❌ I cannot change your nickname. Make sure my bot role is above the staff role.",
            ephemeral: true
        });
    }
}
