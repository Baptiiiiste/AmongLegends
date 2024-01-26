const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");

module.exports = {
    name: "admin-parameters-impostersamount",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;

        client.gameInstance.parameters.impostersAmount = client.gameInstance.parameters.impostersAmount == "Set" ? "Random" : "Set";
        client.gameInstance.parameters.lastActionMade = `Set imposters amount to **${client.gameInstance.parameters.impostersAmount}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })

    }
}