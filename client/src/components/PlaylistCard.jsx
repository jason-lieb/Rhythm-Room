import { Link } from 'react-router-dom'

// the props will be the username, playlist name and playlist id
export default function PlaylistCard({ props }) {
  return (
    <Link
      className="link-tag"
      to={`/Playlist/${props._id}`}
      style={{
        color: 'white',
        textDecoration: 'none',
        textTransform: 'uppercase',
        backgroundImage: `url(${props.images[0].url})`,
      }}
    >
      <div className="card-info">
        <div>{props.owner.display_name}</div>
        <h2>{props.name}</h2>
        {/* <img className='discover-img' src={props.images[0].url} alt='uh'/> */}
      </div>
    </Link>
  )
}
