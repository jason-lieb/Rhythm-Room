import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import IconButton from '@mui/material/IconButton'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'

export default function Comment({ text, author, createdAt }) {
  text =
    text ??
    'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Distinctio, similique ducimus. Aut pariatur laborum est libero fuga alias unde itaque harum magnam! Ullam dolorum eveniet non architecto! Unde, dolores veniam.'
  author = author ?? 'John Doe'
  createdAt = createdAt ?? '1/1/23 3:45 pm'
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
      <Avatar alt={author} src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} />
      <Box sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            mb: 0.5,
            width: '100%',
            display: 'inline-flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ display: 'inline' }} variant="subtitle2">
            {author}
          </Typography>
          <Typography sx={{ display: 'inline' }} variant="subtitle2">
            {createdAt}
          </Typography>
        </Box>
        <Typography variant="body2">{text}</Typography>
      </Box>
      {/* <IconButton size="small" aria-label="add to favorites">
        <FavoriteBorderIcon />
      </IconButton> */}
    </Box>
  )
}
