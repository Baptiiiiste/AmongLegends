class Player {

    discordUser = null
    currentRole = null
    currentGameOrders = []
    votedPlayers = []

    typeChanges = []

    constructor(discordUser) {
        this.discordUser = discordUser;
    }

}

module.exports = { Player };
