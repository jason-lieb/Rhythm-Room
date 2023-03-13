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
import { Link } from 'react-router-dom'
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
  // console.log(playlists)
  return (
          <ImageList cols={3} gap={8} sx={{ padding: '10px'}}>
            {/* mapped to show all of the playlists */}
            {!loading ? (
              playlists.map((info) => {
                return (
                    <Link key={info._id} to={`/Playlist/${info._id}`}>
                    <ImageListItem>
                      {/* <Item style={{ backgroundColor: '#8d86c9', height: '250px' }}> */}
                        {/* <PlaylistCard props={info} /> */}
                      {/* </Item> */}
                      <img
                      src={`${info.images[0].url}?w=248&fit=crop&auto=format`}
                      srcSet={`${info.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt='as'
                      loading="lazy"
                      style={{ minHeight: 10 }}
                      />
                    </ImageListItem>
                    </Link>
                )
              })
            ) : (
              <div>Loading...</div>
            )}
          </ImageList>
  )
}
