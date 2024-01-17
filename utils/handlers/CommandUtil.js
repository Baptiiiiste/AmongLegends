const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);
const Logger = require("../Logger");
const { ApplicationCommandType } = require("discord.js");

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile =>{
        const cmd = require(cmdFile);

        if(!cmd.name) {
            return Logger.warn(`Command not loaded (Missing name): ${cmdFile}`);
        }

        if(!cmd.description && cmd.type != ApplicationCommandType.User){
            return Logger.warn(`Command not loaded (Missing description): ${cmdFile}`);
        }

        if (!cmd.usage)  return Logger.warn(`Command not loaded (Missing usage): ${cmdFile}`);
       
        if (!cmd.examples)  return Logger.warn(`Command not loaded (Missing example(s)): ${cmdFile}`);

        if (!cmd.category)  return Logger.warn(`Command not loaded (Missing category): ${cmdFile}`);

        client.commands.set(cmd.name, cmd);
        Logger.command(`${cmd.name}`);
    });
};


