const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");
const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Status } = require("../../models/Status.js");
const { stopOrderPlayers } = require("../../utils/roles/OrdersManager.js");
const { stopChameleonPlayers } = require("../../utils/roles/ChameleonManager.js");

module.exports = {
    name: "admin-status-stop",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;

        client.gameInstance.status = Status.FINISHED;
        client.gameInstance.startedGameTime = null;
        stopOrderPlayers(client.gameInstance.intervalIds)
        stopChameleonPlayers(client.gameInstance.chameleonIntervals)
        client.gameInstance.parameters.lastActionMade = `Set status to **${client.gameInstance.status.value}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}