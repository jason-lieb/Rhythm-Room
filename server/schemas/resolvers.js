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
    }
    // addPlaylist: async(parent, args) => {
    //   const 
    // }
  },
}

module.exports = resolvers
