import React from 'react'
import { useStage } from '@empirica/core/player/classic/react'

export function RankingTask () {
  const stage = useStage()
  const currentStage = stage.get('name')
  return (
    <div>
      Ranking not yet implemented for {currentStage}...
    </div>
  )
}
