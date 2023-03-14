import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import Song from '../Song'
import Comment from '../Comment'
// import { useLogin } from '../../utils/LoginContext'
import TextField from '@mui/material/TextField'
import { ADD_COMMENT, ADD_LIKED_PLAYLIST } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
import { useParams } from 'react-router-dom'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

import getPlaylistDuration from '../../utils/getPlaylistDuration'
import { useSpotifyApi } from '../../utils/SpotifyApiContext'
import { QUERY_PLAYLIST } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import Auth from '../../utils/auth'

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
  const [addLikedPlaylist] = useMutation(ADD_LIKED_PLAYLIST)
  const [addComment] = useMutation(ADD_COMMENT)
  const [commentText, setCommentText] = useState('')
  const { playlistId } = useParams()

  const handleCommentChange = (event) => {
    const { value } = event.target
    setCommentText(value)
  }

  const commentButton = async () => {
    console.log(commentText, playlistId)
    const { data } = await addComment({
      variables: { commentText: commentText, commentAuthor: Auth.getProfile().data._id, commentUsername: Auth.getProfile().data.username, id: playlistId }
    })
  }

  const { loading, data } = useQuery(QUERY_PLAYLIST, {
    variables: { playlistId },
  })
  const likePlaylist = async () => {
    // console.log(playlistId, sessionId)
    //add mutation logic for liking playlist here
    const { data } = await addLikedPlaylist({
      variables: { ownerId: Auth.getProfile().data._id, id: playlistId }
    })
    alert('Playlist Liked')
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const playlist = { ...data?.playlist } || {}
  playlist.numOfTracks = playlist.items?.length
  if (playlist.items) playlist.duration = getPlaylistDuration(playlist.items)

  useEffect(() => {
    if (!playlist.name) return
    document.title = `Rhythm Room - ${playlist.name}`
  }, [playlist])
  if (loading) return <div>Loading...</div>

  return (
    <div className="playlistContainer">
      <style type="text/css">{css}</style>
      <Container>
        <div className="like-btn" onClick={likePlaylist}>
          <ThumbUpIcon fontSize="large" cursor="pointer" />
        </div>
        <Grid container spacing={2} className="header">
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
        {playlist.items &&
          playlist.items.map((song, index) => (
            <Song
              key={index}
              index={index}
              title={song.name}
              artist={song.artist}
              duration={song.duration_ms}
            />
          ))}
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
              author={comment.commentAuthor}
              createdAt={comment.createdAt}
            />
          ))}
      </Container>
      {Auth.loggedIn() && (
        <>
          <TextField
            id="outlined-multiline-static"
            label="Multiline"
            multiline
            rows={4}
            defaultValue="Default Value"
            onChange={handleCommentChange}
          />
          <Button variant="contained" onClick={commentButton}>
            Add Comment
          </Button>
        </>
      )}
    </div>
  )
}
