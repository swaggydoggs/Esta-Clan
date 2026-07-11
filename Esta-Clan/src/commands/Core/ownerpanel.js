import {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";

import { InteractionHelper } from "../../utils/interactionHelper.js";
import { createEmbed } from "../../utils/embeds.js";

const OWNER_ID = "1368313910943547413";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("ownerpanel")
        .setDescription("Open the Owner Command Center"),

    async execute(interaction, guildConfig, client) {

        // Owner check
        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ You cannot use the Owner Command Center.",
                ephemeral: true,
            });
        }

        await InteractionHelper.safeDefer(interaction);

        const embed = createEmbed({
            title: "🔱 Owner Command Center",
            description:
                "Pick a system below to configure Estabot for this server.",
            color: "primary",
            fields: [
                {
                    name: "🛡️ Moderation",
                    value:
                        "Staff, roles, blocked words, logs, mute settings, and automod tools.",
                    inline: false,
                },
                {
                    name: "⚙️ Server Systems",
                    value:
                        "Tickets, welcome messages, leveling, economy, QOTD, co-owners, and protection settings.",
                    inline: false,
                },
                {
                    name: "💾 Saving",
                    value:
                        "Changes save automatically as soon as you confirm them.",
                    inline: false,
                },
                {
                    name: "🏠 Server",
                    value: interaction.guild?.name || "Unknown",
                    inline: true,
                },
                {
                    name: "👑 Owner",
                    value: `<@${OWNER_ID}>`,
                    inline: true,
                },
            ],
        });


        const menu = new StringSelectMenuBuilder()
            .setCustomId("owner-command-center")
            .setPlaceholder("Choose a system to configure")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("🛡️ Moderation")
                    .setDescription("Manage staff, logs, automod, and punishments")
                    .setValue("moderation"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("⚙️ Server Systems")
                    .setDescription("Manage tickets, welcome, leveling, economy")
                    .setValue("systems"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("🤖 Bot Management")
                    .setDescription("Manage bot settings and commands")
                    .setValue("bot"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("💾 Saving")
                    .setDescription("Manage saved server configurations")
                    .setValue("saving")
            );


        const row = new ActionRowBuilder()
            .addComponents(menu);


        await InteractionHelper.safeEditReply(interaction, {
            embeds: [embed],
            components: [row],
        });
    },
};
