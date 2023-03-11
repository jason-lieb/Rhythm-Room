require('dotenv').config()

const router = require('express').Router()

router.post('/login', async (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '538c7cde1253426896361ee2d3a79d9f',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  })

  try {
    const auth = await spotifyApi.authorizationCodeGrant(code)
    res.json({
      accessToken: auth.body.access_token,
      refreshToken: auth.body.refresh_token,
      expiresIn: auth.body.expires_in,
    })
  } catch (err) {
    console.error(err)
  }
})

router.post('/refresh', async (req, res) => {
  const code = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000',
    clientId: '538c7cde1253426896361ee2d3a79d9f',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    refreshToken,
  })

  try {
    const auth = await spotifyApi.refreshAccessToken()
    res.json({
      accessToken: auth.body.access_token,
      expiresIn: auth.body.expires_in,
    })
  } catch (err) {
    console.error(err)
  }
})

module.exports = router
