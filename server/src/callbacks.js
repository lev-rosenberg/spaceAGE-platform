import { ClassicListenersCollector } from '@empirica/core/admin/classic'
export const Empirica = new ClassicListenersCollector()

Empirica.onGameStart(({ game }) => {
  /*
    1. Fill round with 7 stages --> Instructions, Walkthrough, Role Exploration, Indivudual, Team, MTS, AI Variation.
      a. AI intervention placement depends on the interventionPlacement treatment condition.
      b. TODO: add instructions and/or walkthrough stage
    2. Assign each player a role, and a team.
      a. If the aiVariation treatment condition is wizard, we want to assign the AI players the roles of AI Specialist and AI Scientist.
    3. Set their location rankings for the individual team, and mts stages.
      a. individual rankings held in player.get('individual-ranking')
      b. team rankings held in round.get('<team-acronym>-team-ranking')
      c. mts rankings held in round.get('mts-ranking')
  */
  const treatment = game.get('treatment')
  const { interventionPlacement, aiVariation } = treatment

  // 1: Create the round and stages
  const round = game.addRound({ name: 'Round' })
  // round.addStage({ name: 'Walkthrough', duration: 120 })
  // round.addStage({ name: 'Instructions', duration: 120 })
  round.addStage({ name: 'Role Exploration', duration: 6000 })
  round.addStage({ name: 'Individual Ranking', duration: 600 })
  if (interventionPlacement === 'individual') round.addStage({ name: 'intervention', placement: 'Individual Ranking', duration: 600 })
  round.addStage({ name: 'Team Ranking', duration: 600 })
  if (interventionPlacement === 'team') round.addStage({ name: 'intervention', placement: 'Team Ranking', duration: 600 })
  round.addStage({ name: 'Multi-Team Ranking', duration: 600 })
  if (interventionPlacement === 'mts') round.addStage({ name: 'intervention', placement: 'Multi-Team Ranking', duration: 600 })

  // 2: Assign roles and teams.
  const possibleRoles = ['Water Specialist', 'Geology Scientist', 'Atmospheric Specialist', 'Climate Scientist', 'Terrain Specialist', 'Life Scientist']
  const aiRoles = ['AI Specialist', 'AI Scientist'] // only used if aiVariation === 'wizard'
  const players = game.players
  for (const player of players) {
    let role
    if (aiVariation === 'wizard' && player.get('participantIdentifier').includes('AI-WIZARD')) { //
      role = aiRoles.pop()
      player.set('role', role)
    } else {
      const i = (players.indexOf(player) - (2 - aiRoles.length)) % possibleRoles.length // loop back through the beginning
      role = possibleRoles[i]
      player.set('role', role)
    }
    if (role.split(' ')[1] === 'Specialist') {
      player.set('team', 'Planetary Geology Team')
    } else {
      player.set('team', 'Space Human Factors')
    }
    // 3a: Set individual rankings
    player.set('individual-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
  }
  // 3b, 3c: Set team, mts rankings
  round.set('shf-team-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
  round.set('pgt-team-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
  round.set('mts-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
})

Empirica.onRoundStart(({ round }) => {})

Empirica.onStageStart(({ stage }) => {})

Empirica.onStageEnded(({ stage }) => {})

Empirica.onRoundEnded(({ round }) => {})

Empirica.onGameEnded(({ game }) => {})
