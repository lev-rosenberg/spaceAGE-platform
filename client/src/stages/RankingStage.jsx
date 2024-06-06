import React from 'react'
import { useStage, useGame } from '@empirica/core/player/classic/react'
import { Chat } from '../components/Chat'
import { RankingTask } from '../components/RankingTask'
import { Notes } from '../components/Notes'
import styles from '../styles/ranking.module.css'

export function RankingStage () {
  const game = useGame()
  const stage = useStage()
  const { playerCount } = game.get('treatment')
  const currStageName = stage.get('name') !== 'intervention' ? stage.get('name') : stage.get('placement')

  return (
    <div className={`${styles.rankingStage}`}>
      <div className="h-full w-128">
        {playerCount > 1 && currStageName.includes('Team') && (
          <Chat scope={game} attribute="chat" />
        )}
      </div>

      <div>
        <div className={`${styles.bwSection} w-1/2 m-auto text-center`}>
          <h3>Where should the crew land on Mars? Click and drag to rank each location from 1 = best to 4 = worst.</h3>
        </div>
        <RankingTask />
      </div>
      <div className="h-full w-128">
        <Notes handleReturnToFullSize={() => console.log('null')}/>
      </div>
    </div>
  )
}
