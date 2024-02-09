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

        if(client.gameInstance){
            stopOrderPlayers(client.gameInstance.intervalIds)
            stopChameleonPlayers(client.gameInstance.chameleonIntervals)
        }

        client.gameInstance = new Game();

        await interaction.reply({ content: `✅ The game has been reset` });

    }
};

