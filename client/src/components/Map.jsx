/* eslint-disable react/prop-types */
import React from 'react'
import { Stage, Layer, Image } from 'react-konva'
import useImage from 'use-image'

export function Map ({ scaledDims }) {
  const [image] = useImage('mars-atlas.png')

  return (
      <Stage
        width={scaledDims.width}
        height={scaledDims.height}
        style={{ borderRadius: '6px', overflow: 'hidden' }}>
        <Layer>
          <Image image={image} alt="image" width={scaledDims.width} height={scaledDims.height}/>
        </Layer>
      </Stage>
  )
}
