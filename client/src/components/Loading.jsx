import CircularProgress from '@mui/material/CircularProgress'

export default function Loading() {
  return (
    <div style={{minHeight: 'calc(100vh-8rem)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <CircularProgress />
    </div>
  )
}
