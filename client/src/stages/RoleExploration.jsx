import React, { useState, useEffect, useContext, useRef } from 'react'
import { Button } from '../components/Button'
import styles from '../styles/map.module.css'
import { Context } from '../context'
import { usePlayer } from '@empirica/core/player/classic/react' // updated to include timer
import { Notes } from '../components/Notes'
import { isEqual } from 'lodash'
import { Map } from '../components/role-exploration/Map'
import LocationInfo from '../components/role-exploration/LocationInfo'
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
  const { scale, hovering, clicked, localTextNotes, localSliderNotes } = state
  const player = usePlayer()
  const visited = player.get('visited')
  const [locationJsonData, setLocationJsonData] = useState({})


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
    if (container) {
      setContainerDims({ width: rect.width, height: rect.height })
      dispatch({ type: 'SET_SCALE', payload: rect.width / img.width })
    }
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize)

    fetch('/static-info.json').then((res) => res.json()).then((data) => {
      setLocationJsonData(data)
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
      const layerWidth = layer.width()
      const layerHeight = layer.height()
      const zoomFactor = 2.5
      layer.to({
        x: layerWidth / 2 - (location.x * scale * zoomFactor),
        y: layerHeight / 2 - (location.y * scale * zoomFactor),
        scaleX: zoomFactor,
        scaleY: zoomFactor,
        duration: 0.3
      })
      dispatch({ type: 'SET_CLICKED', payload: location.name })
    }
  }

  function handleReturnToFullSize (newLocation) {
    const layer = layerRef.current
    if (layer) {
      layer.to({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        duration: 0.3
      })
    }

    setTimeout(() => {
      // if the notes haven't changed, don't update
      if (isEqual(localTextNotes, player.get('locationTextNotes')) && isEqual(localSliderNotes, player.get('locationSliderNotes'))) {
        dispatch({ type: 'SET_CLICKED', payload: newLocation })
        // console.log(localTextNotes)
      } else {
        // otherwise, update the notes and add the location to the visited list
        // set 0.5 sec timer to allow the map to zoom out before updating the notes
        player.set('locationTextNotes', localTextNotes)
        player.set('locationSliderNotes', localSliderNotes)
        if (!visited.includes(clicked)) {
          player.set('visited', [...visited, clicked])
        }
        dispatch({ type: 'SET_CLICKED', payload: newLocation })
      }
    }, 350)
  }

  function handleBackClick () {
    handleReturnToFullSize(null)
  }

  return (
    <div id='map' className={`${styles.map}`}>
      <div className={`${styles.inset}`}>
        <div className={'flex flex-col gap-2'} style={{ width: clicked ? '35%' : 'fit-content' }}>
          <div className={'flex gap-2'}>
            {clicked && (
              <Button handleClick={handleBackClick}>
                Back
              </Button>
            )}
            <div className={`${styles.bwSection} ${styles.locationName}`}>
              {hovering ? `Location: ${hovering}` : clicked ? `Location: ${clicked}` : 'Mars World Map'}
            </div>
          </div>
          <LocationInfo locationJsonData={locationJsonData}/>
        </div>
        {clicked && (
          <div className='flex'>
            {(visited.length === 4) && (
              <Button
                handleClick={() => player.stage.set('submit', true)}
                className='my-1 mx-3 self-end'>
                Next Stage
              </Button>
            )}
            <Notes handleReturnToFullSize={handleReturnToFullSize}/>
          </div>
        )}
        {!clicked && visited.length === 4 && (
          <Button
            handleClick={() => player.stage.set('submit', true)}
            className='m-1 self-end'>
            Next Stage
          </Button>
        )}
      </div>
      <Map scaledDims={scaledDims} layerRef={layerRef} handleZoomToLocation={handleZoomToLocation}/>
    </div>
  );
}