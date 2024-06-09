const { getAdminEmbed, getAdminButtons } = require('../../utils/embeds/adminEmbed');
const { getGameEmbed, getGameButtons } = require('../../utils/embeds/gameEmbed');
const { chameleonRole, imposterRoles, crewmateRoles } = require('../../utils/roles/Roles');
const { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Vote } = require("../../models/Vote");

module.exports = {
    name: "admin-vote",
    async runInteraction(client, interaction) {

        interaction.deferUpdate();
        if(!client.gameInstance) return;
        if(client.gameInstance.adminEmbed.id != interaction.message.interaction.id) return;
        if(client.gameInstance.arePlayersVoting) return;
        
        client.gameInstance.arePlayersVoting = true;
        client.gameInstance.parameters.lastActionMade = `Starting vote phase`

        const blueTeam = client.gameInstance.blueTeam;
        const redTeam = client.gameInstance.redTeam;
        const roles = [...imposterRoles, ...crewmateRoles, chameleonRole];

        for (const team of [blueTeam, redTeam]) {
            team.forEach(userToSendMessage => {
                const SelectMenuList = new ActionRowBuilder();

                team.filter(user => user.discordUser !== userToSendMessage.discordUser).forEach(user => {
                    const SelectMenuRoles = roles.map(role => {
                        const vote = new Vote(user.discordUser.id, role.id);
                        const voteValue = JSON.stringify(vote);
                        return new StringSelectMenuOptionBuilder().setLabel(role.name).setValue(voteValue);
                    });                    
                    
                    SelectMenuList.addComponents([
                        new StringSelectMenuBuilder().setCustomId('game-vote').setPlaceholder(`Guess ${user.discordUser.username}'s role`).addOptions(SelectMenuRoles)
                    ]);    
                });
        
                if (SelectMenuList.components.length > 0) userToSendMessage.discordUser.send({ content: `It's time to vote!`, components: [SelectMenuList] });
                else userToSendMessage.hasVoted = true;
            });
        }

        const adminEmbed = getAdminEmbed(client.gameInstance);
        const adminButtons = getAdminButtons(client.gameInstance);

        const gameEmbed = getGameEmbed(client.gameInstance);
        const gameButtons = getGameButtons(client.gameInstance);

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons })
        await client.gameInstance.gameEmbed.edit({ embeds: [gameEmbed], components: gameButtons })
    }
}