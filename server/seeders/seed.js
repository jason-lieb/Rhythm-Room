const db = require('../config/connection')
const { User, Playlist } = require('../models')
const userSeeds = require('./userSeeds.json')
const playlistSeed = require('./playlistSeeds.json')

db.once('open', async () => {
  try {
    await Playlist.deleteMany({})
    await User.deleteMany({})

    await User.create(userSeeds)

    for (let i = 0; i < playlistSeed.length; i++) {
      const { _id} = await Playlist.create(playlistSeed[i])
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
