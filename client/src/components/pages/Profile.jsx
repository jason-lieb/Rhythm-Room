import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_USER } from '../../utils/queries'
import { CREATE_ABOUT_ME } from '../../utils/mutations'
import Auth from '../../utils/auth'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import DisconnectSpotify from '../DisconnectSpotify'
import { useSpotifyApi } from '../../utils/SpotifyApiContext'

const css = `
  .container-box {
    display: flex;
    justify-content: center;
    align-items: center;
    // height: 100vh;
    background-color: #242038;
  }
  .card {
    // height: 75vh;
    // width: 75vh;
    background-color: #8d86c9;
    color: white;
    display: flex;
  }
  .card-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .username {
    margin-left: 10px;
  }
  .text{
    color: white;
    width: 35vh;
  }
  .button {
    color: white;
  }
  text-field {
    color: white;
  }
  .name-header {
    display: flex;
    align-items: center;
    flex: space-between;
    margin: 10px;
  }
  .user-name {
    padding-left: 20px;
  }
  .liked-playlist {
    // width: 35vh;
    // height: 35vh;
    margin: 15px;
    padding: 1vh;
    background-color: #F7ECE1
  }
  .created-playlist {
    // width: 35vh;
    // height: 35vh;
    margin: 15px;
    padding: 1vh;
    background-color: #F7ECE1
  }
  .playlistCard {
    display: flex;
    justify-content: flex-end;
    margin: 2vh 0;
  }
  .playlistName {
    display: flex;
    justify-content: center;
    align-items:center;
    flex-grow: 1
  }
`

export default function Profile() {
  const navigate = useNavigate()
  const { profileId } = useParams()
  const [addAbout] = useMutation(CREATE_ABOUT_ME)
  const [aboutText, setAboutText] = useState('')
  const [aboutTextDisplay, setAboutTextDisplay] = useState('')
  const [spotifyApi] = useSpotifyApi()
  const spotifyLoggedIn = spotifyApi.getAccessToken()
  const [disconnected, setDisconnected] = useState(true)
  useEffect(() => {
    if (spotifyLoggedIn) setDisconnected(false)
  }, [spotifyLoggedIn])

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: profileId },
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const user = data?.user || {}

  useEffect(() => {
    setAboutTextDisplay(user.about)
  }, [user])

  const generateLikedPlaylists = () => {
    return user.likedplaylist.map((playlist, index) => (
      <Card key={index} className="playlistCard" sx={{ display: 'flex' }}>
        {console.log(playlist.items)}
        <CardContent className="playlistName">
          <Typography variant="h5">{playlist.name}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 100, maxHeight: 100 }}
          image={playlist.images[0].url}
          alt="Live from space album cover"
        />
      </Card>
    ))
  }
  const generateCreatedPlaylists = () => {
    return user.createdplaylist.map((playlist, index) => (
      <Card key={index} sx={{ display: 'flex' }}>
        <CardContent>
          <Typography variant="h5">{playlist.name}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 151, maxHeight: 151 }}
          image={playlist.images[0].url}
          alt="Live from space album cover"
        />
      </Card>
    ))
  }

  //functions for About Me section
  const [openEditBox, setOpenEditBox] = useState(false)
  const handleAboutTextChange = (event) => {
    const { value } = event.target
    setAboutText(value)
  }
  const submitAbout = async (e) => {
    e.preventDefault()
    const { data } = await addAbout({
      variables: { about: aboutText, id: profileId },
    })
    setAboutTextDisplay(data.addAbout.about)
    setOpenEditBox(false)
  }

  const editAboutMe = () => {
    if (!openEditBox) {
      return (
        <Button
          variant="text"
          sx={{ color: 'white' }}
          onClick={() => setOpenEditBox(true)}
        >
          Edit
        </Button>
      )
    } else if (openEditBox) {
      return (
        <>
          <TextField
            id="outlined-multiline-static"
            label="Edit"
            multiline
            size="small"
            margin="dense"
            // defaultValue="Default Value"
            onChange={handleAboutTextChange}
            sx={{ color: 'white' }}
          ></TextField>
          <Button variant="text" sx={{ color: 'white' }} onClick={submitAbout}>
            Submit
          </Button>
        </>
      )
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!Auth.loggedIn()) navigate('/login')

  return (
    <div className="container-box" style={{ minHeight: '85vh', padding: 10 }}>
      <style type="text/css">{css}</style>
      <Card className="card">
        <div className="left-content">
          {/* Avatar and username */}
          <div className="name-header">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100 }}
            />
            <Typography className="user-name">{user.username}</Typography>
            {!disconnected && (
              <DisconnectSpotify setDisconnected={setDisconnected} />
            )}
          </div>

          {/* About me section */}
          <CardContent>
            <Typography
              className="text"
              gutterBottom
              variant="h5"
              component="div"
            >
              About Me:
            </Typography>
            <Typography className="text" variant="body2" color="text.secondary">
              {aboutTextDisplay}
            </Typography>
            {editAboutMe()}
          </CardContent>
        </div>

        {/* Liked and created playlists */}
        <div className="right-content">
          <Card className="liked-playlist">
            <Typography variant="h7">Liked Playlists</Typography>
            {generateLikedPlaylists()}
          </Card>
          <Card className="created-playlist">
            <Typography variant="h7">Created Playlists</Typography>
            {generateCreatedPlaylists()}
          </Card>
        </div>
      </Card>
    </div>
  )
}
