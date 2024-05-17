import { usePlayer, usePlayers, useStage } from '@empirica/core/player/classic/react'
import { Loading } from '@empirica/core/player/react'

import React from 'react'

import { InstructionsStage } from './stages/InstructionsStage'
import { RoleExploration } from './stages/RoleExploration'
import { RankingTask } from './stages/RankingTask'
import { StageInstructions } from './components/StageInstructions'

export function Stage () {
  const player = usePlayer()
  const players = usePlayers()
  const stage = useStage()

  if (player.stage.get('submit')) {
    if (players.length === 1) {
      return <Loading />
    }

    return (
      <div className="flex items-center justify-center h-full text-center text-white pointer-events-none">
        Please wait for other player(s).
      </div>
    )
  }

  const CurrentStage = () => {
    switch (stage.get('name')) {
      case 'Instructions':
        return <InstructionsStage />
      case 'Role Exploration':
        return <RoleExploration />
      case 'Individual Ranking':
        return <RankingTask />
      case 'Team Ranking':
        return <RankingTask />
      case 'Multi-Team Ranking':
        return <RankingTask />
      default:
        return <Loading />
    }
  }
  return (
    <div className="h-full flex flex-col m-12 mt-1 ">
      <StageInstructions />
      <main id = 'main' className="experiment-content">
        <CurrentStage />
      </main>
    </div>
  )
}
