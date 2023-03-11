const AUTH_URL =
  'https://accounts.spotify.com/authorize?' +
  'client_id=538c7cde1253426896361ee2d3a79d9f' +
  '&response_type=code' +
  '&redirect_uri=http://localhost:3000' +
  '&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

function Profile() {
  return (
    <div>
      <a href={AUTH_URL}>Login with Spotify</a>
    </div>
  )
}

export default Profile
