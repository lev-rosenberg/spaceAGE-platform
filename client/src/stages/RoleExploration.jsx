import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button } from '../components/Button'
import { Map } from '../components/Map'
import styles from '../styles/map.module.css'
import { Context } from '../context'
import { usePlayer } from '@empirica/core/player/classic/react'
import { Notes } from '../components/Notes'
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
  const visited = player.get('visited')
  const [locationData, setLocationData] = useState({})

  useEffect(() => {
    /*
      1. Load the image and get its dimensions
      2. Get the dimensions of the container and set the initial scale factor
      3. Add an event listener to handle resizing
      4. Get location data
    */

    const img = new Image()
    img.src = 'mars-atlas.png'
    img.onload = function () {
      setOriginalImgDims({ width: img.width, height: img.height })
    }
    const container = document.getElementById('main')
    const rect = container.getBoundingClientRect()
    const newScale = rect.width / img.width
    if (container) {
      setContainerDims({ width: rect.width, height: rect.height })
      dispatch({ type: 'SET_SCALE', payload: newScale })
    }
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    fetch('/static-info.json').then((res) => res.json()).then((data) => {
      setLocationData(data)
    })

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  useEffect(() => {
    /*
      When the there's any change in the original image dimensions or the container dimensions, rescale the image
    */
    rescaleImage(containerDims, originalImgDims)
  }, [containerDims, originalImgDims])

  function handleWindowResize () {
    /*
      1. When the window is resized, get the new dimensions of the new container and rescale the image
    */
    const dims = document.querySelector('#main')?.getBoundingClientRect()
    setContainerDims({ width: dims.width, height: dims.height })
    rescaleImage(dims, originalImgDims)
  }

  function rescaleImage (container, original) {
    /*
      1. Scale the image to fit the container. If the image is too big, scale it down. If the image is too small, scale it up.
    */
    if (original.width && original.height && container.width && container.height) {
      let newScale
      if (container.height / original.height < scale) {
        newScale = container.height / original.height
      } else {
        newScale = container.width / original.width
      }
      setScaledDims({ width: original.width * newScale, height: original.height * newScale })
      dispatch({ type: 'SET_SCALE', payload: newScale })
    }
  }

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

  function handleReturnToFullSize () {
    const layer = layerRef.current
    if (layer) {
      layer.to({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.2
      })
      dispatch({ type: 'SET_CLICKED', payload: null })
    }
  }
  return (
    <div
      id='map'
      className={`${styles.map}`}
      style={{ width: clicked || visited.length === 4 ? scaledDims.width : 'fit-content', height: clicked || visited.length === 4 ? scaledDims.height : 'fit-content' }}>
      <div className={`${styles.inset}`}>
        <div className={'flex flex-col gap-2'} style={{ width: clicked ? '35%' : 'fit-content' }}>
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
          {clicked && locationData.locations && (
            <div className={`${styles.bwSection} ${styles.locationInfo}`}>
              <h3>This is what you know about {clicked}:</h3>
              {locationData.locations[clicked][player.get('role')].split('\n').map((line, i) => (
                <div key={i}>
                  <br/>
                  <p>{line}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {clicked && (
          <Notes handleReturnToFullSize={handleReturnToFullSize}/>
        )}
        {!clicked && visited.length === 4 && (
          <Button
            handleClick={() => console.log('Next Stage')}
            className='m-3 self-end'>
            Next Stage
          </Button>
        )}
      </div>
      <Map scaledDims={scaledDims} layerRef={layerRef} handleZoomToLocation={handleZoomToLocation} />
    </div>
  )
}
