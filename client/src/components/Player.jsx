import { useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { useSpotifyApi } from '../utils/SpotifyApiContext'

export default function Player({ songUri }) {
  const [spotifyApi] = useSpotifyApi()
  const [play, setPlay] = useState(false)
  useEffect(() => setPlay(true), [songUri])

  if (!spotifyApi.getAccessToken()) return null
  return (
    <SpotifyPlayer
      token={spotifyApi.getAccessToken()}
      callback={(state) => {
        if (!state.isPlaying) setPlay(false)
      }}
      play={play}
      uris={songUri ? [songUri] : []}
    />
  )
}
