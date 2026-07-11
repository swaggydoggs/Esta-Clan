import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("ship")
        .setDescription("Calculate the love compatibility between two users")
        .addUserOption(option =>
            option
                .setName("user1")
                .setDescription("Choose the first person")
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName("user2")
                .setDescription("Choose the second person")
                .setRequired(true)
        ),

    async execute(interaction) {

        const user1 = interaction.options.getUser("user1");
        const user2 = interaction.options.getUser("user2");

        // Creates a consistent percentage
        const names = [
            user1.id,
            user2.id
        ].sort().join("");

        let score = 0;

        for (const char of names) {
            score += char.charCodeAt(0);
        }

        const percentage = score % 101;

        let message;

        if (percentage >= 90) {
            message = "💍 Perfect match! You two are meant to be!";
        } 
        else if (percentage >= 70) {
            message = "💖 Great chemistry! This could work!";
        } 
        else if (percentage >= 40) {
            message = "💛 There might be something there!";
        } 
        else {
            message = "💔 Better as friends for now!";
        }

        const bar = "❤️".repeat(Math.floor(percentage / 10)) +
                    "🖤".repeat(10 - Math.floor(percentage / 10));

        const embed = new EmbedBuilder()
            .setColor("Pink")
            .setTitle("💘 Love Calculator")
            .setDescription(
                `${user1} ❤️ ${user2}\n\n` +
                `**Compatibility:** ${percentage}%\n` +
                `${bar}\n\n` +
                message
            )
            .setFooter({
                text: "Esta-Clan Love Calculator 💕"
            });

        await interaction.reply({
            embeds: [embed]
        });
    },
};
