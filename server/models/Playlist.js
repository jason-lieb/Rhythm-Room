const { Schema, model } = require('mongoose')

const playlistSchema = new Schema({})

const Playlist = model('Playlist', playlistSchema)

module.exports = Playlist
