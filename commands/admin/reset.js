const { Game } = require("../../models/Game");
const { stopOrderPlayers } = require("../../utils/roles/OrdersManager");
const { stopChameleonPlayers } = require("../../utils/roles/ChameleonManager");

module.exports = {
    name: 'reset',
    category: 'admin',
    usage: 'reset',
    examples: ['reset'],
    description: 'Reset the current game',
    options: [],

    async runInteraction(client, interaction)  {

        stopOrderPlayers(client.gameInstance.intervalIds)
        stopChameleonPlayers(client.gameInstance.chameleonIntervals)
        client.gameInstance = new Game();

        // TODO Send a message to the channel to inform the players
        await interaction.reply({ content: `TMP: Game reset`, ephemeral: true });

    }
};

