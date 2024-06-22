import React, { useContext } from "react"
import { Context } from '../../context'
import { usePlayer } from '@empirica/core/player/classic/react'
import styles from '../../styles/map.module.css'

export default function LocationInfo( {locationJsonData}) {
  /*
    Parameters:
      - locationJsonData (object): the information for each location in the study
    Returns:
      - LocationInfo component for the Role Exploration stage
    Description:
      - This component is responsible for rendering the location information section of the Role Exploration stage.
      - It displays the information for the location that the player has clicked on.
  */

  const { state } = useContext(Context)
  const { clicked } = state
  const player = usePlayer()
  return (
    clicked && locationJsonData.locations && (
      <div className={`${styles.bwSection} ${styles.locationInfo}`}>
        <h3>This is what you know about {clicked}:</h3>
        {locationJsonData.locations[clicked][player.get('role')].split('\n').map((line, i) => (
          <div key={i}>
            <br/>
            <p>{line}</p>
          </div>
        ))}
      </div>
    )
  )
}