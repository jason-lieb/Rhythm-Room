import { useNavigate } from 'react-router-dom'
import { useSpotifyApi } from '../utils/SpotifyApiContext'
import Auth from '../utils/auth'
import { useState} from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';

import LoginSpotify from './LoginSpotify'
import { QUERY_SINGLE_SONG, QUERY_SONG_NAME } from '../utils/queries'
import SpotifyModal from './SpotifyModal'

const css = `
  .header {
    height: 4rem;
  }
  .navbar {
    background-color: #595381;
  }
  .search-bar {
    color: white;
  }
  .search-box {
    color: white;
  }
`

export default function Nav() {
  const [spotifyApi] = useSpotifyApi()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
  const handleSearch = (event) => {
    const { value } = event.target
    setSearchValue(value)
  }

    const [fetchedSong, setFetchedSong] = useState(null);
    const [ getSong, { loading, data }] = useLazyQuery(QUERY_SONG_NAME)

    if (loading) return <p>loading</p>

    if (data && data.name) {
      setFetchedSong(data.name)
      console.log(fetchedSong)
    }

  // const Search = () => {
  //   getSong()
  //   console.log(data)
  // }
  return (
    <Box className="header" sx={{ flexGrow: 1 }}>
      <style type="text/css">{css}</style>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rhythm Room
          </Typography>
          <Box
            className='search-box'
            component="form"
            onChange={handleSearch}
            onBlur={() => {
              getSong({ variables: { name: searchValue } })
              console.log(data)
            }
            }
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField className='search-bar' id="outlined-basic" label="Search" variant="outlined" />
          </Box>
          {/* Render discover button if not on the discover page */}
          {window.location.pathname !== '/' && (
            <Button
              className="navButton"
              color="inherit"
              onClick={handleDiscover}
            >
              Discover
            </Button>
          )}

          {/* Render connected to spotify statement if connected to spotify*/}
          {spotifyApi.getAccessToken() && Auth.loggedIn() && (
            <Button className="navButton" style={{ color: 'white' }} disabled>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 496 512"
                style={{ width: '1.5rem', marginRight: '0.5rem' }}
              >
                <path
                  fill="#1ed760"
                  d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                />
                <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
              </svg>
              Connected to Spotify
            </Button>
          )}

          {/* Render login spotify button if already logged in but not logged into spotify */}
          {!spotifyApi.getAccessToken() && Auth.loggedIn() && (
            <LoginSpotify handleOpen={handleOpen} />
          )}

          <SpotifyModal open={open} handleClose={handleClose} />

          {/* Render username button and logout button if logged in */}
          {Auth.loggedIn() && (
            <>
              <Button
                className="navButton"
                color="inherit"
                onClick={handleProfile}
              >
                {Auth.getProfile().data.username}
              </Button>
              <Button
                className="navButton"
                color="inherit"
                onClick={handleLogoutButtonClick}
              >
                Logout
              </Button>
            </>
          )}

          {/* Render login button if not on the login page and not already logged in */}
          {window.location.pathname.split('/')[1] !== 'login' &&
            !Auth.loggedIn() && (
              <Button
                className="navButton"
                color="inherit"
                onClick={handleLoginButtonClick}
              >
                Login
              </Button>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}
