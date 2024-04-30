import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'

export function Lobby () {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-1'>
      <FontAwesomeIcon icon={faUserGroup} size='2xl' className='pb-5'/>

      <h3>Waiting for other players to join...</h3>
      <p>Please wait for the game to be ready.</p>
    </div>
  )
}
