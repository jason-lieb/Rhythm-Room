import { useEffect, useState } from 'react'
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node'

export default function useSpotifyAuth(code) {
  const spotifyApi = new SpotifyWebApi({
    clientId: '538c7cde1253426896361ee2d3a79d9f',
  })

  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    axios
      .post('http://localhost:5500/api/auth/login', { code })
      .then((res) => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, '/')
      })
      .catch((err) => {
        console.error(err)
        window.location = '/'
      })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post('http://localhost:5500/api/auth/refresh', { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location = '/'
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  return { accessToken, spotifyApi }
}
