import { InteractionHelper } from "../utils/interactionHelper.js";
import { createEmbed } from "../utils/embeds.js";

export default {
    customId: "owner-panel",

    async execute(interaction, client) {

        const OWNER_ID = "1368313910943547413";

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ You cannot use this panel.",
                ephemeral: true,
            });
        }

        const choice = interaction.values[0];

        if (choice === "bot_info") {

            const embed = createEmbed({
                title: "🤖 Bot Information",
                description: [
                    `**Name:** ${client.user.username}`,
                    `**ID:** ${client.user.id}`,
                    `**Servers:** ${client.guilds.cache.size}`,
                    `**Users:** ${client.users.cache.size}`,
                ].join("\n"),
                color: "primary",
            });

            return interaction.update({
                embeds: [embed],
                components: interaction.message.components,
            });

        }


        if (choice === "reload_commands") {

            return interaction.reply({
                content: "🔄 Command reload system is not connected yet.",
                ephemeral: true,
            });

        }


        if (choice === "settings") {

            return interaction.reply({
                content: "🔧 Server settings panel coming soon.",
                ephemeral: true,
            });

        }


        if (choice === "shutdown") {

            await interaction.reply({
                content: "🛑 Shutting down bot...",
                ephemeral: true,
            });

            process.exit(0);
        }
    },
};
