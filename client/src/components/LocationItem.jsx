/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import styles from '../styles/ranking.module.css'

const LocationItem = forwardRef(({ id, rank, isDragging, isDragOverlay, style, listeners, ...props }, ref) => {
  const containerStyles = {
    ...style,
    zIndex: isDragging ? 1 : 0,
    cursor: isDragOverlay ? 'grabbing' : 'grab',
    opacity: isDragOverlay ? '0' : '1'
  }

  const contentStyles = {
    // backgroundColor: isDragging ? 'rgba(35, 127, 225, 0.7)' : '',
    // borderTop: isDragging ? '1px solid rgb(35, 127, 225)' : '',
    // borderBottom: isDragging ? '1px solid rgb(35, 127, 225)' : '',
    // borderRight: isDragging ? '1px solid rgb(35, 127, 225)' : ''

  }

  const handleStyles = {
    // backgroundColor: isDragging ? 'rgb(25, 127, 225)' : '',
    // borderTop: isDragging ? '1px solid rgb(35, 127, 225)' : '',
    // borderBottom: isDragging ? '1px solid rgb(35, 127, 225)' : '',
    // borderLeft: isDragging ? '1px solid rgb(35, 127, 225)' : ''
  }

  return (
    <li className={styles.bwSection} ref={ref} style={containerStyles} {...props}>
      <div className='flex gap-2'>
        <div className={styles.rankNumber} style={!rank ? { backgroundColor: 'gold' } : null}>
          <span>{rank + 1}</span>
        </div>
        <div className="sortable-content" style={contentStyles}>
          {id}
        </div>
      </div>
      <div className={styles.sortHandle} {...listeners} style={handleStyles}>
        <svg viewBox="0 0 20 20" width="12">
          <path
            d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"
            fill = '#237fe1'
          />
        </svg>
      </div>
    </li>
  )
}
)

LocationItem.displayName = 'LocationItem'

export default LocationItem
