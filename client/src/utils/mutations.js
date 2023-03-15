import { gql } from '@apollo/client'

// creates a user
export const CREATE_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        about
        profilePic
      }
    }
  }
`

export const USER_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
        _id
      }
    }
  }
`

// creates a new playlist
export const CREATE_PLAYLIST = gql`
  mutation AddPlaylist($name: String!, $id: String!, $images: [Imageinput]!) {
    addPlaylist(name: $name, _id: $id, images: $images) {
      name
      _id
    }
  }
`
// removes a playlist from created playlists
export const REMOVE_PLAYLIST = gql`
  mutation Mutation($id: String!, $ownerId: String!) {
    removePlaylist(_id: $id, ownerId: $ownerId) {
      _id
      name
      genres
      owner
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`
// adds a playlist to the "liked" section of a user
export const ADD_LIKED_PLAYLIST = gql`
  mutation AddLikedPlaylist($id: String!, $ownerId: String!) {
    addLikedPlaylist(_id: $id, ownerId: $ownerId) {
      name
      _id
    }
  }
`
// removes a playlist from "liked" section of a user.
export const REMOVE_LIKED_PLAYLIST = gql`
  mutation RemoveLikedPlaylist($id: String!, $ownerId: String!) {
    removeLikedPlaylist(_id: $id, ownerId: $ownerId) {
      _id
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
      description
      genres
      images {
        url
      }
      name
      owner {
        display_name
        href
      }
      playlistId
    }
  }
`
// creates an about me section of a user
export const CREATE_ABOUT_ME = gql`
  mutation Mutation($about: String!, $id: String!) {
    addAbout(about: $about, _id: $id) {
      _id
      username
      email
      about
      profilePic
    }
  }
`
// creates a profile picture for a user
export const CREATE_PROFILE_PICTURE = gql`
  mutation Mutation($profilePic: String!, $id: String!) {
    addPic(profilePic: $profilePic, _id: $id) {
      _id
      username
      email
      about
      profilePic
    }
  }
`

export const ADD_COMMENT = gql`
  mutation Mutation(
    $commentText: String!
    $commentAuthor: String!
    $id: String!
    $commentUsername: String!
  ) {
    addComment(
      commentText: $commentText
      commentAuthor: $commentAuthor
      _id: $id
      commentUsername: $commentUsername
    ) {
      _id
      commentAuthor
      commentText
      commentUsername
      createdAt
    }
  }
`
export const ADD_SONG = gql`
  mutation AddSong($id: String!, $addSongId: String!) {
    addSong(_id: $id, id: $addSongId) {
      name
      _id
    }
  }
`
