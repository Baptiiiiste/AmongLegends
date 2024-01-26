const { getAdminEmbed, getAdminButtons } = require('../../utils/embeds/adminEmbed');
const { getGameEmbed, getGameButtons } = require('../../utils/embeds/gameEmbed');

module.exports = {
    name: "admin-teams-reset",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;

        client.gameInstance.blueTeam = [];
        client.gameInstance.redTeam = [];

        client.gameInstance.parameters.lastActionMade = `Reset teams`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}