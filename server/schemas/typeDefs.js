const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Playlist {
    _id: ID!
    name: String
    genres: String
    owner: String
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
    addPlaylist( name: String!, owner: String!): Playlist
  }
`



module.exports = typeDefs
