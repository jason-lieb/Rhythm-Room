import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { QUERY_ALL_PLAYLISTS } from '../utils/queries'

export default function AllPlayLists() {
  // fetch the information needed for the playlist cards and push it as props into the PlaylistCard component
  const { loading, data } = useQuery(QUERY_ALL_PLAYLISTS)
  const playlists = data?.playlists || []
  console.log(playlists)
  return (
          <ImageList cols={3} gap={8} sx={{ padding: '10px'}}>
            {/* mapped to show all of the playlists */}
            {!loading ? (
              playlists.map((info) => {
                return (
                    <Link key={info._id} to={`/Playlist/${info._id}`}>
                    <ImageListItem>
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
