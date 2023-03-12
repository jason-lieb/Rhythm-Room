import Box from '@mui/material/Box'

const css = {
  backgroundColor: 'black',
  padding: '8px',
  borderRadius: '7px',
  width: 100,
  textAlign: 'center',
}
const linkCSS = {
  textDecoration: 'none',
  color: 'white',
}
function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 300,
        backgroundColor: 'navy',
      }}
    >
      <div
        style={{
          color: 'white',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>GitHub Repo</h1>
        <ul
          style={{
            display: 'flex',
            gap: '20px',
            listStyle: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0,
          }}
        >
          <li style={css}>
            <a
              style={linkCSS}
              href="https://github.com/waustin45"
              target="_blank"
              rel="noopener noreferrer"
            >
              Austin
            </a>
          </li>
          <li style={css}>
            <a
              style={linkCSS}
              href="https://github.com/joemeetjoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Joe
            </a>
          </li>
          <li style={css}>
            <a
              style={linkCSS}
              href="https://github.com/pppzlt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lantao
            </a>
          </li>
          <li style={css}>
            <a
              style={linkCSS}
              href="https://github.com/codex-scribe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matt
            </a>
          </li>
          <li style={css}>
            <a
              style={linkCSS}
              href="https://github.com/jason-lieb"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jason
            </a>
          </li>
        </ul>
      </div>
    </Box>
  )
}

export default Footer
