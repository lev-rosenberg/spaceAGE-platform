import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button } from '../components/Button'
import { Map } from '../components/Map'
import styles from '../styles/map.module.css'
import { Context } from '../context'
import { usePlayer } from '@empirica/core/player/classic/react'

export function RoleExploration () {
  /*
    This component is responsible for rendering the map component and scaling it to fit the container.
    - originalImgDims: the dimensions of the original image
    - containerDims: the dimensions of the container
    - scaledDims: the dimensions of the image scaled to fit the container
  */
  const [originalImgDims, setOriginalImgDims] = useState({ width: 0, height: 0 })
  const [containerDims, setContainerDims] = useState({ width: 0, height: 0 })
  const [scaledDims, setScaledDims] = useState({ width: 0, height: 0 })
  const layerRef = useRef(null)
  const { state, dispatch } = useContext(Context)
  const { scale, hovering, clicked } = state
  const player = usePlayer()
  const [locationData, setLocationData] = useState({})

  useEffect(() => {
    /*
      1. Load the image and get its dimensions
      2. Get the dimensions of the container
      3. Add an event listener to handle resizing
      4. Get location data
    */
    const img = new Image()
    img.src = 'mars-atlas.png'
    img.onload = function () {
      setOriginalImgDims({ width: img.width, height: img.height })
    }
    const container = document.getElementById('main')
    if (container) {
      const rect = container.getBoundingClientRect()
      setContainerDims({ width: rect.width, height: rect.height })
      dispatch({ type: 'SET_SCALE', payload: rect.width / img.width })
    }
    handleWindowResize()
    window.addEventListener('resize', handleWindowResize)

    fetch('/static-info.json').then((res) => res.json()).then((data) => {
      setLocationData(data)
    })

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  async function handleWindowResize () {
    const dims = document.querySelector('#main')?.getBoundingClientRect()
    setContainerDims({ width: dims.width, height: dims.height })
    rescaleImage()
  }

  function rescaleImage () {
    if (originalImgDims.width && originalImgDims.height && containerDims.width && containerDims.height) {
      let newScale
      console.log('test', containerDims.height / originalImgDims.height)
      if (containerDims.height / originalImgDims.height < scale) {
        newScale = containerDims.height / originalImgDims.height
      } else {
        newScale = containerDims.width / originalImgDims.width
      }
      setScaledDims({ width: originalImgDims.width * newScale, height: originalImgDims.height * newScale })
      console.log(scale, newScale, originalImgDims, containerDims)
      dispatch({ type: 'SET_SCALE', payload: newScale })
    }
  }

  useEffect(() => {
    rescaleImage()
  }, [originalImgDims, containerDims])

  function handleReturnToFullSize () {
    const layer = layerRef.current
    if (layer) {
      layer.to({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.1
      })
      dispatch({ type: 'SET_CLICKED', payload: null })
    }
  }
  return (
    <div id='map' className={`${styles.map} grid w-full h-fit`}>
      <Map scaledDims={scaledDims} layerRef={layerRef}/>
      <div className={`${styles.inset}`} style={{ height: clicked ? containerDims.height : 'fit-content' }}>
        <div className={'flex justify-self-start gap-3'}>
          {clicked && (
            <Button handleClick={handleReturnToFullSize}>
              Back
            </Button>
          )}
          <div className={`${styles.bwSection}`}>
            {hovering ? `Location: ${hovering}` : 'Mars World Map'}
          </div>
        </div>
        {clicked && (
          <div className={`${styles.bwSection}`}>
            <p>{locationData.locations[clicked][player.get('role')]}</p>
          </div>
        )}
      </div>
    </div>
  )
}
