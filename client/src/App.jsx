// importing in stylings, router routes, and the components
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { useSpotifyApi } from './utils/SpotifyApiContext'
import useSpotifyAuth from './utils/useSpotifyAuth'
import Spotify from 'spotify-web-api-js'

import Discover from './components/pages/Discover'
import Profile from './components/pages/Profile'
import Playlist from './components/pages/Playlist'
import Login from './components/pages/Login'
import Footer from './components/Footer'

const client = new ApolloClient({
  uri: 'http://localhost:5500/graphql',
  cache: new InMemoryCache(),
})

function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  let accessToken = useSpotifyAuth(code)
  const [, setSpotifyApi] = useSpotifyApi()

  useEffect(() => {
    if (!accessToken) return
    const newSpotifyState = new Spotify()
    newSpotifyState.setAccessToken(accessToken)
    setSpotifyApi(newSpotifyState)
  }, [accessToken, setSpotifyApi])

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/Playlist/:playlistId"
            element={<Playlist accessToken={accessToken} />}
          />
          <Route path= "/Profile"
          element={<Profile/>}
          />
        </Routes>
      </Router>
      <Footer />
    </ApolloProvider>
  )
}

export default App
