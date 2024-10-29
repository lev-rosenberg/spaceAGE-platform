import React from 'react';
import { SliderInput } from '../components/SliderInput'

export function Likert({
  labelClassName,
  partnerId,
  partnerName,
  usefulness,
  handleUsefulnessChange
}) {
  return (
    <div className="w-100">
      <label className={`${labelClassName} block w-full`}>
        To what extent do you enjoy working with <strong>{partnerName}</strong>?
      </label>
      <SliderInput
              id={`confidenceSlider-${partnerId}`} // unique id for slider
              handleChange={(e) => handleUsefulnessChange(e.target.value)}
              value={usefulness}
              min={0}
              max={5}
              dark
            />
      <div className="flex justify-between mt-2">
        <span className="text-xs">Not at all</span>
        <span className="text-xs">A great extent</span>
        </div>
      </div>
  );
}
      
