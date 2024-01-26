const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");
const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Status } = require("../../models/Status.js");

module.exports = {
    name: "admin-roles-allow",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;

        client.gameInstance.parameters.displayRoleButton = !client.gameInstance.parameters.displayRoleButton;
        client.gameInstance.parameters.lastActionMade = `Set display roles button to **${client.gameInstance.parameters.displayRoleButton}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        interaction.deferUpdate();

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}