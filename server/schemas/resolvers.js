const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs')
const { Comment, Playlist, User } = require ('../models');

const resolvers = {
  Query: {
      playlists: async () => Playlist.find().populate(['owner','items']),
      playlist: async (parent, { id }, context) => {
        const playlist = await Playlist.findById(id) //.populate(['comment']) add this back when we start doign comments
        return playlist 
      },
      user: async (parent, { id }, context) => {
        try {
          const user = await User.findById(id).populate(['createdplaylist', 'likedplaylist'])
          return user
        } catch (err) {
          console.log(err)
        }
      },
      users: async () => User.find({}).populate(['createdplaylist', 'likedplaylist']),

  },
  Mutation: {
    // adds a user to the db
    addUser: async(parent, args) => {
      const user = await User.create(args);
      return user
    },
    //adds an about me section to the user
    addAbout: async(parent, { _id, about }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { about: about },
        { new: true }
      )
      return (user)
    },
    // adds a picture to the user
    addPic: async(parent, { _id, profilePic }) => {
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { profilePic: profilePic },
        { new: true }
      )
      return (user)
    },
    // creates a new playlist and adds it to the user model that created it
    addPlaylist: async (parent, { name, _id, owner }) => {
      const list = await Playlist.create({ name: name, playlistId: _id, owner: owner })
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { $addToSet: { createdplaylist: list._id } },
        { new: true }
      )
      return (list, user)
      
    },
    // adds the liked playlist to the user info
    addLikedPlaylist: async ( parent, { ownerId, _id }) => {
      const list = await Playlist.findById(_id)
      const user = await User.findOneAndUpdate(
        { _id: ownerId },
        { $addToSet: { likedplaylist: list._id } },
        { new: true }
      )
      return (list, user) 
    },
    // reomves the liked playlist from the user info
    removeLikedPlaylist: async ( parent, { ownerId, _id }) => {
      const list = await Playlist.findById(_id)
      const user = await User.findOneAndUpdate(
        { _id: ownerId },
        { $pull: { likedplaylist: list._id } },
        { new: true }
      )
      return (list, user) 
    },
    removePlaylist: async ( parent, { ownerId, _id }) => {
      const list = await Playlist.findById(_id)
      const user = await User.findOneAndUpdate(
        { _id: ownerId },
        { $pull: { createdplaylist: list._id } },
        { new: true }
      )
      return (list, user) 
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email })
      const wrong ='wrong email or password'
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPass = await bcrypt.compare(password, user.password)
      if (!correctPass) {
        throw new AuthenticationError('Incorrect credentials');
      }
      return user
    }
  },
}

module.exports = resolvers
