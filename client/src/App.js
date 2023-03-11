// impoting in stylings, router routes, and the components
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Discover from './components/pages/Discover'
import Profile from './components/pages/Profile'
import Playlist from './components/pages/Playlist'
import Login from './components/pages/Login'
import Footer from './components/Footer'
// const code = new URLSearchParams(window.location.search).get('code')
const client = new ApolloClient({
  uri: 'http://localhost:5500/graphql',
  cache: new InMemoryCache(),
});
// rendering the entire app
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Playlist/:playlistId" element={<Playlist />} />
        </Routes>
        <div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  )
}

export default App
