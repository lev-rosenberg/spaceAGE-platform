import { usePlayer, useStage } from '@empirica/core/player/classic/react'
import React, { useEffect } from 'react'
import { ContextProvider } from './context'
import { Profile } from './Profile'
import { Stage } from './Stage'

export function Game () {
  const stage = useStage()
  const player = usePlayer()
  console.log(stage.get('name'))
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
      </div>
    </ContextProvider>
  )
}
