/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../styles/slider.module.css'

export function SliderInput ({
  handleChange,
  label,
  value,
  step = 1
}) {
  return (
    <div className="flex flex-col items-start justify-center">
      <label className={styles.label}>{label}</label>
      <div className='flex w-full h-full'>
        <input
          type="range"
          value={value}
          onChange={handleChange}
          min={0}
          max={10}
          step={0.1}
        />
        <output className='text-sm'>{Math.floor(value)}/10</output>
      </div>

    </div>
  )
}
