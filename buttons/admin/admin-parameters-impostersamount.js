const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");

module.exports = {
    name: "admin-parameters-impostersamount",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;

        client.gameInstance.parameters.impostersAmount = client.gameInstance.parameters.impostersAmount == "Set" ? "Random" : "Set";
        client.gameInstance.parameters.lastActionMade = `Set imposters amount to **${client.gameInstance.parameters.impostersAmount}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        interaction.deferUpdate();

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })

    }
}