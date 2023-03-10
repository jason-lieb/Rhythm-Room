// impoting in stylings, router routes, and the components
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Discover from './compontents/pages/Discover';
import Profile from './compontents/pages/Profile';
import Playlist from './compontents/pages/Playlist';
import Login from './compontents/pages/Login';

// rendering the entire app
function App() {
  return (
    <Router>
      <Routes>
        <Route
        path = '/'
        element = {<Discover/>}
        />
        <Route
        path = '/profile/:profileId'
        element = {<Profile/>}
        />
        <Route
        path = '/login'
        element = {<Login/>}
        />
        <Route
        path = '/Playlist/:playlistId'
        element = {<Playlist/>}
        />
      </Routes>
    </Router>
  )
}

export default App
