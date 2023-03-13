import React, { useState, useContext } from 'react'

export const LoginContext = React.createContext()

export const useLogin = () => useContext(LoginContext)

export default function LoginProvider({ children }) {
  const [sessionId, setSessionId] = useState(null)
  const [username, setUsername] = useState('')

  const toggleSession = (ID) => {
    return setSessionId(ID)
  }

  const logout = () => {
    return setSessionId(null)
  }

  const getUsername = (name) => {
    return setUsername(name)
  }

  return (
    <LoginContext.Provider
      value={{ sessionId, toggleSession, logout, getUsername, username }}
    >
      {children}
    </LoginContext.Provider>
  )
}
