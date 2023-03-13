import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ConcertImg from '../../assets/music.jpg'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import { useQuery } from '@apollo/client'
import { QUERY_USER } from '../utils/queries'
import { useParams } from 'react-router-dom'

const css = `
  .container-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #242038;
  }
  .card {
    height: 75vh; 
    width: 75vh;
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
    width: 35vh;
    height: 35vh;
    margin: 15px;
  }
  .created-playlist {
    width: 35vh;
    height: 35vh;
    margin: 15px;
  }
`

export default function Login() {
  const theme = useTheme()
  const { profileId } = useParams()
  const { loading, data } = useQuery(QUERY_USER, {
    variables: { userId: profileId },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container-box">
      {console.log(data)}
      <style type="text/css">{css}</style>
      <Card className="card">
        <div className="left-content">
          <div className="name-header">
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 100, height: 100 }}
            />
            <Typography className="user-name">Name Example</Typography>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
              expedita facilis consequuntur rerum saepe tenetur eum enim
              quaerat, eaque assumenda cupiditate fugiat sunt fuga hic vero
              eligendi suscipit sit qui voluptate magnam. Quos reiciendis
              praesentium culpa nostrum nulla earum, enim libero aperiam at
              inventore? Iure quis voluptatem quas deserunt maiores. Cupiditate
              fugit quod eos magni. Ipsam ad possimus voluptatibus dicta culpa
              accusantium quam! Repellat ad veniam et alias earum nisi
              consectetur tempore excepturi sunt, sint, a atque vel blanditiis
              aspernatur iusto amet ut assumenda? Iure corporis quis sed facilis
              placeat ab repellat, incidunt vitae esse eius saepe tempore, vel
              consequuntur?
            </Typography>
          </CardContent>
        </div>
        <div className="right-content">
          <Card className="liked-playlist">
            <Typography>Liked Playlist</Typography>
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
                image="/static/images/cards/live-from-space.jpg"
                alt="Live from space album cover"
              />
            </Card>
          </Card>
          <Card className="created-playlist">
            <Typography>Created Playlist</Typography>
          </Card>
        </div>
      </Card>
    </div>
  )
}
