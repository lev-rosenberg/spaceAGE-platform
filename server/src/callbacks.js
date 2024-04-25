import { ClassicListenersCollector } from '@empirica/core/admin/classic'
export const Empirica = new ClassicListenersCollector()

Empirica.onGameStart(({ game }) => {
  // Get the treatment condition from the game object.
  const treatment = game.get('treatment')
  const { interventionPlacement } = treatment

  // We only want one round, filled with 6 stages. AI intervention placement depends on the treatment condition.
  const round = game.addRound({ name: 'Round' })
  // round.addStage({ name: 'walkthrough', duration: 120 })
  round.addStage({ name: 'role-exploration', duration: 600 })
  round.addStage({ name: 'individual-ranking', duration: 600 })
  if (interventionPlacement === 'individual') round.addStage({ name: 'intervention', placement: 'individual', duration: 600 })
  round.addStage({ name: 'team-ranking', duration: 600 })
  if (interventionPlacement === 'team') round.addStage({ name: 'intervention', placement: 'team', duration: 600 })
  round.addStage({ name: 'mts-ranking', duration: 600 })
  if (interventionPlacement === 'mts') round.addStage({ name: 'intervention', placement: 'mts', duration: 600 })

  // Assign each player a role, and a team.
  // And set their rankings for the individual and team stages.
  // By altenating specialist and scientist roles in the list, we ensure that the teams are balanced.
  const possibleRoles = ['Water Specialist', 'Geology Scientist', 'Atmospheric Specialist', 'Climate Scientist', 'Terrain Specialist', 'Life Scientist']
  const players = game.players
  for (let i = 0; i < players.length; i++) {
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
  round.set('mts-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
})

Empirica.onRoundStart(({ round }) => {})

Empirica.onStageStart(({ stage }) => {})

Empirica.onStageEnded(({ stage }) => {})

Empirica.onRoundEnded(({ round }) => {})

Empirica.onGameEnded(({ game }) => {})
