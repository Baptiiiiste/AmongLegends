// ChameleonManager.js

const setRandomInterval = (intervalFunction, minDelay, maxDelay, player) => {
  let timeout;

  const runInterval = () => {
    const timeoutFunction = (p) => {
      intervalFunction(p);
      runInterval();
    };

    const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

    timeout = setTimeout(timeoutFunction, delay, player);
  };

  runInterval();

  return {
    clear() {
      clearTimeout(timeout);
    },
  };
};

function initChameleonPlayers(interaction) {
  const players = [
    ...interaction.client.gameInstance.blueTeam,
    ...interaction.client.gameInstance.redTeam,
  ];

  let intervalIds = [];

  players.forEach((p) => {
    p.typeChanges = [];

    if (p.currentRole.id === 'chameleon') {
      p.typeChanges.push(`Started as ${p.currentRole.type}`);
      const id = initChameleonTypeChange(interaction, p.discordUser, p);
      intervalIds.push(id);
    }
  });

  return intervalIds;
}

function stopChameleonPlayers(intervals) {
  intervals.forEach((i) => i.clear());
}

function initChameleonTypeChange(interaction, discordUser, player) {
  const minute = 1000 * 60;
  const maxElapsedMinutes = 10 * minute;
  const minElapsedMinutes = 3 * minute;
  const initialType = player.currentRole.type;

  return setRandomInterval(
    (p) => {
      if (p.typeChanges.length % 2 === 1) {
        p.currentRole.type = initialType === 'Crewmate' ? 'Imposter' : 'Crewmate';
      } else {
        p.currentRole.type = initialType;
      }

      const now = new Date();
      var timeDiff = new Date(now - interaction.client.gameInstance.startedGameTime);
      timeDiff /= 1000;
      var seconds = ('0' + Math.round(timeDiff % 60)).slice(-2);
      timeDiff = Math.floor(timeDiff / 60);
      var minutes = ('0' + Math.round(timeDiff % 60)).slice(-2);

      discordUser.send(`${minutes}:${seconds} - You are now: ${p.currentRole.type}`);
      p.typeChanges.push(`${minutes}:${seconds} - ${p.currentRole.type}`);
    },
    minElapsedMinutes,
    maxElapsedMinutes,
    player
  );
}

module.exports = {
  initChameleonPlayers,
  stopChameleonPlayers,
};
