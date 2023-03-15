import React, { useEffect, useState } from 'react'

import SearchImage from '../SearchImage'

import { useParams, Link } from 'react-router-dom'
import Auth from '../../utils/auth'

import { QUERY_ALL_SONGS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import { ADD_COMMENT, CREATE_PLAYLIST, ADD_SONG } from '../../utils/mutations'
import { useMutation } from '@apollo/client'


function CreatePlaylist() {
    const { loading, data } = useQuery(QUERY_ALL_SONGS)
    const [added, setAdded] = useState('Add')
    const [buttonSight, setButtonSight] = useState('block')
    const [listShown, setListShown] = useState(false)
    const [playlistName, setPlaylistName] = useState('')
    const [addPlaylist, { error }] = useMutation(CREATE_PLAYLIST)
    const [addSong] = useMutation(ADD_SONG)
    const [pulledData, setPulledData] = useState('')
    const [imgUrl, setImgUrl] = useState()

    // sets the name for the playlist
    const handleNameChange = (event) => {
        const { value } = event.target
        setPlaylistName(value)
    }

    // adds a new song to the newly created playlist
    const addNewSong = async (event) => {
        const btn = event.target.className
        const target = event.target.id
        if (btn === 'btn-cr-2') {
            const { data: songz } = await addSong({
            variables: { id: pulledData, addSongId: target }
        })
        // console.log(songz)
        alert('Song Added')
        } else {
            return
        }
    }
    //creates a new playlist
    const createNewPlaylist = async () => {
        const { data: info } = await addPlaylist({
            variables: { name: playlistName, id: Auth.getProfile().data._id, images: [
                {
                url: imgUrl
                }] }
        }
        )
        if (error) {
            console.log(JSON.stringify(error, null, 2))
        }
        setListShown(true)
        // console.log(info)
        setPulledData(info.addPlaylist._id)
        // console.log(pulledData)
    }


return (
    <div className='create-div' style={{ minHeight: '95vh'}}>
        {listShown ? (
            <>
            <section className='song-section'>
                <h1>Add songs to your new plalist!</h1>
            { loading ? <div>Loading...</div> : data.tracks.map(song => {
                return <div className='song-card' key={song._id}>
                    <div>
                    <h2>{song.name}</h2>
                    <h4>{song.artist.map(artist => artist).join(', ')}</h4>
                    </div>
                    <button onClick={addNewSong} className='btn-cr-2' id={song._id}>Add</button>
                </div>
            })}
            </section>
            <Link className='link-cr' to='/'>Finish</Link>
            </>
        ) : (
            <section className='form-section'>
                <h1>Create A Playlist</h1>
                <div className='form-div'>
                    <input className='input-cr' onChange={handleNameChange} type='text' placeholder='Name'/>
                    <button className='btn-cr' onClick={createNewPlaylist}>Click here to add music!</button>
                </div>
        </section>
        )
        }
        <SearchImage setImgUrl={ setImgUrl} />
    </div>
)
}

export default CreatePlaylist
