import { useState, useEffect } from 'react'
import { USER_LOGIN } from '../../utils/mutations'
import { useMutation } from '@apollo/client'
import Auth from '../../utils/auth'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ConcertImg from '../../assets/music.jpg'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Modal from '@mui/material/Modal'

import CreateAccount from '../CreateAccount'

const css = `
  .container-box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #242038;
  }
  .card {
    height: 500px;
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
// exporting defalault function for login
export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginPage, setLoginPage] = useState('login')
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [login] = useMutation(USER_LOGIN)

  useEffect(() => {
    document.title = 'Rhythm Room - Login'
  }, [])

  const handleEmailChange = (event) => {
    const { value } = event.target
    setEmail(value)
  }

  const handlePassChange = (event) => {
    const { value } = event.target
    setPassword(value)
  }

  const loginChange = () => {
    setLoginPage('createUser')
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const buttonClick = async (event) => {
    try {
      const emailRegex = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')
      if (emailRegex.test(email)) {
        const { data } = await login({
          variables: { email: email, password: password },
        })
        Auth.login(data.login.token)
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

  const submitForm = (e) => {
    e.preventDefault()
    buttonClick(e)
  }
  return (
    <div className="container-box">
      <style type="text/css">{css}</style>
      <Card className="card" sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={ConcertImg} title="concert" />
        <CardContent>
          <Typography
            className="text"
            gutterBottom
            variant="h5"
            component="div"
          >
            Welcome to Rhythm Room!
          </Typography>
          <Typography className="text" variant="body2" color="text.secondary">
            Rhythm Room is a place for people to share their favorite music
          </Typography>
        </CardContent>
        <CardActions className="card-actions">
          {loginPage === 'login' ? (
            <div>
              <Box
                component="form"
                onSubmit={submitForm}
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
                onSubmit={submitForm}
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
                <Button onClick={buttonClick} className="button" size="small">
                  Login
                </Button>
                <Button onClick={loginChange} className="button" size="small">
                  Create Account
                </Button>
              </div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {errorMessage}
                  </Typography>
                </Box>
              </Modal>
            </div>
          ) : (
            <CreateAccount setLoginPage={setLoginPage} />
          )}
        </CardActions>
      </Card>
    </div>
  )
}
