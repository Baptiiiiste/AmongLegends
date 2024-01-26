const { getGameEmbed, getGameButtons } = require("../../utils/embeds/gameEmbed.js");
const { Player } = require("../../models/Player.js");
const { attributeRoles } = require("../../utils/roles/RolesManager.js");

module.exports = {
    name: "game-teams-joinred",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance || !client.gameInstance.gameEmbed) return;
        if(client.gameInstance.gameEmbed.id != interaction.message.id) return;

        const blueTeam = client.gameInstance.blueTeam;
        const redTeam = client.gameInstance.redTeam;

        if(redTeam.length === 5){
            interaction.reply({ content: "The red team is full!", ephemeral: true });
            return;
        }

        if(redTeam.some(player => player.discordUser == interaction.user)) return;
        if(blueTeam.some(player => player.discordUser == interaction.user)) blueTeam.splice(blueTeam.findIndex(player => player.discordUser === interaction.user), 1);

        redTeam.push(new Player(interaction.user));

        attributeRoles(client.gameInstance, redTeam);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })

    }
}