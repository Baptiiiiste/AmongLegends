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

        if(client.gameInstance){
            stopOrderPlayers(client.gameInstance.intervalIds)
            stopChameleonPlayers(client.gameInstance.chameleonIntervals)
        }

        client.gameInstance = new Game(interaction.user);

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        interaction.reply({ embeds: [adminEmbed], components: adminButtons, ephemeral: true })
            .then(message => {
                client.gameInstance.adminEmbed = message
            });

    }
};

