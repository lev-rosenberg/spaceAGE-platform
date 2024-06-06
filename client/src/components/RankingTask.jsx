import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
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
  restrictToWindowEdges
} from '@dnd-kit/modifiers'
import SortableLocationItem from './SortableLocationItem'
import LocationItem from './LocationItem'
import styles from '../styles/ranking.module.css'
export function RankingTask () {
  const [locationRankings, setLocationRankings] = useState(['Casius', 'Argyre', 'Diacria', 'Eridania'])
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor))

  function handleDragStart (event) {
    setActiveId(event.active.id)
  }
  function handleDragEnd (event) {
    const { active, over } = event
    if (active.id !== over?.id) {
      const oldIndex = locationRankings.indexOf(active.id)
      const newIndex = locationRankings.indexOf(over.id)
      const newItems = arrayMove(locationRankings, oldIndex, newIndex)
      setLocationRankings(newItems)
      // stage.set('ranked', newItems)
    }
    setActiveId(null)
  };
  return (
    <div className={styles.ranking}>
      <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={locationRankings} strategy={verticalListSortingStrategy}>
        <ol className="flex flex-col gap-0.75">
          {locationRankings.map((location, i) => (
              <SortableLocationItem key={location} rank={i} id={location}/>
          ))}
        </ol>
      </SortableContext>
      <DragOverlay modifiers={[restrictToWindowEdges]}>
        {activeId
          ? (
          <LocationItem id={activeId} isDragOverlay />
            )
          : null}
      </DragOverlay>
    </DndContext>
  </div>
  )
}
