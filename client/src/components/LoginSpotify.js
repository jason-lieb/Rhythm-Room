// import generateRandomString from '../utils/generateRandomString'

export default function LoginSpotify() {
  // let auth_query_parameters = new URLSearchParams({
  //   response_type: 'code',
  //   client_id: '538c7cde1253426896361ee2d3a79d9f',
  //   scope:
  //     'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state',
  //   redirect_uri: window.location.href,
  //   // state: generateRandomString(16),
  // })

  const AUTH_URL =
    'https://accounts.spotify.com/authorize?' +
    'client_id=538c7cde1253426896361ee2d3a79d9f' +
    '&response_type=code' +
    '&redirect_uri=http://localhost:3000' +
    '&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

  // const AUTH_URL =
  //   'https://accounts.spotify.com/authorize?' +
  //   'client_id=538c7cde1253426896361ee2d3a79d9f' +
  //   '&response_type=code' +
  //   '&redirect_uri=https://localhost:3000' +
  //   '&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
  // '&state=' + generateRandomString(16)
  // async function loginSpotify() {
  //   window.location.href = `https://accounts.spotify.com/authorize/?${auth_query_parameters.toString()}`
  // }

  // return <button onClick={loginSpotify}>Connect to Spotify</button>
  return <a href={AUTH_URL}>Connect to Spotify</a>
}
