/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react'
import styles from '../../styles/ranking.module.css'

const RankingItem = forwardRef(({ id, rank, isDragging, style, listeners, ...props }, ref) => {
  /*
    Parameters:
    - id (string): the id of the item, which is also the name of the location
    - rank (number): the ranking of the item (0-indexed)
    - isDragging (boolean): whether the item is being dragged
    - style (object): the style object for the item
    - listeners (object): honestly not sure what this is, but it's created in the useSortable hook
    - props (object): the rest of the props
    Returns:
    - RankingItem component for the Ranking Task
    Description:
    - This component is responsible for rendering the items in the ranking task, ie the locations players are ranking.
    - It displays the location name and the rank of the location.
  */
  const containerStyles = {
    ...style,
    zIndex: isDragging ? 1 : 0,
  }
  
  return (
    <li className={styles.bwSection} ref={ref} style={containerStyles} {...props}>
      <div className='flex gap-2'>
        <div className={styles.rankNumber} style={!rank ? { backgroundColor: 'gold' } : null}>
          <span>{rank + 1}</span>
        </div>
        <div className="sortable-content">
          {id}
        </div>
      </div>
      <div className={styles.sortHandle} {...listeners}>
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

RankingItem.displayName = 'RankingItem'

export default RankingItem
