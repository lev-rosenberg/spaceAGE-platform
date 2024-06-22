import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import { usePlayer, useRound, useStage } from '@empirica/core/player/classic/react'
import SortableRankingItem from './SortableRankingItem'
import styles from '../../styles/ranking.module.css'

export function RankingTask () {
  /*
    Description: 
    - This parent component is responsible for rendering the ranking task. It uses the dnd-kit library to enable drag-and-drop functionality.
    - It is based on these examples: https://codesandbox.io/examples/package/@dnd-kit/sortable
  */
  const player = usePlayer()
  const stage = useStage()
  const round = useRound()
  const currStageName = stage.get('name') !== 'intervention' ? stage.get('name') : stage.get('placement')
  const stageLocationRankings = currStageName === 'Individual Ranking' ? player.get('individual-ranking') : currStageName === 'Team Ranking' ? round.get(`${player.get('team')}-ranking`) : round.get('mts-ranking')
  const [locationRankings, setLocationRankings] = useState(stageLocationRankings)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  function handleDragEnd (event) {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = locationRankings.indexOf(active.id)
      const newIndex = locationRankings.indexOf(over.id)
      const newItems = arrayMove(locationRankings, oldIndex, newIndex)
      setLocationRankings(newItems)
      if (currStageName === 'Individual Ranking') {
        player.set('individual-ranking', newItems)
      } else if (currStageName === 'Team Ranking') {
        round.set(`${player.get('team')}-ranking`, newItems)
      } else if (currStageName === 'Multi-Team Ranking') {
        console.log('mts-ranking', newItems)
        round.set('mts-ranking', newItems)
      }
    }
  };
  return (
    <div className={styles.ranking}>
      <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={locationRankings} strategy={verticalListSortingStrategy}>
        <ol className="flex flex-col gap-0.75">
          {stageLocationRankings.map((location, i) => (
              <SortableRankingItem key={location} rank={i} id={location}/>
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  </div>
  )
}
