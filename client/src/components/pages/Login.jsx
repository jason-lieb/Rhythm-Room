import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ConcertImg from '../../assets/music.jpg';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


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
  .username {
    margin-left: 10px;
    
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

export default function Login() {
  return (
    <div className='container-box'>
      <style type = "text/css">{css}</style>
      <Card className = "card" sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image= {ConcertImg}
          title="concert"
        />
        <CardContent>
          <Typography className='text' gutterBottom variant="h5" component="div">
            Welcome to Rhythm Room!
          </Typography>
          <Typography className='text' variant="body2" color="text.secondary">
            Rythm Room is a place for people to share their favorite music- just log in with your spotify account to begin!
          </Typography>
        </CardContent>
        <CardActions className='card-actions'>
        <Box
          component="form"
          className='username'
          sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" className = "text-field" label="Username" variant="outlined" />
        </Box>
        <Box
          component="form"
          sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" className='text-field' label="Password" variant="outlined" />
        </Box>
          <div>
            <Button className='button' size="small">Login</Button>
            <Button className='button'size="small">Sign Up</Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}