const OWNER_ID = "1368313910943547413";

export default {
    customId: "owner-panel",

    async execute(interaction, client) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ You cannot use this panel.",
                ephemeral: true
            });
        }

        const choice = interaction.values[0];

        switch (choice) {

            case "moderation":
                return interaction.reply({
                    content:
                    "🛡️ Moderation\n\nStaff roles, logs, blocked words, mute settings, and automod tools.",
                    ephemeral: true
                });

            case "systems":
                return interaction.reply({
                    content:
                    "⚙️ Server Systems\n\nTickets, welcome messages, leveling, economy, QOTD, co-owners, and protection settings.",
                    ephemeral: true
                });

            case "saving":
                return interaction.reply({
                    content:
                    "💾 Saving\n\nChanges save automatically after confirmation.",
                    ephemeral: true
                });
        }
    }
};
