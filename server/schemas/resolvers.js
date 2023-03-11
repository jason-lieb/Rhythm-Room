const { Comment, Playlist, User } = require ('../models');

const resolvers = {
  Query: {
      playlists: async () => Playlist.find(),
      playlist: async (parent, { id }, context) => {
        const playlist = await Playlist.findById(id).populate('comments')
        return playlist 
      },
      user: async (parent, { id }, context) => {
        const user = await User.findById(id).populate(['createdplaylist', 'likedplaylist'])
        return user
      },
      users: async () => User.find(),

  },
  Mutation: {
    addUser: async(parent, args) => {
      const user = await User.create(args);
      return user
    },
    addPlaylist: async(parent, { name, owner }) => {
      const list = await Playlist.create({ name: name, playlistId: owner })
      const user = await User.findOneAndUpdate(
        { _id: owner },
        { $addToSet: { name: name } },
        { new: true }
      )
      return (list, user)
      
    }
  },
}

module.exports = resolvers
