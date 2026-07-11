export default {
    name: "owner-panel",

    async execute(interaction) {

        if (!interaction.isStringSelectMenu()) return;

        if (interaction.values[0] === "shutdown") {

            if (interaction.user.id !== "1368313910943547413") {
                return interaction.reply({
                    content: "❌ You cannot use this.",
                    ephemeral: true
                });
            }

            await interaction.reply({
                content: "🛑 Shutting down bot...",
                ephemeral: true
            });

            setTimeout(() => {
                process.exit(0);
            }, 1000);
        }


        if (interaction.values[0] === "bot_info") {
            await interaction.reply({
                content: `🤖 Bot: ${interaction.client.user.tag}`,
                ephemeral: true
            });
        }


        if (interaction.values[0] === "settings") {
            await interaction.reply({
                content: "⚙️ Server settings panel coming soon.",
                ephemeral: true
            });
        }


        if (interaction.values[0] === "reload_commands") {
            await interaction.reply({
                content: "🔄 Reloading commands...",
                ephemeral: true
            });
        }
    }
};
