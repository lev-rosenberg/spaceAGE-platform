/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import { Context } from '../context'
import { SliderInput } from './SliderInput'
import styles from '../styles/map.module.css'
import { usePlayer, useStage } from '@empirica/core/player/classic/react'

export function Notes ({ handleReturnToFullSize }) {
  const player = usePlayer()
  const serverSideSliderNotes = player.get('locationSliderNotes')
  const stage = useStage()
  const { state, dispatch } = useContext(Context)
  const { clicked, locationCoords, localTextNotes, localSliderNotes } = state

  useEffect(() => {
    /*
      if the local context notes haven't been set, set them to the server side notes which are all 5/10. This is a one-time operation.
      this is needed because we can't access player data in the context provider, and which sliders players see depends on player data.
    */
    if (Object.keys(localSliderNotes).length === 0) {
      dispatch({ type: 'SET_LOCATION_SLIDER_NOTES', payload: serverSideSliderNotes })
    }
    if (!clicked) {
      dispatch({ type: 'SET_CLICKED', payload: locationCoords[0].name })
    }
  }, [])

  function handleButtonClick (location) {
    /*
      1. If the location clicked is the same as the current location, return
      2. If we are in the Role Exploration stage, return to full size, set the player's notes to the local notes, and update the visited array
        a. Why must we return to full size? The canvas rerenders to full size whenever we update data on the emprica server. This is a workaround
           that makes the transition to full size less jarring.
        b. Then in the Map.jsx component, we zoom to the location.
      3. In either case (Role Exploration or not), set the clicked location to the location clicked
    */
    if (location.name === clicked) { return }
    if (stage.get('name') === 'Role Exploration') {
      handleReturnToFullSize(location.name)
      // dispatch({ type: 'SET_CLICKED', payload: location.name })
    } else {
      dispatch({ type: 'SET_CLICKED', payload: location.name })
    }
  }

  return (
    <div className={`${styles.bwSection}`}>
      <div className='grid grid-cols-2 gap-2 pb-3'>
        {locationCoords.map((location, i) => (
          <Button
            key={i}
            className={`w-auto ${clicked === location.name && 'clicked'}`}
            handleClick={() => handleButtonClick(location)}
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
      </form>
    </div>
  )
}
