const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Player } = require("../../models/Player.js");

module.exports = {
    name: "game-teams-joinblue",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;

        const blueTeam = client.gameInstance.blueTeam;
        const redTeam = client.gameInstance.redTeam;

        if(blueTeam.length === 5){
            interaction.reply({ content: "The blue team is full!", ephemeral: true });
            return;
        }

        interaction.deferUpdate();

        if(blueTeam.some(player => player.discordUser == interaction.user)) return;
        if(redTeam.some(player => player.discordUser == interaction.user)) redTeam.splice(redTeam.findIndex(player => player.discordUser === interaction.user), 1);

        blueTeam.push(new Player(interaction.user));

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}