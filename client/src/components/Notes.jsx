/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { Button } from './Button'
import { TextInput } from './TextInput'
import { Context } from '../context'
import { SliderInput } from './SliderInput'
import styles from '../styles/map.module.css'
import { usePlayer, useStage } from '@empirica/core/player/classic/react'

export function Notes ({ handleReturnToFullSize }) {
  /*
    Parameters: 
      - handleReturnToFullSize (function to move canvas zoom/pan to fit full size in your screen)
    Returns: 
      - Notes component for the Role Exploration stage
    Description: 
      - This component is responsible for rendering the notes section of the Role Exploration stage. 
      - It displays the buttons to navigate to different locations & sliders and text inputs to take notes on each location.
  */
  const player = usePlayer()
  const serverSideSliderNotes = player.get('locationSliderNotes')
  const serverSideTextNotes = player.get('locationTextNotes')
  const stage = useStage()
  const { state, dispatch } = useContext(Context)
  const { clicked, locationCoords, localTextNotes, localSliderNotes } = state

  useEffect(() => {
    /* 
    Description:
      - If the local context notes haven't been set, set them to the server side notes which are all initially 5/10. This is a one-time operation.
      - This is needed because different players need to see different sliders depending on team. But we can't set that in the context provider since
        it does not have access to player data.
    */
    if (Object.keys(localSliderNotes).length === 0) {
      dispatch({ type: 'SET_LOCATION_SLIDER_NOTES', payload: serverSideSliderNotes })
    }
    if (Object.keys(localTextNotes).length === 0) {
      dispatch({ type: 'SET_LOCATION_TEXT_NOTES', payload: serverSideTextNotes })
    }
    if (!clicked) {
      dispatch({ type: 'SET_CLICKED', payload: locationCoords[0].name })
    }
  }, [])

  function handleButtonClick (location) {
    /*
      Parameters:
        - location (object): the location object that was clicked
      Returns: void
      Description:
        1. If the location clicked is the same as the current location, return
        2. If we are in the Role Exploration stage, return to full size, set the player's notes to the local notes, and update the visited array
          a. Why must we return to full size? The canvas rerenders to full size whenever we update data on the emprica server. This is a workaround
            that makes the transition to full size less jarring.
          b. Then in the Map.jsx component, we zoom to the location.
        3. In either case (Role Exploration or not), set the clicked location to the location clicked
    */
    if (location.name === clicked) { return }
    // if (stage.get('name') === 'Role Exploration') {
    handleReturnToFullSize(location.name)
      // dispatch({ type: 'SET_CLICKED', payload: location.name })
    // } else {
    //   dispatch({ type: 'SET_CLICKED', payload: location.name })
    // }
  }

  function handleLocalChange (type, payload) {
    /*
      Parameters:
        - type (string): the type of action to take
        - payload (object): the payload to pass to the reducer
      Returns: void
      Description:
        1. If we are not in the Role Exploration stage, return (THIS MIGHT CHANGE IN THE FUTURE)
        2. Dispatch the action
    */
    //if (stage.get('name') !== 'Role Exploration') { return }
    dispatch({ type, payload })
  }

  return (
    <div className={`${styles.bwSection} ${styles.notes}`}>
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
      <h3 className='mb-2'>Rate {clicked} on the following factors:</h3>
      <form
        disabled={false}
        >
        <div className='flex flex-col gap-2 mb-3'>
          {Object.keys(localSliderNotes).length !== 0 &&
            Object.keys(localSliderNotes[clicked]).map((slider, i) => (
              <SliderInput
                key={i}
                value={localSliderNotes[clicked][slider]}
                label={slider}
                handleChange={(e) => {
                    handleLocalChange('SET_LOCATION_SLIDER_NOTES', { ...localSliderNotes, [clicked]: { ...localSliderNotes[clicked], [slider]: e.target.value } });
                    // console.log(player.get('locationSliderNotes'));
                    // player.set('locationSliderNotes', localSliderNotes);
                }

              }
              />
            ))
          }
        </div>
        <TextInput
          className='w-full h-32'
          value={localTextNotes[clicked]}
          label='localSliderNotesLabel'
          placeholder={'Notes about '+clicked}
          area
          handleChange={(e) => {
            handleLocalChange('SET_LOCATION_TEXT_NOTES', { ...localTextNotes, [clicked]: e.target.value });
            console.log('Input value changed:', player.get('locationTextNotes'));
            // player.set('locationTextNotes', localTextNotes);
          }}
        />
      </form>
    </div>
  )
}