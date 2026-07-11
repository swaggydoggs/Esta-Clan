import {
    SlashCommandBuilder,
    EmbedBuilder
} from "discord.js";

const LOA_CHANNEL_ID = "1520419079020609547";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("loa")
        .setDescription("Request a Leave of Absence")
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("Reason for your LOA")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("days")
                .setDescription("How many days will you be away?")
                .setRequired(true)
        ),

    async execute(interaction) {
        const reason = interaction.options.getString("reason");
        const days = interaction.options.getInteger("days");

        const loaChannel = interaction.guild.channels.cache.get(LOA_CHANNEL_ID);

        if (!loaChannel) {
            return interaction.reply({
                content: "❌ LOA channel could not be found.",
                ephemeral: true,
            });
        }

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("📅 New Leave of Absence")
            .addFields(
                {
                    name: "👤 Staff Member",
                    value: `${interaction.user}`,
                    inline: true,
                },
                {
                    name: "⏳ Duration",
                    value: `${days} day(s)`,
                    inline: true,
                },
                {
                    name: "📝 Reason",
                    value: reason,
                }
            )
            .setFooter({
                text: `User ID: ${interaction.user.id}`,
            })
            .setTimestamp();

        await loaChannel.send({
            embeds: [embed],
        });

        await interaction.reply({
            content: "✅ Your LOA request has been submitted.",
            ephemeral: true,
        });
    },
};
