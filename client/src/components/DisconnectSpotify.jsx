export default function DisconnectSpotify({ setDisconnected }) {
  function disconnect() {
    localStorage.removeItem('access_token')
    setDisconnected(true)
    window.location.reload()
  }
  return <button onClick={disconnect}>Disconnect from Spotify</button>
}
