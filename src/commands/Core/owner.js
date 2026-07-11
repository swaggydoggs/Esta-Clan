import {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";

import { InteractionHelper } from "../../utils/interactionHelper.js";
import { createEmbed } from "../../utils/embeds.js";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("owner")
        .setDescription("Open the owner control panel"),

    async execute(interaction, guildConfig, client) {

        // CHANGE THIS TO YOUR DISCORD USER ID
        const OWNER_ID = "1368313910943547413";

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ You cannot use this panel.",
                ephemeral: true,
            });
        }

        await InteractionHelper.safeDefer(interaction);

        const embed = createEmbed({
            title: "👑 Owner Panel",
            description:
                "Select an option below to manage the bot.",
            color: "primary",
            fields: [
                {
                    name: "Bot Status",
                    value: "🟢 Online",
                    inline: true,
                },
                {
                    name: "Owner",
                    value: `<@${interaction.user.id}>`,
                    inline: true,
                },
            ],
        });

        const menu = new StringSelectMenuBuilder()
            .setCustomId("owner-panel")
            .setPlaceholder("Select an owner action")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Restart Bot")
                    .setDescription("Restart the bot")
                    .setValue("restart"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Reload Commands")
                    .setDescription("Reload all commands")
                    .setValue("reload"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Bot Info")
                    .setDescription("View bot information")
                    .setValue("info"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Server Settings")
                    .setDescription("Manage settings")
                    .setValue("settings")
            );

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await InteractionHelper.safeEditReply(interaction, {
            embeds: [embed],
            components: [row],
        });
    },
};
