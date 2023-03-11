import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PlaylistCard from './PlaylistCard'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function AllPlayLists() {
  // fetch the information needed for the playlist cards and push it as props into the PlaylistCard component
  const userName = 'Austin'
  const PlaylistName = 'my Playlist'
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: 'rgb(224,224,224, 0.2)',
            height: '100vh',
            width: '100%',
          }}
        >
          <Stack spacing={1} maxWidth="lg" margin="auto" padding="15px 10px">
            {/* this will need to be mapped to show all of the playlists */}
            {/* CHANGETHISPART.map(info => {
                    return <Item key={WHATEVER THE ID IS}><PlaylistCard props={} /></Item>
                }) */}
            <Item>
              <PlaylistCard info={userName} list={PlaylistName} />
            </Item>
            <Item>
              <PlaylistCard info={userName} list={PlaylistName} />
            </Item>
            <Item>
              <PlaylistCard info={userName} list={PlaylistName} />
            </Item>
          </Stack>
        </Box>
      </Container>
    </>
  )
}
