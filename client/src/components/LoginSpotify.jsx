import generateRandomString from '../utils/generateRandomString'

export default function LoginSpotify() {
  const AUTH_URL =
    'https://accounts.spotify.com/authorize?' +
    'client_id=538c7cde1253426896361ee2d3a79d9f' +
    '&response_type=code' +
    '&redirect_uri=' +
    window.location.href +
    '&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state' +
    '&state=' +
    generateRandomString(16)

  async function loginSpotify() {
    window.location.href = AUTH_URL
  }

  return <button onClick={loginSpotify}>Connect to Spotify</button>
}
