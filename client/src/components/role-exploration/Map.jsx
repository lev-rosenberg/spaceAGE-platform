/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { Stage, Layer, Image } from 'react-konva'
import LocationTarget from './LocationTarget'
import useImage from 'use-image'

export function Map ({ scaledDims, layerRef, handleZoomToLocation }) {
  /*
    Parameters:
      - scaledDims (object): the dimensions of the scaled image
      - layerRef (object): the reference to the Konva layer
      - handleZoomToLocation (function): the function to zoom to a clicked location
    Returns:
      - Map component for the Role Exploration stage
    Description:
      - This component is responsible for rendering the map of the Role Exploration stage.
      - It displays the map of Mars with the locations targets.
  */
  const [image] = useImage('mars-atlas.png')
  const { state } = useContext(Context)
  const { locationCoords, clicked } = state

  useEffect(() => {
    if (clicked !== null) {
      setTimeout(() => {
        const location = locationCoords.find((loc) => loc.name === clicked)
        handleZoomToLocation(location)
      }, 1)
    }
  }, [clicked])

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
            />
        ))}
      </Layer>
    </Stage>
  )
}
