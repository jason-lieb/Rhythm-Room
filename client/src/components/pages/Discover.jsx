import AllPlayLists from '../AllPlayLists'
import LoginSpotify from '../LoginSpotify'
import SearchBar from '../Search'
import { useEffect } from 'react'
function Discover({ accessToken }) {
  // Changes the little tab name at the top of the browser
  useEffect(() => {
    document.title = 'Rythm Room - Discover'
  }, [])
  return (
    <div className="List-of-all-playlists" style={{ backgroundColor: '#242038' }}>
      {accessToken ? <p style={{ color: 'white', padding: '0px', margin: 0}}>Logged In to Spotify</p> : <LoginSpotify />}
      <SearchBar accessToken={accessToken} />
      <AllPlayLists />
    </div>
  )
}

export default Discover
