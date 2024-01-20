const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Status } = require("../../models/Status.js");

module.exports = {
    name: "game-teams-leave",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;
        if(client.gameInstance.status != Status.WAITING_TO_START) return;

        const redTeam = client.gameInstance.redTeam;
        const blueTeam = client.gameInstance.blueTeam;

        if(blueTeam.some(player => player.discordUser == interaction.user)) blueTeam.splice(blueTeam.findIndex(player => player.discordUser === interaction.user), 1);
        if(redTeam.some(player => player.discordUser == interaction.user)) redTeam.splice(redTeam.findIndex(player => player.discordUser === interaction.user), 1);

        interaction.deferUpdate();

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}