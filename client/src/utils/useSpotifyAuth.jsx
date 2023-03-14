import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useSpotifyAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  let authURL
  let refreshURL
  switch (process.env.HEROKU_ENV) {
    case 'production':
      authURL = 'http://rhythm-room.herokuapp.com/api/auth/login/'
      refreshURL = 'http://rhythm-room.herokuapp.com/api/auth/refresh/'
      break
    default:
      authURL = 'http://localhost:5500/api/auth/login/'
      refreshURL = 'http://localhost:5500/api/auth/refresh/'
      break
  }

  useEffect(() => {
    if (!code) return
    axios
      .post(authURL, { code })
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
  }, [authURL, code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios
        .post(refreshURL, { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })
        .catch(() => {
          window.location = '/'
        })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn, refreshURL])
  return accessToken
}
