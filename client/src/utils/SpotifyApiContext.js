import React, { createContext, useContext, useState } from 'react'
import Spotify from 'spotify-web-api-js'

export const SpotifyApiContext = createContext()
export const useSpotifyApi = () => useContext(SpotifyApiContext)

export default function ThemeProvider(props) {
  const [spotifyApi, setSpotifyApi] = useState(new Spotify())

  return (
    <SpotifyApiContext.Provider
      value={{ spotifyApi, setSpotifyApi }}
      {...props}
    />
  )
}
