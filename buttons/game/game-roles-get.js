module.exports = {
    name: "game-roles-get",
    async runInteraction(client, interaction) {

        if(!client.gameInstance || !client.gameInstance.gameEmbed) return interaction.deferUpdate();
        if(client.gameInstance.gameEmbed.id != interaction.message.id) return interaction.deferUpdate();

        const teams = client.gameInstance.redTeam.concat(client.gameInstance.blueTeam);
        const player = teams.find(player => player.discordUser === interaction.user);

        if(!player) return interaction.reply({ content: "You are not in the game", ephemeral: true });

        await interaction.reply({ content: `You are ${player.currentRole.name} (${player.currentRole.type ?? "Undefined type"})`, ephemeral: true });

    }
}