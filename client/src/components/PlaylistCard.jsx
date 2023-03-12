import React from 'react'
import { Link } from 'react-router-dom'
function PlaylistCard(props) {
  // the props will be the username, playlist name and playlist id
  return (
    <Link to={`/Playlist/${props.props._id}`} style={{ color: 'white', textDecoration: 'none', textTransform: 'uppercase'}}>
      <div>{props.props.owner}</div>
      <h2>{props.props.name}</h2>
    </Link>
  )
}

export default PlaylistCard
