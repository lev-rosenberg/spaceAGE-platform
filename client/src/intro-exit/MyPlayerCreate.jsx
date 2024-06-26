/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import styles from '../styles/login.module.css'
import { TextInput } from '../components/TextInput'

export function MyPlayerForm ({ onPlayerID, connecting }) {
  /* 
    Parameters: unsure, this is from the Empirica boilerplate
    Returns:
    - MyPlayerForm component for the login screen
    Description:
    - This component is responsible for rendering the login screen for the player.
    - It asks the player to enter their name and identifier. 
    - We store their name in local storage based with the key `name-${playerID}`. We do this so that we can display their name in the game.
  */

  // For the text input field.
  const [playerName, setPlayerName] = useState('')
  const [playerID, setPlayerID] = useState('')

  // Handling the player submitting their ID.
  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!playerID || playerID.trim() === '' || !playerName || playerName.trim() === '') {
      return
    }
    onPlayerID(playerID)
    localStorage.setItem(`name-${playerID}`, playerName)
  }

  return (
    <div className={styles.loginContainer}>
      <h1>Welcome</h1>
      <p>Please enter your information</p>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <fieldset disabled={connecting} >
            <section className={styles.loginForm}>
              <div className='flex flex-col gap-0.5'>
                <label htmlFor="playerName">Name</label>
                <TextInput
                  id = "playerName"
                  name = "playerName"
                  primary
                  required
                  value={playerName}
                  handleChange={(e) => setPlayerName(e.target.value)}
                  autoFocus
                  placeholder="Ex. Sophia"
                />
              </div>
              <div className='flex flex-col gap-0.5'>
                <label htmlFor="playerID">Identifier</label>
                <TextInput
                  id = "playerID"
                  name = "playerID"
                  primary
                  required
                  value={playerID}
                  handleChange={(e) => setPlayerID(e.target.value)}
                  placeholder="This should be given to you. e.g. email, code..."
                />
              </div>
              <button type="submit">Enter</button>
              </section>
          </fieldset>
        </form>
    </div>
  )
}
