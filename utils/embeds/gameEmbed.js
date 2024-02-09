const { ButtonBuilder, Colors, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const { Status } = require("../../models/Status");

function getGameEmbed(gameInstance){

  const embed = new EmbedBuilder()
    .setColor(Colors.Blue)
    .setTitle("Among Legends")
    .setDescription(`Wait for ${gameInstance.gameAdminDiscordInstance} to start the game`)
    .addFields([
      { name: ` `, value: ` `, inline: false },
    ]);

    if(!gameInstance.arePlayersVoting){
      embed.addFields([
        { name: "🔵 Blue team", value: `${gameInstance.blueTeam.length ? gameInstance.blueTeam.map(u => u.discordUser).join("\n") : " "}`, inline: true },
        { name: "🔴 Red team", value: `${gameInstance.redTeam.length ? gameInstance.redTeam.map(u => u.discordUser).join("\n") : " "}`, inline: true },
      ])
    }else {
      embed.addFields([
        { name: "🔵 Blue team", value: `${gameInstance.blueTeam.length ? gameInstance.blueTeam.map(u => `${u.discordUser} (${u.votedPlayers.length != gameInstance.blueTeam.length - 1 ? "Voting..." : "Has voted"})`).join("\n") : " "}`, inline: true },
        { name: "🔴 Red team", value: `${gameInstance.redTeam.length ? gameInstance.redTeam.map(u => `${u.discordUser} (${u.votedPlayers.length != gameInstance.redTeam.length - 1 ? "Voting..." : "Has voted"})`).join("\n") : " "}`, inline: true },
      ])
    }

    embed.addFields([
      { name: ` `, value: ` `, inline: false },
      { name: `🕑 Game Status`, value: gameInstance.status.value, inline: true },
    ]);
  
    return embed
}


function getGameButtons(gameInstance){

    const row = new ActionRowBuilder();
    const secondRow = new ActionRowBuilder();
  
    if(gameInstance.status == Status.WAITING_TO_START){
      row.addComponents([
        new ButtonBuilder().setCustomId('game-teams-joinblue').setLabel('Join blue team').setStyle('Primary'), // Join blue team
        new ButtonBuilder().setCustomId('game-teams-joinred').setLabel('Join red team').setStyle('Danger'), // Join red team
        new ButtonBuilder().setCustomId('game-teams-leave').setLabel('Leave game').setStyle('Secondary'), // Leave game

      ]);

      if (gameInstance.parameters.displayRoleButton) {
        secondRow.addComponents([
          new ButtonBuilder().setCustomId('game-roles-get').setLabel('Get your role').setStyle('Success') // Get role
        ]);
        return [row, secondRow];
      }

      

    }else{
      row.addComponents([
        new ButtonBuilder().setCustomId('game-roles-get').setLabel('Get your role').setStyle('Secondary') // Get role
      ]);
    }
    return [row];

}

module.exports = { getGameEmbed, getGameButtons };