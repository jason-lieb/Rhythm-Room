const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcryptjs')
const { Comment, Playlist, User, Track } = require('../models')
const { signToken } = require('../utils/auth')

const resolvers = {
  Query: {
    playlists: async () => Playlist.find().populate(['owner', 'items', 'comments']),
    playlist: async (parent, { id }, context) => {
      const playlist = await Playlist.findById(id).populate([
        'items',
        'comments',
      ])
      return playlist
    },
    user: async (parent, { id }, context) => {
      try {
        const user = await User.findById(id).populate([
          'createdplaylist',
          'likedplaylist',
        ])
        return user
      } catch (err) {
        console.log(err)
      }
    },
    users: async () =>
      User.find({}).populate(['createdplaylist', 'likedplaylist']),
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate([
          'createdplaylist',
          'likedplaylist',
        ])
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    items: async (parent, args) => Track.find()
  },
  Mutation: {
    // adds a user to the db
    addUser: async (parent, args) => {
      const user = await User.create(args)
      const token = signToken(user)
      return { user, token }
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
      // const wrong = 'wrong email or password'
      if (!user) {
        throw new AuthenticationError('No user found with this email address')
      }
      const correctPass = await bcrypt.compare(password, user.password)
      if (!correctPass) {
        throw new AuthenticationError('Incorrect credentials')
      }
      const token = signToken(user)
      return { user, token }
    },
    //adds an about me section to the user
    addAbout: async (parent, { _id, about }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: _id },
          { about: about },
          { new: true }
        )
        return user
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    // adds a picture to the user
    addPic: async (parent, { _id, profilePic }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: _id },
          { profilePic: profilePic },
          { new: true }
        )
        return user
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    // creates a new playlist and adds it to the user model that created it
    addPlaylist: async (parent, { name, _id, owner }, context) => {
      if (context.user) {
        const list = await Playlist.create({
          name: name,
          playlistId: _id,
          owner: owner,
        })
        const user = await User.findOneAndUpdate(
          { _id: _id },
          { $addToSet: { createdplaylist: list._id } },
          { new: true }
        )
        return list, user
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    // adds the liked playlist to the user info
    addLikedPlaylist: async (parent, { ownerId, _id }, context) => {
      if (context.user) {
        const list = await Playlist.findById(_id)
        const user = await User.findOneAndUpdate(
          { _id: ownerId },
          { $addToSet: { likedplaylist: list._id } },
          { new: true }
        )
        return list, user
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    // reomves the liked playlist from the user info
    removeLikedPlaylist: async (parent, { ownerId, _id }, context) => {
      if (context.user) {
        const list = await Playlist.findById(_id)
        const user = await User.findOneAndUpdate(
          { _id: ownerId },
          { $pull: { likedplaylist: list._id } },
          { new: true }
        )
        return list, user
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    removePlaylist: async (parent, { ownerId, _id }, context) => {
      if (context.user) {
        const list = await Playlist.findById(_id)
        const user = await User.findOneAndUpdate(
          { _id: ownerId },
          { $pull: { createdplaylist: list._id } },
          { new: true }
        )
        return list, user
      }
      throw new AuthenticationError('You need to be logged in!')
    },
    addComment: async (parent, { commentText, commentAuthor, commentUsername, _id }) => {
      const comment = await Comment.create({
        commentText: commentText,
        commentAuthor: commentAuthor,
        commentUsername: commentUsername
      })

      const playlist = await Playlist.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { comments: comment._id } },
        { new: true }
      )
      return comment, playlist
    },
  },
}

module.exports = resolvers
