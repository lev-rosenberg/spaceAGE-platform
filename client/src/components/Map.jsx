/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Context } from '../context'
import { Stage, Layer, Image } from 'react-konva'
import LocationTarget from './LocationTarget'
import useImage from 'use-image'

export function Map ({ scaledDims, layerRef }) {
  const [image] = useImage('mars-atlas.png')
  const { state, dispatch } = useContext(Context)
  const { scale, clicked } = state
  const locationCoords = [
    { name: 'Argyre', x: 1330, y: 1190 },
    { name: 'Casius', x: 2600, y: 500 },
    { name: 'Diacria', x: 400, y: 300 },
    { name: 'Eridania', x: 3100, y: 1140 }
  ]
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
        duration: 0.2
      })
      dispatch({ type: 'SET_CLICKED', payload: location.name })
    }
  }
  return (
    <Stage
      width={scaledDims.width}
      height={scaledDims.height}
      style={{ borderRadius: '6px', overflow: 'hidden', position: 'absolute' }}
      >
      <Layer ref={layerRef}>
        <Image image={image} alt="image" width={scaledDims.width} height={scaledDims.height}/>
        {!clicked && locationCoords.map((location) => (
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
