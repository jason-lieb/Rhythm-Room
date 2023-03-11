// impoting in stylings, router routes, and the components
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Discover from './components/pages/Discover'
import Profile from './components/pages/Profile'
import Playlist from './components/pages/Playlist'
import Login from './components/pages/Login'

// const code = new URLSearchParams(window.location.search).get('code')

// rendering the entire app
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Discover />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Playlist/:playlistId" element={<Playlist />} />
      </Routes>
    </Router>
  )
}

export default App
