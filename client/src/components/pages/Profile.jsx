import * as React from 'react'
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
function Profile() {
  return (
    <div>
      <LoginSpotify />
    </div>
  )
}

export default Profile
