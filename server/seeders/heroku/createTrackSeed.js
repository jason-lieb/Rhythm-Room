const trackSeed = require('./trackSeeds.json')
const playlistSeed = require('./playlistSeeds.json')
const fs = require('fs')

const newTrackSeed = []
for (let i = 0; i < playlistSeed.length; i++) {
  for (let j = 0; j < trackSeed[i].items.length; j++) {
    let track_id = trackSeed[i].items[j].track.id
    let track_name = trackSeed[i].items[j].track.name
    let track_duration = trackSeed[i].items[j].track.duration_ms
    let track_uri = trackSeed[i].items[j].track.uri
    let track_artist = trackSeed[i].items[j].track.artists.map(
      (artist) => artist.name
    )
    const formattedTrack = {
      trackId: track_id,
      name: track_name,
      duration_ms: track_duration,
      artist: track_artist,
      uri: track_uri,
    }
    newTrackSeed.push(formattedTrack)
  }
}

fs.writeFileSync('./trackSeedsForHeroku.json', JSON.stringify(newTrackSeed))

console.log('Track seeds created!')
process.exit(0)
