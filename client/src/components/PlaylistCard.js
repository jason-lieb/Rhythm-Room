import React from 'react'
import { Link } from 'react-router-dom'
function PlaylistCard(props) {
    console.log(props)
    // the props will be the username, playlist name and playlist id
return (
    <Link to={`/Playlist/${props.playlistId}`}>
        <div>{props.info}</div>
        <h2>{props.list}</h2>
    </Link>
)
}

export default PlaylistCard