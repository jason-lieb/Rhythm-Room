import React, { useState, useContext } from 'react';

export const LoginContext = React.createContext();

export const useLogin = () => useContext(LoginContext)

export default function LoginProvider({ children }) {
    const [sessionId, setSessionId] = useState(null)

    const toggleSession = (ID) => {
        return setSessionId(ID)
    }

    return (
    <LoginContext.Provider value={{ sessionId, toggleSession }}>
        {children}
    </LoginContext.Provider>
)
}

