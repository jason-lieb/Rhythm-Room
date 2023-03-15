import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'

export default function CreatePlaylistBTN() {
  const navigate = useNavigate()
  const goTo = () => navigate('/createPlaylist')
  if (!Auth.loggedIn()) return

  return (
    <button onClick={goTo} className="create-btn">
      <svg width="3rem" height="3rem">
        <circle
          cx="1.5rem"
          cy="1.5rem"
          r="1.2rem"
          fill="#595381"
          stroke="none"
        />
        <line
          x1="0.9rem"
          y1="1.5rem"
          x2="2.1rem"
          y2="1.5rem"
          stroke="white"
          strokeWidth="0.2rem"
        />
        <line
          x1="1.5rem"
          y1="0.9rem"
          x2="1.5rem"
          y2="2.1rem"
          stroke="white"
          strokeWidth="0.2rem"
        />
      </svg>
      <div className="pop-up">
        <span>Create a Playlist</span>
        <span className="pointy-span"></span>
      </div>
    </button>
  )
}
