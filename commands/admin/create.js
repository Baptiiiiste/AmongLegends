const { Game } = require("../../models/Game");
const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed");

module.exports = {
    name: 'create',
    category: 'admin',
    usage: 'create',
    examples: ['create'],
    description: 'Start configuring a new game',
    options: [],

    async runInteraction(client, interaction)  {

        // Create a new game instance
        client.gameInstance = new Game(interaction.user);

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        // Send then store the embed to edit it later
        await interaction.reply({ embeds: [adminEmbed], components: adminButtons, ephemeral: true })
            .then(message => client.gameInstance.adminEmbed = message);

    }
};

