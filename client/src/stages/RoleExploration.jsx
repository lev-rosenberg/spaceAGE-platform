import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button } from '../components/Button'
import { Map } from '../components/Map'
import styles from '../styles/map.module.css'
import { Context } from '../context'
import { usePlayer } from '@empirica/core/player/classic/react'
import { TextInput } from '../components/TextInput'

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
  const { scale, hovering, clicked, locationCoords } = state
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
    <div
      id='map'
      className={`${styles.map}`}
      style={{ width: clicked ? scaledDims.width : 'fit-content', height: clicked ? scaledDims.height : 'fit-content' }}>
      <div className={`${styles.inset}`}>
        <div className={'flex flex-col gap-2'} style={{ width: clicked ? '25%' : 'fit-content' }}>
          <div className={'flex gap-2'}>
            {clicked && (
              <Button handleClick={handleReturnToFullSize}>
                Back
              </Button>
            )}
            <div className={`${styles.bwSection}`}>
              {hovering ? `Location: ${hovering}` : clicked ? `Location: ${clicked}` : 'Mars World Map'}
            </div>
          </div>
          {clicked && (
            <div className={`${styles.bwSection}`}>
              <h3 className='pb-3'>This is what you know about {clicked}:</h3>
              <p>{locationData.locations[clicked][player.get('role')]}</p>
            </div>
          )}
        </div>
        {clicked && (
          <div className={`${styles.bwSection} basis-1/4`}>
            <p className='pb-3'>Notes:</p>
            <div className='grid grid-cols-2 gap-2 pb-3'>
              {locationCoords.map((location, i) => (
                <Button key={i} className='w-auto'>
                  {location.name}
                </Button>
              ))}
            </div>
            {/* <input className='slider' type="range" min="1" max="100" value="50"/> */}
            <TextInput className='w-full' area />
          </div>
        )}
      </div>
      <Map scaledDims={scaledDims} layerRef={layerRef}/>
    </div>
  )
}
