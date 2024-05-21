import React from 'react'
import { useStage } from '@empirica/core/player/classic/react'
import styles from '../styles/ranking.module.css'

export function RankingTask () {
  const stage = useStage()
  const currentStage = stage.get('name')
  return (
    <div className={`${styles.container}`}>
      Ranking not yet implemented for {currentStage}...
    </div>
  )
}
