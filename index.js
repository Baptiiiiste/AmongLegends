const { Client, Collection, Partials } = require('discord.js');
const client = new Client( { intents: 1539, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User] } );
const dotenv = require('dotenv');
dotenv.config();
const Logger = require("./utils/Logger");

// Registering collections and handlers
['commands', 'buttons', 'selectMenu'].forEach(x => client[x] = new Collection());
['CommandUtil', 'EventUtil', 'ButtonUtil', 'SelectMenuUtil'].forEach(handler => { require(`./utils/handlers/${handler}`)(client) });

// Debugging
process.on('exit', code => { Logger.client(`Process stopped: ${code}`); });

process.on('uncaughtException', (err, origin) => { 
    Logger.error(`uncaughtException: ${err}`); 
    console.error(`Origin: ${origin}`);
});

process.on('unhandledRejection', (reason, promise) => { 
    Logger.warn(`unhandledRejection: ${reason}`); 
    console.log(promise);
});

process.on('warning', (...args) => { Logger.warn(...args); });

// Login
client.login(process.env.DISCORD_TOKEN);