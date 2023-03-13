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
  }`

export default function Song({ index }) {
  return (
    <Grid container spacing={2} key={index} className="track">
      <style type="text/css">{css}</style>
      <Grid item xs={1}>
        <Typography variant="subtitle1" className="trackNumber">
          {index + 1}
        </Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography variant="subtitle1" className="title">
          Track Title
        </Typography>
        <Typography variant="body2" className="artists">
          Artist Name
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="subtitle1">3:45</Typography>
      </Grid>
    </Grid>
  )
}
