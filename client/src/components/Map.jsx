/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { Context } from '../context'
import { Stage, Layer, Image } from 'react-konva'
import LocationTarget from './LocationTarget'
import useImage from 'use-image'
import { usePlayer } from '@empirica/core/player/classic/react'

export function Map ({ scaledDims, layerRef }) {
  const [image] = useImage('mars-atlas.png')
  const { state, dispatch } = useContext(Context)
  const { scale, locationCoords, locationSliderNotes } = state
  const player = usePlayer()
  function handleZoomToLocation (location) {
    const layer = layerRef.current
    if (layer) {
      const stageWidth = layer.width()
      const stageHeight = layer.height()
      const zoomFactor = 2.5

      layer.to({
        x: stageWidth / 2 - (location.x * scale * zoomFactor),
        y: stageHeight / 2 - (location.y * scale * zoomFactor),
        scaleX: zoomFactor,
        scaleY: zoomFactor,
        duration: 0.25
      })
      dispatch({ type: 'SET_CLICKED', payload: location.name })
    }
  }

  useEffect(() => {
    // set the initial slider values. these are set outside of the reducer because they depend on the player's team

    if (Object.keys(locationSliderNotes).length === 0) {
      const team = player.get('team')
      const initSliderNotes = {}
      for (const location of locationCoords) {
        if (team === 'Planetary Geology Team') {
          initSliderNotes[location.name] = { landing: 0, sunlight: 0, habitat: 0, water: 0 }
        } else {
          initSliderNotes[location.name] = { life: 0, geology: 0, atmosphere: 0 }
        }
      }
      dispatch({ type: 'SET_LOCATION_SLIDER_NOTES', payload: initSliderNotes })
    }
  }, [])

  return (
    <Stage
      width={Math.max(scaledDims.width, 1)}
      height={Math.max(scaledDims.height, 1)}
      style={{ borderRadius: '6px', overflow: 'hidden', position: 'absolute', backgroundColor: 'grey' }}
      >
      <Layer ref={layerRef}>
        <Image image={image} alt="image" width={scaledDims.width} height={scaledDims.height}/>
        {locationCoords.map((location) => (
          <LocationTarget
            key={location.name}
            location = {location}
            zoomInCallback = {(location) => handleZoomToLocation(location)}
            />
        ))}
      </Layer>
    </Stage>
  )
}
