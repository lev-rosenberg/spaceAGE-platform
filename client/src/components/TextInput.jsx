/* eslint-disable react/prop-types */
import React from 'react'

// Remove the duplicate import statement for React
// import React from 'react';

// Your code goes here

export function TextInput ({
  children,
  className = '',
  primary = true,
  value = '',
  handleChange = null,
  id = '',
  name = '',
  required = false,
  autoFocus = false,
  placeholder = '',
  area = false
}) {
  if (area) {
    return (
      <textarea
        id={id}
        name={name}
        autoComplete="off"
        required={required}
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        className={`leading-4 ${primary ? 'prim' : 'sec'} ${className}`}
        placeholder={placeholder}
      >
        {children}
      </textarea>
    )
  } else {
    return (
      <input
        id={id}
        name={name}
        type="text"
        autoComplete="off"
        required={required}
        autoFocus={autoFocus}
        value={value}
        onChange={handleChange}
        className={`${primary ? 'prim' : 'sec'} ${className}`}
        placeholder={placeholder}
      >
        {children}
      </input>
    )
  }
}
