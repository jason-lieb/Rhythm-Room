const { Schema, model, SchemaType } = require('mongoose')

const playlistSchema = new Schema({
  playlistId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: [{
    type: Object,
  }],
  name: {
    type: String,
  },
  genres: {
    type: String,
  },
  owner: {
    type: Object,
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
