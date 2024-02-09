const { ButtonBuilder, Colors, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require("discord.js");
const { Status } = require("../../models/Status");

function getAdminEmbed(gameInstance) {

    const embed = new EmbedBuilder()
        .setColor(Colors.Blue)
        .setTitle('Among Legends Control Panel')
        .setDescription(`👋 Hi **${gameInstance.gameAdminDiscordInstance}**, configure your game with the buttons below`)
        .addFields([
            { name: ` `, value: ` `, inline: false },

            { name: `👿 Max imposters: **${gameInstance.parameters.maxImposters}**`, value: `Edit with the select menu below`, inline: true },
            { name: ` `, value: ` `, inline: true },
            { name: `⚙️ Imposter amount: **${gameInstance.parameters.impostersAmount} ${getImposterCount(gameInstance.parameters)}**`, value: `Edit with the *Set / Random* button below`, inline: true },

            { name: ` `, value: ` `, inline: false },

            { name: `👥 Multiple players for a role: **${gameInstance.parameters.authorizeMultiplePlayerToARole}**`, value: `Edit with *${gameInstance.parameters.authorizeMultiplePlayerToARole ? "Unauthorize" : "Authorize"}* button below`, inline: true },

            { name: ` `, value: ` `, inline: false },

            { name: `🕑 Game Status`, value: `${gameInstance.status.value ?? " "}`, inline: true },
            { name: ` `, value: ` `, inline: true },
            { name: `⏮️ Last action made`, value: `${gameInstance.parameters.lastActionMade ?? " "}`, inline: true },
        ]);

    return embed
}

function getImposterCount(parameters) {
    if (parameters.impostersAmount == "Set") {
        return `to ${parameters.maxImposters}`
    } else if (parameters.impostersAmount == "Random") {
        return `(1 - ${parameters.maxImposters})`
    }
}

function getAdminButtons(gameInstance) {
    const rowButtons = new ActionRowBuilder();
    const rowSelect = new ActionRowBuilder();
    const choices = [
        new StringSelectMenuOptionBuilder().setLabel("1").setValue("1"),
        new StringSelectMenuOptionBuilder().setLabel("2").setValue("2"),
        new StringSelectMenuOptionBuilder().setLabel("3").setValue("3"),
        new StringSelectMenuOptionBuilder().setLabel("4").setValue("4"),
        new StringSelectMenuOptionBuilder().setLabel("5").setValue("5"),
    ];

    switch (gameInstance.status) {

        case Status.NOT_STARTED:
            rowButtons.addComponents([
                new ButtonBuilder().setCustomId('admin-status-wait').setLabel('Save configuration').setStyle('Primary'), // Allow players to see their role before starting the game
                new ButtonBuilder().setCustomId('admin-parameters-authorize').setLabel(`${gameInstance.parameters.authorizeMultiplePlayerToARole ? "Unauthorize" : "Authorize"}`).setStyle('Secondary'), // Authorize multiple players to a role
                new ButtonBuilder().setCustomId('admin-parameters-impostersamount').setLabel('Set / Random').setStyle('Secondary') // Set / Random
            ]);

            rowSelect.addComponents([
                new StringSelectMenuBuilder().setCustomId('admin-changeimposter').setPlaceholder('Select max amount of imposters').addOptions(choices) // Change max imposters
            ]);
            break;

        case Status.WAITING_TO_START:
            rowButtons.addComponents([
                new ButtonBuilder().setCustomId('admin-status-start').setLabel('Start game').setStyle('Primary'), // Start game

            ]);
            if (!gameInstance.parameters.displayRoleButton) {
                rowButtons.addComponents([
                    new ButtonBuilder().setCustomId('admin-roles-allow').setLabel('Display player\'s role').setStyle('Success'), // Display get role button
                ]);
            }
            rowButtons.addComponents([
                new ButtonBuilder().setCustomId('admin-roles-reroll').setLabel('Reroll roles').setStyle('Secondary'), // Reroll roles
                new ButtonBuilder().setCustomId('admin-teams-randomize').setLabel('Randomize teams').setStyle('Secondary'), // Randomize teams
                new ButtonBuilder().setCustomId('admin-teams-reset').setLabel('Reset teams').setStyle('Secondary') // Reset teams
            ]);
            break;

        case Status.STARTED:
            rowButtons.addComponents([
                new ButtonBuilder().setCustomId('admin-status-stop').setLabel('End game').setStyle('Danger'), // End game
            ]);
            break;

        case Status.PAUSED:
            rowButtons.addComponents([
                new ButtonBuilder().setCustomId('admin-status-stop').setLabel('End game').setStyle('Danger') // End game
            ]);
            break;

        case Status.FINISHED:
            if(!gameInstance.arePlayersVoting){
                rowButtons.addComponents([
                    new ButtonBuilder().setCustomId('admin-vote').setLabel('Start votes').setStyle('Primary'), // Start votes
                ]);
            }
            rowButtons.addComponents([
                new ButtonBuilder().setCustomId('admin-status-new').setLabel('New game').setStyle('Secondary') // New game
            ]);
            break;
    }

    const returnedArray = []
    if (rowSelect.components.length > 0) returnedArray.push(rowSelect)
    if (rowButtons.components.length > 0) returnedArray.push(rowButtons)
    return returnedArray
}

module.exports = { getAdminEmbed, getAdminButtons };