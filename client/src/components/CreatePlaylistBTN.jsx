import React from 'react'
import PlusImg from '../assets/icons8-add-new-48.png'
import { Link, useNavigate } from 'react-router-dom'

import Auth from '../utils/auth'

function CreatePlaylistBTN() {
    const navigate = useNavigate()
    const goTo = () => {
        console.log('works')
        navigate('/createPlaylist')
    }
    if (Auth.loggedIn()) {
        return (
    <button onClick={goTo} className='create-btn'>
            <img className='plus-img' src={PlusImg} alt="+"/>
        <div className='pop-up'><span>Create a Playlist</span><span className='pointy-span'></span></div>
    </button>
)
    }

}

export default CreatePlaylistBTN