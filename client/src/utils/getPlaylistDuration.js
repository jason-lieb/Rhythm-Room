export default function getPlaylistDuration(tracks) {
  const totalInSeconds = tracks.reduce((total, track) => {
    let duration = track.length ?? 225
    return total + duration
  }, 0)

  const hours = Math.floor(totalInSeconds / 3600)
  let minutes = (totalInSeconds % 3600) / 60
  minutes =
    minutes - Math.floor(minutes) < 0.5
      ? Math.floor(minutes)
      : Math.ceil(minutes)
  const duration =
    `${hours} hour${hours !== 1 ? 's' : ''}, ` +
    `${minutes} minute${minutes !== 1 ? 's' : ''}`
  return duration
}
