import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useSpotifyApi } from '../utils/SpotifyApiContext'

export default function Player({ songUri }) {
  const [spotifyApi] = useSpotifyApi()
  const [play, setPlay] = useState(false)
  useEffect(() => {
    setPlay(true)
  }, [songUri])

  if (!spotifyApi.getAccessToken()) return null
  return (
    <SpotifyPlayer
      token={spotifyApi.getAccessToken()}
      play={play}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false)
      }}
      uris={songUri ? [songUri] : []}
    />
  )
}
