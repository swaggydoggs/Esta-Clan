import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("suggest")
        .setDescription("Send a suggestion for Esta-Clan")
        .addStringOption(option =>
            option
                .setName("idea")
                .setDescription("Your suggestion")
                .setRequired(true)
        ),

    async execute(interaction) {

        const suggestion = interaction.options.getString("idea");

        const SUGGESTION_CHANNEL_ID = "1520196606270636182";

        const channel = interaction.guild.channels.cache.get(
            SUGGESTION_CHANNEL_ID
        );

        if (!channel) {
            return interaction.reply({
                content: "❌ The suggestion channel could not be found.",
                ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
            .setColor("#5865F2")
            .setTitle("💡 New Suggestion")
            .setDescription(suggestion)
            .addFields(
                {
                    name: "👤 Suggested By",
                    value: `${interaction.user}`,
                    inline: true,
                },
                {
                    name: "📌 Status",
                    value: "🟡 Pending Review",
                    inline: true,
                }
            )
            .setFooter({
                text: "Esta-Clan Suggestions",
            })
            .setTimestamp();

        const suggestionMessage = await channel.send({
            embeds: [embed],
        });

        await suggestionMessage.react("👍");
        await suggestionMessage.react("👎");

        await interaction.reply({
            content: "✅ Your suggestion has been sent!",
            ephemeral: true,
        });
    },
};
