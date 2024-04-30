import {
  usePlayer,
  useRound,
  useStage
} from '@empirica/core/player/classic/react'
import React from 'react'
import { Avatar } from './components/Avatar'
import { Timer } from './components/Timer'

export function Profile () {
  const player = usePlayer()
  const round = useRound()
  const stage = useStage()

  const score = player.get('score') || 0

  return (
    <div className="min-w-lg md:min-w-2xl mt-2 m-x-auto px-3 py-2 text-gray-500 rounded-md grid grid-cols-3 items-center border-.5">
      <div className="leading-tight ml-1">
        <div className="text-white font-semibold">
          Role
        </div>
        <div className="text-empirica-500 font-semibold">
          {player.get('role')}
        </div>
      </div>

      <Timer />

      <div className="flex space-x-3 items-center justify-end">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-semibold !leading-none tabular-nums">
            {player.get('name')}
          </div>
        </div>
        <div className="h-11 w-11">
          <Avatar player={player} />
        </div>
      </div>
    </div>
  )
}
