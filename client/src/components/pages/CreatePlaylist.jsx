import React, { useEffect, useState } from 'react'

import SearchImage from '../SearchImage'

import { useParams } from 'react-router-dom'
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
    // console.log(data)
    // console.log(error)
    // const addToArray = (event) => {
    //     console.log(event.target)
    //     const target = event.target.id
    //     if (target === 'btn') {
    //         console.log('works')
    //         setSongArray(JSON.stringify(target))
    //         console.log(songArray)
    //     } else {
    //         return
    //     }
    // }
    const handleNameChange = (event) => {
        const { value } = event.target
        setPlaylistName(value)
    }
    const addNewSong = async (event) => {
        const btn = event.target.className
        const target = event.target.id
        if (btn === 'btn') {
            const { data: songz } = await addSong({
            variables: { id: pulledData, addSongId: target }
        })
        console.log(songz)
        alert('Song Added')
        } else {
            return
        }
    }
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
        console.log(info)
        setPulledData(info.addPlaylist._id)
        console.log(pulledData)
    }
    useEffect(() => {
        console.log(pulledData, 'playlist Id')
    }, [pulledData])
return (
    <div className='create-div' style={{ minHeight: '95vh'}}>
        {listShown ? (
            <section className='song-section'>
            { loading ? <div>Loading...</div> : data.tracks.map(song => {
                return <div className='song-card' key={song._id}>
                    <div>
                    <h2>{song.name}</h2>
                    <h4>{song.artist.map(artist => artist).join(', ')}</h4>
                    </div>
                    <button onClick={addNewSong} className='btn' id={song._id} style={{ display: `${buttonSight}`}}>{added}</button>
                </div>
            })}
        </section>
        ) : (
            <section className='form-section'>
            <div>
                <div>
                    <span>Playlist Name</span>
                    <input onChange={handleNameChange} type='text' placeholder='name'/>
                </div>
                <button onClick={createNewPlaylist}>Click here to add music!</button>
            </div>
                <div className=''>
                    {/* {songArray.length <= 0 ? <div>Add Songs</div> : songArray.map(each => {
                        return <div>{each}</div>
                    })} */}
                </div>
        </section>
        )
        }
        <SearchImage setImgUrl={ setImgUrl} />
    </div>
)
}

export default CreatePlaylist
