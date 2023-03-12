// import { useContext } from 'react'
// import { SpotifyApiContext } from '../../utils/SpotifyApiContext'
import AllPlayLists from '../AllPlayLists'
// import LoginSpotify from '../LoginSpotify'
import Search from '../Search'

function Discover() {
  // const [spotifyApi] = useContext(SpotifyApiContext)
  return (
    <div className="List-of-all-playlists">
      {/* {accessToken ? <p>Logged In to Spotify</p> : <LoginSpotify />} */}
      <Search />
      <AllPlayLists />
    </div>
  )
}

export default Discover
