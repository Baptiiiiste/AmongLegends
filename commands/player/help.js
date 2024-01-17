const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    category: 'player',
    usage: 'help <command>',
    examples: ['help create'],
    description: 'Display help for a command',
    options: [
        {
            name: 'command', 
            description: 'Command',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async runInteraction(client, interaction)  {
        const cmdName = interaction.options.getString('command');

        if(!cmdName){
            const noArgsEmbed = new EmbedBuilder()
                .setColor("#FD3333")
                .addFields([{name: '❓ |  HELP ', value: `List of commands. \`/help <command>\` for more informations `, inline: true}])
                

            for (const category of commandFolder){
                noArgsEmbed.addFields([{name: `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`, value: `/${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(`, /`)}`}])
            }
            return interaction.reply({embeds: [noArgsEmbed]});
        }

        const cmd = client.commands.get(cmdName);
        if(!cmd) return message.reply({content: "ERROR | Invalid command"});
        
        return interaction.reply({ content: `
\`\`\`makefile
❓ | ${cmd.name.toUpperCase()}
${cmd.description ? cmd.description : ""}  

Usage: /${cmd.usage}
Examples: /${cmd.examples.join(` | /`)}

Prefix: /
{} = subcommand(s) available(s)
[] = option(s) available(s)
<> = option(s) optional(s)
\`\`\`
                `, ephemeral: true})

    }
};

