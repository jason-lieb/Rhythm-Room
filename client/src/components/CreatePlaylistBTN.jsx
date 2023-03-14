import { useNavigate } from 'react-router-dom'
import Auth from '../utils/auth'
import PlusImg from '../assets/icons8-add-new-48.png'

export default function CreatePlaylistBTN() {
  const navigate = useNavigate()
  const goTo = () => navigate('/createPlaylist')
  if (!Auth.loggedIn()) return

  return (
    <button onClick={goTo} className="create-btn">
      <img className="plus-img" src={PlusImg} alt="+" />
      <div className="pop-up">
        <span>Create a Playlist</span>
        <span className="pointy-span"></span>
      </div>
    </button>
  )
}
