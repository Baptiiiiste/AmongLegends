const { Game } = require("../../models/Game");

module.exports = {
    name: 'reset',
    category: 'admin',
    usage: 'reset',
    examples: ['reset'],
    description: 'Reset the current game',
    options: [],

    async runInteraction(client, interaction)  {

        // TODO Stop sending private messages to the previous game's users

        client.gameInstance = new Game();
        // TODO Send a message to the channel to inform the players
        await interaction.reply({ content: `TMP: Game reset`, ephemeral: true });

    }
};

