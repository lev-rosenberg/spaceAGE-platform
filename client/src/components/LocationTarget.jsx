/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { Context } from '../context'
import { Circle, Line, Group } from 'react-konva'
export default function LocationTarget ({ location, zoomInCallback }) {
  const { state, dispatch } = useContext(Context)
  const { scale, hovering } = state
  function handleMouseEnter (e) {
    const container = e.target.getStage().container()
    container.style.cursor = 'pointer'
    // You need this conditional or else it continously calls the dispatch and blocks the mouseLeave event.
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
    zoomInCallback(location)
    handleMouseLeave(e)
  }
  return (
    <Group
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      // onMouseUp={(location) => handleZoomToLocation(location)}
      >
      <Circle
        x={location.x * scale}
        y={location.y * scale}
        width={hovering === location.name ? 40 * scale : 30 * scale}
        height={hovering === location.name ? 40 * scale : 30 * scale}
        shadowBlur={hovering === location.name ? 10 : 0}
        shadowColor='lightblue'
        fill={hovering === location.name ? 'lightblue' : 'white'}/>
      <Circle x={location.x * scale} y={location.y * scale} width={135 * scale} height={135 * scale} stroke='white' strokeWidth={1}/>
      <Circle x={location.x * scale} y={location.y * scale}
        width={160 * scale}
        height={160 * scale}
        stroke='white'
        strokeWidth={3}
        shadowBlur={6}
        shadowColor='white'
        />
      <Circle x={location.x * scale} y={location.y * scale} width={160 * scale} height={160 * scale} fill='rgba(233, 233, 233, 0.4'/>
      {hovering === location.name && (
        <>
          <Line
            points={[0, location.y * scale, 2000, location.y * scale]}
            stroke='white'
            strokeWidth={1}
            dash = {[3, 3]}/>
          <Line
            points={[location.x * scale, 0, location.x * scale, 2000]}
            stroke='white'
            strokeWidth={1}
            dash = {[3, 3]}/>
          <Circle x={location.x * scale} y={location.y * scale} width={300 * scale} height={300 * scale} stroke='white' strokeWidth={2}/>
          <Circle x={location.x * scale} y={location.y * scale} width={280 * scale} height={280 * scale} stroke='white' strokeWidth={1}/>
        </>
      )}
    </Group>
  )
}
