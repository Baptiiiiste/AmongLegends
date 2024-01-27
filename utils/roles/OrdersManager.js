const { crewmateRoles } = require('./Roles');

const canardOrders = crewmateRoles.find((r) => r.id === 'duck').orders;
const explorateurOrders = crewmateRoles.find((r) => r.id === 'explorer').orders;

function getOrders(discordUser, orders, player) {
  return setInterval(() => {
    const randomOrder = getRandomOrder(orders);
    discordUser.send(randomOrder);
    player.currentGameOrders.push(randomOrder);
  }, 5 * 60 * 1000);
}

function initOrderPlayers(interaction) {
  const players = [
    ...interaction.client.gameInstance.blueTeam,
    ...interaction.client.gameInstance.redTeam,
  ];

  let intervalIds = [];

  players.forEach((p) => {
    let id;
    p.currentGameOrders = [];
    if (p.currentRole.id === 'duck') {
      id = getOrders(p.discordUser, canardOrders, p);
    } else if (p.currentRole.id === 'explorer') {
      id = getOrders(p.discordUser, explorateurOrders, p);
    }

    if (id) intervalIds.push(id);
  });

  return intervalIds;
}

function stopOrderPlayers(intervalIds) {
  intervalIds.forEach((id) => clearInterval(id));
}

function getRandomOrder(orders) {
  const index = Math.floor(Math.random() * orders.length);
  return orders[index];
}

module.exports = {
  initOrderPlayers,
  stopOrderPlayers,
};