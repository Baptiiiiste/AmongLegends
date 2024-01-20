const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");

module.exports = {
    name: "admin-parameters-authorize",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;

        client.gameInstance.parameters.authorizeMultiplePlayerToARole = !client.gameInstance.parameters.authorizeMultiplePlayerToARole;
        client.gameInstance.parameters.lastActionMade = `Set authorize to **${client.gameInstance.parameters.authorizeMultiplePlayerToARole}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        interaction.deferUpdate();

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })

    }
}