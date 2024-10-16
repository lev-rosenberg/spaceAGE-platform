import React, { useState } from 'react'
import { Button } from './Button'
import { useStage } from '@empirica/core/player/classic/react'
import styles from '../styles/instructions.module.css';

export function StageInstructions() {
  /*
    Description: This component is responsible for rendering the instructions for the current stage of the game.
    TODO: make the instructions button functional
  */
  const stage = useStage();
  const currentStage = stage.get('name') !== 'intervention' ? stage.get('name') : stage.get('placement');
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  }

  const CurrentStageInstructions = () => {
    switch (stage.get('name')) {
      case 'Instructions':
        return 'Please read the following instructions on how to take part in this research study';
      case 'Role Exploration':
        return 'In this step, you will explore the locations Argyre, Casius, Diacria and Eridania. Take notes on the provided information to determine which location is the best site to land.';
      case 'Individual Ranking':
      case stage.get('placement') === 'Individual Ranking':
        return 'Based on the information you\'ve been given about Argyre, Casius, Diacria, Eridania, please rank the locations on which should be the landing site for the mission.';
      case 'Team Ranking':
      case stage.get('placement') === 'Team Ranking':
        return 'Now that you\'ve ranked the locations individually, discuss with your team and come to a mutual consensus on the best location to land.';
      case 'Multi-Team Ranking':
      case stage.get('placement') === 'Multi-Team Ranking':
        return 'Now that you\'ve come to a consensus with your team, work across the multi team system to rank the locations once more.';
      case 'intervention':
        return 'An AI team member has joined the chat. Based on the AI analysis, review the suggested rankings and adjust them if necessary.';
      default:
        return 'Please follow the instructions for the current stage.';
    }
  };

  // New instructions for each stage's instruction button
  const getStageInstructions = () => {
    switch (stage.get('name')) {
      //case 'Instructions':
        //return 'Please read the following instructions on how to take part in this research study';
      case 'Role Exploration':
        return 'Additional role exploration instructions will be inputted here';
      case 'Individual Ranking':
      case stage.get('placement') === 'Individual Ranking':
        return 'Individual ranking instructions.';
      case 'Team Ranking':
      case stage.get('placement') === 'Team Ranking':
        return 'Team ranking instructions.';
      case 'Multi-Team Ranking':
      case stage.get('placement') === 'Multi-Team Ranking':
        return 'Multi-Team Ranking instructions.';
      case 'intervention':
        return 'Intervention instructions.';
      default:
        return 'Default instructions.';
    }
  };
//   return (
//     <div className='flex flex-col gap-2 mb-3'>
//       <Button
//         primary
//         handleClick={toggleInstructions}
//         className="bg-black text-white py-1 px-2 text-sm"
//       >
//         {showInstructions ? 'Additional Instructions' : 'Additional Instructions'}
//       </Button>
//       <h1>{currentStage === 'intervention' ? 'AI Intervention Stage' : currentStage}</h1>
//       <p>
//         <CurrentStageInstructions />
//       </p>
//       {showInstructions && (
//         <div className={`${styles.modalOverlay} fixed inset-0 flex items-center justify-center`}>
//           <div className={`${styles.modalContent} bg-black text-white py-4 px-6 text-sm rounded-md shadow-lg`}> onClick={toggleInstructions}>
//           <button className="absolute top-2 right-2 text-white" onClick={toggleInstructions}>
//               &times;
//             </button>
//             <div className="modalBody">
//               <h2>Instructions for {currentStage}</h2>
//               <p>{getStageInstructions()}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

  return (
    <div className='flex flex-col gap-2 mb-3'>
      <Button primary={true} handleClick={toggleInstructions} className="py-1 px-2 text-sm"> 
      {showInstructions ? 'Instructions' : 'Instructions'}
      </Button>
      <h1>{currentStage === 'intervention' ? 'AI Intervention Stage' : currentStage}</h1>
      <p>
        <CurrentStageInstructions />
      </p>
      {showInstructions && (
        <div className="py-1 px-2 text-sm">
        <p>{getStageInstructions()}</p>
    </div>
  )}
  </div>
  )
      }
