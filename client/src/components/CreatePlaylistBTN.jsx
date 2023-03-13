import React from 'react'
import PlusImg from '../assets/icons8-add-new-48.png'
import { Link, Navigate } from 'react-router-dom'
function CreatePlaylistBTN() {
    const goTo = () => {
        <Navigate to='/createPlaylist' replace={true}/>
    }
return (
    <button onClick={goTo} className='create-btn'>
        <img className='plus-img' src={PlusImg} alt="+"/>
        <div className='pop-up'><span>Create a Playlist</span><span className='pointy-span'></span></div>
    </button>
)
}

export default CreatePlaylistBTN