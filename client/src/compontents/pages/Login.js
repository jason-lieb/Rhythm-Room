import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ConcertImg from '../../assets/music.jpg';


const css = `
  .container-box {
    display: flex;
    justify-content: center;
    align-itemns: center;
    height: 100vh;
  }
  .card {
    height: 500px; 
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
          <Typography gutterBottom variant="h5" component="div">
            Welcome to Rhythm Room!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rythm Room is a place for people to share their favorite music- just log in with your spotify account to begin!
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Login With Spotify</Button>
        </CardActions>
      </Card>
    </div>
  );
}