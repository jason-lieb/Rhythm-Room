import './App.css'
import Home from './Home'
import Login from './Login'

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  return code ? <Home code={code} /> : <Login />
}

export default App
