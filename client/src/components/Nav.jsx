import { useNavigate } from 'react-router-dom'
import { useSpotifyApi } from '../utils/SpotifyApiContext'
import Auth from '../utils/auth'
import { useState} from 'react'
import { useLazyQuery } from '@apollo/client'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal'

import LoginSpotify from './LoginSpotify'
import { QUERY_SONG_NAME } from '../utils/queries'

const css = `
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
// styling for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function Nav() {
  const [spotifyApi] = useSpotifyApi()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const [open, setOpen] = useState(false)

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

    const [fetchedSong, setFetchedSong] = useState();
    const [ getSong, { loading, data }] = useLazyQuery(QUERY_SONG_NAME)

    if (loading) return <p>loading</p>

    if (data && data.name) {
      // setFetchedSong(data.name)
      // console.log(fetchedSong)
    }
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

  return (
    <Box sx={{ flexGrow: 1 }}>
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
            onBlur={async() => {
              await getSong({ variables: { name: searchValue } }).then( () => {
                setFetchedSong(data.trackByName.artist[0])
                console.log(fetchedSong)
                console.log(data)
                handleOpen()
              })
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {fetchedSong}
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}
