const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')
const { Playlist } = require('./Playlist')

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Must use a valid email address',
    ],
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,

  },
  profilePic: {
    type: String
  },
  createdplaylist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Playlist',
    },
  ],
  likedplaylist: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Playlist',
    },
  ],
})

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
  }

  next()
})

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password)
}

const User = model('User', userSchema)

module.exports = User
