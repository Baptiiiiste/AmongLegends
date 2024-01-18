const { Status } = require('./Status.js')

class Game {

    status = Status.NOT_STARTED
    arePlayersVoting = false

    gameAdminDiscordInstance

    gameEmbed = null
    adminEmbed = null

    blueTeam = []
    redTeam = []

    startedGameTime = null

    parameters = {
        maxImposters: 1,
        impostersAmount: "Set",
        authorizeMultiplePlayerToARole: false,
        lastActionMade: "Click a button first"
    }

    constructor(gameAdminDiscordInstance) {
        this.gameAdminDiscordInstance = gameAdminDiscordInstance
    }

    saveConfiguration() {
        this.status = Status.WAITING_TO_START;
    }

    startGame() {
        this.status = Status.STARTED;
        this.startedGameTime = new Date();
        // TODO Manage to start the orders

    }

    pauseGame() {
        this.status = Status.PAUSED;
        // TODO Manage to stop the orders
    }

    resumeGame() {
        this.status = Status.STARTED;
        // TODO Manage to resume the orders
    }

    finishGame() {
        this.status = Status.FINISHED;
        // TODO Manage to stop the orders
    }

}

module.exports = { Game };
