import { Chat, useGame, usePlayer, useStage } from '@empirica/core/player/classic/react'

import React, { useEffect } from 'react'
import { ContextProvider } from './context'
import { Profile } from './Profile'
import { Stage } from './Stage'

export function Game () {
  const game = useGame()
  const stage = useStage()
  const player = usePlayer()
  const { playerCount } = game.get('treatment')

  useEffect(() => {
    // Set the player's name from the localStorage
    const name = localStorage.getItem(`name-${player.get('participantIdentifier')}`)
    player.set('name', name)
  }, [])

  return (
    <ContextProvider>
      <div className="h-full w-full flex">
        <div className="h-full w-full flex flex-col">
          <Profile />
          <Stage />
        </div>
        {playerCount > 1 && stage.get('name').includes('Ranking' || 'intervention') && (
          <div className="h-full w-128 border-l flex justify-center items-center">
            <Chat scope={game} attribute="chat" />
          </div>
        )}
      </div>
    </ContextProvider>
  )
}
