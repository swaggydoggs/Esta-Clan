
}
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
            description: "Bot owner controls",
            color: "primary",
        });

        const menu = new StringSelectMenuBuilder()
            .setCustomId("owner-panel")
            .setPlaceholder("Choose an option")
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel("Bot Info")
                    .setValue("info"),

                new StringSelectMenuOptionBuilder()
                    .setLabel("Reload Commands")
                    .setValue("reload")
            );

        const row = new ActionRowBuilder()
            .addComponents(menu);

        await InteractionHelper.safeEditReply(interaction, {
            embeds: [embed],
            components: [row],
        });
    },
};
