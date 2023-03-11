// impoting in stylings, router routes, and the components
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Discover from './components/pages/Discover'
import Profile from './components/pages/Profile'
import Playlist from './components/pages/Playlist'
import Login from './components/pages/Login'
import useSpotifyAuth from './utils/useSpotifyAuth'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
})

// rendering the entire app
function App() {
  const code = new URLSearchParams(window.location.search).get('code')
  let accessToken = useSpotifyAuth(code)

  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Discover accessToken={accessToken} />} />
          <Route
            path="/profile/:profileId"
            element={<Profile accessToken={accessToken} />}
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/Playlist/:playlistId"
            element={<Playlist accessToken={accessToken} />}
          />
        </Routes>
      </Router>
    </ApolloProvider>
  )
}

export default App
