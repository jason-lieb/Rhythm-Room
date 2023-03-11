import * as React from 'react'
// import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'

const AUTH_URL =
  'https://accounts.spotify.com/authorize?' +
  'client_id=538c7cde1253426896361ee2d3a79d9f' +
  '&response_type=code' +
  '&redirect_uri=http://localhost:3000' +
  '&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

const css = `
  #main-container {
    border-style:  solid;
    border-width: medium;
    border-color: black;
    margin: 10px;
    display: flex;
    flex-direction: row;
  }
  #userinfo {
    border-style:  solid;
    border-width: medium;
    border-color: red;
    margin: 10px;
  }
  #playlistinfo {
    border-style:  solid;
    border-width: medium;
    border-color: blue;
    margin: 10px;
  }
`

function Profile() {
  return (
    <>
      <style type="text/css">{css}</style>
      <Container maxWidth="lg" id="main-container">
        <Container id="userinfo">
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="h4" component="div">
                Username
              </Typography>
            </CardContent>
            <CardActions>
              <a href={AUTH_URL}>
                <Button size="small">Connect your Spotify Account</Button>
              </a>
            </CardActions>
            <CardContent>
              <Typography variant="h5">About Me</Typography>
              <Typography variant="p">
                I was born in Ohio. I grew up on a farm and always listened to
                Country music. Later in life I discovered Jazz. Please add me
                and follow my recommendations!
              </Typography>
            </CardContent>
          </Card>
          {/* <div>
            <a href={AUTH_URL}>Connect your Spotify account</a>
          </div> */}
        </Container>
        <Container id="playlistinfo"></Container>
      </Container>
    </>
  )
}

export default Profile
