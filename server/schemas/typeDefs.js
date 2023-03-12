const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Playlist {
    _id: ID!
    name: String
    owner: String
    genres: String
    playlistId: String
    description: String
    images: String
    comments: [Comment]
  }

  type Comment {
    _id: ID!
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    password: String
    about: String
    profilePic: String
    createdplaylist: [Playlist]
    likedplaylist: [Playlist]
  }

  type Query {
    playlists: [Playlist]
    playlist(id: String): Playlist
    user(id: String): User
    users: [User]
  }

  type Mutation {
    addUser( username: String!, email: String!, password: String!): User
    addPlaylist( name: String!, _id: String!, owner: String!): Playlist
    addLikedPlaylist( _id: String!, ownerId: String!): Playlist
    removeLikedPlaylist( _id: String!, ownerId: String!): Playlist
    addAbout(about: String!, _id: String!): User
    addPic(profilePic: String!, _id: String!): User
    removePlaylist( _id: String!, ownerId: String!): Playlist
  }
`



module.exports = typeDefs
