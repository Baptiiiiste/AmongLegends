const crewmateRoles = [
    {
        id: "support",
        type: 'Crewmate',
        name: 'Support 💫',
        description:
          'A la fin de la partie, avoir le plus d\'assists que tous les autres joueurs (Si support, ce nombre est divisé par 2)',
        weight: 0.1,
        image: 'support.png',
    },
    {
        id: "splitpusher",
        type: 'Crewmate',
        name: 'Splitpusher 🏰',
        description:
          'Faire tout ce qui est possible pour détruire le plus de tours, inhibiteurs et tuer le plus de drakes, barons et héros ennemis que vos alliers.',
        weight: 0.1,
        image: 'splitpusher.png',
    },
    {
      id: "sardoche",
      type: 'Crewmate',
      name: 'Sardoche 🤬',
      description:
        'Raler sur les autres joueurs et les blâmer pour vos morts et vos défaites',
      weight: 0.1,
      image: 'sardoche.png',
  },
    {
      id: "mole",
      type: 'Crewmate',
      name: 'Taupe 🕵️‍♂️',
      description:
        'A la fin de la partie, avoir moins de participation (kills + assists) que tous les autres joueurs',
      weight: 0.15,
      image: 'mole.png',
    },
    {
      id: "faker",
      type: 'Crewmate',
      name: 'Faussaire ⚔️',
      description:
        'A la fin de la partie, avoir plus de dégats et moins de morts que tous les autres joueurs',
      weight: 0.2,
      image: 'faker.png',
    },
    {
      id: "farmer",
      type: 'Crewmate',
      name: 'Fermier 🌾',
      description:
        'A la fin de la partie, avoir tué plus de sbires  que tous les autres joueurs (si support: ce nombre est multiplié par 2)',
      weight: 0.15,
      image: 'farmer.png',
    },
    {
      id: "inter",
      type: 'Crewmate',
      name: 'Inter 🤡',
      description:
        'A la fin de la partie, être mort plus de fois que tous les autres joueurs',
      weight: 0.075,
      image: 'inter.png',
    },
    {
      id: "fanatic",
      type: 'Crewmate',
      name: 'Fanatic 🍸',
      description:
        'Rester uniquement sur ta lane pendant les 15 premières minutes de jeu (si jungler: interdiction de gank durant ce temps).',
      weight: 0.15,
      image: 'fanatic.png',
    },
    {
      id: "berserker",
      type: 'Crewmate',
      name: 'Berserker ☠️',
      description:
        "En cas de dégats reçus de la part d'un ennemi, combattre jusqu'à la mort.",
      weight: 0.075,
      image: 'berserker.png',
    },
    {
      id: "duck",
      type: 'Crewmate',
      name: 'Canard 🦆',
      description:
        'Toutes les 5 minutes, suivre les ordres reçus par messages privés.',
      weight: 0.1,
      image: 'duck.png',
      orders: [
        "Dans les 30 secondes, utilise tout ton kit de sorts! (sauf les sorts d'invocateurs)",
        'Dans les 30 secondes, utilise ton deuxième summoner spell!',
        'Dans les 30 secondes, utilise ton premier summoner spell!',
        'Casse deux plantes de la jungle maintenant!',
        'Pousse ta team à faire un objectif!',
        'Vole 10 sbires à un de tes alliés',
        'Dive dès que possible!',
        'Back maintenant!',
      ]
    },
    {
      id: "explorer",
      type: 'Crewmate',
      name: 'Explorateur 🧭',
      description:
        'Toutes les 5 minutes, se rendre à la destination indiquée par message privé en restant vivant.',
      weight: 0.1,
      image: 'explorer.png',
      orders: [
        'Tête la première, vérifie le contenu de 5 hautes herbes du côté ennemi (sans vision)',
        "Rends toi dans l'alcolve de la botlane!",
        "Rends toi dans l'alcolve de la toplane!",
        'Dis bonjour au Baron/Heraut!',
        'Dis bonjour au Dragon!',
        'Va visiter le blue ennemi!',
        'Va visiter le red ennemi!',
        'Visite la base ennemi!',
      ]
    },
  ]
  
  const imposterRoles = [
    {
      id: "imposter",
      type: 'Imposter',
      name: 'Imposteur 👿',
      description: 'Perdre la game, sans te faire repérer!',
      weight: 1,
      image: 'imposter.png',
    },
  ]
  
  const chameleonRole = {
    id: "chameleon",
    type: '',
    name: 'Cameleon 🦎',
    description: 'Gagner ou perdre la game en fonction du camps reçu en DM',
    image: 'chameleon.png',
    chanceToReplaceImposterWithChameleon: 0.1
  }
  
  module.exports = { crewmateRoles, imposterRoles, chameleonRole }
  