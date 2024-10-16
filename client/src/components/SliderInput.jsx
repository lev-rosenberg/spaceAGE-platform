import React from 'react';
import styles from '../styles/slider.module.css'; // Ensure you have relevant styles here

export function SliderInput({
  handleChange,
  label,
  value,
  dark = false,
  disabled = false,
  id = 'slider',
  step = 1, // Step is set to 1 for discrete values
  min = 0,
  max = 10
}) {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <label className={styles.label}>{label}</label>
      <div className='flex items-center w-full'>
        <input
          id={id}
          type="range"
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={`slider ${dark ? 'slider-dark' : 'slider-light'}`} // Conditional classes for styling
          style={{ flex: 1, marginRight: '10px' }} // Space between slider and output
        />
      </div>
      {/* Labels for minimum and maximum values */}
      <div className="flex justify-between w-full mt-3.5">
        <span className={styles['text-xxs']}>{min}</span> {/* Label for minimum */}
        <span className={styles['text-xxs']}>{max}</span> {/* Label for maximum */}
      </div>
    </div>
  );
}
