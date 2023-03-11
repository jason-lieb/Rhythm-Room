import { gql } from '@apollo/client';

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
query User($userId: String) {
    user(id: $userId) {
    _id
    about
    createdplaylist {
        _id
        comments {
        commentText
        commentAuthor
        createdAt
        _id
        }
        genres
        name
        owner
    }
    email
    likedplaylist {
        _id
        comments {
        _id
        commentAuthor
        commentText
        createdAt
        }
        genres
        name
        owner
    }
    password
    profilePic
    username
    }
}
`
// queries one playlist based on an id
export const QUERY_PLAYLIST = gql`
query Users($playlistId: String) {
    playlist(id: $playlistId) {
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
// queries all playlists
export const QUERY_ALL_PLAYLISTS = gql`
query Playlists {
    playlists {
        name
        owner
        _id
        genres
        comments {
            createdAt
            commentText
            commentAuthor
            _id
        }
    }
}
`