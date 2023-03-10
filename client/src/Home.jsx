import { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import useSpotifyAuth from './utils/useSpotifyAuth'

const spotifyApi = new SpotifyWebApi({
  clientId: '538c7cde1253426896361ee2d3a79d9f',
})

export default function Home({ code }) {
  const accessToken = useSpotifyAuth(code)
  useEffect(() => {
    if (!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])
  return (
    <>
      <div>Home</div>
      <div style={{ background: 'red' }}>{code}</div>
      <div style={{ background: 'green' }}>{accessToken}</div>
    </>
  )
}
