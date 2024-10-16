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
  // Calculate the number of ticks
  const tickMarks = [];
  for (let i = min; i <= max; i += step) {
    tickMarks.push(i);
  }

  return (
    <div className="flex flex-col items-start justify-center w-full">
      <label className={styles.label}>{label}</label>
      <div className='relative w-full'>
        {/* Container for the slider */}
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
          style={{ width: '100%' }} // Make the slider take full width
        />
        <output className={styles.output} style={{ position: 'absolute', right: '0', top: '-8px' }}>
          {`${value}/${max}`}
        </output>
        {/* Container for ticks */}
        <div className="absolute flex justify-between w-full" style={{ top: '-10px' }}>
          {tickMarks.map((tick, index) => {
            // Calculate position based on index and total ticks
            const leftPosition = `${(index / (tickMarks.length - 1)) * 100}%`;
            return (
              <span
                key={tick}
                className={styles.tick}
                style={{ left: leftPosition, transform: 'translateX(-50%)' }} // Center the tick
              ></span>
            );
          })}
        </div>
      </div>
      {/* Container for labels below the slider */}
      <div className="flex justify-between w-full mt-1.5">
        <span className={styles['text-xxs']}>{min}</span> {/* Label for minimum */}
        <span className={styles['text-xxs']}>{max}</span> {/* Label for maximum */}
      </div>
    </div>
  );
}
