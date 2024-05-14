/* eslint-disable react/prop-types */
import React from 'react'

export function SliderInput ({
  handleChange,
  label,
  value,
  step = 1
}) {
  return (
    <div className="flex items-center">
      <label className="mr-2">{label}</label>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={0}
        max={100}
        step={step}
      />
    </div>
  )
}
