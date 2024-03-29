import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { QUERY_PLAYLIST } from '../../utils/queries'
import { ADD_COMMENT, ADD_LIKED_PLAYLIST } from '../../utils/mutations'
import { useSpotifyApi } from '../../utils/SpotifyApiContext'
import getPlaylistDuration from '../../utils/getPlaylistDuration'
import Auth from '../../utils/auth'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import Song from '../Song'
import Comment from '../Comment'
import Player from '../Player'
import Loading from '../Loading'

const css = `
  .playlistContainer {
    color: white;
    min-height: calc(100vh - 12rem);
    padding: 2rem;
  }
  .header-2 {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .imgContainer {
    text-align: center;
    margin-bottom: -3rem;
  }
  .img {
    margin:auto;
    max-height: 300px
  }
  .actions {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  .addComment {
    margin-left: 2rem;
    vertical-align: bottom;
    background-color: #595381;
  }
  #outlined-multiline-static {
    color: white;
    width: 56rem;
  }
  `

export default function Playlist() {
  const [spotifyApi] = useSpotifyApi()
  const [addLikedPlaylist] = useMutation(ADD_LIKED_PLAYLIST)
  const [addComment] = useMutation(ADD_COMMENT)
  const [commentText, setCommentText] = useState('')

  const { playlistId } = useParams()
  const [songUri, setSongUri] = useState()

  const { loading, data } = useQuery(QUERY_PLAYLIST, {
    variables: { playlistId },
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const playlist = { ...data?.playlist } || {}
  playlist.numOfTracks = playlist.items?.length
  if (playlist.items) playlist.duration = getPlaylistDuration(playlist.items)

  useEffect(() => {
    if (!playlist.name) return
    document.title = `Rhythm Room - ${playlist.name}`
  }, [playlist])
  if (loading) return <Loading />

  function chooseTrack(uri) {
    setSongUri(uri)
  }

  const handleCommentChange = (event) => {
    const { value } = event.target
    setCommentText(value)
  }

  const commentButton = async () => {
    // eslint-disable-next-line no-unused-vars
    const { data } = await addComment({
      variables: {
        commentText: commentText,
        commentAuthor: Auth.getProfile().data._id,
        commentUsername: Auth.getProfile().data.username,
        id: playlistId,
      },
    })
    // window.location.reload()
  }

  const likePlaylist = async () => {
    // eslint-disable-next-line no-unused-vars
    const { data } = await addLikedPlaylist({
      variables: { ownerId: Auth.getProfile().data._id, id: playlistId },
    })
    alert('Playlist Liked')
  }

  return (
    <div className="playlistContainer">
      <style type="text/css">{css}</style>
      <Container maxWidth="lg">
        <Grid container spacing={1} className="header-2">
          <Grid item xs={12} className="imgContainer">
            <img
              className="img"
              src={playlist.images[0].url}
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
            {/* Render like button if logged in and connected to Spotify */}
            {Auth.loggedIn() && (
              <IconButton onClick={likePlaylist} aria-label="Add to favorites">
                <FavoriteIcon sx={{ color: 'white' }} />
              </IconButton>
            )}
            {/* <IconButton aria-label="More options">
              <MoreVertIcon sx={{ color: 'white' }} />
            </IconButton> */}

            {/* Render play button if logged in and connected to Spotify */}
            {spotifyApi.getAccessToken() && Auth.loggedIn() && (
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
        {/* Playlist headers */}
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
        <div style={{ marginTop: 10 }}>
          {playlist.items &&
            playlist.items.map((song, index) => (
              <Song
                key={index}
                index={index}
                title={song.name}
                artist={song.artist}
                duration={song.duration_ms}
                uri={song.uri}
                chooseTrack={chooseTrack}
              />
            ))}
        </div>
      </Container>
      <Container sx={{ mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="subtitle1">Comments</Typography>
          </Grid>
        </Grid>
        {playlist.comments &&
          playlist.comments?.map((comment, index) => (
            <Comment
              key={index}
              text={comment.commentText}
              author={comment.commentUsername}
              createdAt={comment.createdAt}
            />
          ))}
      </Container>
      {/* If logged in, add field to leave a comment */}
      {Auth.loggedIn() && (
        <Container sx={{ mb: 3 }}>
          <TextField
            id="outlined-multiline-static"
            label="Add a comment"
            style={{ border: 'none' }}
            multiline
            rows={4}
            defaultValue="Add a comment"
            onChange={handleCommentChange}
          />
          <Button
            className="addComment"
            variant="contained"
            onClick={commentButton}
          >
            Add Comment
          </Button>
        </Container>
      )}
      <div>
        <Player songUri={songUri} />
      </div>
    </div>
  )
}
