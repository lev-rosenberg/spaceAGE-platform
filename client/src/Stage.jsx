import {
  usePlayer,
  usePlayers,
  // useRound,
  useStage
} from '@empirica/core/player/classic/react'
import { Loading } from '@empirica/core/player/react'
import React from 'react'

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

  return (<p>Not yet implemented...</p>)
}
