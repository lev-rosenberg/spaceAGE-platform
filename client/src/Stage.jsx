import { usePlayer, usePlayers, useStage } from '@empirica/core/player/classic/react'
import { Loading } from '@empirica/core/player/react'

import React from 'react'

import { InstructionsStage } from './stages/InstructionsStage'
import { RoleExploration } from './stages/RoleExploration'
import { RankingStage } from './stages/RankingStage'
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
  const currStageName = stage.get('name') !== 'intervention' ? stage.get('name') : stage.get('placement')

  const CurrentStage = () => {
    switch (currStageName) {
      case 'Instructions':
        return <InstructionsStage />
      case 'Role Exploration':
        return <RoleExploration />
      case 'Individual Ranking':
        return <RankingStage />
      case 'Team Ranking':
        return <RankingStage />
      case 'Multi-Team Ranking':
        return <RankingStage />
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
