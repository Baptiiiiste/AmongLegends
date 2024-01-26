const { getAdminEmbed, getAdminButtons } = require('../../utils/embeds/adminEmbed');
const { getGameEmbed, getGameButtons } = require('../../utils/embeds/gameEmbed');
const { shuffle } = require('../../utils/functions');

module.exports = {
    name: "admin-teams-randomize",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;

        const shuffledPlayers = shuffle([client.gameInstance.redTeam, client.gameInstance.blueTeam].flat());

        // Split shuffledPlayers in two and assign to red and blue team, if uneven, add to blue team
        if(shuffledPlayers.length) {
            const half = Math.ceil(shuffledPlayers.length / 2);
            client.gameInstance.blueTeam = shuffledPlayers.splice(0, half);
            client.gameInstance.redTeam = shuffledPlayers;
        }

        client.gameInstance.parameters.lastActionMade = `Randomized teams`

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        interaction.deferUpdate();

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}