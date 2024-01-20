const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");

module.exports = {
    name: "admin-changeimposter",
    async runInteraction(client, interaction) {

        client.gameInstance.parameters.maxImposters = interaction.values[0];
        client.gameInstance.parameters.lastActionMade = `Set max imposters to **${client.gameInstance.parameters.maxImposters}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        interaction.deferUpdate();

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })

    }
}