import { ClassicListenersCollector } from '@empirica/core/admin/classic'
export const Empirica = new ClassicListenersCollector()

Empirica.onGameStart(({ game }) => {
  // Get the treatment condition from the game object.
  const treatment = game.get('treatment')
  const { interventionPlacement } = treatment

  // We only want one round, filled with 6 stages. AI intervention placement depends on the treatment condition.
  const round = game.addRound({ name: 'Round' })
  // round.addStage({ name: 'walkthrough', duration: 120 })
  round.addStage({ name: 'Role Exploration', duration: 6000 })
  round.addStage({ name: 'Individual Ranking', duration: 600 })
  if (interventionPlacement === 'individual') round.addStage({ name: 'intervention', placement: 'Individual Ranking', duration: 600 })
  round.addStage({ name: 'Team Ranking', duration: 600 })
  if (interventionPlacement === 'team') round.addStage({ name: 'intervention', placement: 'Team Ranking', duration: 600 })
  round.addStage({ name: 'Multi-Team Ranking', duration: 600 })
  if (interventionPlacement === 'mts') round.addStage({ name: 'intervention', placement: 'Multi-Team Ranking', duration: 600 })

  // Assign each player a role, and a team.
  // And set their rankings for the individual and team stages.
  // By altenating specialist and scientist roles in the list, we ensure that the teams are balanced.
  const possibleRoles = ['Water Specialist', 'Geology Scientist', 'Atmospheric Specialist', 'Climate Scientist', 'Terrain Specialist', 'Life Scientist']
  // before this loop, get the player/s that are fake AI from partipant ID. player.get("participantIdentifier")). and assign them to like AI Scientist or AI Specialist
  const players = game.players
  for (let i = 0; i < players.length; i++) {
    i = i % possibleRoles.length // loop back through the begining
    const role = possibleRoles[i]
    players[i].set('role', role)
    if (role.split(' ')[1] === 'Specialist') {
      players[i].set('team', 'Planetary Geology Team')
    } else {
      players[i].set('team', 'Space Human Factors')
    }
    players[i].set('individual-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
    players[i].set('team-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
  }
  // We set the mts ranking outside of the loop, because it is the same for all players.
  // stage.set('Space Human Factors', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
  round.set('mts-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
})

Empirica.onRoundStart(({ round }) => {})

Empirica.onStageStart(({ stage }) => {})

Empirica.onStageEnded(({ stage }) => {})

Empirica.onRoundEnded(({ round }) => {})

Empirica.onGameEnded(({ game }) => {})
