// import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
// import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import defaultPlaylistIcon from '../../assets/live-from-space.jpg'

import LoginSpotify from '../LoginSpotify'

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
  #playlistsection {
    border-style:  solid;
    border-width: medium;
    border-color: blue;
    margin: 10px;
  }
`
function Profile() {
  const theme = useTheme()
  return (
    <div>
      <>
        <LoginSpotify />
        <style type="text/css">{css}</style>
        <Container maxWidth="lg" id="main-container">
          <Grid item xs={6} id="userinfo">
            <Card>
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
              <CardActions>
                <a href="https://www.google.com/">
                  <Button size="small">Create/add a playlist</Button>
                </a>
              </CardActions>
            </Card>
            {/* <div>
            <a href={AUTH_URL}>Connect your Spotify account</a>
          </div> */}
          </Grid>
          <Grid item xs={6} id="playlistsection">
            <Container>
              <Typography>Created Playlists</Typography>
              {/* Individual Playlist Card */}
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Live From Space
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Mac Miller
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                  >
                    <IconButton aria-label="previous">
                      {theme.direction === 'rtl' ? (
                        <SkipNextIcon />
                      ) : (
                        <SkipPreviousIcon />
                      )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === 'rtl' ? (
                        <SkipPreviousIcon />
                      ) : (
                        <SkipNextIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={defaultPlaylistIcon}
                  alt="Live from space album cover"
                />
              </Card>
              {/* Individual Playlist Card */}
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Greatest Hits
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      The Beatles
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                  >
                    <IconButton aria-label="previous">
                      {theme.direction === 'rtl' ? (
                        <SkipNextIcon />
                      ) : (
                        <SkipPreviousIcon />
                      )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === 'rtl' ? (
                        <SkipPreviousIcon />
                      ) : (
                        <SkipNextIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={defaultPlaylistIcon}
                  alt="Live from space album cover"
                />
              </Card>
            </Container>
            <Container>
              <Typography>Liked Playlists</Typography>
              {/* Individual Playlist Card */}
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Are You Experienced?
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Jimi Hendrix
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                  >
                    <IconButton aria-label="previous">
                      {theme.direction === 'rtl' ? (
                        <SkipNextIcon />
                      ) : (
                        <SkipPreviousIcon />
                      )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === 'rtl' ? (
                        <SkipPreviousIcon />
                      ) : (
                        <SkipNextIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={defaultPlaylistIcon}
                  alt="Live from space album cover"
                />
              </Card>
              {/* Individual Playlist Card */}
              <Card sx={{ display: 'flex' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5">
                      Dinner Party
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      Various Artists
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}
                  >
                    <IconButton aria-label="previous">
                      {theme.direction === 'rtl' ? (
                        <SkipNextIcon />
                      ) : (
                        <SkipPreviousIcon />
                      )}
                    </IconButton>
                    <IconButton aria-label="play/pause">
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="next">
                      {theme.direction === 'rtl' ? (
                        <SkipPreviousIcon />
                      ) : (
                        <SkipNextIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={defaultPlaylistIcon}
                  alt="Live from space album cover"
                />
              </Card>
            </Container>
          </Grid>
        </Container>
      </>
    </div>
  )
}

export default Profile
