module.exports = {
    name: "game-roles-get",
    async runInteraction(client, interaction) {

        if(!client.gameInstance) return;
        await interaction.reply({ content: "This feature is not implemented yet", ephemeral: true });

    }
}