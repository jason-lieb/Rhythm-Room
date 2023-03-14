// import { useEffect, useState } from 'react'
// import axios from 'axios'

import { useSpotifyApi } from '../utils/SpotifyApiContext'

export default function Search({ accessToken }) {
  const [spotifyApi] = useSpotifyApi()

  function retrieveElvisAlbums() {
    if (!spotifyApi.getAccessToken()) return
    spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
      if (err) console.error(err)
      else console.log('Elvis albums', data)
    })
  }

  // const [search, setSearch] = useState('')
  // const [searchResults, setSearchResults] = useState([])

  // useEffect(() => {
  //   if (!accessToken) return
  //   if (!search) return setSearchResults([])
  //   let abortSearch = false

  //   return () => (abortSearch = true)
  // }, [accessToken, search])

  return (
    <div>
      <button onClick={retrieveElvisAlbums}>Retrieve Elvis Albums</button>
      {/* <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <div>{searchResults}</div> */}
    </div>
  )
}
