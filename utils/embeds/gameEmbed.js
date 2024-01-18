const { ButtonBuilder, Colors, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const { Status } = require("../../models/Status");

function getGameEmbed(gameInstance, gameAdminDiscordInstance){

    const embed = new EmbedBuilder()
      .setColor(Colors.Blue)
      .setTitle("Among Legends")
      .setDescription(`Wait for ${gameAdminDiscordInstance} to start the game`)
      .addFields([
        { name: ` `, value: ` `, inline: false },

        // // TODO Display both teams
  
        // // { name: "🔵 Blue team", value: `${gameInstance.teamBlue ? gameInstance.teamBlue.map(u => u.user).join("\n") : " "}`, inline: true },
        // // { name: "🔴 Red team", value: `${gameInstance.teamRed ? gameInstance.teamRed.map(u => u.user).join("\n") : " "}`, inline: true },
  
        { name: "🔵 Blue team", value: `TMP BLUE TEAM`, inline: true },
        { name: "🔴 Red team", value: `TMP RED TEAM`, inline: true },
  
        // // TODO Add winner if game is finished
  
        { name: ` `, value: ` `, inline: false },
  
        { name: `🕑 Game Status`, value: gameInstance.status.value, inline: true },
  
      ]);
  
    return embed
}


function getGameButtons(gameInstance){

    const row = new ActionRowBuilder();
  
    if(gameInstance.status == Status.NOT_STARTED){
      row.addComponents([
        new ButtonBuilder().setCustomId('game-teams-joinblue').setLabel('Join blue team').setStyle('Primary'), // Join blue team
        new ButtonBuilder().setCustomId('game-teams-joinred').setLabel('Join red team').setStyle('Danger'), // Join red team
      ]);
    } else if (gameInstance.status == Status.WAITING_TO_START){
      row.addComponents([
        new ButtonBuilder().setCustomId('game-roles-get').setLabel('Get your role').setStyle('Primary'), // Join blue team
        new ButtonBuilder().setCustomId('game-teams-leave').setLabel('Leave game').setStyle('Danger'), // Leave game
      ]);
    }
  
    return [row];
}

module.exports = { getGameEmbed, getGameButtons };