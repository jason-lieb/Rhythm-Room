import PlusImg from '../assets/icons8-add-new-48.png'
import { useNavigate } from 'react-router-dom'

import Auth from '../utils/auth'

export default function CreatePlaylistBTN() {
  const navigate = useNavigate()
  const goTo = () => {
    navigate(`/profile/${Auth.getProfile().data._id}`)
  }
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
