/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Context } from '../../context'
import { Circle, Line, Group, Text, Rect } from 'react-konva'
import { usePlayer } from '@empirica/core/player/classic/react'

export default function LocationTarget ({ location }) {
  /* 
    Parameters: 
      - location (object): the location objects for each location in the study
    Returns:
      - LocationTarget component for the Role Exploration stage
    Description:
      - This component is responsible for rendering the target locations on the map.
      - It displays the target locations as concentric circles on the map with the location name displayed on hover.
      - The color of the circles is determined by whether the location has been visited or not.
  */

  const player = usePlayer()
  const { state, dispatch } = useContext(Context)
  const { scale, hovering, clicked } = state
  const textRef = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  const visited = player.get('visited')
  const isVisited = visited.includes(location.name)
  const color = isVisited ? 'darkgreen' : 'white'

  function handleMouseEnter (e) {
    const container = e.target.getStage().container()
    container.style.cursor = 'pointer'
    if (hovering !== location.name) {
      dispatch({ type: 'SET_HOVERING', payload: location.name })
    }
  }
  function handleMouseLeave (e) {
    const container = e.target.getStage().container()
    container.style.cursor = 'default'
    dispatch({ type: 'SET_HOVERING', payload: null })
  }

  function handleClick (e) {
    dispatch({ type: 'SET_CLICKED', payload: location.name })
    handleMouseLeave(e)
  }

  useEffect(() => {
    function scaleSize () {
      if (textRef.current === null) {
        return
      }
      setSize({
        width: textRef.current.width(),
        height: textRef.current.height()
      })
    }
    scaleSize()
    window.addEventListener('resize', () => {
      scaleSize()
    })
  }, [clicked, scale])

  return (
    <Group>
      <Group
        onMouseEnter={!clicked ? handleMouseEnter : null}
        onMouseLeave={!clicked ? handleMouseLeave : null}
        onClick={handleClick}
        >
        <Circle
          x={Math.max(location.x * scale, 1)}
          y={Math.max(location.y * scale, 1)}
          width={Math.max(!clicked && hovering === location.name ? 40 * scale : 30 * scale, 1)}
          height={Math.max(!clicked && hovering === location.name ? 40 * scale : 30 * scale, 1)}
          shadowBlur={hovering === location.name ? 10 : 0}
          shadowColor='lightblue'
          fill={hovering === location.name ? 'lightblue' : color}/>
        <Circle
          x={Math.max(location.x * scale, 1)}
          y={Math.max(location.y * scale, 1)}
          width={Math.max(135 * scale, 1)}
          height={Math.max(135 * scale, 1)}
          stroke={color}
          strokeWidth={1}
        />
        <Circle
          x={Math.max(location.x * scale, 1)}
          y={Math.max(location.y * scale, 1)}
          width={Math.max(160 * scale, 1)}
          height={Math.max(160 * scale, 1)}
          stroke={color}
          strokeWidth={3}
          shadowBlur={6}
          shadowColor={color}
          />
        <Circle
          x={Math.max(location.x * scale, 1)}
          y={Math.max(location.y * scale, 1)}
          width={Math.max(160 * scale, 1)}
          height={Math.max(160 * scale, 1)}
          fill='rgba(233, 233, 233, 0.4'/>
        {hovering === location.name && (
          <>
            <Line
              points={[0, location.y * scale, 2000, location.y * scale]}
              stroke={color}
              strokeWidth={1}
              dash = {[3, 3]}/>
            <Line
              points={[location.x * scale, 0, location.x * scale, 2000]}
              stroke={color}
              strokeWidth={1}
              dash = {[3, 3]}/>
            <Circle x={location.x * scale} y={location.y * scale} width={300 * scale} height={300 * scale} stroke={color} strokeWidth={2}/>
            <Circle x={location.x * scale} y={location.y * scale} width={280 * scale} height={280 * scale} stroke={color} strokeWidth={1}/>
          </>
        )}
      </Group>
      {!clicked && (
        <Group
          x={Math.max((location.x + 75) * scale + (hovering === location.name ? 50 * scale : 0), 1)}
          y={Math.max((location.y + 75) * scale + (hovering === location.name ? 50 * scale : 0), 1)}
        >
          <Rect
            width={Math.max(size.width)}
            height={Math.max(size.height)}
            fill={color}
          />
          <Text
            text={location.name}
            ref={textRef}
            fontFamily='Monospace'
            fontSize={30 * scale}
            fill={isVisited ? 'white' : '#202020'}
            verticalAlign='middle'
            padding = {7}
          />
        </Group>
      )}
    </Group>
  )
}
