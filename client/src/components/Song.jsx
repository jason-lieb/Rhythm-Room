import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

const css = `
  .track {
    display: flex;
    align-items: center;
  }
  .trackNumber {

  }
  .title {
    font-weight: bold;
  }
  .artists {
  }
  .containerDuration {
    text-align: right;
  }
  `

export default function Song({ index, title, artist, duration }) {
  title = title ?? 'title'
  artist = artist ?? 'artist'
  duration = duration ?? '3:45'
  return (
    <Grid container spacing={2} key={index} className="track">
      <style type="text/css">{css}</style>
      <Grid item xs={1}>
        <Typography variant="subtitle1" className="trackNumber">
          {index + 1}
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography variant="subtitle1" className="title">
          {title}
        </Typography>
        <Typography variant="body2" className="artists">
          {artist}
        </Typography>
      </Grid>
      <Grid item xs={1} className="containerDuration">
        <Typography variant="subtitle1">{duration}</Typography>
      </Grid>
    </Grid>
  )
}
