class Player {

    discordUser = null
    currentRole = null
    currentGameOrders = []
    votedPlayers = []
    hasVoted = false

    typeChanges = []

    constructor(discordUser) {
        this.discordUser = discordUser;
    }

}

module.exports = { Player };
