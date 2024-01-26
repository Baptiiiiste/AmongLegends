const { crewmateRoles, imposterRoles, chameleonRole } = require("../../utils/roles/Roles.js");
const { Colors, EmbedBuilder } = require("discord.js");

module.exports = {
    name: 'roles',
    category: 'player',
    usage: 'roles',
    examples: ['roles'],
    description: 'Display all available roles',
    options: [],

    async runInteraction(client, interaction)  {


        const crewmateEmbed = new EmbedBuilder()
            .setColor(Colors.Green)
            .setTitle("Crewmate roles roles")

        crewmateRoles.forEach(role => {
            crewmateEmbed.addFields({ name: `__${role.name}__`, value: role.description, inline: false });
        });

        const imposterEmbed = new EmbedBuilder()
            .setColor(Colors.Red)
            .setTitle("Imposter roles")

        imposterRoles.forEach(role => {
            imposterEmbed.addFields({ name: `__${role.name}__`, value: role.description, inline: false });
        });

        const specialEmbed = new EmbedBuilder()
            .setColor(Colors.Yellow)
            .setTitle("Special roles")
            .addFields({ name: `__${chameleonRole.name}__`, value: chameleonRole.description, inline: false });

        await interaction.reply({ embeds: [crewmateEmbed, imposterEmbed, specialEmbed] });
    }
};

