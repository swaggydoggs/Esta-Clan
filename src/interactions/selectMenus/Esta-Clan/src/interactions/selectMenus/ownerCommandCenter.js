import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { InteractionHelper } from "../../utils/interactionHelper.js";
import { createEmbed } from "../../utils/embeds.js";

export default {
    customId: "owner-command-center",

    async execute(interaction) {

        const value = interaction.values[0];

        let embed;

        if (value === "moderation") {
            embed = createEmbed({
                title: "🛡️ Moderation Settings",
                description:
                    "Configure staff roles, logs, automod, blocked words, and punishment settings.",
                color: "primary",
            });
        }

        if (value === "systems") {
            embed = createEmbed({
                title: "⚙️ Server Systems",
                description:
                    "Configure tickets, welcome messages, leveling, economy, QOTD, co-owners, and protection.",
                color: "primary",
            });
        }

        if (value === "bot") {
            embed = createEmbed({
                title: "🤖 Bot Management",
                description:
                    "Manage bot settings, commands, statistics, and owner tools.",
                color: "primary",
            });
        }

        if (value === "saving") {
            embed = createEmbed({
                title: "💾 Saving",
                description:
                    "Your changes will automatically save when confirmed.",
                color: "primary",
            });
        }

        await InteractionHelper.safeEditReply(interaction, {
            embeds: [embed],
            components: [],
        });
    },
};
