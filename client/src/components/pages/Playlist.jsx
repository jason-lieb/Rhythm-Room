// import { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import Song from '../Song'

import { useSpotifyApi } from '../../utils/SpotifyApiContext'

const css = `
  .root {
    flex-grow: 1;
  }
  .playlistHeader {
    display: flex;
    align-items: center;
  }
  .playlistTitle {
  }
  .playlistActions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  `

export default function Playlist() {
  const [spotifyApi] = useSpotifyApi()

  // useEffect(() => {
  //   if (!accessToken) return
  //   spotifyApi.setAccessToken(accessToken)
  // }, [accessToken])
  return (
    <div className="root">
      <style type="text/css">{css}</style>
      <Grid container spacing={2} className="playlistHeader">
        <Grid item>
          <Avatar className="playlistAvatar">P</Avatar>
        </Grid>
        <Grid item>
          <Typography variant="h6" className="playlistTitle">
            Playlist Title
          </Typography>
          <Typography variant="subtitle1">100 songs, 5 hr 43 min</Typography>
        </Grid>
        <Grid item className="playlistActions">
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="More options">
            <MoreHorizIcon />
          </IconButton>
          {spotifyApi.getAccessToken() && (
            <IconButton aria-label="Play">
              <PlayCircleFilledIcon className="playlistIcon" />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Typography variant="subtitle2">#</Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle2">Title</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2">Length</Typography>
        </Grid>
      </Grid>
      {[...Array(100)].map((_, index) => (
        <Song key={index} index={index} />
      ))}
    </div>
  )
}
