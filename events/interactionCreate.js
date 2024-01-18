const { InteractionType } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {

        if(interaction.type === InteractionType.ApplicationCommand){
            const cmd = client.commands.get(interaction.commandName);
            if(!cmd) return interaction.reply({content: `❌ This command does not exist`, ephemeral: true});
            
            if(!interaction.member.permissions.has([cmd.permissions])) {
                return interaction.reply({ content: `❌ Missing permission(s): ${cmd.permissions.join(', ')}`, ephemeral: true});
            }
            
            cmd.runInteraction(client, interaction);
        
        } else if (interaction.isButton()){
            const btn = client.buttons.get(interaction.customId);
            if(!btn) return interaction.reply({content: "❌ This button does not exist", ephemeral:true});
            btn.runInteraction(client, interaction);

        } else if (interaction.isSelectMenu()){
            const slctMenu = client.selectMenu.get(interaction.customId);
            if(!slctMenu) return interaction.reply({content: "❌ This selectMenu does not exist", ephemeral: true});
            slctMenu.runInteraction(client, interaction);
        }
        
    }
}

