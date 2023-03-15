import { useNavigate } from 'react-router-dom'
import { useSpotifyApi } from '../utils/SpotifyApiContext'
import Auth from '../utils/auth'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import LoginSpotify from './LoginSpotify'

const css = `
  .navbar {
    background-color: #595381;
  }
`

export default function Nav() {
  const [spotifyApi] = useSpotifyApi()
  const navigate = useNavigate()

  const handleLoginButtonClick = () => {
    navigate('/login')
  }

  const handleLogoutButtonClick = () => {
    Auth.logout()
  }

  const handleDiscover = () => {
    navigate('/')
  }

  const handleProfile = () => {
    navigate(`/profile/${Auth.getProfile().data._id}`)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <style type="text/css">{css}</style>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rhythm Room
          </Typography>

          {/* Render discover button if not on the discover page */}
          {window.location.pathname !== '/' && (
            <Button color="inherit" onClick={handleDiscover}>
              Discover
            </Button>
          )}

          {/* Render connected to spotify statement if connected to spotify*/}
          {spotifyApi.getAccessToken() && Auth.loggedIn() && (
            <Button style={{ color: 'white' }} disabled>
              Connected to Spotify
            </Button>
          )}

          {/* Render login spotify button if already logged in but not logged into spotify */}
          {!spotifyApi.getAccessToken() && Auth.loggedIn() && <LoginSpotify />}

          {/* Render username button and logout button if logged in */}
          {Auth.loggedIn() && (
            <>
              <Button color="inherit" onClick={handleProfile}>
                {Auth.getProfile().data.username}
              </Button>
              <Button color="inherit" onClick={handleLogoutButtonClick}>
                Logout
              </Button>
            </>
          )}

          {/* Render login button if not on the login page and not already logged in */}
          {window.location.pathname.split('/')[1] !== 'login' &&
            !Auth.loggedIn() && (
              <Button color="inherit" onClick={handleLoginButtonClick}>
                Login
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
