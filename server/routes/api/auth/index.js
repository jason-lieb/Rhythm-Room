const router = require('express').Router()
const axios = require('axios')

require('dotenv').config()

let SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
let SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
// let spotify_redirect_uri = 'http://localhost:5500/api/auth/login'

router.post('/login', (req, res) => {
  const code = new URLSearchParams(window.location.search).get('code')
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: 'http://localhost:5500/api/auth/login',
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
          'base64'
        ),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    json: true,
  }
  axios.post(authOptions, (err, res, body) => {
    console.log(err)
    console.log(res)
    console.log(body)
    // if (!error && response.statusCode === 200) {
    //   var access_token = body.access_token;
    //   res.redirect('/')
    // }
  })
  // const code = req.body.code
  // const spotifyApi = new SpotifyWebApi({
  //   redirectUri: 'http://localhost:3000',
  //   clientId: SPOTIFY_CLIENT_ID,
  //   clientSecret: SPOTIFY_CLIENT_SECRET,
  // })
  // try {
  //   const auth = await spotifyApi.authorizationCodeGrant(code)
  //   res.json({
  //     accessToken: auth.body.access_token,
  //     refreshToken: auth.body.refresh_token,
  //     expiresIn: auth.body.expires_in,
  //   })
  // } catch (err) {
  //   // console.error(err)
  // }
})

router.post('/refresh', async (req, res) => {
  // const code = req.body.refreshToken
  // const spotifyApi = new SpotifyWebApi({
  //   redirectUri: 'http://localhost:3000',
  //   clientId: '538c7cde1253426896361ee2d3a79d9f',
  //   clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  //   refreshToken,
  // })
  // try {
  //   const auth = await spotifyApi.refreshAccessToken()
  //   res.json({
  //     accessToken: auth.body.access_token,
  //     expiresIn: auth.body.expires_in,
  //   })
  // } catch (err) {
  //   // console.error(err)
  // }
})

module.exports = router
