import React, { useState, useContext } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import { Context } from '../context'
import { SliderInput } from './SliderInput'
import styles from '../styles/map.module.css'

export function Notes () {
  const { state, dispatch } = useContext(Context)
  const { clicked, locationCoords, locationTextNotes, locationSliderNotes } = state
  const [textNotes, setTextNotes] = useState(locationTextNotes)
  const [sliderNotes, setSliderNotes] = useState(locationSliderNotes)

  function updateLocationNotes () {
    dispatch({ type: 'SET_LOCATION_TEXT_NOTES', payload: textNotes })
    dispatch({ type: 'SET_LOCATION_SLIDER_NOTES', payload: sliderNotes })
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
