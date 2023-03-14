import Card from '@mui/material/Card'
// import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
// import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
// import ConcertImg from '../../assets/music.jpg'
// import Box from '@mui/material/Box'
// import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import { useQuery, useMutation } from '@apollo/client'
import { /*QUERY_PLAYLIST,*/ QUERY_USER } from '../../utils/queries'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CREATE_ABOUT_ME } from '../../utils/mutations'
// import { flexbox } from '@mui/system'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

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
  }
  .created-playlist {
    // width: 35vh;
    // height: 35vh;
    margin: 15px;
  }
`

export default function Profile() {
  const theme = useTheme()
  const { profileId } = useParams()
  const { loading, data, error } = useQuery(QUERY_USER, {
    variables: { userId: profileId },
  })
  const user = data?.user || {}
  const [addAbout, { error2 }] = useMutation(CREATE_ABOUT_ME)
  const [aboutText, setAboutText] = useState('')
  const [aboutTextDisplay, setAboutTextDisplay] = useState('')

  const generateLikedPlaylists = () => {
    return user.likedplaylist.map((playlist) => (
      <Card sx={{ display: 'flex' }}>
        {/* {console.log(playlist.images[0])} */}
        <CardContent>
          <Typography variant="h5">{playlist.name}</Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={playlist.images[0].url}
          alt="Live from space album cover"
        />
      </Card>
    ))
  }

  useEffect(() => {
    setAboutTextDisplay(user.about)
  }, [user])

  //functions for About Me section

  // let aboutTextDisplay
  // const renderAboutText = () => {
  //   aboutTextDisplay = aboutTextState
  // }
  const handleAboutTextChange = (event) => {
    const { value } = event.target
    setAboutText(value)
  }
  const submitAbout = async (e) => {
    e.preventDefault()
    const { data } = await addAbout({
      variables: { about: aboutText, id: profileId },
    })
    console.log(data.addAbout.about)
    setAboutTextDisplay(data.addAbout.about)
    console.log(aboutTextDisplay)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-box">
      <style type="text/css">{css}</style>
      <Card className="card">
        <div className="left-content">
          <div className="name-header">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100 }}
            />
            <Typography className="user-name">{user.username}</Typography>
          </div>
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
            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={4}
              defaultValue="Default Value"
              onChange={handleAboutTextChange}
            ></TextField>
            <Button variant="contained" onClick={submitAbout}>
              Submit
            </Button>
          </CardContent>
        </div>
        <div className="right-content">
          <Card className="liked-playlist">
            <Typography>Liked Playlists</Typography>
            {generateLikedPlaylists()}
          </Card>
          <Card className="created-playlist">
            <Typography>Created Playlists</Typography>
          </Card>
        </div>
      </Card>
    </div>
  )
}
