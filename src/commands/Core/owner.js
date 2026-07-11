src
 └── commands
     └── Core
         └── owner.jsasync execute(interaction, guildConfig, client) {
    console.log("OWNER COMMAND RAN");

    await interaction.reply({
        content: "Owner command works!",
        ephemeral: true
    });
}
