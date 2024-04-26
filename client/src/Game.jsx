import { Chat, useGame, useStage } from '@empirica/core/player/classic/react'

import React from 'react'
import { Profile } from './Profile'
import { Stage } from './Stage'

export function Game () {
  const game = useGame()
  const stage = useStage()
  const { playerCount } = game.get('treatment')

  return (
    <div className="h-full w-full flex">
      <div className="h-full w-full flex flex-col">
        <Profile />
        <main className="h-full flex flex-col">
          <Stage />
        </main>
      </div>
      {playerCount > 1 && stage.get('name') !== 'Role Exploration' && stage.get('name') !== 'Individual Ranking' && (
        <div className="h-full w-128 border-l flex justify-center items-center">
          <Chat scope={game} attribute="chat" />
        </div>
      )}
    </div>
  )
}
