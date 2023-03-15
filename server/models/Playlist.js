const { Schema, model, SchemaType } = require('mongoose')

const playlistSchema = new Schema({
  playlistId: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: Object,
    },
  ],
  name: {
    type: String,
  },
  genres: {
    type: String,
  },
  owner: {
    type: Object,
  },
  tracks: {
    type: Object,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Track',
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

const Playlist = model('Playlist', playlistSchema)

module.exports = Playlist
