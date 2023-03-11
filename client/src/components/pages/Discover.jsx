import AllPlayLists from '../AllPlayLists'
import LoginSpotify from '../LoginSpotify'
import SearchBar from '../Search'

function Discover({ accessToken }) {
  return (
    <div className="List-of-all-playlists">
      {accessToken ? <p>Logged In to Spotify</p> : <LoginSpotify />}
      <SearchBar accessToken={accessToken} />
      <AllPlayLists />
    </div>
  )
}

export default Discover
