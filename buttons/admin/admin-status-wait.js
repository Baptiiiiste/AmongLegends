const { getAdminEmbed, getAdminButtons } = require("../../utils/embeds/adminEmbed.js");
const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Status } = require("../../models/Status");

module.exports = {
    name: "admin-status-wait",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return ;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;

        client.gameInstance.status = Status.WAITING_TO_START;
        client.gameInstance.parameters.lastActionMade = `Set status to **${client.gameInstance.status.value}**`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await interaction.channel.send({ embeds: [gameEmbed], components: gameButtons })
            .then(message => client.gameInstance.gameEmbed = message);

    }
}