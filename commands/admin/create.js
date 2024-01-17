const { Status } = require("../../models/Status");

module.exports = {
    name: 'create',
    category: 'admin',
    usage: 'create',
    examples: ['create'],
    description: 'Start configuring a new game',
    options: [],

    async runInteraction(client, interaction)  {

        interaction.reply({ content: `Status : ${client.gameInstance.status.value ?? "none"}`, ephemeral: true });
        client.gameInstance.status = Status.WAITING_TO_START;
    }
};

