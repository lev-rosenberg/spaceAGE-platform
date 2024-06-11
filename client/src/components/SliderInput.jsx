/* eslint-disable react/prop-types */
import React from 'react'
import styles from '../styles/slider.module.css'

export function SliderInput ({
  handleChange,
  label,
  value,
  dark = false,
  disabled = false,
  id = 'slider',
  step = 0.1,
  min = 0,
  max = 10
}) {
  return (
    <div className="flex flex-col items-start justify-center">
      <label className={styles.label}>{label}</label>
      <div className='flex w-full h-full'>
        <input
          id={id}
          style={{ width: '100%' }}
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
        <style>
          {dark && `
            #confidenceSlider::-webkit-slider-thumb {
              background-color: #001dc2;
            }
          `}
        </style>
        <output className='text-sm'>{Math.floor(value)}/{max}</output>
      </div>

    </div>
  )
}
