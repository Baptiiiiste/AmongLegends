const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");
const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Status } = require("../../models/Status.js");
const { initOrderPlayers } = require("../../utils/roles/OrdersManager.js");
const { initChameleonPlayers } = require("../../utils/roles/ChameleonManager.js");

module.exports = {
    name: "admin-status-start",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;

        if(!client.gameInstance.redTeam.length && !client.gameInstance.blueTeam.length) {
            interaction.reply({ content: "You need at least one player on a team to start the game!", ephemeral: true });
            return;
        }

        client.gameInstance.status = Status.STARTED;
        client.gameInstance.startedGameTime = Date.now();
        client.gameInstance.intervalIds = initOrderPlayers(interaction)
        client.gameInstance.chameleonIntervals = initChameleonPlayers(interaction)

        client.gameInstance.parameters.lastActionMade = `Set status to **${client.gameInstance.status.value}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}