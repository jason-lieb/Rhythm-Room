import React, { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useSpotifyApi } from '../utils/SpotifyApiContext'

export default function Player(songUri) {
  const [spotifyApi] = useSpotifyApi()
  useEffect(() => setPlay(true), [songUri])
  const [play, setPlay] = useState(false)

  if (!spotifyApi.getAccessToken()) return null
  return (
    <SpotifyPlayer
      token={spotifyApi.getAccessToken()}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={['spotify:track:3jHBgKdLCf46aP3HRI0WYv']}
    />
  )
}
