/* eslint-disable react/prop-types */
import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import RankingItem from './RankingItem'

export default function SortableRankingItem ({ id, rank, ...props }) {
  /*
    I'm honestly not sure why we need this wrapper component, around the RankingItem, but I just followed * tweaked examples from the dnd-kit docs.
  */
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform) ?? '',
    transition: transition ?? ''
  }
  return (
    <RankingItem
      id={id}
      rank={rank}
      ref={setNodeRef}
      isDragging={isDragging}
      style={style}
      {...listeners}
      {...attributes}
      {...props}
    />
  )
};
