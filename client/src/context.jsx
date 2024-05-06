/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  hovering: null,
  clicked: null,
  scale: 1
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOVERING':
      return { ...state, hovering: action.payload }
    case 'SET_CLICKED':
      return { ...state, clicked: action.payload }
    case 'SET_SCALE':
      return { ...state, scale: action.payload }
    default:
      return state
  }
}

export const Context = createContext()
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}
