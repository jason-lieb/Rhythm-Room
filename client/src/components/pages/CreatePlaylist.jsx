import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import Auth from '../../utils/auth'

import { QUERY_ALL_SONGS } from '../../utils/queries'
import { useQuery } from '@apollo/client'

import { ADD_COMMENT, ADD_LIKED_PLAYLIST } from '../../utils/mutations'
import { useMutation } from '@apollo/client'

function CreatePlaylist() {
    const { loading, error, data } = useQuery(QUERY_ALL_SONGS)
    const [songArray, setSongArray] = useState('')
    const [buttonSight, setButtonSight] = useState('block')
    // console.log(data)
    // console.log(error)
    const addToArray = (event) => {
        console.log(event.target.id)
        const target = event.target.id
        if (target === 'btn') {
            console.log('works')
            setSongArray(target)
        } else {
            return
        }
    }
    useEffect(() => {
        console.log(songArray)
    }, [songArray])
    console.log(songArray)
return (
    <div className='create-div' style={{ minHeight: '95vh'}}>
        <section onClick={addToArray} className='song-section'>
            { loading ? <div>Loading...</div> : data.tracks.map(song => {
                return <div className='song-card' key={song._id} >
                    <div>
                    <h2>{song.name}</h2>
                    <h4>{song.artist.map(artist => artist).join(', ')}</h4>
                    </div>
                    <button className='btn' id={song._id} style={{ display: `${buttonSight}`}}>Add</button>
                </div>
            })}
        </section>
        <section className='form-section'>
            <form>
                <div>
                    <span>Playlist Name</span>
                    <input type='text' placeholder='name'/>
                </div>
            </form>
                <div className=''>
                    {/* {songArray.length <= 0 ? <div>Add Songs</div> : songArray.map(each => {
                        return <div>{each}</div>
                    })} */}
                </div>
        </section>
    </div>
)
}

export default CreatePlaylist
