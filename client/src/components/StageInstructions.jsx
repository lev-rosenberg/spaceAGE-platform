import React from 'react'
import { Button } from './Button'
import { useStage } from '@empirica/core/player/classic/react'

export function StageInstructions () {
  const stage = useStage()
  const currentStage = stage.get('name') !== 'intervention' ? stage.get('name') : stage.get('placement')

  const CurrentStageInstructions = () => {
    switch (stage.get('name')) {
      case 'Instructions':
        return 'Please read the following instructions on how to take part in this research study'
      case 'Role Exploration':
        return 'In this step, you will explore the locations Argyre, Casius, Diacria and Eridania. Take notes on the provided information to determine which location is the best site to land.'
      case 'Individual Ranking' || stage.get('placement') === 'Individual Ranking':
        return 'Based on the information you\'ve been given about Argyre, Casius, Diacria, Eridania, please rank the locations on which should be the landing site for the mission.'
      case 'Team Ranking' || stage.get('placement') === 'Team Ranking':
        return 'Now that you\'ve ranked the locations individually, discuss with your team and come to a mutual consensus on the best location to land.'
      case 'Multi-Team Ranking' || stage.get('placement') === 'Multi-Team Ranking':
        return 'Now that you\'ve come to a consensus with your team, work across the multi team system to rank the locations once more.'
    }
  }
  return (
    <div className='flex flex-col gap-2 mb-3'>
      <Button primary>Instructions</Button>
      <h1>{currentStage}</h1>
      <p>
        <CurrentStageInstructions />
      </p>
    </div>
  )
}
