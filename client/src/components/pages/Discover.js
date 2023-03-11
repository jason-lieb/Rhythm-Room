import AllPlayLists from '../AllPlayLists'
import LoginSpotify from '../LoginSpotify'

function Discover({ accessToken }) {
  return (
    <div className="List-of-all-playlists">
      {accessToken !== 'test' ? <p>Logged In to Spotify</p> : <LoginSpotify />}
      <AllPlayLists />
    </div>
  )
}

export default Discover
