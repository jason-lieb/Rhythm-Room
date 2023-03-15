const db = require('../config/connection')
const { User, Playlist, Track } = require('../models')
const userSeeds = require('./userSeeds.json')
const playlistSeed = require('./playlistSeeds.json')
const trackSeed = require('./trackSeeds.json')

db.once('open', async () => {
  try {
    await Playlist.deleteMany({})
    await User.deleteMany({})
    await Track.deleteMany({})

    await User.create(userSeeds)

    for (let i = 0; i < playlistSeed.length; i++) {
      const { _id } = await Playlist.create(playlistSeed[i])

      for (let j = 0; j < trackSeed[i].items.length; j++) {
        let track_id = trackSeed[i].items[j].track.id
        let track_name = trackSeed[i].items[j].track.name
        let track_duration = trackSeed[i].items[j].track.duration_ms
        let track_uri = trackSeed[i].items[j].track.uri
        let track_artist = trackSeed[i].items[j].track.artists.map(
          (artist) => artist.name
        )
        let { _id: trackObjectId } = await Track.create({
          trackId: track_id,
          name: track_name,
          duration_ms: track_duration,
          artist: track_artist,
          uri: track_uri,
        })
        await Playlist.findByIdAndUpdate(
          { _id: _id },
          {
            $addToSet: {
              items: trackObjectId,
            },
          }
        )
      }

      await User.findOneAndUpdate(
        {},
        {
          $addToSet: {
            likedplaylist: _id,
          },
        }
      )
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }

  console.log('Seeding all done!')
  process.exit(0)
})
