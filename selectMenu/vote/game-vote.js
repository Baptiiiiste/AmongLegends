const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Status } = require("../../models/Status.js");

module.exports = {
    name: "game-vote",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance || !client.gameInstance.gameEmbed) return;

        const blueTeam = client.gameInstance.blueTeam;
        const redTeam = client.gameInstance.redTeam;

        const player = blueTeam.concat(redTeam).find(p => p.discordUser == interaction.user);
        if(!player) return;
        const playerTeam = blueTeam.includes(player) ? blueTeam : redTeam;

        const vote = JSON.parse(interaction.values[0])
        if (player.votedPlayers.includes(vote) || !vote) return;

        player.votedPlayers.push(vote);

        if(player.votedPlayers.length == playerTeam.length - 1){
            player.hasVoted = true;
            
            const gameEmbed = getGameEmbed(client.gameInstance);
            const gameButtons = getGameButtons(client.gameInstance);

            await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })
        }
    }
}