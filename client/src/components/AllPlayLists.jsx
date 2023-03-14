import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { QUERY_ALL_PLAYLISTS } from '../utils/queries'

import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

export default function AllPlayLists() {
  // fetch the information needed for the playlist cards and push it as props into the PlaylistCard component
  const { loading, data } = useQuery(QUERY_ALL_PLAYLISTS)
  const playlists = data?.playlists || []

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <ImageList cols={3} gap={8} sx={{ padding: '10px' }}>
      {/* mapped to show all of the playlists */}
      {playlists.map((info) => {
        return (
          <Link
            style={{ zIndex: 0, position: 'relative' }}
            key={info._id}
            to={`/Playlist/${info._id}`}
          >
            <ImageListItem
              style={{ minHeight: 10, zIndex: -2, position: 'relative' }}
            >
              <img
                src={`${info.images[0].url}?w=248&fit=crop&auto=format`}
                srcSet={`${info.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt="as"
                loading="lazy"
                style={{ minHeight: 10 }}
              />
              <div className="like-btn-home">
                <ThumbUpIcon fontSize="large" sx={{ zIndex: 1 }} />
              </div>
            </ImageListItem>
          </Link>
        )
      })}
    </ImageList>
  )
}
