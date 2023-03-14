import Box from '@mui/material/Box'

const linkCSS = {
  color: 'white',
}
function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        height: 100,
        backgroundColor: '#595381',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          color: 'white',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>Find us on GitHub:</span>
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
            marginLeft: '20px'
          }}
        >
          <li>
            <a
              style={linkCSS}
              href="https://github.com/waustin45"
              target="_blank"
              rel="noopener noreferrer"
            >
              Austin
            </a>
          </li>
          <li>
            <a
              style={linkCSS}
              href="https://github.com/joemeetjoe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Joe
            </a>
          </li>
          <li>
            <a
              style={linkCSS}
              href="https://github.com/pppzlt"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lantao
            </a>
          </li>
          <li>
            <a
              style={linkCSS}
              href="https://github.com/codex-scribe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Matt
            </a>
          </li>
          <li>
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
