
module.exports = {
    name: "admin-status-wait",
    async runInteraction(client, interaction) {

        client.gameInstance.saveConfiguration();

        const adminEmbed = client.gameInstance.getAdminEmbed();
        const adminButtons = client.gameInstance.getAdminButtons();

        await client.gameInstance.adminEmbed.edit({ embeds: [adminEmbed], components: adminButtons });

        // await interaction.update({ embeds: [adminEmbed], components: adminButtons });


    }
}