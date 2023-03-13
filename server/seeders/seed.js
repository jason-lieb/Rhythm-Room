const db = require('../config/connection')
const { User, Playlist, Track } = require('../models')
const userSeeds = require('./userSeeds.json')
const playlistSeed = require('./playlistSeeds.json')
const trackSeed = require('./combined.json')
// const fs = require('fs').promises

db.once('open', async () => {
  try {
    await Playlist.deleteMany({})
    await User.deleteMany({})
    await Track.deleteMany({})

    await User.create(userSeeds)

    for (let i = 0; i < playlistSeed.length; i++) {
      const { _id, tracks } = await Playlist.create(playlistSeed[i])

      // try {
      //   let response = await fetch(tracks.href, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //       Authorization:
      //         'Bearer BQD8ZGQtdCpFf8I50xUdYD8Q_e1A2x_y8BjKQBgBP3pDYBn9NCtqQqb4HlMyFIIbTNiXYRNgjA7BY_z_54xhhQGmEXBd7ab25x-XRim-3WI8tOcPWXDiFeN8nbzugri4TD7x_bbY4bjF0B6U2GXjVB22AgzSnQgc4iNYDWY26VkkrHx_wOyREHBYzIv5mK1OG-No3c6W_FKs2Hct7aJnkQ40_imqUoujmFuCfI1nJF4XbJIl--wW9arljA',
      //     },
      //   })
      //   let data = await response.json()
      // await fs.writeFile(
      //   `seeders/trackSeeds${i+1}.json`,
      //   JSON.stringify(data, null, 2),
      //   (err) => {
      //     if (err) {
      //       console.log(err)
      //     } else {
      //       console.log('Filewritten successfully\n')
      //     }
      //   }
      // )
      for (let j = 0; j < trackSeed[i].items.length; j++) {
        let track_id = trackSeed[i].items[j].track.id
        let track_name = trackSeed[i].items[j].track.name
        let track_duration = trackSeed[i].items[j].track.duration_ms
        let track_artist = trackSeed[i].items[j].track.artists.map(
          (artist) => artist.name
        )
        let { _id: trackObjectId } = await Track.create({
          trackId: track_id,
          name: track_name,
          duration_ms: track_duration,
          artist: track_artist,
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
      // } catch (err) {
      //   console.log(err)
      // }

      const user = await User.findOneAndUpdate(
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
