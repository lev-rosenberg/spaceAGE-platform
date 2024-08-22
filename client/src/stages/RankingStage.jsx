import React, { useState } from 'react'
import { useStage, useGame, usePlayer, useRound } from '@empirica/core/player/classic/react'
import { Chat } from '../components/ranking-task/Chat'
import { RankingTask } from '../components/ranking-task/RankingTask'
import { Notes } from '../components/Notes'
import styles from '../styles/ranking.module.css'
import { TextInput } from '../components/TextInput'
import { SliderInput } from '../components/SliderInput'
import { Button } from '../components/Button'

export function RankingStage () {
  const game = useGame()
  const stage = useStage()
  const player = usePlayer()
  const round = useRound()
  const { playerCount, interventionPlacement } = game.get('treatment')
  // determine the current stage name, considering 'intervention' and 'placement'
  const currStageName = stage.get('name') !== 'intervention' ? stage.get('name') : stage.get('placement')
  const [reasoning, setReasoning] = useState('')
  const [convidenceValue, setConfidenceValue] = useState(4)
  const [finishedStep, setFinishedStep] = useState(1)

  function handleContinue () {
    if (finishedStep === 1) {
      setFinishedStep(2)
    } else if (finishedStep === 2) {
      setFinishedStep(3)
    } else {
      if (currStageName === 'Individual Ranking') {
        player.set('individual-reasoning', reasoning)
        player.set('individual-confidence', convidenceValue)
      } else if (currStageName === 'Team Ranking') {
        round.set(`${player.get('team')}-reasoning`, reasoning)
        round.set(`${player.get('team')}-confidence`, convidenceValue)
      } else if (currStageName === 'Multi-Team Ranking') {
        round.set('mts-reasoning', reasoning)
        round.set('mts-confidence', convidenceValue)
        game.set('multiTeamRankingComplete', true) // Ensure proper placement of this line
      }

      // Move to the next stage
      if (currStageName === 'Individual Ranking') {
        // Move to Team Ranking
        game.set('nextStage', 'Team Ranking')
      } else if (currStageName === 'Team Ranking') {
        // Move to Multi-Team Ranking
        game.set('nextStage', 'Multi-Team Ranking')
      } else if (currStageName === 'Multi-Team Ranking') {
        // End the task or game
        game.set('taskComplete', true)
      }

      player.stage.set('submit', true)
    }
  }
  // Determine if AI should be included based on the current stage and intervention placement
  const includeAI = (currStageName === 'Individual Ranking' && interventionPlacement === 'individual') ||
                     (currStageName === 'Team Ranking' && interventionPlacement === 'team') ||
                     (currStageName === 'Multi-Team Ranking' && interventionPlacement === 'mts')


  return (
    <div className={`${styles.rankingStage}`}>
      <div className="h-full w-128">
        {playerCount > 1 && currStageName.includes('Team') && (
          <Chat
            scope = {stage}
            attribute="chat" // option: have attribute represent team id 
            currentStage={currStageName}
            includeAI={includeAI} // conditionally enable AI
          />
        )}
      </div>
      <div className='h-full'>
        <div className={styles.centerForm}>
          <>
            <div className={`${styles.bwSection} text-center`}>
              <h3>Where should the crew land on Mars? Click and drag to rank each location from 1 = best to 4 = worst.</h3>
            </div>
            <RankingTask />
          </>
          {finishedStep > 1 &&
            <TextInput
              className='w-full h-32'
              area
              placeholder='Explain your reasoning...'
              value={reasoning}
              handleChange={(e) => setReasoning(e.target.value)}
            />
          }
          {finishedStep > 2 &&
            <SliderInput
              id='confidenceSlider'
              handleChange={(e) => setConfidenceValue(e.target.value)}
              label='How confident are you in your ranking?'
              value={convidenceValue}
              min={0}
              max={7}
              dark
            />
          }
          <Button
            handleClick={handleContinue}
          >
            {finishedStep < 3 ? 'Continue' : 'Submit'}
          </Button>
        </div>
      </div>
      <div className="h-full w-128">
        <Notes handleReturnToFullSize={() => console.log('null')} />
      </div>
    </div>
  )
}
// TO DO: 
// Retrieve interventionPlacement value from server callbacks.js
// conditionally enable AI based on current stage and intervention placement