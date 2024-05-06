import React, { useState, useEffect } from 'react'
import { Map } from '../components/Map'
export function RoleExploration () {
  const [originalImgDims, setOriginalImgDims] = useState({ width: 0, height: 0 })
  const [containerDims, setContainerDims] = useState({ width: 0, height: 0 })
  const [scaledDims, setScaledDims] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const img = new Image()
    img.src = 'mars-atlas.png'
    img.onload = function () {
      setOriginalImgDims({ width: img.width, height: img.height })
    }
    const container = document.getElementById('map')
    if (container) {
      const rect = container.getBoundingClientRect()
      setContainerDims({ width: rect.width, height: rect.height })
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  function handleResize () {
    const dims = document.querySelector('#map')?.getBoundingClientRect()
    setContainerDims({ width: dims?.width, height: dims?.height })
    scaleImageDims()
  }

  function scaleImageDims () {
    if (originalImgDims.width && originalImgDims.height && containerDims.width && containerDims.height) {
      let scale
      scale = containerDims.width / originalImgDims.width
      if (containerDims.height / originalImgDims.height < scale) {
        scale = containerDims.height / originalImgDims.height
      }
      setScaledDims({ width: originalImgDims.width * scale, height: originalImgDims.height * scale })
    }
  }

  useEffect(() => {
    scaleImageDims()
  }, [originalImgDims, containerDims])

  return (
      <div id='map' className='flex justify-center items-center w-full h-full'>
        <Map scaledDims = {scaledDims}/>
      </div>
  )
}
