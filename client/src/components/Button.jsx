/* eslint-disable react/prop-types */
import React from 'react'

// Remove the duplicate import statement for React
// import React from 'react';

// Your code goes here

export function Button ({
  children,
  handleClick = null,
  className = '',
  primary = true,
  type = 'button',
  autoFocus = false,
  id = null,
  active = false,
  disabled = false
}) {
  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${primary ? 'prim' : 'sec'} ${className} ${disabled ? 'btn-disabled' : ''}`}
      autoFocus={autoFocus}
      disabled={disabled}

    >
      {children}
    </button>
  )
}
