/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Context } from '../context'
import { Stage, Layer, Image } from 'react-konva'
import LocationTarget from './LocationTarget'
import useImage from 'use-image'

export function Map ({ scaledDims, layerRef }) {
  const [image] = useImage('mars-atlas.png')
  const { state, dispatch } = useContext(Context)
  const { scale, locationCoords } = state

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

  return (
    <Stage
      width={scaledDims.width}
      height={scaledDims.height}
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
