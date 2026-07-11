import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const interactionTypes = ['buttons', 'selectMenus', 'modals'];

export default async (client) => {
  try {
    const interactionsPath = join(__dirname, '../interactions');
    
    for (const type of interactionTypes) {
      const typePath = join(interactionsPath, type);
      
      try {
        const interactionFiles = (await readdir(typePath)).filter(file => file.endsWith('.js'));
        let loadedCount = 0;
        
        for (const file of interactionFiles) {
          try {
            const module = await import(`../interactions/${type}/${file}`);
            const moduleExport = module.default;
            const interactions = Array.isArray(moduleExport) ? moduleExport : [moduleExport];

            for (const interaction of interactions) {
              if (!interaction?.name || !interaction?.execute) {
                logger.warn(`Interaction ${file} in ${type} is missing required properties.`);
                continue;
              }

              client[type].set(interaction.name, interaction);
              loadedCount += 1;
              logger.info(`Loaded ${type.slice(0, -1)}: ${interaction.name}`);
            }
          } catch (error) {
            logger.error(`Error loading interaction ${file} in ${type}:`, error);
          }
        }

        logger.info(`Loaded ${loadedCount} ${type}`);
      } catch (error) {
        if (error.code !== 'ENOENT') {
          logger.error(`Error loading ${type}:`, error);
        } else {
          logger.debug(`No ${type} directory found, skipping...`);
        }
      }
    }
  } catch (error) {
    logger.error('Error loading interactions:', error);
  }
};
if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "owner-panel") {

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

    }
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
