import { useEffect } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import Song from '../Song'
import Comment from '../Comment'

import getPlaylistDuration from '../../utils/getPlaylistDuration'
import { useSpotifyApi } from '../../utils/SpotifyApiContext'
// import { QUERY_PLAYLIST } from '../../utils/queries'
// import { useQuery } from '@apollo/client'

const css = `
  .playlistContainer {
    padding: 1rem 2rem;
    color: white;
  }
  .header {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 1rem;
  }
  .imgContainer {
    text-align: center;
    margin-bottom: -3rem;
  }
  .img {
    margin: 0 auto;
    max-height: 300px
  }
  .title {
  }
  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  `

export default function Playlist() {
  const [spotifyApi] = useSpotifyApi()

  // const { loading, data } = useQuery(QUERY_PLAYLIST, {variables: {playlist_id: ... }})
  // const playlist = data?.playlist || {}

  // if (loading) return <div>Loading...</div>

  const playlist = {
    name: 'Playlist Name',
    tracks: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    comments: [{}, {}, {}, {}],
  }
  playlist.numOfTracks = playlist.tracks.length
  playlist.duration = getPlaylistDuration(playlist.tracks)

  useEffect(() => {
    if (!playlist.name) return
    document.title = `Rhythm Room - ${playlist.name}`
  }, [playlist])

  return (
    <div className="playlistContainer">
      <style type="text/css">{css}</style>
      <Container>
        <Grid container spacing={2} className="header">
          <Grid item xs={12} className="imgContainer">
            <img
              className="img"
              src={
                playlist.images?.url ||
                'https://i.scdn.co/image/ab67706f00000003c2dde7acf212bdcb92ec4799'
              }
              alt={`${playlist.name} Playlist`}
            />
          </Grid>
          <Grid item>
            <Typography variant="h6" className="title">
              {playlist.name}
            </Typography>
            <Typography variant="subtitle1">
              {playlist.numOfTracks} Songs, {playlist.duration}
            </Typography>
          </Grid>
          <Grid item className="actions">
            {spotifyApi.getAccessToken() && (
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            <IconButton aria-label="More options">
              <MoreVertIcon sx={{ color: 'white' }} />
            </IconButton>
            {spotifyApi.getAccessToken() && (
              <IconButton aria-label="Play">
                <PlayCircleFilledIcon
                  className="playlistIcon"
                  sx={{ color: 'white' }}
                />
              </IconButton>
            )}
          </Grid>
        </Grid>
      </Container>
      <Container sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <Typography variant="subtitle2">#</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography variant="subtitle2">Title</Typography>
          </Grid>
          <Grid item xs={1} sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle2">Length</Typography>
          </Grid>
        </Grid>
        {playlist.tracks.map((song, index) => (
          <Song
            key={index}
            index={index}
            title={song.title}
            artist={song.artist}
            duration={song.duration}
          />
        ))}
      </Container>
      <Container sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Comments</Typography>
          </Grid>
        </Grid>
        {playlist.comments.map((comment, index) => (
          <Comment
            key={index}
            text={comment.commentText}
            author={comment.commentAuthor}
            createdAt={comment.createdAt}
          />
        ))}
      </Container>
    </div>
  )
}
