class Player {

    discordUser = null
    currentRole = null
    currentGameOrders = []
    votedPlayers = []

    constructor(discordUser) {
        this.discordUser = discordUser;
    }

}

module.exports = { Player };
