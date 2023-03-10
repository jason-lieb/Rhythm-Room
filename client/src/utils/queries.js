import { gql } from '@apollo/client'

// queries all users
export const QUERY_ALL_USERS = gql`
  query Users {
    users {
      _id
      username
      email
      password
      createdplaylist {
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
      likedplaylist {
        _id
        name
        genres
        owner
      }
    }
  }
`
// queries a single user based on an id
export const QUERY_USER = gql`
  query User($userId: ID) {
    user(id: $userId) {
      username
      email
      about
      createdplaylist {
        _id
        name
        owner {
          display_name
          href
        }
        genres
        playlistId
        description
        images {
          url
        }
      }
      likedplaylist {
        _id
        name
        owner {
          display_name
          href
        }
        genres
        playlistId
        description
        images {
          url
        }
      }
    }
  }
`
// queries one playlist based on an id
export const QUERY_PLAYLIST = gql`
query Playlist($playlistId: ID) {
  playlist(id: $playlistId) {
    _id
    name
    comments {
      _id
      commentText
      commentAuthor
      createdAt
      commentUsername
    }
    description
    genres
    images {
      url
    }
    items {
      _id
      trackId
      name
      artist
      duration_ms
      uri
    }
    owner {
      display_name
      href
    }
    playlistId
    tracks {
      href
      total
    }
  }
}
`
// queries all playlists
export const QUERY_ALL_PLAYLISTS = gql`
  query Playlists {
    playlists {
      name
      _id
      genres
      comments {
        createdAt
        commentText
        commentAuthor
        _id
      }
      description
      playlistId
      owner {
        display_name
        href
      }
      images {
        url
      }
    }
  }
`
export const QUERY_SINGLE_SONG = `
query Query($trackId: ID) {
  track(id: $trackId) {
    _id
    trackId
    name
    artist
    duration_ms
    uri
  }
}
`
export const QUERY_ALL_SONGS = gql `
query Query {
  tracks {
    _id
    trackId
    name
    artist
    duration_ms
  }
  
}
`
