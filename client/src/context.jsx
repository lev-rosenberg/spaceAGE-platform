/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  hovering: null,
  clicked: null,
  scale: 1,
  locationCoords: [
    { name: 'Argyre', x: 1330, y: 1190 },
    { name: 'Casius', x: 2600, y: 500 },
    { name: 'Diacria', x: 350, y: 300 },
    { name: 'Eridania', x: 3150, y: 1140 }]
  // locationTextNotes: {
  //   Argyre: '',
  //   Casius: '',
  //   Diacria: '',
  //   Eridania: ''
  // },
  // locationSliderNotes: {}
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
      return { ...state, locationTextNotes: action.payload }
    case 'SET_LOCATION_SLIDER_NOTES':
      return { ...state, locationSliderNotes: action.payload }
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
