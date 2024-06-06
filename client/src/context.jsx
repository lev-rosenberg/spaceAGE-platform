/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  hovering: null,
  clicked: null,
  scale: 1,
  locationCoords: [
    { name: 'Diacria', x: 350, y: 300 },
    { name: 'Casius', x: 2600, y: 500 },
    { name: 'Argyre', x: 1330, y: 1190 },
    { name: 'Eridania', x: 3150, y: 1140 }],
  localTextNotes: {
    Argyre: '',
    Casius: '',
    Diacria: '',
    Eridania: ''
  },
  localSliderNotes: {}
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_HOVERING':
      return { ...state, hovering: action.payload }
    case 'SET_CLICKED':
      return { ...state, clicked: action.payload }
    case 'SET_SCALE':
      return { ...state, scale: action.payload }
    case 'SET_LOCATION_TEXT_NOTES':
      return { ...state, localTextNotes: action.payload }
    case 'SET_LOCATION_SLIDER_NOTES':
      return { ...state, localSliderNotes: action.payload }
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
