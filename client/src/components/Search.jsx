import { useEffect, useState } from 'react'
// import axios from 'axios'

export default function Search({ accessToken }) {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // useEffect(() => {
  //   if (!accessToken) return
  //   if (!search) return setSearchResults([])
  //   let abortSearch = false

  //   return () => (abortSearch = true)
  // }, [accessToken, search])
  return (
    <div>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <div>{searchResults}</div>
    </div>
  )
}
