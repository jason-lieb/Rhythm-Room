const { Schema, model } = require('mongoose')

const commentSchema = new Schema({})

const Comment = model('Comment', commentSchema)

module.exports = Comment
