const { Schema, model, SchemaType } = require('mongoose')

const trackSchema = new Schema({
  trackId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  artist: [
    {
      type: String,
    },
  ],
  duration_ms: {
    type: Number,
  },
  uri: {
    type: String,
  },
})

const Track = model('Track', trackSchema)

module.exports = Track
