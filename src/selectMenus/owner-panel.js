export default {
    customId: "owner-panel",

    async execute(interaction) {

        const option = interaction.values[0];


        if(option === "moderation"){
            return interaction.reply({
                content:
                "🛡️ Moderation Panel\n\nManage staff roles, logs, automod, blocked words, and mute settings.",
                ephemeral:true
            });
        }


        if(option === "systems"){
            return interaction.reply({
                content:
                "⚙️ Server Systems Panel\n\nTickets, welcome, leveling, economy, QOTD, co-owner and protection settings.",
                ephemeral:true
            });
        }


        if(option === "saving"){
            return interaction.reply({
                content:
                "💾 Saving System\n\nAll confirmed changes automatically save.",
                ephemeral:true
            });
        }
    }
};
