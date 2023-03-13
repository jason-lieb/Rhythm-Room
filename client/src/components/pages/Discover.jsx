import { useEffect } from 'react'
import AllPlayLists from '../AllPlayLists'

function Discover() {
  // Changes the little tab name at the top of the browser
  useEffect(() => {
    document.title = 'Rhythm Room - Discover'
  }, [])
  return (
    <div className="List-of-all-playlists">
      <AllPlayLists />
    </div>
  )
}

export default Discover
