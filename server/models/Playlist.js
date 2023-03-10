const { Schema, model, SchemaType } = require('mongoose')

const playlistSchema = new Schema({
  playlistId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
  },
  genres: {
    type: String,
  },
  owner: {
    type: String,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
})

const Playlist = model('Playlist', playlistSchema)

module.exports = Playlist
