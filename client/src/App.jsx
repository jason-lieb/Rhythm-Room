// importing in stylings, router routes, and the components
import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useSpotifyApi } from './utils/SpotifyApiContext'
import useSpotifyAuth from './utils/useSpotifyAuth'
import Spotify from 'spotify-web-api-js'

import Nav from './components/Nav'
import Discover from './components/pages/Discover'
import Profile from './components/pages/Profile'
import Playlist from './components/pages/Playlist'
import Login from './components/pages/Login'
import Footer from './components/Footer'

import LoginProvider from './utils/LoginContext'

import CreatePlaylistBTN from './components/CreatePlaylistBTN'

const httpLink = createHttpLink({
  uri: 'graphql',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
      <LoginProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/Playlist/:playlistId"
              element={<Playlist accessToken={accessToken} />}
            />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
          <CreatePlaylistBTN />
        </Router>
        <Footer />
      </LoginProvider>
    </ApolloProvider>
  )
}

export default App
