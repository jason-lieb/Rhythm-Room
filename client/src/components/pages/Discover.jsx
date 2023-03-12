// import { useContext } from 'react'
import AllPlayLists from '../AllPlayLists'
import LoginSpotify from '../LoginSpotify'
import Search from '../Search'

import { useSpotifyApi } from '../../utils/SpotifyApiContext'

function Discover() {
  const [spotifyApi] = useSpotifyApi()
  return (
    <div className="List-of-all-playlists">
      {spotifyApi.getAccessToken() ? (
        <p>Logged In to Spotify</p>
      ) : (
        <LoginSpotify />
      )}
      <Search />
      <AllPlayLists />
    </div>
  )
}

export default Discover
