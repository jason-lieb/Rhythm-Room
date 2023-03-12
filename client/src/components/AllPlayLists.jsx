import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import PlaylistCard from './PlaylistCard'
// import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PLAYLISTS } from '../utils/queries'
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

export default function AllPlayLists() {
  // fetch the information needed for the playlist cards and push it as props into the PlaylistCard component
  const { loading, data } = useQuery(QUERY_ALL_PLAYLISTS)
  const playlists = data?.playlists || []
  console.log(playlists)
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
          <ImageList variant="masonry" cols={3} gap={7}>
            {/* mapped to show all of the playlists */}
            {!loading ? (
              playlists.map((info) => {
                return (
                  <ImageListItem key={info._id} >
                    <Item style={{ backgroundColor: '#8d86c9' }}>
                      <PlaylistCard props={info} />
                    </Item>
                  </ImageListItem>
                )
              })
            ) : (
              <div>Loading...</div>
            )}
          </ImageList>
        </Box>
      </Container>
    </>
  )
}
