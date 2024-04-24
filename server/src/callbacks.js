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

  // Assign each player a role and set their rankings for the individual and team stages.
  const possibleRoles = ['Water Specialist', 'Terrain Specialist', 'Atmospheric Specialist', 'Biology Specialist', 'Climate Scientist', 'Technology']
  const players = game.players
  for (const player of players) {
    const role = possibleRoles.pop()
    player.set('role', role)
    player.set('individual-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
    player.set('team-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
  }

  // Assign each player to a team.
  // Currently this is just teams of 2. This will need to be updated when I talk to Sevan about the team size.
  for (let i = 0; i < players.length; i += 2) {
    const teamName = players[i].get('role') + '-' + players[i + 1].get('role')
    players[i].set('team', teamName)
    players[i + 1].set('team', teamName)
  }

  // Set the shared mts ranking
  round.set('mts-ranking', ['Argyre', 'Casius', 'Diacria', 'Eridania'])
})

Empirica.onRoundStart(({ round }) => {})

Empirica.onStageStart(({ stage }) => {})

Empirica.onStageEnded(({ stage }) => {})

Empirica.onRoundEnded(({ round }) => {})

Empirica.onGameEnded(({ game }) => {})
