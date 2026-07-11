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

        if (choice === "bot_info") {
            return interaction.reply({
                content: `🤖 Bot: ${client.user.tag}`,
                ephemeral: true
            });
        }

        if (choice === "reload_commands") {
            return interaction.reply({
                content: "🔄 Commands reload requested.",
                ephemeral: true
            });
        }

        if (choice === "settings") {
            return interaction.reply({
                content: "⚙️ Server settings panel.",
                ephemeral: true
            });
        }

        if (choice === "shutdown") {

            await interaction.reply({
                content: "🛑 Shutting down bot...",
                ephemeral: true
            });

            setTimeout(() => {
                process.exit(0);
            }, 1000);
        }
    }
};
