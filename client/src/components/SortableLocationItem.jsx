/* eslint-disable react/prop-types */
import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import LocationItem from './LocationItem'

export default function SortableLocationItem ({ id, rank, ...props }) {
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
    <LocationItem
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
