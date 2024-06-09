class Vote {

    playerDiscordUserId = null
    roleId = null

    constructor(playerDiscordUserId, roleId) {
        this.playerDiscordUserId = playerDiscordUserId;
        this.roleId = roleId;
    }

}

module.exports = { Vote };
