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
      <p className='pb-3'>Notes:</p>
      <div className='grid grid-cols-2 gap-2 pb-3'>
        {locationCoords.map((location, i) => (
          <Button key={i} className='w-auto'>
            {location.name}
          </Button>
        ))}
      </div>
      <form>
        <label htmlFor='slider'>Slider:</label>
        {Object.keys(sliderNotes[clicked]).map((slider, i) => (
          <SliderInput
            key={i}
            value={sliderNotes[clicked][slider]}
            label={slider}
            handleChange={(e) => setSliderNotes({ ...sliderNotes, [clicked]: { ...sliderNotes[clicked], [slider]: e.target.value } })}
          />
        ))}
        <TextInput
          className='w-full'
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
