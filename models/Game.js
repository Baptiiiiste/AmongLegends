const { Status } = require('./Status.js')

class Game {

    status = Status.NOT_STARTED
    arePlayersVoting = false

    gameAdminDiscordInstance = null

    gameEmbed = null
    adminEmbed = null

    blueTeam = []
    redTeam = []

    startedGameTime = null
    intervalIds = []
    chameleonIntervals = []

    parameters = {
        maxImposters: 1,
        impostersAmount: "Set",
        authorizeMultiplePlayerToARole: false,
        lastActionMade: "Click a button first",
        displayRoleButton: false
    }

    constructor(gameAdminDiscordInstance) {
        this.gameAdminDiscordInstance = gameAdminDiscordInstance
    }

}

module.exports = { Game };
