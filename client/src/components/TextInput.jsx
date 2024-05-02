/* eslint-disable react/prop-types */
import React from 'react'

// Remove the duplicate import statement for React
// import React from 'react';

// Your code goes here

export function TextInput ({
  children,
  className = '',
  primary = false,
  value = '',
  handleChange = null,
  id = '',
  name = '',
  required = false,
  autoFocus = false,
  placeholder = ''
}) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      autoComplete="off"
      required = {required}
      autoFocus = {autoFocus}
      value={value}
      onChange={handleChange}
      className={`${primary ? 'prim' : 'sec'} ${className}`}
      placeholder = {placeholder}
    >
      {children}
    </input>
  )
}
