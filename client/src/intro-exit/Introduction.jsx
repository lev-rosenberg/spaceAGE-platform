/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from '../components/Button'

export function Introduction ({ next }) {
  return (
    <div className="mt-3 sm:mt-5 p-20">
      <h3 className="text-lg leading-6 font-medium">
        Instruction One
      </h3>
      <div className="mt-2 mb-6">
        <p className="text-sm">
          Introduction stage is not yet implemented. Click next to proceed.
        </p>
      </div>
      <Button handleClick={next} autoFocus>
        Next
      </Button>
    </div>
  )
}
