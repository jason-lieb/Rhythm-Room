import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../utils/mutations'
import Auth from '../utils/auth'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

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
// styling for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function CreateAccount({ setLoginPage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [addUser] = useMutation(CREATE_USER)
  useEffect(() => {
    document.title = 'Rhythm Room - Create User'
  }, [])

  const handleEmailChange = (event) => {
    const { value } = event.target
    setEmail(value)
  }

  const handleUserChange = (event) => {
    const { value } = event.target
    setUserName(value)
  }

  const handlePassChange = (event) => {
    const { value } = event.target
    setPassword(value)
  }

  const returnToLogin = () => {
    setLoginPage('login')
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const buttonClick = async (event) => {
    try {
      const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
      if (emailRegex.test(email)) {
        const { data } = await addUser({
          variables: { email: email, username: userName, password: password },
        })
        Auth.login(data.addUser.token)
        setEmail('')
        setPassword('')
      } else {
        setErrorMessage('Invalid Email')
        handleOpen()
      }
    } catch (e) {
      setErrorMessage(e.message)
      handleOpen()
    }
  }

  return (
    <div>
      <style type="text/css">{css}</style>
      <Box
        component="form"
        className="username"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handleEmailChange}
          value={email}
          id="outlined-basic"
          className="text-field"
          label="Email"
          variant="outlined"
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handleUserChange}
          value={userName}
          id="outlined-basic"
          className="text-field"
          label="Username"
          variant="outlined"
        />
      </Box>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handlePassChange}
          value={password}
          id="outlined-basic"
          className="text-field"
          label="Password"
          variant="outlined"
        />
      </Box>
      <div>
        <Button onClick={returnToLogin} className="button" size="small">
          Return to Login
        </Button>
        <Button onClick={buttonClick} className="button" size="small">
          Sign Up
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {errorMessage}
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
