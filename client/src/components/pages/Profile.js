import LoginSpotify from '../LoginSpotify'

function Profile({ accessToken }) {
  return (
    <div>{accessToken ? <p>Logged In to Spotify</p> : <LoginSpotify />}</div>
  )
}

export default Profile
