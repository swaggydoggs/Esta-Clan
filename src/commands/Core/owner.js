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
        .setName("owner")
        .setDescription("Open the owner control panel"),

    async execute(interaction, guildConfig, client) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ You cannot use this panel.",
                ephemeral: true,
            });
        }

        await InteractionHelper.safeDefer(interaction);

        const botName = client.user?.username || "Bot";

        const embed = createEmbed({
            title: "👑 Owner Panel",
            description: "Welcome to the bot owner control panel.",
            color: "primary",
            fields: [
                {
                    name: "🤖 Bot",
                    value: botName,
                    inline: true,
                },
                {
                    name: "👤 Owner",
                    value: `<@${OWNER_ID}>`,
                    inline: true,
                },
                {
                    name: "⚙️ Options",
                    value: "Use the dropdown below to manage the bot.",
                    inline: false,
                },
            ],
        });

        const menu = new StringSelectMenuBuilder()
            .setCustomId("owner-panel")
            .setPlaceholder("Choose an owner action")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("📊 Bot Info")
                    .setDescription("View bot information")
                    .setValue("bot_info"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("🔄 Reload Commands")
                    .setDescription("Reload bot commands")
                    .setValue("reload_commands"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("🔧 Server Settings")
                    .setDescription("View server settings")
                    .setValue("settings"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("🛑 Shutdown Bot")
                    .setDescription("Turn off the bot")
                    .setValue("shutdown")
            );

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await InteractionHelper.safeEditReply(interaction, {
            embeds: [embed],
            components: [row],
        });
    },
};
