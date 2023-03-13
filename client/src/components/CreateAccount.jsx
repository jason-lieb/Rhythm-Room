import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react'
import { CREATE_USER } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import { useLogin } from '../utils/LoginContext'
const css = `
    .container-box {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #242038;
    }
    .card {
        height: 600px; 
        background-color: #8d86c9;
        color: white;
    }
    .card-actions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .text{
        color: white;
    }
    .button {
        color: white;
    }
    text-field {
        color: white;
    }
`

export default function CreateAccount() {
    const{ sessionId, toggleSession, getUsername } = useLogin()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [addUser, { error }] = useMutation(CREATE_USER);
    const [userName, setUserName] = useState('');
    const handleEmailChange = (event) => {
        const { name, value } = event.target;
        setEmail(value);
    };
    const handleUserChange = (event) => {
        const { value } = event.target;
        setUserName(value);
    };
    const handlePassChange = (event) => {
        const { value } = event.target;
        setPassword(value);
    };
    const buttonClick = async (event) => {
        const { data } = await addUser({
            variables: { email: email, username: userName, password: password }
        })
        toggleSession(data.addUser._id)
        getUsername(data.addUser.username)
        setEmail('')
        setPassword('')
    }
    useEffect(() => {
        document.title = 'Rythm Room - Create User'
    }, [])
    return (
    <div>
        <style type = "text/css">{css}</style>
        <Box
        component="form"
        className='username'
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField onChange={handleEmailChange} value={email} id="outlined-basic" className = "text-field" label="email" variant="outlined" />
        </Box>
        <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField onChange={handleUserChange} value={userName} id="outlined-basic" className='text-field' label="Username" variant="outlined" />
        </Box>
        <Box
        component="form"
        sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        >
            <TextField onChange={handlePassChange} value={password} id="outlined-basic" className='text-field' label="Password" variant="outlined" />
        </Box>
        <div>
            <Button onClick={buttonClick} className='button' size="small">Sign Up</Button>
        </div>
    </div>
);
}


