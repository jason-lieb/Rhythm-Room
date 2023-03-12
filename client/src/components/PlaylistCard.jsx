import React from 'react'
import { Link } from 'react-router-dom'
function PlaylistCard({ props }) {
  // the props will be the username, playlist name and playlist id
  return (
    <Link to={`/Playlist/${props._id}`} style={{ color: 'white', textDecoration: 'none', textTransform: 'uppercase'}}>
      <div>{props.owner.display_name}</div>
      <h2>{props.name}</h2>
    </Link>
  )
}

export default PlaylistCard
