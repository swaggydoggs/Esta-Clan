import { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle 
} from "discord.js";
module.exports = {
    data: new SlashCommandBuilder()
        .setName("loa")
        .setDescription("Request a Leave of Absence")
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Reason for LOA")
                .setRequired(true)
        ),

    async execute(interaction) {

        const STAFF_ROLE = "1520177903722037470";
        const LOA_CHANNEL = "1520419079020609547";

        // Staff only
        if (!interaction.member.roles.cache.has(STAFF_ROLE)) {
            return interaction.reply({
                content: "❌ You do not have permission to use this command.",
                ephemeral: true
            });
        }

        const reason = interaction.options.getString("reason");

        const channel = interaction.guild.channels.cache.get(LOA_CHANNEL);

        if (!channel) {
            return interaction.reply({
                content: "❌ LOA channel not found.",
                ephemeral: true
            });
        }


        const embed = new EmbedBuilder()
            .setTitle("📋 New LOA Request")
            .setColor("Yellow")
            .addFields(
                {
                    name: "Requested By",
                    value: `${interaction.user}`,
                    inline: true
                },
                {
                    name: "Reason",
                    value: reason
                }
            )
            .setTimestamp();


        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`loa_accept_${interaction.user.id}`)
                    .setLabel("Accept")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId(`loa_decline_${interaction.user.id}`)
                    .setLabel("Decline")
                    .setStyle(ButtonStyle.Danger)
            );


        await channel.send({
            embeds: [embed],
            components: [buttons]
        });


        await interaction.reply({
            content: "✅ LOA request sent for approval.",
            ephemeral: true
        });
    }
};
