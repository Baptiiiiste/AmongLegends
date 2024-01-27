const { shuffle, getRandomInt, getRandomFloat } = require("../functions.js");
const { crewmateRoles, imposterRoles, chameleonRole } = require("./Roles.js");

function attributeRoles(gameInstance, team) {
    let impostersAmount = 0;

    if(team.length < gameInstance.parameters.maxImposters){
        impostersAmount = gameInstance.parameters.impostersAmount === "Set" ? team.length : getRandomInt(1, team.length);
    } else {
        impostersAmount = gameInstance.parameters.impostersAmount === "Set" ? gameInstance.parameters.maxImposters : getRandomInt(1, gameInstance.parameters.maxImposters);
    }

    const crewmatesAmount = team.length < impostersAmount ? team.length : team.length - impostersAmount;
    const crewmateRoles = gameInstance.parameters.authorizeMultiplePlayerToARole ? attributeSameCrewmateRoles(crewmatesAmount) : attributeDifferentCrewmateRoles(crewmatesAmount);
    const imposterRoles = attributeImposterRoles(impostersAmount);

    const allRoles = crewmateRoles.concat(imposterRoles);
    const shuffledRoles = shuffle(allRoles);

    for (let i = 0; i < team.length; i++) {
        team[i].currentRole = shuffledRoles[i];
    }

}

function attributeSameCrewmateRoles(amount) {

    const roles = [];
    for (let i = 0; i < amount; i++) {
        roles.push(getWeightedRandomRole(crewmateRoles));
    }
    return roles;

}

function attributeDifferentCrewmateRoles(amount) {

    const roles = [];
    for (let i = 0; i < amount; i++) {
        let role = getWeightedRandomRole(crewmateRoles)
        while (roles.includes(role)) {
            role = getWeightedRandomRole(crewmateRoles)
        }
        roles.push(role);
    }
    return roles;

}

function attributeImposterRoles(amount) {

    const roles = [];
    for (let i = 0; i < amount; i++) {
        if (getRandomFloat(0, 1) <= chameleonRole.chanceToReplaceImposterWithChameleon) {
            const chameleon = chameleonRole;
            chameleon.type = getRandomInt(0, 1) === 0 ? "Crewmate" : "Imposter";
            roles.push(chameleon)
        } else {
            roles.push(getWeightedRandomRole(imposterRoles));
        }
    }

    return roles;
    
}

function getWeightedRandomRole(list) {
    let i;
    let sum = 0;
    let r = Math.random();
    for (i of list) {
      sum += i.weight
      if (r <= sum) return i
    }
}

module.exports = { attributeRoles };