const { Schema, model } = require('mongoose')

const commentSchema = new Schema(
  {
    commentText: {
      type: String,
      maxlength: 280,
    },
    commentAuthor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (time) => time.toLocaleDateString(),
    },
    commentUsername: {
      type: String,
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

const Comment = model('Comment', commentSchema)

module.exports = Comment
