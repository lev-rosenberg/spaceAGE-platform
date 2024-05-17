/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import { Context } from '../context'
import { SliderInput } from './SliderInput'
import styles from '../styles/map.module.css'
import { usePlayer } from '@empirica/core/player/classic/react'

export function Notes () {
  const player = usePlayer()
  const { state } = useContext(Context)
  const { clicked, locationCoords } = state
  const visited = player.get('visited')

  const [textNotes, setTextNotes] = useState(player.get('locationTextNotes'))
  const [sliderNotes, setSliderNotes] = useState(player.get('locationSliderNotes'))

  async function updateLocationNotes () {
    // if the notes haven't changed, don't update
    if (textNotes === player.get('locationTextNotes') && sliderNotes === player.get('locationSliderNotes')) {
      return
    }
    console.log('updating notes')
    player.set('locationTextNotes', textNotes)
    player.set('locationSliderNotes', sliderNotes)
    if (!visited.includes(clicked)) {
      player.set('visited', [...visited, clicked])
    }
  }

  return (
    <div className={`${styles.bwSection} basis-1/4`}>
      {/* <h3 className='mb-1'>Notes:</h3> */}
      <div className='grid grid-cols-2 gap-2 pb-3'>
        {locationCoords.map((location, i) => (
          <Button
            key={i}
            className={`w-auto ${clicked === location.name && 'clicked'}`}
            >
            {location.name}
          </Button>
        ))}
      </div>
      <h3 className='mb-2'>Rank {clicked} on the following factors:</h3>
      <form>
        <div className='flex flex-col gap-2 mb-3'>
          {Object.keys(sliderNotes[clicked]).map((slider, i) => (
            <SliderInput
              key={i}
              value={sliderNotes[clicked][slider]}
              label={slider}
              handleChange={(e) => setSliderNotes({ ...sliderNotes, [clicked]: { ...sliderNotes[clicked], [slider]: e.target.value } })}
            />
          ))}
        </div>
        <TextInput
          className='w-full h-32'
          value={textNotes[clicked]}
          area
          handleChange={(e) => setTextNotes({ ...textNotes, [clicked]: e.target.value })}
        />
        <Button
          className='w-full'
          primary
          handleClick={updateLocationNotes}
        >
          Save
        </Button>
      </form>
    </div>
  )
}
