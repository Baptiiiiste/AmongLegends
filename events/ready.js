const Logger = require('../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {

        let guildsCount = await client.guilds.fetch();
        let usersCount = await client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);

        // TODO Fix the presence not showing
        client.user.setPresence({ activities : [{name: `${usersCount} member${usersCount > 1 ? "s" : ""} on ${guildsCount.size} server${guildsCount.size > 1 ? "s" : ""}`, type:'WATCHING'}], status: 'online' });

        Logger.client(`Logged in as ${client.user.tag} on ${guildsCount.size} server${guildsCount.size > 1 ? "s" : ""}`);

        const devGuild = await client.guilds.cache.get('807658249728950292'); // dev
        // const devGuild = await client.guilds.cache.get('316510146920710145'); // les copains
        devGuild.commands.set(client.commands.map(cmd => cmd));
    }
}

