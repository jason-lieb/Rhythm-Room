export default function getPlaylistDuration(tracks) {
  const totalInSeconds = tracks.reduce((total, track) => {
    let duration = track.duration_ms
    return total + duration
  }, 0)

  const hours = Math.floor(totalInSeconds / 3600000)
  let minutes = (totalInSeconds % 3600000) / 60000
  minutes =
    minutes - Math.floor(minutes) < 0.5
      ? Math.floor(minutes)
      : Math.ceil(minutes)
  const duration =
    `${hours} hour${hours !== 1 ? 's' : ''}, ` +
    `${minutes} minute${minutes !== 1 ? 's' : ''}`
  return duration
}
