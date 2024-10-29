/* eslint-disable react/prop-types */
import React from 'react'

export function Avatar ({ player, size = '100%' }) {
  return (
    <img
        className="h-full w-full rounded-md shadow bg-white p-1"
        src={`https://api.dicebear.com/7.x/identicon/svg?seed=${player.id}.svg`}
        alt="Avatar"
        style={{ width: size, height: size }}
    />
  )
}
