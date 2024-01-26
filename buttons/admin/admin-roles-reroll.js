const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");
const { attributeRoles } = require("../../utils/roles/RolesManager.js");

module.exports = {
    name: "admin-roles-reroll",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;

        client.gameInstance.parameters.lastActionMade = `Rerolled roles`

        attributeRoles(client.gameInstance, client.gameInstance.redTeam);
        attributeRoles(client.gameInstance, client.gameInstance.blueTeam);
        
        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);
        
        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })

    }
}