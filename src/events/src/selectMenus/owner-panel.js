import {
    SlashCommandBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} from "discord.js";

import { createEmbed } from "../../utils/embeds.js";

const OWNER_ID = "1368313910943547413";

export default {
    slashOnly: true,

    data: new SlashCommandBuilder()
        .setName("owner")
        .setDescription("Open the owner command center"),

    async execute(interaction) {

        if (interaction.user.id !== OWNER_ID) {
            return interaction.reply({
                content: "❌ You cannot use this panel.",
                ephemeral: true
            });
        }

        const embed = createEmbed({
            title: "🔱 Owner Command Center",
            description:
            "Pick a system below to configure Estabot for this server.",
            color: "primary",

            fields: [
                {
                    name: "🛡️ Moderation",
                    value:
                    "Staff, roles, blocked words, logs, mute settings, and automod tools."
                },
                {
                    name: "⚙️ Server Systems",
                    value:
                    "Tickets, welcome messages, leveling, economy, QOTD, co-owners, and protection settings."
                },
                {
                    name: "💾 Saving",
                    value:
                    "Changes save automatically as soon as you confirm them."
                }
            ]
        });


        const menu = new StringSelectMenuBuilder()
        .setCustomId("owner-panel")
        .setPlaceholder("Choose a system")

        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel("🛡️ Moderation")
            .setDescription("Manage moderation settings")
            .setValue("moderation"),

            new StringSelectMenuOptionBuilder()
            .setLabel("⚙️ Server Systems")
            .setDescription("Configure server systems")
            .setValue("systems"),

            new StringSelectMenuOptionBuilder()
            .setLabel("💾 Saving")
            .setDescription("View saving options")
            .setValue("saving")
        );


        await interaction.reply({
            embeds:[embed],
            components:[
                new ActionRowBuilder()
                .addComponents(menu)
            ],
            ephemeral:true
        });
    }
};
