import ReactDOM from 'react-dom/client'
import App from './App'

import { SpotifyApiContextProvider } from './utils/SpotifyApiContext'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <SpotifyApiContextProvider>
    <App />
  </SpotifyApiContextProvider>
)
// <React.StrictMode>
// </React.StrictMode>
