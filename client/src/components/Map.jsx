/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Context } from '../context'
import { Stage, Layer, Image } from 'react-konva'
import LocationTarget from './LocationTarget'
import useImage from 'use-image'

export function Map ({ scaledDims, layerRef, handleZoomToLocation }) {
  const [image] = useImage('mars-atlas.png')
  const { state } = useContext(Context)
  const { locationCoords } = state

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
