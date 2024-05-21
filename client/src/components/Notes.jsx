/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import { Context } from '../context'
import { SliderInput } from './SliderInput'
import styles from '../styles/map.module.css'
import { usePlayer } from '@empirica/core/player/classic/react'

export function Notes () {
  const player = usePlayer()
  const serverSideSliderNotes = player.get('locationSliderNotes')
  // const [textNotes, setTextNotes] = useState(serverSideTextNotes)
  // const [sliderNotes, setSliderNotes] = useState(serverSideSliderNotes)

  const { state, dispatch } = useContext(Context)
  const { clicked, locationCoords, localTextNotes, localSliderNotes } = state

  useEffect(() => {
    // if the local context notes haven't been set, set them to the server side notes which are all 5/10. This is a one-time operation.
    console.log('setting notes')
    if (Object.keys(localSliderNotes).length === 0) {
      dispatch({ type: 'SET_LOCATION_SLIDER_NOTES', payload: serverSideSliderNotes })
    }
  }, [])

  // async function updateLocationNotes () {
  //   // if the notes haven't changed, don't update
  //   if (textNotes === player.get('locationTextNotes') && sliderNotes === player.get('locationSliderNotes')) {
  //     return
  //   }
  //   console.log('updating notes')
  //   player.set('locationTextNotes', textNotes)
  //   player.set('locationSliderNotes', sliderNotes)
  //   if (!visited.includes(clicked)) {
  //     player.set('visited', [...visited, clicked])
  //   }
  // }

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
          {Object.keys(localSliderNotes).length !== 0 &&
            Object.keys(localSliderNotes[clicked]).map((slider, i) => (
              <SliderInput
                key={i}
                value={localSliderNotes[clicked][slider]}
                label={slider}
                handleChange={(e) => dispatch({ type: 'SET_LOCATION_SLIDER_NOTES', payload: { ...localSliderNotes, [clicked]: { ...localSliderNotes[clicked], [slider]: e.target.value } } })}
              />
            ))
          }
        </div>
        <TextInput
          className='w-full h-32'
          value={localTextNotes[clicked]}
          area
          handleChange={(e) => dispatch({ type: 'SET_LOCATION_TEXT_NOTES', payload: { ...localTextNotes, [clicked]: e.target.value } })}
        />
        {/* <Button
          className='w-full'
          primary
          handleClick={updateLocationNotes}
        >
          Save
        </Button> */}
      </form>
    </div>
  )
}
