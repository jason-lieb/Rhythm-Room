const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Playlist {
    _id: ID!
    name: String
    owner: Owner
    genres: String
    playlistId: String
    description: String
    images: [Image]
    tracks: Track
    items: [Item]
    comments: [Comment]
  }

  type Owner {
    display_name: String
    href: String
  }

  type Image {
    url: String
  }

  type Track {
    href: String
    total: Int
  }

  input Imageinput {
    url: String
  }

  type Item {
    _id: ID!
    trackId: String
    name: String
    artist: [String]
    duration_ms: Int
    uri: String
  }

  type Comment {
    _id: ID!
    commentText: String
    commentAuthor: String
    createdAt: String
    commentUsername: String
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

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    playlists: [Playlist]
    playlist(id: ID): Playlist
    user(id: ID): User
    users: [User]
    me: User
    track(id: ID): Item
    tracks: [Item]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPlaylist(name: String!, _id: String!, images: [Imageinput]!): Playlist
    addLikedPlaylist(_id: String!, ownerId: String!): Playlist
    removeLikedPlaylist(_id: String!, ownerId: String!): Playlist
    addAbout(about: String!, _id: String!): User
    addPic(profilePic: String!, _id: String!): User
    removePlaylist(_id: String!, ownerId: String!): Playlist
    addComment(commentText: String!, commentAuthor: String!, commentUsername: String!, _id: String!): Comment
    addSong(_id: String!, id: String!): Item
  }
`

module.exports = typeDefs
