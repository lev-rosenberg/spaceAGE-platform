/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

/*
  Description:
  - This file contains the context for the study. It is used to store the local state of the study, 
    such as the the text notes that players take on each location. This is seperate from data stored
    on the emprica server. I use both because updating the server causes a re-render, which I often don't want.
*/

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
