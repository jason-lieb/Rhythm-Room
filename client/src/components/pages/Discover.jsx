import { useEffect } from 'react'
import AllPlaylists from '../AllPlaylists'

function Discover() {
  // Changes the little tab name at the top of the browser
  useEffect(() => {
    document.title = 'Rhythm Room - Discover'
  }, [])
  return (
    <div className="List-of-all-playlists">
      <AllPlaylists />
    </div>
  )
}

export default Discover
