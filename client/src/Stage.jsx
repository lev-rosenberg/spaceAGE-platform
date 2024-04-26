import {
  usePlayer,
  usePlayers,
  // useRound,
  useStage
} from '@empirica/core/player/classic/react'
import { Loading } from '@empirica/core/player/react'
import React from 'react'
import { InstructionsStage } from './stages/InstructionsStage'
import { RoleExploration } from './stages/RoleExploration'
import { RankingTask } from './stages/RankingTask'
import { StageInstructions } from './components/StageInstructions'
export function Stage () {
  const player = usePlayer()
  const players = usePlayers()
  // const round = useRound()
  const stage = useStage()
  console.log(stage.get('name'))
  console.log('role:', player.get('role'))
  console.log('team:', player.get('team'))

  if (player.stage.get('submit')) {
    if (players.length === 1) {
      return <Loading />
    }

    return (
      <div className="text-center text-gray-400 pointer-events-none">
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
    <>
      <StageInstructions />
      <div className="map w-full h-full flex py-2 px-2">
        <CurrentStage />
      </div>
    </>
  )
}
