/* eslint-disable react/prop-types */
import React from 'react'

const base =
  'bg-dark-grey outline-none p-2 border border-primary-white box-border text-xs"'
const prim =
  ''
const sec =
  ''

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
      className={`${base} ${primary ? prim : sec} ${className}`}
      placeholder = {placeholder}
    >
      {children}
    </input>
  )
}
