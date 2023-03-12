import React, { createContext, useContext, useState } from 'react'
import Spotify from 'spotify-web-api-js'

const SpotifyApiContext = createContext()
export const useSpotifyApi = () => useContext(SpotifyApiContext)

export function SpotifyApiContextProvider(props) {
  return (
    <SpotifyApiContext.Provider value={useState(new Spotify())} {...props} />
  )
}
